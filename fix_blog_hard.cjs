const fs = require('fs');
let code = fs.readFileSync('src/pages/BlogHubPage.tsx', 'utf8');

const regex = /  return \(\n    <>\n      <SEOProvider \n        title="Insights & AI Engineering Blog \| CHESTADOTCOM"\n        description="Deep dives into digital architecture, AI implementations, and enterprise solutions."\n      \/>\n/g;

code = code.replace(regex, "");

fs.writeFileSync('src/pages/BlogHubPage.tsx', code);
