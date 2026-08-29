const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

code = code.replace(
  "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown, Sparkles } from 'lucide-react';",
  "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';"
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
