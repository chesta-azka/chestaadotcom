const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  '{!/^\\/academy\\/.+/.test(location.pathname) ? <Header /> : null}',
  '<Header />'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Consolidated Header across all pages in App.tsx');
