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
      theme: 'github-light',
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
