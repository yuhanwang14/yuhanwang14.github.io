// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.{md,mdx}',
    // Preserve dots in the id so we can encode language as <slug>.<lang>.mdx.
    // Astro's default generateId would strip the dot, mangling
    // "generation-is-not-creation.en" → "generation-is-not-creationen".
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/i, ''),
  }),
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
