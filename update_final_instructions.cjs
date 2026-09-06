const fs = require('fs');

// 1. Update index.css
let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('@media (max-width: 768px)')) {
  css += `
@media (max-width: 768px) {
  .academy-text-content p {
    margin-bottom: 2rem !important;
    padding-bottom: 0.5rem !important;
    line-height: 1.75 !important;
  }
}
`;
}
fs.writeFileSync('src/index.css', css);
console.log('Updated index.css with mobile media query');

// 2. Double check App.tsx header condition
let appCode = fs.readFileSync('src/App.tsx', 'utf8');
if (!appCode.includes('/^\\/academy\\/.+/.test(location.pathname)')) {
  appCode = appCode.replace(
    '<Header />',
    '{!/^\\/academy\\/.+/.test(location.pathname) && <Header />}"'
  ).replace('""', '');
  fs.writeFileSync('src/App.tsx', appCode);
  console.log('Verified App.tsx header unmount logic');
}

console.log('All instructions verified.');
