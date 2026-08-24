const fs = require('fs');
const path = 'server.ts';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(/gemini-2\.5-flash/g, 'gemini-1.5-flash');

fs.writeFileSync(path, code);
