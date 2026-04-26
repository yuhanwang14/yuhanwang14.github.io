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

const WORDS_PER_MINUTE = 200;       // typical silent-read speed for English prose
const CJK_CHARS_PER_MINUTE = 400;   // typical silent-read speed for Han characters

/**
 * Estimates reading time in minutes. Counts Han ideographs and non-CJK
 * whitespace-delimited words separately, so that a Chinese essay isn't
 * mis-measured as ~50 words just because Chinese doesn't use word spacing.
 */
export function estimateReadingTime(content: string): number {
  const trimmed = content.trim();
  if (trimmed === '') return 1;

  const cjkChars = (trimmed.match(/\p{Script=Han}/gu) ?? []).length;
  const nonCjk = trimmed.replace(/\p{Script=Han}/gu, ' ').trim();
  const words = nonCjk === '' ? 0 : nonCjk.split(/\s+/).length;

  const minutes = cjkChars / CJK_CHARS_PER_MINUTE + words / WORDS_PER_MINUTE;
  return Math.max(1, Math.round(minutes));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export type Lang = 'en' | 'zh';

export const LANGS: Lang[] = ['en', 'zh'];

export const LANG_LABELS: Record<Lang, string> = {
  en: 'EN',
  zh: '中文',
};

/**
 * Parses a content collection id like "generation-is-not-creation.zh"
 * into { baseSlug: "generation-is-not-creation", lang: "zh" }.
 *
 * If the id does not end in a known language code, lang defaults to 'en'
 * (so legacy posts written without a `.en` suffix still work).
 */
export function parsePostId(id: string): { baseSlug: string; lang: Lang } {
  const lastDot = id.lastIndexOf('.');
  if (lastDot < 0) return { baseSlug: id, lang: 'en' };
  const tail = id.slice(lastDot + 1);
  if (tail === 'en' || tail === 'zh') {
    return { baseSlug: id.slice(0, lastDot), lang: tail };
  }
  return { baseSlug: id, lang: 'en' };
}

export function postUrl(baseSlug: string, lang: Lang): string {
  return lang === 'zh' ? `/blog/${baseSlug}/zh/` : `/blog/${baseSlug}/`;
}

/**
 * Generic groupable: anything with an `id` string and a `data.publishedAt`
 * Date. Used to avoid pulling Astro types into lib (so this module stays
 * trivially testable in vitest's node environment).
 */
type Groupable<T> = { id: string; data: { publishedAt: Date; pinned?: boolean } } & T;

export interface PostGroup<T> {
  baseSlug: string;
  posts: Partial<Record<Lang, Groupable<T>>>;
  /** The post we use to represent this base slug in listings. EN preferred, else ZH. */
  primary: Groupable<T>;
  /** True if a translation in any other language exists. */
  hasTranslations: boolean;
  pinned: boolean;
  publishedAt: Date;
}

/**
 * Groups blog entries by their base slug, returning one PostGroup per slug.
 * Sorted by primary.publishedAt descending.
 */
export function groupByBaseSlug<T>(entries: Groupable<T>[]): PostGroup<T>[] {
  const map = new Map<string, PostGroup<T>>();

  for (const entry of entries) {
    const { baseSlug, lang } = parsePostId(entry.id);
    let group = map.get(baseSlug);
    if (!group) {
      group = {
        baseSlug,
        posts: {},
        primary: entry,
        hasTranslations: false,
        pinned: !!entry.data.pinned,
        publishedAt: entry.data.publishedAt,
      };
      map.set(baseSlug, group);
    }
    group.posts[lang] = entry;
    // EN takes precedence as the "primary" view; otherwise keep the most recently
    // added (which will be ZH-only).
    if (lang === 'en' || !group.posts.en) {
      group.primary = entry;
      group.publishedAt = entry.data.publishedAt;
      group.pinned = !!entry.data.pinned;
    }
    group.hasTranslations = Object.keys(group.posts).length > 1;
  }

  return [...map.values()].sort(
    (a, b) => b.publishedAt.valueOf() - a.publishedAt.valueOf(),
  );
}
