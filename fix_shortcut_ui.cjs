const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

const oldText = `<span className="ml-3 mr-3 text-indigo-300">Tanya AI</span>`;
const newText = `<span className="ml-3 mr-3 text-indigo-300 flex items-center gap-2">Tanya AI <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-slate-800/50 px-1.5 py-0.5 text-[10px] font-sans font-medium normal-case text-indigo-200 border border-slate-700/50"><span className="text-[10px]">⌘</span>K</kbd></span>`;

code = code.replace(oldText, newText);

fs.writeFileSync(path, code);
