import { Reveal } from "./Reveal";
import { experience } from "@content/experience";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-max">
        <Reveal>
          <p className="eyebrow mb-3">Experience</p>
          <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
            Shipping ML in production — search, agents, real-time systems.
          </h2>
        </Reveal>

        <ol className="mt-5 border-l border-border">
          {experience.map((role, i) => (
            <Reveal as="li" key={`${role.company}-${role.period}`} delay={i * 0.05}>
              <div className="relative pb-5 pl-6 sm:pl-8">
                <span
                  className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent"
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-lg font-semibold text-ink">
                    {role.title} · <span className="text-accent">{role.company}</span>
                  </h3>
                  <p className="font-mono text-xs text-faint">{role.period}</p>
                </div>
                <p className="mt-0.5 text-xs text-faint">{role.location}</p>

                <div className="mt-4 space-y-4">
                  {role.projects.map((project) => (
                    <div key={project.title}>
                      <h4 className="font-semibold text-ink">{project.title}</h4>
                      {project.impact && (
                        <p className="text-sm italic text-muted">{project.impact}</p>
                      )}
                      <ul className="mt-2 space-y-2">
                        {project.bullets.map((b) => (
                          <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                            <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" aria-hidden="true" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
