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
            <span className="section-kicker" aria-hidden="true" />
            <h2 className="section-heading">From production ML to Physical AI.</h2>
            <div className="mt-3 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m pursuing a Master of Robotic Systems Development at <span className="text-ink">Carnegie Mellon</span>, focused on robot learning, foundation models, and scalable ML systems for Physical AI.
              </p>
              <p>
                Before CMU, I built and deployed LLM and agent systems at AlphaSense, and productionized ML at OLA Cabs: real-time ETA prediction for 100K+ daily orders, document OCR at 10K+ requests a day, and the data pipelines and monitoring that keep models honest in production.
              </p>
              <p>
                Now I&apos;m bringing that engineering discipline to robots: end-to-end policies, simulation, sim-to-real transfer, and deployment on hardware I design and build myself.
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
