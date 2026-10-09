// Server layout ของ segment /code/[slug]
//
// มีไว้เพื่อ export generateStaticParams() อย่างเดียว — page.tsx เป็น 'use client'
// ซึ่งไฟล์เดียวกันจะ export generateStaticParams ไม่ได้ Next.js รองรับให้ประกาศ
// ที่ layout ของ segment เดียวกันแทนได้
//
// จำเป็นสำหรับ BUILD_TARGET=static (Firebase Hosting) เพราะ static export
// ต้องรู้ล่วงหน้าว่าจะ prerender slug ไหนบ้าง
// อ่านประกอบ: node_modules/next/dist/docs/01-app/02-guides/static-exports.md

import { STORE_PRODUCTS } from '@/lib/store';

export function generateStaticParams() {
  return STORE_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
