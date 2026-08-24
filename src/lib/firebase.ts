import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
export const db = getFirestore(app, "ai-studio-07319849-f721-4705-badf-87d9debdf6a5");
