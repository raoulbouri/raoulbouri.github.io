"use client";

import { useEffect, useState } from "react";
import { site } from "@content/site";

/**
 * Renders the email as "user [at] domain [dot] tld" text always (defeats
 * regex-based scraping of the static HTML), and only assembles a working
 * mailto: href client-side after mount — so the raw address never appears in
 * server-rendered markup or the initial network response.
 */
export function ObfuscatedEmail({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  const [href, setHref] = useState<string | undefined>(undefined);

  useEffect(() => {
    setHref(`mailto:${site.emailUser}@${site.emailDomain}`);
  }, []);

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (!href) e.preventDefault();
      }}
    >
      {label ?? site.emailDisplay}
    </a>
  );
}
