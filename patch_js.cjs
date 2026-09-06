const fs = require('fs');
const content = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf-8');

let newContent = content.replace(
  `const JSExecutor = ({ initialCode }: { initialCode: string }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {`,
  `const JSExecutor = ({ initialCode }: { initialCode: string }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [theme, setTheme] = useState<'default' | 'github' | 'solarized'>('default');

  const themes = {
    default: {
      name: 'Default Light',
      bg: 'bg-white',
      textColor: 'text-slate-800'
    },
    github: {
      name: 'GitHub Light',
      bg: 'bg-[#f6f8fa]',
      textColor: 'text-[#24292f]'
    },
    solarized: {
      name: 'Solarized Light',
      bg: 'bg-[#fdf6e3]',
      textColor: 'text-[#657b83]'
    }
  };

  const cycleTheme = () => {
    const themeKeys = Object.keys(themes) as Array<keyof typeof themes>;
    const nextIndex = (themeKeys.indexOf(theme) + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  useEffect(() => {`
);

newContent = newContent.replace(
  `  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-white my-8 flex flex-col font-sans not-prose">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Live JS Executor</span>
        </div>
        <button `,
  `  return (
    <div className={\`w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-white my-8 flex flex-col font-sans not-prose theme-\${theme}\`}>
      <style>{\`
        .theme-github .token.comment { color: #6e7781; font-style: italic; }
        .theme-github .token.keyword { color: #cf222e; }
        .theme-github .token.string { color: #0a3069; }
        .theme-github .token.function { color: #8250df; }
        .theme-github .token.number { color: #0550ae; }
        .theme-github .token.operator { color: #24292f; }
        .theme-github .token.punctuation { color: #24292f; }
        .theme-github .token.class-name { color: #953800; }
        
        .theme-solarized .token.comment { color: #93a1a1; font-style: italic; }
        .theme-solarized .token.keyword { color: #859900; }
        .theme-solarized .token.string { color: #2aa198; }
        .theme-solarized .token.function { color: #268bd2; }
        .theme-solarized .token.number { color: #d33682; }
        .theme-solarized .token.operator { color: #657b83; }
        .theme-solarized .token.punctuation { color: #586e75; }
        .theme-solarized .token.class-name { color: #b58900; }
      \`}</style>
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200/60 flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Live JS Executor</span>
          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <button
              onClick={() => setCode(initialCode)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              title="Reset to Initial"
            >
              <RotateCcw size={12} /> Reset
            </button>
            <button
              onClick={cycleTheme}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              title="Toggle Theme"
            >
              <Palette size={12} /> {themes[theme].name}
            </button>
          </div>
        </div>
        <button `
);

newContent = newContent.replace(
  `      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200/60 h-64 relative">
        {/* Editor Pane (with Prism highlight behind invisible textarea) */}
        <div className={\`relative bg-white transition-colors overflow-hidden flex \${isFocused ? 'ring-2 ring-inset ring-purple-500/10' : ''}\`}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="absolute inset-0 w-full h-full p-6 font-mono text-sm text-transparent bg-transparent caret-slate-900 resize-none focus:outline-none z-10 custom-scrollbar whitespace-pre"
            spellCheck="false"
          />
          <pre 
            className="absolute inset-0 w-full h-full p-6 font-mono text-sm bg-transparent pointer-events-none custom-scrollbar whitespace-pre m-0 border-0"
            aria-hidden="true"
          >
            <code className="language-javascript" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </pre>
        </div>`,
  `      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200/60 h-64 relative">
        {/* Editor Pane (with Prism highlight behind invisible textarea) */}
        <div className={\`relative \${themes[theme].bg} transition-colors overflow-hidden flex \${isFocused ? 'ring-2 ring-inset ring-purple-500/10' : ''}\`}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="absolute inset-0 w-full h-full p-6 font-mono text-sm text-transparent bg-transparent caret-slate-900 resize-none focus:outline-none z-10 custom-scrollbar whitespace-pre"
            spellCheck="false"
          />
          <pre 
            className={\`absolute inset-0 w-full h-full p-6 font-mono text-sm bg-transparent pointer-events-none custom-scrollbar whitespace-pre m-0 border-0 \${themes[theme].textColor}\`}
            aria-hidden="true"
          >
            <code className="language-javascript" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </pre>
        </div>`
);

newContent = newContent.replace(
  `          {/* Terminal Window Chrome */}
          <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-black/20">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 text-center text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest opacity-80 mr-6">
              Output
            </div>
          </div>`,
  `          {/* Terminal Window Chrome */}
          <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-black/20">
            <div className="flex gap-1.5 w-16">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="text-center text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest opacity-80">
              Output
            </div>
            <div className="w-16 flex justify-end">
              <button 
                onClick={() => setOutput([])}
                className="text-slate-500 hover:text-white transition-colors"
                title="Clear Terminal"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>`
);

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', newContent);
