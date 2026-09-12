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
                Robot learning that holds up outside the simulator.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-3 space-y-4 text-lg leading-relaxed text-muted">
                <p>
                  I&apos;m interested in the full loop from data to deployment: how training data,
                  simulation fidelity, and model design decide whether a policy survives contact with
                  real hardware.
                </p>
                <p>
                  My projects keep returning to one question: <span className="text-ink">when should you trust the model?</span>{" "}
                  In contact estimation, a Kalman filter turns a learned model&apos;s errors into a usable
                  force signal. On my bipedal walker, validating the digital twin exposed a missing
                  physical term before any controller was built. In deep RL, healthy reward curves hid
                  policies that weren&apos;t actually walking.
                </p>
                <p>
                  Next: end-to-end policies, foundation models for robotics, and the training and
                  evaluation infrastructure that makes them reliable.
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
                  {pub.note ? <span className="mt-1 block text-ink/80">{pub.note}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
