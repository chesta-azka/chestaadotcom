const fs = require('fs');

const code = `import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCcqgaoqt1IXxXFSpg4DcrVmSHaqqIefCM",
  authDomain: "core-lambda-wcf5x.firebaseapp.com",
  projectId: "core-lambda-wcf5x",
  storageBucket: "core-lambda-wcf5x.firebasestorage.app",
  messagingSenderId: "768492514929",
  appId: "1:768492514929:web:38f5fba77ab247c592f5d0"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Force long-polling to prevent WebSocket timeouts in sandboxed/iframe environments
let firestoreDb;
try {
  firestoreDb = initializeFirestore(app, {
    experimentalForceLongPolling: true
  }, "ai-studio-07319849-f721-4705-badf-87d9debdf6a5");
} catch (error) {
  // Fallback if already initialized (e.g. during Hot Module Replacement)
  firestoreDb = getFirestore(app, "ai-studio-07319849-f721-4705-badf-87d9debdf6a5");
}

export const db = firestoreDb;
`;

fs.writeFileSync('src/lib/firebase.ts', code);
