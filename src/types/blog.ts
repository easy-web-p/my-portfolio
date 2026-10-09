export type BlogCategorySlug =
  | 'ai-ml'
  | 'nodejs-backend'
  | 'frontend'
  | 'design'
  | 'tutorials'
  | 'case-studies'
  | 'career';

export interface BlogCategory {
  slug: BlogCategorySlug;
  name: string;
  title: string;
  description: string;
  icon: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'ai-ml',
    name: 'AI & Machine Learning',
    title: 'AI & Machine Learning',
    description: 'Practical guides on small models, diffusion vectors, and LLM fine-tuning.',
    icon: 'psychology',
  },
  {
    slug: 'nodejs-backend',
    name: 'Node.js & Backend',
    title: 'Node.js & Backend',
    description: 'High-throughput APIs, authentication, microservices, and TypeScript schemas.',
    icon: 'dns',
  },
  {
    slug: 'frontend',
    name: 'Frontend Development',
    title: 'Frontend Development',
    description: 'Next.js App Router, Tailwind tricks, WebGPU, and 60fps animations.',
    icon: 'terminal',
  },
  {
    slug: 'design',
    name: 'UI/UX & Design',
    title: 'UI/UX & Design',
    description: 'Tactile design systems, Swiss grids, token management, and haptic feedback.',
    icon: 'palette',
  },
  {
    slug: 'tutorials',
    name: 'Tutorials',
    title: 'Tutorials',
    description: 'Step-by-step code-along guides for production-ready apps.',
    icon: 'menu_book',
  },
  {
    slug: 'case-studies',
    name: 'Case Studies',
    title: 'Case Studies',
    description: 'Architecture teardowns and retrospective logs of real-world products.',
    icon: 'folder_special',
  },
  {
    slug: 'career',
    name: 'Career & Learning',
    title: 'Career & Learning',
    description: 'Philosophy, workflow optimizations, and surviving the AI wave.',
    icon: 'hiking',
  },
];

export interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  category: BlogCategorySlug;
  tags: string[];
  coverImage?: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  relatedProductSlug?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
