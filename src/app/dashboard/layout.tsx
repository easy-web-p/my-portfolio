import { requireUser } from '@/lib/session';

/**
 * Route guard ของพื้นที่ลูกค้า (/dashboard/*)
 *
 * ต้องล็อกอินแล้วเท่านั้น แต่ไม่ต้องเป็น ADMIN
 * ไม่ครอบ UI อะไรเพิ่ม เพราะหน้าพวกนี้ใช้ Header/Footer จาก layout ราก
 * อยู่แล้ว — ไฟล์นี้มีไว้กั้นหน้าเท่านั้น
 *
 * หมายเหตุ: หน้าใต้ /dashboard ยัง hardcode ตัวตน alex.mercer@example.com
 * อยู่ในหลายไฟล์ ซึ่งแยกจาก session จริง ต้องแก้ต่อให้อ่านจาก getSession()
 * (ดู docs/roadmap.md Phase 1) guard นี้ปิดช่องการเข้าถึงได้แล้ว แต่ข้อมูล
 * ที่โชว์ยังเป็น mock ไม่ใช่ของผู้ใช้ที่ล็อกอินจริง
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser('/dashboard');

  return children;
}
