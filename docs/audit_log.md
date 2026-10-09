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

---

## [2026-10-09 รอบ 3] Phase 2 — Data Layer

### หลักฐานที่รัน
| คำสั่ง | ผล |
|---|---|
| `grep -rn "getFirebaseDb\|getFirebaseStorage" src` (ตัดไฟล์นิยาม) | **ไม่พบการเรียกเลย** — ไม่มีโค้ด client แตะ Firestore/Storage |
| `grep -rn "from '@/lib/storage'" src` | ไม่พบ — โมดูลตาย |
| `grep -rn "from '@/lib/payments'" src` | ไม่พบ — โมดูลตาย |
| `grep -rn "@prisma/client\|lib/database" src` | พบแต่ `database.ts` ที่ import ตัวเอง ไม่มีใคร import มัน |
| `grep -rln "from '@/lib/store'" src` | **14 ไฟล์** |
| `firebase deploy --only firestore --dry-run` | rules compiled successfully |
| `npx tsc --noEmit` / `npm run build` | 0 error / สำเร็จ |

### แก้แล้ว
- **[medium] Prisma ที่ถูกทิ้ง** → ถอนออกหมด: `prisma/`, `src/lib/database.ts`, dependency `prisma` + `@prisma/client`
  schema เก็บเป็นเอกสารที่ `docs/reference/legacy-prisma-schema.prisma` เพราะการออกแบบ
  ความสัมพันธ์ยังมีประโยชน์ตอนออกแบบ collection
  ปิด finding "SQLite ใช้บน serverless ไม่ได้" ไปด้วยโดยปริยาย

- **[high] `src/lib/storage.ts` เก็บ download token ใน memory (หายตอน restart)** → **ลบไฟล์ทิ้ง**
  ไม่ใช่แก้ให้ persist แต่พบว่ามันตายไปแล้ว — ถูกแทนด้วย `src/lib/checkout-orders.ts`
  ที่เก็บใน Firestore พร้อม transaction หักโควตา ไม่มีใคร import `storage.ts` เลย
  ลบ `src/lib/payments.ts` ที่ตายเหมือนกันไปด้วย

- **[medium] UI หลังบ้านแสดงข้อมูลเท็จ** → แก้แล้ว
  `/admin/settings` แสดง "Prisma SQLite ORM Storage · Database: file:./dev.db (Healthy)"
  และ topbar แสดง "Prisma SQLite Synced · All database models healthy"
  ทั้งสองไม่เป็นความจริงเลยตั้งแต่ต้น (Prisma ไม่เคยถูกใช้) เปลี่ยนเป็น Cloud Firestore
  พร้อมชื่อ collection จริง

- **[medium] `firestore.rules` / `storage.rules` มีแต่ตัวอย่างที่คอมเมนต์ไว้** → เขียนกฎจริง
  ครอบ `checkoutOrders/{reference}`, `downloads/{token}`, `stripeWebhookEvents/{eventId}`
  และ `products/{fileName}` ของ Storage
  **ข้อสรุปสำคัญ: กฎที่ถูกต้องคือปฏิเสธฝั่ง client ทั้งหมด** — ไม่ใช่เพราะขี้เกียจ
  แต่เพราะ (ก) ไม่มีโค้ด client แตะ Firestore เลย (ข) Admin SDK ไม่ถูกตรวจด้วย rules
  (ค) สิทธิ์ดาวน์โหลดขึ้นกับโควตา/วันหมดอายุที่ต้องหักแบบ atomic ซึ่ง rules ทำแทนไม่ได้
  (ง) เอกสารออเดอร์เก็บ `accessToken` ถ้าอ่านได้ = แจกสิทธิ์ดาวน์โหลด
  เขียนแบบเจาะจงต่อ collection เพื่อประกาศเจตนา ไม่ปล่อยให้ catch-all จับเงียบๆ

### ตัดสินใจทวนแผน — ไม่ย้ายสินค้าไป Firestore
roadmap เดิมสั่งย้าย `STORE_PRODUCTS` เข้า Firestore ตรวจแล้วว่าจะเสียมากกว่าได้:
ถูกใช้ 14 ไฟล์รวม client component · `sitemap.ts` กับ `generateStaticParams` รันตอน build
จึงต้องมี admin credential ตอน build · และ**พัง static export ที่ deploy ลง Hosting ไปแล้ว**
สินค้า 5 ชิ้นที่แทบไม่เปลี่ยนคือเนื้อหา เหมือน MDX ที่ตัดสินใจเก็บใน git ด้วยเหตุผลเดียวกัน
บันทึกเหตุผลไว้ใน `docs/architecture_doc.md` หัวข้อ 4

### สถานะ
Phase 2: **เสร็จ** (ปรับขอบเขตตามที่ตรวจพบ)
Phase 1: critical 0 · high ค้าง 1 — `firebase deploy --only firestore:rules` (ตอนนี้มีกฎจริงให้ deploy แล้ว)
ค้างข้ามเฟส: เรื่อง cookie `phisit_checkout_<ref>` กับ CDN ที่ต้องทดลองซื้อจริงบน App Hosting

