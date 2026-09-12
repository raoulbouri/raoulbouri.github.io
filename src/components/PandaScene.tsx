"use client";

/**
 * Franka Emika Panda — real 7-DOF kinematics, rendered with primitives.
 *
 * Joint origins and limits come from Franka's own URDF (see pandaKinematics.ts),
 * so the proportions and the reachable poses are the real robot's, not a
 * stylisation. The arm tracks a target with damped-least-squares IK; clicking
 * the workspace drops a block and runs a reach → grasp → lift → release cycle.
 *
 * Deliberately mesh-free: no STL/glTF download, so this adds ~no asset weight.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import {
  Group,
  Mesh,
  Quaternion,
  Vector3,
  Matrix4,
  type Object3D,
} from "three";
import {
  HOME_POSE,
  MAX_REACH,
  MIN_REACH,
  FINGER_MAX,
  forwardKinematics,
  toolPositionInto,
  ikStep,
} from "@/lib/pandaKinematics";

type Phase = "idle" | "reach" | "grasp" | "lift" | "release" | "return";

type Palette = {
  link: string;
  joint: string;
  accent: string;
  grid: string;
};

const UP = new Vector3(0, 1, 0);
const BLOCK = 0.05;
const TABLE_Z = 0.0;
const REST_TARGET = new Vector3(0.45, 0, 0.45);

// Camera framing. The base offset was tuned for a wide canvas; narrower canvases
// (phones) get pulled back proportionally so the sweeping gripper and the
// workspace disc stay inside the frame.
const LOOK_AT = new Vector3(0, 0, 0.34);
const CAMERA_OFFSET = new Vector3(1.35, -1.15, 0.85).sub(new Vector3(0, 0, 0.42));
const WIDE_ASPECT = 1.35;
const MAX_PULLBACK = 1.6;

/** Orients a unit-height cylinder (+Y) to span from `a` to `b`. */
function spanTo(obj: Object3D, a: Vector3, b: Vector3, scratch: Vector3, q: Quaternion) {
  scratch.subVectors(b, a);
  const len = scratch.length();
  if (len < 1e-6) {
    obj.visible = false;
    return;
  }
  obj.visible = true;
  obj.position.copy(a).addScaledVector(scratch, 0.5);
  scratch.normalize();
  q.setFromUnitVectors(UP, scratch);
  obj.quaternion.copy(q);
  obj.scale.set(1, len, 1);
}

