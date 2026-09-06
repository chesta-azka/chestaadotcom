import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';
import firebaseAppletConfig from '@/firebase-applet-config.json';

const getEnv = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    // @ts-ignore
    return import.meta.env[key];
  }
  return undefined;
};

const firebaseConfig = {
  apiKey: getEnv('NEXT_PUBLIC_FIREBASE_API_KEY') || getEnv('VITE_FIREBASE_API_KEY') || firebaseAppletConfig.apiKey,
  authDomain: getEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN') || getEnv('VITE_FIREBASE_AUTH_DOMAIN') || firebaseAppletConfig.authDomain,
  projectId: getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID') || getEnv('VITE_FIREBASE_PROJECT_ID') || firebaseAppletConfig.projectId,
  storageBucket: getEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET') || getEnv('VITE_FIREBASE_STORAGE_BUCKET') || firebaseAppletConfig.storageBucket,
  messagingSenderId: getEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID') || getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID') || firebaseAppletConfig.messagingSenderId,
  appId: getEnv('NEXT_PUBLIC_FIREBASE_APP_ID') || getEnv('VITE_FIREBASE_APP_ID') || firebaseAppletConfig.appId
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const databaseId = firebaseAppletConfig.firestoreDatabaseId || "ai-studio-07319849-f721-4705-badf-87d9debdf6a5";

// Use initializeFirestore with experimentalForceLongPolling for better connection stability in restricted network environments like AI Studio Preview Iframe
let db;
try {
  db = initializeFirestore(app, { experimentalForceLongPolling: true }, databaseId);
} catch (e) {
  db = getFirestore(app, databaseId);
}

const auth = getAuth(app);
const storage = getStorage(app);

let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

const logAnalyticsEvent = (eventName, eventParams) => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
};

export { app, db, auth, storage, logAnalyticsEvent };
