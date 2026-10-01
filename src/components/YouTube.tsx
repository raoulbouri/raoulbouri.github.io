"use client";

import { useState } from "react";

// Click-to-load YouTube embed. Case studies can carry several videos; loading
// every player up front costs ~1 MB of JS each, which is heavy on a phone. This
// shows the video thumbnail and only swaps in the (privacy-enhanced) player
// when the visitor presses play. `vertical` sizes the frame for Shorts.
//
// Thumbnails: the default hqdefault.jpg is only 480×360 (and letterboxed for
// Shorts), which looks blurry at article width. Use the 1280×720 frame for
// regular videos and YouTube's vertical "oar" frame for Shorts, falling back to
// hqdefault if a size doesn't exist for a given video.
export function YouTube({
  id,
  title,
  vertical = false,
}: {
  id: string;
  title: string;
  vertical?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(
    `https://i.ytimg.com/vi/${id}/${vertical ? "oardefault" : "maxresdefault"}.jpg`
  );

  return (
    <figure className={`mt-6 ${vertical ? "mx-auto w-full max-w-[300px]" : ""}`}>
      <div
        className={`relative w-full overflow-hidden rounded-lg border border-border bg-black ${
          vertical ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play video: ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt=""
              loading="lazy"
              onError={() => setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
              className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/70 text-white transition-colors group-hover:bg-accent">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-faint">{title}</figcaption>
    </figure>
  );
}
