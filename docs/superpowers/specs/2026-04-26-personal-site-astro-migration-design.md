# Personal Site Astro Migration — Design

**Date:** 2026-04-26
**Status:** Approved
**Author:** Yuhan Wang (with Claude)

## Summary

Migrate `yuhanwang14.github.io` from Jekyll (academicpages-style template) to Astro with TypeScript, taking architectural cues from the Engram-Website (Astro 6 + MDX + Content Collections). Preserve the academic "genre" of the existing site — single-author, scholarly, multi-section — but replace the template aesthetic with intentional editorial typography, real multi-route navigation, and a strict-typed content schema.

The current site has two structural problems:

1. **Toy router.** The about page is a single 379-line Jekyll markdown file that uses `display: none` + `showTab()` JS to switch between Homepage / Research / Industry / Skills. URLs do not change. Browser back/forward, link sharing, and SEO all break.
2. **Toy blog.** Blog posts have only `title / date / excerpt` frontmatter. There is no schema validation, no categories or tags, no pagination, no pinning, no draft state, no reading time, no TOC, no RSS, no per-post SEO. The blog index is hand-rolled HTML inside a Jekyll markdown file.

This redesign replaces both with the Astro patterns observed in Engram-Website, adapted to a single-author personal site.

## Non-Goals

- Visual identity of the Engram-Website (dark / glass / purple). Not used. New visual is academicpages-derived (light cream + serif body + oxblood accent), with dark mode that follows system preference.
- Related posts, full-text search, comments, newsletter, webmentions, custom domain, i18n. Out of scope for this iteration.
- Migrating off GitHub Pages hosting. Stay on `yuhanwang14.github.io`, deploy Astro build via GitHub Actions.

## Architecture

### Stack

- **Framework:** Astro 6 + MDX + TypeScript (strict mode)
- **Styling:** Tailwind CSS 3 with CSS variables for theme tokens
- **Content:** Astro Content Collections + Zod schema validation
- **Markdown processor:** MDX (replacing kramdown). Footnotes enabled via Astro's built-in GFM support; the references heading is configured via `remarkRehype.footnoteLabel: 'References'` (matching the Engram-Website setup).
- **Image:** Astro `<Image>` + sharp for responsive srcset / WebP
- **RSS:** `@astrojs/rss`
- **Sitemap:** `@astrojs/sitemap`
- **Hosting:** GitHub Pages, built and deployed by GitHub Actions (`actions/deploy-pages@v4`)
- **Client JS posture:** Zero JS by default. Where interaction is needed (theme sync, TOC scroll-spy), use TypeScript inside `<script>` tags. No React islands unless a future feature requires one.

### Routes

| Path | Source | Purpose |
|---|---|---|
| `/` | `pages/index.astro` | Homepage: about + news + publications. Includes compact ProfileCard. |
| `/research` | `pages/research.astro` | Research experience (MIT Media Lab, Imperial Mech Eng, UESTC). |
| `/industry` | `pages/industry.astro` | Industry roles (Engram, Millennium, Five Stars) + Personal Projects. |
| `/skills` | `pages/skills.astro` | Skills tree. |
| `/blog` | `pages/blog/index.astro` | Listing page 1 (10 posts/page, pinned posts on top). |
| `/blog/[page]` | `pages/blog/[page].astro` | Listing pages 2+. |
| `/blog/[...slug]` | `pages/blog/[...slug].astro` | Individual post. |
| `/blog/tags/[tag]` | `pages/blog/tags/[tag].astro` | Tag-filtered listing. |
| `/rss.xml` | `pages/rss.xml.ts` | RSS feed. |
| `/sitemap-index.xml` | `@astrojs/sitemap` | Auto-generated. |
| `/404` | `pages/404.astro` | Not found page. |

The about page is split from one Jekyll file with JS tabs into four real routes. Browser navigation, link sharing, and SEO all work correctly.

### Content Schema

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    coverImage: image().optional(),
  }),
});

