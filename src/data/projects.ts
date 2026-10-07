// src/data/projects.ts
// Rows on the Projects page, in display order.

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  /** Where it was built: at Engram, alone, or with others. */
  context: 'Engram' | 'Personal' | 'Team';
  year: string;
  /** Shown after the year for work that is not released yet. */
  status?: string;
  summary: string;
  stack: string[];
  links: ProjectLink[];
  /** A one-line install command, offered with a copy button. */
  install?: string;
}

export const projects: Project[] = [
  {
    name: 'Trading Max',
    context: 'Engram',
    year: '2026',
    summary:
      'A private workspace for Trading 212 accounts. It separates investment results from money moving in and out, looks through funds to the companies underneath, and puts company research beside the portfolio. Broker access is read-only, and the data stays on your computer.',
    stack: ['Python', 'FastAPI', 'TypeScript', 'Next.js'],
    links: [
      { label: 'GitHub', href: 'https://github.com/engramai-co/trading-max' },
      { label: 'Releases', href: 'https://github.com/engramai-co/trading-max/releases/latest' },
    ],
  },
  {
    name: 'City Bikeline',
    context: 'Engram',
    year: '2026',
    status: 'In pilot',
    summary:
      'An iOS app for riding somewhere new. It imports your rides from Apple Health, maps the roads you have already ridden, and suggests routes that favour new roads, protected cycleways and low traffic. Routing runs on self-hosted Valhalla and BRouter over an England-wide OpenStreetMap graph.',
    stack: ['Swift', 'SwiftUI', 'FastAPI', 'PostGIS', 'Valhalla'],
    links: [],
  },
  {
    name: 'Spatial Historical Intelligence',
    context: 'Team',
    year: '2025',
    summary:
      "An AI map of the world. Click anywhere to read the history and culture of that place, see how places are connected, follow a notable figure's life across the map, or compare countries side by side. Perplexity's search API supplies the knowledge; MapLibre and deck.gl draw it.",
    stack: ['React', 'TypeScript', 'deck.gl', 'MapLibre', 'Perplexity API'],
    links: [{ label: 'GitHub', href: 'https://github.com/xiaoshihou514/shi' }],
  },
  {
    name: 'Operator',
    context: 'Personal',
    year: '2026',
    summary:
      'A personal operating system on Obsidian, run by Claude Code or Codex. Nineteen skills cover daily briefings, arXiv scans, weekly reviews, meeting notes, planning and deep research. The Engram edition adds an Obsidian plugin with a home for today.',
    stack: ['Claude Code', 'Codex', 'Obsidian', 'TypeScript'],
    links: [
      { label: 'GitHub', href: 'https://github.com/yuhanwang14/Obsidian-Operator' },
      { label: 'Obsidian plugin', href: 'https://github.com/engramai-co/Engram-Obsidian-Operator' },
    ],
  },
  {
    name: 'Claude Usage TUI',
    context: 'Personal',
    year: '2026',
    summary:
      'A btop-style terminal dashboard for Claude.ai usage limits: the five-hour session window, weekly limits by model, and extra spend, refreshed live.',
    stack: ['Rust', 'ratatui'],
    links: [{ label: 'GitHub', href: 'https://github.com/yuhanwang14/Claude-Usage-TUI' }],
    install: 'brew install yuhanwang14/tap/claude-usage-tui',
  },
  {
    name: 'ASR Pipeline',
    context: 'Personal',
    year: '2026',
    summary:
      'Speaker-labelled transcription for Chinese–English meetings, without the audio leaving your machine. Four models take turns on one 8 GB laptop GPU: voice activity detection, diarization, Qwen3-ASR, and a Qwen3.5 model that corrects the transcript.',
    stack: ['Python', 'pyannote', 'Qwen3-ASR', 'vLLM', 'llama.cpp'],
    links: [{ label: 'GitHub', href: 'https://github.com/yuhanwang14/ASR-Pipeline' }],
  },
  {
    name: 'PDF to EPUB',
    context: 'Personal',
    year: '2026',
    summary:
      'A Claude Code plugin that turns scanned Chinese books into clean EPUBs. PaddleOCR reads the pages; the plugin then rebuilds chapters, linked footnotes and image plates, and drops the running headers a scan repeats on every page.',
    stack: ['Python', 'PaddleOCR', 'pandoc', 'Claude Code'],
    links: [{ label: 'GitHub', href: 'https://github.com/yuhanwang14/PDF-to-EPUB' }],
  },
  {
    name: 'Engram Job Board',
    context: 'Engram',
    year: '2026',
    summary:
      'An agent skill for job hunting. It reads official careers pages and the exact job descriptions, compares fit and pay against your own profile, and keeps a local application tracker up to date.',
    stack: ['TypeScript', 'React', 'ECharts', 'Agent skill'],
    links: [{ label: 'GitHub', href: 'https://github.com/engramai-co/Engram-Job-Board' }],
  },
  {
    name: 'NPC Trading',
    context: 'Team',
    year: '2025',
    summary:
      'An event-driven crypto trading engine in C++17. A central message bus connects live Binance market data and local order books, pre-trade risk checks, and execution for market, limit, stop, trailing and iceberg orders.',
    stack: ['C++17', 'Boost.Beast', 'Binance API'],
    links: [{ label: 'GitHub', href: 'https://github.com/yuhanwang14/NPC-Trading' }],
  },
  {
    name: 'WACC Compiler',
    context: 'Team',
    year: '2025',
    summary:
      "A compiler for WACC, the language of Imperial's compilers course, from source code to AArch64 assembly: lexing, parsing, type checking and code generation, run through GCC and QEMU.",
    stack: ['Scala', 'AArch64'],
    links: [{ label: 'GitHub', href: 'https://github.com/yuhanwang14/WACC-Compiler' }],
  },
];