function Arm({ palette, reduced }: { palette: Palette; reduced: boolean }) {
  const linkRefs = useRef<(Mesh | null)[]>([]);
  const jointRefs = useRef<(Mesh | null)[]>([]);
  const handRef = useRef<Group>(null);
  const fingerL = useRef<Mesh>(null);
  const fingerR = useRef<Mesh>(null);
  const blockRef = useRef<Mesh>(null);
  const targetRingRef = useRef<Mesh>(null);

  // Mutable sim state (kept out of React state to avoid per-frame re-renders).
  const sim = useRef({
    q: HOME_POSE.slice(),
    target: REST_TARGET.clone(),
    goal: REST_TARGET.clone(),
    block: new Vector3(0.45, 0, TABLE_Z + BLOCK / 2),
    blockVisible: false,
    blockHeld: false,
    finger: FINGER_MAX,
    phase: "idle" as Phase,
    tPhase: 0,
    hasTask: false,
  });

  const scratch = useMemo(() => new Vector3(), []);
  const scratch2 = useMemo(() => new Vector3(), []);
  const quat = useMemo(() => new Quaternion(), []);
  const mat = useMemo(() => new Matrix4(), []);

  // Expose a click handler through a plane sibling via context-free ref hook.
  useEffect(() => {
    function onTask(e: Event) {
      const detail = (e as CustomEvent<{ x: number; y: number; z: number }>).detail;
      const s = sim.current;
      s.block.set(detail.x, detail.y, TABLE_Z + BLOCK / 2);
      s.blockVisible = true;
      s.blockHeld = false;
      s.finger = FINGER_MAX;
      s.phase = "reach";
      s.tPhase = 0;
      s.hasTask = true;
    }
    window.addEventListener("panda:task", onTask as EventListener);
    return () => window.removeEventListener("panda:task", onTask as EventListener);
  }, []);

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const s = sim.current;
    s.tPhase += dt;

    // ---- goal selection per phase -------------------------------------
    if (!s.hasTask) {
      if (reduced) {
        // Reduced motion: hold still until the visitor asks for a grasp. The
        // user-initiated task below still animates, so the demo stays usable.
        s.goal.copy(REST_TARGET);
      } else {
        // Ambient: sweep slowly across the workspace so it reads as "alive"
        // without demanding attention.
        const t = performance.now() / 1000;
        s.goal.set(
          0.42 + Math.sin(t * 0.31) * 0.12,
          Math.sin(t * 0.23) * 0.34,
          0.38 + Math.sin(t * 0.19 + 1.1) * 0.14
        );
      }
    } else if (s.phase === "reach") {
      s.goal.set(s.block.x, s.block.y, s.block.z + 0.005);
      if (scratch.subVectors(s.goal, currentTool(s.q, scratch2)).length() < 0.035) {
        s.phase = "grasp";
        s.tPhase = 0;
      }
    } else if (s.phase === "grasp") {
      s.finger = Math.max(BLOCK / 2 - 0.004, s.finger - dt * 0.09);
      if (s.tPhase > 0.45) {
        s.phase = "lift";
        s.tPhase = 0;
        s.blockHeld = true;
      }
    } else if (s.phase === "lift") {
      s.goal.set(s.block.x * 0.82, s.block.y * 0.82, TABLE_Z + 0.42);
      if (s.tPhase > 1.5) {
        s.phase = "release";
        s.tPhase = 0;
      }
    } else if (s.phase === "release") {
      s.finger = Math.min(FINGER_MAX, s.finger + dt * 0.09);
      if (s.tPhase > 0.4) {
        s.blockHeld = false;
        s.phase = "return";
        s.tPhase = 0;
      }
    } else if (s.phase === "return") {
      // Let the block settle back onto the table, then hand control to ambient.
      s.block.z = Math.max(TABLE_Z + BLOCK / 2, s.block.z - dt * 0.9);
      if (s.tPhase > 0.8) {
        s.hasTask = false;
        s.blockVisible = false;
        s.phase = "idle";
      }
    }

    // ---- smooth the commanded target, then run IK ----------------------
    s.target.lerp(s.goal, 1 - Math.pow(0.0016, dt));
    s.q = ikStep(s.q, s.target);
    s.q = ikStep(s.q, s.target);

    // ---- render from FK -------------------------------------------------
    const { points, toolMatrix } = forwardKinematics(s.q);
    for (let i = 0; i < points.length - 1; i++) {
      const m = linkRefs.current[i];
      if (m) spanTo(m, points[i], points[i + 1], scratch, quat);
    }
    for (let i = 0; i < points.length; i++) {
      const j = jointRefs.current[i];
      if (j) j.position.copy(points[i]);
    }

    if (handRef.current) {
      handRef.current.position.setFromMatrixPosition(toolMatrix);
      mat.extractRotation(toolMatrix);
      handRef.current.quaternion.setFromRotationMatrix(mat);
    }
    if (fingerL.current) fingerL.current.position.x = -s.finger;
    if (fingerR.current) fingerR.current.position.x = s.finger;

    if (blockRef.current) {
      blockRef.current.visible = s.blockVisible;
      if (s.blockHeld) {
        s.block.setFromMatrixPosition(toolMatrix);
      }
      blockRef.current.position.copy(s.block);
    }
    if (targetRingRef.current) {
      targetRingRef.current.visible = s.blockVisible && !s.blockHeld;
      targetRingRef.current.position.set(s.block.x, s.block.y, TABLE_Z + 0.002);
    }
  });

  const linkRadii = [0.045, 0.042, 0.038, 0.036, 0.033, 0.03, 0.028, 0.026];

  return (
    <group>
      {/* Links */}
      {linkRadii.map((r, i) => (
        <mesh
          key={`link-${i}`}
          ref={(el) => {
            linkRefs.current[i] = el;
          }}
        >
          <cylinderGeometry args={[r, r, 1, 14]} />
          <meshStandardMaterial color={palette.link} roughness={0.45} metalness={0.15} />
        </mesh>
      ))}

      {/* Joints */}
      {linkRadii.map((r, i) => (
        <mesh
          key={`joint-${i}`}
          ref={(el) => {
            jointRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[r * 1.18, 16, 12]} />
          <meshStandardMaterial
            color={i === 0 ? palette.joint : palette.joint}
            roughness={0.35}
            metalness={0.25}
          />
        </mesh>
      ))}

      {/* Gripper */}
      <group ref={handRef}>
        <mesh position={[0, 0, -0.03]}>
          <boxGeometry args={[0.08, 0.05, 0.05]} />
          <meshStandardMaterial color={palette.joint} roughness={0.35} metalness={0.25} />
        </mesh>
        <mesh ref={fingerL} position={[-FINGER_MAX, 0, 0.012]}>
          <boxGeometry args={[0.012, 0.022, 0.05]} />
          <meshStandardMaterial color={palette.accent} roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh ref={fingerR} position={[FINGER_MAX, 0, 0.012]}>
          <boxGeometry args={[0.012, 0.022, 0.05]} />
          <meshStandardMaterial color={palette.accent} roughness={0.3} metalness={0.3} />
        </mesh>
      </group>

      {/* Task block + target ring */}
      <mesh ref={blockRef} visible={false}>
        <boxGeometry args={[BLOCK, BLOCK, BLOCK]} />
        <meshStandardMaterial color={palette.accent} roughness={0.5} />
      </mesh>
      <mesh ref={targetRingRef} visible={false} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.055, 0.07, 32]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function currentTool(q: number[], out: Vector3) {
  return toolPositionInto(q, out);
}

function Workspace({ palette }: { palette: Palette }) {
  function onDown(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    const p = e.point;
    // e.point is world-space; the robot group is rotated, so convert back.
    const local = e.object.worldToLocal(p.clone());
    let r = Math.hypot(local.x, local.y);
    if (r > MAX_REACH) return;
    // Taps inside the dead zone around the base used to be silently ignored,
    // which on a small phone canvas reads as "broken". Push them out to the
    // nearest reachable radius instead.
    if (r < MIN_REACH * 1.1) {
      const scale = r < 1e-4 ? 0 : (MIN_REACH * 1.1) / r;
      local.x = r < 1e-4 ? MIN_REACH * 1.1 : local.x * scale;
      local.y = r < 1e-4 ? 0 : local.y * scale;
      r = MIN_REACH * 1.1;
    }
    window.dispatchEvent(
      new CustomEvent("panda:task", { detail: { x: local.x, y: local.y, z: 0 } })
    );
  }

  return (
    <>
      <mesh rotation={[0, 0, 0]} position={[0, 0, TABLE_Z]} onPointerDown={onDown}>
        <circleGeometry args={[MAX_REACH, 48]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.07} />
      </mesh>
      {/* Outer reach boundary — thick and in the accent color so it reads clearly. */}
      <mesh position={[0, 0, TABLE_Z + 0.002]}>
        <ringGeometry args={[MAX_REACH - 0.012, MAX_REACH, 64]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.85} />
      </mesh>
      {/* Inner dead-zone boundary — taps inside are pushed out to this radius. */}
      <mesh position={[0, 0, TABLE_Z + 0.002]}>
        <ringGeometry args={[MIN_REACH - 0.006, MIN_REACH, 48]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.4} />
      </mesh>
      {/* Mid guide ring for a radar-like sense of depth. */}
      <mesh position={[0, 0, TABLE_Z + 0.0015]}>
        <ringGeometry args={[(MAX_REACH + MIN_REACH) / 2 - 0.003, (MAX_REACH + MIN_REACH) / 2, 64]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.22} />
      </mesh>
      {/* Base plinth — cylinder geometry runs along +Y, so stand it up in Z-up. */}
      <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.06, 24]} />
        <meshStandardMaterial color={palette.joint} roughness={0.5} metalness={0.2} />
      </mesh>
    </>
  );
}

