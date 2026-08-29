const fs = require('fs');
let floatContent = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

floatContent = floatContent.replace(
  "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown } from 'lucide-react';",
  "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown, Sparkles } from 'lucide-react';"
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', floatContent);
