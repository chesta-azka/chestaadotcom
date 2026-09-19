import { initializeApp, getApps, getApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import firebaseAppletConfig from '../../firebase-applet-config.json';

const getEnv = (key: string): string | undefined => {
  return process.env[key];
};

const serviceAccount = {
  projectId: getEnv('FIREBASE_PROJECT_ID') || firebaseAppletConfig.projectId,
  clientEmail: getEnv('FIREBASE_CLIENT_EMAIL'),
  privateKey: getEnv('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
};

export function getAdminApp() {
  if (getApps().length === 0) {
    if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
      initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
        databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`
      });
    } else {
      initializeApp({
        projectId: serviceAccount.projectId
      });
    }
  }
  return getApp();
}

export const adminDb = getFirestore(getAdminApp());
export const adminAuth = getAuth(getAdminApp());
