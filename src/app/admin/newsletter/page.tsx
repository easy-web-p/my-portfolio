'use client';

import React, { useState } from 'react';

interface Subscriber {
  id: string;
  email: string;
  source: string;
  segment: 'All' | 'AI Researchers' | 'Indie Hackers' | 'Design Technologists';
  date: string;
  status: 'SUBSCRIBED' | 'UNSUBSCRIBED';
}

const INITIAL_SUBSCRIBERS: Subscriber[] = [
  {
    id: 'sub-1',
    email: 'hiroshi@research.keio.ac.jp',
    source: 'AI Lab Study #01',
    segment: 'AI Researchers',
    date: 'Feb 27, 2026',
    status: 'SUBSCRIBED'
  },
  {
    id: 'sub-2',
    email: 'claire.dev@indiehub.com',
    source: 'Code Store Checkout',
    segment: 'Indie Hackers',
    date: 'Feb 25, 2026',
    status: 'SUBSCRIBED'
  },
  {
    id: 'sub-3',
    email: 'marcus.ux@spatialdesign.org',
    source: 'Playground Modal',
    segment: 'Design Technologists',
    date: 'Feb 20, 2026',
    status: 'SUBSCRIBED'
  },
];

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(INITIAL_SUBSCRIBERS);
  const [subject, setSubject] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Broadcast "${subject}" dispatched to ${subscribers.length} subscribers!`);
    setSubject('');
    setBroadcastMessage('');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-sm text-2xl font-bold text-on-surface">Audience & Newsletter Broadcasts</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Manage subscriber email list, audience interest segments, and dispatch product release alerts.
          </p>
        </div>
        <button
          onClick={() => alert('Exporting subscriber list as CSV...')}
          className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          <span>Export CSV</span>
        </button>
      </div>

      {/* 2-Column Grid: Broadcast Composer & Subscribers List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Broadcast Composer */}
        <div className="lg:col-span-5">
          <div className="bg-surface-container-lowest dark:bg-surface rounded-3xl p-6 border border-outline-variant/20 shadow-xs">
            <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">campaign</span>
              <span>Send Broadcast Alert</span>
            </h2>

            <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-on-surface uppercase tracking-wider mb-1">Target Segment</label>
                <select className="w-full px-3 py-2 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 font-medium">
                  <option>All Active Subscribers (4,290)</option>
                  <option>Code Store Buyers Only (289)</option>
                  <option>AI Lab Researchers Only (1,140)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-on-surface uppercase tracking-wider mb-1">Email Subject Line</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. New AI Starter Kit v2.1.0 Released"
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface uppercase tracking-wider mb-1">Brief Announcement</label>
                <textarea
                  rows={4}
                  required
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="Share release highlights, direct tutorial links, and discount codes..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary text-white font-bold shadow-hard-3 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-hard-4 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Dispatch Broadcast</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right: Subscribers Ledger */}
        <div className="lg:col-span-7">
          <div className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl border border-outline-variant/20 shadow-xs overflow-hidden">
            <div className="p-4 bg-surface-container-low/40 border-b border-surface-container flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <span>Recent Subscribers</span>
              <span className="text-primary font-mono">4,290 Total Audience</span>
            </div>

            <table className="w-full text-left text-xs">
              <tbody className="divide-y divide-surface-container">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3 px-5 font-mono font-medium text-on-surface">
                      {sub.email}
                      <span className="text-[10px] text-on-surface-variant block font-sans">
                        Source: {sub.source}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-surface-container text-[10px] font-semibold text-on-surface">
                        {sub.segment}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-on-surface-variant font-mono">
                      {sub.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
