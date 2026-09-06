const fs = require('fs');
let code = fs.readFileSync('src/pages/CaseStudyDetailPage.tsx', 'utf8');

code = code.replace(/grid grid-cols-1 sm:grid-cols-2/g, 'grid grid-cols-1 md:grid-cols-2');

fs.writeFileSync('src/pages/CaseStudyDetailPage.tsx', code);
console.log('Fixed grid');
