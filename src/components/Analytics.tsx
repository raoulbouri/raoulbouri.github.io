import Script from "next/script";
import { site } from "@content/site";

// Google Analytics 4 (gtag.js) — the same snippet the academicpages guide adds
// to its Jekyll layout, rendered here through next/script.
//
// It is inert until `site.gaMeasurementId` is set, is left out of `next dev`
// entirely, and only sends hits from the real domain, so local previews of the
// production build never pollute the numbers. GA4's enhanced measurement
// records client-side navigations (history changes) without extra code.
export function Analytics() {
  const id = site.gaMeasurementId;
  if (!id || process.env.NODE_ENV !== "production") return null;
  const host = new URL(site.url).hostname;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
if (location.hostname === ${JSON.stringify(host)}) {
  gtag('js', new Date());
  gtag('config', ${JSON.stringify(id)});
}`}
      </Script>
    </>
  );
}
