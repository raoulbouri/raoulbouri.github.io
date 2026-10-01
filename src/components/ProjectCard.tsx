import Link from "next/link";
import Image from "next/image";
import type { Project } from "@content/projects";
import { LoopVideo } from "./LoopVideo";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card group flex flex-col overflow-hidden"
    >
      {/* Cover media. Falls back to a schematic placeholder until a real asset
          is dropped at project.cover. */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-surface-2">
        {project.cover?.endsWith(".mp4") ? (
          <LoopVideo
            src={project.cover}
            poster={project.cover.replace(/\.mp4$/, ".jpg")}
            label={`${project.title} demo`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title} demo`}
            fill
            unoptimized
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 90vw"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <CoverPlaceholder />
          </div>
        )}
        <span
          className={`absolute left-3 top-3 chip ${
            project.status === "ongoing" ? "border-accent/50 text-accent" : ""
          }`}
        >
          {project.status === "ongoing" ? "● in progress" : "✓ complete"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        {project.period ? (
          <p className="mt-1 font-mono text-xs text-faint">{project.period}</p>
        ) : null}
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-4 space-y-1.5">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2 text-xs leading-relaxed text-faint">
              <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-accent" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-accent">
          Read the Blog
          <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

function CoverPlaceholder() {
  // Lightweight schematic so cards look intentional before real covers land.
  return (
    <svg viewBox="0 0 160 90" className="h-full w-full opacity-60" aria-hidden="true">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0H0V10" fill="none" stroke="rgb(var(--border))" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="160" height="90" fill="url(#grid)" />
      <circle cx="40" cy="60" r="4" fill="rgb(var(--accent))" />
      <line x1="40" y1="60" x2="72" y2="40" stroke="rgb(var(--accent))" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="72" y1="40" x2="104" y2="46" stroke="rgb(var(--accent))" strokeWidth="2" strokeLinecap="round" />
      <line x1="104" y1="46" x2="126" y2="28" stroke="rgb(var(--accent))" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="126" cy="28" r="3.5" fill="rgb(var(--accent-strong))" />
    </svg>
  );
}
