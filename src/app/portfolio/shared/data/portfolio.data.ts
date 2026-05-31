import {
  NavLink,
  Profile,
  Project,
  ProjectFilter,
  Skill,
  SocialLink,
  Stat,
  TimelineItem
} from '../models/portfolio.models';
import { portfolioAssets } from './portfolio.assets';

export const profile: Profile = {
  name: 'Ahmad Hassan',
  shortName: 'AH',
  role: 'Full Stack Developer',
  stackLine: 'Angular • Node.js • Express • MongoDB • MySQL • AWS',
  tagline:
    'I build scalable web applications and AI-powered products with clean UI, strong backend logic, and production-ready architecture.',
  summary:
    'Computer Science graduate from the University of Central Punjab, Lahore. I focus on Angular, Node.js, Express, MongoDB, MySQL, AWS, and practical AI integrations that turn ideas into polished recruiter-ready products.',
  email: 'ahmaddhariwal023@gmail.com',
  phone: '+92 312 1234567',
  location: 'Lahore, Pakistan',
  education: 'BS Computer Science',
  university: 'University of Central Punjab, Lahore',
  educationYears: '2021 - 2025',
  cgpa: '3.1 / 4.0',
  availability: 'Internship / Junior Full Stack / Freelance',
  githubLabel: 'ahmaddhariwal',
  github: 'https://github.com/ahmaddhariwal',
  linkedin: 'https://www.linkedin.com/in/ahmadhassan023',
  resumeUrl: portfolioAssets.resume,
  portrait: {
    src: portfolioAssets.profilePhoto,
    alt: 'Portrait of Ahmad Hassan'
  },
  heroVideo: portfolioAssets.videos.heroBackground,
  educationVisual: {
    src: portfolioAssets.education.degreeVisual,
    alt: 'University degree illustration'
  }
};

