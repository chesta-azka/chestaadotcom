const fs = require('fs');
let code = fs.readFileSync('src/pages/ProjectDetailPage.tsx', 'utf8');

code = code.replace(/<p className="text-\[15px\] text-slate-600 leading-relaxed md:leading-loose">/g, '<p className="text-[15px] text-slate-600 leading-loose mb-6">');

fs.writeFileSync('src/pages/ProjectDetailPage.tsx', code);
console.log('Updated ProjectDetailPage paragraphs');
