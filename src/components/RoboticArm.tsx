"use client";

/**
 * Hero visual: a Franka Emika Panda driven by its real URDF kinematics.
 *
 * The Three.js scene is dynamically imported with `ssr: false` so none of it
 * lands in the statically-exported HTML or the initial JS payload — it loads
 * only once this component mounts in the browser.
 *
 * Accessibility: the canvas carries a descriptive label, and the scene itself
 * honours prefers-reduced-motion (it renders a single static pose instead of
 * running the animation loop).
 */

import dynamic from "next/dynamic";

const PandaScene = dynamic(() => import("./PandaScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden="true" />,
});

export function RoboticArm() {
  return (
    <div
      className="relative h-[320px] w-full select-none sm:h-[400px] lg:h-[460px]"
      role="img"
      aria-label="A 3D Franka Emika Panda robot arm running its real 7-degree-of-freedom kinematics. Click anywhere in its workspace to make it reach out, grasp a block, and lift it."
    >
      <PandaScene />
      <p className="pointer-events-none absolute inset-x-2 bottom-2 rounded-md bg-bg/70 px-2 py-1 text-center font-mono text-[0.62rem] leading-snug text-faint backdrop-blur-sm sm:inset-x-4 sm:text-[0.68rem]">
        Franka Panda · real kinematics
        <br className="sm:hidden" />
        <span className="hidden sm:inline"> — </span>
        click the workspace to grasp
      </p>
    </div>
  );
}
