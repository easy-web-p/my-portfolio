import React from 'react';
import Link from 'next/link';

export default function RefundPolicyPage() {
  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-bold">Refund Policy</span>
        </div>

        <div className="bg-surface-container-lowest dark:bg-surface rounded-3xl p-8 sm:p-12 border border-outline-variant/20 shadow-xs space-y-8 text-on-surface">
          <div>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              Customer Satisfaction
            </span>
            <h1 className="font-headline-lg text-3xl sm:text-4xl font-bold tracking-tight mt-3">
              Digital Goods Refund Policy
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Effective Date: February 2026
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-on-surface-variant">
            <div>
              <h2 className="text-base font-bold text-on-surface mb-2">1. Nature of Digital Goods</h2>
              <p>
                Because all items in our Code Store consist of immediately accessible source code, templates, and digital assets, purchases are generally non-refundable once the file archive has been unzipped and downloaded from the Vault.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-on-surface mb-2">2. 14-Day Defect & Technical Guarantee</h2>
              <p>
                We stand behind the engineering quality of our work. If you encounter a verified bug, broken dependency, or failure to run as documented in the installation guide that our support team cannot resolve within 5 business days, we will gladly issue a <strong className="text-on-surface">100% full refund</strong> within 14 days of purchase.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-on-surface mb-2">3. License Revocation Upon Refund</h2>
              <p>
                When a refund is processed, the associated commercial license entitlement and Vault download tokens are cryptographically revoked. You must cease all usage of the source code and delete local copies.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-on-surface mb-2">4. How to Request Assistance</h2>
              <p>
                Please email us at{' '}
                <a href="mailto:support@playful-intelligence.dev" className="text-primary font-bold hover:underline">
                  support@playful-intelligence.dev
                </a>{' '}
                with your order reference number (#ord-...) and details of the technical problem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
