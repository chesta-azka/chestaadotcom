const fs = require('fs');
let adminContent = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

adminContent = adminContent.replace(
  "          data.forEach(s => {",
  "          data.forEach((s: any) => {"
);

fs.writeFileSync('src/pages/AdminPage.tsx', adminContent);
