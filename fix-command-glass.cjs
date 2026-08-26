const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/CommandPalette.tsx', 'utf-8');

code = code.replace(
  /bg-white\/60 backdrop-blur-3xl/g,
  'bg-white/10 backdrop-blur-[60px]'
);

code = code.replace(
  /bg-white border-b border-white\/40/g,
  'bg-white/10 backdrop-blur-3xl border-b border-white/20' // In case I need to remove solid background from input area
);

fs.writeFileSync('src/components/organisms/CommandPalette.tsx', code);
