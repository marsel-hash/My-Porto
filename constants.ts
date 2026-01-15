import { Project, Skill, Photo, SectionId, Profile } from './types';

export const NAV_ITEMS: { id: SectionId; label: string; command: string }[] = [
  { id: 'home', label: 'Home', command: 'cd ~' },
  { id: 'about', label: 'About', command: 'cat about.md' },
  { id: 'skills', label: 'Skills', command: 'ls -la ./skills' },
  { id: 'projects', label: 'Projects', command: './run_projects.sh' },
  { id: 'photography', label: 'Gallery', command: 'open ./photos' },
  { id: 'contact', label: 'Contact', command: 'ssh user@contact' },
];

export const PROFILE: Profile = {
  name: "Marsel",
  title: "Web Developer",
  location: "Indonesia, [REDACTED]", 
  email: "musa@encrypted.net",
  bio1: "Initiated sequence at age 14. By 15, I was navigating the system using Termux and executing external scripts. I started as a script user, curious about the mechanics beneath the surface.",
  bio2: "Evolution occurred at 16 when I stopped running scripts and started writing them. Now at 17, I architect full-scale web solutions and deploy my own projects. From script-kiddie to Creator.",
  experience: "Lvl. 17",
  availability: "Encrypted",
  heroText: "Identity: Marsel. Status: Online.", 
  avatarUrl: "/1.jpg",
  socials: {
    // GANTI LINK DI BAWAH INI DENGAN LINK GITHUB & INSTAGRAM KAMU
    github: "https://github.com/marsel-hash", 
    instagram: "https://instagram.com/kazunji_"
  }
};

// URL Repository untuk website ini (Ganti jika kamu sudah buat repo sendiri)
export const SITE_REPO = "https://github.com/marsel-hash/portfolio-web";

export const PROJECTS: Project[] = [
  {
    id: '5',
    title: 'Infect',
    description: 'A specialized system automation framework designed for rapid payload delivery simulation. Features advanced footprint minimization and multi-platform deployment logic for security research.',
    tags: ['Python', 'Security', 'Automation', 'Payload'],
    status: 'completed',
    githubUrl: 'https://github.com/marsel-hash/infect'
  },
  {
    id: '1',
    title: 'Fanxiety Tool v2',
    description: 'An advanced CLI utility for stress testing and API analysis. Optimized for speed and efficiency over the legacy version.',
    tags: ['Python', 'CLI', 'API Testing'],
    status: 'completed',
    githubUrl: 'https://github.com/marsel-hash/Fanxiety-Toolv2'
  },
  {
    id: '2',
    title: 'Web Backdoor POC',
    description: 'A Proof of Concept (POC) web shell script designed for educational purposes and server vulnerability assessment/penetration testing.',
    tags: ['PHP', 'Security', 'Shell'],
    status: 'completed',
    githubUrl: 'https://github.com/marsel-hash/Backdoor-for-website'
  },
  {
    id: '3',
    title: 'Fanxiety Tool Legacy',
    description: 'The first iteration of the Fanxiety toolkit. A foundational script for network diagnostics and testing.',
    tags: ['Python', 'Scripting'],
    status: 'completed',
    githubUrl: 'https://github.com/marsel-hash/Fanxiety-Tool'
  },
  {
    id: '4',
    title: 'Love Calculator',
    description: 'A logic-based Python algorithm that calculates compatibility percentages based on string input matching patterns.',
    tags: ['Python', 'Algorithm', 'Logic'],
    status: 'completed',
    githubUrl: 'https://github.com/marsel-hash/love-calculator'
  }
];

export const SKILLS: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind', 'Next.js', 'Framer Motion'],
    icon: 'layout'
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'GraphQL'],
    icon: 'server'
  },
  {
    category: 'DevOps',
    items: ['Docker', 'AWS', 'CI/CD', 'Linux', 'Termux'],
    icon: 'container'
  },
  {
    category: 'Creative',
    items: ['Photography', 'Lightroom', 'UI/UX Design', 'Blender'],
    icon: 'camera'
  }
];

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    url: 'https://picsum.photos/800/600?random=1',
    caption: 'Neon Nights',
    exif: 'Sony A7III • 35mm • f/1.4',
    orientation: 'landscape'
  },
  {
    id: 'p2',
    url: 'https://picsum.photos/800/1200?random=2',
    caption: 'Urban Solitude',
    exif: 'Fujifilm X-T4 • 23mm • f/2.0',
    orientation: 'portrait'
  },
  {
    id: 'p3',
    url: 'https://picsum.photos/800/600?random=3',
    caption: 'Mountain Haze',
    exif: 'Canon R5 • 85mm • f/1.2',
    orientation: 'landscape'
  },
  {
    id: 'p4',
    url: 'https://picsum.photos/800/1200?random=4',
    caption: 'Cyberpunk Alley',
    exif: 'Sony A7III • 50mm • f/1.8',
    orientation: 'portrait'
  },
  {
    id: 'p5',
    url: 'https://picsum.photos/800/800?random=5',
    caption: 'Code & Coffee',
    exif: 'iPhone 14 Pro',
    orientation: 'square'
  },
  {
    id: 'p6',
    url: 'https://picsum.photos/1200/800?random=6',
    caption: 'Horizon Line',
    exif: 'Drone • f/2.8',
    orientation: 'landscape'
  },
  {
    id: 'p7',
    url: 'https://picsum.photos/800/1200?random=7',
    caption: 'Glass Reflections',
    exif: 'Canon R6 • 50mm • f/1.8',
    orientation: 'portrait'
  },
  {
    id: 'p8',
    url: 'https://picsum.photos/800/600?random=8',
    caption: 'Midnight Drive',
    exif: 'Sony A7SIII • 24mm • f/1.4',
    orientation: 'landscape'
  },
  {
    id: 'p9',
    url: 'https://picsum.photos/800/800?random=9',
    caption: 'Workspace Minimal',
    exif: 'Fujifilm X100V',
    orientation: 'square'
  }
];