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
