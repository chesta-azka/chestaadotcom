const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/Header.tsx', 'utf-8');

code = code.replace(
  /custom-scrollbar/g,
  '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300/50 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/50 [&::-webkit-scrollbar-thumb]:rounded-full'
);

// also let's make hover state on links in the dropdown have glass effect rather than solid bg-slate-50
code = code.replace(
  /hover:bg-slate-50/g,
  'hover:bg-white/30'
);

fs.writeFileSync('src/components/organisms/Header.tsx', code);
