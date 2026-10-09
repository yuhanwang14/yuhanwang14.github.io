// src/data/projects.ts
// The Projects page draws these as a transit diagram: one line per context, one stop per
// project, in the order listed here. A stop shows its screenshots as a poster; until it has
// any, it shows a station board with the project's name.

export type LineId = 'engram' | 'personal' | 'friends';

export interface Line {
  id: LineId;
  name: string;
  caption: string;
}

export interface ProjectShot {
  /** Served from /public. */
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Project {
  name: string;
  line: LineId;
  year: string;
  /** Shown in place of a link while the project is not public. */
  status?: string;
  oneLiner: string;
  href?: string;
  /** The same project also lives somewhere else; drawn as an interchange. */
  interchange?: { label: string; href: string };
  /** One desktop screenshot, or two phone screenshots with device: 'phone'. */
  shots?: ProjectShot[];
  device?: 'phone';
}

export const lines: Line[] = [
  { id: 'engram', name: 'Engram', caption: 'Built at the company' },
  { id: 'personal', name: 'Personal', caption: 'Built on my own' },
  { id: 'friends', name: 'With friends', caption: 'Built together' },
];

export const projects: Project[] = [
  {
    name: 'Trading Max',
    line: 'engram',
    year: '2026',
    oneLiner: 'A private, read-only workspace for Trading 212 portfolios.',
    href: 'https://github.com/engramai-co/trading-max',
    shots: [
      {
        src: '/projects/trading-max.webp',
        width: 960,
        height: 707,
        alt: 'Trading Max portfolio overview: account value, profit and loss, and holdings.',
      },
    ],
  },
  {
    name: 'City Bikeline',
    line: 'engram',
    year: '2026',
    status: 'Opening soon',
    oneLiner: 'An iOS app that plans rides on roads you have never cycled.',
    device: 'phone',
    shots: [
      {
        src: '/projects/city-bikeline-routes.webp',
        width: 435,
        height: 877,
        alt: 'Three suggested rides, each with its distance, riding time and how much of it is new.',
      },
      {
        src: '/projects/city-bikeline-route.webp',
        width: 435,
        height: 877,
        alt: 'A suggested ride drawn on a map of north London.',
      },
    ],
  },
  {
    name: 'Engram Job Board',
    line: 'engram',
    year: '2026',
    oneLiner: 'An agent skill that checks real job descriptions against your profile.',
    href: 'https://github.com/engramai-co/Engram-Job-Board',
  },
  {
    name: 'Operator',
    line: 'personal',
    year: '2026',
    oneLiner: 'A personal operating system on Obsidian, run by Claude Code and Codex.',
    href: 'https://github.com/yuhanwang14/Obsidian-Operator',
    interchange: { label: 'Change for the Engram edition', href: 'https://github.com/engramai-co/Engram-Obsidian-Operator' },
  },
  {
    name: 'Claude Usage TUI',
    line: 'personal',
    year: '2026',
    oneLiner: 'Claude.ai usage limits, live in your terminal.',
    href: 'https://github.com/yuhanwang14/Claude-Usage-TUI',
  },
  {
    name: 'ASR Pipeline',
    line: 'personal',
    year: '2026',
    oneLiner: 'Private, speaker-labelled transcription on one 8 GB GPU.',
    href: 'https://github.com/yuhanwang14/ASR-Pipeline',
  },
  {
    name: 'PDF to EPUB',
    line: 'personal',
    year: '2026',
    oneLiner: 'Scanned Chinese books, turned into clean EPUBs.',
    href: 'https://github.com/yuhanwang14/PDF-to-EPUB',
  },
  {
    name: 'Spatial Historical Intelligence',
    line: 'friends',
    year: '2025',
    oneLiner: 'Click anywhere on the map to read its history.',
    href: 'https://github.com/xiaoshihou514/shi',
    shots: [
      {
        src: '/projects/shi-connections.webp',
        width: 1200,
        height: 649,
        alt: 'Connections drawn between Berlin, Prague, Bratislava and Salzburg on a dark map.',
      },
    ],
  },
  {
    name: 'NPC Trading',
    line: 'friends',
    year: '2025',
    oneLiner: 'An event-driven crypto trading engine in C++17.',
    href: 'https://github.com/yuhanwang14/NPC-Trading',
  },
  {
    name: 'WACC Compiler',
    line: 'friends',
    year: '2025',
    oneLiner: 'A compiler from WACC to AArch64 assembly.',
    href: 'https://github.com/yuhanwang14/WACC-Compiler',
  },
];
