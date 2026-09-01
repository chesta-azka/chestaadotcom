const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

code = code.replace(/bg-black flex items-center justify-center text-white/g, 'bg-purple-100 flex items-center justify-center text-purple-600 rounded-xl');
code = code.replace(/border-b-4 lg:border-b-0 lg:border-r-4 border-black/g, 'border-b lg:border-b-0 lg:border-r border-slate-200');
code = code.replace(/bg-black hover:bg-transparent hover:text-slate-900 text-white border border-slate-200 rounded-2xl font-semibold text-lg tracking-wide py-4 px-10 transition-all flex items-center gap-3 disabled:opacity-50/g, 'bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium py-3 px-8 shadow-sm transition-all flex items-center gap-3 disabled:opacity-50');

fs.writeFileSync('src/pages/AdminPage.tsx', code);
console.log('AdminPage.tsx final cleanup.');
