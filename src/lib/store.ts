import { StoreProduct, LICENSE_OPTIONS, LicenseType } from '@/types/store';

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'prod-ai-chat',
    title: 'AI Chat Starter Kit',
    slug: 'ai-chat-starter-kit',
    description: 'Production-ready conversational streaming AI template with WebSockets, local vector embeddings, and multi-model fallbacks.',
    price: 990,
    category: 'ai',
    framework: 'Next.js',
    rating: 4.9,
    reviewCount: 38,
    badge: 'AI POWERED',
    demoUrl: 'https://example.com/demo/ai-chat',
    githubUrl: 'https://github.com/easy-web-p/ai-chat-starter',
    fileKey: 'ai-chat-starter-kit-v2.1.zip',
    fileSize: '18.4 MB',
    version: '2.1.0',
    features: [
      'Multi-provider LLM routing (OpenAI, Claude, DeepSeek, Local Ollama)',
      'Real-time token streaming with sub-20ms first-token latency',
      'Client-side vector search and retrieval-augmented generation (RAG)',
      'Markdown and KaTeX code rendering with instant syntax highlighting',
      'Mobile-optimized drawer UI with haptic button responses',
    ],
    included: [
      'Full TypeScript source code (Next.js App Router & Node.js API)',
      'Tailwind CSS design system tokens with light/dark theme',
      'Step-by-step setup documentation (PDF & Markdown)',
      'Docker Compose file for self-hosted local model runner',
      'Free updates for 12 months',
    ],
    techStack: ['Next.js 15', 'Node.js', 'TypeScript', 'Tailwind CSS', 'LangChain', 'Zod'],
    targetAudience: [
      'Developers wanting to integrate AI into existing apps without vendor lock-in',
      'Indie hackers building AI SaaS products',
      'Agencies prototyping client copilots in under 2 hours',
    ],
    installation: [
      'git clone <repository-url> && cd ai-chat-starter-kit',
      'npm install',
      'cp .env.example .env.local (Add your API keys)',
      'npm run dev',
    ],
    changelog: [
      { version: '2.1.0', date: 'Feb 2026', notes: 'Added DeepSeek-R1 reasoning model integration and WebGPU local fallback.' },
      { version: '2.0.0', date: 'Jan 2026', notes: 'Migrated to Next.js 15 Turbopack and enhanced mobile touch drawer.' },
    ],
    image: '/images/products/ai-chat.png',
  },
  {
    id: 'prod-bento-pro',
    title: 'Bento Portfolio Pro Template',
    slug: 'bento-portfolio-pro',
    description: 'The exact high-end, tactile Bento Grid portfolio engine powering PhisitCode with interactive neural links and dark mode.',
    price: 790,
    category: 'templates',
    framework: 'Next.js',
    rating: 5.0,
    reviewCount: 52,
    badge: 'NEW DROP',
    demoUrl: 'https://example.com/demo/bento-pro',
    githubUrl: 'https://github.com/easy-web-p/bento-pro',
    fileKey: 'bento-portfolio-pro-v1.4.zip',
    fileSize: '12.8 MB',
    version: '1.4.0',
    features: [
      'Tactile neo-brutalist bento grid layout with custom spring animations',
      'Interactive SVG neural canvas with draggable, bouncy skill nodes',
      'Smooth-scrolling bottom mobile dock with safe-area notch support',
      'Integrated MDX blogging engine and project case study templates',
      '100/100 Google Lighthouse audit score for SEO and accessibility',
    ],
    included: [
      'Complete Next.js App Router codebase with Tailwind config',
      'Figma source file with auto-layout tokens and color variables',
      'Production deployment guide for Vercel, Node.js, and VPS',
      'Commercial license for freelance and agency client projects',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MDX'],
    targetAudience: [
      'Design Engineers & Creative Technologists who want to wow recruiters',
      'Freelance Web Developers seeking premium client templates',
      'Founders needing an unforgettable personal brand landing page',
    ],
    installation: [
      'unzip bento-portfolio-pro.zip',
      'npm install',
      'Update content in src/content/projects/',
      'npm run build',
    ],
    changelog: [
      { version: '1.4.0', date: 'Feb 2026', notes: 'Added interactive mobile bottom navigation bar and touch improvements.' },
    ],
    image: '/images/products/bento-pro.png',
  },
  {
    id: 'prod-webgpu-shaders',
    title: 'WebGPU Shader Micro-Interactions',
    slug: 'webgpu-shader-micro-interactions',
    description: 'A curated library of 18 organic, 60fps WebGPU and GLSL canvas shaders for high-end web experiences.',
    price: 590,
    category: 'components',
    framework: 'WebGL',
    rating: 4.8,
    reviewCount: 29,
    badge: 'PRO TOOL',
    demoUrl: 'https://example.com/demo/shaders',
    githubUrl: 'https://github.com/easy-web-p/webgpu-shaders',
    fileKey: 'webgpu-shaders-pack-v1.2.zip',
    fileSize: '8.2 MB',
    version: '1.2.0',
    features: [
      '18 standalone shader components ready for React, Vue, or Vanilla JS',
      'Zero external dependencies—raw WGSL and WebGL2 shaders',
      'Mouse & gyroscope reactive displacement fields',
      'Automatic CPU fallback for older devices without WebGPU',
      'Under 15KB gzipped footprint per effect',
    ],
    included: [
      'React component wrappers with customizable props (speed, noise, palette)',
      'Live interactive playground sandbox',
      'WGSL shader source files with detailed comments',
    ],
    techStack: ['WebGPU', 'WebGL2', 'TypeScript', 'GLSL', 'Canvas API'],
    targetAudience: [
      'Creative developers building award-winning Awwwards/FWA sites',
      'Design systems teams wanting to introduce organic motion',
    ],
    installation: [
      'npm install @playful/shaders (or copy components directly)',
      'import { FluidCanvas } from "@/components/shaders/FluidCanvas"',
    ],
    changelog: [
      { version: '1.2.0', date: 'Jan 2026', notes: 'Added audio-reactive FFT frequency uniform inputs.' },
    ],
    image: '/images/products/webgpu-shaders.png',
  },
  {
    id: 'prod-nodejs-api',
    title: 'Production Node.js REST API Starter',
    slug: 'production-nodejs-rest-api-starter',
    description: 'Enterprise-grade Node.js backend boilerplate with TypeScript, Zod validation, JWT auth, rate limiting, and Prisma ORM.',
    price: 690,
    category: 'apis',
    framework: 'Node.js',
    rating: 4.9,
    reviewCount: 44,
    badge: 'UPDATED',
    demoUrl: 'https://example.com/demo/api-swagger',
    githubUrl: 'https://github.com/easy-web-p/nodejs-starter',
    fileKey: 'nodejs-api-starter-v3.0.zip',
    fileSize: '6.5 MB',
    version: '3.0.0',
    features: [
      'Structured Layered Architecture (Controllers, Services, Repositories)',
      'End-to-end request validation with Zod schemas and automatic type inference',
      'JWT Authentication with refresh token rotation and cookie storage',
      'PostgreSQL & SQLite dual-mode support via Prisma ORM',
      'Docker Compose setup with Redis caching and Winston logging',
    ],
    included: [
      'Full TypeScript backend codebase',
      'Postman & OpenAPI Swagger documentation collection',
      'Pre-written Jest integration test suite with 85% coverage',
      'GitHub Actions CI/CD deployment workflow',
    ],
    techStack: ['Node.js', 'Express', 'TypeScript', 'Prisma', 'Zod', 'Jest'],
    targetAudience: [
      'Developers building backends for mobile apps and web platforms',
      'Teams wanting battle-tested security standards from day one',
    ],
    installation: [
      'npm install',
      'npx prisma migrate dev',
      'npm run test',
      'npm run dev',
    ],
    changelog: [
      { version: '3.0.0', date: 'Feb 2026', notes: 'Upgraded to Express 5 and Prisma 6 with strict schema validations.' },
    ],
    image: '/images/products/nodejs-api.png',
  },
  {
    id: 'prod-haptics-free',
    title: 'Tactile Haptic Component Pack',
    slug: 'tactile-haptic-component-pack',
    description: 'Free open-source tactile UI kit with simulated spring physics, sound synthesis, and mobile vibration feedback.',
    price: 0,
    category: 'free',
    framework: 'React',
    rating: 4.9,
    reviewCount: 88,
    badge: 'FREE',
    demoUrl: 'https://example.com/demo/haptics',
    githubUrl: 'https://github.com/easy-web-p/tactile-haptics',
    fileKey: 'tactile-haptics-v1.0.zip',
    fileSize: '3.1 MB',
    version: '1.0.0',
    features: [
      'Vibration API triggers calibrated for subtle tactile clicks',
      'Web Audio synthesized button tick and thud micro-sounds',
      'Active CSS spring physics transforms without heavy animation libraries',
      'Accessible focus rings and full screen-reader compliance',
    ],
    included: [
      'React component source code',
      'Sound effect assets in .mp3 and .wav format',
      'MIT Open Source License for all uses',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
    targetAudience: [
      'Anyone looking to give their web apps a punchy, tactile physical sensation',
    ],
    installation: [
      'npm install @playful/haptics',
      'import { useHaptic } from "@/lib/haptics"',
    ],
    changelog: [
      { version: '1.0.0', date: 'Jan 2026', notes: 'Initial public release.' },
    ],
    image: '/images/products/haptics-free.png',
  },
];

export function getAllStoreProducts(): StoreProduct[] {
  return STORE_PRODUCTS;
}

export function getStoreProductBySlug(slug: string): StoreProduct | null {
  return STORE_PRODUCTS.find((p) => p.slug === slug) || null;
}

export function getFeaturedStoreProducts(): StoreProduct[] {
  return STORE_PRODUCTS.filter((p) => p.badge === 'NEW DROP' || p.badge === 'AI POWERED');
}

export function calculateProductPrice(basePrice: number, license: LicenseType): number {
  const option = LICENSE_OPTIONS.find((l) => l.id === license);
  if (!option) return basePrice;
  if (basePrice === 0) return 0;
  return Math.round(basePrice * option.multiplier);
}
