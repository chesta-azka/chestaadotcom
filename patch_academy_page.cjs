const fs = require('fs');

let content = fs.readFileSync('src/pages/AcademyPage.tsx', 'utf8');

// Ensure font is readable, add a subtle border
content = content.replace(
  'className="flex flex-1 overflow-hidden relative"',
  'className="flex flex-1 overflow-hidden relative max-w-[1600px] mx-auto w-full border-x border-slate-200/60 bg-white"'
);

// Tweak Google-like styling for Sidebar
content = content.replace(
  'bg-white border-r border-slate-200',
  'bg-slate-50/50 border-r border-slate-200/80'
);

// Sidebar active item styling
content = content.replace(
  /bg-blue-50\/80 text-blue-700 font-medium/g,
  'bg-blue-100/60 text-blue-800 font-bold shadow-[inset_4px_0_0_0_#2563eb]' // Google Cloud console style active indicator
);

fs.writeFileSync('src/pages/AcademyPage.tsx', content);
console.log('Patched AcademyPage UI');
