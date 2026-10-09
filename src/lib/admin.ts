import { STORE_PRODUCTS } from './store';
import { BLOG_POSTS } from './blog';

export interface ActivityLog {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  type: 'product' | 'order' | 'blog' | 'security';
  timestamp: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpend: number;
  activeLicenses: string[];
  status: 'ACTIVE' | 'SUSPENDED';
  joinedAt: string;
}

export interface ProductVersion {
  id: string;
  productId: string;
  version: string;
  changelog: string;
  minNodeVersion: string;
  fileKey: string;
  fileSize: string;
  publishedAt: string;
}

export const FUN_STATUS_MESSAGES = [
  'Revenue is looking good 🚀',
  '3 drafts are waiting for you ✍️',
  'Your AI Starter Kit is trending ✨',
  '99.2% token download verification rate ⚡',
  '2 new commercial licenses issued today 💎',
];

export const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust-01',
    name: 'Marcus Vance',
    email: 'marcus@synthlab.io',
    totalOrders: 3,
    totalSpend: 347,
    activeLicenses: ['Commercial (AI Chat)', 'Extended (WebGPU)'],
    status: 'ACTIVE',
    joinedAt: '2026-01-12',
  },
  {
    id: 'cust-02',
    name: 'Elena Rostova',
    email: 'elena@creativepulse.design',
    totalOrders: 2,
    totalSpend: 198,
    activeLicenses: ['Extended (WebGPU)', 'Personal (Bento Pro)'],
    status: 'ACTIVE',
    joinedAt: '2026-01-28',
  },
  {
    id: 'cust-03',
    name: 'David Chen',
    email: 'david@nextwave.tech',
    totalOrders: 1,
    totalSpend: 79,
    activeLicenses: ['Commercial (Node.js REST API)'],
    status: 'ACTIVE',
    joinedAt: '2026-02-14',
  },
  {
    id: 'cust-04',
    name: 'Alex Developer',
    email: 'alex@example.com',
    totalOrders: 2,
    totalSpend: 98,
    activeLicenses: ['Commercial (AI Chat)', 'Personal (Bento Pro)'],
    status: 'ACTIVE',
    joinedAt: '2026-02-28',
  },
  {
    id: 'cust-05',
    name: 'Sarah Jenkins',
    email: 'sarah@hyperdrive.co',
    totalOrders: 4,
    totalSpend: 420,
    activeLicenses: ['Extended (Tactile Haptics)', 'Commercial (AI Chat)'],
    status: 'ACTIVE',
    joinedAt: '2026-03-02',
  },
];

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    user: 'Phisit Kaewkulphisit',
    avatar: '/images/profile/avatar.png',
    action: 'Published version 2.1.0 update for',
    target: 'AI Chat Starter Kit',
    type: 'product',
    timestamp: '12 mins ago',
  },
  {
    id: 'act-2',
    user: 'Marcus Vance',
    avatar: '/images/profile/avatar.png',
    action: 'Purchased Extended License for',
    target: 'WebGPU Shader Micro-Interactions ($149)',
    type: 'order',
    timestamp: '45 mins ago',
  },
  {
    id: 'act-3',
    user: 'System Bot',
    avatar: '/images/stitch-logo.png',
    action: 'Dispatched automated download token for',
    target: 'ORD-982103',
    type: 'security',
    timestamp: '1 hour ago',
  },
  {
    id: 'act-4',
    user: 'Phisit Kaewkulphisit',
    avatar: '/images/profile/avatar.png',
    action: 'Drafted new technical analysis:',
    target: 'Zero-Latency SLM on Mobile WebGPU',
    type: 'blog',
    timestamp: '3 hours ago',
  },
  {
    id: 'act-5',
    user: 'Sarah Jenkins',
    avatar: '/images/profile/avatar.png',
    action: 'Downloaded package archive for',
    target: 'Tactile Haptic Component Pack (1/5 used)',
    type: 'security',
    timestamp: '5 hours ago',
  },
];

export const PRODUCT_VERSIONS: Record<string, ProductVersion[]> = {
  'prod-ai-chat': [
    {
      id: 'ver-1',
      productId: 'prod-ai-chat',
      version: '2.1.0',
      changelog: 'Added DeepSeek-R1 reasoning model integration and WebGPU local fallback.',
      minNodeVersion: '>= 20.0.0',
      fileKey: 'ai-chat-starter-v2.1.0.zip',
      fileSize: '18.4 MB',
      publishedAt: '2026-02-28',
    },
    {
      id: 'ver-0',
      productId: 'prod-ai-chat',
      version: '2.0.0',
      changelog: 'Migrated to Next.js 15 Turbopack and enhanced mobile touch drawer.',
      minNodeVersion: '>= 18.17.0',
      fileKey: 'ai-chat-starter-v2.0.0.zip',
      fileSize: '17.2 MB',
      publishedAt: '2026-01-15',
    },
  ],
  'prod-bento-pro': [
    {
      id: 'ver-b1',
      productId: 'prod-bento-pro',
      version: '1.4.0',
      changelog: 'Implemented dynamic theme switching and tactile physical elevation.',
      minNodeVersion: '>= 18.0.0',
      fileKey: 'bento-pro-v1.4.0.zip',
      fileSize: '12.8 MB',
      publishedAt: '2026-02-20',
    },
  ],
};

export function getAdminMetrics() {
  return {
    totalRevenue: 18420,
    revenueGrowth: '+24.5%',
    ordersCount: 142,
    pendingOrdersCount: 3,
    downloadsCount: 628,
    activeCustomersCount: 189,
    blogViewsCount: '14.2k',
    conversionRate: '4.8%',
  };
}
