const fs = require('fs');
let floatContent = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

if (!floatContent.includes('import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Sparkles }')) {
  floatContent = floatContent.replace(
    "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';",
    "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';"
  );
}

// Check handleFeedback
const handleFeedbackRegex = /onFeedback=\{\(type\) => handleFeedback\([^)]+\)\}/g;
floatContent = floatContent.replace(handleFeedbackRegex, "onFeedback={() => {}}");

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', floatContent);

let adminContent = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

adminContent = adminContent.replace(
  "import { collection, query, orderBy, limit, getDocs, onSnapshot } from 'firebase/firestore';",
  "import { collection, query, orderBy, limit, getDocs, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';"
);

fs.writeFileSync('src/pages/AdminPage.tsx', adminContent);

