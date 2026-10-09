# my-portfolio — Review Log

> `reviewer` เขียนไฟล์นี้หลังตรวจงานของ `builder` ทุกครั้ง
> **ยังไม่มี cycle ใดเกิดขึ้น** — ไฟล์นี้ว่างโดยเจตนา ห้ามเติมรายการย้อนหลังที่ไม่ได้ตรวจจริง

## รูปแบบที่ต้องใช้ทุกครั้ง

```
## Cycle N: <ชื่อขอบเขตงาน>
- **Phase:** <จาก docs/roadmap.md>
- **โหมดตรวจ:** diff | file-level fallback (ยังไม่มี git)
- **ขอบเขต:** ไฟล์ที่ตรวจ (path)
- **doc ที่ builder อ้างอิง:** node_modules/next/dist/docs/...
- **ผลคำสั่งที่ reviewer รันเอง:**
  - `npx tsc --noEmit` → N errors
  - `npm run build` → สำเร็จ / ล้ม (เหตุผล)
  - `npm run lint` → N errors / N warnings
- **Findings:**
  - [critical|high|medium|low] path:line — ปัญหา → ต้องแก้อะไร
- **Verdict:** APPROVED | REJECTED (คะแนน X/100)
```

## กฎการเขียน log นี้
1. **ห้ามเขียนว่าผ่านโดยไม่ได้รันคำสั่งจริง** — ต้องใส่ตัวเลขผลลัพธ์ ไม่ใช่คำว่า "ผ่าน"
2. `tsc` error > 0 หรือ `build` ล้ม → `REJECTED` เสมอ ไม่มีข้อยกเว้น
3. Finding ต้องมี `path:line` ไม่ใช่คำบรรยายกว้างๆ
4. ถ้าตรวจในโหมด file-level fallback ต้องระบุไว้ เพราะความครอบคลุมต่ำกว่า diff review
5. ถ้าเจอปัญหาระดับโครงสร้างทั้งระบบ ให้ escalate ไป `auditor` แล้วบันทึกว่า escalate เรื่องอะไร

---

(ยังไม่มีรายการ)
