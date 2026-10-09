import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { getAdminAuth } from '@/lib/firebase-admin';
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from '@/lib/session';

/**
 * แลก Firebase ID token (ได้จากการล็อกอินฝั่ง client) เป็น session cookie แบบ httpOnly
 *
 * ทำไมต้องมีขั้นนี้ ไม่ใช้ ID token ตรงๆ:
 *   - ID token อยู่ใน JS ฝั่ง client ซึ่ง XSS อ่านได้ ส่วน httpOnly cookie อ่านไม่ได้
 *   - ID token อายุ 1 ชั่วโมงและต้อง refresh เอง ส่วน session cookie อายุยาวกว่า
 *     และ server ตรวจเองได้ทุก request โดยไม่ต้องให้ client ส่งอะไรมาเพิ่ม
 *   - server component อ่าน cookie ได้ แต่อ่าน state ของ Firebase SDK ฝั่ง client ไม่ได้
 *
 * อ่านประกอบ: node_modules/next/dist/docs/01-app/03-api-reference/04-functions/cookies.md
 */

const bodySchema = z.object({
  idToken: z.string().min(1).max(8192),
});

export async function POST(request: Request) {
  const raw = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json({ error: 'คำขอไม่ถูกต้อง' }, { status: 400 });
  }

  try {
    const auth = getAdminAuth();

    // checkRevoked = true กัน token ที่ถูกสั่งยกเลิกไปแล้ว
    const decoded = await auth.verifyIdToken(parsed.data.idToken, true);

    // บังคับว่าต้องเพิ่งล็อกอินจริงภายใน 5 นาที
    // กันคนที่ขโมย ID token เก่าไปแลกเป็น session cookie อายุยาว
    const signedInSecondsAgo = Date.now() / 1000 - decoded.auth_time;
    if (signedInSecondsAgo > 5 * 60) {
      return NextResponse.json(
        { error: 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง' },
        { status: 401 }
      );
    }

    const sessionCookie = await auth.createSessionCookie(parsed.data.idToken, {
      expiresIn: SESSION_MAX_AGE_SECONDS * 1000,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    // บอก client แค่ว่าจะพาไปไหนต่อ ไม่ส่งอะไรที่ client เอาไปอ้างสิทธิ์ได้
    // เพราะ guard ฝั่ง server ตรวจ cookie เองทุกครั้งอยู่แล้ว
    return NextResponse.json({
      ok: true,
      role: decoded.role === 'ADMIN' ? 'ADMIN' : 'CUSTOMER',
    });
  } catch {
    // ไม่ส่งรายละเอียด error กลับไป เพื่อไม่ใบ้ว่า token ผิดตรงไหน
    // และครอบกรณี server ไม่มี credential ของ admin SDK ด้วย
    return NextResponse.json(
      { error: 'เข้าสู่ระบบไม่สำเร็จ' },
      { status: 401 }
    );
  }
}

/** ออกจากระบบ — ลบ cookie และสั่ง revoke refresh token ให้ session เดิมใช้ต่อไม่ได้ */
export async function DELETE() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;

  // ลบ cookie ก่อนเสมอ แม้ขั้น revoke จะล้ม ผู้ใช้ต้องหลุดออกจากระบบให้ได้
  cookieStore.delete(SESSION_COOKIE);

  if (sessionCookie) {
    try {
      const auth = getAdminAuth();
      const decoded = await auth.verifySessionCookie(sessionCookie);
      await auth.revokeRefreshTokens(decoded.sub);
    } catch {
      // cookie เพี้ยนหรือหมดอายุอยู่แล้ว — ถือว่าออกจากระบบสำเร็จ
    }
  }

  return NextResponse.json({ ok: true });
}
