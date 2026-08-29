const fs = require('fs');

let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const targetFeedbackLog = `        {/* AI Training & Feedback Log */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
          <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2 mb-2">
            Feedback Log Detail
          </h2>
          <p className="text-sm text-slate-500 mb-6">Tinjau percakapan user dengan rating.</p>
          
          {loading ? (
            <div className="flex-1 flex items-center justify-center">Loading...</div>
          ) : (
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
              {sessions.map(session => {
                const messages = session.messages || [];
                const feedbackMsgs = messages.filter((m: any) => m.feedback);
                if (feedbackMsgs.length === 0) return null; 

                return (
                  <div key={session.id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                    <div className="text-xs font-mono text-slate-400 mb-3">Session: {session.id}</div>
                    <div className="space-y-3">
                      {messages.map((msg: any, i: number) => {
                        if (msg.role === 'user') {
                          return <div key={i} className="text-sm text-slate-700 font-medium">User: {msg.content}</div>;
                        } else if (msg.feedback) {
                          return (
                            <div key={i} className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                              <div className="mb-2">AI: {msg.content.substring(0, 150)}...</div>
                              <div className={\`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium \${msg.feedback === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}\`}>
                                {msg.feedback === 'up' ? '👍 Positif' : '👎 Negatif (Butuh Training)'}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                );
              })}
              {sessions.every(s => !(s.messages || []).some((m: any) => m.feedback)) && (
                <div className="text-center text-slate-500 py-8">Belum ada feedback.</div>
              )}
            </div>
          )}
        </div>`;

// Let's create the new table based layout
const replacementFeedbackLog = `        {/* AI Training & Feedback Log Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
          <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2 mb-2">
            Feedback Log Detail
          </h2>
          <p className="text-sm text-slate-500 mb-6">Tinjau rekam data user feedback secara detail pada jawaban AI.</p>
          
          {loading ? (
            <div className="flex-1 flex items-center justify-center">Loading...</div>
          ) : (
            <div className="flex-1 overflow-x-auto rounded-2xl border border-slate-200 custom-scrollbar max-h-[500px]">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="sticky top-0 bg-slate-50 shadow-sm z-10">
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Waktu/Sesi</th>
                    <th className="px-4 py-3 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Konteks User</th>
                    <th className="px-4 py-3 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Jawaban AI</th>
                    <th className="px-4 py-3 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase text-center">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {sessions.flatMap(session => {
                    const messages = session.messages || [];
                    const rows = [];
                    for (let i = 0; i < messages.length; i++) {
                       if (messages[i].feedback) {
                          // Try to find the preceding user message for context
                          let userCtx = "N/A";
                          if (i > 0 && messages[i-1].role === 'user') {
                             userCtx = messages[i-1].content;
                          }
                          const timestamp = session.lastUpdated?.toDate ? session.lastUpdated.toDate().toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-';
                          
                          rows.push(
                            <tr key={\`\${session.id}-\${i}\`} className="hover:bg-slate-50 transition-colors group">
                              <td className="px-4 py-4 text-xs text-slate-500 align-top whitespace-nowrap">
                                <div className="font-medium text-slate-700">{timestamp}</div>
                                <div className="text-[10px] opacity-70 max-w-[100px] truncate" title={session.id}>{session.id}</div>
                              </td>
                              <td className="px-4 py-4 text-sm text-slate-600 align-top">
                                <div className="line-clamp-3">{userCtx}</div>
                              </td>
                              <td className="px-4 py-4 text-sm text-slate-600 align-top">
                                <div className="line-clamp-3 group-hover:line-clamp-none transition-all">{messages[i].content}</div>
                              </td>
                              <td className="px-4 py-4 align-top text-center">
                                <span className={\`inline-flex items-center justify-center w-8 h-8 rounded-full \${messages[i].feedback === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}\`}>
                                  {messages[i].feedback === 'up' ? '👍' : '👎'}
                                </span>
                              </td>
                            </tr>
                          );
                       }
                    }
                    return rows;
                  })}
                  {sessions.every(s => !(s.messages || []).some((m: any) => m.feedback)) && (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-sm text-slate-500">Belum ada feedback yang terekam.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>`;

content = content.replace(targetFeedbackLog, replacementFeedbackLog);
fs.writeFileSync('src/pages/AdminPage.tsx', content);
