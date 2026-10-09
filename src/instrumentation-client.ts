// Client-side instrumentation — รันหลังโหลด HTML เสร็จ แต่ก่อน React hydration
//
// อ่านประกอบ: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/instrumentation-client.md
//
// ที่นี่คือจุดที่ถูกต้องสำหรับ init analytics ใน Next.js 16 (ตั้งแต่ 15.3)
// ดีกว่าการยัดลง layout.tsx เพราะไม่ต้องทำให้ layout กลายเป็น client component
// และทำงานก่อนที่ผู้ใช้จะกดอะไรได้ จึงเก็บ event ช่วงต้นได้ครบ
//
// doc กำหนดสองข้อที่ยึดในไฟล์นี้:
//   1. ครอบ try/catch เสมอ — instrumentation พังต้องไม่ทำให้แอปพัง
//   2. โค้ดต้องเบา ถ้า init นานเกิน 16ms Next.js จะเตือนในโหมด dev
//      (จึงเรียกแบบ fire-and-forget ไม่ await ซึ่ง doc ระบุว่ายอมรับได้สำหรับ analytics)

import { getFirebaseAnalytics } from '@/lib/firebase';

try {
  void getFirebaseAnalytics();
} catch {
  // เงียบไว้ — ถ้า Firebase config ไม่ครบหรือเบราว์เซอร์ไม่รองรับ
  // getFirebaseAnalytics จะคืน null เองอยู่แล้ว ส่วน catch นี้กัน error ที่เกิดแบบ sync
}