export const collections = { blog };
```

Notes:
- No `category` field. Tags only — fewer posts make a 4-bucket category taxonomy artificial.
- No `author` field. Single-author site; author info lives in the global Footer/ProfileCard.
- Reading time is computed from `post.body` word count (200 wpm), not stored in frontmatter.

### About-page Data

Content currently inlined as HTML in `_pages/about.md` (research bullets, industry bullets, projects, skills, news, publications) is extracted to typed TypeScript modules under `src/data/`:

```ts
// src/data/research.ts
export interface ResearchItem {
  org: string;
  group?: string;
  role: string;
  location?: string;
  startDate: string;   // 'YYYY-MM' or 'YYYY-MM-DD'
  endDate?: string;    // 'present' | 'YYYY-MM' | 'YYYY-MM-DD'
  bullets: string[];   // can contain inline markdown
}
export const research: ResearchItem[] = [ /* ... */ ];
```

Equivalent typed modules: `industry.ts`, `projects.ts`, `skills.ts`, `news.ts`, `publications.ts`. Pages render via `data.map(...)` in Astro components.

This solves the "if I forget a field on one item, the layout silently breaks" failure mode of the current Jekyll markdown approach.

### Directory Layout

```
src/
├── content.config.ts
├── content/blog/
│   └── 2026-03-25-generation-is-not-creation.mdx
├── layouts/
│   ├── BaseLayout.astro
│   ├── PageLayout.astro
│   └── BlogPost.astro
├── components/
│   ├── shared/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── ProfileCard.astro
│   │   ├── ThemeScript.astro
│   │   └── SEO.astro
│   └── blog/
│       ├── PostCard.astro
│       ├── PostMeta.astro
│       ├── TableOfContents.astro
│       ├── TagList.astro
│       └── Pagination.astro
├── pages/
│   ├── index.astro
│   ├── research.astro
│   ├── industry.astro
│   ├── skills.astro
│   ├── 404.astro
│   ├── rss.xml.ts
│   └── blog/
│       ├── index.astro
│       ├── [page].astro
│       ├── [...slug].astro
│       └── tags/[tag].astro
├── lib/
│   └── blog.ts
├── data/
│   ├── research.ts
│   ├── industry.ts
│   ├── projects.ts
│   ├── skills.ts
│   ├── news.ts
│   ├── publications.ts
│   └── site.ts          // site-wide: name, role, social, etc.
├── styles/
│   └── global.css
└── assets/
    ├── images/
    └── fonts/
