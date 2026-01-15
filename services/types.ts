export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;     // Untuk Live Demo
  githubUrl?: string; // Untuk Source Code (GitHub)
  status: 'completed' | 'in-progress' | 'concept';
}

export interface Skill {
  category: string;
  items: string[];
  icon: string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  exif?: string;
  orientation?: 'portrait' | 'landscape' | 'square';
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  bio1: string;
  bio2: string;
  experience: string;
  availability: string;
  heroText: string; // For the terminal typing effect
  avatarUrl: string;
  socials: {
    github: string;
    instagram: string;
  }
}

export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'photography' | 'contact';