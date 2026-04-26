// src/data/industry.ts
export interface IndustryItem {
  org: string;
  role: string;
  location: string;
  startDate: string;     // 'YYYY-MM'
  endDate: string;       // 'present' | 'YYYY-MM'
  bullets: string[];
}

export const industry: IndustryItem[] = [
  {
    org: 'Engram',
    role: 'Founder & CTO',
    location: 'London, United Kingdom',
    startDate: '2026-01',
    endDate: 'present',
    bullets: [
      'Building <strong>Engram</strong> — the cognition alignment layer that gives AI agents <em>judgment</em>, not just <em>memory</em>.',
      'Extracts a structured <strong>CognitiveProfile</strong> from reasoning artifacts (memos, decision logs) and renders agent outputs through that cognitive lens.',
      'Local-first by design: profiles stay on the user\'s machine, never the model provider\'s.',
    ],
  },
  {
    org: 'Millennium Management LLC',
    role: 'AI Engineer Intern',
    location: 'London, United Kingdom',
    startDate: '2026-06',
    endDate: '2026-08',
    bullets: [
      'Incoming <strong>AI Engineer Intern</strong> at Millennium Equity Technology Team, mentored by Andrei-Octavian Brabete.',
      "Building AI solutions for MLP's equity investment teams around the globe, focusing on applying AI/LLMs to research process augmentation.",
    ],
  },
  {
    org: 'Five Stars Education',
    role: 'Founder Engineer',
    location: 'London, United Kingdom',
    startDate: '2024-09',
    endDate: '2025-03',
    bullets: [
      'Built an education platform focused on training international students through pre-recorded videos and online sessions.',
      'Collaborated with educators across diverse STEM fields to deliver an optimised learning experience.',
    ],
  },
];
