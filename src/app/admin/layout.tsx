import { AdminShell } from '@/components/admin/admin-shell';
import { requireAdmin } from '@/lib/session';

/**
 * Route guard ของพื้นที่หลังบ้านทั้งหมด (22 หน้าใต้ /admin)
 *
 * เป็น server component โดยเจตนา — layout นี้รันฝั่ง server ก่อนที่หน้าไหน
 * จะถูก render จึงกันได้ตั้งแต่ก่อนส่ง HTML ออกไป ต่างจากการเช็คฝั่ง client
 * ที่ HTML หลังบ้านถูกส่งไปถึงเบราว์เซอร์แล้วค่อยซ่อน ซึ่งกันไม่ได้จริง
 *
 * requireAdmin() จะ redirect ออกทันทีถ้าไม่มี session หรือ role ไม่ใช่ ADMIN
 * (ดู src/lib/session.ts) ผลข้างเคียงที่ตั้งใจ: หน้าใต้ /admin กลายเป็น dynamic
 * ไม่ถูก prerender เป็น static อีก ซึ่งจำเป็น เพราะหน้าที่ prerender ไว้ตอน build
 * จะไม่มี cookie ให้ตรวจ
 *
 * อ่านประกอบ: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/layout.md
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin('/admin');

  return <AdminShell>{children}</AdminShell>;
}
