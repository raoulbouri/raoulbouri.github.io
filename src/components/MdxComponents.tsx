import type { ComponentProps } from "react";

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
};
