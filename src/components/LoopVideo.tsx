"use client";

import { useEffect, useRef, useState } from "react";

// Silent looping clip — the sharp, lightweight replacement for a GIF. H.264 MP4
// keeps full colour at HD resolution where a GIF is limited to 256 colours.
// It plays only while on screen (saves battery and data on phones), and for
// visitors with prefers-reduced-motion it stays paused on its poster frame
// with native controls, so they can still choose to watch it.
//
// Autoplay: React omits the `muted` attribute from server-rendered HTML, so a
// video given its `src` in that HTML starts loading as unmuted, and Safari
// then refuses to autoplay it even after it is muted. So the server HTML only
// carries the poster; the source is attached on the client after the element
// is muted.
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
    video.muted = true;
    video.setAttribute("muted", "");
    video.src = src;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }

    // A clip already on screen at load asks to play before it has data; if
    // that first request is refused, try again once the video can play.
    // Browsers can also refuse a play() made very early in page load, so a
    // refused attempt is retried a few times with a short backoff.
    let visible = false;
    let retries = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const tryPlay = () => {
      if (!visible) return;
      video.play().catch(() => {
        if (retries < 4) {
          retries += 1;
          timer = setTimeout(tryPlay, 400 * retries);
        }
      });
    };
    video.addEventListener("canplay", tryPlay);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) tryPlay();
      else video.pause();
    });
    io.observe(video);
    return () => {
      clearTimeout(timer);
      io.disconnect();
      video.removeEventListener("canplay", tryPlay);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      controls={reduced}
      aria-label={label}
      className={className}
    />
  );
}
