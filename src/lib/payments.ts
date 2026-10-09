import { CartItem, CustomerOrder } from '@/types/store';
import { createDownloadToken } from './storage';

const PROMO_CODES: Record<string, number> = {
  PLAYFUL20: 0.2, // 20% off
  DEV10: 0.1,     // 10% off
  COMMUNITY: 0.15 // 15% off
};

// In-memory orders for customer dashboard
const CUSTOMER_ORDERS: CustomerOrder[] = [
  {
    id: 'ord_9942a',
    customerEmail: 'developer@example.com',
    customerName: 'Alex Chen',
    total: 990,
    currency: 'THB',
    status: 'PAID',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      {
        productId: 'prod-ai-chat',
        productTitle: 'AI Chat Starter Kit',
        license: 'Commercial',
        price: 990,
      },
    ],
  },
  {
    id: 'ord_8821b',
    customerEmail: 'developer@example.com',
    customerName: 'Alex Chen',
    total: 790,
    currency: 'THB',
    status: 'PAID',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      {
        productId: 'prod-bento-pro',
        productTitle: 'Bento Portfolio Pro Template',
        license: 'Personal',
        price: 790,
      },
    ],
  },
];

export function validatePromoCode(code: string): { valid: boolean; discountPercent: number } {
  const upper = code.trim().toUpperCase();
  if (PROMO_CODES[upper]) {
    return { valid: true, discountPercent: PROMO_CODES[upper] };
  }
  return { valid: false, discountPercent: 0 };
}

export function validateCoupon(code: string): { valid: boolean; discountPercent: number; message: string } {
  const upper = code.trim().toUpperCase();
  if (upper === 'PLAYFUL20') {
    return { valid: true, discountPercent: 20, message: '20% Playful Creator discount applied!' };
  }
  if (upper === 'DEV10') {
    return { valid: true, discountPercent: 10, message: '10% Developer discount applied!' };
  }
  if (upper === 'COMMUNITY') {
    return { valid: true, discountPercent: 15, message: '15% Community discount applied!' };
  }
  return { valid: false, discountPercent: 0, message: 'Invalid or expired promo code.' };
}

export function processCheckout(
  items: CartItem[],
  customerEmail: string,
  customerName?: string,
  promoCode?: string
): { success: boolean; orderId: string; tokens: string[] } {
  let subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;

  if (promoCode) {
    const { valid, discountPercent } = validatePromoCode(promoCode);
    if (valid) {
      discount = Math.round(subtotal * discountPercent);
    }
  }

  const finalTotal = Math.max(0, subtotal - discount);
  const orderId = 'ord_' + Math.random().toString(36).substring(2, 9);

  const tokens: string[] = [];
  items.forEach((item) => {
    const token = createDownloadToken(
      item.product.id,
      item.product.title,
      item.product.slug,
      item.product.version,
      item.product.fileSize,
      item.license
    );
    tokens.push(token);
  });

  const order: CustomerOrder = {
    id: orderId,
    customerEmail,
    customerName: customerName || 'Valued Creator',
    total: finalTotal,
    currency: 'THB',
    status: 'PAID',
    discountCode: promoCode,
    createdAt: new Date().toISOString(),
    items: items.map((i) => ({
      productId: i.product.id,
      productTitle: i.product.title,
      license: i.license,
      price: i.price,
    })),
  };

  CUSTOMER_ORDERS.unshift(order);

  return { success: true, orderId, tokens };
}

export function getCustomerOrders(): CustomerOrder[] {
  return CUSTOMER_ORDERS;
}
