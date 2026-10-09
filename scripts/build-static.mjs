// Build แบบ static export สำหรับ Firebase Hosting (phisitcode.web.app)
//
// ใช้: npm run build:static   → ได้ผลลัพธ์ใน out/
//
// ทำไมต้องมีสคริปต์นี้แทนที่จะตั้ง env ตรงๆ:
//
// 1) ตั้ง BUILD_TARGET=static ข้าม OS ได้
//    (npm script บน Windows รันผ่าน cmd.exe ซึ่งไม่รองรับ syntax `VAR=x command`)
//
// 2) static export ไม่รองรับ route handler แบบ POST ที่อ่าน Request
//    (ดู node_modules/next/dist/docs/01-app/02-guides/static-exports.md หัวข้อ Unsupported Features)
//    โปรเจกต์นี้มี 5 ตัว: contact, checkout, downloads, translate-keystroke, webhooks
//    ถ้าปล่อยไว้ build จะล้มที่ "export const dynamic = force-static not configured"
//
//    แทนที่จะลบไฟล์ทิ้ง (ซึ่งจะต้องเขียนใหม่ตอนย้ายไป App Hosting) สคริปต์นี้
//    เปลี่ยนชื่อโฟลเดอร์ src/app/api เป็น src/app/_api ชั่วคราว — Next.js ถือว่า
//    โฟลเดอร์ที่ขึ้นต้นด้วย _ เป็น private folder และไม่นำไปสร้าง route
//    เสร็จแล้วคืนชื่อเดิมเสมอใน finally
//
//    ผลคือ sitemap.ts / robots.ts ยังทำงานปกติ (ถ้าใช้ pageExtensions ตัด .ts ออก
//    ทั้งสองไฟล์นั้นจะหายไปด้วย ซึ่งเสีย SEO)

import { spawnSync } from 'node:child_process';
import { existsSync, renameSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = join(projectRoot, 'src', 'app', 'api');
const disabledDir = join(projectRoot, 'src', 'app', '_api');

let moved = false;

function restore() {
  if (moved && existsSync(disabledDir)) {
    renameSync(disabledDir, apiDir);
    moved = false;
    console.log('[build:static] คืนชื่อ src/app/_api → src/app/api แล้ว');
  }
}

// กันกรณี build ถูกขัดจังหวะกลางคัน ไม่ให้โฟลเดอร์ค้างชื่อผิด
process.on('exit', restore);
process.on('SIGINT', () => {
  restore();
  process.exit(130);
});

try {
  // ตรวจ type ก่อนปิด route handler เพื่อให้ตรวจโค้ดครบทั้งโปรเจกต์
  // (ขั้น next build ในโหมด static ตั้ง ignoreBuildErrors ไว้ ดูเหตุผลใน next.config.ts)
  console.log('[build:static] ตรวจ type ทั้งโปรเจกต์ก่อน (tsc --noEmit)');

  const tsc = spawnSync(
    process.execPath,
    [join(projectRoot, 'node_modules', 'typescript', 'bin', 'tsc'), '--noEmit'],
    { cwd: projectRoot, stdio: 'inherit' }
  );

  if (tsc.status !== 0) {
    throw new Error('type check ไม่ผ่าน — แก้ error ให้หมดก่อน build');
  }

  if (existsSync(disabledDir)) {
    throw new Error(
      'พบ src/app/_api ค้างอยู่จาก build ครั้งก่อนที่ไม่จบ — เปลี่ยนชื่อกลับเป็น src/app/api ด้วยตัวเองก่อนรันใหม่'
    );
  }

  if (existsSync(apiDir)) {
    renameSync(apiDir, disabledDir);
    moved = true;
    console.log('[build:static] ปิด route handler ชั่วคราว (src/app/api → src/app/_api)');
  }

  // เรียก binary ของ next ตรงๆ ด้วย node แทนการผ่าน npx + shell
  // เลี่ยง shell: true ซึ่ง Node เตือน DEP0190 ว่า argument ไม่ถูก escape
  const nextBin = join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next');

  const result = spawnSync(process.execPath, [nextBin, 'build'], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...process.env, BUILD_TARGET: 'static', NEXT_PUBLIC_CHECKOUT_AVAILABLE: 'false' },
  });

  if (result.status !== 0) {
    process.exitCode = result.status ?? 1;
  }
} finally {
  restore();
}
