const fs = require('fs');
let adminContent = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const csvFuncRegex = /\/\/ @ts-ignore\nconst exportToCSV = \(\) => \{[\s\S]*?URL\.revokeObjectURL\(url\);\n\s*\};/m;

const csvFuncMatch = adminContent.match(csvFuncRegex);

if (csvFuncMatch) {
  adminContent = adminContent.replace(csvFuncMatch[0], ''); // remove from AdminDashboard
  
  // add it to AITrainingTab
  adminContent = adminContent.replace(
    'function AITrainingTab() {',
    'function AITrainingTab() {\n  ' + csvFuncMatch[0]
  );
}

fs.writeFileSync('src/pages/AdminPage.tsx', adminContent);

