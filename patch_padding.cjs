const fs = require('fs');

function replaceFile(path, replacer) {
  if (fs.existsSync(path)) {
    let code = fs.readFileSync(path, 'utf8');
    let newCode = replacer(code);
    if (code !== newCode) {
      fs.writeFileSync(path, newCode);
      console.log('Patched ' + path);
    }
  }
}

// 1. AboutPage.tsx
replaceFile('src/pages/AboutPage.tsx', code => {
  return code.replace(
    /pt-36 sm:pt-44 md:pt-52/g,
    'pt-[180px] md:pt-[240px]'
  );
});

// 2. ServicesPage.tsx
replaceFile('src/pages/ServicesPage.tsx', code => {
  return code.replace(
    /className="snap-start relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 overflow-hidden bg-slate-950 text-white"/g,
    'className="snap-start relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 pt-[180px] md:pt-[240px] overflow-hidden bg-slate-950 text-white"'
  );
});

// 3. PortfolioPage.tsx
replaceFile('src/pages/PortfolioPage.tsx', code => {
  return code.replace(
    /className="relative min-h-\[45vh\] flex flex-col justify-end pt-48 pb-24 border-b border-slate-100 mb-20 overflow-hidden"/g,
    'className="relative min-h-[45vh] flex flex-col justify-end pt-[180px] md:pt-[240px] pb-24 border-b border-slate-100 mb-20 overflow-hidden"'
  );
});

// 4. WorkflowPage.tsx
replaceFile('src/pages/WorkflowPage.tsx', code => {
  return code.replace(
    /className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-32 pb-24 overflow-hidden selection:bg-indigo-500\/30"/g,
    'className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-[180px] md:pt-[240px] pb-24 overflow-hidden selection:bg-indigo-500/30"'
  );
});

// 5. BlogHubPage.tsx
replaceFile('src/pages/BlogHubPage.tsx', code => {
  let modified = code.replace(
    /className="mx-auto max-w-4xl px-6 pt-40 md:pt-48 pb-20 relative z-10 flex flex-col items-center"/g,
    'className="mx-auto max-w-4xl px-6 pt-[180px] md:pt-[240px] pb-20 relative z-10 flex flex-col items-center"'
  );
  modified = modified.replace(
    /className="relative pt-40 md:pt-48 pb-16 border-b border-slate-100 mb-12 overflow-hidden"/g,
    'className="relative pt-[180px] md:pt-[240px] pb-16 border-b border-slate-100 mb-12 overflow-hidden"'
  );
  return modified;
});

// 6. ProjectDetailPage.tsx
replaceFile('src/pages/ProjectDetailPage.tsx', code => {
  return code.replace(
    /className="pt-48 pb-32 min-h-screen bg-transparent relative overflow-hidden select-none"/g,
    'className="pt-[180px] md:pt-[240px] pb-32 min-h-screen bg-transparent relative overflow-hidden select-none"'
  );
});

// 7. ServiceDetailPage.tsx
replaceFile('src/pages/ServiceDetailPage.tsx', code => {
  return code.replace(
    /className="min-h-screen bg-transparent text-slate-900 pt-48 pb-24 font-sans selection:bg-purple-100 selection:text-purple-900"/g,
    'className="min-h-screen bg-transparent text-slate-900 pt-[180px] md:pt-[240px] pb-24 font-sans selection:bg-purple-100 selection:text-purple-900"'
  );
});

// 8. AreaDetailPage.tsx
replaceFile('src/pages/AreaDetailPage.tsx', code => {
  return code.replace(
    /className="pt-48 pb-28 min-h-screen relative bg-transparent text-slate-900 overflow-hidden"/g,
    'className="pt-[180px] md:pt-[240px] pb-28 min-h-screen relative bg-transparent text-slate-900 overflow-hidden"'
  );
});

