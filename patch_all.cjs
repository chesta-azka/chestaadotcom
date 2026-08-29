const fs = require('fs');

// --- 1. PATCH FloatingAIAssistant.tsx ---
let floatContent = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// A. Update MemoizedChatMessage for Tasks 1, 2, 3, 4
// 1. Remove isLast from the condition so choices persist
// 2. Add motion.div and icons for choices

const choicesRegex = /\{choices\.length > 0 && isLast && !isTyping && \([\s\S]*?<div className="mt-3 pt-3 border-t border-slate-200\/50 flex flex-col gap-2">[\s\S]*?<span className="text-\[10px\] font-bold text-slate-400 uppercase tracking-widest mb-0\.5">Saran Balasan Cepat<\/span>\n\s*\{choices\.map\(\(choice, idx\) => \(\n\s*<button[\s\S]*?onClick=\{\(\) => onActionClick\(choice\)\}[\s\S]*?className="group flex items-center justify-between px-3 py-2 bg-gradient-to-r from-white to-slate-50 hover:from-purple-50 hover:to-indigo-50 text-slate-700 hover:text-purple-700 text-xs font-medium rounded-xl border border-slate-200 hover:border-purple-300 transition-all shadow-sm hover:shadow text-left"[\s\S]*?>\n\s*<span className="flex-1 pr-2 leading-tight">\{choice\}<\/span>\n\s*<svg[\s\S]*?<\/svg>\n\s*<\/button>\n\s*\)\)\}\n\s*<\/div>\n\s*\)\}/m;

const replacement = `{choices.length > 0 && !isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-3 pt-3 border-t border-slate-200/50 flex flex-col gap-2.5"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Saran Balasan Cepat</span>
            {choices.map((choice, idx) => {
              const text = choice.toLowerCase();
              let Icon = MessageCircle;
              let iconColor = "text-blue-500";
              if (text.match(/harga|biaya|kalkulator|estimasi|budget|price/)) {
                Icon = Calculator;
                iconColor = "text-purple-500";
              } else if (text.match(/waktu|lama|proses|kapan/)) {
                Icon = Clock;
                iconColor = "text-amber-500";
              } else if (text.match(/desain|design|portofolio|contoh/)) {
                Icon = Code2;
                iconColor = "text-pink-500";
              } else if (text.match(/fitur|layanan|seo|paket/)) {
                Icon = Sparkles;
                iconColor = "text-emerald-500";
              }

              return (
                <button
                  key={idx}
                  onClick={() => onActionClick(choice)}
                  className="group flex items-center justify-between px-4 py-3 bg-gradient-to-r from-white to-slate-50 hover:from-purple-50 hover:to-indigo-50 text-slate-700 hover:text-purple-700 text-[13px] font-medium rounded-xl border border-slate-200 hover:border-purple-300 transition-all shadow-sm hover:shadow text-left w-full"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon size={14} className={iconColor} />
                    </div>
                    <span className="flex-1 pr-2 leading-tight">{choice}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-purple-600 transition-colors shrink-0"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              );
            })}
          </motion.div>
        )}`;

floatContent = floatContent.replace(choicesRegex, replacement);

// Make sure Sparkles is imported in FloatingAIAssistant.tsx
if (!floatContent.includes('Sparkles')) {
  floatContent = floatContent.replace("import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown } from 'lucide-react';", "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown, Sparkles } from 'lucide-react';");
}

// B. Remove ChatHistoryFolders and related things from FloatingAIAssistant.tsx
const chatHistoryComponentRegex = /const ChatHistoryFolders = \(\{ history \}: \{ history: ChatMessage\[\] \}\) => \{[\s\S]*?return \([\s\S]*?<\/div>\n  \);\n\};\n\n/m;
floatContent = floatContent.replace(chatHistoryComponentRegex, '');

// C. Remove folder history button from header
const headerRegex = /<div className="flex items-center gap-1">\n\s*<button\n\s*onClick=\{\(\) => \{ setShowHistory\(!showHistory\); setShowPricing\(false\); \}\}\n\s*className=\{`w-8 h-8 flex items-center justify-center rounded-full transition-colors \$\{showHistory \? 'bg-purple-100 text-purple-700' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'\}`\}\n\s*title="Riwayat Percakapan \(Kategori\)"\n\s*>\n\s*<Folder size=\{16\} \/>\n\s*<\/button>\n\s*<button/m;
floatContent = floatContent.replace(headerRegex, '<button');

// Make sure the button works
const fixHeaderDoubleDiv = `                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Tutup asisten AI"
                >
                  <X size={18} />
                </button>
              </div>
            </div>`;
// Actually wait, let's just do a simpler replace for the whole header buttons div.
const headerBlockRegex = /<div className="flex items-center gap-1">\n\s*<button[\s\S]*?<\/button>\n\s*<button \n\s*onClick=\{\(\) => setIsOpen\(false\)\}\n\s*className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"\n\s*aria-label="Tutup asisten AI"\n\s*>\n\s*<X size=\{18\} \/>\n\s*<\/button>\n\s*<\/div>/m;
const newHeaderBlock = `<div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Tutup asisten AI"
                >
                  <X size={18} />
                </button>
              </div>`;
floatContent = floatContent.replace(headerBlockRegex, newHeaderBlock);


