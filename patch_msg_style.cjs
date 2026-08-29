const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf8');

const targetStyle = `        isUser 
          ? 'bg-slate-900 text-white border-slate-800' 
          : 'bg-white/95 backdrop-blur-md text-slate-800 border-slate-200/90 shadow-xs'`;

const replacementStyle = `        isUser 
          ? 'bg-slate-900 text-white border-slate-800' 
          : msg.isAdmin 
            ? 'bg-amber-50 backdrop-blur-md text-slate-900 border-amber-200 shadow-sm'
            : 'bg-white/95 backdrop-blur-md text-slate-800 border-slate-200/90 shadow-xs'`;

if(code.includes(targetStyle)) {
  code = code.replace(targetStyle, replacementStyle);
  fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
  console.log("Patched message style successfully!");
} else {
  console.log("Style string not found");
}
