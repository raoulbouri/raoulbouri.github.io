"use client";

import { useEffect, useRef, useState } from "react";

// Silent looping clip — the sharp, lightweight replacement for a GIF. H.264 MP4
// keeps full colour at HD resolution where a GIF is limited to 256 colours.
// It plays only while on screen (saves battery and data on phones), and for
// visitors with prefers-reduced-motion it stays paused on its poster frame
// with native controls, so they can still choose to watch it.
export function LoopVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster?: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      video.pause();
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      controls={reduced}
      aria-label={label}
      className={className}
    />
  );
}
