// src/data/news.ts
// Source: _jekyll-legacy/_pages/about.md (News section).
export interface NewsItem {
  date: string;
  emoji: string;
  htmlBody: string;
}

export const news: NewsItem[] = [
  {
    date: '2026.03',
    emoji: '🚀',
    htmlBody:
      'PAGE-4D training + evaluation code fully <strong>open-sourced</strong>! Check it out on <a href="https://github.com/yuhanwang14/PAGE-4D">GitHub</a>.',
  },
  {
    date: '2026.02',
    emoji: '🏗️',
    htmlBody:
      'Founded <strong>Engram</strong> — building a local-first cognitive alignment layer for AI systems.',
  },
  {
    date: '2026.01',
    emoji: '🎓',
    htmlBody: 'PAGE-4D paper accepted by <strong>ICLR 2026</strong>!',
  },
  {
    date: '2025.11',
    emoji: '💼',
    htmlBody:
      "Accepted an offer from <strong>Millennium</strong>'s Equity Technology Team as an AI Engineer Intern!",
  },
  {
    date: '2025.06',
    emoji: '🎓',
    htmlBody: 'Joined <strong>MIT Media Lab</strong> as a Visiting Graduate Researcher!',
  },
];
