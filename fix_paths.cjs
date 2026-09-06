const fs = require('fs');
let code = fs.readFileSync('src/pages/CaseStudyDetailPage.tsx', 'utf8');

code = code.replace(/\.\.\/\.\.\/\.\.\//g, '../');

fs.writeFileSync('src/pages/CaseStudyDetailPage.tsx', code);
console.log('Fixed paths');
