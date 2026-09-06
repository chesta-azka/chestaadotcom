const fs = require('fs');

let content = fs.readFileSync('src/app/academy/[slug]/page.tsx', 'utf-8');

// 1. Expand the Glossary Component
const oldGlossaryTooltip = `<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-900 text-white text-xs p-2.5 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-center shadow-xl leading-relaxed">
                                {def}
                                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                             </span>`;
const newGlossaryTooltip = `<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-900 text-white text-xs p-3 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-center shadow-xl leading-relaxed flex flex-col gap-2">
                                <span>{def}</span>
                                <a href={\`#search=\${encodeURIComponent(term)}\`} className="inline-flex items-center justify-center text-[10px] uppercase font-bold tracking-wider bg-purple-500/20 text-purple-200 py-1.5 px-3 rounded-lg hover:bg-purple-500/40 transition-colors mx-auto mt-1">
                                    Learn More <ArrowRight size={12} className="ml-1" />
                                </a>
                                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                             </span>`;
content = content.replace(oldGlossaryTooltip, newGlossaryTooltip);

// 2. Add Difficulty Badge component and render it in the header
const difficultyBadgeComponent = `
const DifficultyBadge = ({ level }: { level: 'Beginner' | 'Intermediate' | 'Advanced' }) => {
  const colors = {
    Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
    Advanced: 'bg-rose-50 text-rose-700 border-rose-200'
  };
  return (
    <div className={\`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold \${colors[level]} shadow-sm\`}>
       <Sparkles size={14} /> {level}
    </div>
  );
};
`;

if (!content.includes('DifficultyBadge')) {
    content = content.replace(
        "const GLOSSARY: Record<string, string> =",
        difficultyBadgeComponent + "\nconst GLOSSARY: Record<string, string> ="
    );
}

// 3. Inject Difficulty Badge into the header
const oldHeader = `<div className="mb-12 print:mb-8 border-b border-slate-100 print:border-slate-300 pb-8">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight leading-tight">`;
const newHeader = `<div className="mb-12 print:mb-8 border-b border-slate-100 print:border-slate-300 pb-8">
            <div className="flex items-center gap-3 mb-4">
               <DifficultyBadge level="Advanced" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight leading-tight">`;
content = content.replace(oldHeader, newHeader);


fs.writeFileSync('src/app/academy/[slug]/page.tsx', content);

