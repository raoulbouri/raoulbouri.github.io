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
            <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
              Building something in robotics or applied ML? Let&apos;s talk.
            </h2>
            <p className="mt-4 max-w-xl text-muted">
              Open to research collaborations, robotics roles, and interesting problems in
              estimation, control, and learning.
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
