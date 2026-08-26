const fs = require('fs');
let code = fs.readFileSync('src/components/atoms/Breadcrumbs.tsx', 'utf-8');

code = code.replace(
  /bg-white\/40 backdrop-blur-xl border border-white\/80 shadow-\[0_4px_24px_-8px_rgba\(0,0,0,0\.1\)\] ring-1 ring-slate-900\/5/g,
  'bg-white/30 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)] ring-1 ring-white/50'
);

fs.writeFileSync('src/components/atoms/Breadcrumbs.tsx', code);
