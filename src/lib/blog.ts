import { BlogPostMeta, BlogPost, BlogCategorySlug, BLOG_CATEGORIES } from '@/types/blog';

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Building Production-Grade Node.js APIs with TypeScript & Zod',
    slug: 'building-nodejs-apis-typescript',
    description: 'Learn how to architect a bulletproof Node.js backend with automated request validation, layered error handling, and Prisma ORM integration.',
    date: '2026-02-28',
    category: 'nodejs-backend',
    tags: ['Node.js', 'TypeScript', 'Zod', 'Prisma', 'API Design'],
    coverImage: '/images/blog/nodejs-architecture.png',
    readTime: '7 min read',
    author: {
      name: 'Phisit Kaewkulphisit',
      role: 'Software Developer & AI Creator',
      avatar: '/images/profile/avatar.png',
    },
    relatedProductSlug: 'production-nodejs-rest-api-starter',
    content: `
## Why TypeScript + Zod is the Modern Standard

Building REST APIs in JavaScript without runtime validation is like driving without seatbelts. While TypeScript guarantees compile-time correctness, runtime payloads coming from mobile apps or webhooks can easily bypass static typings.

This is where **Zod** transforms backend ergonomics:
\`\`\`typescript
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50),
  role: z.enum(['CUSTOMER', 'ADMIN']).default('CUSTOMER'),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
\`\`\`

## Layered Architecture Principles

To build backends that scale without turning into spaghetti code, we recommend a strict 3-tier structure:
1. **Controllers**: Parse HTTP requests, trigger validation schemas, and return standardized JSON envelopes.
2. **Services**: Contain pure business logic and transaction management.
3. **Repositories / ORM**: Database queries executed via Prisma.

### Error Handling Middleware
Never let unhandled promise rejections crash your production process:
\`\`\`typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({ error: 'Validation Failed', details: err.errors });
  }
  res.status(500).json({ error: 'Internal Server Error' });
});
\`\`\`

## Want to Skip the Boilerplate?
If you're launching a project this week, inspect our **Production Node.js REST API Starter Kit** in the Code Store. It includes authentication, Redis caching, and Docker Compose already configured.
`,
  },
  {
    title: 'Zero-Latency Small Language Models on Mobile WebGPU',
    slug: 'zero-latency-slm-webgpu',
    description: 'Running quantized 3.8B models locally in mobile Safari and Chrome without server roundtrips using WebLLM and ONNX.',
    date: '2026-02-18',
    category: 'ai-ml',
    tags: ['WebGPU', 'Local AI', 'Phi-3', 'WebLLM', 'Performance'],
    coverImage: '/images/blog/webgpu-slm.png',
    readTime: '6 min read',
    author: {
      name: 'Phisit Kaewkulphisit',
      role: 'Software Developer & AI Creator',
      avatar: '/images/profile/avatar.png',
    },
    relatedProductSlug: 'ai-chat-starter-kit',
    content: `
## The Cloud Latency Bottleneck

Traditional AI apps rely on HTTP roundtrips to proprietary cloud APIs. Even with fast streaming, the time-to-first-token (TTFT) frequently exceeds 600ms on mobile LTE connections.

For tactile, interactive micro-moments (like live prompt completion, sentiment haptics, or real-time query categorization), 600ms feels sluggish.

## Bringing Models into WebGPU VRAM

With the maturation of the **WebGPU standard**, browsers now possess direct compute pipeline access to the GPU.
\`\`\`javascript
import { CreateMLCEngine } from '@mlc-ai/web-llm';

const engine = await CreateMLCEngine('Phi-3-mini-4k-instruct-q4f16_1-MLC', {
  initProgressCallback: (report) => console.log(report.text),
});
\`\`\`

### Benchmark Findings
- **M2 Safari**: 48 tokens/sec. Zero cloud bills.
- **Snapdragon 8 Gen 3**: 22 tokens/sec.
- **Memory footprint**: ~2.2 GB VRAM cache after initial shader compilation.

## Key Takeaway
For conversational tools with complex workflows, a **hybrid architecture** works best: run intent classification and grammar assistance locally on WebGPU, while offloading deep multi-step reasoning to server-side models.
`,
  },
  {
    title: 'The Tactile Web: Designing UI Beyond Flat Glassmorphism',
    slug: 'tactile-web-ui-design',
    description: 'How to combine neo-brutalist depth, physical button states, and Web Audio clicks to create memorable digital interfaces.',
    date: '2026-01-25',
    category: 'design',
    tags: ['UI/UX', 'Design Systems', 'Haptics', 'Micro-interactions'],
    coverImage: '/images/blog/tactile-design.png',
    readTime: '5 min read',
    author: {
      name: 'Phisit Kaewkulphisit',
      role: 'Software Developer & AI Creator',
      avatar: '/images/profile/avatar.png',
    },
    relatedProductSlug: 'tactile-haptic-component-pack',
    content: `
## Flat Design Fatigue

For over a decade, digital interfaces have flattened out. While minimalism served the early mobile era well, modern users crave tactile personality and tangible feedback.

## The 3 Pillars of Tactile Interaction
1. **Physical Transform Depths**: Instead of smooth opacity fades, use stepped 2px translate offsets with high-contrast shadows.
2. **Audio-Haptic Resonance**: A subtle 80Hz audio click synthesized via Web Audio triggers instant satisfaction when pressing key actions.
3. **Intentional Asymmetry**: Angled tags and organic node canvases break the monotonous corporate grid.
`,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}

export function getBlogPostsByCategory(categorySlug: BlogCategorySlug): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === categorySlug);
}

export function getCategoryBySlug(categorySlug: string) {
  return BLOG_CATEGORIES.find((c) => c.slug === categorySlug) || null;
}

export { BLOG_CATEGORIES };