```

## Visual System

### Goal

Keep the academicpages "genre" (light, scholarly, multi-section, optional sidebar profile). Replace template-default execution with intentional editorial typography. The site should feel like a printed booklet, not a screen.

### Theme Tokens

```css
/* src/styles/global.css */
:root {
  --bg:        #FAF7F1;   /* warm cream */
  --bg-alt:    #F1EDE3;   /* code background, subtle blocks */
  --ink:       #1B1A17;   /* deep ink (not pure black) */
  --muted:     #6B6760;   /* warm gray */
  --hairline:  #D4CFC4;
  --accent:    #7A1F2B;   /* oxblood */
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg:        #1A1714;   /* warm graphite */
    --bg-alt:    #24201B;
    --ink:       #ECE7DA;   /* parchment */
    --muted:     #9A9388;
    --hairline:  #3A352E;
    --accent:    #C97D85;   /* dusty rose */
  }
}
```

Theme follows system preference via `prefers-color-scheme`. No manual toggle in this iteration.

### Typography

| Role | Font | Source |
|---|---|---|
| Body, display | Newsreader (variable) | Self-hosted (woff2) |
| UI, navigation, labels | Geist | Self-hosted (woff2) |
| Code, dates, numbers, metadata | JetBrains Mono | Self-hosted (woff2) |

Self-hosted to avoid Google Fonts privacy/perf issues and to stay deployable on GitHub Pages without a third-party DNS dependency.

### Spatial / Detail Rules

- **Reading column:** `max-w-[680px]` for blog posts; `max-w-[720px]` for about subpages. Centered.
- **Smallcaps labels:** category-style labels (date pills, tag pills, section eyebrows) use Geist + uppercase + letter-spacing 0.12em.
- **Hairlines, not borders:** all dividers are `1px solid var(--hairline)`. No `box-shadow`.
- **No card chrome:** PostCard is hairline-divided rows, not boxes. RemoveBootstrap card aesthetic from current paper-box / archive-item.
- **Hover states:** color transition only (200ms). No translate, no scale, no shadow.
- **Motion:** single 200ms `fade-up` on initial page mount. No scroll-triggered reveals. No staggered animations.
- **Numbers and dates:** rendered in JetBrains Mono (academic numerical literacy signal).

### Component Highlights

- **Navbar.** Site name in Newsreader (serif) on the left. Routes in Geist smallcaps on the right. Active route gets `border-bottom: 2px var(--accent)`. Sticky. No scroll-blur effect.
- **ProfileCard.** Used only on `/`. Compact: 80px round avatar, name, one-line role, location, social icons. Mobile: above content. Desktop: right rail (200px wide). Includes Google Scholar shieldsio badge.
- **PostCard.** Title (Newsreader 600) + description (italic, muted) + date (JetBrains Mono smallcaps) + tag pills. Separated by hairline.
- **BlogPost layout.** Header: smallcaps date + reading time + tags; H1 (Newsreader 600); description (italic muted); hairline. TOC (only if H2 count ≥ 3, scroll-spy with active accent). Body in prose styles. Footer hairline + tags + "← Back to /blog".
- **Footer.** Name + © year + social links + "RSS" link. Geist 12px, muted. Hairline above.

### Prose Styles

```css
.prose-academic {
  font-family: Newsreader, Georgia, serif;
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--ink);
}
.prose-academic h2 { font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; scroll-margin-top: 6rem; }
.prose-academic h3 { font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; scroll-margin-top: 6rem; }
.prose-academic a  { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
.prose-academic blockquote { border-left: 2px solid var(--accent); padding-left: 1.25rem; font-style: italic; color: var(--muted); }
.prose-academic code:not(pre code) { background: var(--bg-alt); padding: 0.1rem 0.35rem; border-radius: 3px; font-size: 0.92em; }
.prose-academic pre { background: var(--bg-alt); padding: 1rem; border-radius: 6px; overflow-x: auto; font-size: 0.875rem; }
.prose-academic img { display: block; margin: 1.5rem auto; max-width: 520px; width: 100%; border-radius: 4px; }
.prose-academic > :first-child img,
.prose-academic > img:first-child { max-width: 100%; }   /* hero image full width */
.prose-academic hr { border: 0; border-top: 1px solid var(--hairline); margin: 2.5rem 0; }
```

## SEO / Meta

- BaseLayout sets `<title>`, meta description, canonical URL, OG image, Twitter card.
- BlogPost layout adds JSON-LD `BlogPosting` (headline, description, datePublished, dateModified, author = Yuhan Wang).
- Sitemap auto-generated by `@astrojs/sitemap`.
- RSS at `/rss.xml` with title, link, pubDate, description, full content.
- `robots.txt` with sitemap reference.

## Migration Strategy

Branch-based migration with subfolder archive:

1. Create branch `feat/astro-migration` from `main`.
2. `git mv` the entire current Jekyll tree into `_jekyll-legacy/` (preserves history; build excludes this folder).
3. Initialize Astro project at repo root: `package.json`, `astro.config.mjs`, `tailwind.config.js`, `tsconfig.json`, `src/`, `public/`.
4. Build the new site:
   - Stand up `BaseLayout`, `Navbar`, `Footer`, `ProfileCard`, `ThemeScript`, `global.css`.
   - Extract about-page content from `_jekyll-legacy/_pages/about.md` into typed modules in `src/data/`.
   - Build `index.astro`, `research.astro`, `industry.astro`, `skills.astro`.
   - Build blog: content collection, listing, pagination, post layout, TOC, tag pages.
   - Migrate the existing post `2026-03-25-generation-is-not-creation.md` to MDX, add full frontmatter, copy hero image to `src/assets/images/`.
   - Add RSS, sitemap, 404.
5. Add `.github/workflows/deploy.yml` for Astro → GitHub Pages.
6. Visual QA: build, preview, walk every route in light + dark mode, confirm Lighthouse > 95.
7. Once verified, remove Jekyll-specific files:
   - **Delete:** `_jekyll-legacy/`, `Gemfile`, `Gemfile.lock`, `vendor/`, `_sass/`, `_includes/`, `_layouts/`, `_pages/`, `_posts/`, `_data/`, `_site/`, `assets/css/`, `assets/js/`, `auto_commit.sh`, `simple_commit.sh`, `watch_and_commit.sh`, `run_server.sh`, `.bundle/`, `.ruby-lsp/`, `_config.yml`, `AUTO_COMMIT_README.md`.
   - **Keep:** `LICENSE`, `README.md` (rewrite for Astro), `docs/`, `.github/` (rewrite workflow), `google_scholar_crawler/` and its workflow (the about page uses its CDN-served `gs_data_shieldsio.json`; do not break the badge).
   - **Move image assets:** `images/yuhan.png` → `src/assets/images/yuhan.png`. `images/blog/hero-generation-vs-creation.png`, `images/blog/hilma-af-klint-adulthood.jpg`, `images/blog/scaffold-threshold.png` → `src/assets/images/blog/`. `images/PAGE-4D.gif` → `src/assets/images/publications/`. Other root `images/*` favicons go to `public/`.
   - **Promote favicons:** `images/favicon*.{ico,png}`, `images/site.webmanifest`, `images/apple-touch-icon.png`, `images/android-chrome-*.png` → `public/` so they continue to resolve at root paths.
8. Open PR; merge to `main` after spot-check.

## Open Questions / Future Work

- **Manual theme override:** add a button to override `prefers-color-scheme` and persist in `localStorage`. Skipped this iteration.
- **Search:** add Pagefind once post count > 10.
- **Related posts:** add once post count ≥ 5 (cosine similarity over tag sets).
- **Custom domain:** consider `yuhanwang.dev` or similar. Out of scope.
- **Webmentions / IndieWeb:** out of scope.

## URL Compatibility Note

Jekyll's existing config (`permalink: /:categories/:title/`) renders the current post at `/generation-is-not-creation/` because the post has no categories — the `:categories/` segment collapses. The new Astro site moves all posts under `/blog/<slug>/`. Since the post was published 2026-03-25 (≈1 month before this migration), inbound links are negligible and we accept the URL change without a redirect. The home (`/`) and blog index (`/blog/`) URLs are preserved.

## Acceptance Criteria

- [ ] `/`, `/blog/`, `/research/`, `/industry/`, `/skills/`, `/blog/<slug>/`, `/blog/tags/<tag>/`, `/rss.xml`, `/sitemap-index.xml`, `/404` all resolve and render correctly.
- [ ] Existing blog post `Generation Is Not Creation` renders correctly with full prose, hero image, two inline images, footnotes-style emphasis, and TOC at top.
- [ ] Lighthouse Performance ≥ 95 and Accessibility ≥ 95 on `/` and `/blog/generation-is-not-creation/`.
- [ ] Site renders correctly in both light and dark mode (verify by toggling system preference).
- [ ] `/`, `/research/`, `/industry/`, `/skills/`, `/blog/` ship zero JS (verify the page has no `<script>` tags that load JS at runtime; theme switching is pure CSS via media query).
- [ ] `/blog/<slug>/` may ship a small inline TS script for TOC scroll-spy (≤ 1 KB gzipped).
- [ ] `astro build` succeeds with no warnings.
- [ ] TypeScript `tsc --noEmit` succeeds in strict mode.
- [ ] GitHub Actions deploy workflow runs green on `main` and the deployed site at `https://yuhanwang14.github.io/` matches the local preview.
- [ ] Google Scholar shieldsio badge on `/` continues to display the citation count from the existing `google-scholar-stats` branch / CDN.
