const fs = require('fs');

let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

// Fix sidebar layout
code = code.replace(
  /absolute lg:static top-0 left-0 h-full bg-slate-50\/50 border-r border-slate-200\/80/g,
  'absolute lg:static top-0 left-0 lg:left-auto lg:right-0 h-full bg-slate-50/50 border-r lg:border-r-0 lg:border-l border-slate-200/80 lg:order-2'
);

// Update title in header
code = code.replace(
  /\{slug === 'ai-integration' \? 'AI & Automation Workflow' : 'Enterprise SaaS Development'\}/g,
  "{'Full-Stack Music Streaming App Development'}"
);

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Patched AcademyMasterclassPage.tsx');
