# Personal Site Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `yuhanwang14.github.io` from a Jekyll/academicpages site to a TypeScript-strict Astro 6 site with MDX content collections, real multi-route navigation, an editorial visual system, and zero client-side JS by default.

**Architecture:** Astro 6 + MDX + Tailwind CSS + Content Collections + Zod schemas. Self-hosted Newsreader/Geist/JetBrains Mono. CSS-variable theming with `prefers-color-scheme` dark mode. Branch-based migration: archive existing Jekyll into `_jekyll-legacy/`, build Astro at repo root, deploy via GitHub Actions to GitHub Pages, delete legacy at the end.

**Tech Stack:** Astro 6, TypeScript (strict), Tailwind CSS 3, MDX, Zod, sharp, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`, vitest (for `lib/blog.ts` unit tests).

**Spec:** `docs/superpowers/specs/2026-04-26-personal-site-astro-migration-design.md`.

---

## File Structure (planned)

```
.
├── .github/workflows/deploy.yml             # Astro build + GitHub Pages deploy
├── astro.config.mjs                         # Astro config: integrations, site URL, MDX
├── tailwind.config.js                       # Tailwind config: theme tokens, content paths
├── postcss.config.cjs                       # PostCSS for Tailwind
├── tsconfig.json                            # TypeScript strict mode
├── package.json                             # Astro + Tailwind + vitest deps
├── vitest.config.ts                         # Vitest config for lib/blog.ts tests
├── public/                                  # static assets served as-is
│   ├── favicon.ico                          # moved from images/
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── site.webmanifest
│   └── robots.txt
├── src/
│   ├── content.config.ts                    # blog collection + Zod schema
│   ├── content/blog/
│   │   └── 2026-03-25-generation-is-not-creation.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro                 # html shell, fonts, theme, SEO/OG
│   │   ├── PageLayout.astro                 # centered reading column for about subpages
│   │   └── BlogPost.astro                   # post layout: header, TOC, prose, footer
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Navbar.astro                 # top navigation
│   │   │   ├── Footer.astro                 # site footer
│   │   │   ├── ProfileCard.astro            # compact author card (homepage only)
│   │   │   └── SEO.astro                    # OG/Twitter meta + JSON-LD slot
│   │   └── blog/
│   │       ├── PostCard.astro               # listing item
│   │       ├── PostMeta.astro               # date + reading time row
│   │       ├── TableOfContents.astro        # H2 scroll-spy
│   │       ├── TagList.astro                # tag pills
│   │       └── Pagination.astro             # 1 / 2 / 3 ...
│   ├── pages/
│   │   ├── index.astro                      # /
│   │   ├── research.astro                   # /research
│   │   ├── industry.astro                   # /industry
│   │   ├── skills.astro                     # /skills
│   │   ├── 404.astro                        # /404
│   │   ├── rss.xml.ts                       # /rss.xml
│   │   └── blog/
│   │       ├── index.astro                  # /blog (page 1)
│   │       ├── [page].astro                 # /blog/2, /blog/3, ...
│   │       ├── [...slug].astro              # /blog/<slug>
│   │       └── tags/[tag].astro             # /blog/tags/<tag>
│   ├── lib/
│   │   ├── blog.ts                          # formatDate, estimateReadingTime, slugify
│   │   └── blog.test.ts                     # vitest unit tests
│   ├── data/
│   │   ├── site.ts                          # site metadata + author
│   │   ├── news.ts                          # news items
│   │   ├── publications.ts                  # publications
│   │   ├── research.ts                      # research positions
│   │   ├── industry.ts                      # industry positions
│   │   ├── projects.ts                      # personal projects
│   │   └── skills.ts                        # skills tree
│   ├── styles/
│   │   └── global.css                       # CSS vars, prose, smallcaps, base resets
│   └── assets/
│       ├── fonts/                           # self-hosted woff2
│       └── images/
│           ├── yuhan.png
│           ├── blog/
│           │   ├── hero-generation-vs-creation.png
│           │   ├── hilma-af-klint-adulthood.jpg
│           │   └── scaffold-threshold.png
│           └── publications/
│               └── PAGE-4D.gif
└── _jekyll-legacy/                          # the entire previous Jekyll tree (deleted at end)
```

---

## Task 0: Create migration branch

**Files:** none

- [ ] **Step 1: Verify clean working tree**

Run: `git status`
Expected: clean (no untracked/uncommitted) — note: vendor/ entries from earlier Bundler runs are tracked or ignored as-is; they will be wiped at the end. If there are any uncommitted user changes, stop and ask.

- [ ] **Step 2: Create and switch to feature branch**

Run: `git checkout -b feat/astro-migration`
Expected: `Switched to a new branch 'feat/astro-migration'`

- [ ] **Step 3: Confirm branch**

Run: `git branch --show-current`
Expected: `feat/astro-migration`

---

## Task 1: Archive Jekyll into `_jekyll-legacy/`

**Files:**
- Move: every Jekyll-related file to `_jekyll-legacy/`

- [ ] **Step 1: Create archive directory**

Run: `mkdir -p _jekyll-legacy`

- [ ] **Step 2: Move Jekyll directories and files**

Use plain `mv` (not `git mv`) because some directories have untracked content (`vendor/`, `.bundle/`, `.ruby-lsp/`). After the move, `git add -A` in step 5 captures both deletions of old paths and additions of new paths, recording them as renames where content matches.

Run:
```bash
mv _config.yml _jekyll-legacy/
mv _data _jekyll-legacy/
mv _includes _jekyll-legacy/
mv _layouts _jekyll-legacy/
mv _pages _jekyll-legacy/
mv _posts _jekyll-legacy/
mv _sass _jekyll-legacy/
mv assets _jekyll-legacy/
mv images _jekyll-legacy/
mv Gemfile _jekyll-legacy/
mv Gemfile.lock _jekyll-legacy/
mv vendor _jekyll-legacy/
mv auto_commit.sh _jekyll-legacy/
mv simple_commit.sh _jekyll-legacy/
mv watch_and_commit.sh _jekyll-legacy/
mv run_server.sh _jekyll-legacy/
mv AUTO_COMMIT_README.md _jekyll-legacy/
[ -d _site ]      && mv _site      _jekyll-legacy/ || true
[ -d .bundle ]    && mv .bundle    _jekyll-legacy/ || true
[ -d .ruby-lsp ]  && mv .ruby-lsp  _jekyll-legacy/ || true
```

Note: `.github/`, `LICENSE`, `README.md`, `docs/`, `.gitignore`, `google_scholar_crawler/` stay at the repo root.

- [ ] **Step 3: Verify the move**

Run: `ls _jekyll-legacy/ && ls`
Expected: `_jekyll-legacy/` contains the moved Jekyll files; root still has `.github`, `LICENSE`, `README.md`, `docs`, `.gitignore`, `google_scholar_crawler`.

- [ ] **Step 4: Update `.gitignore` to exclude future Astro outputs**

Replace `.gitignore` content with:

```gitignore
# Astro
node_modules/
dist/
.astro/

# Environment
.env
.env.production
.env.local

# OS
.DS_Store

# Editor
.vscode/
.idea/

# Jekyll legacy (kept until end of migration; deleted at Task 35)
_jekyll-legacy/.bundle/
_jekyll-legacy/_site/
_jekyll-legacy/.sass-cache/
_jekyll-legacy/.jekyll-cache/
_jekyll-legacy/.ruby-lsp/
_jekyll-legacy/vendor/

# Vitest
coverage/
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: archive Jekyll site into _jekyll-legacy/ for migration"
```

---

## Task 2: Initialize Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "yuhanwang14.github.io",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@astrojs/mdx": "^5.0.3",
    "@astrojs/rss": "^4.0.18",
    "@astrojs/sitemap": "^3.7.2",
    "astro": "^6.1.4",
    "sharp": "^0.33.5"
  },
  "devDependencies": {
    "@astrojs/check": "^0.10.0",
    "@types/node": "^22.0.0",
    "autoprefixer": "^10.4.24",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.19",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "node_modules", "_jekyll-legacy"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["astro/client"]
  }
}
```

- [ ] **Step 3: Create `astro.config.mjs`**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yuhanwang14.github.io',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-default',
      },
    },
    remarkRehype: {
      footnoteLabel: 'Notes',
    },
  },
  vite: {
    css: {
      transformer: 'postcss',
    },
  },
});
```

- [ ] **Step 4: Install dependencies**

Run: `npm install`
Expected: dependencies install without errors. `node_modules/` and `package-lock.json` appear.

- [ ] **Step 5: Verify Astro CLI works**

Run: `npx astro --version`
Expected: prints `6.x.x`.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json astro.config.mjs
git commit -m "feat: initialize Astro 6 project with TypeScript strict mode"
```

---

## Task 3: Configure Tailwind CSS

**Files:**
- Create: `tailwind.config.js`, `postcss.config.cjs`, `src/styles/global.css`

- [ ] **Step 1: Create `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        'var(--bg)',
        'bg-alt':  'var(--bg-alt)',
        ink:       'var(--ink)',
        muted:     'var(--muted)',
        hairline:  'var(--hairline)',
        accent:    'var(--accent)',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans:  ['Geist', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        'reading': '720px',
        'post':    '680px',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Create `postcss.config.cjs`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 3: Create `src/styles/global.css` with theme tokens and base styles**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg:        #FAF7F1;
  --bg-alt:    #F1EDE3;
  --ink:       #1B1A17;
  --muted:     #6B6760;
  --hairline:  #D4CFC4;
  --accent:    #7A1F2B;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg:        #1A1714;
    --bg-alt:    #24201B;
    --ink:       #ECE7DA;
    --muted:     #9A9388;
    --hairline:  #3A352E;
    --accent:    #C97D85;
  }
}

@layer base {
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg text-ink font-serif;
  }

  ::selection {
    @apply bg-accent/20 text-ink;
  }
}

@layer components {
  .reading-column {
    @apply max-w-reading mx-auto px-6;
  }

  .post-column {
    @apply max-w-post mx-auto px-6;
  }

  .label-smallcaps {
    @apply font-sans text-xs uppercase tracking-[0.12em] font-medium text-muted;
  }

  .hairline {
    @apply border-t border-hairline;
  }

  .fade-in-on-load {
    animation: fadeIn 200ms ease-out both;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
}

@layer utilities {
  /* prose styles for blog post body */
  .prose-academic {
    @apply text-ink;
    font-size: 1.0625rem;
    line-height: 1.75;
  }
  .prose-academic h2 {
    @apply font-serif font-semibold text-ink mt-12 mb-4;
    font-size: 1.5rem;
    scroll-margin-top: 6rem;
  }
  .prose-academic h3 {
    @apply font-serif font-semibold text-ink mt-8 mb-3;
    font-size: 1.2rem;
    scroll-margin-top: 6rem;
  }
  .prose-academic p { @apply my-5; }
  .prose-academic a {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .prose-academic strong { @apply font-semibold text-ink; }
  .prose-academic em { @apply italic; }
  .prose-academic blockquote {
    border-left: 2px solid var(--accent);
    @apply pl-5 my-6 italic text-muted;
  }
  .prose-academic ul, .prose-academic ol { @apply my-5 pl-6; }
  .prose-academic ul li { @apply list-disc mb-2; }
  .prose-academic ol li { @apply list-decimal mb-2; }
  .prose-academic code:not(pre code) {
    background: var(--bg-alt);
    @apply px-1.5 py-0.5 rounded text-[0.92em] font-mono;
  }
  .prose-academic pre {
    background: var(--bg-alt);
    @apply p-4 rounded my-6 overflow-x-auto text-sm;
  }
  .prose-academic img {
    @apply mx-auto my-6 rounded;
    max-width: 520px;
    width: 100%;
  }
  .prose-academic > :first-child img,
  .prose-academic > img:first-child {
    max-width: 100%;
    @apply my-8;
  }
  .prose-academic hr {
    @apply border-0 border-t border-hairline my-10;
  }
  .prose-academic table { @apply w-full my-6 text-sm; }
  .prose-academic th { @apply text-left font-semibold pb-2 border-b border-hairline; }
  .prose-academic td { @apply py-2 border-b border-hairline/60; }

  /* footnote styles (GFM) */
  .prose-academic .footnotes {
    @apply mt-12 pt-6 border-t border-hairline text-sm text-muted;
  }
  .prose-academic .footnotes ol { @apply pl-6; }
}
```

