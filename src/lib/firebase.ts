// Firebase client SDK — single initialization point for the whole app.
//
// อ่านประกอบก่อนแก้ไฟล์นี้ (ตามกฎใน AGENTS.md):
//   node_modules/next/dist/docs/01-app/02-guides/environment-variables.md
//   node_modules/next/dist/docs/01-app/02-guides/server-and-client-boundary.md
//   node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/instrumentation-client.md
//
// ไฟล์นี้ import เฉพาะ 'firebase/app' ที่ระดับบนสุด เพราะเป็น module เดียวที่
// ปลอดภัยทั้งฝั่ง server และ client ส่วน analytics / auth / firestore โหลดแบบ
// dynamic ภายในฟังก์ชัน เพื่อไม่ให้โค้ดที่ต้องใช้ `window` ถูกลากเข้า server bundle
// และไม่เพิ่มขนาด bundle ให้หน้าที่ไม่ได้ใช้

import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';

// ค่าทั้งหมดเป็น NEXT_PUBLIC_* เพราะ Firebase web config ถูกส่งไปฝั่ง browser
// โดยการออกแบบของ Firebase เอง — ไม่ใช่ความลับ การป้องกันที่แท้จริงอยู่ที่
// Firestore/Storage security rules และการจำกัดสิทธิ์ API key ใน Google Cloud Console
// อย่าเก็บ service account key หรือ admin credential ไว้ในไฟล์นี้เด็ดขาด
type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId เป็น optional สำหรับ Firebase JS SDK v7.20.0 ขึ้นไป
  // แต่ Analytics จะทำงานได้ก็ต่อเมื่อมีค่านี้
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const REQUIRED_KEYS = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
] as const;

function resolveConfig(): FirebaseWebConfig {
  const missing = REQUIRED_KEYS.filter((key) => !firebaseConfig[key]);

  if (missing.length > 0) {
    // Fail-Closed: ถ้า config ไม่ครบ ให้ล้มทันทีพร้อมบอกว่าขาดตัวไหน
    // ดีกว่าปล่อยให้ initializeApp สร้าง app ที่ใช้งานไม่ได้แล้วไปพังที่อื่น
    throw new Error(
      `[firebase] ตั้งค่าไม่ครบ ขาด env: ${missing
        .map((key) => `NEXT_PUBLIC_FIREBASE_${key.replace(/[A-Z]/g, (c) => `_${c}`).toUpperCase()}`)
        .join(', ')} — ดูตัวอย่างที่ .env.example`
    );
  }

  return firebaseConfig as FirebaseWebConfig;
}

/**
 * คืน FirebaseApp ตัวเดียวของแอป
 *
 * ใช้ getApps() เช็คก่อนเสมอ เพราะ dev server ของ Next.js ทำ HMR ซึ่งจะรัน
 * module นี้ซ้ำ ถ้าเรียก initializeApp ตรงๆ จะเจอ error "Firebase App named
 * '[DEFAULT]' already exists"
 */
export function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(resolveConfig());
}

let analyticsPromise: Promise<import('firebase/analytics').Analytics | null> | null = null;

/**
 * คืน Analytics instance หรือ null ถ้าใช้ไม่ได้
 *
 * คืน null ในกรณีเหล่านี้โดยไม่ throw เพราะ analytics พังไม่ควรทำให้เว็บพัง:
 *   - ถูกเรียกฝั่ง server (ไม่มี window)
 *   - เบราว์เซอร์ไม่รองรับ (isSupported() เป็น false เช่นใน private mode บางตัว)
 *   - ไม่ได้ตั้ง measurementId
 */
export function getFirebaseAnalytics(): Promise<import('firebase/analytics').Analytics | null> {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  if (!firebaseConfig.measurementId) {
    return Promise.resolve(null);
  }

  if (!analyticsPromise) {
    analyticsPromise = import('firebase/analytics')
      .then(async ({ getAnalytics, isSupported }) => {
        const supported = await isSupported();
        return supported ? getAnalytics(getFirebaseApp()) : null;
      })
      .catch(() => null);
  }

  return analyticsPromise;
}

