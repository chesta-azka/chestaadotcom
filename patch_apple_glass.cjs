const fs = require('fs');

// 1. HEADER HOVER ANIMATIONS
let header = fs.readFileSync('src/components/organisms/Header.tsx', 'utf-8');
header = header.replace(
  /whileHover=\{\{ scale: 1\.05 \}\} whileTap=\{\{ scale: 0\.95 \}\}/g,
  'whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}'
);
fs.writeFileSync('src/components/organisms/Header.tsx', header);
console.log('Patched Header animations');

// 2. CONTACT SECTION DARK MAP
let contact = fs.readFileSync('src/components/organisms/ContactSection.tsx', 'utf-8');
contact = contact.replace(
  /className="absolute inset-0 grayscale-\[80%\] hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-700 ease-in-out"/g,
  'className="absolute inset-0 invert-[.95] hue-rotate-180 brightness-[.85] contrast-[1.1] opacity-90 hover:opacity-100 transition-all duration-700 ease-in-out"'
);
contact = contact.replace(
  /className="absolute top-4 left-4 bg-white\/90 backdrop-blur-sm px-4 py-2 rounded-full shadow border border-slate-100 text-xs font-mono font-bold text-\[\#4f46e5\] flex items-center gap-2 pointer-events-none"/g,
  'className="absolute top-4 left-4 bg-[#090D18]/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2 pointer-events-none"'
);
fs.writeFileSync('src/components/organisms/ContactSection.tsx', contact);
console.log('Patched Contact map to dark mode');

// 3. SERVICES SECTION GLASSMORPHISM
let services = fs.readFileSync('src/components/organisms/ServicesSection.tsx', 'utf-8');
services = services.replace(
  /bg-white\/60 border border-slate-200\/80/g,
  'bg-white/40 backdrop-blur-md border border-white shadow-sm'
);
services = services.replace(
  /border border-slate-100 rounded-2xl bg-slate-50 hover:border-\[\#4f46e5\]\/30 hover:bg-slate-50/g,
  'border border-white/60 rounded-2xl bg-white/30 backdrop-blur-md hover:border-white hover:bg-white/50 shadow-sm'
);
fs.writeFileSync('src/components/organisms/ServicesSection.tsx', services);
console.log('Patched Services to Apple glassmorphism');
