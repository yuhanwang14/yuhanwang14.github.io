// src/pages/rss.xml.ts — feed of all blog posts (one entry per post, EN and ZH both included).
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { parsePostId, postUrl } from '../lib/blog';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: `${site.name} — Blog`,
    description: 'Essays on cognition, AI, agentic systems, and building Engram. Bilingual: 中文 + English.',
    site: context.site ?? site.url,
    items: posts.map((post) => {
      const { baseSlug, lang } = parsePostId(post.id);
      const titlePrefix = lang === 'zh' ? '【中文】' : '';
      return {
        title: titlePrefix + post.data.title,
        pubDate: post.data.publishedAt,
        description: post.data.description,
        link: postUrl(baseSlug, lang),
        categories: [...post.data.tags, lang],
      };
    }),
    customData: '<language>en-us</language>',
  });
}
