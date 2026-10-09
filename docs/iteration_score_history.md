# Iteration Score History — my-portfolio

> `orchestrator` เติมหนึ่งแถวต่อหนึ่ง cycle ที่ปิดแล้ว
> ใช้ตารางนี้ตัดสิน stopping criteria: คะแนนลดลง = ไม่ปิด cycle · คะแนนไม่ขึ้น 2 รอบติด = หยุดวน เลือก version ที่ดีที่สุดที่มี

| Cycle | Phase | ขอบเขต | tsc errors | build | critical/high ค้าง | คะแนน | สถานะ |
|---|---|---|---|---|---|---|---|
| — | — | ยังไม่เริ่ม cycle ใด | — | — | 1 critical / 5 high (จาก baseline survey) | — | รอเริ่ม Phase 0 |

## เกณฑ์ให้คะแนน (เต็ม 100)
| หมวด | คะแนน | เกณฑ์ |
|---|---|---|
| Build integrity | 25 | `npx tsc --noEmit` 0 error + `npm run build` สำเร็จ = เต็ม · ล้มข้อใดข้อหนึ่ง = 0 และ cycle นี้ REJECTED ทันที |
| Security & boundary | 25 | ไม่มี secret หลุด client, สิทธิ์เช็คฝั่ง server, validate zod ฝั่ง server, fail-closed ครบ |
| Structure compliance | 20 | 1 หน้า 1 หน้าที่, server/client boundary ตาม spec, ไม่มีแหล่งข้อมูลซ้อน |
| Design & i18n | 15 | ใช้ token ไม่ hardcode hex, key ครบ th/en, dark mode อ่านออก, focus state ครบ |
| Spec fidelity | 15 | ทำตาม spec ของ planner/designer ครบ ไม่ scope creep และอ้างอิง doc Next.js ที่อ่านจริง |

**หัก 10 คะแนนทันที** ถ้า builder ส่งงานโดยไม่อ้างอิง doc ใน `node_modules/next/dist/docs/`
**หัก 10 คะแนนทันที** ถ้า log รอบนั้นเขียนว่าผ่านแต่ reviewer ไม่ได้รันคำสั่งเอง