/** Frame the arm for the canvas's current aspect ratio. */
function CameraRig() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const pullback = Math.min(MAX_PULLBACK, Math.max(1.1, WIDE_ASPECT / aspect));
    camera.up.set(0, 0, 1);
    camera.position.copy(LOOK_AT).addScaledVector(CAMERA_OFFSET, pullback);
    camera.lookAt(LOOK_AT);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);
  return null;
}

function readPalette(): Palette {
  if (typeof window === "undefined") {
    return { link: "#d8dbd6", joint: "#9aa39c", accent: "#16a34a", grid: "#c9cec7" };
  }
  const cs = getComputedStyle(document.documentElement);
  const rgb = (name: string, fallback: string) => {
    const v = cs.getPropertyValue(name).trim();
    return v ? `rgb(${v.replace(/\s+/g, ",")})` : fallback;
  };
  const dark = document.documentElement.classList.contains("dark");
  return {
    link: dark ? "#e8ecea" : "#f2f4f1",
    joint: dark ? "#7f8a84" : "#b9c0b8",
    accent: rgb("--accent", "#16a34a"),
    grid: rgb("--border", "#c9cec7"),
  };
}

export default function PandaScene() {
  const [palette, setPalette] = useState<Palette>(() => readPalette());
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPalette(readPalette());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = () => setReduced(mq.matches);
    mq.addEventListener("change", onMq);
    const mo = new MutationObserver(() => setPalette(readPalette()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      mq.removeEventListener("change", onMq);
      mo.disconnect();
    };
  }, []);

  // Stop rendering while scrolled off-screen — saves battery on phones.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        dpr={[1, 1.75]}
        // Always render while visible, even under reduced motion: the ambient
        // sweep is disabled in <Arm>, but a tap must still animate the grasp.
        frameloop={visible ? "always" : "never"}
        camera={{ position: [1.35, -1.15, 0.85], fov: 38, up: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true }}
        // pan-y (not "none"): the only interaction is a tap-to-grasp, so a
        // vertical swipe that starts over the canvas must still scroll the page.
        style={{ touchAction: "pan-y" }}
      >
        <CameraRig />
        <ambientLight intensity={0.75} />
        <directionalLight position={[2, -2, 3]} intensity={1.5} />
        <directionalLight position={[-2, 1.5, 1]} intensity={0.35} />
        <group>
          <Workspace palette={palette} />
          <Arm palette={palette} reduced={reduced} />
        </group>
      </Canvas>
    </div>
  );
}
