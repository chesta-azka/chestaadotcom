const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

code = code.replace("import * as admin from 'firebase-admin';", "import { initializeApp, getApps } from 'firebase-admin/app';\nimport { getAuth } from 'firebase-admin/auth';");
code = code.replace("if (admin.apps.length === 0) { admin.initializeApp({ projectId: 'core-lambda-wcf5x' }); }", "if (getApps().length === 0) { initializeApp({ projectId: 'core-lambda-wcf5x' }); }");
code = code.replace("await admin.auth().verifyIdToken(token);", "await getAuth().verifyIdToken(token);");

fs.writeFileSync('server.ts', code);
