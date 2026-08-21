const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/ServiceComparisonTable.tsx', 'utf-8');

const targetStr = `
        <div className="overflow-x-auto pb-8 hide-scrollbar">
          <div className="min-w-[768px] w-full">
`;

const replaceStr = `
        <div className="md:hidden flex items-center justify-center gap-2 text-indigo-500 mb-4 animate-pulse">
          <span className="text-xs font-mono font-bold tracking-widest uppercase">Geser untuk membandingkan</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </div>
        <div className="overflow-x-auto pb-8 hide-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory">
          <div className="min-w-[768px] w-full pr-4 md:pr-0">
`;

content = content.replace(targetStr.trim(), replaceStr.trim());
fs.writeFileSync('src/components/organisms/ServiceComparisonTable.tsx', content);
console.log("Patched ServiceComparisonTable");
