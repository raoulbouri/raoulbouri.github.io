import type { ComponentProps, ReactNode } from "react";
import { YouTube } from "./YouTube";
import { LoopVideo } from "./LoopVideo";

// Looping hardware clip with a caption, for case studies. An .mp4 source plays
// as a silent HD loop (poster: same name, .jpg); anything else renders as an
// image. `vertical` caps portrait (phone-shot) clips instead of stretching
// them across the column.
function Clip({
  src,
  alt,
  caption,
  vertical = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  vertical?: boolean;
}) {
  const media = "w-full rounded-lg border border-border bg-black";
  return (
    <figure className={`mt-6 ${vertical ? "mx-auto w-full max-w-[300px]" : ""}`}>
      {src.endsWith(".mp4") ? (
        <LoopVideo src={src} poster={src.replace(/\.mp4$/, ".jpg")} label={alt} className={media} />
      ) : (
        // Figures link to the full-size image: training plots have small axis
        // labels that are hard to read at column width, especially on phones.
        <a href={src} target="_blank" rel="noreferrer" title="Open full-size figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" className={`${media} bg-white`} />
        </a>
      )}
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-faint">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

// Compact "under the hood" box: a few key numbers per step, so technical
// detail stays scannable instead of turning into more paragraphs.
function Specs({ title = "Under the hood", children }: { title?: string; children: ReactNode }) {
  return (
    <div className="mt-5 rounded-lg border border-border bg-surface-2 px-4 py-3">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">{title}</p>
      <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[minmax(8rem,auto)_1fr]">
        {children}
      </dl>
    </div>
  );
}

// Small tag under a heading naming where a section's evidence comes from,
// e.g. <Course>CMU 16-831 · HW1</Course>.
function Course({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2">
      <span className="chip border-accent/50 text-accent">{children}</span>
    </p>
  );
}

function Spec({ k, children }: { k: string; children: ReactNode }) {
  return (
    <>
      <dt className="font-medium text-ink">{k}</dt>
      <dd className="text-muted">{children}</dd>
    </>
  );
}

// Styling for MDX case-study prose without the typography plugin, so authors
// write plain Markdown in the .mdx files and it renders on-brand.

export const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="mt-6 scroll-mt-24 text-xl font-semibold text-ink sm:text-2xl" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mt-4 text-lg font-semibold text-ink" {...props} />
  ),
  p: (props: ComponentProps<"p">) => <p className="mt-4 leading-relaxed text-muted" {...props} />,
  ul: (props: ComponentProps<"ul">) => <ul className="mt-4 space-y-2 pl-1" {...props} />,
  ol: (props: ComponentProps<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted" {...props} />
  ),
  li: ({ children, ...props }: ComponentProps<"li">) => (
    <li className="flex gap-2.5 leading-relaxed text-muted" {...props}>
      <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-accent" aria-hidden="true" />
      <span>{children}</span>
    </li>
  ),
  a: (props: ComponentProps<"a">) => (
    <a
      className="link-underline"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      {...props}
    />
  ),
  strong: (props: ComponentProps<"strong">) => <strong className="font-semibold text-ink" {...props} />,
  code: (props: ComponentProps<"code">) => (
    <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink" {...props} />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-surface-2 p-4 font-mono text-sm" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="mt-6 border-l-2 border-accent bg-surface-2 px-5 py-3 text-muted" {...props} />
  ),
  hr: () => <hr className="my-10 border-border" />,
  img: (props: ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="mt-6 w-full rounded-lg border border-border" alt={props.alt ?? ""} {...props} />
  ),
  YouTube,
  Clip,
  Specs,
  Spec,
  Course,
};
