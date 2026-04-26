// src/data/research.ts
export interface ResearchItem {
  org: string;
  group?: string;
  role: string;
  startDate: string;     // 'YYYY-MM'
  endDate: string;       // 'present' | 'YYYY-MM'
  bullets: string[];     // can contain inline HTML
}

export const research: ResearchItem[] = [
  {
    org: 'MIT Media Lab',
    group: 'Multisensory Intelligence Group',
    role: 'Graduate Researcher',
    startDate: '2025-09',
    endDate: 'present',
    bullets: [
      'Working on a new research direction in <strong>Vision-Language-Action (VLA)</strong> models and <strong>robotics</strong>.',
    ],
  },
  {
    org: 'MIT Media Lab',
    group: 'Multisensory Intelligence Group',
    role: 'Graduate Visiting Researcher',
    startDate: '2025-06',
    endDate: '2025-09',
    bullets: [
      'Co-developed <strong>PAGE-4D</strong>, a feedforward 4D perception framework extending <strong>VGGT</strong> with a dynamics-aware aggregator for static–dynamic disentanglement.',
      'Introduced mask-guided attention to suppress motion for pose tokens while exploiting dynamics for geometry tokens.',
      'Applied selective fine-tuning on the middle <strong>10 VGGT layers (~30% parameters)</strong>, matching full fine-tuning performance with no runtime or memory overhead.',
      'Achieved <strong>state-of-the-art results</strong> on Sintel, DyCheck, and TUM benchmarks, improving depth, pose accuracy, and rendering quality (PSNR/SSIM, LPIPS).',
    ],
  },
  {
    org: 'Imperial College',
    group: 'Department of Mechanical Engineering',
    role: 'Undergraduate Researcher, Full-Stack Developer',
    startDate: '2024-07',
    endDate: '2024-10',
    bullets: [
      'Designed and developed a modern, data-driven web platform called <strong>Smart-Forming</strong> that enables engineers to discover, evaluate, and share manufacturing knowledge modules.',
      'Focused on intuitive UX, modular architecture, and seamless integration of metadata analytics (heatmap, word cloud supported by Python and MATLAB) to support <strong>industrial R&amp;D</strong>.',
    ],
  },
  {
    org: 'UESTC',
    group: 'School of Computer Science and Engineering',
    role: 'High School Researcher',
    startDate: '2022-01',
    endDate: '2022-12',
    bullets: [
      'Research on <strong>Open World Object Detection</strong> for classifying known and unknown objects.',
      'Improved a <strong>Detectron2-based model ORE</strong> for incremental object detection using contrastive clustering and auto-labeling RPN.',
    ],
  },
];
