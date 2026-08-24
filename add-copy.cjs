const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

// import Copy icon
code = code.replace(
  "import { Bot, X, Send, Sparkles, Clock, Code2, TrendingUp, MessageCircle, Calculator } from 'lucide-react';",
  "import { Bot, X, Send, Sparkles, Clock, Code2, TrendingUp, MessageCircle, Calculator, Copy } from 'lucide-react';"
);

// Add copy button next to AI messages
const aiMessageStr = `<div className="whitespace-pre-wrap">{msg.content}</div>`;
const newAiMessageStr = `<div className="whitespace-pre-wrap">{msg.content}</div>\n                    {msg.role === 'ai' && (\n                      <button \n                        onClick={() => { navigator.clipboard.writeText(msg.content); toast.success('Disalin ke papan klip'); }}\n                        className="absolute -bottom-6 left-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-[10px]"\n                      >\n                        <Copy size={10} /> Salin\n                      </button>\n                    )}`;
code = code.replace(aiMessageStr, newAiMessageStr);

// Add group class to ai message container to show the copy button on hover
code = code.replace(
  `<div className={\`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] font-sans leading-relaxed shadow-sm border \${`,
  `<div className={\`group relative max-w-[85%] rounded-2xl px-4 py-3 text-[13px] font-sans leading-relaxed shadow-sm border \${`
);

fs.writeFileSync(path, code);
