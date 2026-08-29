const fs = require('fs');
let floatContent = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

if (!floatContent.includes("import { useAuth }")) {
  floatContent = floatContent.replace(
    "import ReactMarkdown from 'react-markdown';",
    "import ReactMarkdown from 'react-markdown';\nimport { useAuth } from '../../contexts/AuthContext';"
  );
}

floatContent = floatContent.replace(
  "const location = useLocation();",
  "const location = useLocation();\n  const { user } = useAuth() || {};"
);

const addDocTarget = `      addDoc(collection(db, 'chat_history'), {
        message: content,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent
      }).catch(err => console.error(err));`;
const addDocReplacement = `      addDoc(collection(db, 'chat_history'), {
        message: content,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        userId: user ? user.uid : 'anonymous'
      }).catch(err => console.error(err));`;

floatContent = floatContent.replace(addDocTarget, addDocReplacement);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', floatContent);
