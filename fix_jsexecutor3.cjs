const fs = require('fs');

let content = fs.readFileSync('src/app/academy/[slug]/page.tsx', 'utf-8');

content = content.replace(
  "const mainContent = `${files['main.js']}`;",
  "const mainContent = `\\${files['main.js'].replace(/\\`/g, '\\\\`').replace(/\\\\\\$/g, '\\\\\\\\$')}`; // safe escape"
);
content = content.replace("const url = URL.createObjectURL(blob);", "const url = URL.createObjectURL(blob);");

// Wait, the template string `html` was broken. Let's fix the whole JSExecutor.
