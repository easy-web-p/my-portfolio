# my-portfolio — Architecture Document

> ไฟล์นี้เป็นของ `planner` — ส่วน "สถานะปัจจุบัน" ด้านล่างคือผลสำรวจโค้ดจริง (2026-10-08) ใช้เป็นจุดตั้งต้น
> ส่วนที่เขียนว่า **TBD** ยังไม่มีใครตัดสินใจ `planner` ต้องเติมก่อนที่ `builder` จะเริ่มงานในเรื่องนั้น

---

## 1. Stack
Next.js 16.3.4 (App Router + Turbopack) · React 19.2 · TypeScript · Tailwind CSS 3.4 (`darkMode: 'class'`) · zod 4 · gray-matter · lucide-react + Material Symbols · **Firebase 13 (Auth + Firestore + Storage)**

**Deploy:** Firebase App Hosting (SSR) — `apphosting.yaml` เตรียมไว้แล้ว ยังไม่ได้สร้าง backend (ติดแผน Blaze + ต้องมี GitHub repo)

**เลิกใช้:** Prisma 5 + SQLite — ติดตั้งอยู่แต่ไม่มีใคร import ตัดสินใจแล้วว่าจะลบออกใน Phase 2 แทนที่ด้วย Firestore

**ข้อบังคับ:** `AGENTS.md` ของ repo ระบุว่า Next.js เวอร์ชันนี้มี breaking change จาก training data — ต้องอ่าน `node_modules/next/dist/docs/` ก่อนเขียนโค้ดทุกครั้ง และอ้างอิงไฟล์ที่อ่านใน spec/PR summary

## 2. โครงเว็บ — 3 โดเมนในเว็บเดียว
| โดเมน | เส้นทาง | ผู้ใช้ |
|---|---|---|
| Portfolio | `/`, `/work`, `/work/[slug]`, `/ai-lab`, `/about`, `/resume`, `/services`, `/blog`, `/playground`, `/contact` | คนทั่วไป / ผู้ว่าจ้าง |
| Digital store | `/code`, `/code/[slug]`, `/cart`, `/checkout` (+ success/pending/failed), `/licenses`, `/faq`, `/support` | ลูกค้า |
| Customer area | `/dashboard`, `/dashboard/orders`, `/dashboard/orders/[id]`, `/dashboard/downloads`, `/dashboard/settings` | ลูกค้าที่ซื้อแล้ว |
| Admin | `/admin` + 21 หน้าย่อย | เจ้าของเว็บ |
| Auth | `/login`, `/register`, `/forgot-password`, `/reset-password` | — |
| API | `src/app/api/{checkout,contact,downloads,github,translate-keystroke,webhooks}/route.ts` | — |
| SEO | `src/app/sitemap.ts`, `src/app/robots.ts` | — |

รวม 56 `page.tsx` · 43 ไฟล์ใน `src/app` มี `'use client'`

## 3. Layout composition
`src/app/layout.tsx` ครอบทุกหน้าด้วย `LanguageProvider` → `CartProvider` → `Header` / `MainContent` / `Footer` / `BottomNav` / `CartDrawer` / `PublicCommandPalette` / `CookieBanner` / `BackgroundKeyboardTranslator`
`src/components/layout/main-content.tsx` แยกสไตล์หน้า `/admin` ออกจากหน้า public ด้วย `usePathname()`

**ประเด็นที่ planner ต้องตัดสิน (TBD):** layout ราก wrap ทุกอย่างด้วย client provider ทำให้ทั้งต้นไม้กลายเป็น client — ควรแยก layout group ของ `/admin` ออกจาก public หรือไม่

