import React from 'react';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-bold">Product Support</span>
        </div>

        <div className="bg-surface-container-lowest dark:bg-surface rounded-3xl p-8 sm:p-12 border border-outline-variant/20 shadow-xs space-y-8 text-on-surface">
          <div>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              Helpdesk & Assistance
            </span>
            <h1 className="font-headline-lg text-3xl sm:text-4xl font-bold tracking-tight mt-3">
              Developer Support
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              Encountering an issue integrating a starter kit or compiling GLSL shaders? We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-surface-container-low dark:bg-surface-container-highest/20 border border-outline-variant/15 flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-[28px] mb-2">mark_email_read</span>
                <h3 className="font-bold text-sm text-on-surface">Priority Email Support</h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Guaranteed 24-hour response time for Commercial and Extended license holders.
                </p>
              </div>
              <a
                href="mailto:support@playful-intelligence.dev"
                className="mt-4 text-xs font-bold text-primary hover:underline"
              >
                support@playful-intelligence.dev →
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low dark:bg-surface-container-highest/20 border border-outline-variant/15 flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-[28px] mb-2">quiz</span>
                <h3 className="font-bold text-sm text-on-surface">Frequently Asked Questions</h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Instant answers on Node.js requirements, download tokens, and multi-app licensing.
                </p>
              </div>
              <Link href="/faq" className="mt-4 text-xs font-bold text-primary hover:underline">
                Explore Knowledge Base →
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-low/50 dark:bg-surface-container-high/20 border border-outline-variant/15 space-y-3 text-xs text-on-surface-variant">
            <h3 className="font-bold text-sm text-on-surface">Before Reaching Out:</h3>
            <p>1. Ensure you are running Node.js 18.17+ or 20.x and have updated dependencies (`npm install`).</p>
            <p>2. Verify your `.env.local` file contains valid API credentials (OpenAI, Claude, or local Ollama port).</p>
            <p>3. Check your order reference number in your{' '}
              <Link href="/dashboard/orders" className="text-primary font-bold hover:underline">
                Customer Dashboard
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
