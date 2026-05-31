export type ProjectFilter = 'All' | 'Full Stack' | 'AI/ML' | 'Frontend' | 'Backend';

export interface NavLink {
  id: string;
  label: string;
}

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  stackLine: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  university: string;
  educationYears: string;
  cgpa: string;
  availability: string;
  githubLabel: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  portrait: ImageAsset;
  heroVideo: string;
  educationVisual: ImageAsset;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface SocialLink {
  label: string;
  icon: string;
  href: string;
}

export interface Stat {
  icon: string;
  value: string;
  label: string;
}

export interface Project {
  title: string;
  subtitle?: string;
  description: string;
  featured: boolean;
  filters: ProjectFilter[];
  image: ImageAsset;
  tech: string[];
  highlights: string[];
  links: {
    label: string;
    href: string;
    primary?: boolean;
  }[];
}

export interface Skill {
  name: string;
  icon: string;
  accent: string;
  category: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  company: string;
  description: string;
}
