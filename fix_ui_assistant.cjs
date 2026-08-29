const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

const targetTyping = `          msg.content === '' && isTyping ? (
            <div className="flex flex-col gap-2 w-[180px] py-1">
              <div className="h-2 bg-purple-100 rounded-full animate-pulse w-3/4"></div>
              <div className="h-2 bg-purple-100 rounded-full animate-pulse w-full"></div>
              <div className="h-2 bg-purple-100 rounded-full animate-pulse w-5/6"></div>
            </div>
          ) : (`;

const replaceTyping = `          msg.content === '' && isTyping ? (
            <div className="flex items-center gap-3 w-fit py-1.5 px-2">
              <div className="relative flex items-center justify-center w-5 h-5">
                <svg className="absolute inset-0 w-full h-full text-purple-400/40 animate-ping" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                <svg className="relative w-4 h-4 text-purple-600 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="16 16"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              </div>
              <span className="text-[12px] font-semibold tracking-wide bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent animate-pulse">
                Sedang memproses...
              </span>
            </div>
          ) : (`;

content = content.replace(targetTyping, replaceTyping);

const targetChoices = `{/* Inline AI Action Buttons */}
        {choices.length > 0 && isLast && !isTyping && (
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-100">
            {choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => onActionClick(choice)}
                className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-medium rounded-lg border border-purple-200 transition-colors text-left flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-[10px] font-bold text-purple-600">{idx + 1}</div>
                <span>{choice}</span>
              </button>
            ))}
          </div>
        )}`;

const replaceChoices = `{/* Inline AI Action Buttons */}
        {choices.length > 0 && isLast && !isTyping && (
          <div className="mt-3 pt-3 border-t border-slate-200/50 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Saran Balasan Cepat</span>
            {choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => onActionClick(choice)}
                className="group flex items-center justify-between px-3 py-2 bg-gradient-to-r from-white to-slate-50 hover:from-purple-50 hover:to-indigo-50 text-slate-700 hover:text-purple-700 text-xs font-medium rounded-xl border border-slate-200 hover:border-purple-300 transition-all shadow-sm hover:shadow text-left"
              >
                <span className="flex-1 pr-2 leading-tight">{choice}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-purple-600 transition-colors shrink-0"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            ))}
          </div>
        )}`;

content = content.replace(targetChoices, replaceChoices);
fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
