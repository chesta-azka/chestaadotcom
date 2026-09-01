const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

// Global brutalism killers
code = code.replace(/text-3xl font-(sans|display) font-black text-black uppercase tracking-tighter/g, 'text-xl font-display font-medium text-slate-900');
code = code.replace(/text-3xl font-display font-black tracking-tighter uppercase text-black/g, 'text-xl font-display font-medium text-slate-900');

code = code.replace(/text-xl font-(sans|display) font-black text-black uppercase tracking-tighter mb-4 border-b border-slate-200 pb-2/g, 'text-lg font-display font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100');

// Subheadings
code = code.replace(/font-semibold uppercase tracking-widest text-sm/g, 'font-medium text-slate-700 text-sm');
code = code.replace(/font-semibold uppercase tracking-widest text-lg/g, 'font-medium text-slate-900 text-lg');

// Table Headers
code = code.replace(/font-sans text-xs font-bold uppercase border-b border-slate-200 text-black/g, 'font-medium text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200');
code = code.replace(/text-xs font-semibold tracking-widest text-slate-500 uppercase/g, 'font-medium text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200');

// Admin buttons
code = code.replace(/font-sans text-sm font-bold uppercase/g, 'font-medium text-sm');
code = code.replace(/font-bold uppercase tracking-wider/g, 'font-medium tracking-wide');
code = code.replace(/text-\[10px\] font-bold uppercase tracking-widest/g, 'text-[11px] font-medium tracking-wide');
code = code.replace(/uppercase tracking-widest/g, 'tracking-wide');
code = code.replace(/uppercase tracking-wider/g, 'tracking-wide');

// Business Config 
code = code.replace(/text-sm text-xs/g, 'text-sm');
code = code.replace(/text-black/g, 'text-slate-900');
code = code.replace(/font-bold/g, 'font-medium');
code = code.replace(/ring-black\/20/g, 'ring-purple-500/20 focus:border-purple-500');

code = code.replace(/bg-black hover:bg-transparent hover:text-slate-900 text-white border border-slate-200 rounded-2xl font-semibold text-lg uppercase tracking-widest py-4 px-10/g, 'bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium py-3 px-8 shadow-sm transition-colors');
code = code.replace(/bg-black hover:bg-transparent hover:text-slate-900 text-white border border-slate-200 rounded-2xl font-medium text-lg tracking-wide py-4 px-10 transition-all flex items-center gap-3 disabled:opacity-50/g, 'bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium py-3 px-8 shadow-sm transition-all flex items-center gap-3 disabled:opacity-50');

// Specific inputs
code = code.replace(/bg-white text-slate-800 font-sans text-sm font-medium hover:bg-slate-800 transition-colors/g, 'bg-white text-slate-700 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors');
code = code.replace(/px-6 py-2 bg-white text-slate-800 font-sans text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors/g, 'px-6 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-sm');
code = code.replace(/w-full py-4 bg-white text-slate-800 font-medium tracking-wide hover:bg-slate-800 disabled:opacity-50 transition-colors flex justify-center items-center gap-2/g, 'w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors flex justify-center items-center gap-2 shadow-sm');

// Comm-Link buttons
code = code.replace(/bg-white text-slate-800 text-\[11px\] font-medium tracking-wide hover:bg-slate-800 transition-colors/g, 'bg-white text-slate-700 border border-slate-200 rounded-lg text-[11px] font-medium hover:bg-slate-50 transition-colors');
code = code.replace(/px-3 py-1 bg-white text-slate-800 text-\[11px\] font-medium tracking-wide hover:bg-slate-800 transition-colors/g, 'px-3 py-1.5 bg-white text-slate-700 border border-slate-200 rounded-lg text-[11px] font-medium hover:bg-slate-50 transition-colors shadow-sm');

fs.writeFileSync('src/pages/AdminPage.tsx', code);
console.log('AdminPage.tsx completely de-brutalized.');
