const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/Header.tsx', 'utf8');

// 1. Remove the "floating pill" wrapper and make it a clean full-width Material 3 AppBar
// Let's replace the <header> structure:
// <div className="flex justify-center px-4 md:px-6 mt-2 md:mt-3 w-full">
content = content.replace(
  /<div className="flex justify-center px-4 md:px-6 mt-2 md:mt-3 w-full">/g,
  '<div className="w-full">'
);

// <motion.div ... className="transition-all duration-300 ease-out rounded-full ...">
content = content.replace(
  /className={\`transition-all duration-300 ease-out rounded-full px-4 md:px-5 flex items-center justify-between w-full max-w-4xl pointer-events-auto \$\{([\s\S]*?)\}\`}/g,
  `className={\`transition-all duration-300 ease-out flex items-center justify-between w-full px-4 md:px-8 pointer-events-auto \$\{
              scrolled
                ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-2' 
                : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/40 py-2.5'
            }\`}`
);

// 2. Nav links inside: remove uppercase, make them Title Case, change text to MD3 style pill
// The desktop nav links have:
// px-2.5 py-1.5 rounded-full text-[11px] font-bold font-sans tracking-wide uppercase
content = content.replace(
  /text-\[11px\] font-bold font-sans tracking-wide uppercase transition-colors duration-200 relative flex items-center/g,
  'text-sm font-medium font-sans tracking-tight transition-colors duration-200 relative flex items-center px-4 py-2'
);
// Remove the explicit uppercase px-2.5 py-1.5 from the link className string in the file (just in case)
content = content.replace(/px-2\.5 py-1\.5/g, '');

// The active/hover states for nav links:
content = content.replace(
  /'text-purple-700 bg-purple-50\/80'/g,
  "'text-purple-900 bg-purple-100/60 font-semibold'"
);
content = content.replace(
  /'text-slate-500 hover:text-purple-600 hover:bg-purple-50\/50'/g,
  "'text-slate-600 hover:text-purple-900 hover:bg-slate-100/60'"
);

// Remove the animated underline indicator because MD3 just uses the pill background.
content = content.replace(
  /\{isActive && \(\s*<motion\.div\s*layoutId="activeNavIndicator"[\s\S]*?\/>\s*\)\}/g,
  ''
);

// 3. Let's make the mobile active states similar
content = content.replace(
  /'bg-purple-600\/30 border border-purple-400\/50 text-white shadow-lg shadow-purple-900\/30'/g,
  "'bg-purple-100/80 border border-purple-200/50 text-purple-900 shadow-sm'"
);
content = content.replace(
  /'bg-white\/5 border border-white\/10 text-slate-200 hover:bg-white\/10 hover:text-white'/g,
  "'bg-transparent border border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'"
);
// For the icons in mobile menu
content = content.replace(
  /'bg-purple-600 text-white'/g,
  "'bg-purple-900 text-white'"
);
content = content.replace(
  /'bg-white\/10 text-purple-300'/g,
  "'bg-slate-100 text-purple-900'"
);

// Dark Mobile Menu overrides (we are transforming it to a clean light MD3 menu)
content = content.replace(
  /className="fixed inset-0 z-40 flex justify-end pointer-events-auto bg-slate-900\/40 backdrop-blur-sm"/g,
  'className="fixed inset-0 z-40 flex justify-end pointer-events-auto bg-slate-900/20 backdrop-blur-sm"'
);
content = content.replace(
  /className="w-\[85vw\] sm:w-\[400px\] h-full bg-slate-950 border-l border-white\/10 shadow-2xl flex flex-col relative"/g,
  'className="w-[85vw] sm:w-[400px] h-full bg-white border-l border-slate-200 shadow-2xl flex flex-col relative"'
);

// Text colors inside mobile menu:
content = content.replace(/text-slate-400/g, 'text-slate-500');
content = content.replace(/text-slate-300/g, 'text-slate-600');
content = content.replace(/text-slate-200/g, 'text-slate-800');
content = content.replace(/border-white\/10/g, 'border-slate-200');

fs.writeFileSync('src/components/organisms/Header.tsx', content);
console.log('Patched Header.tsx for Google Material 3 UI/UX');
