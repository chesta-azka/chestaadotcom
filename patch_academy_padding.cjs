const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

code = code.replace(
  /<div className="h-screen w-full bg-\[#f8f9fa\] font-sans text-slate-800 flex flex-col overflow-hidden selection:bg-purple-200 selection:text-purple-900 pt-20">/,
  `<div className="h-screen w-full bg-[#f8f9fa] font-sans text-slate-800 flex flex-col overflow-hidden selection:bg-purple-200 selection:text-purple-900">`
);

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Removed pt-20 padding');
