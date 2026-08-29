const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/Header.tsx', 'utf8');
code = code.replace(
  `{ name: 'Tentang', path: '/about' }`,
  `{ name: 'Tentang', path: '/about' },
    { name: 'Workflow', path: '/workflow' }`
);
fs.writeFileSync('src/components/organisms/Header.tsx', code);
console.log('Header updated successfully');
