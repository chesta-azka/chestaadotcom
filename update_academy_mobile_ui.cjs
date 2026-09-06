const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

// 1. Fix mobile sidebar fixed positioning and shadow
code = code.replace(
  /className=\{\`sidebar-wrapper sticky top-16 h-\[calc\(100vh-4rem\)\] lg:static lg:h-full bg-slate-50\/50 border-r lg:border-r-0 lg:border-l border-slate-200\/80 lg:order-2 w-72 lg:w-80 flex-shrink-0 flex flex-col transition-transform duration-300 z-40 \$\{sidebarOpen \? 'translate-x-0' : '-translate-x-full lg:translate-x-0'\}\`\}/,
  `className={\`sidebar-wrapper fixed inset-y-0 left-0 top-16 h-[calc(100vh-4rem)] lg:static lg:h-full lg:top-auto bg-white border-r lg:border-r-0 lg:border-l border-slate-200/80 lg:order-2 w-80 flex-shrink-0 flex flex-col transition-transform duration-300 z-50 shadow-2xl lg:shadow-none \${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}\`}`
);

// 2. Add submodule count badge to module header for cleaner UX
code = code.replace(
  /<span className="font-semibold text-sm text-slate-800 pr-2 line-clamp-2">\s*\{mod\.title\}\s*<\/span>/,
  `<div className="flex flex-col pr-2">
                    <span className="font-semibold text-sm text-slate-900 line-clamp-2">{mod.title}</span>
                    <span className="text-[11px] text-slate-400 font-mono mt-0.5">{mod.submodules?.length || 0} Sub-modul</span>
                  </div>`
);

// 3. Improve mobile padding for the content area wrapper
code = code.replace(
  /className="max-w-4xl mx-auto px-6 lg:px-12 pt-8 pb-4"/,
  'className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-10 pb-4"'
);

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Updated AcademyMasterclassPage mobile UI and sidebar drawer');
