const fs = require('fs');
let code = fs.readFileSync('src/pages/WorkflowPage.tsx', 'utf8');
code = code.replace(/\\\`/g, '`');
fs.writeFileSync('src/pages/WorkflowPage.tsx', code);
console.log('WorkflowPage fixed');
