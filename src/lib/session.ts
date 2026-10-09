import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAdminAuth } from '@/lib/firebase-admin';

/**
 * Session ฝั่ง server — แหล่งความจริงเดียวเรื่อง "ใครล็อกอินอยู่" และ "มีสิทธิ์อะไร"
 *
 * อ่านประกอบก่อนแก้ไฟล์นี้ (ตามกฎใน AGENTS.md):
 *   node_modules/next/dist/docs/01-app/03-api-reference/04-functions/cookies.md
 *   node_modules/next/dist/docs/01-app/03-api-reference/04-functions/redirect.md
 *
 * หลักการที่ยึด:
 *   1. role มาจาก custom claims ของ Firebase Auth เท่านั้น ไม่ใช่จาก document
 *      ที่ client เขียนได้ ไม่ใช่จาก localStorage และไม่ใช่จาก dropdown ในหน้า login
 *      ให้ตรงกับที่ firestore.rules / storage.rules ตรวจ (request.auth.token.role)
 *   2. Fail-Closed: ทุก error — ไม่มี cookie, cookie เพี้ยน, token ถูก revoke,
 *      หรือ server ไม่มี credential ของ admin SDK — คืน null เสมอ ไม่เดาว่าผ่าน
 */

/**
 * ชื่อ cookie ต้องเป็น `__session` เท่านั้น
 *
 * Firebase Hosting และ App Hosting วาง CDN ไว้หน้าแอป และ CDN นั้น **ตัด cookie
 * ทุกตัวทิ้งยกเว้นตัวที่ชื่อ `__session`** ถ้าตั้งชื่ออย่างอื่น การล็อกอินจะทำงาน
 * ตอน dev แต่พังเงียบๆ บน production เพราะ server ไม่เคยเห็น cookie เลย
 */
export const SESSION_COOKIE = '__session';

/** อายุ session cookie — 5 วัน (เพดานที่ Firebase ยอมคือ 14 วัน) */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 5;

export type UserRole = 'ADMIN' | 'CUSTOMER';

export type Session = {
  uid: string;
  email: string | null;
  name: string | null;
  role: UserRole;
};

/**
 * คืน session ของ request ปัจจุบัน หรือ null ถ้าไม่ได้ล็อกอิน / ตรวจไม่ผ่าน
 *
 * ปลอดภัยที่จะเรียกจาก server component, route handler และ server action
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    // checkRevoked = true ทำให้ session ที่ถูกสั่ง revoke (เช่นตอน logout
    // หรือตอนเปลี่ยนรหัสผ่าน) ใช้ต่อไม่ได้ทันที แลกกับการยิงเช็คกับ Firebase
    // หนึ่งครั้งต่อ request ซึ่งคุ้มสำหรับหน้าหลังบ้าน
    const decoded = await getAdminAuth().verifySessionCookie(sessionCookie, true);

    // claim ไม่มี role = ผู้ใช้ทั่วไป ไม่ใช่ admin (Fail-Closed)
    const role: UserRole = decoded.role === 'ADMIN' ? 'ADMIN' : 'CUSTOMER';

    return {
      uid: decoded.uid,
      email: decoded.email ?? null,
      name: (typeof decoded.name === 'string' ? decoded.name : null),
      role,
    };
  } catch {
    // ครอบทั้ง cookie หมดอายุ/ปลอม, token ถูก revoke และกรณีที่ server
    // ไม่มี credential ของ admin SDK (ตอน dev ที่ยังไม่ตั้ง
    // GOOGLE_APPLICATION_CREDENTIALS) — ทุกกรณีถือว่า "ยังไม่ได้ล็อกอิน"
    return null;
  }
}

/**
 * บังคับว่าต้องล็อกอินแล้ว — ถ้าไม่ redirect ไปหน้า login
 *
 * ใช้ใน layout ของพื้นที่ที่ต้องล็อกอิน เช่น /dashboard
 */
export async function requireUser(returnTo: string): Promise<Session> {
  const session = await getSession();

  if (!session) {
    redirect(`/login?next=${encodeURIComponent(returnTo)}`);
  }

  return session;
}

/**
 * บังคับว่าต้องเป็น ADMIN — ถ้าไม่ redirect ออก
 *
 * คนที่ล็อกอินแล้วแต่ไม่ใช่ admin ส่งไป /dashboard (ไม่ใช่ /login)
 * เพื่อไม่ให้งงว่าล็อกอินไม่ติด และไม่บอกใบ้ว่าหน้านั้นมีอยู่จริง
 */
export async function requireAdmin(returnTo: string): Promise<Session> {
  const session = await getSession();

  if (!session) {
    redirect(`/login?next=${encodeURIComponent(returnTo)}`);
  }

  if (session.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return session;
}
