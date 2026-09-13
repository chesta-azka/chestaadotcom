const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

code = code.replace(
  /<\/section>\s*\{\/\* Portfolio \/ Featured Case Studies Section \*\/\}/,
  '</section>\n      \n      <hr className="w-full border-t border-slate-200 m-0 p-0" />\n\n      {/* Portfolio / Featured Case Studies Section */}'
);

code = code.replace(
  /<\/motion\.section>\s*\{\/\* Simplified 'About' Section focused on IT Solution Expertise \*\/\}/,
  '</motion.section>\n      \n      <hr className="w-full border-t border-slate-200 m-0 p-0" />\n\n      {/* Simplified \'About\' Section focused on IT Solution Expertise */}'
);

fs.writeFileSync('src/app/page.tsx', code);
