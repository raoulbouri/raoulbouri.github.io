import type { ReactNode } from "react";

// One header pattern for every section — accent kicker, mono eyebrow, heading —
// so the distance from a section's top edge to its content is always the same.
export function SectionHeader({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="section-kicker" aria-hidden="true" />
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-heading mt-2 max-w-3xl">{title}</h2>
    </div>
  );
}
