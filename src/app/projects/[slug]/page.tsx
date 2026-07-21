import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { projects, getProject } from "@content/projects";
import { getProjectBody } from "@/lib/mdx";
import { mdxComponents } from "@/components/MdxComponents";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const body = await getProjectBody(params.slug);

  return (
    <article className="pt-14 sm:pt-16">
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <Link href="/#projects" className="font-mono text-xs text-muted hover:text-accent">
          ← All projects
        </Link>

        <header className="mt-6 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`chip ${
                project.status === "ongoing" ? "border-accent/50 text-accent" : ""
              }`}
            >
              {project.status === "ongoing" ? "● in progress" : "✓ complete"}
            </span>
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-muted hover:text-accent"
            >
              GitHub ↗
            </a>
          </div>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{project.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </header>

        <div className="pb-8">
          {body ? (
            <MDXRemote source={body} components={mdxComponents} />
          ) : (
            <p className="mt-8 text-muted">Case study coming soon.</p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border py-4">
          <Link href="/#projects" className="btn">
            ← All projects
          </Link>
          <a href={project.repo} target="_blank" rel="noreferrer" className="btn-accent">
            View repository ↗
          </a>
        </div>
      </div>
    </article>
  );
}
