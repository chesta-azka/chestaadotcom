const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// Add icons
content = content.replace(
  "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';",
  "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown } from 'lucide-react';"
);

// Add Component for Folders
const folderComponent = `
const ChatHistoryFolders = ({ history }: { history: ChatMessage[] }) => {
  const pairs: any[] = [];
  let currentPair: any = null;
  
  history.forEach((msg, idx) => {
    if (msg.role === 'user') {
      if (currentPair) pairs.push(currentPair);
      currentPair = { userMsg: msg, userIdx: idx, aiMsgs: [] };
    } else if (msg.role === 'ai' && currentPair) {
      currentPair.aiMsgs.push(msg);
    }
  });
  if (currentPair) pairs.push(currentPair);

  const categories = {
    'Pricing': [] as any[],
    'Services': [] as any[],
    'General': [] as any[],
  };

  pairs.forEach(pair => {
    const text = pair.userMsg.content.toLowerCase();
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
    <div className="space-y-3">
      <h3 className="font-semibold text-slate-800 text-sm mb-2 px-1">Kategori Riwayat Chat</h3>
      {Object.entries(categories).map(([cat, catPairs]) => (
        <div key={cat} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <button 
            onClick={() => setOpenFolder(openFolder === cat ? null : cat)}
            className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Folder size={16} className="text-purple-500" />
              <span className="font-medium text-sm text-slate-700">{cat}</span>
              <span className="text-[10px] bg-white border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded-full">{catPairs.length}</span>
            </div>
            <ChevronDown size={14} className={\`text-slate-400 transition-transform duration-200 \${openFolder === cat ? 'rotate-180' : ''}\`} />
          </button>
          
          {openFolder === cat && (
            <div className="p-2 space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
              {catPairs.length === 0 ? (
                <div className="text-center text-xs text-slate-400 py-4">Kosong</div>
              ) : (
                catPairs.map((pair, i) => (
                  <div key={i} className="bg-white rounded-lg p-3 border border-slate-100 shadow-xs">
                    <div className="text-xs font-semibold text-slate-700 mb-1.5 line-clamp-2">{pair.userMsg.content}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-2 pl-2 border-l-2 border-purple-100">
                      {pair.aiMsgs[0]?.content || '...'}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function FloatingAIAssistant() {`;

content = content.replace('export default function FloatingAIAssistant() {', folderComponent);

// Add showHistory state
content = content.replace(
  'const [showPricing, setShowPricing] = useState(false);',
  'const [showPricing, setShowPricing] = useState(false);\n  const [showHistory, setShowHistory] = useState(false);'
);

// Add History button in Header
const headerTarget = `<div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100 shadow-2xs">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Konsultan AI CHESTAADOTCOM</h3>
                  <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online & Siap Bantu
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}`;

const headerReplace = `<div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100 shadow-2xs">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Konsultan AI CHESTAADOTCOM</h3>
                  <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online & Siap Bantu
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setShowHistory(!showHistory); setShowPricing(false); }}
                  className={\`w-8 h-8 flex items-center justify-center rounded-full transition-colors \${showHistory ? 'bg-purple-100 text-purple-700' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}\`}
                  title="Riwayat Percakapan (Kategori)"
                >
                  <Folder size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}`;

content = content.replace(headerTarget, headerReplace);

// Render Chat Area vs History
const chatAreaTarget = `{/* Chat Area / Pricing Logic */}
            {showPricing ? (
              <div 
                className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/40 p-4"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <AutomatedPricingLogic 
                  onCancel={() => setShowPricing(false)}`;

const chatAreaReplace = `{/* Chat Area / Logic */}
            {showHistory ? (
              <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/50 p-4 scroll-smooth custom-scrollbar">
                <ChatHistoryFolders history={chatHistory} />
              </div>
            ) : showPricing ? (
              <div 
                className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/40 p-4"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <AutomatedPricingLogic 
                  onCancel={() => setShowPricing(false)}`;

content = content.replace(chatAreaTarget, chatAreaReplace);

// Don't show footer when in history mode
const footerTarget = `            {/* Input Area */}
            {!showPricing && (
            <div className="p-4 border-t border-slate-100 bg-white/80 backdrop-blur-md shrink-0">`;

const footerReplace = `            {/* Input Area */}
            {!showPricing && !showHistory && (
            <div className="p-4 border-t border-slate-100 bg-white/80 backdrop-blur-md shrink-0">`;

content = content.replace(footerTarget, footerReplace);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
