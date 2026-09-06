const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Use regex to replace all instances of ease arrays with "easeOut"
content = content.replace(/ease:\s*\[[0-9.,\s]*\]/g, 'ease: "easeOut"');

fs.writeFileSync('src/App.tsx', content);
