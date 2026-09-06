const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /\{!location\.pathname\.startsWith\('\/academy\/'\) \|\| location\.pathname === '\/academy' \? <Header \/> : null\}/g,
  `{!location.pathname.startsWith('/academy/') ? <Header /> : null}`
);

code = code.replace(
  /\{!location\.pathname\.startsWith\('\/academy\/'\) \|\| location\.pathname === '\/academy' \? <FooterSection \/> : null\}/g,
  `{!location.pathname.startsWith('/academy/') ? <FooterSection /> : null}`
);

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed App.tsx conditionals');
