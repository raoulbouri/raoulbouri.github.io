import { RoboticArm } from "./RoboticArm";
import { site } from "@content/site";

export function Hero() {
  return (
    // Top padding clears the 64px fixed header; bottom padding matches .section
    // so the Hero → About gap equals every other section gap.
    <section id="home" className="scroll-mt-20 pb-7 pt-20 sm:pb-10 sm:pt-24">
      <div className="container-max">
        <div className="grid items-center gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
          <div className="animate-fade-up">
            <p className="eyebrow mb-4">{site.role} · CMU MRSD</p>
            <h1 className="text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              Building the ML systems behind robots that <span className="text-accent">learn, adapt, and act</span> in the real world.
            </h1>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">
              Two years shipping production ML and LLM systems at AlphaSense and OLA. Now at{" "}
              <span className="text-ink">Carnegie Mellon</span>, working on robot learning, sim-to-real transfer, and hardware deployment for Physical AI.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-accent">
                View projects
              </a>
              <a href="#contact" className="btn">
                Get in touch
              </a>
              {site.resume ? (
                <a href={site.resume} className="btn" target="_blank" rel="noreferrer">
                  Résumé ↗
                </a>
              ) : null}
            </div>
            <div className="mt-4 flex items-center gap-5 font-mono text-xs text-faint">
              <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-accent">
                GitHub ↗
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">
                LinkedIn ↗
              </a>
              <span>{site.location}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface/60 p-2">
            <RoboticArm />
          </div>
        </div>
      </div>
    </section>
  );
}
