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
  description: string;
  url: string;
  twitterHandle: string;
  social: SocialLink[];
  scholarShieldRepoBranch: string;
  scholarShieldFile: string;
}

export const site: SiteData = {
  name: 'Yuhan Wang',
  shortName: 'Yuhan',
  role: 'Founder & CTO @ Engram · MIT Researcher · Imperial College',
  location: 'London, United Kingdom',
  email: 'yuhanwangwork14@gmail.com',
  description:
    'Founder & CTO @ Engram. Research on cognitive AI, agentic systems, and 4D foundation models. Imperial College mathematics & computer science.',
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
  // The crawler workflow pushes its results dir to the `google-scholar-stats`
  // BRANCH at root, so the JSON lives at <branch>/gs_data_shieldsio.json
  // (not inside a google-scholar-stats/ subfolder, which is what the upstream
  // academicpages template's main-branch layout assumed).
  scholarShieldRepoBranch: 'yuhanwang14/yuhanwang14.github.io@google-scholar-stats',
  scholarShieldFile: 'gs_data_shieldsio.json',
};
