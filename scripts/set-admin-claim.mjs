// ให้สิทธิ์ ADMIN แก่ผู้ใช้ Firebase Auth หนึ่งคน
//
// ใช้:  node scripts/set-admin-claim.mjs you@example.com
// ถอน: node scripts/set-admin-claim.mjs you@example.com --revoke
//
// ต้องมี credential ของ service account ก่อน:
//   1. Firebase console -> Project settings -> Service accounts -> Generate new private key
//   2. เก็บไฟล์ไว้ "นอก" โฟลเดอร์โปรเจกต์ (ห้ามให้หลุดเข้า git เด็ดขาด)
//   3. set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\key.json
//
// ทำไมต้องใช้ custom claim ไม่เก็บ role ไว้ใน Firestore:
// claim ถูกเซ็นรวมมาใน token ทำให้ firestore.rules และ storage.rules อ่านได้ตรงๆ
// ผ่าน request.auth.token.role โดยไม่ต้องยิงอ่าน document เพิ่ม และ client
// แก้ไม่ได้ ต่างจาก document ที่ถ้าเผลอเปิดสิทธิ์เขียน ผู้ใช้ยกระดับตัวเองเป็น admin ได้

import { applicationDefault, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const email = process.argv[2];
const revoke = process.argv.includes('--revoke');

if (!email || email.startsWith('-')) {
  console.error('ใช้: node scripts/set-admin-claim.mjs <email> [--revoke]');
  process.exit(1);
}

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error(
    'ยังไม่ได้ตั้ง GOOGLE_APPLICATION_CREDENTIALS — ชี้ไปที่ไฟล์ service account key ก่อน'
  );
  process.exit(1);
}

if (getApps().length === 0) {
  initializeApp({ credential: applicationDefault() });
}

const auth = getAuth();

try {
  const user = await auth.getUserByEmail(email);
  const existing = user.customClaims ?? {};

  if (revoke) {
    // ส่ง role เป็น null เพื่อถอน claim ออก แต่คง claim อื่นที่อาจมีไว้
    await auth.setCustomUserClaims(user.uid, { ...existing, role: null });
  } else {
    await auth.setCustomUserClaims(user.uid, { ...existing, role: 'ADMIN' });
  }

  // สำคัญ: claim ใหม่จะมีผลกับ token ใบถัดไปเท่านั้น
  // revoke เพื่อบังคับให้ session เดิมหมดอายุและต้องล็อกอินใหม่
  await auth.revokeRefreshTokens(user.uid);

  console.log(
    revoke
      ? `ถอนสิทธิ์ ADMIN จาก ${email} (uid ${user.uid}) แล้ว`
      : `ให้สิทธิ์ ADMIN แก่ ${email} (uid ${user.uid}) แล้ว`
  );
  console.log('ผู้ใช้คนนี้ต้องออกจากระบบแล้วเข้าใหม่ สิทธิ์จึงจะมีผล');
} catch (err) {
  if (err?.code === 'auth/user-not-found') {
    console.error(`ไม่พบผู้ใช้อีเมล ${email} — สร้างบัญชีที่หน้า /register ก่อน`);
  } else {
    console.error('ล้มเหลว:', err?.message ?? err);
  }
  process.exit(1);
}
