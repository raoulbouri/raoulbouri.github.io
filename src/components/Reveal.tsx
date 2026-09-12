"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Small, purposeful scroll-in — as progressive enhancement only.
//
// The server-rendered HTML is always fully visible. Earlier this rendered
// `initial={{ opacity: 0 }}` into the static HTML and swapped to a plain element
// under prefers-reduced-motion; React keeps server attributes on hydration, so
// phones with Reduce Motion on (and any device where JS failed) were left with
// every section stuck at opacity 0. Now an element is only hidden after mount,
// only if motion is allowed, and only if it is still below the fold.
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [armed, setArmed] = useState(false);
  const MotionTag = motion[as];

  useEffect(() => {
    const el = ref.current;
    if (reduce || !el) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, [reduce]);

  const hidden = armed && !inView && !reduce;

  return (
    <MotionTag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      initial={false}
      animate={hidden ? { opacity: 0, y: 14 } : { opacity: 1, y: 0 }}
      transition={
        hidden
          ? { duration: 0 }
          : { duration: armed ? 0.5 : 0, ease: [0.22, 1, 0.36, 1], delay: armed ? delay : 0 }
      }
    >
      {children}
    </MotionTag>
  );
}
