/**
 * Franka Emika Panda kinematics.
 *
 * Joint origins (xyz / rpy) are taken verbatim from Franka's own URDF
 * (`franka_description/robots/common/franka_arm.xacro`, Apache-2.0) and the
 * joint limits from the same robot's published ranges (cross-checked against
 * google-deepmind/mujoco_menagerie `franka_emika_panda/panda.xml`, Apache-2.0).
 *
 * Every joint rotates about its own local +Z, which is how the real URDF
 * defines them — so nesting these frames reproduces the actual Panda
 * kinematic chain, not an approximation of it.
 */

import { Matrix4, Euler, Vector3 } from "three";

const HALF_PI = Math.PI / 2;

export type PandaJoint = {
  /** Translation of this joint's frame in its parent's frame (metres). */
  origin: [number, number, number];
  /** Fixed rotation of this joint's frame in its parent's frame (radians, XYZ). */
  rpy: [number, number, number];
  /** Position limits in radians. */
  limit: [number, number];
  /** A sensible resting angle inside the limits. */
  home: number;
};

export const PANDA_JOINTS: PandaJoint[] = [
  { origin: [0, 0, 0.333], rpy: [0, 0, 0], limit: [-2.8973, 2.8973], home: 0 },
  { origin: [0, 0, 0], rpy: [-HALF_PI, 0, 0], limit: [-1.7628, 1.7628], home: -0.4 },
  { origin: [0, -0.316, 0], rpy: [HALF_PI, 0, 0], limit: [-2.8973, 2.8973], home: 0 },
  { origin: [0.0825, 0, 0], rpy: [HALF_PI, 0, 0], limit: [-3.0718, -0.0698], home: -2.2 },
  { origin: [-0.0825, 0.384, 0], rpy: [-HALF_PI, 0, 0], limit: [-2.8973, 2.8973], home: 0 },
  { origin: [0, 0, 0], rpy: [HALF_PI, 0, 0], limit: [-0.0175, 3.7525], home: 1.9 },
  { origin: [0.088, 0, 0], rpy: [HALF_PI, 0, 0], limit: [-2.8973, 2.8973], home: 0.79 },
];

/** Fixed flange transform after joint 7 (panda_joint8 in the URDF). */
export const FLANGE_OFFSET: [number, number, number] = [0, 0, 0.107];

/** Hand frame sits below the flange; fingertips a further ~0.058 m out. */
export const HAND_LENGTH = 0.058;
/** Gripper finger travel per side (URDF prismatic range 0 → 0.04 m). */
export const FINGER_MAX = 0.04;

export const HOME_POSE: number[] = PANDA_JOINTS.map((j) => j.home);

export function clampToLimits(q: number[]): number[] {
  return q.map((v, i) => {
    const [lo, hi] = PANDA_JOINTS[i].limit;
    return Math.min(hi, Math.max(lo, v));
  });
}

/**
 * Forward kinematics. Returns the world-space origin of every joint frame plus
 * the tool point, so the renderer can draw links between consecutive frames.
 */
export function forwardKinematics(q: number[]): {
  frames: Matrix4[];
  points: Vector3[];
  tool: Vector3;
  toolMatrix: Matrix4;
} {
  const frames: Matrix4[] = [];
  const points: Vector3[] = [];
  const acc = new Matrix4();

  points.push(new Vector3(0, 0, 0));

  for (let i = 0; i < PANDA_JOINTS.length; i++) {
    const j = PANDA_JOINTS[i];
    const fixed = new Matrix4()
      .makeRotationFromEuler(new Euler(j.rpy[0], j.rpy[1], j.rpy[2], "XYZ"))
      .setPosition(j.origin[0], j.origin[1], j.origin[2]);
    // URDF applies the joint origin transform, then rotates about local Z.
    const spin = new Matrix4().makeRotationZ(q[i]);
    acc.multiply(fixed).multiply(spin);
    frames.push(acc.clone());
    points.push(new Vector3().setFromMatrixPosition(acc));
  }

  const toolMatrix = acc
    .clone()
    .multiply(new Matrix4().makeTranslation(FLANGE_OFFSET[0], FLANGE_OFFSET[1], FLANGE_OFFSET[2] + HAND_LENGTH));
  const tool = new Vector3().setFromMatrixPosition(toolMatrix);
  points.push(tool);

  return { frames, points, tool, toolMatrix };
}

