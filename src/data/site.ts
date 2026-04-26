// src/data/site.ts
export interface SocialLink {
  label: string;
  href: string;
}

export interface EmailEntry {
  /** Short label shown alongside the address (e.g. 'Personal', 'Engram'). */
  label: string;
  /** Full email address; used both as visible text and as the mailto target. */
  address: string;
}

export interface SiteData {
  name: string;
  shortName: string;
  role: string;
  location: string;
  emails: EmailEntry[];
  description: string;
  url: string;
  twitterHandle: string;
  social: SocialLink[];
}

export const site: SiteData = {
  name: 'Yuhan Wang',
  shortName: 'Yuhan',
  role: 'Founder & CTO @ Engram · MIT Researcher · Imperial College',
  location: 'London & Boston',
  emails: [
    { label: 'Personal', address: 'yuhanwangwork14@gmail.com' },
    { label: 'Engram',   address: 'yuhan@engramai.co' },
  ],
  description:
    'Founder & CTO @ Engram. Research on cognitive AI, agentic systems, and 4D foundation models. Imperial College mathematics & computer science.',
  url: 'https://yuhanwang14.github.io',
  twitterHandle: '@YuhanWangWork14',
  social: [
    { label: 'GitHub',   href: 'https://github.com/yuhanwang14' },
    { label: 'Scholar',  href: 'https://scholar.google.com/citations?user=gYhZ614AAAAJ&hl=en&authuser=1' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yuhan-wang-5546832a2/' },
    { label: 'X',        href: 'https://x.com/YuhanWangWork14' },
    { label: 'RSS',      href: '/rss.xml' },
  ],
};
