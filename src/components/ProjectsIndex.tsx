"use client";

import { useEffect, useState } from "react";
import { allProjects, categories, type Category } from "@content/projects";
import { ProjectTile } from "./ProjectTile";

type Filter = Category | "all";

// Category filter for /projects. The choice lives in the URL (?type=hardware)
// so a filtered view can be shared; it's read after mount because the page is
// statically exported.
export function ProjectsIndex() {
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (t && t in categories) setFilter(t as Category);
  }, []);

  const choose = (f: Filter) => {
    setFilter(f);
    const url = new URL(window.location.href);
    if (f === "all") url.searchParams.delete("type");
    else url.searchParams.set("type", f);
    window.history.replaceState(null, "", url);
  };

  const shown = filter === "all" ? allProjects : allProjects.filter((p) => p.category.includes(filter));
  const options: [Filter, string, number][] = [
    ["all", "All", allProjects.length],
    ...(Object.entries(categories) as [Category, string][]).map(
      ([key, label]) =>
        [key, label, allProjects.filter((p) => p.category.includes(key)).length] as [Filter, string, number]
    ),
  ];

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2 sm:mt-8" role="group" aria-label="Filter projects">
        {options.map(([key, label, count]) => (
          <button
            key={key}
            type="button"
            onClick={() => choose(key)}
            aria-pressed={filter === key}
            className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
              filter === key
                ? "border-accent bg-accent text-white"
                : "border-border bg-surface text-muted hover:border-accent/60 hover:text-ink"
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {shown.map((p) => (
          <ProjectTile key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
