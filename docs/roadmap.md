# my-portfolio Roadmap & Execution Status

สถานะ ณ วันที่สร้างไฟล์ (2026-10-08): **ยังไม่เริ่ม cycle ใดเลย** — ไฟล์นี้คือแผนตั้งต้นที่ orchestrator จะใช้สั่งงาน
ห้ามเปิดหลาย Phase พร้อมกัน เว้นแต่ผู้ใช้สั่งเปลี่ยนลำดับ

---

## Phase 0: Version Control Baseline [DONE — 2026-10-09]
- [x] `git init -b main` + commit baseline `7c355d3` (225 ไฟล์)
- [x] `.gitignore` ครอบ `node_modules`, `.next`, `out`, `.next-static`, `.env*`, `prisma/dev.db`, `tsconfig.tsbuildinfo`, `.firebase/`, `.claude/settings.local.json`
- [x] ลบ PDF ซ้ำ 2 ไฟล์ (MD5 ตรงกันทั้งสาม) ประหยัด ~106 MB — เหลือ `public/documents/portfolio-phisit.pdf` ที่โค้ดอ้าง 7 จุด
- [x] ต่อ GitHub: `https://github.com/easy-web-p/my-portfolio` (**public**) · `main` tracking `origin/main`
- [x] identity ระดับ repo: `easy-web-p <181621251+easy-web-p@users.noreply.github.com>` (global ยังเป็น placeholder "อีเมลที่ใช้กับ GitHub" — กระทบ my-QueueUp-app ด้วย ยังไม่แก้)

**ผลที่ตามมา:** `reviewer` ใช้ diff review ได้แล้ว ไม่ต้องใช้โหมด file-level fallback อีก

**ค้างไว้:** `public/documents/portfolio-phisit.pdf` 53.25 MB เกินค่าที่ GitHub แนะนำ (50 MB) — push ผ่านแต่มี warning พิจารณาย้ายขึ้น Firebase Storage หรือใช้ Git LFS

## Phase 1: Foundation & Integrity [กำลังทำ — 2026-10-09: ปิด critical แล้ว]
เป้า: ปิดช่องโหว่ที่ทำให้เว็บดูไม่น่าเชื่อถือ และทำให้ตัวตนผู้ใช้มีแหล่งความจริงเดียว

> **ตัดสินใจแล้ว (2026-10-08):** ใช้ **Firebase Auth** แทนระบบ login ปัจจุบัน
> ติดตั้ง `firebase ^13.0.0` และตั้งค่าไว้ที่ `src/lib/firebase.ts` แล้ว
> งานที่เหลือต้องใช้ `firebase-admin` ฝั่ง server เพื่อ verify ID token และตั้ง custom claim `role: 'ADMIN'`
> ให้ตรงกับที่ `firestore.rules` / `storage.rules` ตรวจ — service account key เป็นความลับจริง ห้าม commit

- [x] **auth guard หน้า `/admin`** — `src/app/admin/layout.tsx` เป็น server component เรียก `requireAdmin()` · ทดสอบจริง ทุกหน้าคืน **307 → /login?next=/admin** (ก่อนแก้ได้ 200 เต็มหน้า) · UI เดิมย้ายไป `src/components/admin/admin-shell.tsx` ไม่เปลี่ยน markup
- [x] session ฝั่ง server แหล่งเดียว — `src/lib/session.ts` (`getSession`/`requireUser`/`requireAdmin`) อ่าน cookie `__session` แล้ว `verifySessionCookie(checkRevoked=true)` · **ลบ `src/lib/auth.ts` ทิ้งแล้ว**
- [x] ตั้ง custom claim `role` + verify ฝั่ง server — `scripts/set-admin-claim.mjs` และ `POST /api/auth/session` ที่ `verifyIdToken(checkRevoked)` + บังคับว่าต้องเพิ่งล็อกอินภายใน 5 นาที
- [x] **ปิดทางเลี่ยงที่หน้า login** — ของเดิมมี dropdown เลือก role เองและปุ่ม "Quick Prototype Sign-in" ที่ `router.push('/admin')` โดยไม่ต้องกรอกอะไรเลย ตัดออกทั้งคู่ เปลี่ยนเป็น `signInWithEmailAndPassword` แล้วแลกเป็น session cookie
- [ ] deploy `firestore.rules` ขึ้น project จริง (`firebase deploy --only firestore:rules`) — ยังไม่ขึ้น แต่ตรวจแล้วว่า default rules ของ DB ปิดอยู่ (REST probe โดยไม่ล็อกอิน คืน 403 PERMISSION_DENIED)
- [ ] ลบตัวตน hardcode ที่กระจายอยู่ (`alex.mercer@example.com` ใน `src/app/dashboard/page.tsx:9`, `settings/page.tsx:8`, `orders/[id]/page.tsx:74`) — guard ปิดการเข้าถึงได้แล้ว แต่ข้อมูลที่โชว์ยังเป็น mock ไม่ใช่ของผู้ใช้ที่ล็อกอินจริง
- [x] guard หน้า `/dashboard/*` — `src/app/dashboard/layout.tsx` เรียก `requireUser()` · ทดสอบจริง **307 → /login?next=/dashboard** (ส่วน "เห็นได้แต่ข้อมูลของตัวเอง" รออยู่ในข้อ hardcode ด้านบน)
- [ ] route handler ที่เหลือใน `src/app/api/` เช็คสิทธิ์ฝั่ง server เอง (`checkout`, `downloads`, `contact` ยังไม่เช็ค · `auth/session` เช็คแล้ว + validate ด้วย zod)
- [ ] `src/app/api/webhooks/route.ts` ตรวจลายเซ็น webhook ไม่ใช่เชื่อ payload
- [ ] auditor ผ่าน 0 critical/high ก่อนปิด Phase

