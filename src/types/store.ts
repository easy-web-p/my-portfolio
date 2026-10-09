export type LicenseType = 'Personal' | 'Commercial' | 'Extended' | 'Open Source';

export interface LicenseOption {
  id: LicenseType;
  name: string;
  description: string;
  multiplier: number;
}

export const LICENSE_OPTIONS: LicenseOption[] = [
  {
    id: 'Personal',
    name: 'Personal License',
    description: 'Use for 1 personal project or educational learning. No commercial client work.',
    multiplier: 1.0,
  },
  {
    id: 'Commercial',
    name: 'Commercial License',
    description: 'Use for 1 client project or revenue-generating business application.',
    multiplier: 1.8,
  },
  {
    id: 'Extended',
    name: 'Extended / Team License',
    description: 'Unlimited client projects, SaaS products, and distribution within your team.',
    multiplier: 3.5,
  },
  {
    id: 'Open Source',
    name: 'Open Source (MIT / CC)',
    description: 'Free to use and modify according to the license terms.',
    multiplier: 0.0,
  },
];

export interface StoreProduct {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  price: number; // Base price
  category: 'templates' | 'components' | 'apis' | 'ai' | 'ai-projects' | 'free';
  framework: 'Next.js' | 'Node.js' | 'React' | 'PyTorch' | 'WebGL' | string;
  rating: number;
  reviewCount: number;
  badge?: 'NEW DROP' | 'AI POWERED' | 'PRO TOOL' | 'FREE' | 'UPDATED';
  demoUrl?: string;
  githubUrl?: string;
  fileKey: string;
  fileSize: string;
  version: string;
  features: string[];
  included: string[];
  techStack: string[];
  targetAudience: string[];
  installation: string[];
  changelog: { version: string; date: string; notes: string }[];
  image: string;
  thumbnail?: string;
  previewImages?: string[];
}

export interface CartItem {
  product: StoreProduct;
  license: LicenseType;
  price: number;
  quantity: number;
}

export interface CustomerOrder {
  id: string;
  customerEmail: string;
  customerName?: string;
  total: number;
  currency: string;
  status: 'PAID' | 'PENDING' | 'FAILED';
  discountCode?: string;
  createdAt: string;
  items: {
    productId: string;
    productTitle: string;
    license: LicenseType;
    price: number;
  }[];
}

export interface DigitalDownload {
  token: string;
  productId: string;
  productTitle: string;
  productSlug: string;
  version: string;
  fileSize: string;
  license: LicenseType;
  downloadCount: number;
  downloadLimit: number;
  expiresAt: string;
}
