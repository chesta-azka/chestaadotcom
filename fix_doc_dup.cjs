const fs = require('fs');
let adminContent = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

adminContent = adminContent.replace(
  "import { collection, query, orderBy, limit, getDocs, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';",
  "import { collection, query, orderBy, limit, getDocs, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';"
);

fs.writeFileSync('src/pages/AdminPage.tsx', adminContent);
