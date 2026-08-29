const fs = require('fs');
let text = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

text = text.replace(
  "import { collection, addDoc, serverTimestamp, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';",
  "import { collection, addDoc, serverTimestamp, doc, setDoc, getDoc, updateDoc, query, where, onSnapshot } from 'firebase/firestore';"
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', text);
