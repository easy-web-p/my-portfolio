import React from 'react';
import Link from 'next/link';

export default function LicensesPage() {
  const licenseTiers = [
    {
      title: 'Personal License (1.0x Base)',
      bestFor: 'Solo developers, students, and personal experimentation',
      multiplier: '1.0x',
      allowed: [
        'Single personal, non-commercial website or portfolio',
        'Private GitHub repository storage',
        'Learning and hobbyist adaptation'
      ],
      notAllowed: [
        'Client deliverables or contracted projects',
        'SaaS applications with paid subscriptions or paywalls',
        'Redistribution or reselling as a UI kit'
      ]
    },
    {
      title: 'Commercial License (1.8x Base)',
      bestFor: 'Freelancers, independent agencies, and commercial SaaS founders',
      multiplier: '1.8x',
      allowed: [
        'Unlimited commercial SaaS and client deliverables',
        'Charge end-users or integrate with Stripe billing',
        '12 months of free version updates & priority email support',
        'Deploy on client hosting infrastructure'
      ],
      notAllowed: [
        'Redistribution of source files as a competing marketplace template',
        'Sharing raw code archives publicly'
      ]
    },
    {
      title: 'Extended Enterprise License (3.5x Base)',
      bestFor: 'Venture-backed startups and multi-seat engineering teams',
      multiplier: '3.5x',
      allowed: [
        'Unlimited internal developers and engineering teams',
        'White-label redistribution inside proprietary client software',
        '24 months of updates and security audits',
        'Direct 1-hour architecture onboarding call'
      ],
      notAllowed: [
        'Claiming original authorship of the standalone template'
      ]
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/code" className="hover:text-primary transition-colors">Code Store</Link>
          <span>/</span>
          <span className="text-primary font-bold">License Tiers</span>
        </div>

        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            Clear, Developer-Friendly Rights
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-4xl font-bold tracking-tight text-on-surface mt-3">
            Product License Definitions
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Every digital product in our Code Store comes with lifetime access to the code. Select the tier that matches your deployment scope.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {licenseTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`bg-surface-container-lowest dark:bg-surface rounded-3xl p-6 sm:p-7 border ${
                idx === 1 ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'border-outline-variant/20 shadow-xs'
              } flex flex-col justify-between`}
            >
              <div>
                {idx === 1 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                    Most Popular Choice
                  </span>
                )}
                <h2 className="font-headline-sm text-base font-bold text-on-surface">{tier.title}</h2>
                <p className="text-xs text-on-surface-variant mt-1">{tier.bestFor}</p>

                <div className="mt-5 space-y-2">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">What is allowed:</span>
                  {tier.allowed.map((item, i) => (
                    <div key={i} className="text-xs text-on-surface flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-2 pt-4 border-t border-surface-container">
                  <span className="text-[10px] font-bold text-error uppercase tracking-wider block">What is not allowed:</span>
                  {tier.notAllowed.map((item, i) => (
                    <div key={i} className="text-xs text-on-surface-variant flex items-start gap-2">
                      <span className="text-error font-bold shrink-0">✕</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-container">
                <Link
                  href="/code"
                  className="w-full py-2 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-xs font-bold text-center block transition-colors"
                >
                  Browse Store Products
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
