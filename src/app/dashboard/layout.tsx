import { DashboardUserProvider } from '@/components/dashboard/session-context';
import { requireUser } from '@/lib/session';

/**
 * Route guard ของพื้นที่ลูกค้า (/dashboard/*)
 *
 * ต้องล็อกอินแล้วเท่านั้น แต่ไม่ต้องเป็น ADMIN
 * ไม่ครอบ UI อะไรเพิ่ม เพราะหน้าพวกนี้ใช้ Header/Footer จาก layout ราก
 *
 * นอกจากกั้นหน้า ยังส่งตัวตนของผู้ใช้ลงไปให้หน้าลูกที่เป็น client component
 * ใช้แสดงผล แทนการ hardcode อีเมลตัวอย่างไว้ในแต่ละหน้า
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireUser('/dashboard');

  return (
    <DashboardUserProvider
      user={{
        uid: session.uid,
        email: session.email,
        name: session.name,
        role: session.role,
      }}
    >
      {children}
    </DashboardUserProvider>
  );
}
