import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";
import { featuredProjects } from "@content/projects";

export function FeaturedProjects() {
  return (
    <section id="projects" className="section">
      <div className="container-max">
        <Reveal>
          <p className="eyebrow mb-3">Featured Projects</p>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
              Three systems, each with the honest engineering behind it.
            </h2>
            <p className="text-sm text-faint">Estimation · RL control · sim-to-real</p>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
