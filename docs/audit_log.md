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

---

## [2026-10-09] ปิด finding ระดับ Critical — Phase 1

### หลักฐานที่รัน
| คำสั่ง | ผล |
|---|---|
| `curl` (ไม่ส่ง cookie) ไปยัง `/admin`, `/admin/orders`, `/admin/settings` | **307 → `/login?next=%2Fadmin`** ทั้งหมด (ก่อนแก้: 200 พร้อมเนื้อหาเต็ม) |
| เดียวกันกับ `/dashboard`, `/dashboard/downloads` | **307 → `/login?next=%2Fdashboard`** |
| `/` และ `/login` | 200 (หน้า public ไม่กระทบ) |
| `npm run build` | 22 หน้าใต้ `/admin` + 5 หน้าใต้ `/dashboard` เปลี่ยนจาก `○` static เป็น `ƒ` dynamic |
| `npx tsc --noEmit` | 0 error |

### แก้แล้ว
- **[critical] `src/app/admin/layout.tsx` ไม่มี guard** → ปิดแล้ว
  layout เป็น server component เรียก `requireAdmin()` จาก `src/lib/session.ts`
  UI เดิมย้ายไป `src/components/admin/admin-shell.tsx` โดยไม่เปลี่ยน markup
  role อ่านจาก custom claims เท่านั้น ให้ตรงกับที่ `firestore.rules` ตรวจ (`request.auth.token.role`)

- **[high] `src/lib/auth.ts` คืน role `ADMIN` ตายตัว** → ลบไฟล์ทิ้ง (ไม่มีใครอ้างถึง)

- **[high — ไม่เคยถูกบันทึก เจอตอนทำ Phase 1] หน้า login เป็นทางเลี่ยง guard**
  ของเดิมมี dropdown ให้ผู้ใช้เลือกว่าจะเป็น admin แล้ว `router.push('/admin')` ตรงๆ
  และมีปุ่ม "Quick Prototype Sign-in → 🛡️ Admin Console" ที่เข้าหลังบ้านได้โดยไม่ต้องกรอกอะไรเลย
  → ตัดออกทั้งคู่ เปลี่ยนเป็นล็อกอินจริงแล้วแลก ID token เป็น session cookie แบบ httpOnly

- **[high] ไม่มี session จริง** → `POST/DELETE /api/auth/session`
  ใช้ cookie ชื่อ `__session` เพราะ CDN ของ Firebase Hosting / App Hosting
  ตัด cookie ทุกตัวทิ้งยกเว้นชื่อนี้ — ตั้งชื่ออื่นจะทำงานตอน dev แต่พังเงียบๆ บน production

### ยังค้าง (High)
- ตัวตนใน `/dashboard/*` ยัง hardcode `alex.mercer@example.com` แยกจาก session จริง (เข้าถึงถูกกั้นแล้ว แต่ข้อมูลที่โชว์ยังเป็น mock)
- `src/app/api/webhooks/route.ts` ยังไม่ตรวจลายเซ็น
- route handler `checkout` / `downloads` ยังไม่เช็คสิทธิ์ฝั่ง server
- `firestore.rules` ยังไม่ deploy (default rules ของ DB ปิดอยู่ — probe คืน 403)

### หมายเหตุสำหรับ auditor รอบถัดไป
Phase นี้ **ยังปิดไม่ได้** เพราะยังมี high ค้าง 4 ข้อ
และยังไม่มีใครตรวจงานชุด Stripe (`src/lib/stripe.ts`, `checkout-orders.ts`, `api/checkout/status`, `stripe-payment-*.tsx`) ที่เข้ามาโดยไม่ผ่าน reviewer

---

## [2026-10-09 รอบ 2] ตรวจงานชุด Stripe + ปิด Phase 1 ส่วนที่เหลือ

### แก้ finding ที่บันทึกผิดไว้เอง
บันทึกรอบก่อนอ้างโค้ดเวอร์ชันก่อนที่งาน Stripe จะเข้ามา ตรวจของจริงใหม่แล้วพบว่า **สองข้อนี้ไม่เป็นความจริง**:

- ~~`src/app/api/webhooks/route.ts` ไม่ตรวจลายเซ็น~~ → **ตรวจอยู่แล้ว**
  ใช้ `getStripeClient().webhooks.constructEvent(payload, signature, webhookSecret)`
  อ่าน body ด้วย `request.text()` (ถูกต้อง ต้องเป็น raw body) · ไม่มี secret → 400 · ลายเซ็นผิด → 400
  และ fulfilment ขับด้วย webhook ที่ verify แล้วเท่านั้น ไม่เชื่อการยืนยันจากเบราว์เซอร์