**ต้องทำก่อนใช้หลังบ้านได้จริง:** สร้าง service account key แล้วตั้ง `GOOGLE_APPLICATION_CREDENTIALS` (ดู `.env.example`) → สมัครบัญชีที่ `/register` → รัน `node scripts/set-admin-claim.mjs <email>` → ออกจากระบบแล้วเข้าใหม่
> ถ้าไม่มี credential guard จะ redirect ทุกคนออกเสมอ — เป็น fail-closed ตามเจตนา ไม่ใช่บั๊ก

## Phase 2: Data Layer ของจริง [TODO]
เป้า: 1 โดเมน = 1 แหล่งข้อมูล และของที่ต้องคงอยู่ต้องไม่หายตอน restart

> **ตัดสินใจแล้ว (2026-10-08):** ใช้ **Cloud Firestore** เป็น data layer และ **Cloud Storage** เก็บไฟล์
> ตั้งค่าไว้ที่ `firebase.json`, `firestore.rules`, `storage.rules` แล้ว (ยังไม่ deploy)
> ผลที่ตามมา: **Prisma กลายเป็นของที่ต้องลบออก** ไม่ใช่ของที่ต้องต่อ

- [ ] ลบ Prisma ออก (`prisma/`, `src/lib/database.ts`, dependency `prisma` + `@prisma/client`) — schema 10 model ไม่มีใคร import อยู่แล้ว แต่ให้ `planner` อนุมัติก่อนลบ และเก็บ schema ไว้เป็นอ้างอิงตอนออกแบบ collection ของ Firestore
- [ ] ออกแบบ collection ของ Firestore (planner) → เขียนกฎจริงใน `firestore.rules` แทน block ตัวอย่างที่คอมเมนต์ไว้
- [ ] ย้ายข้อมูลสินค้า/ออเดอร์จาก mock array ไป Firestore (`src/lib/store.ts`)
- [ ] ผลงาน/บทความ **คงไว้เป็น MDX** — เป็นเนื้อหาจริงที่ version ไปกับ git ดีกว่าอยู่ใน DB
- [ ] download token ใน `src/lib/storage.ts` ย้ายออกจาก in-memory (ลูกค้าที่จ่ายเงินแล้วจะโหลดไฟล์ไม่ได้หลัง restart)
- [ ] ราคา/ส่วนลด/license multiplier คำนวณซ้ำฝั่ง server ไม่เชื่อค่าจาก client
- [ ] ต่ออีเมลจริงที่ `src/lib/email.ts` (ตอนนี้ `console.log` อย่างเดียว) — มี `RESEND_API_KEY` ใน `.env.example` แล้ว

## Phase 3: Consistency Pass [TODO]
เป้า: เก็บรายละเอียดที่คนเห็นแล้วรู้ทันทีว่ายังไม่เสร็จ
- [ ] **สกุลเงินเป็น `฿` (THB) ทั้งเว็บ** — admin ใช้ `$18,420`/`$99` แต่ `src/lib/store.ts` และ dashboard เป็นบาท
- [ ] **สะกดชื่อเจ้าของเว็บให้ตรงกัน** — `src/lib/translations.ts:19,42,65` ใช้ "แก้วกุลพิสิษฐ" / `src/app/layout.tsx` metadata ใช้ "แก้วกุลพิสิฐ" → **ต้องถามเจ้าของเว็บว่าอันไหนถูก**
- [ ] i18n coverage ครบ — key ฝั่ง `th` กับ `en` เท่ากัน และไม่มีข้อความ hardcode ใน JSX
- [ ] ไม่มี hex สีเขียนตรงใน JSX — ใช้ token จาก `tailwind.config.ts`
- [ ] ตัวเลข mock ที่โชว์หน้า public ต้องไม่ดูเหมือนสถิติธุรกิจจริง
- [ ] ตรวจ dark mode ทุกหน้า (`darkMode: 'class'`) และ padding ล่างไม่ถูก `BottomNav` บัง

