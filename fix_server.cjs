const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

const replacement = `
import { getFirestore } from 'firebase-admin/firestore';
import fsSync from 'fs';
const firebaseConfig = JSON.parse(fsSync.readFileSync('./firebase-applet-config.json', 'utf8'));

if (getApps().length === 0) { 
  initializeApp({ projectId: firebaseConfig.projectId }); 
}
`;

server = server.replace(/import \{ getFirestore \} from 'firebase-admin\/firestore';\nif \(getApps\(\)\.length === 0\) \{ initializeApp\(\{ projectId: 'core-lambda-wcf5x' \}\); \}/, replacement);

server = server.replace(/const db = getFirestore\(\);/g, `const db = getFirestore(getApps()[0], firebaseConfig.firestoreDatabaseId);`);

fs.writeFileSync('server.ts', server);
console.log('Server updated');
