const fs = require('fs');
let adminContent = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

// Remove duplicate `doc`
adminContent = adminContent.replace(
  "import { collection, query, orderBy, limit, getDocs, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';",
  "import { collection, query, orderBy, limit, getDocs, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';"
);

// We need to move `exportToCSV` into `AITrainingTab`
const csvFuncRegex = /\/\/ @ts-ignore\nconst exportToCSV = \(\) => \{[\s\S]*?URL\.revokeObjectURL\(url\);\n\s*\};\n/m;
const csvFuncMatch = adminContent.match(csvFuncRegex);

if (csvFuncMatch) {
  adminContent = adminContent.replace(csvFuncMatch[0], ''); // remove from wherever it is
  
  // add it to AITrainingTab
  adminContent = adminContent.replace(
    'function AITrainingTab() {',
    'function AITrainingTab() {\n' + csvFuncMatch[0]
  );
}

fs.writeFileSync('src/pages/AdminPage.tsx', adminContent);
