'use client';

import React, { createContext, useContext } from 'react';

/**
 * ส่งตัวตนของผู้ใช้จาก server layout ลงไปให้หน้า client ใต้ /dashboard
 *
 * ทำไมต้องมีตัวกลางนี้: หน้าใต้ /dashboard เป็น 'use client' ทั้งหมด จึงอ่าน
 * cookie หรือ verify token เองไม่ได้ ส่วน layout เป็น server component ที่รู้
 * ว่าใครล็อกอินอยู่แล้ว (จาก requireUser()) จึงส่งค่าลงมาเป็น props
 *
 * ย้ำว่าค่านี้ใช้ "แสดงผล" เท่านั้น ห้ามใช้ตัดสินสิทธิ์ — การตัดสินสิทธิ์เกิดที่
 * server ทุกครั้ง (layout guard + route handler) ค่าที่ส่งลงมานี้ถ้าถูกแก้ใน
 * เบราว์เซอร์ก็ไม่ได้สิทธิ์อะไรเพิ่ม
 *
 * type ประกาศซ้ำที่นี่แทนการ import จาก @/lib/session เพราะไฟล์นั้นมี
 * 'server-only' กันไม่ให้ถูกลากเข้า client bundle
 */
export type DashboardUser = {
  uid: string;
  email: string | null;
  name: string | null;
  role: 'ADMIN' | 'CUSTOMER';
};

const DashboardUserContext = createContext<DashboardUser | null>(null);

export function DashboardUserProvider({
  user,
  children,
}: {
  user: DashboardUser;
  children: React.ReactNode;
}) {
  return (
    <DashboardUserContext.Provider value={user}>
      {children}
    </DashboardUserContext.Provider>
  );
}

/**
 * อ่านตัวตนของผู้ใช้ที่ล็อกอินอยู่
 *
 * โยน error ถ้าถูกเรียกนอก /dashboard เพื่อให้พลาดตอน dev ไม่ใช่ตอน runtime
 * บน production (ดีกว่าคืนค่าปลอมเงียบๆ แบบที่ของเดิมทำ)
 */
export function useDashboardUser(): DashboardUser {
  const user = useContext(DashboardUserContext);

  if (!user) {
    throw new Error('useDashboardUser ต้องอยู่ภายใต้ DashboardUserProvider (/dashboard เท่านั้น)');
  }

  return user;
}

/** ชื่อที่เอาไปแสดงได้เสมอ — ถ้าไม่มี displayName ให้ใช้ส่วนหน้าของอีเมล */
export function displayNameOf(user: DashboardUser): string {
  if (user.name) return user.name;
  if (user.email) return user.email.split('@')[0];
  return 'Customer';
}
