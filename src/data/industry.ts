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
      'Building cognitive AI infrastructure for identity-aligned, long-horizon reasoning.',
      'Architecting a dual-process cognition system combining causal knowledge graphs, contextual bandits, and local-first cognitive models.',
      'Designing a runtime alignment layer that operates before model inference, treating reasoning as system infrastructure.',
      'Working with early design partners and VCs to deploy scalable, alignment-first AI systems.',
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
