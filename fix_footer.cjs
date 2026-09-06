const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FooterSection.tsx', 'utf8');

code = code.replace(/if \(location\.pathname\.startsWith\('\/academy'\)\) return null;\n*/g, '');

fs.writeFileSync('src/components/organisms/FooterSection.tsx', code);
console.log('Fixed FooterSection.tsx');
