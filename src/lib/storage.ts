import { DigitalDownload } from '@/types/store';

// In-memory token vault for demo/local execution, backed by Prisma in production
const DOWNLOAD_TOKENS: Record<string, DigitalDownload> = {
  'demo-token-ai-chat': {
    token: 'demo-token-ai-chat',
    productId: 'prod-ai-chat',
    productTitle: 'AI Chat Starter Kit',
    productSlug: 'ai-chat-starter-kit',
    version: '2.1.0',
    fileSize: '18.4 MB',
    license: 'Commercial',
    downloadCount: 1,
    downloadLimit: 5,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  'demo-token-bento-pro': {
    token: 'demo-token-bento-pro',
    productId: 'prod-bento-pro',
    productTitle: 'Bento Portfolio Pro Template',
    productSlug: 'bento-portfolio-pro',
    version: '1.4.0',
    fileSize: '12.8 MB',
    license: 'Personal',
    downloadCount: 0,
    downloadLimit: 5,
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

export function createDownloadToken(
  productId: string,
  productTitle: string,
  productSlug: string,
  version: string,
  fileSize: string,
  license: any
): string {
  const token = 'dl_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now().toString(36);
  DOWNLOAD_TOKENS[token] = {
    token,
    productId,
    productTitle,
    productSlug,
    version,
    fileSize,
    license,
    downloadCount: 0,
    downloadLimit: 5,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
  return token;
}

export function verifyDownloadToken(token: string): {
  valid: boolean;
  download?: DigitalDownload;
  reason?: string;
} {
  const record = DOWNLOAD_TOKENS[token];
  if (!record) {
    return { valid: false, reason: 'Invalid or non-existent download token.' };
  }

  if (new Date(record.expiresAt).getTime() < Date.now()) {
    return { valid: false, reason: 'This download link has expired (7 days expiration limit).' };
  }

  if (record.downloadCount >= record.downloadLimit) {
    return { valid: false, reason: 'Download limit exceeded (Max 5 downloads allowed per token).' };
  }

  return { valid: true, download: record };
}

export function incrementDownloadCount(token: string): void {
  if (DOWNLOAD_TOKENS[token]) {
    DOWNLOAD_TOKENS[token].downloadCount += 1;
  }
}

export function getAllCustomerDownloads(): DigitalDownload[] {
  return Object.values(DOWNLOAD_TOKENS);
}