## Phase 4: Refactor & Performance [TODO]
เป้า: ลดหนี้โครงสร้างที่ทำให้แก้งานต่อยาก
- [ ] แตก `src/app/page.tsx` (1,896 บรรทัด, client component เดียว) เป็น section components — มี `src/components/sections/` (hero, featured-projects, testimonials) เขียนไว้แล้วแต่ยังไม่ถูกใช้
- [ ] ลดสัดส่วน `'use client'` (ปัจจุบัน 43 จาก 56 หน้า)
- [ ] ตัดสินใจเรื่อง `src/components/layout/mobile-frame.tsx` ที่เขียนแล้วไม่ถูกเรียกใช้ — ใช้หรือลบ
- [ ] ประเมิน `images.unoptimized: true` ใน `next.config.ts` ที่ปิด image optimization ทั้งเว็บ
- [ ] ล้างไฟล์ตกค้างคนละ stack: `vite.config.js`, `server.js`, `legacy-express/`, `README.md` ที่ยังเป็น template React+Vite
- [ ] ล้าง dependency ที่ไม่ใช้: `express`, `cors`, `vite`, `@vitejs/plugin-react`, `@rolldown/plugin-babel`
- [ ] error handling ของ `src/app/api/github/route.ts` (rate limit / timeout / 404)
- [ ] ประเมินเปิด image optimization กลับ — App Hosting รองรับ `next/image` เต็มรูปแบบ ต่างจาก static export

## Phase 5: Deploy [แบ่ง 2 ขั้น]
เป้า: เว็บขึ้น production — static ก่อน แล้วย้ายไป SSR

### 5a. Firebase Hosting แบบ static [READY — ยังไม่ deploy]
ตั้งค่าครบและทดสอบผ่าน hosting emulator แล้ว รอแค่สั่ง deploy
- site `phisitcode` ใน `firebase.json` → `public: "out"`, `cleanUrls: true`
- `npm run build:static` → `out/` 643 ไฟล์ (ตรวจแล้ว: `/`, `/code/[slug]`, `/work/[slug]`, `sitemap.xml`, `robots.txt` คืน 200)
- `npm run deploy:hosting` = build:static + `firebase deploy --only hosting:phisitcode`
- สลับโหมดด้วย `BUILD_TARGET=static` ใน `next.config.ts` — build ปกติยังมี SSR + route handler ครบ
- `scripts/build-static.mjs` ปิด `src/app/api` ชั่วคราว (เป็น `_api`) แล้วคืนกลับอัตโนมัติ จึงไม่ต้องลบโค้ด API
- **ข้อจำกัดที่ยอมรับไว้:** 5 route handler ใช้ไม่ได้ (contact/checkout/downloads/translate-keystroke/webhooks) และ `/dashboard/orders/[id]` prerender ได้แค่ id ที่ hardcode ไว้

### 5b. ย้ายไป Firebase App Hosting (SSR) [BLOCKED]
เตรียม `apphosting.yaml` ไว้แล้ว (runConfig + env 9 ตัว, secret ปิดคอมเมนต์ไว้)
ตอนย้าย: build ปกติ (ไม่ต้องตั้ง `BUILD_TARGET`) ลบ `src/app/dashboard/orders/[id]/layout.tsx` ได้ และ API กลับมาทำงานทันที

**ติดอยู่ที่ 3 เรื่องซึ่งต้องให้เจ้าของเว็บทำเอง:**
- [ ] อัปเกรด project `my--project-adc0e` เป็นแผน **Blaze** — App Hosting ใช้บน Spark ไม่ได้ (CLI ยืนยันแล้ว)
- [x] push โค้ดขึ้น **GitHub** — เสร็จ 2026-10-09: `easy-web-p/my-portfolio` branch `main`
- [ ] `firebase init apphosting` เพื่อสร้าง backend และผูก repo/branch — เป็น interactive CLI ต้องรันเอง

หลังสร้าง backend เสร็จ:
- [ ] แก้ `NEXT_PUBLIC_SITE_URL` ใน `apphosting.yaml` เป็นโดเมนจริงที่ App Hosting ให้มา
- [ ] เก็บ `RESEND_API_KEY` เข้า Secret Manager (`firebase apphosting:secrets:set`) แล้วเปิดคอมเมนต์ส่วน secret ใน `apphosting.yaml`
- [ ] เพิ่มโดเมนจริงเข้า Authorized domains ของ Firebase Auth ไม่งั้น login จะถูกปฏิเสธ

---

## บันทึกการเปลี่ยนลำดับ
| วันที่ | เปลี่ยนอะไร | ใครอนุมัติ |
|---|---|---|
| 2026-10-08 | สร้าง roadmap ตั้งต้นจากผลสำรวจโค้ดจริง | — (รอเจ้าของเว็บยืนยันลำดับ) |
