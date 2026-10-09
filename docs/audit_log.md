# my-portfolio — Security & Architecture Audit Log

---

## [2026-10-08] Baseline Survey — ก่อนเริ่ม Phase 0

**ผู้ตรวจ:** session ที่ตั้งค่าทีม agent (ไม่ใช่ `auditor` agent) — ถือเป็น **baseline ตั้งต้น** ไม่ใช่ audit เต็มรูปแบบ
`auditor` รอบแรกต้องตรวจซ้ำทั้ง 3 มิติเองและไม่เชื่อรายการนี้โดยไม่ยืนยัน

### หลักฐานที่รันจริง
| คำสั่ง / วิธี | ผล |
|---|---|
| `curl -s -o /dev/null -w "%{http_code}"` ไปยัง `/admin` + 21 หน้าย่อย โดยไม่ส่ง cookie | **200 ทุกหน้า** พร้อมเนื้อหาเต็ม |
| เดียวกันกับ `/dashboard`, `/dashboard/{orders,downloads,settings}`, `/dashboard/orders/ORD-100001` | 200 ทุกหน้า |
| `grep -rn "from '@/lib/database'\|prisma\." src` | **ไม่พบผลลัพธ์เลย** |
| `grep -rn "MobileFrame" src` (ตัดไฟล์นิยามออก) | ไม่พบการเรียกใช้ |
| `grep -rl "use client" src/app --include=*.tsx \| wc -l` เทียบกับจำนวน `page.tsx` | 43 / 56 |
| `wc -l src/app/page.tsx` | 1,896 บรรทัด |
| `ls -d .git` | ไม่มี — ยังไม่ใช่ git repo |

### Critical
- **`src/app/admin/layout.tsx` : ไม่มี guard ใดๆ** → ทั้ง 22 หน้า admin เปิดให้ทุกคนเข้าโดยไม่ต้องล็อกอิน ยืนยันด้วย request ที่ไม่มี cookie ได้ 200 เต็มหน้า
  → ทำ route guard เป็น server component + `redirect()` และเช็คสิทธิ์ซ้ำในทุก route handler (Phase 1)

### High
- **`src/lib/auth.ts:9-15` : `CURRENT_MOCK_USER` คืน role `ADMIN` ตายตัว** และ `getSession()` ไม่อ่าน request เลย → ใช้เป็นฐานของสิทธิ์ไม่ได้
- **ตัวตนผู้ใช้มี 2 แหล่งความจริงที่ไม่ตรงกัน** — admin แสดง `Phisit Kaewkulphisit / Admin Owner` ขณะที่ dashboard hardcode `alex.mercer@example.com` / `cst_78201` แยกใน 3 ไฟล์: `src/app/dashboard/page.tsx:9`, `src/app/dashboard/settings/page.tsx:8`, `src/app/dashboard/orders/[id]/page.tsx:74` และไม่มีไฟล์ไหนอ่านจาก `src/lib/auth.ts`
- **`src/lib/storage.ts` : download token เก็บใน object ใน memory** → หายทุกครั้งที่ restart/cold start ลูกค้าที่จ่ายเงินแล้วจะโหลดไฟล์ไม่ได้
- **ยังไม่ใช่ git repo** → ไม่มีประวัติ กู้คืนไม่ได้ และ `reviewer` ไม่มี diff ให้ตรวจ ทำให้ flow ของทีมทำงานไม่เต็มรูปแบบ
- **ต้องยืนยันเพิ่ม:** `src/app/api/webhooks/route.ts` รับ event จาก `request.json()` แล้วตอบ `fulfilled` โดยไม่เห็นการตรวจลายเซ็นในส่วนที่อ่าน — `auditor` ต้องอ่านทั้งไฟล์และยืนยันก่อนตีเป็น critical
- **ต้องยืนยันเพิ่ม:** `src/app/api/checkout/route.ts` รับ `items` จาก body แล้วออก download token — ต้องตรวจว่าคำนวณราคา/ตรวจสิทธิ์ซ้ำฝั่ง server หรือเชื่อค่าจาก client

