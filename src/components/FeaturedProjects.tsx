import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { ProjectCard } from "./ProjectCard";
import { featuredProjects } from "@content/projects";

export function FeaturedProjects() {
  return (
    <section id="projects" className="section">
      <div className="container-max">
        <Reveal>
          <SectionHeader eyebrow="Projects" title="Featured Projects" />
        </Reveal>

        {/* Two columns at every wide size: four projects fill a clean 2 × 2
            instead of leaving one orphaned card in a three-column grid. */}
        <div className="section-body grid gap-5 sm:gap-6 md:grid-cols-2">
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
