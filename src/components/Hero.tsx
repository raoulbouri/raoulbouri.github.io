import { RoboticArm } from "./RoboticArm";
import { site } from "@content/site";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-20 pt-14 sm:pt-16">
      <div className="container-max">
        <div className="grid items-center gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
          <div className="animate-fade-up">
            <p className="eyebrow mb-4"> Robotics Engineer | ML Researcher</p>
            <h1 className="text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              Building robotic systems that can <span className="text-accent">perceive, reason, and act</span> under real-world uncertainty.
            </h1>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">
              {site.tagline} Two years shipping production AI at scale. Now at{" "}
              <span className="text-ink">CMU&apos;s MS in Robotic Systems Development</span> exploring embodied intelligence through the lens of both research and systems engineering.
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
