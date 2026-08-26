const fs = require('fs');
let code = fs.readFileSync('src/pages/ServiceDetailPage.tsx', 'utf-8');

// Container
code = code.replace(/bg-black pt-32/g, 'bg-slate-50 pt-32');
code = code.replace(/bg-black text-white/g, 'bg-slate-50 text-slate-900');
code = code.replace(/selection:bg-white selection:text-black/g, 'selection:bg-indigo-100 selection:text-indigo-900');

// Borders & Backgrounds
code = code.replace(/border-b border-white\/10/g, 'border-b border-slate-200');
code = code.replace(/border border-white\/20 bg-white\/5/g, 'border border-slate-200 bg-white shadow-sm text-slate-600');
code = code.replace(/bg-white\/\[0\.03\] border border-white\/10/g, 'bg-white border border-slate-200 shadow-sm');
code = code.replace(/bg-white\/\[0\.03\] border border-white\/10 rounded-\[40px\] p-10 hover:bg-white\/\[0\.06\]/g, 'bg-white border border-slate-200 rounded-[40px] p-10 hover:shadow-lg hover:shadow-indigo-500/5 hover:border-indigo-200');
code = code.replace(/border border-white\/20 text-white/g, 'border border-slate-200 text-slate-900');

// Text Colors
code = code.replace(/text-neutral-400/g, 'text-slate-500');
code = code.replace(/text-white\/60/g, 'text-indigo-600');
code = code.replace(/text-white/g, 'text-slate-900'); // need to be careful with this global replacement
code = code.replace(/bg-white animate-pulse/g, 'bg-indigo-600 animate-pulse');

// Buttons
code = code.replace(/bg-white text-black hover:bg-neutral-200/g, 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md');
code = code.replace(/hover:bg-white\/10 transition-colors/g, 'hover:bg-slate-50 transition-colors');

// CheckCircle icon wrapper
code = code.replace(/w-14 h-14 rounded-2xl bg-white\/10 flex items-center justify-center mb-8 text-slate-900/g, 'w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-8 text-indigo-600');

fs.writeFileSync('src/pages/ServiceDetailPage.tsx', code);
