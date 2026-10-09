import 'server-only';

import { applicationDefault, getApp, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

/**
 * Server-only Firebase access.
 *
 * Firebase App Hosting supplies Application Default Credentials automatically.
 * For local development, set GOOGLE_APPLICATION_CREDENTIALS to a service account
 * that can read Firestore and the private product bucket. Never expose that
 * credential or this module to the browser.
 */
function getFirebaseAdminApp(): App {
  if (getApps().length > 0) {
    return getApp();
  }

  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET
    ?? process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  return initializeApp({
    credential: applicationDefault(),
    ...(storageBucket ? { storageBucket } : {}),
  });
}

export function getAdminFirestore() {
  return getFirestore(getFirebaseAdminApp());
}

export function getPrivateProductBucket() {
  const bucket = getStorage(getFirebaseAdminApp()).bucket();

  if (!bucket.name) {
    throw new Error('FIREBASE_STORAGE_BUCKET is not configured.');
  }

  return bucket;
}

export function productObjectPath(fileKey: string) {
  if (!fileKey || fileKey.includes('/') || fileKey.includes('\\')) {
    throw new Error('Invalid product asset configuration.');
  }

  const prefix = (process.env.PRODUCT_STORAGE_PREFIX ?? 'products').replace(/^\/+|\/+$/g, '');
  return prefix ? `${prefix}/${fileKey}` : fileKey;
}
