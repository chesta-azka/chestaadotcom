const fs = require('fs');

let code = fs.readFileSync('src/components/organisms/Header.tsx', 'utf-8');

// 1. Scrolled Navbar State
code = code.replace(
  /'bg-white\/80 backdrop-blur-2xl border border-slate-200 shadow-\[0_8px_32px_rgba\(0,0,0,0\.12\)\] py-3'/g,
  "'bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(30,41,59,0.1)] ring-1 ring-white/50 py-3'"
);

// 2. Layanan Dropdown Menu
code = code.replace(
  /className="bg-white rounded-3xl shadow-xl shadow-slate-900\/10 border border-slate-100 p-4 relative/g,
  'className="bg-white/50 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/80 ring-1 ring-white/50 p-4 relative'
);
code = code.replace(
  /before:bg-white before:border-l before:border-t before:border-slate-100/g,
  'before:bg-white/50 before:backdrop-blur-md before:border-l before:border-t before:border-white/80'
);

// 3. Mobile Menu
code = code.replace(
  /bg-white\/90 backdrop-blur-2xl border border-slate-200 shadow-2xl rounded-3xl/g,
  'bg-white/50 backdrop-blur-3xl border border-white/80 ring-1 ring-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-3xl'
);

fs.writeFileSync('src/components/organisms/Header.tsx', code);
