import React from 'react';
import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import { WorkView } from '@/components/work/work-view';

export const metadata: Metadata = {
  title: 'ผลงานและโครงงานเด่น — พิสิษฐ์ แก้วกุลพิสิฐ | Project Archive',
  description: 'คลังโครงงาน ผลงานนวัตกรรมซอฟต์แวร์ AI และคลังโค้ด GitHub โดย นายพิสิษฐ์ แก้วกุลพิสิฐ (โปรเจกต์ส่วนตัวเพื่อรวบรวมผลงานและหารายได้เสริม)',
};

export default function WorkPage() {
  const allProjects = getAllProjects();

  return <WorkView projects={allProjects} />;
}

