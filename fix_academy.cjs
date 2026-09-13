const fs = require('fs');

let code = fs.readFileSync('src/pages/AcademyPage.tsx', 'utf8');

// Update to ensure Coolvetica and sharp edges are applied
code = code.replace(
  /className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight leading-\[1\.15\]"/g,
  'className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 mb-6 tracking-tight leading-[1.15]" style={{ fontFamily: "\'Coolvetica\', sans-serif" }}'
);

code = code.replace(
  /className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4 tracking-tight"/g,
  'className="text-2xl md:text-3xl font-display font-black text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "\'Coolvetica\', sans-serif" }}'
);

// Apply sharp-edged bento styling (remove extreme border-radius, keep it tight/sharp)
code = code.replace(/rounded-2xl/g, 'rounded-none border-2 border-slate-900');
code = code.replace(/rounded-xl/g, 'rounded-none border-2 border-slate-900');

fs.writeFileSync('src/pages/AcademyPage.tsx', code);
