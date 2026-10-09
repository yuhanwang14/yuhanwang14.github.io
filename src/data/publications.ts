// src/data/publications.ts
// Each entry can show a short muted loop made from the paper's own results
// (public/publications/); without one, the page shows a board with the venue.

export interface PublicationMedia {
  /** Muted, looping clip served from /public. */
  video: string;
  /** Still frame shown before the clip loads and for reduced motion. */
  poster: string;
  width: number;
  height: number;
  /** One line under the figure saying what the loop shows. */
  caption?: string;
}

export interface Publication {
  badge: string;
  title: string;
  authorsHtml: string;
  href: string;
  paperHref?: string;
  /** Copied by the BibTeX button; keep its title and authors in line with the fields above. */
  bibtex?: string;
  media?: PublicationMedia;
}

export const publications: Publication[] = [
  {
    badge: 'ICLR 2026',
    title: 'PAGE-4D: Disentangled Pose and Geometry Estimation for 4D Perception',
    authorsHtml:
      'Kaichen Zhou, <strong>Yuhan Wang</strong>, Grace Chen, Xinhai Chang, Gaspard Beaudouin, Fangneng Zhan, Paul Pu Liang, Mengyu Wang.',
    href: 'https://page4d.github.io/',
    paperHref: 'https://arxiv.org/pdf/2510.17568',
    bibtex: `@inproceedings{zhou2026page,
  title={PAGE-4D: Disentangled Pose and Geometry Estimation for 4D Perception},
  author={Zhou, Kaichen and Wang, Yuhan and Chen, Grace and Chang, Xinhai and Beaudouin, Gaspard and Zhan, Fangneng and Liang, Paul Pu and Wang, Mengyu},
  booktitle={International Conference on Learning Representations (ICLR)},
  pages={36401--36414},
  year={2026},
  url={https://proceedings.iclr.cc/paper_files/paper/2026/hash/3d55170799265c03b37993e02b71b2cc-Abstract-Conference.html}
}`,
    // From the PAGE-4D teaser: one street video of a taxi, reconstructed as a point cloud.
    // The row of taxis is the same car at successive moments.
    media: {
      video: '/publications/page4d-recon.mp4',
      poster: '/publications/page4d-recon-poster.webp',
      width: 608,
      height: 342,
      caption: 'From one street video, PAGE-4D recovers the camera path and a 4D point cloud. The row of taxis is one car over time.',
    },
  },
];
