import Image from "next/image";
import { Reveal } from "./Reveal";
import { education } from "@content/experience";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-max">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow mb-3">About</p>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface-2">
              <Image
                src="/images/about-photo.jpg"
                alt="Rahul Bouri"
                width={1200}
                height={1200}
                className="h-auto w-full object-cover"
                sizes="(min-width: 1024px) 33vw, 90vw"
                priority={false}
              />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="space-y-4 text-lg leading-relaxed text-muted">
              <p className="font-semibold text-ink">Moving intelligence from the cloud into the physical world.</p>
              <p>
                I&apos;ve engineered production AI systems across agentic search, multimodal AI, and large-scale ML infrastructure. What excites me now is approaching robotics with the curiosity of a researcher and the mindset of a production engineer.
              </p>
              <p>
                Through <span className="text-ink">Carnegie Mellon&apos;s MRSD program</span>, I&apos;m exploring world models, sim-to-real transfer, learning-based control, and robust deployment on real hardware.
              </p>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {education.map((e) => (
                <div key={e.school} className="rounded-xl border border-border bg-surface p-5">
                  <p className="font-mono text-xs text-accent">{e.period}</p>
                  <p className="mt-1 font-medium text-ink">{e.school}</p>
                  <p className="text-sm text-muted">{e.degree}</p>
                  <p className="mt-2 text-xs text-faint">{e.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
