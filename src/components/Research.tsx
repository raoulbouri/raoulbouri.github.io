import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { skills } from "@content/experience";
import { publications } from "@content/publications";

// Each direction is framed as an interest and tied to existing evidence, so
// nothing here claims work that hasn't been done.
const directions = [
  {
    title: "World models",
    body: "Learning dynamics good enough to plan and train policies against. Validating my bipedal walker's digital twin showed how one missing physical term makes a simulator confidently wrong. Learned world models deserve the same scrutiny against real hardware.",
  },
  {
    title: "Latent representations for safety",
    body: "Using the structure of a learned latent space to tell when a robot is outside what it has seen, so uncertainty becomes something the robot can act on. My contact-estimation work does a small version of this: a Kalman filter turns model error into a usable force signal.",
  },
  {
    title: "Continual learning in end-to-end policies",
    body: "Policies that keep adapting after deployment without forgetting what they already know. At OLA I built drift detection because production data never stops changing. Robots face the same drift in payloads, friction, and wear.",
  },
  {
    title: "Generalizing across tasks and embodiments",
    body: "Scaling policies to new tasks and new robot bodies instead of retraining for each one. Rebuilding deep RL from scratch taught me how easily a healthy reward curve hides narrow behavior, so generalization has to be measured on real tasks.",
  },
];

export function Research() {
  return (
    <section id="research" className="section">
      <div className="container-max">
        <Reveal>
          <SectionHeader
            eyebrow="Research Direction"
            title="Robot learning that holds up outside the simulator."
          />
          <p className="section-body max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m drawn to the gap between what robot learning achieves in papers and what
            survives on real hardware. The question running through my work:{" "}
            <span className="text-ink">
              when should a robot trust its own model, and what should it do when it can&apos;t?
            </span>
          </p>
        </Reveal>

        <ol className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
          {directions.map((d, i) => (
            <Reveal as="li" key={d.title} delay={i * 0.05}>
              <div className="h-full rounded-xl border border-border bg-surface p-5 sm:p-6">
                <p className="font-mono text-xs text-accent">0{i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold text-ink">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:mt-8 sm:text-lg">
            What I enjoy most is taking recent methods off the page and onto hardware. The systems
            engineering training in <span className="text-ink">CMU&apos;s MRSD program</span> gives
            that a discipline: clear requirements, verifying each subsystem, and validating before
            deployment, so a new method is tested against the robot, not just a benchmark.
          </p>
        </Reveal>

        <Reveal>
          <div className="subsection">
            <h3 className="subsection-heading">Skills</h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-x-8">
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
          </div>
        </Reveal>

        <Reveal>
          <div className="subsection">
            <h3 className="subsection-heading">Publications</h3>
            <ul className="mt-5 space-y-4">
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
