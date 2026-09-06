const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// If pathname starts with /academy/ and has more characters (i.e. /academy/slug), hide. 
// Otherwise show.
// Regex check: /^\/academy\/.+/
// We can use a small function or regex.
const replacement = `{!/^\\/academy\\/.+/.test(location.pathname) ? <Header /> : null}`;
const replacementFooter = `{!/^\\/academy\\/.+/.test(location.pathname) ? <FooterSection /> : null}`;

code = code.replace(/\{!location\.pathname\.startsWith\('\/academy\/'\) \? <Header \/> : null\}/g, replacement);
code = code.replace(/\{!location\.pathname\.startsWith\('\/academy\/'\) \? <FooterSection \/> : null\}/g, replacementFooter);

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed App.tsx conditionals again');
