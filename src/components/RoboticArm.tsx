"use client";

/**
 * Interactive planar robot arm.
 *
 * Idle: a 3-link arm tracks the pointer via CCD inverse kinematics.
 * On click/tap: registers a "contact" — draws a force vector and a covariance
 * ellipse at the end-effector that shrinks as the estimate "converges." This is
 * a literal nod to the proprioceptive-contact-detection project.
 *
 * Accessibility: honors prefers-reduced-motion (renders a single static pose,
 * no animation loop, no pointer follow) and exposes an aria-label + text
 * fallback. Purely decorative — no information is conveyed only via the canvas.
 */

import { useEffect, useRef } from "react";

type Vec = { x: number; y: number };

const SEGMENTS = 3;
const CCD_ITERS = 6;

function readColor(el: HTMLElement, name: string, fallback: string): string {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  if (!v) return fallback;
  // Values are "r g b" channel triplets.
  return `rgb(${v.replace(/\s+/g, ", ")})`;
}

export function RoboticArm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Colors (re-read on theme change).
    const colors = {
      link: "rgb(21,128,61)",
      joint: "rgb(22,163,74)",
      glow: "rgb(34,197,94)",
      grid: "rgb(226,228,224)",
    };
    function refreshColors() {
      colors.link = readColor(canvas as HTMLElement, "--arm-link", colors.link);
      colors.joint = readColor(canvas as HTMLElement, "--arm-joint", colors.joint);
      colors.glow = readColor(canvas as HTMLElement, "--arm-glow", colors.glow);
      colors.grid = readColor(canvas as HTMLElement, "--arm-grid", colors.grid);
    }

    // Arm state.
    let base: Vec = { x: 0, y: 0 };
    let segLen = 60;
    let points: Vec[] = [];
    const target: Vec = { x: 0, y: 0 };
    const pointer: Vec = { x: 0, y: 0 };
    let pointerActive = false;
    let lastMove = 0;

    // Contact state.
    let contact: { x: number; y: number; start: number } | null = null;
    const CONTACT_MS = 1600;

    function layout() {
      const rect = wrap!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      base = { x: width * 0.5, y: height * 0.94 };
      const reach = Math.min(height * 0.82, width * 0.46);
      segLen = reach / SEGMENTS;

      // Initialize an appealing folded pose reaching up if empty.
      if (points.length === 0) {
        points = [{ ...base }];
        let a = -Math.PI / 2 - 0.5;
        for (let i = 0; i < SEGMENTS; i++) {
          const prev = points[i];
          a += 0.35;
          points.push({ x: prev.x + Math.cos(a) * segLen, y: prev.y + Math.sin(a) * segLen });
        }
      } else {
        points[0] = { ...base };
      }
      target.x = base.x + reach * 0.55;
      target.y = base.y - reach * 0.6;
    }

    function solveCCD() {
      points[0] = { ...base };
      const end = () => points[SEGMENTS];
      for (let iter = 0; iter < CCD_ITERS; iter++) {
        for (let i = SEGMENTS - 1; i >= 0; i--) {
          const pivot = points[i];
          const e = end();
          const toEnd = { x: e.x - pivot.x, y: e.y - pivot.y };
          const toTarget = { x: target.x - pivot.x, y: target.y - pivot.y };
          const aEnd = Math.atan2(toEnd.y, toEnd.x);
          const aTgt = Math.atan2(toTarget.y, toTarget.x);
          let d = aTgt - aEnd;
          while (d > Math.PI) d -= 2 * Math.PI;
          while (d < -Math.PI) d += 2 * Math.PI;
          const cos = Math.cos(d);
          const sin = Math.sin(d);
          for (let j = i + 1; j <= SEGMENTS; j++) {
            const dx = points[j].x - pivot.x;
            const dy = points[j].y - pivot.y;
            points[j] = {
              x: pivot.x + dx * cos - dy * sin,
              y: pivot.y + dx * sin + dy * cos,
            };
          }
        }
      }
      // Re-enforce exact segment lengths (guards fp drift).
      for (let i = 1; i <= SEGMENTS; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        const len = Math.hypot(dx, dy) || 1;
        points[i] = {
          x: points[i - 1].x + (dx / len) * segLen,
          y: points[i - 1].y + (dy / len) * segLen,
        };
      }
    }

    function drawGrid() {
      const step = 34;
      ctx!.save();
      ctx!.globalAlpha = 0.5;
      ctx!.strokeStyle = colors.grid;
      ctx!.lineWidth = 1;
      for (let x = (base.x % step); x < width; x += step) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, height);
        ctx!.stroke();
      }
      for (let y = (base.y % step); y < height; y += step) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(width, y);
        ctx!.stroke();
      }
      ctx!.restore();
    }

    function drawArm(now: number) {
      // Base mount.
      ctx!.save();
      ctx!.fillStyle = colors.grid;
      ctx!.beginPath();
      ctx!.ellipse(base.x, base.y + 4, 26, 8, 0, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();

      // Links.
      for (let i = 0; i < SEGMENTS; i++) {
        const a = points[i];
        const b = points[i + 1];
        ctx!.save();
        ctx!.strokeStyle = colors.link;
        ctx!.lineCap = "round";
        ctx!.lineWidth = 9 - i * 1.6;
        ctx!.shadowColor = colors.glow;
        ctx!.shadowBlur = 8;
        ctx!.globalAlpha = 0.95;
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
        ctx!.restore();
      }

      // Joints.
      for (let i = 0; i <= SEGMENTS; i++) {
        const p = points[i];
        const isEnd = i === SEGMENTS;
        ctx!.save();
        ctx!.fillStyle = isEnd ? colors.glow : colors.joint;
        if (isEnd) {
          ctx!.shadowColor = colors.glow;
          ctx!.shadowBlur = 14;
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, isEnd ? 6 : i === 0 ? 7 : 4.5, 0, Math.PI * 2);
        ctx!.fill();
        if (!isEnd) {
          ctx!.fillStyle = "rgb(255,255,255)";
          ctx!.globalAlpha = 0.25;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.restore();
      }

      // Contact overlay: force vector + shrinking covariance ellipse.
      if (contact) {
        const t = (now - contact.start) / CONTACT_MS;
        if (t >= 1) {
          contact = null;
        } else {
          const end = points[SEGMENTS];
          const ease = 1 - Math.pow(1 - Math.min(t, 1), 3);
          const fade = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;

          // Covariance ellipse shrinking toward a tight estimate.
          const rx = 46 * (1 - 0.72 * ease) + 8;
          const ry = 30 * (1 - 0.72 * ease) + 6;
          const ang = Math.atan2(end.y - contact.y, end.x - contact.x);
          ctx!.save();
          ctx!.translate(end.x, end.y);
          ctx!.rotate(ang);
          ctx!.globalAlpha = 0.28 * fade;
          ctx!.fillStyle = colors.glow;
          ctx!.beginPath();
          ctx!.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = 0.7 * fade;
          ctx!.strokeStyle = colors.glow;
          ctx!.lineWidth = 1.4;
          ctx!.beginPath();
          ctx!.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.restore();

          // Force vector arrow from contact toward end-effector.
          const vx = end.x - contact.x;
          const vy = end.y - contact.y;
          const vlen = Math.hypot(vx, vy) || 1;
          const ux = vx / vlen;
          const uy = vy / vlen;
          const tip = { x: contact.x + ux * (vlen * 0.72), y: contact.y + uy * (vlen * 0.72) };
          ctx!.save();
          ctx!.globalAlpha = fade;
          ctx!.strokeStyle = colors.link;
          ctx!.fillStyle = colors.link;
          ctx!.lineWidth = 2;
          ctx!.beginPath();
          ctx!.moveTo(contact.x, contact.y);
          ctx!.lineTo(tip.x, tip.y);
          ctx!.stroke();
          const ah = 7;
          const aang = Math.atan2(uy, ux);
          ctx!.beginPath();
          ctx!.moveTo(tip.x, tip.y);
          ctx!.lineTo(tip.x - ah * Math.cos(aang - 0.4), tip.y - ah * Math.sin(aang - 0.4));
          ctx!.lineTo(tip.x - ah * Math.cos(aang + 0.4), tip.y - ah * Math.sin(aang + 0.4));
          ctx!.closePath();
          ctx!.fill();
          // Contact dot + label.
          ctx!.beginPath();
          ctx!.arc(contact.x, contact.y, 3.5, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.font = "600 11px ui-monospace, monospace";
          ctx!.fillText("contact · τ̂ estimated", contact.x + 8, contact.y - 8);
          ctx!.restore();
        }
      }
    }

    function frame(now: number) {
      // Idle drift when the pointer hasn't moved recently.
      if (!pointerActive || now - lastMove > 1400) {
        const reach = Math.min(height * 0.82, width * 0.46);
        const cx = base.x;
        const cy = base.y - reach * 0.5;
        target.x += (cx + Math.cos(now / 1600) * reach * 0.5 - target.x) * 0.02;
        target.y += (cy + Math.sin(now / 1200) * reach * 0.28 - target.y) * 0.02;
      } else {
        target.x += (pointer.x - target.x) * 0.18;
        target.y += (pointer.y - target.y) * 0.18;
      }
      solveCCD();
      ctx!.clearRect(0, 0, width, height);
      drawGrid();
      drawArm(now);
      raf = requestAnimationFrame(frame);
    }

    function drawStatic() {
      solveCCD();
      ctx!.clearRect(0, 0, width, height);
      drawGrid();
      drawArm(performance.now());
    }

    // Pointer handlers (in CSS px relative to canvas).
    function toLocal(clientX: number, clientY: number): Vec {
      const rect = canvas!.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }
    function onMove(e: PointerEvent) {
      const p = toLocal(e.clientX, e.clientY);
      pointer.x = p.x;
      pointer.y = p.y;
      pointerActive = true;
      lastMove = performance.now();
    }
    function onLeave() {
      pointerActive = false;
    }
    function onDown(e: PointerEvent) {
      const p = toLocal(e.clientX, e.clientY);
      pointer.x = p.x;
      pointer.y = p.y;
      pointerActive = true;
      lastMove = performance.now();
      contact = { x: p.x, y: p.y, start: performance.now() };
    }

    let raf = 0;
    refreshColors();
    layout();

    if (reduce) {
      drawStatic();
    } else {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
      canvas.addEventListener("pointerdown", onDown);
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(() => {
      layout();
      if (reduce) drawStatic();
    });
    ro.observe(wrap);

    // Re-read palette when the theme class flips.
    const mo = new MutationObserver(() => {
      refreshColors();
      if (reduce) drawStatic();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative h-[320px] w-full select-none sm:h-[400px] lg:h-[460px]"
      aria-hidden="false"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full touch-none"
        role="img"
        aria-label="Interactive 3-link robot arm that follows your cursor; click to register a simulated contact and see its estimated force and uncertainty."
      />
      <p className="pointer-events-none absolute bottom-2 left-0 right-0 text-center font-mono text-[0.68rem] text-faint">
        move to guide · click to probe a contact
      </p>
    </div>
  );
}
