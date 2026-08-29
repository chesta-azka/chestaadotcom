const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const targetSummary = `{/* Feedback Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col">
           <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2 mb-6">
             Feedback Aggregation
          </h2>
          <div className="flex items-center gap-6 flex-1">
             <div className="flex-1 bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">👍</div>
                <div className="text-3xl font-bold text-green-700">{totalUpvotes}</div>
                <div className="text-xs font-medium text-green-600 uppercase tracking-wider mt-1">Positif</div>
             </div>
             <div className="flex-1 bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">👎</div>
                <div className="text-3xl font-bold text-red-700">{totalDownvotes}</div>
                <div className="text-xs font-medium text-red-600 uppercase tracking-wider mt-1">Butuh Training</div>
             </div>
          </div>
        </div>`;

const replaceSummary = `{/* Feedback Summary & LLM Insights Dashboard */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col">
           <h2 className="text-xl font-display font-medium text-slate-900 flex items-center justify-between gap-2 mb-6">
             <div className="flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
               AI Feedback Insights
             </div>
          </h2>
          
          <div className="flex items-center gap-4 mb-6">
             <div className="flex-1 bg-green-50 border border-green-100 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">👍</div>
                <div className="text-2xl font-bold text-green-700">{totalUpvotes}</div>
                <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1">Positif</div>
             </div>
             <div className="flex-1 bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">👎</div>
                <div className="text-2xl font-bold text-red-700">{totalDownvotes}</div>
                <div className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-1">Negatif</div>
             </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex-1">
             <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                Categorized Pain Points (Auto-Parse)
             </h3>
             <div className="space-y-3">
               {(() => {
                 const counts: Record<string, number> = {};
                 let totalNeg = 0;
                 sessions.forEach(s => {
                   (s.messages || []).forEach((m: any) => {
                     if (m.feedback === 'down') {
                        const cat = m.category || "Uncategorized";
                        counts[cat] = (counts[cat] || 0) + 1;
                        totalNeg++;
                     }
                   });
                 });
                 const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
                 if (entries.length === 0) return <div className="text-xs text-slate-400 italic">Belum ada data pain point.</div>;

                 return entries.map(([cat, count]) => (
                   <div key={cat} className="flex items-center gap-3">
                     <div className="w-24 text-xs font-medium text-slate-600 truncate" title={cat}>{cat}</div>
                     <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-red-400 rounded-full" style={{ width: \`\${(count / Math.max(totalNeg, 1)) * 100}%\` }}></div>
                     </div>
                     <div className="w-8 text-right text-xs font-bold text-slate-500">{count}</div>
                   </div>
                 ));
               })()}
             </div>
          </div>
        </div>`;

content = content.replace(targetSummary, replaceSummary);
fs.writeFileSync('src/pages/AdminPage.tsx', content);
