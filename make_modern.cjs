const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

// Global replacements to remove brutalism
code = code.replace(/shadow-\[[^\]]+rgba\(0,0,0,1\)\]/g, 'shadow-sm');
code = code.replace(/border-4 border-black/g, 'border border-slate-200 rounded-2xl');
code = code.replace(/border-2 border-black/g, 'border border-slate-200 rounded-xl');
code = code.replace(/border-b-4 border-black/g, 'border-b border-slate-200');
code = code.replace(/border-b-2 border-black/g, 'border-b border-slate-200');
code = code.replace(/border-l-4 border-black/g, 'border-l-4 border-purple-500');

// Typography
code = code.replace(/font-mono font-black uppercase tracking-tighter/g, 'font-display font-semibold text-slate-900 tracking-tight');
code = code.replace(/font-mono font-bold tracking-widest uppercase/g, 'text-xs font-semibold text-slate-500 uppercase tracking-wider');
code = code.replace(/font-mono font-bold/g, 'font-semibold');
code = code.replace(/font-mono/g, 'font-sans');

// Heavy black backgrounds
code = code.replace(/bg-black text-white/g, 'bg-white text-slate-800');
code = code.replace(/hover:bg-black hover:text-white/g, 'hover:bg-slate-50 hover:text-slate-900');
code = code.replace(/bg-white border border-slate-200 rounded-xl px-4 py-3 border-b border-slate-200/g, 'bg-slate-50 px-4 py-3 border-b border-slate-200 rounded-t-xl');

// Update BusinessConfigEditor specific ugly elements
code = code.replace(/bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-black\/20 font-sans text-lg font-semibold/g, 'bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-sans text-lg font-medium transition-all');

code = code.replace(/bg-white hover:bg-transparent hover:text-black text-slate-800 border border-slate-200 rounded-2xl font-semibold text-lg uppercase tracking-widest py-4 px-10/g, 'bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium text-base py-3 px-8 shadow-sm');

// Specific to BusinessConfigEditor submit button that might have been mangled
code = code.replace(/className="bg-white hover:bg-transparent hover:text-black text-slate-800 border border-slate-200 rounded-2xl/g, 'className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md font-medium px-8 py-3');

fs.writeFileSync('src/pages/AdminPage.tsx', code);
console.log('Applied anti-brutalism patch');