---

## [2026-10-09 รอบ 4] Phase 3 — Consistency

### สองข้อปิดไปเองแล้ว (ตรวจซ้ำก่อนลงมือ)
- **สะกดชื่อเจ้าของเว็บ** — baseline บอกว่าขัดกันระหว่าง `translations.ts` กับ `layout.tsx`
  ตรวจใหม่: "แก้วกุลพิสิฐ" 24 จุด · "แก้วกุลพิสิษฐ" **0 จุด** → ตรงกันแล้ว ไม่ต้องถามเจ้าของเว็บ
- **i18n key ขาด** — นับแล้ว th 158 = en 158 ไม่มีฝั่งใดขาด

### แก้แล้ว
- **สกุลเงิน** — 14 จุดใน 3 ไฟล์หลังบ้านเปลี่ยน `$` → `฿` ให้ตรงกับ `src/lib/store.ts` ที่ตั้งราคาเป็นบาท
- **เงาแข็ง 81 จุด → token** `shadow-hard-1..8` ใน `tailwind.config.ts`
  ค่า `#141b2b` คือ token `on-secondary-fixed` อยู่แล้ว แต่ถูกเขียนเป็น hex กระจาย 81 จุด
  เพราะ Tailwind arbitrary value ของ box-shadow ต้องใส่สีตรงๆ
  **ยืนยันว่าไม่กระทบหน้าตา:** อ่าน CSS ที่ build ออกมาแล้วพบ `--tw-shadow:3px 3px 0px #141b2b` ฯลฯ
  ตรงกับของเดิมทุกขนาด · `hard-1` และ `hard-5` ปรากฏเฉพาะรูป variant (`active:` / `hover:`)
  เพราะใน JSX ใช้แค่แบบนั้น ซึ่งถูกต้อง
- `text-[#131f00]` → `text-on-tertiary-fixed` (ค่าตรงกับ token อยู่แล้ว)

### ประเมิน finding เดิมของตัวเองใหม่: "hex ใน JSX 157 จุด"
เป็น false positive เกือบทั้งหมด แยกได้เป็น:
| กลุ่ม | จำนวน | สรุป |
|---|---|---|
| เงาแข็ง `shadow-[Npx...#141b2b]` | 81 | **แก้แล้ว** เป็น token |
| SVG `fill=` / `stroke=` และสีใน canvas/JS | 19 | **เป็น token ไม่ได้** ต้องเป็นค่าสีจริง |
| สีนอกพาเลต (`#1a1c1a` 12, `#111827` 10, one-off 4) | 26 | ยังค้าง ต้องตั้งชื่อ token ใหม่ก่อน |
| ตรงกับ token อยู่แล้ว | 1 | **แก้แล้ว** |

กฎที่ผมเขียนไว้ใน `.claude/agents/06-auditor.md` ว่า `grep '#[0-9a-f]{6}'` = finding
หยาบเกินไป ควรแยกให้ออกว่าอันไหนเป็น Tailwind class อันไหนเป็น SVG/canvas

### รอเจ้าของเว็บตัดสิน — ไม่แก้เอง (เป็นเนื้อหา/การตลาด ไม่ใช่บั๊ก)
- **[high] `src/lib/store.ts` ใส่ rating/reviewCount ปลอมให้สินค้าทุกชิ้น**
  เช่น `rating: 4.9, reviewCount: 38` และ `rating: 5.0, reviewCount: 52`
  แสดงบน `/code` ซึ่งเป็นหน้าขายของสาธารณะ = โชว์รีวิวที่ไม่มีอยู่จริงให้คนที่กำลังจะจ่ายเงิน
  ข้อเสนอ: ซ่อนส่วนแสดงดาว/จำนวนรีวิวไว้จนกว่าจะมีรีวิวจริง

- **[medium] `src/components/sections/testimonials.tsx` มีคำนิยมจากบุคคลที่ไม่มีตัวตน**
  "VP of AI Product, Synthetix Systems" · "Design Director, Kinetic Labs Tokyo"
  **ยังไม่ถูกใช้ในหน้าใดเลย** แต่เป็นระเบิดเวลา ถ้ามีคน (หรือ agent) ต่อเข้าหน้าแรกตอนรีแฟคเตอร์ Phase 4
  ข้อเสนอ: ลบทิ้ง หรือเปลี่ยนเป็นคำนิยมจริงที่ขออนุญาตแล้ว

### สถานะ
Phase 3: ส่วนที่วัดได้เสร็จหมด · ค้าง 2 เรื่องที่เป็นการตัดสินใจของเจ้าของเว็บ + hex 26 จุดที่ต้องตั้งชื่อ token
`npx tsc --noEmit` 0 error · `npm run build` สำเร็จ
