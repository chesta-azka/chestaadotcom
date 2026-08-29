const fs = require('fs');

// Fix FloatingAIAssistant.tsx
let floatCode = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');
if (!floatCode.includes("AlertTriangle")) {
  floatCode = floatCode.replace(
    "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';",
    "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';"
  );
  fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', floatCode);
}

// Fix AdminPage.tsx
let adminCode = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');
if (!adminCode.includes("import {") || !adminCode.includes("Briefcase")) {
  adminCode = adminCode.replace(
    "import { LogOut",
    "import { Briefcase, LogOut"
  );
  fs.writeFileSync('src/pages/AdminPage.tsx', adminCode);
}

