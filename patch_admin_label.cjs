const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf8');

const targetBubble = `      <div className={\`group relative max-w-[85%] break-words [word-break:break-word] overflow-hidden px-4 py-3 text-[13px] font-sans leading-relaxed shadow-xs border \${borderRadiusClass} \${
        isUser 
          ? 'bg-slate-900 text-white border-slate-800' 
          : msg.isAdmin 
            ? 'bg-amber-50 backdrop-blur-md text-slate-900 border-amber-200 shadow-sm'
            : 'bg-white/95 backdrop-blur-md text-slate-800 border-slate-200/90 shadow-xs'
      }\`}>
        {msg.role === 'ai' ? (`;

const replacementBubble = `      <div className={\`group relative max-w-[85%] break-words [word-break:break-word] overflow-hidden px-4 py-3 text-[13px] font-sans leading-relaxed shadow-xs border \${borderRadiusClass} \${
        isUser 
          ? 'bg-slate-900 text-white border-slate-800' 
          : msg.isAdmin 
            ? 'bg-amber-50 backdrop-blur-md text-slate-900 border-amber-300 shadow-md ring-1 ring-amber-100'
            : 'bg-white/95 backdrop-blur-md text-slate-800 border-slate-200/90 shadow-xs'
      }\`}>
        {msg.isAdmin && (
          <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-amber-200/60">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Principal Engineer (Manusia)</span>
          </div>
        )}
        {msg.role === 'ai' ? (`;

if(code.includes(targetBubble)) {
  code = code.replace(targetBubble, replacementBubble);
  console.log("Patched bubble styling");
} else {
  console.log("Target bubble not found");
}

const targetInstant = `const newHistory = [...chatHistory, { role: 'user', content }, { role: 'ai', content: 'Tersambung! Principal Engineer kami akan segera merespons pesan Anda.' }];`;
const replacementInstant = `const newHistory = [...chatHistory, { role: 'user', content }, { role: 'ai', content: 'Tersambung! Principal Engineer kami telah bergabung dalam percakapan.', isAdmin: true }];`;

if(code.includes(targetInstant)) {
  code = code.replace(targetInstant, replacementInstant);
  console.log("Patched instant response");
} else {
  console.log("Target instant not found");
}

const targetButtons = `{msg.role === 'ai' && !isTyping && (`;
const replacementButtons = `{msg.role === 'ai' && !msg.isAdmin && !isTyping && (`;

if(code.includes(targetButtons)) {
  code = code.replace(targetButtons, replacementButtons);
  console.log("Patched buttons");
} else {
  console.log("Target buttons not found");
}

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
