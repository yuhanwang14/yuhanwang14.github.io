# yuhanwang14.github.io

Personal site for **Yuhan Wang** — Founder & CTO @ Engram, MIT visiting researcher, Imperial College.

Built with [Astro 6](https://astro.build/) and TypeScript. Deployed to GitHub Pages via GitHub Actions.

## Stack

- Astro 6 with MDX content collections + Zod schemas
- TypeScript (strict mode)
- Tailwind CSS 3 with CSS-variable theme tokens
- Self-hosted [Newsreader](https://fonts.google.com/specimen/Newsreader), [Geist](https://vercel.com/font), [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (variable woff2)
- Light + dark theme via `prefers-color-scheme` (auto)
- Vitest for unit tests
- `@astrojs/sitemap`, `@astrojs/rss`, sharp for image optimization

## Local dev

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static build to dist/
npm run preview      # serve the build
npm test             # vitest unit tests
npx astro check      # TypeScript + Astro type-check
```

## Project structure

```
src/
├── content/blog/        # MDX blog posts
├── content.config.ts    # Zod schema for blog frontmatter
├── data/                # typed about-page content (news, publications, etc.)
├── layouts/             # BaseLayout, PageLayout, BlogPost
├── components/          # shared/* and blog/*
├── pages/               # routes
├── lib/                 # pure utilities (with vitest tests)
├── styles/              # global.css with theme tokens
└── assets/              # images
public/
├── fonts/               # self-hosted variable woff2
├── favicon.*            # icons
└── robots.txt
.github/workflows/
├── deploy.yml           # build + deploy to GitHub Pages
└── google_scholar_crawler.yaml   # nightly citation count update
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

Pushes to `main` trigger `.github/workflows/deploy.yml` which type-checks (`astro check`), runs tests (`vitest`), builds (`astro build`), and deploys to GitHub Pages.

GitHub Pages must be configured to use **GitHub Actions** as the source (Repo Settings → Pages → Build and deployment → Source).

## License

Code: MIT (see `LICENSE`). Post content: © Yuhan Wang.
