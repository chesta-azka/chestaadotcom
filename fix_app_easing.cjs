const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Use regex to remove ease property
content = content.replace(/,\s*ease:\s*"easeOut"/g, '');

fs.writeFileSync('src/App.tsx', content);
