'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/language-context';

const FAQS = {
  th: [
    {
      q: 'จะได้รับไฟล์ดิจิทัลและซอร์สโค้ดได้อย่างไร?',
      a: 'หลัง Stripe webhook ยืนยันการชำระเงิน ระบบจะแสดงลิงก์ดาวน์โหลดที่ป้องกันไว้บนหน้าการยืนยันคำสั่งซื้อในเบราว์เซอร์เดิม ลิงก์จะไม่ถูกปลดล็อกจากเพียงการกดปุ่มชำระเงิน',
    },
    {
      q: 'ใบอนุญาตสิทธิ์ Personal และ Commercial แตกต่างกันอย่างไร?',
      a: 'ใบอนุญาต Personal อนุญาตให้ใช้งานได้ 1 โครงงานส่วนตัวหรืองานอดิเรกที่ไม่แสวงหากำไร ส่วนสิทธิ์ Commercial ให้สิทธิ์เต็มรูปแบบในการสร้างและใช้งานสำหรับ 1 โปรเจกต์ลูกค้า หรือโปรดักต์เชิงพาณิชย์โดยไม่ต้องใส่เครดิต',
    },
    {
      q: 'สามารถนำซอร์สโค้ดไปจำหน่ายต่อหรือแจกจ่ายได้หรือไม่?',
      a: 'ไม่อนุญาตให้นำไฟล์ซอร์สโค้ดหรือเทมเพลตต้นฉบับไปจำหน่ายต่อหรือแจกจ่ายโดยตรง แต่สามารถจำหน่ายในรูปแบบซอฟต์แวร์สำเร็จรูปที่คอมไพล์แล้ว หรือเว็บไซต์ลูกค้าที่พัฒนาขึ้นจากโค้ดได้',
    },
    {
      q: 'มีสิทธิ์รับการอัปเดตเวอร์ชันใหม่ในอนาคตฟรีหรือไม่?',
      a: 'ใช่ครับ! ชุดโค้ด Starter Kit ทั้งหมดรวมสิทธิ์รับการอัปเดตเวอร์ชัน, อัปเกรด Dependencies และแพตช์ความปลอดภัยฟรี 12 เดือน โดยระบบจะระบุสิทธิ์ตามใบอนุญาตที่ยืนยันการชำระเงินแล้ว',
    },
    {
      q: 'มีบริการช่วยเหลือและซัพพอร์ตอย่างไรบ้าง?',
      a: 'เรามีบริการช่วยเหลือตอบข้อสงสัยการติดตั้ง, แก้ไขบัก และการตั้งค่าสภาพแวดล้อมระบบผ่านทางอีเมลและ Discord นาน 60 วันหลังจากการซื้อ',
    },
  ],
  en: [
    {
      q: 'How will I receive the digital code package?',
      a: 'After Stripe confirms the payment through a signed webhook, the protected download link appears on the order confirmation page in the same browser. A browser confirmation alone never unlocks the package.',
    },
    {
      q: 'What is the difference between Personal and Commercial licenses?',
      a: 'Personal license allows use on 1 non-commercial or hobby project. Commercial license grants you full rights to build and deploy 1 client project or revenue-generating SaaS product without attribution.',
    },
    {
      q: 'Can I resell or redistribute the source code?',
      a: 'No. You may not resell, sub-license, or redistribute the source code files in raw or template form. You can only distribute compiled, end-user software or client websites built with the code.',
    },
    {
      q: 'Do I get free future updates?',
      a: 'Yes! All paid starter kits include 12 months of free version updates, dependency upgrades, and security patches. Access is associated with the confirmed purchase and license.',
    },
    {
      q: 'What kind of support is included?',
      a: 'We offer direct email and Discord support for installation issues, bug fixes, and environment setup questions for 60 days following purchase.',
    },
  ],
};

export const StoreFaq: React.FC = () => {
  const { language } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = FAQS[language];

  return (
    <div className="flex flex-col gap-3 w-full">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className="rounded-xl bg-surface-container-lowest border border-outline-variant/30 overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full p-4 flex items-center justify-between text-left gap-3 cursor-pointer hover:bg-surface-container-low transition-colors"
            >
              <span className="font-headline-sm text-sm text-on-surface font-semibold">
                {faq.q}
              </span>
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0 transition-transform duration-200">
                {isOpen ? 'remove' : 'add'}
              </span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 font-body-sm text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-2">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
