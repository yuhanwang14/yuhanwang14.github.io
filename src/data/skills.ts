// src/data/skills.ts
export interface SkillGroup {
  name: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    name: 'Programming Languages',
    items: ['Python', 'Java', 'C++', 'C', 'TypeScript', 'Go', 'Rust', 'SQL', 'Haskell', 'Scala', 'Kotlin', 'Ruby', 'Shell'],
  },
  {
    name: 'Frameworks & Infrastructure',
    items: ['React.js', 'gRPC', 'PostgreSQL', 'Flutter', 'Docker', 'Git', 'Linux', 'LangGraph', 'Pydantic'],
  },
  {
    name: 'Deep Learning & Machine Learning',
    items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'Transformers', 'OpenCV', 'XGBoost', 'MLOps', 'Detectron2'],
  },
  {
    name: 'Tools & Technologies',
    items: ['Docker', 'Git', 'Jupyter Notebook', 'PostgreSQL', 'AWS', 'Azure', 'Claude Code', 'Obsidian'],
  },
  {
    name: 'Languages',
    items: ['Mandarin Chinese (Native)', 'English (Bilingual)'],
  },
];
