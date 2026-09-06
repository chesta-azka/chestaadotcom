const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

// 1. Update root container with overflow-x-hidden
code = code.replace(
  'className="h-screen w-full bg-[#f8f9fa] font-sans text-slate-800 flex flex-col overflow-hidden',
  'className="h-screen w-full bg-[#f8f9fa] font-sans text-slate-800 flex flex-col overflow-x-hidden overflow-hidden'
);

// 2. Update markdownOptions paragraph styling for perfect readability and paragraph spacing
const newOptions = `
const markdownOptions = {
  overrides: {
    p: {
      component: (props: any) => <p className="text-base text-slate-700 leading-[1.9] mb-8" {...props} />
    },
    ul: {
      component: (props: any) => <ul className="list-disc pl-6 space-y-3 mb-8 text-slate-700" {...props} />
    },
    ol: {
      component: (props: any) => <ol className="list-decimal pl-6 space-y-3 mb-8 text-slate-700" {...props} />
    },
    li: {
      component: (props: any) => <li className="leading-relaxed mb-1" {...props} />
    },
    h1: {
      component: (props: any) => <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-12 mb-6 tracking-tight" {...props} />
    },
    h2: {
      component: (props: any) => <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 mt-12 mb-6 tracking-tight" {...props} />
    },
    h3: {
      component: (props: any) => <h3 className="text-lg md:text-xl font-display font-semibold text-slate-900 mt-10 mb-6 tracking-tight" {...props} />
    }
  }
};
`;

const startIdx = code.indexOf('const markdownOptions = {');
const endIdx = code.indexOf('};', startIdx) + 2;
code = code.substring(0, startIdx) + newOptions + code.substring(endIdx);

// 3. Ensure sidebar width has max-w-[85vw] to prevent any horizontal overflow on mobile
code = code.replace(
  'w-80 flex-shrink-0 flex flex-col',
  'w-80 max-w-[85vw] flex-shrink-0 flex flex-col'
);

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Fixed AcademyMasterclassPage responsiveness and paragraph spacing');
