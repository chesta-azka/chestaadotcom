const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

// Add Zap to lucide-react imports
content = content.replace(
  "import { Search, Sparkles, Loader2, Eye, EyeOff, AlertTriangle, FileText, CheckCircle2, Lock, LogOut, MessageSquare, Clock, BarChart as BarChartIcon, Users as UsersIcon, PenTool, Shield } from 'lucide-react';",
  "import { Search, Sparkles, Loader2, Eye, EyeOff, AlertTriangle, FileText, CheckCircle2, Lock, LogOut, MessageSquare, Clock, BarChart as BarChartIcon, Users as UsersIcon, PenTool, Shield, Zap } from 'lucide-react';"
);

// Add TokenUsageMonitor before AITrainingTab
const monitorComponent = `
const TokenUsageMonitor = () => {
  const [tokenCount, setTokenCount] = useState(0);
  // Using a smaller quota for demonstration so it triggers easily if there's history
  const QUOTA = 5000; 
  const [warned, setWarned] = useState(false);
  
  useEffect(() => {
    const q = query(collection(db, 'ai_chat_sessions'));
    const unsub = onSnapshot(q, (snapshot) => {
      let charCount = 0;
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.messages) {
          data.messages.forEach((m: any) => {
             charCount += (m.content || '').length;
          });
        }
      });
      // 1 token ~= 4 chars roughly
      const estimatedTokens = Math.floor(charCount / 4);
      setTokenCount(estimatedTokens);
      
      if (estimatedTokens > QUOTA * 0.8 && !warned) {
         toast.error('Peringatan: Penggunaan LLM Token mencapai >80% batas bulanan!', {
           duration: 8000,
           icon: '⚠️'
         });
         setWarned(true);
      }
    });
    return () => unsub();
  }, [warned]);

  const percentage = Math.min((tokenCount / QUOTA) * 100, 100).toFixed(1);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-6">
       <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
         <Zap size={24} />
       </div>
       <div className="flex-1">
         <div className="flex justify-between items-end mb-2">
           <div>
             <h3 className="font-semibold text-slate-800">Token Monitor (Real-time)</h3>
             <p className="text-xs text-slate-500">Estimasi penggunaan API Gemini (Bulan Ini)</p>
           </div>
           <div className="text-right">
             <span className={\`text-lg font-bold \${tokenCount > QUOTA * 0.8 ? 'text-red-600' : 'text-slate-800'}\`}>
               {tokenCount.toLocaleString()}
             </span>
             <span className="text-xs text-slate-500 font-medium"> / {QUOTA.toLocaleString()}</span>
           </div>
         </div>
         <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
           <div 
             className={\`h-full rounded-full transition-all duration-1000 \${tokenCount > QUOTA * 0.8 ? 'bg-red-500' : tokenCount > QUOTA * 0.5 ? 'bg-amber-400' : 'bg-emerald-500'}\`}
             style={{ width: \`\${percentage}%\` }}
           ></div>
         </div>
       </div>
    </div>
  );
};

function AITrainingTab() {`;

content = content.replace('function AITrainingTab() {', monitorComponent);

// Inject into return of AITrainingTab
const returnTarget = `  return (
    <div className="space-y-6">`;

const returnReplace = `  return (
    <div className="space-y-6">
      <TokenUsageMonitor />`;

content = content.replace(returnTarget, returnReplace);

fs.writeFileSync('src/pages/AdminPage.tsx', content);
