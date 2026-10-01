import type { Metadata } from "next";
import { site } from "@content/site";
import { RedirectNow } from "./RedirectNow";

// raoulbouri.github.io/resume → the résumé on Google Drive. GitHub Pages can't
// do server-side redirects, so this is a static page that redirects with a
// meta refresh (works without JS) plus location.replace (no extra history
// entry), and shows a plain link as a last resort.
export const metadata: Metadata = {
  title: "Résumé",
  robots: { index: false, follow: true },
};

export default function ResumeRedirect() {
  return (
    <section className="container-max pb-16 pt-28">
      <meta httpEquiv="refresh" content={`0;url=${site.resume}`} />
      <RedirectNow to={site.resume} />
      <p className="text-muted">
        Opening the résumé…{" "}
        <a href={site.resume} className="link-underline">
          Continue to Google Drive
        </a>
        .
      </p>
    </section>
  );
}