export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
];

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', icon: portfolioAssets.icons.social.github, href: profile.github },
  { label: 'LinkedIn', icon: portfolioAssets.icons.social.linkedin, href: profile.linkedin },
  {
    label: 'Gmail',
    icon: portfolioAssets.icons.social.mail,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`
  }
];

export const heroStack = ['Angular', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'AWS'];

export const stats: Stat[] = [
  { icon: portfolioAssets.icons.ui.code, value: '2+', label: 'Years Learning & Building' },
  { icon: portfolioAssets.icons.ui.briefcase, value: '10+', label: 'Projects Completed' },
  { icon: portfolioAssets.icons.ui.spark, value: '2', label: 'Major AI Projects' },
  { icon: portfolioAssets.icons.ui.heart, value: '100%', label: 'Full Stack Focus' }
];

export const aboutRows = [
  { label: 'Location', value: profile.location },
  { label: 'Email', value: profile.email },
  { label: 'Availability', value: profile.availability },
  { label: 'CGPA', value: profile.cgpa }
];

export const projectFilters: ProjectFilter[] = ['All', 'Full Stack', 'AI/ML', 'Frontend', 'Backend'];

export const projects: Project[] = [
  {
    title: 'DevInsight AI',
    subtitle: 'Developer Portfolio Analyzer',
    description:
      'AI-powered platform that analyzes portfolios, GitHub profiles, resumes, skill gaps, job readiness, recruiter signals, and career recommendations.',
    featured: true,
    filters: ['All', 'Full Stack', 'AI/ML', 'Backend'],
    image: {
      src: portfolioAssets.projects.devInsight,
      alt: 'DevInsight AI dashboard preview'
    },
    tech: ['Angular', 'Node.js', 'Express', 'MongoDB', 'JWT', 'AI APIs'],
    highlights: ['GitHub analysis', 'Resume analyzer', 'Recruiter dashboard', 'Career recommendations'],
    links: [
      { label: 'Case Study', href: '#projects', primary: true },
      { label: 'GitHub', href: profile.github },
      { label: 'Live Demo', href: '#contact' }
    ]
  },
  {
    title: 'Deal-Docks AI Classified',
    subtitle: 'AI Listing Platform',
    description:
      'AI classified product listing app with product recognition, Gemini title generation, smart pricing suggestions, Firebase auth, and Flask services.',
    featured: true,
    filters: ['All', 'Full Stack', 'AI/ML', 'Frontend'],
    image: {
      src: portfolioAssets.projects.dealDocks,
      alt: 'Deal-Docks AI listing platform preview'
    },
    tech: ['React', 'Flask', 'Firebase', 'MongoDB', 'Gemini API', 'YOLO'],
    highlights: ['Image recognition', 'Smart descriptions', 'Secure auth', 'Product listing system'],
    links: [
      { label: 'Case Study', href: '#projects', primary: true },
      { label: 'GitHub', href: profile.github },
      { label: 'Live Demo', href: '#contact' }
    ]
  },
  {
    title: 'Recipe Finder',
    description:
      'Responsive recipe discovery interface with search flows, category browsing, clean cards, and API-backed content states.',
    featured: false,
    filters: ['All', 'Frontend'],
    image: {
      src: portfolioAssets.projects.recipeFinder,
      alt: 'Recipe Finder website preview'
    },
    tech: ['Angular', 'TypeScript', 'REST API'],
    highlights: ['Search UI', 'Categories', 'Responsive layout'],
    links: [
      { label: 'Live Demo', href: '#contact', primary: true },
      { label: 'GitHub', href: profile.github }
    ]
  },
  {
    title: 'Password Strength Checker',
    description:
      'Security-focused utility that visualizes password strength, feedback rules, and progressive scoring in a compact UI.',
    featured: false,
    filters: ['All', 'Frontend'],
    image: {
      src: portfolioAssets.projects.passwordChecker,
      alt: 'Password Strength Checker preview'
    },
    tech: ['JavaScript', 'CSS', 'Accessibility'],
    highlights: ['Live scoring', 'Feedback rules', 'Input states'],
    links: [
      { label: 'Live Demo', href: '#contact', primary: true },
      { label: 'GitHub', href: profile.github }
    ]
  },
  {
    title: 'Personal Portfolio',
    description:
      'Premium Angular portfolio with 3D hero scene, reusable content data, polished glass cards, and responsive sections.',
    featured: false,
    filters: ['All', 'Frontend', 'Full Stack'],
    image: {
      src: portfolioAssets.projects.portfolio,
      alt: 'Personal portfolio preview'
    },
    tech: ['Angular', 'Three.js', 'GSAP', 'SCSS'],
    highlights: ['3D hero', 'Responsive sections', 'Data-driven content'],
    links: [
      { label: 'Live Demo', href: '#home', primary: true },
      { label: 'GitHub', href: profile.github }
    ]
  }
];

export const skills: Skill[] = [
  { name: 'Angular', icon: './icons/tech/angular.svg', accent: '#f43f5e', category: 'Frontend' },
  { name: 'TypeScript', icon: './icons/tech/typescript.svg', accent: '#38bdf8', category: 'Frontend' },
  { name: 'JavaScript', icon: './icons/tech/javascript.svg', accent: '#facc15', category: 'Frontend' },
  { name: 'Node.js', icon: './icons/tech/node.svg', accent: '#7ddc52', category: 'Backend' },
  { name: 'Express.js', icon: './icons/tech/express.svg', accent: '#cbd5e1', category: 'Backend' },
  { name: 'MongoDB', icon: './icons/tech/mongodb.svg', accent: '#34d399', category: 'Database' },
  { name: 'MySQL', icon: './icons/tech/mysql.svg', accent: '#60a5fa', category: 'Database' },
  { name: 'AWS', icon: './icons/tech/aws.svg', accent: '#ffb347', category: 'Cloud' },
  { name: 'GitHub', icon: './icons/tech/github.svg', accent: '#f8fafc', category: 'Tools' },
  { name: 'Docker', icon: './icons/tech/docker.svg', accent: '#22d3ee', category: 'Tools' }
];

export const timeline: TimelineItem[] = [
  {
    period: '2024 - Present',
    title: 'Full Stack Developer Intern',
    company: 'Product-focused full stack work',
    description:
      'Working on full stack web applications using Angular, Node.js, APIs, databases, and AWS-backed backend learning.'
  },
  {
    period: '2023 - 2024',
    title: 'Backend / Full Stack Projects',
    company: 'Personal and academic builds',
    description:
      'Built REST APIs, authentication flows, MongoDB/MySQL integrations, and production-style project structures.'
  },
  {
    period: '2022 - 2023',
    title: 'Freelance / Personal Projects',
    company: 'Independent product practice',
    description:
      'Created responsive web apps, AI-powered tools, and portfolio projects for real-world learning and showcasing.'
  }
];
