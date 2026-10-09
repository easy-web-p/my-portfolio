# Multi-Agent Config สำหรับ my-portfolio

ชุด config นี้เขียนในรูปแบบ **Claude Code Sub-agents** (`.claude/agents/*.md`) พร้อม YAML frontmatter (`name`, `description`, `tools`, `model`)
ดัดแปลงมาจากชุดของโปรเจกต์ **QueueUp for Campus** (React+Vite+Firebase) แต่เขียนเนื้อหาใหม่ทั้งหมดให้ตรงกับ stack และปัญหาจริงของ **my-portfolio** (Next.js 16 App Router)

## ลำดับ Agent
| ไฟล์ | Agent | บทบาทสั้นๆ | model |
|---|---|---|---|
| `00-orchestrator.md` | orchestrator | คุม flow, เช็ค stopping criteria | opus |
| `01-strategist.md` | strategist | คิดฟีเจอร์/priority | opus |
| `02-planner.md` | planner | architecture, data layer, auth boundary, page spec | opus |
| `03-designer.md` | designer | UX/UI (โหมด new/extend) | sonnet |
| `04-builder.md` | builder | เขียนโค้ดจริง | sonnet |
| `05-reviewer.md` | reviewer | ตรวจงานทีละชิ้น | opus |
| `06-auditor.md` | auditor | ตรวจโครงสร้างทั้งระบบเป็นระยะ | opus |

## วิธีใช้
agent พวกนี้เป็น **project subagent** — Claude Code จะเห็นก็ต่อเมื่อเปิด session โดยมี `my-portfolio` เป็น working directory
ถ้าเพิ่งสร้างไฟล์เหล่านี้ใน session ปัจจุบัน ต้อง**เปิด session ใหม่**ก่อนจึงจะเรียกใช้ได้

เริ่มงานผ่าน orchestrator ก่อนเสมอ:

> "ใช้ orchestrator agent เริ่ม cycle ใหม่สำหรับ Phase 1 (auth guard หน้า /admin)"

## Shared state
agent ทุกตัวอ่าน/เขียนไฟล์ใน `docs/`:

| ไฟล์ | เจ้าของ | ใช้ทำอะไร |
|---|---|---|
| `docs/roadmap.md` | orchestrator | Phase และสถานะ |
| `docs/architecture_doc.md` | planner | data contract, page spec, boundary table |
| `docs/design_system.md` | designer | design token baseline |
| `docs/review_log.md` | reviewer | ประวัติ approve/reject |
| `docs/audit_log.md` | auditor | finding แยก severity |
| `docs/iteration_score_history.md` | orchestrator | คะแนนแต่ละรอบ |

## กฎเฉพาะของโปรเจกต์นี้ที่ฝังไว้ในทุก agent
1. **อ่าน `node_modules/next/dist/docs/` ก่อนเขียนโค้ด Next.js ทุกครั้ง** — `AGENTS.md` ของ repo สั่งไว้ เพราะ Next.js 16.3.4 มี breaking change จาก training data ของโมเดล ห้ามเขียนจากความจำ
2. **Fail-Closed by Default** — หา session/สิทธิ์/config ไม่เจอ ต้องบล็อก ไม่ใช่ปล่อยผ่าน
3. **1 หน้า 1 หน้าที่** — ยึดตาราง ✅/❌ ใน `architecture_doc.md`
4. **Server/client boundary** — ของที่ใช้ `fs` หรือ env secret ห้ามหลุดเข้า client component
5. **i18n ครบ th/en** — ข้อความผู้ใช้ต้องผ่าน `t()` ใน `src/lib/translations.ts`
6. **Design token เท่านั้น** — ห้าม hardcode hex ใหม่
7. **ห้าม commit/push เอง** — ต้องมี human checkpoint ก่อนทุกครั้ง
8. **ไม่เชื่อ log เปล่าๆ** — ถ้า log อ้างไฟล์ไหน ต้องเช็กว่าไฟล์นั้นยังมีจริง และต้องรัน `tsc`/`build` เองไม่เชื่อตัวเลขที่รายงานมา

## ข้อควรรู้ก่อนเริ่ม Phase 1
- โปรเจกต์นี้ **ยังไม่ใช่ git repo** → `reviewer` ไม่มี diff ให้ตรวจ ต้องทำ `git init` + commit baseline ก่อน ไม่งั้น reviewer จะทำงานในโหมด file-level fallback ซึ่งพลาดง่ายกว่า
- `next dev` เขียนบล็อกคำเตือนกลับเข้า `AGENTS.md` เองเป็นระยะ ถ้าเห็นใน diff ให้ commit ไปพร้อมงาน อย่าลบ
- ห้ามรัน `next dev` ซ้อน ถ้ามีตัวรันอยู่แล้วให้ใช้ `http://localhost:3000` ตัวเดิม

## หมายเหตุ
- ถ้า orchestrator เรียก subagent ไม่ได้ ให้ลบบรรทัด `tools:` ใน `00-orchestrator.md` ออก เพื่อให้มันสืบทอดเครื่องมือทั้งหมดจาก session แม่
- `model: sonnet` ใช้กับ agent ที่ทำงานตาม spec ชัดเจนอยู่แล้ว (designer, builder) เพื่อความเร็ว/ต้นทุน — ปรับเป็น opus ได้ถ้าต้องการคุณภาพสูงสุดทุกจุด
- ถ้าจะย้ายไป platform อื่น (CrewAI, AutoGen, LangGraph) เนื้อหาในแต่ละไฟล์ใช้ได้เหมือนเดิม แค่แปลง YAML frontmatter เป็น syntax ของ framework นั้น
