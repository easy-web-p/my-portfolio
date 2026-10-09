import React from 'react';
import type { Metadata } from 'next';
import { ContactView } from '@/components/contact/contact-view';

export const metadata: Metadata = {
  title: 'ติดต่อและร่วมงาน — พิสิษฐ์ แก้วกุลพิสิฐ | Personal Studio',
  description: 'ช่องทางการติดต่อ จ้างงาน พัฒนาโปรเจกต์ และปรึกษาแลกเปลี่ยนกับ นายพิสิษฐ์ แก้วกุลพิสิฐ (โปรเจกต์ส่วนตัว & สตูดิโอดิจิทัล)',
};

export default function ContactPage() {
  return <ContactView />;
}

