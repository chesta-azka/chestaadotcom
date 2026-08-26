const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/QuickQuoteModal.tsx', 'utf-8');

code = code.replace(
  /w-full sm:w-\[480px\] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-\[101\] overflow-hidden border border-slate-100/g,
  'w-full sm:w-[480px] bg-white/40 backdrop-blur-3xl rounded-t-3xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] z-[101] overflow-hidden border border-white/60 ring-1 ring-white/50'
);

code = code.replace(
  /bg-white rounded-full border border-slate-200/g,
  'bg-white/50 backdrop-blur-md rounded-full border border-white/80'
);

code = code.replace(
  /border border-slate-200 bg-white/g,
  'border border-white/60 bg-white/40 backdrop-blur-md shadow-sm'
);

fs.writeFileSync('src/components/organisms/QuickQuoteModal.tsx', code);
