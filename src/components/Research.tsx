import { Reveal } from "./Reveal";
import { skills } from "@content/experience";
import { publications } from "@content/publications";

// Research + Skills live together: the research narrative frames the skills,
// and real publications (with links) are listed below it.
export function Research() {
  return (
    <section id="research" className="section">
      <div className="container-max">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="section-kicker" aria-hidden="true" />
              <p className="eyebrow mb-3">Research Direction</p>
              <h2 className="section-heading">
                Toward robots that estimate, learn, and act under uncertainty.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-3 space-y-4 text-lg leading-relaxed text-muted">
                <p>
                  My interests sit at the seam between classical estimation and learning: using
                  filtering to make learned models honest about what they don&apos;t know, and using
                  learning to cover what first-principles models miss.
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <span className="section-kicker" aria-hidden="true" />
              <p className="eyebrow mb-3">Skills</p>
              <h2 className="section-heading">The toolkit</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-3 space-y-3">
                {skills.map((group) => (
                  <div key={group.group}>
                    <p className="font-mono text-xs uppercase tracking-wider text-accent">
                      {group.group}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {group.items.map((s) => (
                        <span key={s} className="chip">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 border-t border-border pt-6">
            <span className="section-kicker" aria-hidden="true" />
            <h2 className="section-heading mb-4">Publications</h2>
            <ul className="space-y-4">
              {publications.map((pub) => (
                <li key={pub.url} className="text-sm leading-relaxed text-muted">
                  <span className="text-ink">{pub.authors}</span> ({pub.date}).{" "}
                  {pub.arxiv ? (
                    <>
                      <em className="text-ink not-italic font-medium">{pub.title}</em>. arXiv:{" "}
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs text-accent hover:underline"
                      >
                        {pub.arxiv.id}
                      </a>{" "}
                      <span className="font-mono text-xs">[{pub.arxiv.category}]</span>.
                    </>
                  ) : (
                    <>
                      &ldquo;<span className="text-ink font-medium">{pub.title}</span>&rdquo;. In:{" "}
                      <em>{pub.venue}</em>. {pub.publisher}, pp. {pub.pages}.
                    </>
                  )}{" "}
                  url:{" "}
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all font-mono text-xs text-accent hover:underline"
                  >
                    {pub.url}
                  </a>
                  .
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
