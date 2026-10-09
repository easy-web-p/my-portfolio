export interface ProjectMeta {
  title: string;
  slug: string;
  description: string;
  category: 'AI / ML' | 'Creative Tech' | 'Product Design' | 'Fullstack';
  technologies: string[];
  image: string;
  featured: boolean;
  year: string;
  role: string;
  client?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Project extends ProjectMeta {
  content: string;
  overview?: string;
  problem?: string;
  solution?: string;
  results?: string[];
  metrics?: { label: string; value: string }[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
  badge: string;
}
