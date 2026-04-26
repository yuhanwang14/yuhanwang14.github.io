// src/data/publications.ts
import type { ImageMetadata } from 'astro';
import page4d from '../assets/images/publications/PAGE-4D.gif';

export interface Publication {
  badge: string;
  title: string;
  authorsHtml: string;
  href: string;
  paperHref?: string;
  image: ImageMetadata;
}

export const publications: Publication[] = [
  {
    badge: 'ICLR 2026',
    title: 'PAGE-4D: Disentangled Pose and Geometry Estimation for 4D Perception',
    authorsHtml:
      'Kaichen Zhou, <strong>Yuhan Wang</strong>, Grace Chen, Xinhai Chang, Gaspard Beaudouin, Fangneng Zhan, Paul Pu Liang, Mengyu Wang.',
    href: 'https://page-4d.github.io/anonymous-submission/',
    paperHref: 'https://arxiv.org/pdf/2510.17568',
    image: page4d,
  },
];
