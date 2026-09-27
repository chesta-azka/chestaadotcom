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

const DATABASE_ID = (firebaseAppletConfig as any).firestoreDatabaseId || "ai-studio-07319849-f721-4705-badf-87d9debdf6a5";

export const adminDb = getFirestore(getAdminApp(), DATABASE_ID);
export const adminAuth = getAuth(getAdminApp());
