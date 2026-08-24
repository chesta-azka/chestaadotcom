const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace("import admin from 'firebase-admin';", "import * as admin from 'firebase-admin';");
fs.writeFileSync('server.ts', code);
