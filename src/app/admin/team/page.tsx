'use client';

import React, { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Editor' | 'Support' | 'Analyst';
  lastActive: string;
  status: 'ACTIVE' | 'INVITED';
}

const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'usr-1',
    name: 'Phisit Kaewkulphisit',
    email: 'hi00000087@gmail.com',
    role: 'Owner',
    lastActive: 'Just now',
    status: 'ACTIVE'
  },
  {
    id: 'usr-2',
    name: 'Kenji Takahashi',
    email: 'kenji@playful-intelligence.dev',
    role: 'Admin',
    lastActive: '2 hours ago',
    status: 'ACTIVE'
  },
  {
    id: 'usr-3',
    name: 'Maya Lin',
    email: 'maya@playful-intelligence.dev',
    role: 'Editor',
    lastActive: 'Yesterday',
    status: 'ACTIVE'
  }
];

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-sm text-2xl font-bold text-on-surface">Team & Role-Based Access (RBAC)</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Manage authorized staff members, role tiers, and server-enforced permissions.
          </p>
        </div>
        <button
          onClick={() => alert('Invite team member modal opened.')}
          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-hard-3 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-hard-4 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">person_add</span>
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* Role Definitions Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { role: 'Owner', desc: 'Full unrestricted access', count: 1, color: 'text-purple-600 dark:text-purple-400' },
          { role: 'Admin', desc: 'Store, Content, Orders, CRM', count: 1, color: 'text-blue-600 dark:text-blue-400' },
          { role: 'Editor', desc: 'Articles & Portfolio case studies', count: 1, color: 'text-emerald-600 dark:text-emerald-400' },
          { role: 'Support', desc: 'Orders, Downloads & Customer CRM', count: 0, color: 'text-amber-600 dark:text-amber-400' },
          { role: 'Analyst', desc: 'Read-only financial & traffic analytics', count: 0, color: 'text-cyan-600 dark:text-cyan-400' },
        ].map((item) => (
          <div key={item.role} className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/20 shadow-xs">
            <div className={`font-bold text-sm ${item.color}`}>{item.role}</div>
            <div className="text-[11px] text-on-surface-variant mt-0.5">{item.desc}</div>
            <div className="mt-3 text-xs font-mono font-semibold text-on-surface">{item.count} Member{item.count === 1 ? '' : 's'}</div>
          </div>
        ))}
      </div>

      {/* Team Member Ledger */}
      <div className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl border border-outline-variant/20 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-surface-container text-on-surface-variant uppercase tracking-wider font-bold bg-surface-container-low/40">
              <th className="py-3 px-5">Staff Member</th>
              <th className="py-3 px-4">Role Tier</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Last Activity</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {team.map((member) => (
              <tr key={member.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 px-5">
                  <div className="font-bold text-sm text-on-surface">{member.name}</div>
                  <div className="text-[11px] text-on-surface-variant font-mono">{member.email}</div>
                </td>
                <td className="py-4 px-4 font-bold text-primary">
                  {member.role}
                </td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                    {member.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-on-surface-variant font-mono">{member.lastActive}</td>
                <td className="py-4 px-5 text-right">
                  <button
                    onClick={() => alert(`Managing permissions for ${member.name}`)}
                    className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface cursor-pointer"
                  >
                    Permissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
