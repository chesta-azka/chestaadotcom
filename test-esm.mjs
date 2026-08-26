import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { readFileSync } from 'fs';
const config = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp(config);
try {
  const db = getFirestore(app, config.firestoreDatabaseId);
  console.log("Success ESM");
} catch (e) {
  console.error("Error ESM:", e.message);
}