- ~~`src/app/api/checkout/route.ts` ไม่เช็คสิทธิ์ฝั่ง server~~ → **ประเมินผิดตั้งแต่ต้น**
  นี่เป็น flow ซื้อแบบ guest จึงไม่ต้องล็อกอิน สิ่งที่ต้องมีคือ "ไม่เชื่อราคาจาก client"
  ซึ่งทำถูกแล้ว: ราคาคำนวณฝั่ง server จาก `STORE_PRODUCTS` + `calculateProductPrice`
  รับจาก client แค่ `productId` / `license` / `quantity` · validate ด้วย zod ครบ
  และเช็กว่าไฟล์สินค้ามีอยู่จริงใน bucket **ก่อน** สร้าง PaymentIntent (ไม่รับเงินของที่ส่งไม่ได้)

**บทเรียน:** กฎ "ไม่เชื่อ log เปล่าๆ" ใน `.claude/agents/` ใช้กับ log ที่ Claude เขียนเองด้วย

### แก้แล้วรอบนี้
- **[high] `/api/downloads` หักโควตาหลังดึงไฟล์** → สลับลำดับแล้ว
  ของเดิม `file.download()` ดึงไฟล์ทั้งก้อน (สินค้าใหญ่สุด 18.4 MB) มาก่อน แล้วค่อย
  `consumeDownloadEntitlement()` ทำให้ลิงก์ที่โควตาหมดหรือหมดอายุยังสั่งให้ server
  ดึงไฟล์จาก Storage ซ้ำได้ไม่จำกัดก่อนได้ 403 — เป็นช่องขยายภาระและค่า egress
  ตอนนี้: `exists()` → หักโควตา → ค่อยดึงไฟล์

- **[high] หน้า `/register` ไม่สร้างบัญชีจริง** → ต่อ `createUserWithEmailAndPassword` แล้ว
  ของเดิมเป็น `setTimeout` แล้ว `router.push('/dashboard')` ซึ่งพอมี guard แล้วกลายเป็น
  ทางตัน: สมัครเสร็จถูกเด้งกลับ `/login` ทันที

- **[high] ไม่มีทางออกจากระบบเลย** → `src/components/auth/sign-out-button.tsx`
  วางใน `/dashboard/settings` และ admin topbar · เรียกทั้ง `DELETE /api/auth/session`
  (ลบ cookie + revoke) และ `signOut()` ของ SDK — ขาดข้อหลัง SDK จะต่อ session ใหม่ให้เงียบๆ

- **[medium] ตัวตนใน `/dashboard/*` hardcode** → อ่านจาก session จริงแล้วผ่าน
  `src/components/dashboard/session-context.tsx` ที่ server layout ป้อนค่าลงมา
  แก้ 3 ไฟล์: `dashboard/page.tsx`, `settings/page.tsx`, `orders/[id]/page.tsx`
  ลบที่อยู่ปลอม "Bangkok, Thailand" ออกจากใบเสร็จด้วย เพราะไม่มีข้อมูลจริง

### Finding ใหม่ที่ยังไม่แก้ (ต้องยืนยันก่อน)
- **[ต้องตรวจก่อน go-live] cookie ต่อออเดอร์อาจถูก CDN ตัดทิ้ง**
  `checkoutAccessCookieName()` คืนชื่อ `phisit_checkout_<reference>` (`src/lib/checkout-orders.ts:117`)
  Firebase Hosting ที่มี SSR **ตัด cookie ทุกตัวทิ้งยกเว้นชื่อ `__session`** และใช้ `__session`
  เป็นส่วนของ cache key — ถ้าพฤติกรรมนี้ใช้กับ App Hosting ด้วย ลูกค้าที่จ่ายเงินแล้วจะ
  ดาวน์โหลดไม่ได้ เพราะ `/api/downloads` กับ `/api/checkout/status` จะไม่เห็น cookie
  แล้วตอบ 403 / 404
  เอกสารที่หาได้ยืนยันเฉพาะ Hosting แบบเดิม **ยังไม่ยืนยันสำหรับ App Hosting**
  จึงยังไม่รื้อโค้ด — ต้องทดสอบซื้อจริงหนึ่งรายการบน App Hosting ก่อนเปิดขาย
  (บน Hosting แบบ static ที่ deploy ไปแล้วไม่กระทบ เพราะ static export ไม่มี route handler เลย)

- **[low] `/api/downloads` โหลดไฟล์ทั้งก้อนเข้าหน่วยความจำ**
  `file.download()` แล้วทำ `new Uint8Array(...).buffer` — สินค้า 18.4 MB บน Cloud Run
  ที่ตั้ง `memoryMiB: 512` และ `concurrency: 80` เสี่ยงหน่วยความจำเต็มถ้ามีคนโหลดพร้อมกัน
  ควรเปลี่ยนเป็น stream

### สถานะ Phase 1
critical: **0** · high ที่ยังค้าง: **1** (deploy `firestore.rules`)
ยังปิด Phase ไม่ได้จนกว่าจะ deploy rules และยืนยันเรื่อง cookie บน App Hosting
