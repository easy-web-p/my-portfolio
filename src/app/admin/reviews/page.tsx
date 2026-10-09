'use client';

import React, { useState } from 'react';

interface Review {
  id: string;
  author: string;
  email: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Kenji Sato',
    email: 'kenji@tokyotech.jp',
    product: 'AI Chat Starter Kit',
    rating: 5,
    comment: 'Sub-20ms streaming and local Ollama fallback works completely out of the box. Saved us 3 weeks of boilerplate.',
    date: 'Feb 26, 2026',
    verified: true,
    status: 'APPROVED'
  },
  {
    id: 'rev-2',
    author: 'Sarah Jenkins',
    email: 'sarah.j@designstudio.io',
    product: 'Bento Portfolio Pro Template',
    rating: 5,
    comment: 'The haptic interactions and WebGL ribbon shaders look incredible on client presentations. Highest quality Next.js template I have bought.',
    date: 'Feb 22, 2026',
    verified: true,
    status: 'APPROVED'
  },
  {
    id: 'rev-3',
    author: 'Marcus Vance',
    email: 'marcus@devstack.co',
    product: 'Production Node.js REST API Starter',
    rating: 4,
    comment: 'Super clean architecture with Prisma and Zod. Would love to see an automated OpenAPI Swagger generator in the next release.',
    date: 'Feb 19, 2026',
    verified: true,
    status: 'PENDING'
  }
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const setStatus = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-sm text-2xl font-bold text-on-surface">Customer Reviews & Testimonials</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Moderate incoming product reviews, verify purchase badges, and manage public feedback.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl p-6 border border-outline-variant/20 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-sm text-on-surface">{review.author}</span>
                <span className="text-xs text-on-surface-variant font-mono">{review.email}</span>
                {review.verified && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                    ✓ Verified Purchase
                  </span>
                )}
                <span className="text-xs text-on-surface-variant">• {review.date}</span>
              </div>

              <div className="flex items-center gap-1 text-amber-500">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
                <span className="text-xs font-bold text-on-surface ml-2">{review.product}</span>
              </div>

              <p className="text-xs sm:text-sm text-on-surface leading-relaxed italic bg-surface-container-low/50 dark:bg-surface-container-high/20 p-3 rounded-xl border border-outline-variant/15">
                &ldquo;{review.comment}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  review.status === 'APPROVED'
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    : review.status === 'PENDING'
                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                    : 'bg-error-container text-error'
                }`}
              >
                {review.status}
              </span>

              {review.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => setStatus(review.id, 'APPROVED')}
                    className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setStatus(review.id, 'REJECTED')}
                    className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-error-container hover:text-error text-xs font-bold transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
