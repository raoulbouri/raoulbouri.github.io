# Rahul Bouri — Portfolio

Single-page portfolio (Next.js App Router) with a sticky top nav, green-accented
light/dark themes, an interactive robotics hero element, and per-project MDX case
studies. Built to the spec in `../portfolio_master_prompt.md`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static-friendly)
npm start        # serve the production build
```

Requires Node 18.17+ (works on Node 24).

## Where to edit content (all TODO(Rahul) slots)

Content is deliberately separated from components so you can write prose without
touching JSX. Search the repo for `TODO(Rahul)` to find every slot.

| What | File |
|------|------|
| Name, links, tagline, résumé path, site URL | `content/site.ts` |
| Work timeline + per-role narrative | `content/experience.ts` |
| Education, skills | `content/experience.ts` |
| Project cards (facts, tags, highlights) | `content/projects.ts` |
| Project case studies (long-form prose) | `content/projects/<slug>.mdx` |
| About / research statement copy | `src/components/About.tsx`, `src/components/Research.tsx` |

## Add project images

Drop assets in `public/projects/` and reference them:

- Card covers: set `cover` in `content/projects.ts` (currently a schematic
  placeholder renders until you do).
- In-case-study figures/GIFs: `![alt](/projects/your-file.png)` inside the `.mdx`.

## Before you ship

1. **Verify your GitHub handle** in `content/site.ts` (`raoulbouri` vs `rahulbouri`).
2. Set `site.url` to the real domain (drives SEO / OpenGraph / sitemap).
3. Add `rahul-bouri-cv.pdf` to `public/` and set `site.resume`.
4. Rewrite every `TODO(Rahul)` in your own voice.
5. Only list real publications in `Research.tsx` — the section says so.

## The interactive arm

`src/components/RoboticArm.tsx` — a canvas 3-link CCD-IK arm that follows the
cursor and, on click, shows a force vector + a shrinking covariance ellipse
(a nod to `proprioceptive-contact-detection`). It honors
`prefers-reduced-motion` (static pose, no loop) and re-reads theme colors on
toggle.

## Deploy

Recommended: **Vercel** (import the repo, zero config). For GitHub Pages you'd
need `output: "export"` in `next.config.mjs` and to swap the MDX RSC rendering
for build-time compilation — Vercel is the smoother path.

## Stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS 3 · Framer Motion ·
next-mdx-remote.
