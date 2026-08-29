const fs = require('fs');
let code = fs.readFileSync('src/components/FeaturedCaseStudies.tsx', 'utf8');

// Replace dark mode specific classes to look much more premium in light mode and adapt perfectly in dark mode.
code = code.replace(/bg-white\/60 dark:bg-slate-900\/60/g, 'bg-white/80 dark:bg-slate-900/60');
code = code.replace(/shadow-sm hover:shadow-xl/g, 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)]');
code = code.replace(/bg-slate-900\/95 dark:bg-slate-950\/95/g, 'bg-white/95 dark:bg-slate-950/95');
code = code.replace(/text-slate-300 font-medium/g, 'text-slate-600 dark:text-slate-300 font-medium');

fs.writeFileSync('src/components/FeaturedCaseStudies.tsx', code);
console.log('Patched FeaturedCaseStudies.tsx');