### Medium
- **Prisma ถูกทิ้ง** — `prisma/schema.prisma` นิยาม 10 model (User, Product, ProductVersion, License, Order, OrderItem, Download, Post, Customer, ActivityLog) และ `src/lib/database.ts` สร้าง client ไว้ แต่ `grep` ทั้ง repo ไม่พบการ import → ต้องตัดสินใจ: ต่อของจริง หรือลบออก (Phase 2)
- **SQLite กับ serverless** — `datasource db { url = "file:./dev.db" }` ใช้บน Vercel ไม่ได้จริง ถ้าเลือกต่อ Prisma ต้องเปลี่ยน provider
- **แหล่งข้อมูลซ้อนกัน** — สินค้าอยู่ทั้ง `src/lib/store.ts` (mock) และ Prisma `Product`; บทความอยู่ทั้ง MDX (`src/lib/blog.ts`) และ Prisma `Post`
- **`src/lib/email.ts` : ยัง `console.log` เท่านั้น** ไม่ส่งอีเมลจริง แต่ `src/app/api/contact/route.ts` ตอบ success กลับไป → ผู้ส่งเข้าใจว่าข้อความถึงแล้ว ทั้งที่ไม่ถึง
- **สกุลเงินปนกัน** — admin โชว์ `$18,420` / `$99` แต่ `src/lib/store.ts` ตั้งราคาเป็นบาท (990) และ dashboard โชว์ `฿1,780`
- **สะกดชื่อเจ้าของเว็บไม่ตรงกัน** — `src/lib/translations.ts:19,42,65` ใช้ "พิสิษฐ์ แก้วกุล**พิสิษฐ**" / `src/app/layout.tsx` metadata ใช้ "พิสิษฐ์ แก้วกุล**พิสิฐ**" → ต้องถามเจ้าของเว็บ ห้ามเลือกเอง
- **`'use client'` มากเกินจำเป็น** — 43 จาก 56 หน้า ทำให้เสีย benefit ของ server component
- **`src/app/page.tsx` 1,896 บรรทัดเป็น client component เดียว** ขณะที่ `src/components/sections/` (hero, featured-projects, testimonials) เขียนไว้แล้วแต่หน้าแรกไม่ได้ใช้
- **`next.config.ts` : `images.unoptimized: true`** ปิด image optimization ทั้งเว็บ กระทบ LCP

### Low
- `src/components/layout/mobile-frame.tsx` เขียนครบแต่ไม่มีใครเรียกใช้ (dead component)
- ไฟล์/dependency ตกค้างคนละ stack: `vite.config.js`, `server.js`, `legacy-express/`, `README.md` ยังเป็น template React+Vite, และ `express`/`cors`/`vite`/`@vitejs/plugin-react`/`@rolldown/plugin-babel` ยังอยู่ใน `package.json`
- `portfolio-doc.pdf` 55 MB และ `tsconfig.tsbuildinfo` 245 KB อยู่ใน root — ไม่ควร track เข้า git
- `src/app/api/github/route.ts` เรียก GitHub API ภายนอก (user `easy-web-p`) — ต้องตรวจ error handling เรื่อง rate limit / timeout

### Migration Plan
ยังไม่มี — รอ `auditor` รอบแรกยืนยัน finding แล้วเสนอแผนให้ `planner` อนุมัติ โดยเฉพาะเรื่อง Prisma (Phase 2)

### สรุปต่อ Stopping Criteria
**ไม่ผ่าน** — มี 1 critical และ 5 high ค้างอยู่ ห้ามปิด Phase ใดจนกว่าจะเคลียร์

---

## [2026-10-08] Finding เพิ่มจากการตั้งค่า Firebase Hosting

**หลักฐาน:** probe `out/` ผ่าน hosting emulator (port 5000)

### High
- **`/admin` และ `/dashboard/*` ถูก export เป็น HTML สาธารณะ** — `GET /admin` บน hosting emulator คืน **200**
  บน static hosting ไม่มี server ให้ทำ guard เลย จึงปิดช่องนี้ด้วยวิธีฝั่ง server ไม่ได้ **โดยสิ้นเชิง**
  ตอนนี้ยังไม่รั่วข้อมูลจริงเพราะหน้าพวกนั้นมีแต่ mock แต่:
  - ถ้า deploy static ตามสภาพนี้ = เปิด UI หลังบ้านให้คนทั่วไปดูได้
  - เมื่อต่อ Firestore แล้ว การซ่อนฝั่ง client จะไม่ช่วยอะไร **`firestore.rules` กลายเป็นเกราะชั้นเดียวที่เหลือ**
  → ทางเลือก: (ก) ตัด `/admin` + `/dashboard` ออกจาก static export ไม่ให้ publish เลย
    (ข) deploy static เฉพาะหน้า public แล้วรอทำหลังบ้านบน App Hosting (SSR) ที่ guard ได้จริง

### Low
- `/dashboard/orders/[id]` prerender จาก id ที่ hardcode ใน `src/app/dashboard/orders/[id]/layout.tsx`
  id อื่นจะ 404 — เป็นข้อจำกัดโดยธรรมชาติของ static hosting ไม่ใช่บั๊ก
