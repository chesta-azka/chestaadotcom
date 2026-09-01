const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

const target = `  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 flex flex-col h-[500px]">
       <div className="bg-black text-white p-3 flex justify-between items-center border-b-2 border-black">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h3 className="font-mono font-bold text-sm">LIVE OVERRIDE</h3>
          </div>
          <button onClick={() => setTakeoverSession(null)}><X size={16} /></button>
       </div>
       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((m, i) => (
             <div key={i} className={\`flex flex-col \${m.role === 'user' ? 'items-start' : 'items-end'}\`}>
               <span className="text-[10px] font-mono font-bold mb-1 text-slate-500">
                 {m.role === 'user' ? 'VISITOR' : 'PRINCIPAL ENGINEER'}
               </span>
               <div className={\`px-4 py-2 \${m.role === 'user' ? 'bg-white border-2 border-black text-black' : 'bg-black text-white'} font-sans text-sm max-w-[85%]\`}>
                 {m.content}
               </div>
             </div>
          ))}
       </div>
       <form onSubmit={sendMessage} className="border-t-2 border-black p-3 bg-white flex gap-2">
         <input 
           value={inputMsg}
           onChange={e => setInputMsg(e.target.value)}
           className="flex-1 border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none"
           placeholder="Override Groq..."
         />
         <button type="submit" className="bg-black text-white px-4 py-2 font-bold font-mono">
           SEND
         </button>
       </form>
    </div>
  );`;

const replacement = `  return (
    <div className="fixed bottom-6 right-6 w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200 ring-1 ring-black/5 z-50 flex flex-col h-[550px] overflow-hidden">
       <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex justify-between items-center shadow-md z-10 relative">
          <div className="flex items-center gap-3">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-sans font-semibold text-[13px] tracking-wide text-white">LIVE INTERVENTION</h3>
              <span className="text-[10px] text-slate-400 font-medium">Session Active</span>
            </div>
          </div>
          <button onClick={() => setTakeoverSession(null)} className="text-slate-400 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-md"><X size={16} /></button>
       </div>
       <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/50 scroll-smooth">
          {messages.map((m, i) => {
             const isUser = m.role === 'user';
             return (
               <div key={i} className={\`flex flex-col \${isUser ? 'items-start' : 'items-end'}\`}>
                 <span className="text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-slate-400">
                   {isUser ? 'Visitor' : 'Principal Engineer'}
                 </span>
                 <div className={\`px-4 py-3 text-[13px] font-sans leading-relaxed shadow-sm \${
                   isUser 
                     ? 'bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm' 
                     : 'bg-purple-600 border border-purple-500 text-white rounded-2xl rounded-tr-sm'
                 } max-w-[85%]\`}>
                   {m.content}
                 </div>
               </div>
             );
          })}
       </div>
       <form onSubmit={sendMessage} className="border-t border-slate-100 p-4 bg-white flex gap-3 items-center">
         <input 
           value={inputMsg}
           onChange={e => setInputMsg(e.target.value)}
           className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-[13px] font-sans focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-slate-400"
           placeholder="Ketik balasan Anda..."
         />
         <button type="submit" className="bg-purple-600 hover:bg-purple-700 transition-colors text-white p-2.5 rounded-full shadow-md shrink-0 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed" disabled={!inputMsg.trim()}>
           <Send size={16} className="-ml-0.5" />
         </button>
       </form>
    </div>
  );`;

if(code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/pages/AdminPage.tsx', code);
  console.log("Patched admin live takeover UI");
} else {
  console.log("Target not found");
}
