"use client";

/**
 * Hero visual: a Franka Emika Panda driven by its real URDF kinematics.
 *
 * The Three.js scene is dynamically imported with `ssr: false` so none of it
 * lands in the statically-exported HTML or the initial JS payload — it loads
 * only once this component mounts in the browser.
 *
 * Failure isolation: if the device can't create a WebGL2 context (low memory,
 * too many GPU contexts, old hardware), three.js throws during render. Without
 * a boundary that error unmounts the entire page, so the scene is gated on a
 * WebGL2 probe and wrapped in an error boundary that swaps in a static drawing.
 *
 * Accessibility: the canvas carries a descriptive label, and the scene itself
 * honours prefers-reduced-motion (the ambient sweep stops; taps still animate).
 */

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";

const PandaScene = dynamic(() => import("./PandaScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden="true" />,
});

class SceneBoundary extends Component<
  { fallback: ReactNode; onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("Hero 3D scene disabled:", error);
    this.props.onError();
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

// three.js r169 requires WebGL2.
function webgl2Available() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

function StaticArm() {
  return (
    <div className="grid h-full w-full place-items-center">
      <svg viewBox="0 0 200 160" className="h-3/4 w-3/4" aria-hidden="true">
        <ellipse cx="100" cy="132" rx="78" ry="16" fill="rgb(var(--accent) / 0.08)" stroke="rgb(var(--accent) / 0.6)" strokeWidth="1.5" />
        <ellipse cx="100" cy="132" rx="26" ry="6" fill="none" stroke="rgb(var(--accent) / 0.4)" strokeWidth="1" />
        <path d="M86 132 L90 120 H110 L114 132 Z" fill="rgb(var(--faint))" />
        <g stroke="rgb(var(--muted))" strokeLinecap="round" fill="none">
          <path d="M100 120 V78" strokeWidth="9" />
          <path d="M100 78 L148 70" strokeWidth="8" />
          <path d="M148 70 L160 92" strokeWidth="6" />
        </g>
        <g fill="rgb(var(--faint))">
          <circle cx="100" cy="78" r="6" />
          <circle cx="148" cy="70" r="5" />
        </g>
        <path d="M156 94 v10 M164 92 v10" stroke="rgb(var(--accent))" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function RoboticArm() {
  // null until mounted: server HTML and first client render match.
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [crashed, setCrashed] = useState(false);

  useEffect(() => {
    setWebgl(webgl2Available());
  }, []);

  const unavailable = webgl === false || crashed;

  return (
    <div
      className="relative h-[320px] w-full select-none sm:h-[400px] lg:h-[460px]"
      role="img"
      aria-label="A 3D Franka Emika Panda robot arm running its real 7-degree-of-freedom kinematics. Click anywhere in its workspace to make it reach out, grasp a block, and lift it."
    >
      {webgl === false ? (
        <StaticArm />
      ) : webgl ? (
        <SceneBoundary fallback={<StaticArm />} onError={() => setCrashed(true)}>
          <PandaScene />
        </SceneBoundary>
      ) : null}
      <p className="pointer-events-none absolute inset-x-2 bottom-2 rounded-md bg-bg/70 px-2 py-1 text-center font-mono text-[0.62rem] leading-snug text-faint backdrop-blur-sm sm:inset-x-4 sm:text-[0.68rem]">
        Franka Panda · real kinematics
        <br className="sm:hidden" />
        <span className="hidden sm:inline"> — </span>
        {unavailable ? "3D preview unavailable on this device" : "tap or click the workspace to grasp"}
      </p>
    </div>
  );
}
