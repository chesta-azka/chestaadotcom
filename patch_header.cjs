const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf8');

const target = `<div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100 shadow-2xs">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Konsultan AI CHESTAADOTCOM</h3>
                  <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online & Siap Bantu
                  </p>
                </div>
              </div>`;

const replacement = `<div className="flex items-center gap-3">
                <div className={\`w-10 h-10 rounded-full flex items-center justify-center border shadow-2xs \${isHumanTakeover ? 'bg-amber-100 text-amber-600 border-amber-200' : 'bg-purple-50 text-purple-600 border-purple-100'}\`}>
                  {isHumanTakeover ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {isHumanTakeover ? 'Principal Engineer (Live)' : 'Konsultan AI CHESTAADOTCOM'}
                  </h3>
                  <p className={\`text-xs font-medium flex items-center gap-1 \${isHumanTakeover ? 'text-amber-600' : 'text-emerald-600'}\`}>
                    <span className={\`w-1.5 h-1.5 rounded-full animate-pulse \${isHumanTakeover ? 'bg-amber-500' : 'bg-emerald-500'}\`}></span> {isHumanTakeover ? 'Live Support' : 'Online & Siap Bantu'}
                  </p>
                </div>
              </div>`;

if(code.includes('Konsultan AI CHESTAADOTCOM')) {
  // we also need to import User from lucide-react
  code = code.replace(/Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown, Sparkles, CheckCircle2/, "Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown, Sparkles, CheckCircle2, User");
  
  // replace target
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
  console.log("Patched header successfully!");
}
