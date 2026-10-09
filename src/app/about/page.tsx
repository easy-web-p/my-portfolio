import React from 'react';
import type { Metadata } from 'next';
import { AboutView } from '@/components/about/about-view';

export const metadata: Metadata = {
  title: 'เกี่ยวกับ พิสิษฐ์  — Phisit ',
  description: 'คุณกำลังค้นหานักเขียน AI ที่จะมาช่วยคุณในการทำงานอยู่หรือเปล่า - ฉันจะช่วยคุณได้!',
};

export default function AboutPage() {
  return <AboutView />;
}

