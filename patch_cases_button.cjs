const fs = require('fs');
let code = fs.readFileSync('src/components/FeaturedCaseStudies.tsx', 'utf8');

// Improve button contrast on light mode overlay
code = code.replace(/className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all hover:scale-\[1.02\] active:scale-95 shadow-xl"/g, 'className="w-full py-3 bg-slate-100 dark:bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-200 transition-all hover:scale-[1.02] active:scale-95 shadow-lg border border-slate-200 dark:border-none"');

fs.writeFileSync('src/components/FeaturedCaseStudies.tsx', code);
console.log('Patched button');
