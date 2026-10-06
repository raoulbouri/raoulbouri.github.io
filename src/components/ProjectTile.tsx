"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@content/projects";

// Compact card for the /projects grid. Video covers show their poster frame
// and only play while hovered, so a page full of cards stays light; touch
// devices see the poster and watch the clip on the case-study page.
export function ProjectTile({ project }: { project: Project }) {
  const video = useRef<HTMLVideoElement>(null);
  const isVideo = project.cover?.endsWith(".mp4");
  const poster = isVideo ? project.cover!.replace(/\.mp4$/, ".jpg") : project.cover;

  const play = () => {
    const v = video.current;
    if (!v) return;
    if (!v.src) v.src = project.cover!;
    v.muted = true;
    v.play().catch(() => {});
  };
  const stop = () => video.current?.pause();

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card group flex h-full flex-col overflow-hidden"
      onMouseEnter={isVideo ? play : undefined}
      onMouseLeave={isVideo ? stop : undefined}
    >
      <div className="relative aspect-video overflow-hidden border-b border-border bg-black">
        {isVideo ? (
          <video
            ref={video}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${project.title} demo`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt={`${project.title} demo`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <span
          className={`absolute left-3 top-3 chip ${
            project.status === "ongoing" ? "border-accent/50 text-accent" : ""
          }`}
        >
          {project.status === "ongoing" ? "● in progress" : "✓ complete"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-base font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
          {project.title}
        </h2>
        {project.period ? <p className="mt-1 font-mono text-xs text-faint">{project.period}</p> : null}
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.oneLiner ?? project.summary}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.tags.slice(0, 3).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
