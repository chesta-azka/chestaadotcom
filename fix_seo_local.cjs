const fs = require('fs');

let code = fs.readFileSync('src/lib/seo.ts', 'utf8');

code = code.replace(
  /"knowsAbout": \[\s*"Next\.js Web Development",\s*"AI Agents",\s*"AI & Cloud Automation",\s*"Bot Automation"\s*\]/,
  `"knowsAbout": [\n      "IT Services",\n      "Web Development",\n      "AI Automation",\n      "Next.js Web Development",\n      "AI Agents",\n      "Cloud Automation",\n      "Bot Automation"\n    ]`
);

fs.writeFileSync('src/lib/seo.ts', code);
