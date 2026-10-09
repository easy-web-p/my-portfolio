# Design System: Playful Intelligence

ที่มา: generate จาก Google Stitch — ต้นฉบับอยู่ใน `stitch_playful_intelligence_portfolio/DESIGN.md`
**แหล่งความจริงของ token ตัวจริงคือ `tailwind.config.ts`** ถ้าสองไฟล์ไม่ตรงกัน ให้ยึด `tailwind.config.ts` แล้วอัปเดตไฟล์นี้ตาม

## 1. Palette (Material 3 token naming)
ธีมสว่าง โทนม่วง + accent เขียวมะนาว

### Surface
| Token | Hex |
|---|---|
| `surface` / `background` / `surface-bright` | `#f8f9ff` |
| `surface-container-lowest` | `#ffffff` |
| `surface-container-low` | `#eff4ff` |
| `surface-container` | `#e6eeff` |
| `surface-container-high` | `#dee9fc` |
| `surface-container-highest` / `surface-variant` | `#d9e3f6` |
| `surface-dim` | `#d0dbed` |
| `inverse-surface` | `#27313f` |
| `inverse-on-surface` | `#eaf1ff` |

### ตัวอักษร / เส้น
| Token | Hex |
|---|---|
| `on-surface` / `on-background` | `#121c2a` |
| `on-surface-variant` | `#494454` |
| `outline` | `#7b7486` |
| `outline-variant` | `#cbc3d7` |

### Primary (ม่วง)
| Token | Hex |
|---|---|
| `primary` | `#6b38d4` |
| `on-primary` | `#ffffff` |
| `primary-container` | `#8455ef` |
| `on-primary-container` | `#fffbff` |
| `primary-fixed` | `#e9ddff` |
| `primary-fixed-dim` / `inverse-primary` | `#d0bcff` |
| `on-primary-fixed` | `#23005c` |
| `on-primary-fixed-variant` | `#5516be` |
| `surface-tint` | `#6d3bd7` |

### Secondary (เทาน้ำเงิน)
`secondary` `#575e70` · `on-secondary` `#ffffff` · `secondary-container` `#d9dff5` · `on-secondary-container` `#5c6274` · `secondary-fixed` `#dce2f7` · `secondary-fixed-dim` `#c0c6db` · `on-secondary-fixed` `#141b2b` · `on-secondary-fixed-variant` `#404758`

### Tertiary (เขียวมะนาว — ใช้เป็น accent)
`tertiary` `#466500` · `on-tertiary` `#ffffff` · `tertiary-container` `#598000` · `on-tertiary-container` `#faffe8` · `tertiary-fixed` `#baf54c` · `tertiary-fixed-dim` `#9fd830` · `on-tertiary-fixed` `#131f00` · `on-tertiary-fixed-variant` `#354e00`

### Error
`error` `#ba1a1a` · `on-error` `#ffffff` · `error-container` `#ffdad6` · `on-error-container` `#93000a`

## 2. Typography
ฟอนต์โหลดผ่าน `next/font/google` ใน `src/app/layout.tsx` แล้ว เรียกใช้ผ่าน CSS variable

| ใช้กับ | ฟอนต์ | variable |
|---|---|---|
| Headline / Display | Sora (400/500/600/700) | `--font-sora` |
| Body / Label | Manrope (400/500/600) | `--font-manrope` |
| สำรอง | Inter | `--font-inter` |
| ตัวเลข / mono | Space Grotesk | `--font-space-grotesk` |

Scale ที่ใช้ในโค้ด (นิยามใน `tailwind.config.ts`): `font-display-hero`, `font-headline-lg`, `font-headline-sm`, `font-body-md`, `font-label-md`, `font-label-sm` คู่กับ `text-*` ชื่อเดียวกัน

## 3. ไอคอน
- **Material Symbols Outlined** — โหลดเป็น stylesheet ใน `src/app/layout.tsx` ใช้ผ่าน `<span className="material-symbols-outlined">name</span>`
- **lucide-react** — สำหรับ component ที่ต้องการ icon เป็น React component

## 4. Spacing & Radius
- Gutter: `px-gutter-mobile` (1rem) / `lg:px-gutter-desktop`
- ระยะตั้ง: `py-space-sm` → `py-space-4xl`
- Radius: `rounded-lg` 0.5rem · `rounded-xl` 0.75rem · `rounded-2xl` 1rem · `rounded-full`

## 5. Dark mode
`tailwind.config.ts` ตั้ง `darkMode: 'class'` และ `src/components/layout/header.tsx` มีปุ่ม toggle อยู่แล้ว
**ทุก surface ที่ออกแบบใหม่ต้องอ่านออกทั้ง light และ dark**

## 6. Layout chrome ที่มีอยู่แล้ว (ต้องเผื่อเสมอ)
component เหล่านี้ประกอบอยู่ใน `src/app/layout.tsx` แล้ว — ออกแบบหน้าใหม่ต้องไม่ชนกับมัน
- `Header` — fixed ด้านบน, `MainContent` ใส่ `pt-20` ให้แล้ว (ยกเว้นหน้า `/admin`)
- `BottomNav` — ทับด้านล่างบนมือถือ ต้องเผื่อ padding ล่าง
- `Footer` · `CartDrawer` · `PublicCommandPalette` (⌘K) · `CookieBanner` · `BackgroundKeyboardTranslator`

## 7. Edition สำรองที่ออกแบบไว้แล้ว
ใน `stitch_playful_intelligence_portfolio/` มี 4 ชุด ใช้เป็นคลัง pattern ได้ ไม่ต้องคิดใหม่จากศูนย์
`playful_intelligence_bento_lab_edition` · `playful_intelligence_editorial_studio_edition` · `playful_intelligence_tactile_sandbox_edition` · `playful_intelligence_logo`

## 8. กฎการใช้
1. **ห้าม hardcode hex ใหม่ใน JSX** — ใช้ token เท่านั้น ถ้าต้องการสีที่ไม่มี ให้เสนอเพิ่มใน `tailwind.config.ts` ผ่าน planner ก่อน
2. ข้อความที่ผู้ใช้เห็นต้องผ่าน `t()` และมี key ทั้ง `th`/`en` ใน `src/lib/translations.ts` — ข้อความไทยมักยาวกว่าอังกฤษ layout ต้องไม่แตกเมื่อสลับภาษา
3. สกุลเงินใช้ `฿` (THB) ให้ตรงกันทั้งเว็บ
4. ปุ่ม/ลิงก์ทุกอันต้องมี focus state ที่มองเห็นได้ และมี `aria-label` ถ้าเป็นไอคอนเปล่า
