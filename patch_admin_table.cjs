const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

// Insert FeedbackTableRow before AITrainingTab
const rowComponent = `
const FeedbackTableRow = ({ session, msg, index, userCtx, timestamp }: any) => {
  const [categorizing, setCategorizing] = useState(false);
  const [category, setCategory] = useState(msg.category || "");

  const handleCategorize = async () => {
    setCategorizing(true);
    try {
      const res = await fetch('/api/ai/categorize-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userContext: userCtx, aiResponse: msg.content })
      });
      const data = await res.json();
      if (data.category) {
        setCategory(data.category);
        
        // Update in firestore
        const sessionRef = doc(db, 'ai_chat_sessions', session.id);
        const updatedMessages = [...session.messages];
        updatedMessages[index] = { ...updatedMessages[index], category: data.category };
        await updateDoc(sessionRef, { messages: updatedMessages });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCategorizing(false);
    }
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors group border-b border-slate-100">
      <td className="px-4 py-4 text-xs text-slate-500 align-top whitespace-nowrap">
        <div className="font-medium text-slate-700">{timestamp}</div>
        <div className="text-[10px] opacity-70 max-w-[100px] truncate" title={session.id}>{session.id}</div>
      </td>
      <td className="px-4 py-4 text-sm text-slate-600 align-top">
        <div className="line-clamp-3">{userCtx}</div>
      </td>
      <td className="px-4 py-4 text-sm text-slate-600 align-top">
        <div className="line-clamp-3 group-hover:line-clamp-none transition-all">{msg.content}</div>
      </td>
      <td className="px-4 py-4 align-top text-center">
        <div className="flex flex-col items-center gap-2">
          <span className={\`inline-flex items-center justify-center w-8 h-8 rounded-full \${msg.feedback === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}\`}>
            {msg.feedback === 'up' ? '👍' : '👎'}
          </span>
          {msg.feedback === 'down' && (
            <div className="mt-1 text-xs">
              {category ? (
                <span className="px-2 py-1 bg-red-50 text-red-600 rounded-md font-medium border border-red-100">{category}</span>
              ) : (
                <button 
                  onClick={handleCategorize} 
                  disabled={categorizing}
                  className="text-[10px] text-purple-600 bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded transition-colors disabled:opacity-50"
                >
                  {categorizing ? 'Loading...' : 'Categorize'}
                </button>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

function AITrainingTab() {`;

content = content.replace('function AITrainingTab() {', rowComponent);

// Add export function
const exportCode = `
  const exportToCSV = () => {
    const rows = [["Session ID", "Waktu", "Konteks User", "Jawaban AI", "Rating", "Kategori"]];
    sessions.forEach(session => {
      const messages = session.messages || [];
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].feedback) {
          let userCtx = "N/A";
          if (i > 0 && messages[i-1].role === 'user') {
            userCtx = messages[i-1].content;
          }
          const timestamp = session.lastUpdated?.toDate ? session.lastUpdated.toDate().toLocaleString('id-ID') : '-';
          rows.push([
            session.id,
            timestamp,
            \`"\${userCtx.replace(/"/g, '""')}"\`,
            \`"\${messages[i].content.replace(/"/g, '""')}"\`,
            messages[i].feedback,
            messages[i].category || "-"
          ]);
        }
      }
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "feedback_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {`;

content = content.replace('  useEffect(() => {', exportCode);

// Add header button
const headerTarget = `<h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2 mb-2">
            Feedback Log Detail
          </h2>`;
const headerReplace = `<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
              Feedback Log Detail
            </h2>
            <button 
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Export CSV
            </button>
          </div>`;

content = content.replace(headerTarget, headerReplace);

// Update table body map
const tbodyTarget = `{sessions.flatMap(session => {
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
                  })}`;

const tbodyReplace = `{sessions.flatMap(session => {
                    const messages = session.messages || [];
                    const rows = [];
                    for (let i = 0; i < messages.length; i++) {
                       if (messages[i].feedback) {
                          let userCtx = "N/A";
                          if (i > 0 && messages[i-1].role === 'user') {
                             userCtx = messages[i-1].content;
                          }
                          const timestamp = session.lastUpdated?.toDate ? session.lastUpdated.toDate().toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-';
                          
                          rows.push(
                            <FeedbackTableRow 
                               key={\`\${session.id}-\${i}\`}
                               session={session}
                               msg={messages[i]}
                               index={i}
                               userCtx={userCtx}
                               timestamp={timestamp}
                            />
                          );
                       }
                    }
                    return rows;
                  })}`;

content = content.replace(tbodyTarget, tbodyReplace);

fs.writeFileSync('src/pages/AdminPage.tsx', content);
