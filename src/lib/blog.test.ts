// src/lib/blog.test.ts
import { describe, expect, it } from 'vitest';
import { formatDate, formatDateShort, estimateReadingTime, slugify, parsePostId, postUrl } from './blog';

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

describe('parsePostId', () => {
  it('extracts language and base slug from .en suffix', () => {
    expect(parsePostId('generation-is-not-creation.en')).toEqual({
      baseSlug: 'generation-is-not-creation',
      lang: 'en',
    });
  });
  it('extracts language and base slug from .zh suffix', () => {
    expect(parsePostId('generation-is-not-creation.zh')).toEqual({
      baseSlug: 'generation-is-not-creation',
      lang: 'zh',
    });
  });
  it('defaults to en when no language suffix is present', () => {
    expect(parsePostId('legacy-post')).toEqual({
      baseSlug: 'legacy-post',
      lang: 'en',
    });
  });
  it('treats unrecognized trailing segment as part of slug', () => {
    expect(parsePostId('post.draft')).toEqual({
      baseSlug: 'post.draft',
      lang: 'en',
    });
  });
});

describe('postUrl', () => {
  it('English posts go to /blog/<slug>/', () => {
    expect(postUrl('hello', 'en')).toBe('/blog/hello/');
  });
  it('Chinese posts go to /blog/<slug>/zh/', () => {
    expect(postUrl('hello', 'zh')).toBe('/blog/hello/zh/');
  });
});
