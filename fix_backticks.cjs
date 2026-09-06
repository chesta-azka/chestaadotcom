const fs = require('fs');

let content = fs.readFileSync('src/pages/AcademyTutorialPage.tsx', 'utf-8');

// The issue is `\`... \${ ... }\``
content = content.replace(/\\\`/g, '`').replace(/\\\$/g, '$');

fs.writeFileSync('src/pages/AcademyTutorialPage.tsx', content);