/**
 * Firebase Auth — โหลดแบบ dynamic เพื่อไม่ให้ติดไปกับหน้าที่ไม่ได้ใช้
 *
 * หมายเหตุสำคัญ: auth ฝั่ง client บอกได้แค่ว่า "ใครล็อกอินอยู่ในเบราว์เซอร์นี้"
 * ห้ามใช้เป็นฐานการตัดสินสิทธิ์ของ route guard หรือ route handler — สิทธิ์ต้อง
 * ตรวจฝั่ง server จาก ID token ที่ verify แล้ว (ดู docs/roadmap.md Phase 1)
 */
// ต่อกับ Local Emulator Suite เมื่อตั้ง NEXT_PUBLIC_FIREBASE_USE_EMULATOR=true
// พอร์ตต้องตรงกับที่ประกาศใน firebase.json (auth 9099 / firestore 8080 / storage 9199)
// ใช้ 127.0.0.1 ไม่ใช่ localhost เพราะบน Windows localhost อาจ resolve เป็น IPv6 (::1)
// แล้วต่อ emulator ที่ bind IPv4 ไม่ติด
const USE_EMULATOR = process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true';
const EMULATOR_HOST = '127.0.0.1';

// memoize ไว้เพราะ connect*Emulator() เรียกซ้ำกับ instance เดิมจะ throw
// และต้องเรียกก่อนที่ service นั้นจะถูกใช้งานครั้งแรก
let authPromise: ReturnType<typeof createAuth> | null = null;
let dbPromise: ReturnType<typeof createDb> | null = null;
let storagePromise: ReturnType<typeof createStorage> | null = null;

async function createAuth() {
  const { getAuth, connectAuthEmulator } = await import('firebase/auth');
  const auth = getAuth(getFirebaseApp());

  if (USE_EMULATOR) {
    connectAuthEmulator(auth, `http://${EMULATOR_HOST}:9099`, { disableWarnings: true });
  }

  return auth;
}

async function createDb() {
  const { getFirestore, connectFirestoreEmulator } = await import('firebase/firestore');
  const db = getFirestore(getFirebaseApp());

  if (USE_EMULATOR) {
    connectFirestoreEmulator(db, EMULATOR_HOST, 8080);
  }

  return db;
}

async function createStorage() {
  const { getStorage, connectStorageEmulator } = await import('firebase/storage');
  const storage = getStorage(getFirebaseApp());

  if (USE_EMULATOR) {
    connectStorageEmulator(storage, EMULATOR_HOST, 9199);
  }

  return storage;
}

/**
 * Firebase Auth — โหลดแบบ dynamic เพื่อไม่ให้ติดไปกับหน้าที่ไม่ได้ใช้
 *
 * หมายเหตุสำคัญ: auth ฝั่ง client บอกได้แค่ว่า "ใครล็อกอินอยู่ในเบราว์เซอร์นี้"
 * ห้ามใช้เป็นฐานการตัดสินสิทธิ์ของ route guard หรือ route handler — สิทธิ์ต้อง
 * ตรวจฝั่ง server จาก ID token ที่ verify แล้วด้วย Firebase Admin SDK
 * (ดู docs/roadmap.md Phase 1) และ role ต้องมาจาก custom claims
 * ให้ตรงกับที่ firestore.rules / storage.rules ตรวจ
 */
export function getFirebaseAuth() {
  authPromise ??= createAuth();
  return authPromise;
}

/** Cloud Firestore — โหลดแบบ dynamic เช่นกัน */
export function getFirebaseDb() {
  dbPromise ??= createDb();
  return dbPromise;
}

/**
 * Cloud Storage
 *
 * ใช้กับไฟล์สาธารณะ (รูปผลงาน/สื่อ) เท่านั้น
 * ไฟล์สินค้าที่ลูกค้าซื้อแล้วต้องไม่ดาวน์โหลดตรงจาก client — ต้องผ่าน server
 * ที่ตรวจ order/license/โควตา/วันหมดอายุก่อน (ดูเหตุผลใน storage.rules)
 */
export function getFirebaseStorage() {
  storagePromise ??= createStorage();
  return storagePromise;
}
