const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

// 1. Update aside tag with sidebar-wrapper and sticky styling
code = code.replace(
  /<aside className=\{\`([\s\S]*?)\`\}>/,
  `<aside className={\`sidebar-wrapper sticky top-16 h-[calc(100vh-4rem)] lg:static lg:h-full bg-slate-50/50 border-r lg:border-r-0 lg:border-l border-slate-200/80 lg:order-2 w-72 lg:w-80 flex-shrink-0 flex flex-col transition-transform duration-300 z-40 \${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}\`}>`
);

// 2. Add subtle glassmorphism to sidebar header
code = code.replace(
  /<div className="p-4 border-b border-slate-100 shrink-0 bg-white">/,
  `<div className="p-4 border-b border-slate-200/60 shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">`
);

// 3. Add sidebar-nav-container class to the nav items container
code = code.replace(
  /<div className="flex-1 overflow-y-auto p-3 custom-scrollbar">/,
  `<div className="flex-1 overflow-y-auto p-3 custom-scrollbar sidebar-nav-container">`
);

// 4. Update submodule buttons to motion.button for framer-motion scale and shadow shift
code = code.replace(
  /<button\s+key=\{sub\.id\}\s+onClick=\{\(\) => handleSidebarClick\(sub\.id\)\}\s+className=\{\`([^`]+)\`\}/g,
  `<motion.button\n                              key={sub.id}\n                              onClick={() => handleSidebarClick(sub.id)}\n                              whileHover={{ scale: 1.02, x: 4 }}\n                              whileTap={{ scale: 0.98 }}\n                              transition={{ type: "spring", stiffness: 400, damping: 25 }}\n                              className={\`$1 hover:shadow-sm\`}`
);

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Updated sidebar wrapper, header glassmorphism, and framer-motion animations');
