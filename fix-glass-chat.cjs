const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// 1. Main container
code = code.replace(
  /bg-white rounded-3xl shadow-\[0_20px_60px_-15px_rgba\(0,0,0,0\.1\)\] border border-slate-100/g,
  'bg-white/60 backdrop-blur-3xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-white/80 ring-1 ring-white/50'
);

// 2. Header
code = code.replace(
  /p-4 border-b border-slate-100 bg-white shrink-0/g,
  'p-4 border-b border-white/40 bg-white/40 backdrop-blur-md shrink-0'
);

// 3. Input Area
code = code.replace(
  /p-4 bg-white border-t border-slate-100 flex flex-col/g,
  'p-4 bg-white/40 backdrop-blur-md border-t border-white/40 flex flex-col'
);

// 4. Notification Bubble
code = code.replace(
  /bg-white border border-slate-200 shadow-xl rounded-2xl p-4 max-w-\[250px\] cursor-pointer/g,
  'bg-white/60 backdrop-blur-2xl border border-white/80 ring-1 ring-white/50 shadow-xl rounded-2xl p-4 max-w-[250px] cursor-pointer'
);

// 5. Triangle
code = code.replace(
  /bg-white border-b border-r border-slate-200 rotate-45/g,
  'bg-white border-b border-r border-white/80 rotate-45' // simple fallback for triangle
);

// 6. AI message bubbles
code = code.replace(
  /'bg-white text-slate-700 border-slate-200\/60 rounded-bl-sm'/g,
  "'bg-white/70 backdrop-blur-md text-slate-700 border-white/80 shadow-sm rounded-bl-sm'"
);

// 7. Typing indicator bubble
code = code.replace(
  /bg-white border border-slate-200\/60 shadow-sm rounded-2xl rounded-bl-sm/g,
  'bg-white/70 backdrop-blur-md border border-white/80 shadow-sm rounded-2xl rounded-bl-sm'
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