## 4. Data layer — สถานะจริงตอนนี้
| โดเมน | แหล่งข้อมูล | ไฟล์ | หมายเหตุ |
|---|---|---|---|
| ผลงาน | MDX + `fs` → **server-only** | `src/lib/projects.ts`, `src/content/projects/*.mdx` | ของจริง 5 โครงงาน มีรางวัลอ้างอิง **ห้ามแตะเนื้อหาโดยไม่ถามเจ้าของ** |
| บทความ | MDX + `fs` → server-only | `src/lib/blog.ts`, `src/content/articles/` | |
| สินค้า (catalog) | array ใน source — **เจตนา** ไม่ใช่ของค้าง | `src/lib/store.ts` | ราคาเป็น THB · ถือเป็น "เนื้อหา" แบบเดียวกับ MDX ดูเหตุผลด้านล่าง |
| AI experiments | array ใน source | `src/lib/experiments.ts` | เนื้อหา เช่นเดียวกัน |
| **คำสั่งซื้อ** | **Cloud Firestore** `checkoutOrders/{reference}` | `src/lib/checkout-orders.ts` | สถานะมาจาก Stripe webhook ที่ verify ลายเซ็นแล้วเท่านั้น |
| **สิทธิ์ดาวน์โหลด** | **Firestore** `checkoutOrders/{ref}/downloads/{token}` | เดียวกัน | โควตา + วันหมดอายุ หักแบบ atomic ใน transaction |
| **webhook idempotency** | **Firestore** `stripeWebhookEvents/{eventId}` | เดียวกัน | กันประมวลผล event ซ้ำ |
| **ไฟล์สินค้า** | **Cloud Storage** (bucket ส่วนตัว) | `src/lib/firebase-admin.ts` | server proxy ผ่าน `/api/downloads` ไม่แจก public/signed URL |
| **session / role** | **Firebase Auth** + session cookie `__session` | `src/lib/session.ts` | role จาก custom claims เท่านั้น |
| admin stats | ตัวเลข hardcode ในหน้า | `src/lib/admin.ts`, `src/app/admin/*/page.tsx` | สกุลเงินยังปน `$` (Phase 3) |

**กฎ:** 1 โดเมน = 1 แหล่งข้อมูล — ห้ามให้ข้อมูลเดียวกันมาจาก 2 ที่

### ทำไมรายการสินค้าไม่ย้ายเข้า Firestore (ตัดสินใจ 2026-10-09)
roadmap เดิมเขียนว่าจะย้าย `STORE_PRODUCTS` เข้า Firestore — ตรวจแล้วว่า**ไม่ควรทำ**:
- ถูกใช้ **14 ไฟล์** รวม client component (`cart-context.tsx`, `license-selector.tsx`, `code/[slug]/page.tsx`) ซึ่งอ่าน Firestore ฝั่ง server ไม่ได้
- `sitemap.ts` และ `generateStaticParams` ของ `/code/[slug]` รันตอน build → ต้องมี admin credential ตอน build
- **พัง static export** (`BUILD_TARGET=static`) ที่ deploy ลง Firebase Hosting ไปแล้ว
- สินค้ามี 5 ชิ้นและแทบไม่เปลี่ยน = เป็น *เนื้อหา* เหมือน MDX ที่ตัดสินใจเก็บใน git ไปแล้วด้วยเหตุผลเดียวกัน

สิ่งที่ต้องอยู่ใน DB คือข้อมูลที่เปลี่ยนตลอดและต้องคงอยู่ (ออเดอร์ / สิทธิ์ดาวน์โหลด / webhook) — **ซึ่งอยู่ใน Firestore แล้วทั้งหมด**

### ไม่มีการเข้าถึง Firestore/Storage จากฝั่ง client เลย
`getFirebaseDb()` และ `getFirebaseStorage()` ใน `src/lib/firebase.ts` ไม่ถูกเรียกจากที่ไหน
ทุกอย่างผ่าน Admin SDK ใน route handler **ซึ่ง bypass security rules** ดังนั้นกฎใน
`firestore.rules` / `storage.rules` ทำหน้าที่เดียวคือปิดประตูฝั่ง client ให้สนิท

## 5. Auth & Permission Matrix — TBD (Phase 1)
สถานะปัจจุบัน: **ไม่มี guard เลย** ทุกเส้นทางเปิดหมด ยืนยันด้วย request โดยไม่มี cookie แล้วได้ 200

