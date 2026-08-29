const fs = require('fs');
let code = fs.readFileSync('src/components/CommLinkWorkspace.tsx', 'utf8');

const targetStr = `<div className={\`w-full rounded-2xl px-5 py-3 shadow-sm flex flex-col gap-2 \${
                      isOwn 
                        ? \`\${accentMap[accentColor].split(' ')[0]} text-white rounded-tr-sm border-transparent\`
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-sm border border-slate-200 dark:border-slate-700'
                    }\`}>`;

const newStr = `<div className={\`w-full rounded-2xl px-5 py-3 shadow-sm flex flex-col gap-2 \${
                      msg.sender === 'admin' 
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-transparent ' + (isOwn ? 'rounded-tr-sm' : 'rounded-tl-sm')
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 ' + (isOwn ? 'rounded-tr-sm' : 'rounded-tl-sm')
                    }\`}>`;

code = code.replace(targetStr, newStr);

// Add admin toggle for Keep Forever
const toggleImport = `import { Archive, ShieldAlert } from 'lucide-react';`;
code = code.replace(`import { Archive } from 'lucide-react';`, toggleImport);

// Add a setting for the workspace protection
// Let's add a button in the header if currentUserRole === 'admin'
const headerTarget = `<div className="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-1"></div>`;
const headerReplacement = `
          {currentUserRole === 'admin' && (
            <button 
              onClick={toggleWorkspaceProtection}
              className={\`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all \${isProtected ? 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}\`} 
              title={isProtected ? 'Protected from Auto-Delete' : 'Not Protected'}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keep Forever</span>
            </button>
          )}
          <div className="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-1"></div>
`;

code = code.replace(headerTarget, headerReplacement);

// Add isProtected state and fetch logic
const hookTarget = `const { messages, loading } = useEcosystemChat(workspaceId, archiveMode);`;
const hookReplacement = `
  const { messages, loading, isProtected, toggleWorkspaceProtection } = useEcosystemChat(workspaceId, archiveMode, currentUserRole);
`;
code = code.replace(hookTarget, hookReplacement);

fs.writeFileSync('src/components/CommLinkWorkspace.tsx', code);
console.log('CommLinkWorkspace updated successfully');
