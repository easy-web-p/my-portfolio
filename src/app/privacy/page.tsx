import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-bold">Privacy Policy</span>
        </div>

        <div className="bg-surface-container-lowest dark:bg-surface rounded-3xl p-8 sm:p-12 border border-outline-variant/20 shadow-xs space-y-8 text-on-surface">
          <div>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              Legal & Privacy Protection
            </span>
            <h1 className="font-headline-lg text-3xl sm:text-4xl font-bold tracking-tight mt-3">
              Privacy Policy
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Effective Date: February 2026 • Version 2.1
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-on-surface-variant">
            <div>
              <h2 className="text-base font-bold text-on-surface mb-2">1. Our Core Commitment to Privacy</h2>
              <p>
                At PhisitCode (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we respect your cognitive and digital autonomy. We collect the absolute minimum amount of personal data necessary to deliver your digital purchases, verify license entitlements, and provide product support. We do not sell your personal information or engage in predatory cross-site tracking.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-on-surface mb-2">2. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li><strong className="text-on-surface">Order Information:</strong> Name, email address, billing country, and transaction references for invoice generation.</li>
                <li><strong className="text-on-surface">Security & License Telemetry:</strong> One-way hashed IP addresses and temporary token timestamps recorded during digital downloads to prevent pirated mass distribution.</li>
                <li><strong className="text-on-surface">Newsletter Subscriptions:</strong> Your email and interest preferences, if explicitly provided with double opt-in.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-bold text-on-surface mb-2">3. Payment Information Security</h2>
              <p>
                We never store full credit card numbers or banking secrets on our servers. All financial transactions are processed by certified PCI-DSS compliant payment infrastructure (PromptPay & Stripe). We only receive cryptographic webhook confirmations.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-on-surface mb-2">4. Your Rights & Data Portability</h2>
              <p>
                Under GDPR and global privacy standards, you have the right to access, rectify, or request complete deletion of your account data. You can export your data in standard JSON format directly from your{' '}
                <Link href="/dashboard/settings" className="text-primary font-bold hover:underline">
                  Customer Settings
                </Link>.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-on-surface mb-2">5. Inquiries & Contact</h2>
              <p>
                If you have questions regarding this Privacy Policy, please reach us at{' '}
                <a href="mailto:privacy@playful-intelligence.dev" className="text-primary font-bold hover:underline">
                  privacy@playful-intelligence.dev
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
