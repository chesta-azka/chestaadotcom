const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/Header.tsx', 'utf-8');

// Update Layanan dropdown container to be scrollable
code = code.replace(
  /<div className="grid grid-cols-2 gap-x-4 gap-y-2">/g,
  '<div className="grid grid-cols-2 gap-x-4 gap-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">'
);

// We should also ensure the whole element has even more glassmorphism
// Dropdown container:
code = code.replace(
  /bg-white\/50 backdrop-blur-2xl rounded-3xl shadow-\[0_8px_32px_rgba\(0,0,0,0\.08\)\] border border-white\/80 ring-1 ring-white\/50 p-4/g,
  'bg-white/20 backdrop-blur-[40px] rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60 ring-1 ring-white/40 p-4'
);

// Arrow:
code = code.replace(
  /before:bg-white\/50 before:backdrop-blur-md/g,
  'before:bg-white/20 before:backdrop-blur-xl'
);

// Scrolled Navbar:
code = code.replace(
  /'bg-white\/40 backdrop-blur-2xl/g,
  "'bg-white/10 backdrop-blur-[40px]"
);

// Mobile Menu:
code = code.replace(
  /bg-white\/50 backdrop-blur-3xl/g,
  'bg-white/20 backdrop-blur-[60px]'
);

fs.writeFileSync('src/components/organisms/Header.tsx', code);