`planner` ต้องเติมตารางนี้ให้ครบก่อน builder เริ่ม:

| Role | เข้าได้ | อ่านได้ | เขียนได้ |
|---|---|---|---|
| guest | TBD | TBD | TBD |
| CUSTOMER | TBD | TBD | TBD |
| ADMIN | TBD | TBD | TBD |

ต้อง spec ครบ 3 ชั้น ขาดชั้นใดถือว่าไม่สมบูรณ์:
1. Route guard ที่ `src/app/admin/layout.tsx` (server component + `redirect()`)
2. Middleware (ถ้าใช้ — อ่าน `03-file-conventions/middleware` ก่อน เพราะ convention เปลี่ยนตามเวอร์ชัน)
3. เช็คสิทธิ์ซ้ำในทุก route handler ของ `src/app/api/`

## 6. Page spec — ตาราง ✅ ควรมี / ❌ ไม่ควรมี
> `planner` เติมทีละหน้าเมื่อ cycle แตะหน้านั้น ด้านล่างคือข้อที่ตกลงกันแล้วเป็นหลักการกลาง

| หน้า | ✅ ควรมี | ❌ ไม่ควรมี |
|---|---|---|
| `src/app/page.tsx` | แนะนำตัว, ทางแยกไปโดเมนอื่น, ผลงานเด่น | flow ซื้อของเต็มรูปแบบ, ตาราง admin, ตัวเลข mock ที่ดูเหมือนสถิติธุรกิจจริง |
| `src/app/code/[slug]/page.tsx` | รายละเอียดสินค้า, เลือก license, เพิ่มลงตะกร้า | flow จ่ายเงินเต็มรูปแบบ (เป็นหน้าที่ `/checkout`) |
| `src/app/dashboard/*` | ของที่ผู้ใช้คนนั้นซื้อเท่านั้น | ปุ่มระดับ admin (แก้สินค้า/อนุมัติรีวิว), ข้อมูลของผู้ใช้คนอื่น |
| `src/app/admin/*` | จัดการเนื้อหา/คำสั่งซื้อ | `CartProvider` หรือ flow ฝั่งลูกค้า |
| หน้า public ทุกหน้า | เนื้อหาจริง, metadata, i18n ครบ th/en | ข้อมูล mock ที่นำเสนอเป็นสถิติจริง |

## 7. Server/Client boundary table — TBD
`planner` ต้องระบุต่อ cycle ว่า component ไหนเป็น server ไหนเป็น client พร้อมเหตุผล
หลักการ: `'use client'` อยู่ที่ leaf ที่ต้องมี state/event จริง — ไม่ใส่ที่ `page.tsx` ทั้งหน้าโดยไม่มีเหตุผล
**ห้าม** import ไฟล์ที่ใช้ `fs` (`src/lib/projects.ts`, `src/lib/blog.ts`) หรือ env ที่ไม่ใช่ `NEXT_PUBLIC_*` เข้า client component

## 8. Flow ที่ต้อง spec เป็น sequence (TBD)
- `checkout → createDownloadToken → /api/downloads` — ตอนนี้ราคาและ license มาจาก request body ต้องระบุว่าคำนวณซ้ำฝั่ง server ที่จุดไหน
- `contact form → zod → sendContactEmail` — `src/lib/email.ts` ยัง `console.log` อย่างเดียว
- `webhook → ยืนยัน order` — `src/app/api/webhooks/route.ts` ยังไม่เห็นการตรวจลายเซ็น ต้อง spec ให้ชัด

## 9. Env & secret
`.env.example` มี `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`
`RESEND_API_KEY` และ `CONTACT_RECEIVER_EMAIL` เป็น server-only — ห้ามหลุดเข้า client component

## 10. doc ของ Next.js ที่อ่านประกอบ
> ทุกครั้งที่ planner อัปเดตไฟล์นี้ ให้ต่อรายการด้านล่าง

- (ยังไม่มี — cycle แรกต้องเริ่มเติม)
