const fs = require('fs');
let code = fs.readFileSync('src/pages/CaseStudyDetailPage.tsx', 'utf8');

// Remove whileHover={{ scale: 1.02 }} from parent card container
code = code.replace(
  'whileHover={{ scale: 1.02 }} \n             className="bg-white/95 backdrop-blur-3xl rounded-3xl p-8 border border-slate-200/90 shadow-xl shadow-purple-950/5 h-max cursor-pointer"',
  'className="bg-white/95 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-purple-950/5 h-max"'
);

// Update grid items padding from p-5 to p-4 (16px) and responsive gaps
code = code.replace(
  'className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-4 mb-8"',
  'className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-3 sm:gap-4 mb-8"'
);

code = code.replace(
  /className="bg-slate-50\/80 rounded-2xl p-5 border border-slate-100\/50/g,
  'className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100/50'
);

code = code.replace(
  /className="bg-purple-50\/50 rounded-2xl p-5 border border-purple-100\/50/g,
  'className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100/50'
);

code = code.replace(
  /className="bg-amber-50\/50 rounded-2xl p-5 border border-amber-100\/50/g,
  'className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100/50'
);

fs.writeFileSync('src/pages/CaseStudyDetailPage.tsx', code);
console.log('Updated CaseStudyDetailPage card');
