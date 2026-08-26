import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import config from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
console.log('Firebase Config loaded:', config);

export const auth = getAuth(app);
export const db = getFirestore(app, config.firestoreDatabaseId);

export const logAnalyticsEvent = async (eventName: string, eventParams?: any) => {
  try {
    const supported = await isSupported();
    if (supported) {
      const { logEvent } = await import('firebase/analytics');
      const analytics = getAnalytics(app);
      logEvent(analytics, eventName, eventParams);
    }
  } catch (error) {
    console.warn("Analytics error:", error);
  }
};
