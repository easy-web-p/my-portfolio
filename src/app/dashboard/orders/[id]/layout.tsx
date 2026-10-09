// Server layout ของ segment /dashboard/orders/[id]
//
// มีไว้เพื่อ export generateStaticParams() อย่างเดียว เพราะ page.tsx เป็น 'use client'
//
// ข้อจำกัดที่ต้องรู้: หน้าใบเสร็จของลูกค้าแต่ละคน **ไม่เหมาะกับ static export โดยธรรมชาติ**
// เพราะ order id เกิดใหม่เรื่อยๆ ตอน runtime แต่ static export prerender ได้เฉพาะ id
// ที่รู้ตอน build — id ที่ไม่อยู่ในลิสต์นี้จะขึ้น 404 บน Firebase Hosting
//
// ตอนนี้ยอมรับได้เพราะข้อมูลคำสั่งซื้อยังเป็น mock ที่ hardcode อยู่ในหน้า
// (src/app/dashboard/page.tsx และ src/app/dashboard/orders/page.tsx)
// เมื่อย้ายไป Firebase App Hosting (SSR) ให้ลบไฟล์นี้ทิ้งได้เลย หน้าจะ render ตาม id จริง

const MOCK_ORDER_IDS = ['ord-101', 'ord-102', 'ORD-849201'];

export function generateStaticParams() {
  return MOCK_ORDER_IDS.map((id) => ({ id }));
}

export default function OrderDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