// Preallocated scratch for the IK hot path: the numerical Jacobian evaluates
// FK 8x per iteration, so this must not allocate.
const _acc = new Matrix4();
const _fixed = new Matrix4();
const _spin = new Matrix4();
const _euler = new Euler();
const _fixedCache: Matrix4[] = PANDA_JOINTS.map((j) => {
  _euler.set(j.rpy[0], j.rpy[1], j.rpy[2], "XYZ");
  return new Matrix4()
    .makeRotationFromEuler(_euler)
    .setPosition(j.origin[0], j.origin[1], j.origin[2]);
});
const _flange = new Matrix4().makeTranslation(
  FLANGE_OFFSET[0],
  FLANGE_OFFSET[1],
  FLANGE_OFFSET[2] + HAND_LENGTH
);

/** Tool position only, allocation-free — the hot path for the IK loop. */
export function toolPositionInto(q: number[], out: Vector3): Vector3 {
  _acc.identity();
  for (let i = 0; i < PANDA_JOINTS.length; i++) {
    _fixed.copy(_fixedCache[i]);
    _spin.makeRotationZ(q[i]);
    _acc.multiply(_fixed).multiply(_spin);
  }
  _acc.multiply(_flange);
  return out.setFromMatrixPosition(_acc);
}

export function toolPosition(q: number[]): Vector3 {
  return toolPositionInto(q, new Vector3());
}

/**
 * One damped-least-squares IK step toward `target`.
 *
 * The Panda is redundant (7 DOF for a 3-DOF position goal), so this converges
 * to *a* valid solution rather than a unique one — DLS keeps it well-behaved
 * near singularities, and results are clamped to the real joint limits so the
 * arm can never render a pose the hardware couldn't reach.
 */
const _cur = new Vector3();
const _err = new Vector3();
const _probe = new Vector3();
const _qp: number[] = new Array(7).fill(0);
const _J: number[][] = [new Array(7).fill(0), new Array(7).fill(0), new Array(7).fill(0)];

export function ikStep(q: number[], target: Vector3, damping = 0.08, gain = 0.55): number[] {
  const n = q.length;
  const current = toolPositionInto(q, _cur);
  const err = _err.subVectors(target, current);
  if (err.lengthSq() < 1e-8) return q;

  // Numerical position Jacobian (3 x n).
  const eps = 1e-4;
  const J = _J;
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) _qp[k] = q[k];
    _qp[i] += eps;
    const p = toolPositionInto(_qp, _probe);
    J[0][i] = (p.x - current.x) / eps;
    J[1][i] = (p.y - current.y) / eps;
    J[2][i] = (p.z - current.z) / eps;
  }

  // A = J Jᵀ + λ²I  (3x3), then solve A y = err and dq = Jᵀ y.
  const lambda2 = damping * damping;
  const A = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let s = 0;
      for (let k = 0; k < n; k++) s += J[r][k] * J[c][k];
      A[r][c] = s + (r === c ? lambda2 : 0);
    }
  }

  const y = solve3(A, [err.x, err.y, err.z]);
  if (!y) return q;

  const next = q.slice();
  for (let i = 0; i < n; i++) {
    let dq = 0;
    for (let r = 0; r < 3; r++) dq += J[r][i] * y[r];
    next[i] += gain * dq;
  }
  return clampToLimits(next);
}

/** Cramer's rule on a 3x3; returns null if effectively singular. */
function solve3(A: number[][], b: number[]): number[] | null {
  const det =
    A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) -
    A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) +
    A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
  if (Math.abs(det) < 1e-12) return null;

  const col = (i: number, v: number[]) => {
    const M = A.map((row) => row.slice());
    for (let r = 0; r < 3; r++) M[r][i] = v[r];
    return (
      M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) -
      M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) +
      M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0])
    );
  };

  return [col(0, b) / det, col(1, b) / det, col(2, b) / det];
}

/** Reachable workspace guard — keeps click targets physically plausible. */
export const MAX_REACH = 0.82;
export const MIN_REACH = 0.25;
