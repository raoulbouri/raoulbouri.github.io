import Link from "next/link";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectsIndex } from "@/components/ProjectsIndex";

export const metadata: Metadata = {
  title: "All projects",
  description: "Robotics, robot learning and ML systems projects: hardware, simulation and research.",
};

export default function ProjectsPage() {
  return (
    <section className="container-max pb-16 pt-20 sm:pt-24">
      <Link href="/" className="font-mono text-xs text-muted hover:text-accent">
        ← Home
      </Link>
      <div className="mt-6">
        <SectionHeader eyebrow="Projects" title="All projects" />
        <p className="mt-3 max-w-2xl text-muted">
          Robotics, robot learning and ML systems. Hardware, simulation and research.
        </p>
      </div>
      <ProjectsIndex />
    </section>
  );
}
