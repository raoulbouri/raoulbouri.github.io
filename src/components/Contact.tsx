import { Reveal } from "./Reveal";
import { site } from "@content/site";
import { ObfuscatedEmail } from "./ObfuscatedEmail";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-max">
        <Reveal>
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12">
            <p className="eyebrow mb-3">Contact</p>
            <h2 className="section-heading max-w-2xl">
              Let&apos;s build robots that work outside the lab.
            </h2>
            <p className="mt-4 max-w-xl text-muted">
              I&apos;m looking for ML and Research Engineering roles across data, training
              infrastructure, model development, and deployment for real-world robotic systems.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ObfuscatedEmail className="btn-accent" />
              <a href={site.github} target="_blank" rel="noreferrer" className="btn">
                GitHub ↗
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
