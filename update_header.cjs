const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/Header.tsx', 'utf8');

code = code.replace(/\$\{hidden && !mobileMenuOpen \? '-translate-y-full' : 'translate-y-0'\}/g, 'translate-y-0');

fs.writeFileSync('src/components/organisms/Header.tsx', code);
console.log('Fixed Header.tsx');
