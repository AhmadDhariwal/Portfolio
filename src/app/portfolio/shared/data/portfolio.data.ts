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
  availability: 'Open',
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
  { icon: portfolioAssets.icons.ui.briefcase, value: '5+', label: 'Projects Completed' },
  { icon: portfolioAssets.icons.ui.spark, value: '1', label: 'Major AI Projects' },
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
      'AI-powered platform that analyzes developer portfolios, GitHub profiles, resumes, and technical skills — with recruiter dashboards, skill-gap identification, and personalized career recommendations.',
    featured: true,
    filters: ['All', 'Full Stack', 'AI/ML', 'Backend'],
    image: {
      src: portfolioAssets.projects.devInsight,
      alt: 'DevInsight AI dashboard preview'
    },
    tech: ['Angular', 'Node.js', 'Express', 'MongoDB', 'JWT', 'GitHub API'],
    highlights: ['GitHub repo analysis', 'Skill-gap identification', 'Recruiter dashboard', 'Career recommendations'],
    links: [
      { label: 'Case Study', href: '#projects', primary: true },
      { label: 'GitHub', href: profile.github },
      { label: 'Live Demo', href: '#contact' }
    ]
  },
  {
    title: 'Inventory Management System',
    subtitle: 'Full Stack Inventory Tracker',
    description:
      'Full-stack inventory management app for tracking products, suppliers, stock movements, and purchase orders — with dashboard analytics, role-based access control, and automated tracking workflows.',
    featured: true,
    filters: ['All', 'Full Stack', 'Backend'],
    image: {
      src: portfolioAssets.projects.recipeFinder,
      alt: 'Inventory Management System preview'
    },
    tech: ['Angular', 'Node.js', 'Express.js', 'MongoDB'],
    highlights: ['CRUD & filtering', 'Role-based access', 'Dashboard analytics', 'Optimized REST APIs'],
    links: [
      { label: 'Case Study', href: '#projects', primary: true },
      { label: 'GitHub', href: profile.github }
    ]
  },
  {
    title: 'E-Commerce Platform',
    subtitle: 'Full Stack Shop',
    description:
      'Full-featured e-commerce platform with product catalog, shopping cart, JWT authentication, order management, and category-based navigation — optimized for desktop and mobile.',
    featured: false,
    filters: ['All', 'Full Stack', 'Backend'],
    image: {
      src: portfolioAssets.projects.passwordChecker,
      alt: 'E-Commerce Platform preview'
    },
    tech: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    highlights: ['Product catalog', 'Cart & orders', 'Secure auth', 'Responsive UI'],
    links: [
      { label: 'Case Study', href: '#projects', primary: true },
      { label: 'GitHub', href: profile.github }
    ]
  },
  {
    title: 'Deal-Docks AI Classified',
    subtitle: 'AI Listing Platform',
    description:
      'AI-powered classified marketplace with YOLO-based product recognition (90%+ accuracy), Gemini-generated titles and descriptions, dynamic pricing recommendations, and secure Firebase auth.',
    featured: true,
    filters: ['All', 'Full Stack', 'AI/ML', 'Frontend'],
    image: {
      src: portfolioAssets.projects.dealDocks,
      alt: 'Deal-Docks AI listing platform preview'
    },
    tech: ['React', 'Flask', 'Firebase', 'Gemini API', 'YOLO', 'Roboflow'],
    highlights: ['90%+ detection accuracy', 'AI-generated listings', 'Dynamic pricing', 'Secure auth'],
    links: [
      { label: 'Case Study', href: '#projects', primary: true },
      { label: 'GitHub', href: profile.github },
      { label: 'Live Demo', href: '#contact' }
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
  { name: 'Docker', icon: './icons/tech/docker.svg', accent: '#22d3ee', category: 'Tools' },
  { name: 'Postman', icon: './icons/tech/postman.svg', accent: '#FF6C37', category: 'Tools' },
  { name: 'Jira', icon: './icons/tech/jira.svg', accent: '#2684FF', category: 'Tools' }
];

export const timeline: TimelineItem[] = [
  {
    period: 'March 2026 – Present',
    title: 'Associate Software Engineer',
    company: 'iCommunix',
    description:
      'Building full-stack web apps with Angular, Node.js, Express.js, MongoDB, MySQL, and AWS. Developing scalable APIs, reusable components, and responsive UIs while collaborating in Agile sprints and contributing to enterprise communication solutions.Work with AWS services including Lambda, API Gateway, S3, and connect for cloud-based application development.Optimize application performance, maintain code quality, and participate in code reviews.'
  },
  {
    period: 'Nov 2025 – Feb 2026',
    title: 'Full Stack Developer Intern',
    company: 'iCommunix',
    description:
      'Assisted in the development of full-stack applications using Angular and Node.js. Implemented frontend features, API integrations, and database operations. Worked with MongoDB and MySQL databases for data modeling and management. Gained hands-on experience with AWS cloud services and serverless architectures. Participated in sprint planning, bug fixing, testing, and feature deployments.'
  },
  {
    period: '2022 - 2025',
    title: 'Freelance / Personal Projects',
    company: 'Independent product practice',
    description:
      'Created responsive web apps, AI-powered tools, and portfolio projects for real-world learning and showcasing.'
  }
];
