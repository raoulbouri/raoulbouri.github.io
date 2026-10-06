import Link from "next/link";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { ProjectCard } from "./ProjectCard";
import { featuredProjects, projects } from "@content/projects";

// Home page: the 3 featured projects (one wide lead card + two regular cards)
// and a way through to /projects for everything else.
export function FeaturedProjects() {
  const total = projects.length;
  return (
    <section id="projects" className="section">
      <div className="container-max">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <SectionHeader eyebrow="Projects" title="Featured Projects" />
            <Link href="/projects" className="font-mono text-sm text-accent hover:underline">
              View all projects ({total}) →
            </Link>
          </div>
        </Reveal>

        <div className="section-body grid gap-5 sm:gap-6 md:grid-cols-2">
          {featuredProjects.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 0.06}
              // The grid stretches this wrapper to the row's height; flex makes
              // the card fill it, so cards in the same row end at the same line.
              className={`flex [&>a]:w-full ${p.wide ? "md:col-span-2" : ""}`}
            >
              {/* Regular home cards stay light (no highlight bullets); the wide
                  lead card has room for them. */}
              <ProjectCard project={p} compact={!p.wide} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link href="/projects" className="btn">
            View all {total} projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
