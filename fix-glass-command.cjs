const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/CommandPalette.tsx', 'utf-8');

code = code.replace(
  /className="fixed top-24 left-1\/2 -translate-x-1\/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 z-\[101\] overflow-hidden flex flex-col max-h-\[70vh\]"/g,
  'className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white/60 backdrop-blur-3xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-white/80 ring-1 ring-white/50 z-[101] overflow-hidden flex flex-col max-h-[70vh]"'
);

code = code.replace(
  /border-b border-slate-100/g,
  'border-b border-white/40'
);

fs.writeFileSync('src/components/organisms/CommandPalette.tsx', code);
