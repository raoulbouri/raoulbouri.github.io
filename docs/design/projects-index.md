# Design: home shows 3 projects, "All projects" page shows the rest

Status: **v2 — built on localhost with the recommended options (D1–D6)** · Owner: Rahul · Last updated: 2026-10-05

Decisions taken: D1 Video to Humanoid (lead), F1TENTH, Robot Learning in Sim · D2 filter by category · D3 newest first, in-progress pinned · D4 lighter home cards (the wide lead card keeps its highlights) · D5 posters that play on hover · D6 header link + button. Next: v3 visual polish after review.

## 1. Goal

- The home page should make a fast first impression: **3 projects**, chosen on purpose, not every project.
- Every project stays reachable from **one "View all projects" button** that opens a dedicated page.
- The all-projects page should scale as projects are added (coursework, side projects, research), and let a
  visitor find the kind of work they care about.

Non-goals for this iteration: a blog, search, comments, or changing the case-study page layout.

## 2. Current state

- `/` renders every `featured` project in a 2-column grid (`FeaturedProjects.tsx`); a `wide` project spans both
  columns. With 5 projects that is 1 wide + a 2×2, about 3,000 px of scrolling on a phone before Experience.
- Case studies live at `/projects/<slug>` (static export, one MDX file each).
- There is **no `/projects` page**; the nav's "Projects" link is `#projects`, which also does nothing on a
  case-study page (known bug).

## 3. Proposal

### 3.1 Home page — "Featured" (3 cards)

```
FEATURED PROJECTS                                   View all projects (5) →
┌──────────────────────────────────────────────────────────────────────┐
│  [ video 16:9 ]           │  Video to Humanoid — Whole-Body …          │  ← lead card (wide)
│                           │  summary · 3 highlights · tags · Read →   │
└──────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────┐ ┌─────────────────────────────────┐
│ [ cover ]                        │ │ [ cover ]                        │
│ F1TENTH Autonomy Stack           │ │ Robot Learning in Sim            │
│ summary · tags · Read →          │ │ summary · tags · Read →          │
└─────────────────────────────────┘ └─────────────────────────────────┘
                     [  View all 5 projects  →  ]                        ← primary button, centred
```

- 1 lead card (wide) + 2 regular cards = a balanced block on desktop, three stacked cards on phones.
- Home cards get **lighter**: summary + tags, highlights moved to the all-projects page / case study (option B
  in §5) — shortens the home page further.
- Button text includes the count ("View all 5 projects") so visitors know there's more.

### 3.2 New page — `/projects` ("All projects")

```
← Home
ALL PROJECTS
Robotics, robot learning and ML systems — hardware, simulation and research.

[ All (5) ] [ Hardware (2) ] [ Robot learning (2) ] [ Simulation (3) ] [ Estimation (1) ]    ● In progress ✓ Complete
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ cover         │ │ cover         │ │ cover         │
│ Title         │ │ Title         │ │ Title         │
│ Oct 2026 · ✓  │ │ Sep 2026 · ✓  │ │ Present · ●   │
│ one-line      │ │ one-line      │ │ one-line      │
│ tags          │ │ tags          │ │ tags          │
└───────────────┘ └───────────────┘ └───────────────┘
```

- **Grid:** 3 columns desktop, 2 tablet, 1 phone. All cards the same size (no wide card here).
- **Order:** newest first (by `period`), in-progress projects pinned to the top — or manual `order` (decision D3).
- **Filters:** a row of category chips (client-side, no reload; the selected filter is kept in the URL as
  `?type=hardware` so it can be shared). Categories are a new `category` field per project, separate from the
  free-form tags (decision D2).
- **Covers:** the same media as home, but static poster images instead of autoplaying video, so a page with
  many cards stays light — the video plays on hover (desktop) or on the case-study page.

### 3.3 Navigation

- Nav "Projects" → `/projects` everywhere (fixes the dead link on case-study pages); other nav links become
  `/#experience` etc. so they work from any page.
- Case-study "← All projects" links go to `/projects` instead of `/#projects`.
- Optional: "Next project →" at the bottom of each case study, following the all-projects order.

## 4. Data model changes (`content/projects.ts`)

| Field | Purpose |
|---|---|
| `featured` (exists) | show on home; validated to **exactly 3** at build time |
| `order` (exists) | position among featured |
| `wide` (exists) | the lead card on home |
| `category` (new) | one or more of: hardware, robot-learning, simulation, estimation, ml-systems |
| `start` / `end` (new, optional) | machine-readable dates for sorting; `period` stays the display string |
| `oneLiner` (new, optional) | shorter summary for the dense all-projects grid; falls back to `summary` |

## 5. Options to decide

| # | Question | Options | Recommendation |
|---|---|---|---|
| D1 | Which 3 on home? | any 3 of the 5 | Video to Humanoid (lead), F1TENTH, Robot Learning in Sim — newest, plus one hardware and one learning project |
| D2 | Filter categories | none · by category · by tag | by category (5 fixed, curated) — tags are too many to filter on |
| D3 | Sort on all-projects page | newest first · manual order | newest first, in-progress pinned |
| D4 | Home card density | as today (summary + highlights + tags) · lighter (summary + tags) | lighter on home, full on all-projects |
| D5 | All-projects covers | autoplay video · poster, play on hover · static image | poster, play on hover |
| D6 | Button placement | under the grid · in the section header · both | both (header link + button under the grid) |

## 6. Implementation plan

1. **Data:** add `category`, `start`/`end`, `oneLiner`; build-time check that exactly 3 projects are featured.
2. **Home:** `FeaturedProjects` renders the 3 featured cards + "View all N projects" button and header link.
3. **Page:** `src/app/projects/page.tsx` (static export → `/projects/index.html`) with the grid and a small
   client-side filter component; `?type=` read on load.
4. **Nav & links:** absolute links (`/projects`, `/#experience`, …); case-study back links; optional next-project link.
5. **SEO:** `/projects` in `sitemap.ts`, page title/description; Google Analytics tracks the page automatically.
6. **QA:** desktop + phone screenshots (Chromium and WebKit), every filter, no horizontal scroll, all links work
   from home, `/projects` and a case study; preview on localhost before any push.

Rough size: one day of work across 3–4 small commits.

## 7. Iteration plan

- **v1 (this doc):** agree on D1–D6.
- **v2:** build on localhost with the chosen options; review screenshots together.
- **v3:** visual polish (card density, filter style, empty states, hover behaviour), then publish.

## 8. Open questions

- Should coursework (F1TENTH, Robot Learning in Sim) be labelled as coursework on the cards?
- Do you want a "Selected publications" or "Writing" link next to "All projects" later?
