const fs = require('fs');

let code = fs.readFileSync('src/components/organisms/QuickViewModal.tsx', 'utf8');

// Apply sharp-edged aesthetic
code = code.replace(/rounded-xl/g, 'rounded-none border-2 border-slate-900');
code = code.replace(/rounded-2xl/g, 'rounded-none border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)]');
code = code.replace(/rounded-full/g, 'rounded-none');
code = code.replace(/bg-purple-900/g, 'bg-slate-900');
code = code.replace(/hover:bg-purple-800/g, 'hover:bg-slate-800');
code = code.replace(/bg-purple-50/g, 'bg-slate-100');
code = code.replace(/text-purple-900/g, 'text-slate-900');
code = code.replace(/text-purple-950/g, 'text-slate-900 font-bold');
code = code.replace(/border-purple-100/g, 'border-slate-300');
code = code.replace(/text-purple-600/g, 'text-slate-900');

// Update to Coolvetica
code = code.replace(
  /className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-4"/,
  'className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-4" style={{ fontFamily: "\'Coolvetica\', sans-serif" }}'
);

fs.writeFileSync('src/components/organisms/QuickViewModal.tsx', code);
