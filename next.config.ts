import type { NextConfig } from 'next';

// โปรเจกต์นี้ deploy 2 ปลายทาง จึงสลับโหมด build ด้วย env ไม่ใช่แก้ไฟล์นี้ไปกลับ
//
//   BUILD_TARGET=static  → static export ลง out/ สำหรับ Firebase Hosting (phisitcode.web.app)
//   (ไม่ตั้งค่า)          → build ปกติ มี SSR + route handler สำหรับ Firebase App Hosting
//
// อ่านประกอบ: node_modules/next/dist/docs/01-app/02-guides/static-exports.md
// ข้อจำกัดของ static export ที่กระทบโปรเจกต์นี้:
//   - route handler รองรับแค่ GET ที่ประกาศ `export const dynamic = 'force-static'`
//     ส่วน POST ที่อ่าน Request ใช้ไม่ได้ (contact, checkout, downloads, translate-keystroke, webhooks)
//   - dynamic route ต้องมี generateStaticParams() ทุกอัน
//   - images ต้อง unoptimized (ตั้งไว้แล้วด้านล่าง)
const isStaticExport = process.env.BUILD_TARGET === 'static';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // output: 'export' ใส่เฉพาะโหมด static — โหมดปกติต้องไม่มี key นี้เลย
  //
  // หมายเหตุ: อย่าตั้ง distDir ในโหมดนี้ — เมื่อ distDir ถูก override
  // Next.js จะเขียนผลลัพธ์ที่ export แล้วลง distDir แทน out/
  // ซึ่งจะไม่ตรงกับ "public": "out" ที่ตั้งไว้ใน firebase.json
  //
  // typescript.ignoreBuildErrors เปิดเฉพาะโหมด static เพราะ tsconfig include
  // ".next/dev/types/**/*.ts" ซึ่งเป็น type ที่ dev server generate ไว้และยังอ้าง
  // route handler ที่สคริปต์ปิดชั่วคราว ทำให้ type check ล้มด้วยเหตุผลที่ไม่เกี่ยวกับโค้ดจริง
  // ไม่ได้แปลว่าเลิกตรวจ type — scripts/build-static.mjs รัน `tsc --noEmit` เต็มรูปแบบ
  // ตอน route handler ยังอยู่ครบ ก่อนเริ่ม build และหยุดทันทีถ้าเจอ error
  ...(isStaticExport
    ? {
        output: 'export' as const,
        typescript: { ignoreBuildErrors: true },
      }
    : {}),

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
