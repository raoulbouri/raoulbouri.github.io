import { Reveal } from "./Reveal";
import { experience } from "@content/experience";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-max">
        <Reveal>
          <span className="section-kicker" aria-hidden="true" />
          <h2 className="section-heading">Experience</h2>
        </Reveal>

        <div className="relative mt-5">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-bg to-transparent"
            aria-hidden="true"
          />
          <ol className="experience-scroll max-h-[65vh] overflow-y-auto overscroll-y-contain pb-3 pr-2 pt-5">
            {experience.map((role, i) => (
              <Reveal as="li" key={`${role.company}-${role.period}`} delay={i * 0.05}>
                <div className="grid grid-cols-[4.5rem_1fr] gap-x-3 sm:grid-cols-[6rem_1fr] sm:gap-x-4">
                  <div className="pt-1 text-right font-mono text-[0.65rem] leading-tight text-faint sm:text-xs">
                    {role.period.split(" — ").map((part) => (
                      <div key={part}>{part}</div>
                    ))}
                  </div>

                  <div className="relative border-l border-border pb-5 pl-6 sm:pl-8">
                    <span
                      className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent"
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-semibold text-ink">
                      {role.title} · <span className="text-accent">{role.company}</span>
                    </h3>
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
                </div>
              </Reveal>
            ))}
          </ol>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t from-bg to-transparent"
            aria-hidden="true"
          />
        </div>
        <p className="mt-2 text-center font-mono text-[0.68rem] text-faint">
          scroll for more ↕
        </p>
      </div>
    </section>
  );
}