- [ ] **Step 4: Verify Tailwind compiles by running dev**

Run: `npm run dev`

Expected: Astro starts, builds Tailwind without errors. Note the URL (default `http://localhost:4321`). Press `Ctrl+C` to stop. (No pages exist yet — that's fine; we just confirm no compile error.)

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js postcss.config.cjs src/styles/global.css
git commit -m "feat: configure Tailwind with theme tokens and prose styles"
```

---

## Task 4: Set up self-hosted fonts

**Files:**
- Create: `src/assets/fonts/` (woff2 files), font-face declarations in `src/styles/global.css`

Note: download woff2 files from each font's official distribution. Newsreader and JetBrains Mono are on Google Fonts (use a tool like `google-webfonts-helper` to grab self-hostable woff2). Geist is on `vercel.com/font` and GitHub `vercel/geist-font`.

- [ ] **Step 1: Create fonts directory**

Run: `mkdir -p src/assets/fonts`

- [ ] **Step 2: Download font files**

Place these files in `src/assets/fonts/`:
- `Newsreader-Variable.woff2` (variable axis 200..800, normal style)
- `Newsreader-Variable-Italic.woff2` (variable axis 200..800, italic style)
- `Geist-Variable.woff2` (variable axis 100..900)
- `JetBrainsMono-Variable.woff2` (variable axis 100..800)

Source URLs (manual download):
- Newsreader: https://fonts.google.com/specimen/Newsreader → "Get font" → "Download all" → extract `.ttf` and convert to woff2 (or use https://gwfh.mranftl.com/fonts/newsreader to grab woff2 directly).
- Geist: https://github.com/vercel/geist-font → `packages/next/dist/fonts/geist/woff2/`.
- JetBrains Mono: https://fonts.google.com/specimen/JetBrains+Mono → same as Newsreader.

Verify: `ls src/assets/fonts/` shows all four files.

- [ ] **Step 3: Add `@font-face` declarations to `src/styles/global.css`**

Insert at the very top of the file (before `@tailwind base`):

```css
/* Self-hosted fonts */
@font-face {
  font-family: 'Newsreader';
  src: url('/src/assets/fonts/Newsreader-Variable.woff2') format('woff2-variations');
  font-weight: 200 800;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Newsreader';
  src: url('/src/assets/fonts/Newsreader-Variable-Italic.woff2') format('woff2-variations');
  font-weight: 200 800;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Geist';
  src: url('/src/assets/fonts/Geist-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/src/assets/fonts/JetBrainsMono-Variable.woff2') format('woff2-variations');
  font-weight: 100 800;
  font-style: normal;
  font-display: swap;
}
```

- [ ] **Step 4: Verify fonts load by running dev**

Run: `npm run dev` and visit `http://localhost:4321/` (will be 404 still — open Chrome devtools → Network → filter "Font" → confirm woff2 files load).

If a font 404s, the path is wrong. Astro serves `src/assets/` only via the `<Image>` API; static font URLs need to live in `public/` instead. If font files do not load, **move** them: `mv src/assets/fonts/* public/fonts/` and update the URLs to `/fonts/<name>.woff2`.

(Empirically Astro 6 supports `?url` import for fonts, but the simplest approach is `public/fonts/`. Adopt that path now.)

Run:
```bash
mkdir -p public/fonts
mv src/assets/fonts/* public/fonts/
rmdir src/assets/fonts
```

Then update the four `@font-face` URLs in `global.css` from `/src/assets/fonts/<name>` to `/fonts/<name>`.

- [ ] **Step 5: Verify fonts load (round 2)**

Run: `npm run dev` again. Devtools → Network → Font → all four woff2 should return 200. Stop dev with `Ctrl+C`.

- [ ] **Step 6: Commit**

```bash
git add public/fonts src/styles/global.css
git commit -m "feat: self-host Newsreader, Geist, JetBrains Mono fonts"
```

---

## Task 5: Build site data module

**Files:**
- Create: `src/data/site.ts`

- [ ] **Step 1: Create `src/data/site.ts`**

```ts
// src/data/site.ts
export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteData {
  name: string;
  shortName: string;
  role: string;
  location: string;
  email: string;
  description: string;        // default meta description
  url: string;                // canonical site URL
  twitterHandle: string;      // for OG/Twitter card
  social: SocialLink[];
  scholarShieldRepoBranch: string;  // e.g. 'yuhanwang14/yuhanwang14.github.io@google-scholar-stats'
  scholarShieldFile: string;        // relative path inside that branch
}

export const site: SiteData = {
  name: 'Yuhan Wang',
  shortName: 'Yuhan',
  role: 'Founder & CTO @ Engram · MIT Researcher · Imperial College',
  location: 'London, United Kingdom',
  email: 'yuhanwangwork14@gmail.com',
  description: 'Founder & CTO @ Engram. Research on cognitive AI, agentic systems, and 4D foundation models. Imperial College mathematics & computer science.',
  url: 'https://yuhanwang14.github.io',
  twitterHandle: '@YuhanWangWork14',
  social: [
    { label: 'GitHub',   href: 'https://github.com/yuhanwang14' },
    { label: 'Scholar',  href: 'https://scholar.google.com/citations?user=gYhZ614AAAAJ&hl=en&authuser=1' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yuhan-wang-5546832a2/' },
    { label: 'X',        href: 'https://x.com/YuhanWangWork14' },
    { label: 'Email',    href: 'mailto:yuhanwangwork14@gmail.com' },
    { label: 'RSS',      href: '/rss.xml' },
  ],
  scholarShieldRepoBranch: 'yuhanwang14/yuhanwang14.github.io@google-scholar-stats',
  scholarShieldFile: 'google-scholar-stats/gs_data_shieldsio.json',
};
```

- [ ] **Step 2: Commit**

```bash
git add src/data/site.ts
git commit -m "feat: add site metadata module"
```

---

## Task 6: Build SEO component

**Files:**
- Create: `src/components/shared/SEO.astro`

- [ ] **Step 1: Create `src/components/shared/SEO.astro`**

```astro
---
// src/components/shared/SEO.astro
import { site } from '../../data/site';

interface Props {
  title: string;
  description?: string;
  ogImage?: string;        // absolute path under site.url
  canonical?: string;
  type?: 'website' | 'article';
  publishedAt?: Date;
  updatedAt?: Date;
  jsonLd?: Record<string, unknown>;
}

const {
  title,
  description = site.description,
  ogImage,
  canonical = Astro.url.href,
  type = 'website',
  publishedAt,
  updatedAt,
  jsonLd,
} = Astro.props;

const fullOgImage = ogImage ? new URL(ogImage, site.url).toString() : undefined;
---

<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta name="theme-color" content="#FAF7F1" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#1A1714" media="(prefers-color-scheme: dark)" />

<!-- Open Graph -->
<meta property="og:type" content={type} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:site_name" content={site.name} />
{fullOgImage && <meta property="og:image" content={fullOgImage} />}
{publishedAt && <meta property="article:published_time" content={publishedAt.toISOString()} />}
{updatedAt    && <meta property="article:modified_time"  content={updatedAt.toISOString()} />}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:creator" content={site.twitterHandle} />
{fullOgImage && <meta name="twitter:image" content={fullOgImage} />}

{jsonLd && (
  <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/SEO.astro
git commit -m "feat: add SEO component with OG and JSON-LD support"
```

---

## Task 7: Build BaseLayout

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create `src/layouts/BaseLayout.astro`**

```astro
---
// src/layouts/BaseLayout.astro
import '../styles/global.css';
import SEO from '../components/shared/SEO.astro';

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  type?: 'website' | 'article';
  publishedAt?: Date;
  updatedAt?: Date;
  jsonLd?: Record<string, unknown>;
}
const props = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="alternate" type="application/rss+xml" title="Yuhan Wang — Blog" href="/rss.xml" />
    <SEO {...props} />
  </head>
  <body class="min-h-screen fade-in-on-load">
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add BaseLayout with fonts, theme, favicons, SEO"
```

---

## Task 8: Build Navbar component

**Files:**
- Create: `src/components/shared/Navbar.astro`

- [ ] **Step 1: Create `src/components/shared/Navbar.astro`**

```astro
---
// src/components/shared/Navbar.astro
import { site } from '../../data/site';

interface Props {
  active?: 'home' | 'research' | 'industry' | 'skills' | 'blog';
}
const { active = 'home' } = Astro.props;

const links: { label: string; href: string; key: NonNullable<Props['active']> }[] = [
  { label: 'Research', href: '/research/', key: 'research' },
  { label: 'Industry', href: '/industry/', key: 'industry' },
  { label: 'Skills',   href: '/skills/',   key: 'skills'   },
  { label: 'Blog',     href: '/blog/',     key: 'blog'     },
];
---

<nav class="border-b border-hairline">
  <div class="max-w-reading mx-auto px-6 flex items-center justify-between h-14">
    <a href="/" class="font-serif font-semibold text-ink hover:text-accent transition-colors duration-200">
      {site.shortName}
    </a>
    <ul class="flex items-center gap-6">
      {links.map((link) => (
        <li>
          <a
            href={link.href}
            class:list={[
              'label-smallcaps transition-colors duration-200',
              link.key === active
                ? 'text-accent border-b-2 border-accent pb-1 -mb-1'
                : 'hover:text-ink',
            ]}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</nav>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/Navbar.astro
git commit -m "feat: add Navbar with smallcaps routes and active state"
```

---

## Task 9: Build Footer component

**Files:**
- Create: `src/components/shared/Footer.astro`

- [ ] **Step 1: Create `src/components/shared/Footer.astro`**

```astro
---
// src/components/shared/Footer.astro
import { site } from '../../data/site';

const year = new Date().getFullYear();
---

<footer class="mt-24 border-t border-hairline">
  <div class="max-w-reading mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-muted">
    <p class="font-mono">© {year} {site.name}</p>
    <ul class="flex flex-wrap items-center gap-x-5 gap-y-2">
      {site.social.map((s) => (
        <li>
          <a
            href={s.href}
            class="label-smallcaps hover:text-ink transition-colors duration-200"
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/Footer.astro
git commit -m "feat: add Footer with social links and copyright"
```

---

## Task 10: Build PageLayout

**Files:**
- Create: `src/layouts/PageLayout.astro`

- [ ] **Step 1: Create `src/layouts/PageLayout.astro`**

```astro
---
// src/layouts/PageLayout.astro
import BaseLayout from './BaseLayout.astro';
import Navbar from '../components/shared/Navbar.astro';
import Footer from '../components/shared/Footer.astro';

interface Props {
  title: string;
  description?: string;
  active?: 'home' | 'research' | 'industry' | 'skills' | 'blog';
  eyebrow?: string;       // smallcaps label above heading
  heading?: string;       // page heading (Newsreader serif)
  intro?: string;         // optional one-line subhead
}
const { title, description, active = 'home', eyebrow, heading, intro } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <Navbar active={active} />
  <main class="reading-column py-16">
    {eyebrow && <p class="label-smallcaps mb-3">{eyebrow}</p>}
    {heading && <h1 class="font-serif font-semibold text-ink text-3xl md:text-4xl leading-tight mb-3">{heading}</h1>}
    {intro && <p class="text-muted text-lg leading-relaxed mb-12">{intro}</p>}
    <slot />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/PageLayout.astro
git commit -m "feat: add PageLayout with eyebrow, heading, intro, navbar, footer"
```

---

## Task 11: Build ProfileCard component

**Files:**
- Create: `src/components/shared/ProfileCard.astro`
- Use: `src/assets/images/yuhan.png` (moved in Task 19)

- [ ] **Step 1: Move yuhan.png in advance (we need it now)**

Run:
```bash
mkdir -p src/assets/images
git mv _jekyll-legacy/images/yuhan.png src/assets/images/yuhan.png
```

- [ ] **Step 2: Create `src/components/shared/ProfileCard.astro`**

```astro
---
// src/components/shared/ProfileCard.astro
import { Image } from 'astro:assets';
import yuhanPhoto from '../../assets/images/yuhan.png';
import { site } from '../../data/site';

const scholarShieldUrl = `https://img.shields.io/endpoint?style=for-the-badge&color=16569E&url=https://cdn.jsdelivr.net/gh/${site.scholarShieldRepoBranch}/${site.scholarShieldFile}`;
---

<aside class="hairline pt-8 mt-12 grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 items-start">
  <Image
    src={yuhanPhoto}
    alt={`Photo of ${site.name}`}
    width={80}
    height={80}
    class="rounded-full border border-hairline w-20 h-20 object-cover"
  />
  <div>
    <p class="font-serif font-semibold text-ink text-lg">{site.name}</p>
    <p class="text-muted text-sm leading-relaxed mt-1">{site.role}</p>
    <p class="font-mono text-xs text-muted mt-2">{site.location}</p>
    <div class="mt-4">
      <img
        src={scholarShieldUrl}
        alt="Google Scholar citations"
        loading="lazy"
        decoding="async"
        height="20"
      />
    </div>
    <ul class="flex flex-wrap gap-x-4 gap-y-1 mt-4">
      {site.social.filter((s) => s.label !== 'RSS').map((s) => (
        <li>
          <a
            href={s.href}
            class="label-smallcaps hover:text-ink transition-colors duration-200"
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</aside>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/ProfileCard.astro src/assets/images/yuhan.png
git commit -m "feat: add ProfileCard with photo, role, scholar shield, socials"
```

---

## Task 12: Extract about-page data into typed modules

**Files:**
- Create: `src/data/news.ts`, `src/data/publications.ts`, `src/data/research.ts`, `src/data/industry.ts`, `src/data/projects.ts`, `src/data/skills.ts`

- [ ] **Step 1: Move publication image**

Run:
```bash
mkdir -p src/assets/images/publications
git mv _jekyll-legacy/images/PAGE-4D.gif src/assets/images/publications/PAGE-4D.gif
```

- [ ] **Step 2: Create `src/data/news.ts`**

```ts
// src/data/news.ts
// Source: _jekyll-legacy/_pages/about.md (News section).
export interface NewsItem {
  date: string;       // 'YYYY.MM' for display
  emoji: string;
  htmlBody: string;   // small inline-html bullet content
}

export const news: NewsItem[] = [
  {
    date: '2026.03',
    emoji: '🚀',
    htmlBody: 'PAGE-4D training + evaluation code fully <strong>open-sourced</strong>! Check it out on <a href="https://github.com/yuhanwang14/PAGE-4D">GitHub</a>.',
  },
  {
    date: '2026.02',
    emoji: '🏗️',
    htmlBody: 'Founded <strong>Engram</strong> — building a local-first cognitive alignment layer for AI systems.',
  },
  {
    date: '2026.01',
    emoji: '🎓',
    htmlBody: 'PAGE-4D paper accepted by <strong>ICLR 2026</strong>!',
  },
  {
    date: '2025.11',
    emoji: '💼',
    htmlBody: 'Accepted an offer from <strong>Millennium</strong>\'s Equity Technology Team as an AI Engineer Intern!',
  },
  {
    date: '2025.06',
    emoji: '🎓',
    htmlBody: 'Joined <strong>MIT Media Lab</strong> as a Visiting Graduate Researcher!',
  },
];
```

- [ ] **Step 3: Create `src/data/publications.ts`**

```ts
// src/data/publications.ts
import type { ImageMetadata } from 'astro';
import page4d from '../assets/images/publications/PAGE-4D.gif';

export interface Publication {
  badge: string;             // venue, e.g. 'ICLR 2026'
  title: string;
  authorsHtml: string;       // raw inline HTML, with <strong>self</strong> emphasis
  href: string;              // primary link (project page)
  paperHref?: string;
  image: ImageMetadata;
}

export const publications: Publication[] = [
  {
    badge: 'ICLR 2026',
    title: 'PAGE-4D: Disentangled Pose and Geometry Estimation for 4D Perception',
    authorsHtml:
      'Kaichen Zhou, <strong>Yuhan Wang</strong>, Grace Chen, Xinhai Chang, Gaspard Beaudouin, Fangneng Zhan, Paul Pu Liang, Mengyu Wang.',
    href: 'https://page-4d.github.io/anonymous-submission/',
    paperHref: 'https://arxiv.org/pdf/2510.17568',
    image: page4d,
  },
];
```

- [ ] **Step 4: Create `src/data/research.ts`**

```ts
// src/data/research.ts
export interface ResearchItem {
  org: string;
  group?: string;
  role: string;
  startDate: string;     // 'YYYY-MM'
  endDate: string;       // 'present' | 'YYYY-MM'
  bullets: string[];     // can contain inline HTML
}

export const research: ResearchItem[] = [
  {
    org: 'MIT Media Lab',
    group: 'Multisensory Intelligence Group',
    role: 'Graduate Visiting Researcher',
    startDate: '2025-06',
    endDate: '2025-09',
    bullets: [
      'Co-developed <strong>PAGE-4D</strong>, a feedforward 4D perception framework extending <strong>VGGT</strong> with a dynamics-aware aggregator for static–dynamic disentanglement.',
      'Introduced mask-guided attention to suppress motion for pose tokens while exploiting dynamics for geometry tokens.',
      'Applied selective fine-tuning on the middle <strong>10 VGGT layers (~30% parameters)</strong>, matching full fine-tuning performance with no runtime or memory overhead.',
      'Achieved <strong>state-of-the-art results</strong> on Sintel, DyCheck, and TUM benchmarks, improving depth, pose accuracy, and rendering quality (PSNR/SSIM, LPIPS).',
    ],
  },
  {
    org: 'Imperial College',
    group: 'Department of Mechanical Engineering',
    role: 'Undergraduate Researcher, Full-Stack Developer',
    startDate: '2024-07',
    endDate: '2024-10',
    bullets: [
      'Designed and developed a modern, data-driven web platform called <strong>Smart-Forming</strong> that enables engineers to discover, evaluate, and share manufacturing knowledge modules.',
      'Focused on intuitive UX, modular architecture, and seamless integration of metadata analytics (heatmap, word cloud supported by Python and MATLAB) to support <strong>industrial R&amp;D</strong>.',
    ],
  },
  {
    org: 'UESTC',
    group: 'School of Computer Science and Engineering',
    role: 'High School Researcher',
    startDate: '2022-01',
    endDate: '2022-12',
    bullets: [
      'Research on <strong>Open World Object Detection</strong> for classifying known and unknown objects.',
      'Improved a <strong>Detectron2-based model ORE</strong> for incremental object detection using contrastive clustering and auto-labeling RPN.',
    ],
  },
];
```

- [ ] **Step 5: Create `src/data/industry.ts`**

```ts
// src/data/industry.ts
export interface IndustryItem {
  org: string;
  role: string;
  location: string;
  startDate: string;     // 'YYYY-MM'
  endDate: string;       // 'present' | 'YYYY-MM'
  bullets: string[];
}

export const industry: IndustryItem[] = [
  {
    org: 'Engram',
    role: 'Founder & CTO',
    location: 'London, United Kingdom',
    startDate: '2026-01',
    endDate: 'present',
    bullets: [
      'Building cognitive AI infrastructure for identity-aligned, long-horizon reasoning.',
      'Architecting a dual-process cognition system combining causal knowledge graphs, contextual bandits, and local-first cognitive models.',
      'Designing a runtime alignment layer that operates before model inference, treating reasoning as system infrastructure.',
      'Working with early design partners and VCs to deploy scalable, alignment-first AI systems.',
    ],
  },
  {
    org: 'Millennium Management LLC',
    role: 'AI Engineer Intern',
    location: 'London, United Kingdom',
    startDate: '2026-06',
    endDate: '2026-08',
    bullets: [
      'Incoming <strong>AI Engineer Intern</strong> at Millennium Equity Technology Team, mentored by Andrei-Octavian Brabete.',
      'Building AI solutions for MLP\'s equity investment teams around the globe, focusing on applying AI/LLMs to research process augmentation.',
    ],
  },
  {
    org: 'Five Stars Education',
    role: 'Founder Engineer',
    location: 'London, United Kingdom',
    startDate: '2024-09',
    endDate: '2025-03',
    bullets: [
      'Built an education platform focused on training international students through pre-recorded videos and online sessions.',
      'Collaborated with educators across diverse STEM fields to deliver an optimised learning experience.',
    ],
  },
];
```

- [ ] **Step 6: Create `src/data/projects.ts`**

```ts
// src/data/projects.ts
export interface Project {
  name: string;
  blurb: string;
  technologies: string[];
  bullets: string[];
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    name: 'ASR-Pipeline',
    blurb: 'Local GPU-Accelerated Speech Transcription',
    technologies: ['Python', 'Whisper', 'Speaker Diarization', 'LLM Post-Processing'],
    bullets: [
      'Built a fully local speech transcription pipeline with <strong>speaker diarization</strong> and LLM post-processing, optimized for RTX 4070 Laptop (8GB VRAM).',
      'Handles multilingual meetings (Chinese/English code-switching) with reliable timestamps and speaker separation.',
      '126+ tests with full CI/CD pipeline.',
    ],
    githubUrl: 'https://github.com/yuhanwang14/ASR-Pipeline',
  },
  {
    name: 'Obsidian-Operator',
    blurb: 'AI-Native Workflow Operator',
    technologies: ['Shell', 'Claude Code', 'Obsidian'],
    bullets: [
      'Built an AI-native operator on <strong>Obsidian + Claude Code</strong> with 17 skills for daily briefings, weekly reviews, strategic planning, and knowledge synthesis.',
      'Single <code>/daily-init</code> command triggers AI workflows that pull vault context, review ongoing work, surface deadlines, and structure the day.',
      'Transforms Obsidian from documentation into a personal OS for thinking and execution.',
    ],
    githubUrl: 'https://github.com/yuhanwang14/Obsidian-Operator',
  },
  {
    name: 'Claude-Usage-TUI',
    blurb: 'Terminal Usage Dashboard',
    technologies: ['Rust'],
    bullets: [
      'Built a <strong>btop-style terminal dashboard</strong> for monitoring Claude.ai usage limits in real time.',
      'Provides live tracking of token consumption and rate limits.',
    ],
    githubUrl: 'https://github.com/yuhanwang14/Claude-Usage-TUI',
  },
  {
    name: 'Spatial Historical Intelligence',
    blurb: 'Interactive AI-driven Map',
    technologies: ['React.js', 'Perplexity API'],
    bullets: [
      'Built an interactive <strong>AI-driven map</strong> that reveals on-click historical, cultural, and contextual narratives for any location (<strong>Perplexity API</strong>).',
      'Engineered a structured-query <strong>backend to Perplexity</strong> and parsed responses into geospatial entities for real-time visualization.',
      'Developed correlation mapping and cross-region connections, including life-journey pathing for notable figures across the globe.',
      'Implemented dynamic country comparisons on AI-derived metrics (<strong>economy, culture, innovation</strong>) with responsive data visualizations.',
    ],
  },
  {
    name: 'Zencraft',
    blurb: 'AI-Powered Personal Growth Platform',
    technologies: ['Flutter', 'Go', 'gRPC', 'PostgreSQL'],
    bullets: [
      'Built an AI-powered <strong>personal growth app</strong> delivering context-aware insights and reflection guidance.',
      'Ran iterative user testing to refine prompts and UX for clearer, measurable progress.',
      'Implemented interview-style flows, skills tracking, and personalized storytelling via a <strong>Go/gRPC backend</strong>.',
    ],
  },
  {
    name: 'NPC Trading System',
    blurb: 'Crypto Spot Trading Engine (npcTrading)',
    technologies: ['C++', 'WebSocket/REST', 'Boost.Beast', 'OpenSSL', 'Binance Spot API', 'GoogleTest'],
    bullets: [
      'Built a message-driven <strong>crypto spot trading engine</strong> with a central <strong>MessageBus</strong> (async send/publish, sync request/response, topic subscriptions, bounded queues, run-loop dispatch).',
      'Implemented core runtime state: component lifecycle FSM and an in-memory <strong>cache</strong> for orders/positions/instruments plus latest quote/bar/book with ring-buffer history.',
      'Exposed <strong>Actor/Strategy APIs</strong> for subscriptions, market-data callbacks, and order helpers; emits order lifecycle events (submitted/accepted/rejected/filled).',
      'Integrated Binance Spot market data (WS + REST) and maintained per-instrument <strong>local order books</strong> via depth snapshots + incremental updates.',
    ],
  },
  {
    name: 'Pre-Market Opening Price Anomaly Detector',
    blurb: 'Forecast & Anomaly Detection for Pre-Open Prices',
    technologies: ['Python', 'Quant Finance', 'Backtesting', 'Gradient Boosting'],
    bullets: [
      'Built a leakage-safe <strong>pre-open forecasting pipeline</strong> for opening prices using prior-day and benchmark signals.',
      'Calibrated detection with a <strong>3σ residual threshold</strong>, flagging 1.6% of test days with significant open deviations.',
      'Ensured reproducibility with strict pre-open feature shifts, a chronological split (372 train / 125 test), and diagnostic plots.',
    ],
  },
  {
    name: 'WACC Compiler',
    blurb: 'AArch64 Compiler for the WACC Language',
    technologies: ['Scala', 'Compiler Design'],
    bullets: [
      'Built a compiler for the <strong>WACC language</strong> targeting AArch64 (ARMv8-A), supporting full compilation from source to executable.',
      'Implemented lexical, syntactic, and semantic analysis, ensuring language correctness before code generation.',
      'Developed a code generator that produces <strong>AArch64 assembly</strong>, enabling execution via GCC and QEMU.',
      'Supported language features such as variables, expressions, control flow, functions, and heap memory management.',
      'Integrated robust error detection and type checking to prevent runtime failures.',
    ],
  },
];
```

- [ ] **Step 7: Create `src/data/skills.ts`**

```ts
// src/data/skills.ts
export interface SkillGroup {
  name: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    name: 'Programming Languages',
    items: ['Python', 'Java', 'C++', 'C', 'TypeScript', 'Go', 'Rust', 'SQL', 'Haskell', 'Scala', 'Kotlin', 'Ruby', 'Shell'],
  },
  {
    name: 'Frameworks & Infrastructure',
    items: ['React.js', 'gRPC', 'PostgreSQL', 'Flutter', 'Docker', 'Git', 'Linux', 'LangGraph', 'Pydantic'],
  },
  {
    name: 'Deep Learning & Machine Learning',
    items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'Transformers', 'OpenCV', 'XGBoost', 'MLOps', 'Detectron2'],
  },
  {
    name: 'Tools & Technologies',
    items: ['Docker', 'Git', 'Jupyter Notebook', 'PostgreSQL', 'AWS', 'Azure', 'Claude Code', 'Obsidian'],
  },
  {
    name: 'Languages',
    items: ['Mandarin Chinese (Native)', 'English (Bilingual)'],
  },
];
```

- [ ] **Step 8: Type-check the data modules**

Run: `npx astro check`
Expected: 0 errors. (Astro check is the project's TypeScript verifier.)

- [ ] **Step 9: Commit**

```bash
git add src/data/ src/assets/images/publications
git commit -m "feat: extract about-page content into typed data modules"
```

---

## Task 13: Build homepage `/`

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create `src/pages/index.astro`**

```astro
---
// src/pages/index.astro
import { Image } from 'astro:assets';
import PageLayout from '../layouts/PageLayout.astro';
import ProfileCard from '../components/shared/ProfileCard.astro';
import { news } from '../data/news';
import { publications } from '../data/publications';
import { site } from '../data/site';
---

<PageLayout
  title={`${site.name} — ${site.role}`}
  description={site.description}
  active="home"
  eyebrow="About"
  heading={site.name}
  intro={site.role}
>
  <section>
    <p class="text-ink leading-[1.75] text-base">
      I am the Founder &amp; CTO of <strong>Engram</strong>, where we are building a local-first
      <em>cognitive alignment layer</em> for AI systems. I hold a Master's in Joint Mathematics
      and Computer Science from Imperial College and was a visiting researcher at MIT Media Lab.
    </p>
    <p class="text-ink leading-[1.75] text-base mt-4">
      My work spans <em>machine learning</em>, <em>agent engineering</em>, and
      <em>full-stack development</em>, bridging theory with deployable infrastructure. My research
      interests include <em>3D/4D foundation models</em>, <em>cognitive AI</em>, and
      <em>agentic systems</em>.
    </p>
    <p class="text-ink leading-[1.75] text-base mt-4">
      Previously, I conducted research at MIT Media Lab on 4D perception (PAGE-4D, ICLR 2026),
      and I will join Millennium's Equity Technology Team as an AI Engineer Intern in Summer 2026.
    </p>
  </section>

  <section class="mt-16">
    <p class="label-smallcaps mb-4">News</p>
    <ul class="space-y-3">
      {news.map((item) => (
        <li class="flex gap-4 text-ink leading-relaxed">
          <span class="font-mono text-sm text-muted shrink-0 w-20 pt-0.5">{item.date}</span>
          <span class="text-base">
            <span class="mr-1">{item.emoji}</span>
            <span set:html={item.htmlBody} />
          </span>
        </li>
      ))}
    </ul>
  </section>

  <section class="mt-16">
    <p class="label-smallcaps mb-4">Publications</p>
    <ul class="space-y-10">
      {publications.map((p) => (
        <li class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 hairline pt-8">
          <div class="relative">
            <span class="absolute top-2 left-2 bg-accent text-bg font-mono text-xs px-2 py-0.5">
              {p.badge}
            </span>
            <Image src={p.image} alt={p.title} widths={[200, 400]} sizes="200px" class="w-full h-auto rounded" />
          </div>
          <div>
            <a href={p.href} class="font-serif font-semibold text-ink hover:text-accent transition-colors">{p.title}</a>
            <p class="text-muted text-sm mt-2 leading-relaxed" set:html={p.authorsHtml} />
            <p class="mt-3 text-sm flex gap-4">
              <a href={p.href} class="label-smallcaps hover:text-ink transition-colors">Project</a>
              {p.paperHref && <a href={p.paperHref} class="label-smallcaps hover:text-ink transition-colors">Paper</a>}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </section>

  <ProfileCard />
</PageLayout>
```

- [ ] **Step 2: Run dev and visually verify `/`**

Run: `npm run dev`. Visit `http://localhost:4321/`. Expected: page renders without errors, navbar at top, About text, News list with mono dates, Publications card with PAGE-4D image and badge, ProfileCard at bottom with photo and Scholar shield.

- [ ] **Step 3: Stop dev and commit**

```bash
# Ctrl+C to stop dev
git add src/pages/index.astro
git commit -m "feat: add homepage with about, news, publications, profile card"
```

---

## Task 14: Build `/research`

**Files:**
- Create: `src/pages/research.astro`

- [ ] **Step 1: Create `src/pages/research.astro`**

```astro
---
// src/pages/research.astro
import PageLayout from '../layouts/PageLayout.astro';
import { research } from '../data/research';

function dateRange(item: typeof research[number]): string {
  const fmt = (s: string) => {
    if (s === 'present') return 'Present';
    const [year, month] = s.split('-');
    const m = new Date(`${year}-${month}-01T00:00:00Z`).toLocaleString('en-US', { month: 'short' });
    return `${m} ${year}`;
  };
  return `${fmt(item.startDate)} – ${fmt(item.endDate)}`;
}
---

<PageLayout
  title="Research — Yuhan Wang"
  description="Research positions at MIT Media Lab, Imperial College, and UESTC."
  active="research"
  eyebrow="Research"
  heading="Research Experience"
>
  <ol class="space-y-12">
    {research.map((r) => (
      <li class="hairline pt-8">
        <p class="label-smallcaps mb-2">{dateRange(r)}</p>
        <h2 class="font-serif font-semibold text-ink text-xl">{r.org}</h2>
        {r.group && <p class="text-muted text-sm">{r.group}</p>}
        <p class="text-muted italic mt-1 text-sm">{r.role}</p>
        <ul class="mt-4 space-y-2 list-disc pl-6">
          {r.bullets.map((b) => <li class="text-ink leading-relaxed" set:html={b} />)}
        </ul>
      </li>
    ))}
  </ol>
</PageLayout>
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`. Visit `http://localhost:4321/research/`. Expected: smallcaps "Research" eyebrow, heading, three institutions with date ranges, bullets, hairline dividers between items.

- [ ] **Step 3: Commit**

```bash
git add src/pages/research.astro
git commit -m "feat: add /research route"
```

---

## Task 15: Build `/industry`

**Files:**
- Create: `src/pages/industry.astro`

- [ ] **Step 1: Create `src/pages/industry.astro`**

```astro
---
// src/pages/industry.astro
import PageLayout from '../layouts/PageLayout.astro';
import { industry } from '../data/industry';
import { projects } from '../data/projects';

function dateRange(s: string, e: string): string {
  const fmt = (str: string) => {
    if (str === 'present') return 'Present';
    const [year, month] = str.split('-');
    const m = new Date(`${year}-${month}-01T00:00:00Z`).toLocaleString('en-US', { month: 'short' });
    return `${m} ${year}`;
  };
  return `${fmt(s)} – ${fmt(e)}`;
}
---

<PageLayout
  title="Industry — Yuhan Wang"
  description="Industry experience and personal projects."
  active="industry"
  eyebrow="Industry"
  heading="Industry Experience"
>
  <ol class="space-y-12">
    {industry.map((i) => (
      <li class="hairline pt-8">
        <p class="label-smallcaps mb-2">{dateRange(i.startDate, i.endDate)} · {i.location}</p>
        <h2 class="font-serif font-semibold text-ink text-xl">{i.org}</h2>
        <p class="text-muted italic mt-1 text-sm">{i.role}</p>
        <ul class="mt-4 space-y-2 list-disc pl-6">
          {i.bullets.map((b) => <li class="text-ink leading-relaxed" set:html={b} />)}
        </ul>
      </li>
    ))}
  </ol>

  <section class="mt-24">
    <p class="label-smallcaps mb-4">Personal Projects</p>
    <h2 class="font-serif font-semibold text-ink text-2xl mb-8">Things I have built</h2>
    <ol class="space-y-12">
      {projects.map((p) => (
        <li class="hairline pt-8">
          <h3 class="font-serif font-semibold text-ink text-lg">
            {p.name} <span class="text-muted font-normal italic text-base">— {p.blurb}</span>
          </h3>
          <p class="font-mono text-xs text-muted mt-2">{p.technologies.join(' · ')}</p>
          <ul class="mt-4 space-y-2 list-disc pl-6">
            {p.bullets.map((b) => <li class="text-ink leading-relaxed" set:html={b} />)}
          </ul>
          {p.githubUrl && (
            <p class="mt-3">
              <a href={p.githubUrl} class="label-smallcaps hover:text-ink transition-colors" target="_blank" rel="noopener noreferrer">GitHub →</a>
            </p>
          )}
        </li>
      ))}
    </ol>
  </section>
</PageLayout>
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`. Visit `http://localhost:4321/industry/`. Expected: industry experience list, then "Personal Projects" smallcaps section header, then 8 project items.

- [ ] **Step 3: Commit**

```bash
git add src/pages/industry.astro
git commit -m "feat: add /industry route with projects subsection"
```

---

## Task 16: Build `/skills`

**Files:**
- Create: `src/pages/skills.astro`

- [ ] **Step 1: Create `src/pages/skills.astro`**

```astro
---
// src/pages/skills.astro
import PageLayout from '../layouts/PageLayout.astro';
import { skills } from '../data/skills';
---

<PageLayout
  title="Skills — Yuhan Wang"
  description="Programming languages, ML tools, frameworks."
  active="skills"
  eyebrow="Skills"
  heading="Skills"
>
  <dl class="space-y-10">
    {skills.map((g) => (
      <div class="hairline pt-6 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-2">
        <dt class="label-smallcaps">{g.name}</dt>
        <dd class="text-ink leading-relaxed">
          {g.items.map((it, i) => (
            <>
              <span class="font-mono text-[0.95em]">{it}</span>{i < g.items.length - 1 ? <span class="text-muted">  ·  </span> : null}
            </>
          ))}
        </dd>
      </div>
    ))}
  </dl>
</PageLayout>
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`. Visit `http://localhost:4321/skills/`. Expected: definition-list layout with smallcaps group names on left, mono items on right separated by middots.

- [ ] **Step 3: Commit**

```bash
git add src/pages/skills.astro
git commit -m "feat: add /skills route"
```

---

## Task 17: Build 404 page

**Files:**
- Create: `src/pages/404.astro`

- [ ] **Step 1: Create `src/pages/404.astro`**

```astro
---
// src/pages/404.astro
import PageLayout from '../layouts/PageLayout.astro';
---

<PageLayout
  title="404 — Not Found"
  description="Page not found."
  eyebrow="404"
  heading="Not found"
  intro="The page you are looking for does not exist."
>
  <p class="text-ink">
    Try the <a href="/" class="text-accent underline underline-offset-4">homepage</a> or
    the <a href="/blog/" class="text-accent underline underline-offset-4">blog</a>.
  </p>
</PageLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat: add 404 page"
```

---

## Task 18: Build blog content collection schema

**Files:**
- Create: `src/content.config.ts`

- [ ] **Step 1: Create `src/content.config.ts`**

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

- [ ] **Step 2: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: add blog content collection with Zod schema"
```

---

## Task 19: Migrate existing post to MDX

**Files:**
- Create: `src/content/blog/2026-03-25-generation-is-not-creation.mdx`
- Move: blog images from `_jekyll-legacy/images/blog/` to `src/assets/images/blog/`

- [ ] **Step 1: Move blog images**

Run:
```bash
mkdir -p src/assets/images/blog
git mv _jekyll-legacy/images/blog/hero-generation-vs-creation.png src/assets/images/blog/
git mv _jekyll-legacy/images/blog/hilma-af-klint-adulthood.jpg src/assets/images/blog/
git mv _jekyll-legacy/images/blog/scaffold-threshold.png src/assets/images/blog/
```

- [ ] **Step 2: Create the MDX post**

Create `src/content/blog/2026-03-25-generation-is-not-creation.mdx`:

```mdx
---
title: "Generation Is Not Creation"
description: "OpenAI built a million-line product with zero human-written code. \"Humans steer. Agents execute.\" But what happens when we extend this logic from writing code to thinking itself?"
publishedAt: 2026-03-25
pinned: true
tags:
  - ai
  - cognition
  - philosophy
  - engram
coverImage: ../../assets/images/blog/hero-generation-vs-creation.png
---

import { Image } from 'astro:assets';
import hero from '../../assets/images/blog/hero-generation-vs-creation.png';
import hilma from '../../assets/images/blog/hilma-af-klint-adulthood.jpg';
import scaffold from '../../assets/images/blog/scaffold-threshold.png';

<Image src={hero} alt="Generation vs Creation — Human intention and artificial precision" widths={[700, 1400]} sizes="(max-width: 700px) 100vw, 700px" />

OpenAI recently published a piece called *[Harness Engineering](https://openai.com/index/harness-engineering/)*, documenting an experiment: "building and shipping an internal beta of a software product with 0 lines of manually-written code." A million lines of code, all agent-generated.

The core principle they distilled is disarmingly simple: **"Humans steer. Agents execute."**

Engineers no longer write code. Their primary job became "to design environments, specify intent, and build feedback loops that allow Codex agents to do reliable work." Architectural standards are encoded as linters and structural tests; the agent operates autonomously within strict boundaries. When it hits a judgment call, it escalates, stepping through an end-to-end workflow that can "escalate to a human only when judgment is required." In their words, "building software still demands discipline, but the discipline shows up more in the scaffolding rather than the code."

The model is elegant. It works. But it left me with a question I couldn't shake:

> If we extend this logic beyond writing code, to thinking itself, to human cognition and the creative process, does the model still hold?

Yes. But not entirely.

Because there is a fundamental asymmetry between code and thought: **when you write code, you know what "correct" looks like. When you think, you often don't.**

Harness Engineering solves a convergence problem. Humans define taste; the system faithfully executes. The "golden principles," the garbage collection that treats technical debt "like a high-interest loan," where "human taste is captured once, then enforced continuously on every line of code." All of it is a sophisticated way of saying: *we know what good looks like, now let the agent produce it consistently and at scale.* Within this framework, AI does not **create**. It **generates**.

---

The most common argument for why AI cannot truly create is Sartrean: *l'existence précède l'essence* — existence precedes essence. Creation requires subjectivity, AI lacks subjectivity, therefore AI can only generate, never create.

But this argument has a hole in it.

Coleridge composed *Kubla Khan* in an opium dream and lost half of it to a knock at the door. The blues has no author; it is a tradition that sings through whoever picks up the guitar. Hilma af Klint insisted her paintings were dictated by spirits; she did not experience herself as the one deciding. In none of these cases is there a clean, deliberate subject making choices. Yet no one would call what emerged anything less than creation. The history of art runs on tension far more than on conscious intent.

So subjectivity may not be the variable that matters. The variable that matters is **embodied experience** — whether you have a body, whether you have existed in time, whether you have endured something.

The reason one person's creation can strike another person is not that some "subject" made deliberate choices behind the curtain. It is that the work compresses the residue of a life lived: the memory held in the body, the texture of wounds, the direction of desire. The dreamer's poem comes from the totality of everything they have lived through: their body, their scars, their longing. The same is true of every participant in a collective improvisation.

AI has not lived. It has processed vast quantities of language, but processing is not experience. Generation does not require experience; it only needs to output the highest-probability, highest-reward result.

**Creation does.**

<Image src={hilma} alt="Hilma af Klint, The Ten Largest, No. 7, Adulthood, 1907 — painted under what she described as spiritual dictation" widths={[400, 800]} sizes="(max-width: 520px) 100vw, 520px" />

To create is to make choices under genuine uncertainty, and that capacity comes from having chosen wrong before, having borne the consequences, and having carried those consequences forward into the rest of your life. Creation means being answerable for outcomes, answerable for values. And answerability presupposes that you are the one who absorbs the cost.

---

What, then, about value itself?

Sartre, in *L'existentialisme est un humanisme*:

> *"La valeur n'est pas autre chose que ce sens que vous choisissez"* — value is nothing other than the meaning you choose.

AI possesses no endogenous value system. It has a formalized value function, a reward signal, which is an optimization target we embed from the outside. This is where the human niche falls: **who defines what matters?**

**But value itself is not fixed. It drifts.**

The proposition that "humans are the source of value" does not rest on bedrock. It rests on sand. Luther's Reformation split Europe and bled for a century. The Enlightenment dethroned divine right and got the guillotine in return. Civil rights in America took another hundred years after abolition to force the Constitution to mean what it said. This is the natural bandwidth of human societies repairing and reinventing themselves.

AI is an amplifier. If value is not constant, what it amplifies is conflict.

But flip the argument. If values were fixed and axiomatizable, they could be encoded and handed to an agent, which is exactly what Harness Engineering does. It is *because* value drifts that humans are irreplaceable.

Fixed values demand execution. Fluid values demand the capacity for self-doubt. You must be able to recognize that what you once believed may be obsolete, may be wrong, and then choose again in the absence of certainty.

The most valuable thinking tends to happen in the moment you realize your previous judgment may have been mistaken.

---

Can this kind of self-questioning be systematized? Harness Engineering's operating principle, to "enforce boundaries centrally, allow autonomy locally," has been validated in code. But transplant it into cognitive collaboration and you collide with a paradox. Consistency and freedom are in tension.

Any architecture for cognitive collaboration (call it a copilot, an agent, a digital twin) is, by definition, structure. And structure is constraint. The moment you try to use a system to "support" free thinking, the system is already shaping the direction of thought. You are attempting to embed existentialism inside an engineering framework. The contradiction is baked in.

Because genuine evolution is not convergence toward greater consistency. It is the permission, at critical moments, to break.

To put it concretely: if you set out to design a system that "allows cognitive rupture," one that disrupts habitual thinking at the right moment and scaffolds cognition toward higher-order reflection, you face a logical trap. A rupture that has been designed is no longer a rupture. It is a sanctioned deviation, still contained within the preset constraint space. Genuine existential freedom is precisely what cannot be architectured.

This paradox is irresolvable. But it is not a bug you need to fix. It is a feature you need to internalize.

<Image src={scaffold} alt="The system can scaffold up to a threshold — but the step across it must be taken by a person" widths={[400, 800]} sizes="(max-width: 520px) 100vw, 520px" />

What it means is that any cognitive collaboration architecture can, at best, *create the conditions under which rupture becomes more likely*. It cannot design the rupture itself. This is analogous to education — good teaching does not engineer the moment a student has an epiphany. It cultivates an environment rich and tense enough that epiphany can emerge on its own. The system can scaffold up to a threshold. But the step across that threshold must be taken by a person, and it cannot be predicted.

Harness Engineering requires a system capability of **faithful execution** — mirroring cognition for comfort and efficiency. But what cognition actually needs at its growing edge is a system capability of **honest discomfort** — scaffolding cognition toward friction and conflict, toward deeper thinking. The first makes you faster. The second makes you deeper.

The direction, then, is this: build an evolvable architecture for cognitive collaboration in which humans permanently retain the authority to define values and to make final decisions.

---

One last thing. An honest audit of everything I have argued.

"AI has not lived." This claim rests on our incomplete understanding of consciousness and experience. We cannot say with certainty that what happens inside a large language model when it processes information does not constitute some embryonic form of experience. I am inclined to believe it does not, but "inclined to believe" is not proof.

So the force of this essay should not derive from a claim of human uniqueness. It should derive from honesty about uncertainty:

> We are not certain whether AI has experience. We are certain that humans do. Until that uncertainty is resolved, the final weight in value judgments should remain on the human side.

This is a pragmatic argument, not a metaphysical one. It does not need to prove that AI *can never* create. It only needs to point out that while the uncertainty persists, placing the weight of creation with the party we *know* possesses these capacities is the more prudent choice.

*L'homme est condamné à être libre* — man is condemned to be free. Freedom is not something you defend once. It is something you choose, again and again. The human position in the age of AI is not maintained by declaration; it is maintained by the active exercise of value judgment in every act of human-machine collaboration. Defense is passive. Exercise is active.

But there is one question that stays with us. Throughout history, the process by which humans renegotiate values has been bloody: wars, revolutions, societies tearing themselves apart. It has taken decades, sometimes centuries. AI, as an amplifier entering this process, may accelerate and scale that disruption far beyond the bandwidth at which human societies can repair themselves.

**Can humans renegotiate values fast enough to keep pace with AI's amplification of conflict?**

We don't have the full answer. But this is precisely the question we're building around: a cognitive architecture that keeps humans equipped to negotiate, to judge, to choose, even as the system scales beyond what any individual can hold alone.

In an era of accelerating value drift and exponential system capability, standing firm matters more than standing tall.
```

- [ ] **Step 3: Verify the post is recognized**

Run: `npx astro check`
Expected: 0 errors. (Astro will validate the frontmatter against the Zod schema.)

- [ ] **Step 4: Commit**

```bash
git add src/content/blog src/assets/images/blog
git commit -m "feat: migrate Generation Is Not Creation post to MDX"
```

---

## Task 20: Build `lib/blog.ts` with vitest tests

**Files:**
- Create: `src/lib/blog.ts`, `src/lib/blog.test.ts`, `vitest.config.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 2: Write failing tests in `src/lib/blog.test.ts`**

```ts
// src/lib/blog.test.ts
import { describe, expect, it } from 'vitest';
import { formatDate, formatDateShort, estimateReadingTime, slugify } from './blog';

describe('formatDate', () => {
  it('formats a date as "Mar 25, 2026"', () => {
    expect(formatDate(new Date('2026-03-25T00:00:00Z'))).toBe('Mar 25, 2026');
  });
});

describe('formatDateShort', () => {
  it('omits the year', () => {
    expect(formatDateShort(new Date('2026-03-25T00:00:00Z'))).toBe('Mar 25');
  });
});

describe('estimateReadingTime', () => {
  it('returns at least 1 minute for empty input', () => {
    expect(estimateReadingTime('')).toBe(1);
  });
  it('returns 1 for ≤ 200 words', () => {
    const words = Array(150).fill('word').join(' ');
    expect(estimateReadingTime(words)).toBe(1);
  });
  it('rounds up at the 200-word boundary', () => {
    const words = Array(400).fill('word').join(' ');
    expect(estimateReadingTime(words)).toBe(2);
  });
  it('handles long content', () => {
    const words = Array(1900).fill('word').join(' ');
    expect(estimateReadingTime(words)).toBe(10);
  });
});

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  it('strips non-alphanumerics', () => {
    expect(slugify('AI / Cognition!')).toBe('ai-cognition');
  });
  it('collapses repeated hyphens and trims edges', () => {
    expect(slugify('  --AI--Cognition--  ')).toBe('ai-cognition');
  });
});
```

- [ ] **Step 3: Run the tests to verify they fail (file does not exist yet)**

Run: `npm test`
Expected: FAIL — `Failed to load module "./blog"` (or equivalent: `blog.ts` does not exist).

- [ ] **Step 4: Implement `src/lib/blog.ts`**

```ts
// src/lib/blog.ts
const DATE_FMT_LONG: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
};

const DATE_FMT_SHORT: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
};

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { ...DATE_FMT_LONG, timeZone: 'UTC' });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', { ...DATE_FMT_SHORT, timeZone: 'UTC' });
}

const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(content: string): number {
  const words = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`
Expected: All 8 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/lib/blog.ts src/lib/blog.test.ts vitest.config.ts
git commit -m "feat: add lib/blog.ts utilities with vitest unit tests"
```

---

## Task 21: Build PostMeta component

**Files:**
- Create: `src/components/blog/PostMeta.astro`

- [ ] **Step 1: Create `src/components/blog/PostMeta.astro`**

```astro
---
// src/components/blog/PostMeta.astro
import { formatDate } from '../../lib/blog';

interface Props {
  publishedAt: Date;
  readingTime: number;
  updatedAt?: Date;
}
const { publishedAt, readingTime, updatedAt } = Astro.props;
---

<p class="font-mono text-xs text-muted uppercase tracking-[0.08em]">
  <time datetime={publishedAt.toISOString()}>{formatDate(publishedAt)}</time>
  <span class="mx-2">·</span>
  <span>{readingTime} min read</span>
  {updatedAt && (
    <>
      <span class="mx-2">·</span>
      <span>Updated <time datetime={updatedAt.toISOString()}>{formatDate(updatedAt)}</time></span>
    </>
  )}
</p>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/PostMeta.astro
git commit -m "feat: add PostMeta component for date and reading time"
```

---

## Task 22: Build TagList component

**Files:**
- Create: `src/components/blog/TagList.astro`

- [ ] **Step 1: Create `src/components/blog/TagList.astro`**

```astro
---
// src/components/blog/TagList.astro
import { slugify } from '../../lib/blog';

interface Props {
  tags: string[];
  size?: 'sm' | 'md';
}
const { tags, size = 'sm' } = Astro.props;
---

{tags.length > 0 && (
  <ul class:list={['flex flex-wrap gap-2', size === 'md' ? 'gap-3' : 'gap-2']}>
    {tags.map((tag) => (
      <li>
        <a
          href={`/blog/tags/${slugify(tag)}/`}
          class:list={[
            'label-smallcaps border border-hairline rounded-full hover:text-ink hover:border-accent/40 transition-colors',
            size === 'md' ? 'px-3 py-1' : 'px-2.5 py-0.5',
          ]}
        >
          {tag}
        </a>
      </li>
    ))}
  </ul>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/TagList.astro
git commit -m "feat: add TagList component"
```

---

## Task 23: Build PostCard component

**Files:**
- Create: `src/components/blog/PostCard.astro`

- [ ] **Step 1: Create `src/components/blog/PostCard.astro`**

```astro
---
// src/components/blog/PostCard.astro
import type { CollectionEntry } from 'astro:content';
import PostMeta from './PostMeta.astro';
import TagList from './TagList.astro';

interface Props {
  post: CollectionEntry<'blog'>;
  readingTime: number;
}
const { post, readingTime } = Astro.props;
const { title, description, publishedAt, tags } = post.data;
---

<article class="hairline pt-8 pb-2">
  <a href={`/blog/${post.id}/`} class="group block">
    <PostMeta publishedAt={publishedAt} readingTime={readingTime} />
    <h2 class="font-serif font-semibold text-ink text-2xl leading-snug mt-2 group-hover:text-accent transition-colors">
      {title}
    </h2>
    <p class="text-muted italic mt-2 leading-relaxed">{description}</p>
  </a>
  {tags.length > 0 && <div class="mt-3"><TagList tags={tags} /></div>}
</article>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/PostCard.astro
git commit -m "feat: add PostCard with hairline divider and italic description"
```

---

## Task 24: Build Pagination component

**Files:**
- Create: `src/components/blog/Pagination.astro`

- [ ] **Step 1: Create `src/components/blog/Pagination.astro`**

```astro
---
// src/components/blog/Pagination.astro
interface Props {
  currentPage: number;
  totalPages: number;
}
const { currentPage, totalPages } = Astro.props;
---

{totalPages > 1 && (
  <nav class="flex justify-center gap-2 mt-12" aria-label="Pagination">
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
      <a
        href={num === 1 ? '/blog/' : `/blog/${num}/`}
        aria-current={num === currentPage ? 'page' : undefined}
        class:list={[
          'font-mono text-sm w-9 h-9 inline-flex items-center justify-center rounded transition-colors',
          num === currentPage
            ? 'bg-accent/15 text-accent'
            : 'text-muted border border-hairline hover:text-ink hover:border-accent/40',
        ]}
      >
        {num}
      </a>
    ))}
  </nav>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/Pagination.astro
git commit -m "feat: add Pagination component"
```

---

## Task 25: Build TableOfContents component

**Files:**
- Create: `src/components/blog/TableOfContents.astro`

- [ ] **Step 1: Create `src/components/blog/TableOfContents.astro`**

```astro
---
// src/components/blog/TableOfContents.astro
interface Heading { depth: number; slug: string; text: string }

interface Props {
  headings: Heading[];
}
const { headings } = Astro.props;
const items = headings.filter((h) => h.depth === 2);
---

{items.length >= 3 && (
  <aside class="my-10 py-5 border-y border-hairline" id="toc">
    <p class="label-smallcaps mb-3">Contents</p>
    <ol class="space-y-1.5 list-none">
      {items.map((item, i) => (
        <li class="flex gap-3 text-sm">
          <span class="font-mono text-muted shrink-0 w-6 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
          <a href={`#${item.slug}`} data-toc-slug={item.slug} class="toc-link text-muted hover:text-ink transition-colors">
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  </aside>
)}

<script>
  type TocLink = HTMLAnchorElement & { dataset: { tocSlug: string } };
  const links = Array.from(document.querySelectorAll<TocLink>('.toc-link'));
  if (links.length > 0) {
    const targets = links
      .map((link) => document.getElementById(link.dataset.tocSlug))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) => l.classList.remove('text-accent'));
          const id = entry.target.id;
          const active = links.find((l) => l.dataset.tocSlug === id);
          active?.classList.add('text-accent');
        });
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
  }
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/TableOfContents.astro
git commit -m "feat: add TableOfContents with scroll-spy in TypeScript"
```

---

## Task 26: Build BlogPost layout

**Files:**
- Create: `src/layouts/BlogPost.astro`

- [ ] **Step 1: Create `src/layouts/BlogPost.astro`**

```astro
---
// src/layouts/BlogPost.astro
import BaseLayout from './BaseLayout.astro';
import Navbar from '../components/shared/Navbar.astro';
import Footer from '../components/shared/Footer.astro';
import PostMeta from '../components/blog/PostMeta.astro';
import TagList from '../components/blog/TagList.astro';
import TableOfContents from '../components/blog/TableOfContents.astro';
import { site } from '../data/site';
import type { ImageMetadata } from 'astro';

interface Props {
  id: string;
  title: string;
  description: string;
  publishedAt: Date;
  updatedAt?: Date;
  tags: string[];
  coverImage?: ImageMetadata;
  headings: { depth: number; slug: string; text: string }[];
  readingTime: number;
}

const {
  id, title, description,
  publishedAt, updatedAt, tags, coverImage,
  headings, readingTime,
} = Astro.props;

const canonical = new URL(`/blog/${id}/`, site.url).toString();
const ogImage = coverImage?.src;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description,
  author: { '@type': 'Person', name: site.name, url: site.url },
  datePublished: publishedAt.toISOString(),
  dateModified: (updatedAt ?? publishedAt).toISOString(),
  publisher: { '@type': 'Person', name: site.name, url: site.url },
  mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
};
---

<BaseLayout
  title={`${title} — ${site.name}`}
  description={description}
  canonical={canonical}
  ogImage={ogImage}
  type="article"
  publishedAt={publishedAt}
  updatedAt={updatedAt}
  jsonLd={jsonLd}
>
  <Navbar active="blog" />
  <main class="post-column py-16">
    <a href="/blog/" class="label-smallcaps text-muted hover:text-ink transition-colors">← Back to Blog</a>
    <header class="mt-6">
      <PostMeta publishedAt={publishedAt} readingTime={readingTime} updatedAt={updatedAt} />
      <h1 class="font-serif font-semibold text-ink text-3xl md:text-4xl leading-tight mt-3">{title}</h1>
      <p class="text-muted text-lg italic leading-relaxed mt-3">{description}</p>
      <hr class="hairline mt-6" />
    </header>

    <TableOfContents headings={headings} />

    <article class="prose-academic">
      <slot />
    </article>

    {tags.length > 0 && (
      <footer class="mt-12 pt-8 hairline">
        <p class="label-smallcaps mb-3">Tags</p>
        <TagList tags={tags} size="md" />
      </footer>
    )}
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/BlogPost.astro
git commit -m "feat: add BlogPost layout with TOC, JSON-LD, and tag footer"
```

---

## Task 27: Build `/blog/[...slug]` route

**Files:**
- Create: `src/pages/blog/[...slug].astro`

- [ ] **Step 1: Create `src/pages/blog/[...slug].astro`**

```astro
---
// src/pages/blog/[...slug].astro
import { getCollection, render } from 'astro:content';
import BlogPost from '../../layouts/BlogPost.astro';
import { estimateReadingTime } from '../../lib/blog';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content, headings } = await render(post);
const readingTime = estimateReadingTime(post.body ?? '');
---

<BlogPost
  id={post.id}
  title={post.data.title}
  description={post.data.description}
  publishedAt={post.data.publishedAt}
  updatedAt={post.data.updatedAt}
  tags={post.data.tags}
  coverImage={post.data.coverImage}
  headings={headings}
  readingTime={readingTime}
>
  <Content />
</BlogPost>
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`. Visit `http://localhost:4321/blog/2026-03-25-generation-is-not-creation/`. Expected: post renders with TOC at top (multiple H2s exist), serif body, hero image full-width, two inline images centered, italic blockquotes, hairline above tags at bottom.

- [ ] **Step 3: Commit**

```bash
git add src/pages/blog/[...slug].astro
git commit -m "feat: add /blog/[...slug] route for individual posts"
```

---

## Task 28: Build `/blog` index (page 1)

**Files:**
- Create: `src/pages/blog/index.astro`

- [ ] **Step 1: Create `src/pages/blog/index.astro`**

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';
import PageLayout from '../../layouts/PageLayout.astro';
import PostCard from '../../components/blog/PostCard.astro';
import Pagination from '../../components/blog/Pagination.astro';
import { estimateReadingTime } from '../../lib/blog';

const POSTS_PER_PAGE = 10;

const all = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

const pinned = all.filter((p) => p.data.pinned).slice(0, 3);
const rest = all.filter((p) => !p.data.pinned);
const page1 = rest.slice(0, POSTS_PER_PAGE);
const totalPages = Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE));
---

<PageLayout
  title="Blog — Yuhan Wang"
  description="Essays on cognition, AI, agentic systems, and building Engram."
  active="blog"
  eyebrow="Blog"
  heading="Notes & Essays"
  intro="Long-form thinking on cognition, AI, agentic systems, and what I am building."
>
  {pinned.length > 0 && (
    <section>
      <p class="label-smallcaps mb-2">Pinned</p>
      <div class="space-y-0">
        {pinned.map((p) => (
          <PostCard post={p} readingTime={estimateReadingTime(p.body ?? '')} />
        ))}
      </div>
    </section>
  )}

  {page1.length > 0 && (
    <section class="mt-16">
      <p class="label-smallcaps mb-2">Latest</p>
      <div class="space-y-0">
        {page1.map((p) => (
          <PostCard post={p} readingTime={estimateReadingTime(p.body ?? '')} />
        ))}
      </div>
    </section>
  )}

  {(pinned.length + page1.length) === 0 && (
    <p class="text-muted">No posts yet. Check back soon.</p>
  )}

  <Pagination currentPage={1} totalPages={totalPages} />
</PageLayout>
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`. Visit `http://localhost:4321/blog/`. Expected: pinned section with the one post, no "Latest" section (only 1 post total which is pinned), no pagination (totalPages = 1).

- [ ] **Step 3: Commit**

```bash
git add src/pages/blog/index.astro
git commit -m "feat: add /blog index with pinned posts and pagination"
```

---

## Task 29: Build `/blog/[page]` paginated route

**Files:**
- Create: `src/pages/blog/[page].astro`

- [ ] **Step 1: Create `src/pages/blog/[page].astro`**

```astro
---
// src/pages/blog/[page].astro
import { getCollection } from 'astro:content';
import PageLayout from '../../layouts/PageLayout.astro';
import PostCard from '../../components/blog/PostCard.astro';
import Pagination from '../../components/blog/Pagination.astro';
import { estimateReadingTime } from '../../lib/blog';

const POSTS_PER_PAGE = 10;

export async function getStaticPaths() {
  const all = (await getCollection('blog', ({ data }) => !data.draft))
    .filter((p) => !p.data.pinned)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  const totalPages = Math.ceil(all.length / POSTS_PER_PAGE);

  // Page 1 is index.astro; generate 2..totalPages.
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => {
    const currentPage = i + 2;
    return {
      params: { page: String(currentPage) },
      props: {
        posts: all.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE),
        currentPage,
        totalPages,
      },
    };
  });
}

const { posts, currentPage, totalPages } = Astro.props;
---

<PageLayout
  title={`Blog — Page ${currentPage} — Yuhan Wang`}
  description="Essays on cognition, AI, agentic systems, and building Engram."
  active="blog"
  eyebrow="Blog"
  heading="Notes & Essays"
>
  <section>
    <p class="label-smallcaps mb-2">Page {currentPage}</p>
    <div class="space-y-0">
      {posts.map((p) => (
        <PostCard post={p} readingTime={estimateReadingTime(p.body ?? '')} />
      ))}
    </div>
  </section>
  <Pagination currentPage={currentPage} totalPages={totalPages} />
</PageLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/blog/[page].astro
git commit -m "feat: add /blog/[page] paginated listing"
```

---

## Task 30: Build `/blog/tags/[tag]` route

**Files:**
- Create: `src/pages/blog/tags/[tag].astro`

- [ ] **Step 1: Create `src/pages/blog/tags/[tag].astro`**

```astro
---
// src/pages/blog/tags/[tag].astro
import { getCollection } from 'astro:content';
import PageLayout from '../../../layouts/PageLayout.astro';
import PostCard from '../../../components/blog/PostCard.astro';
import { estimateReadingTime, slugify } from '../../../lib/blog';

export async function getStaticPaths() {
  const all = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  const tagMap = new Map<string, { displayName: string; posts: typeof all }>();
  for (const post of all) {
    for (const tag of post.data.tags) {
      const key = slugify(tag);
      if (!tagMap.has(key)) tagMap.set(key, { displayName: tag, posts: [] });
      tagMap.get(key)!.posts.push(post);
    }
  }

  return Array.from(tagMap.entries()).map(([slug, { displayName, posts }]) => ({
    params: { tag: slug },
    props: { displayName, posts },
  }));
}

const { displayName, posts } = Astro.props;
---

<PageLayout
  title={`Posts tagged ${displayName} — Yuhan Wang`}
  description={`All blog posts tagged with ${displayName}.`}
  active="blog"
  eyebrow="Tag"
  heading={displayName}
  intro={`${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
>
  <div class="space-y-0">
    {posts.map((p) => (
      <PostCard post={p} readingTime={estimateReadingTime(p.body ?? '')} />
    ))}
  </div>
  <p class="mt-12">
    <a href="/blog/" class="label-smallcaps hover:text-ink transition-colors">← All posts</a>
  </p>
</PageLayout>
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`. Visit `http://localhost:4321/blog/tags/ai/`. Expected: tag landing page lists the one matching post.

- [ ] **Step 3: Commit**

```bash
git add src/pages/blog/tags/[tag].astro
git commit -m "feat: add /blog/tags/[tag] route for tag-filtered listings"
```

---

## Task 31: Build RSS feed

**Files:**
- Create: `src/pages/rss.xml.ts`

- [ ] **Step 1: Add `@astrojs/rss` (already installed in Task 2)**

Verify: `cat package.json | grep '@astrojs/rss'`
Expected: shows the dependency.

- [ ] **Step 2: Create `src/pages/rss.xml.ts`**

```ts
// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: `${site.name} — Blog`,
    description: 'Essays on cognition, AI, agentic systems, and building Engram.',
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title:       post.data.title,
      pubDate:     post.data.publishedAt,
      description: post.data.description,
      link:        `/blog/${post.id}/`,
      categories:  post.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}
```

- [ ] **Step 3: Verify the feed builds**

Run: `npm run build && ls dist/rss.xml`
Expected: file exists.

- [ ] **Step 4: Spot-check the XML**

Run: `head -40 dist/rss.xml`
Expected: well-formed RSS 2.0 with the post title, link, pubDate, categories.

- [ ] **Step 5: Commit**

```bash
git add src/pages/rss.xml.ts
git commit -m "feat: add /rss.xml feed"
```

---

## Task 32: Promote favicons to `public/`

**Files:**
- Move: favicon and manifest files from `_jekyll-legacy/images/` to `public/`

- [ ] **Step 1: Create `public/` and move files**

Run:
```bash
mkdir -p public
git mv _jekyll-legacy/images/favicon.ico public/
git mv _jekyll-legacy/images/favicon-16x16.png public/
git mv _jekyll-legacy/images/favicon-32x32.png public/
git mv _jekyll-legacy/images/apple-touch-icon.png public/
git mv _jekyll-legacy/images/android-chrome-192x192.png public/
git mv _jekyll-legacy/images/android-chrome-512x512.png public/
git mv _jekyll-legacy/images/site.webmanifest public/
```

- [ ] **Step 2: Add `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://yuhanwang14.github.io/sitemap-index.xml
```

- [ ] **Step 3: Verify build still succeeds**

Run: `npm run build`
Expected: 0 errors. `dist/favicon.ico` and `dist/robots.txt` exist.

- [ ] **Step 4: Commit**

```bash
git add public
git commit -m "feat: promote favicons and add robots.txt"
```

---

## Task 33: Add GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: GitHub repo Settings → Pages → Source = "GitHub Actions" (manual; flagged below)

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy Astro site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx astro check

      - name: Run unit tests
        run: npm test

      - name: Build site
        run: npm run build
        env:
          NODE_ENV: production

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Manual action — switch GitHub Pages source**

In the repository settings on github.com:
- Settings → Pages → Build and deployment → Source: switch from "Deploy from a branch" to "GitHub Actions".

This step cannot be automated. Document it in the PR description so it isn't missed at merge time.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow to deploy Astro to Pages"
```

---

## Task 34: Build full site and run final checks

**Files:** none

- [ ] **Step 1: Type check**

Run: `npx astro check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 2: Unit tests**

Run: `npm test`
Expected: All tests in `lib/blog.test.ts` pass.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: 0 errors. Build artifacts under `dist/`.

- [ ] **Step 4: Verify all expected files exist in `dist/`**

Run: `ls dist/ && ls dist/blog/ && ls dist/blog/2026-03-25-generation-is-not-creation/ && ls dist/blog/tags/`
Expected:
- `dist/index.html`, `dist/research/index.html`, `dist/industry/index.html`, `dist/skills/index.html`, `dist/404.html`, `dist/rss.xml`, `dist/sitemap-index.xml`, `dist/favicon.ico`, `dist/robots.txt`.
- `dist/blog/index.html`.
- `dist/blog/2026-03-25-generation-is-not-creation/index.html`.
- `dist/blog/tags/ai/index.html` (and other tag dirs from the existing post: `cognition`, `philosophy`, `engram`).

- [ ] **Step 5: Preview locally and walk every route**

Run: `npm run preview`. Visit each in turn (light mode and dark mode by toggling system preference):
- `http://localhost:4321/`
- `http://localhost:4321/research/`
- `http://localhost:4321/industry/`
- `http://localhost:4321/skills/`
- `http://localhost:4321/blog/`
- `http://localhost:4321/blog/2026-03-25-generation-is-not-creation/`
- `http://localhost:4321/blog/tags/ai/`
- `http://localhost:4321/rss.xml`
- `http://localhost:4321/this-page-does-not-exist`  (expect 404)

For each route, check: navbar active state, hairline dividers, fonts loaded, smallcaps labels, no console errors.

- [ ] **Step 6: Lighthouse spot check**

Open Chrome devtools on `/` and `/blog/2026-03-25-generation-is-not-creation/`. Run Lighthouse → Performance + Accessibility on Desktop. Expected: both ≥ 95.

If under 95: investigate (often a missing alt text, a font that's swap=off, or large unoptimized image). Fix and rebuild before continuing.

- [ ] **Step 7: Commit any QA fixes**

If you made any fixes:
```bash
git add <files>
git commit -m "fix: <description from QA pass>"
```

---

## Task 35: Delete `_jekyll-legacy/` and final cleanup

**Files:**
- Delete: `_jekyll-legacy/`
- Modify: `.gitignore`, `README.md`

- [ ] **Step 1: Confirm Astro build is healthy and all routes pass QA**

This step is a hard prerequisite. Do not proceed if any Task 34 step failed.

- [ ] **Step 2: Delete `_jekyll-legacy/` from the working tree**

Run: `git rm -r _jekyll-legacy`

- [ ] **Step 3: Remove `_jekyll-legacy/` exclusions from `.gitignore`**

In `.gitignore`, delete the block:
```
# Jekyll legacy (kept until end of migration)
_jekyll-legacy/.bundle/
_jekyll-legacy/_site/
_jekyll-legacy/.sass-cache/
_jekyll-legacy/.jekyll-cache/
```

- [ ] **Step 4: Rewrite `README.md` for the Astro stack**

Overwrite `README.md` with:

```markdown
# yuhanwang14.github.io

Personal site for **Yuhan Wang** — Founder & CTO @ Engram, MIT visiting researcher, Imperial College.

Built with [Astro](https://astro.build/) and TypeScript. Deployed to GitHub Pages via GitHub Actions.

## Stack

- [Astro 6](https://astro.build/) with MDX content collections
- [TypeScript](https://www.typescriptlang.org/) (strict)
- [Tailwind CSS 3](https://tailwindcss.com/)
- Self-hosted [Newsreader](https://fonts.google.com/specimen/Newsreader) + [Geist](https://vercel.com/font) + [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

## Local dev

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static build to dist/
npm run preview      # preview the build
npm test             # vitest unit tests
npx astro check      # TypeScript + Astro type-check
```

## Project structure

```
src/
├── content/blog/        # MDX blog posts
├── content.config.ts    # Zod schema for blog frontmatter
├── data/                # typed about-page content
├── layouts/             # BaseLayout, PageLayout, BlogPost
├── components/          # shared/* and blog/*
├── pages/               # routes
├── lib/                 # pure utilities (with vitest tests)
├── styles/              # global.css with theme tokens
└── assets/              # images and fonts
```

## Adding a blog post

Create `src/content/blog/<slug>.mdx`:

```mdx
---
title: "Post title"
description: "One-line summary used for the listing card and meta description."
publishedAt: 2026-04-26
tags: [ai, cognition]
pinned: false
draft: false
---

Post body in Markdown / MDX.
```

The post will appear at `/blog/<slug>/`.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml` which type-checks, runs tests, builds, and deploys to GitHub Pages.

## License

Code: MIT (see `LICENSE`). Post content: © Yuhan Wang.
```

- [ ] **Step 5: Verify build still succeeds with no legacy files**

Run: `npm run build`
Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: delete _jekyll-legacy/ and rewrite README for Astro stack"
```

---

## Task 36: Open PR and ship

**Files:** none (GitHub-side action)

- [ ] **Step 1: Push the branch**

Run: `git push -u origin feat/astro-migration`

- [ ] **Step 2: Open the pull request**

Run:
```bash
gh pr create --title "Migrate site from Jekyll to Astro" --body "$(cat <<'EOF'
## Summary
- Full migration from Jekyll/academicpages to Astro 6 + TypeScript strict + MDX content collections.
- Real multi-route navigation (`/`, `/research`, `/industry`, `/skills`, `/blog`); replaces the previous JS-tab single-page about.
- Editorial visual system (Newsreader serif, Geist UI, JetBrains Mono) with cream/oxblood light theme and warm-graphite/dusty-rose dark theme via `prefers-color-scheme`.
- Blog: Zod-validated frontmatter, pinned posts, pagination, tag pages, TOC scroll-spy, RSS, sitemap, JSON-LD.
- Deployed via GitHub Actions; Pages source must be switched from "Deploy from branch" to "GitHub Actions" (settings change documented below).

## Manual step at merge time
- In repo Settings → Pages → Source: switch to **GitHub Actions** before merging this PR.

## Test plan
- [ ] `npx astro check` passes
- [ ] `npm test` passes
- [ ] `npm run build` produces `dist/` with all expected routes
- [ ] Local preview walks every route in light + dark mode
- [ ] Lighthouse Performance ≥ 95 and Accessibility ≥ 95 on `/` and the blog post
- [ ] After merge: deployed site at https://yuhanwang14.github.io/ matches the local preview
EOF
)"
```

- [ ] **Step 3: Wait for CI to pass**

Run: `gh pr checks --watch`
Expected: build job + deploy job both green.

- [ ] **Step 4: Manual merge once verified**

Stop here. The user merges the PR after spot-checking the deployed Pages preview if available, or directly after CI green if not.

---

## Self-Review

### Spec coverage
- Stack & Tooling → Tasks 2, 3
- Routes table → Tasks 13–17, 27–30, 31
- Content schema → Task 18
- About-page typed data → Tasks 5, 12
- Directory layout → mirrored in plan File Structure
- Visual system (theme tokens, fonts, smallcaps, prose) → Tasks 3, 4
- Component highlights (Navbar, ProfileCard, PostCard, BlogPost, Footer) → Tasks 8–11, 21–26
- SEO/Meta → Tasks 6, 26 (JSON-LD), 31 (RSS)
- Migration strategy → Tasks 0, 1, 35, 36
- Acceptance criteria → covered by Tasks 34, 36

### Placeholder scan
No "TBD", "TODO", or "implement later" markers. Each step has either exact code or an exact command. Manual font download in Task 4 is explicit about source URLs. Manual GitHub Pages source switch in Task 33 Step 2 is flagged as non-automatable and documented in the PR body in Task 36.

### Type consistency
- `formatDate`, `formatDateShort`, `estimateReadingTime`, `slugify` defined in Task 20, used consistently in Tasks 21, 23, 27, 28, 29, 30.
- `site` import path is `../../data/site` from `components/shared/`, `../../data/site` from `pages/`, `../data/site` from `layouts/` — verified against the planned directory layout.
- `CollectionEntry<'blog'>` used in PostCard (Task 23) matches the collection name in `content.config.ts` (Task 18).
- `BlogPost` props in Task 26 match the props passed in Task 27.
- `slugify` in TagList (Task 22) matches `slugify` in tag-page generator (Task 30).

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-26-personal-site-astro-migration.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
