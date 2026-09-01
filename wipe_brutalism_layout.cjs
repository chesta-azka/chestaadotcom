const fs = require('fs');
let code = fs.readFileSync('src/components/templates/AdminDashboardLayout.tsx', 'utf8');

// Global brutalism killers
code = code.replace(/bg-black text-white px-2 py-1/g, 'bg-purple-600 text-white px-3 py-1.5 rounded-lg');
code = code.replace(/text-2xl font-display font-black tracking-tighter uppercase/g, 'text-xl font-display font-bold text-slate-900');
code = code.replace(/font-mono font-bold uppercase tracking-tight text-sm transition-all border-2/g, 'font-medium text-[13px] transition-all rounded-xl');
code = code.replace(/bg-black text-white border-black translate-x-2/g, 'bg-purple-50 text-purple-700 shadow-sm');
code = code.replace(/bg-transparent text-slate-600 border-transparent hover:border-black hover:text-black hover:translate-x-1/g, 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900');
code = code.replace(/border-r-4 border-black/g, 'border-r border-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.02)]');
code = code.replace(/border-2 border-black/g, 'border border-slate-200 shadow-sm rounded-xl');
code = code.replace(/bg-white border-2 border-black font-mono font-bold uppercase text-sm hover:bg-black hover:text-white/g, 'bg-white border border-slate-200 rounded-xl font-medium text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm');
code = code.replace(/border-b-2 border-black/g, 'border-b border-slate-200');
code = code.replace(/Brutalist Sidebar/g, 'Modern Sidebar');

fs.writeFileSync('src/components/templates/AdminDashboardLayout.tsx', code);
console.log('AdminDashboardLayout.tsx completely de-brutalized.');