// D. Fix render area in FloatingAIAssistant to remove showHistory condition
const renderAreaRegex = /\{showHistory \? \(\n\s*<div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50\/50 p-4 scroll-smooth custom-scrollbar">\n\s*<ChatHistoryFolders history=\{chatHistory\} \/>\n\s*<\/div>\n\s*\) : showPricing \? \(/m;
floatContent = floatContent.replace(renderAreaRegex, '{showPricing ? (');

// E. Fix footer input area show condition
floatContent = floatContent.replace('{!showPricing && !showHistory && (', '{!showPricing && (');


fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', floatContent);

// --- 2. PATCH AdminPage.tsx ---
let adminContent = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

// Add ChevronDown & Folder to lucide-react imports if not there
if (!adminContent.includes('ChevronDown')) {
  adminContent = adminContent.replace(
    "import { Search, Sparkles, Loader2, Eye, EyeOff, AlertTriangle, FileText, CheckCircle2, Lock, LogOut, MessageSquare, Clock, BarChart as BarChartIcon, Users as UsersIcon, PenTool, Shield, Zap } from 'lucide-react';",
    "import { Search, Sparkles, Loader2, Eye, EyeOff, AlertTriangle, FileText, CheckCircle2, Lock, LogOut, MessageSquare, Clock, BarChart as BarChartIcon, Users as UsersIcon, PenTool, Shield, Zap, ChevronDown, Folder } from 'lucide-react';"
  );
}

// Add the Admin version of ChatHistoryFolders
const adminHistoryComponent = `
const AdminChatHistoryFolders = ({ sessions }: { sessions: any[] }) => {
  const pairs: any[] = [];
  
  sessions.forEach(session => {
    let currentPair: any = null;
    const history = session.messages || [];
    history.forEach((msg: any, idx: number) => {
      if (msg.role === 'user') {
        if (currentPair) pairs.push(currentPair);
        currentPair = { userMsg: msg, userIdx: idx, aiMsgs: [], sessionInfo: session };
      } else if (msg.role === 'ai' && currentPair) {
        currentPair.aiMsgs.push(msg);
      }
    });
    if (currentPair) pairs.push(currentPair);
  });

  const categories = {
    'Pricing': [] as any[],
    'Services': [] as any[],
    'General': [] as any[],
  };

  pairs.forEach(pair => {
    const text = (pair.userMsg.content || '').toLowerCase();
    if (text.match(/harga|biaya|price|pricing|bayar|paket|murah|kalkulator|estimasi|budget/)) {
      categories['Pricing'].push(pair);
    } else if (text.match(/fitur|layanan|service|bikin|buat|waktu|lama|proses|seo|desain|toko|blog|portofolio/)) {
      categories['Services'].push(pair);
    } else {
      categories['General'].push(pair);
    }
  });

  const [openFolder, setOpenFolder] = useState<string | null>('Pricing');

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mt-6">
      <div className="mb-6">
        <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
          <Folder size={20} className="text-purple-600" /> Kategori Topik (History Folders)
        </h2>
        <p className="text-sm text-slate-500">Menganalisis topik pembicaraan dari seluruh history percakapan AI.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(categories).map(([cat, catPairs]) => (
          <div key={cat} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col h-[400px]">
            <button 
              onClick={() => setOpenFolder(openFolder === cat ? null : cat)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-100 shrink-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200">
                  <Folder size={16} className="text-purple-500" />
                </div>
                <div className="text-left">
                  <span className="block font-semibold text-sm text-slate-800">{cat}</span>
                  <span className="block text-[10px] text-slate-500">{catPairs.length} Topik</span>
                </div>
              </div>
              <ChevronDown size={18} className={\`text-slate-400 transition-transform duration-300 \${openFolder === cat ? 'rotate-180' : ''}\`} />
            </button>
            
            <div className={\`flex-1 p-3 space-y-3 overflow-y-auto custom-scrollbar transition-all duration-300 \${openFolder === cat ? 'opacity-100 block' : 'opacity-0 hidden'}\`}>
              {catPairs.length === 0 ? (
                <div className="text-center text-xs text-slate-400 py-10">Folder Kosong</div>
              ) : (
                catPairs.map((pair, i) => (
                  <div key={i} className="bg-white rounded-xl p-3.5 border border-slate-100 shadow-sm hover:shadow transition-shadow">
                    <div className="text-xs font-semibold text-slate-700 mb-2 line-clamp-2">{pair.userMsg.content}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-3 pl-2 border-l-2 border-purple-100 leading-relaxed">
                      {pair.aiMsgs[0]?.content || '...'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
`;

// Insert the component before function AdminDashboard
adminContent = adminContent.replace('function AdminDashboard() {', adminHistoryComponent + '\nfunction AdminDashboard() {');

// Inject AdminChatHistoryFolders right after the Feedback Log Detail block in AITrainingTab
// Find the end of AITrainingTab return block
const trainingTabEnd = `          )}
        </div>
      </div>
    </div>
  );
}`;
adminContent = adminContent.replace(trainingTabEnd, `          )}
        </div>
      </div>
      
      {/* Category Folders */}
      <AdminChatHistoryFolders sessions={sessions} />
    </div>
  );
}`);


fs.writeFileSync('src/pages/AdminPage.tsx', adminContent);

