const fs = require('fs');

let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf-8');

// Replace classes
code = code.replace(/bg-black text-white/g, 'bg-white text-slate-900');
code = code.replace(/selection:bg-white selection:text-black/g, 'selection:bg-indigo-100 selection:text-indigo-900');
code = code.replace(/text-neutral-400/g, 'text-slate-500');
code = code.replace(/bg-white\/\[0\.03\] backdrop-blur-xl border border-white\/\[0\.08\] hover:bg-white\/\[0\.06\] hover:border-white\/\[0\.15\]/g, 'bg-slate-50/50 border border-slate-200 hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5');
code = code.replace(/bg-white\/10 text-white backdrop-blur-md/g, 'bg-indigo-50 text-indigo-600');
code = code.replace(/border border-white\/20 flex items-center justify-center group-hover:bg-white group-hover:text-black/g, 'border border-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 text-slate-400');

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
