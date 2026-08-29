const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/    await db\.collection\('ai_leads'\)\.doc\(leadId\)\.set\(\{[\s\S]*?\}\);\n    await db\.collection\('ai_chat_sessions'\)\.doc\(leadId\)\.update\(\{ leadScored: true \}\);/g, '');

fs.writeFileSync('server.ts', code);
console.log("Patched score-lead");
