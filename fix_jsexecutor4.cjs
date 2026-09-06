const fs = require('fs');

let content = fs.readFileSync('src/app/academy/[slug]/page.tsx', 'utf-8');

const regex = /const JSExecutor = \(\) => \{[\s\S]*?(?=const ModuleSummary)/;

const newExec = `const JSExecutor = () => {
  const [files, setFiles] = useState<Record<string, string>>({
    'main.js': 'import { greet } from "./utils.js";\\n\\nconsole.log(greet("Developer"));\\nconsole.log("Simulasi VFS berjalan.");',
    'utils.js': 'export function greet(name) {\\n  return \`Halo, \${name}! Selamat datang di arsitektur modul.\`;\\n}'
  });
  const [activeFile, setActiveFile] = useState('main.js');
  const [logs, setLogs] = useState<{type: 'log'|'error', msg: string}[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = () => {
    setLogs([]);
    
    const imports: Record<string, string> = {};
    Object.keys(files).forEach(filename => {
      if (filename !== 'main.js') {
        imports[\`./\${filename}\`] = \`data:text/javascript;charset=utf-8,\${encodeURIComponent(files[filename])}\`;
      }
    });

    const importMap = { imports };
    
    // We escape backticks and dollar signs from main.js so they don't break the HTML template literal in React
    const safeMainContent = files['main.js'].replace(/\`/g, '\\\\`').replace(/\\$/g, '\\\\$');

    const html = \`
      <html>
        <body>
          <script type="importmap">
            \${JSON.stringify(importMap)}
          </script>
          <script type="module">
            const originalLog = console.log;
            const originalError = console.error;
            console.log = (...args) => {
              window.parent.postMessage({ type: 'log', msg: args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ') }, '*');
              originalLog(...args);
            };
            console.error = (...args) => {
              window.parent.postMessage({ type: 'error', msg: args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ') }, '*');
              originalError(...args);
            };
            window.onerror = (msg) => {
              window.parent.postMessage({ type: 'error', msg }, '*');
            };
            
            const mainContent = \\\`\${safeMainContent}\\\`;
            const blob = new Blob([mainContent], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            import(url).catch(e => console.error(e.message));
          </script>
        </body>
      </html>
    \`;
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }
  };

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && (e.data.type === 'log' || e.data.type === 'error')) {
        setLogs(prev => [...prev, e.data]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="mt-12 mb-8 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col xl:flex-row no-print">
      <div className="w-full xl:w-7/12 flex flex-col border-b xl:border-b-0 xl:border-r border-slate-700">
        
        {/* File Tabs */}
        <div className="flex bg-slate-950 px-2 pt-2 gap-1 border-b border-slate-800 overflow-x-auto custom-scrollbar">
          {Object.keys(files).map(filename => (
            <button
              key={filename}
              onClick={() => setActiveFile(filename)}
              className={\`px-4 py-2.5 rounded-t-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap \${
                activeFile === filename ? 'bg-slate-900 text-purple-400 border-t-2 border-purple-500' : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-300 border-t-2 border-transparent'
              }\`}
            >
              <FileCode size={14} /> {filename}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50">
          <div className="flex items-center gap-2 text-slate-400">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setFiles({
                  'main.js': 'import { greet } from "./utils.js";\\n\\nconsole.log(greet("Developer"));\\nconsole.log("Simulasi VFS berjalan.");',
                  'utils.js': 'export function greet(name) {\\n  return \`Halo, \${name}! Selamat datang di arsitektur modul.\`;\\n}'
                });
                setLogs([]);
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors flex items-center gap-1.5"
            >
              <RefreshCw size={12} /> Reset
            </button>
            <button 
              onClick={runCode}
              className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Play size={12} fill="currentColor" /> Run Code
            </button>
          </div>
        </div>
        <textarea
          value={files[activeFile]}
          onChange={(e) => setFiles({ ...files, [activeFile]: e.target.value })}
          className="w-full flex-1 bg-slate-900 text-slate-300 font-mono text-sm p-4 focus:outline-none resize-none leading-relaxed"
          spellCheck={false}
          rows={12}
        />
      </div>
      <div className="w-full xl:w-5/12 bg-black flex flex-col relative">
        <div className="px-4 py-3 border-b border-slate-800 flex justify-between items-center bg-slate-950">
           <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">macOS Terminal</span>
           <button onClick={() => setLogs([])} className="text-slate-500 hover:text-slate-300 transition-colors" title="Clear Console">
             <Trash2 size={14} />
           </button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto font-mono text-xs sm:text-sm custom-scrollbar min-h-[200px]">
          {logs.length === 0 ? (
            <div className="text-slate-600 italic">Output akan tampil di sini...</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className={\`mb-1.5 \${log.type === 'error' ? 'text-rose-400' : 'text-emerald-400'}\`}>
                <span className="text-slate-600 mr-2">❯</span>
                {log.msg}
              </div>
            ))
          )}
        </div>
        <iframe ref={iframeRef} style={{ display: 'none' }} sandbox="allow-scripts" />
      </div>
    </div>
  );
};
`
content = content.replace(regex, newExec);
fs.writeFileSync('src/app/academy/[slug]/page.tsx', content);

