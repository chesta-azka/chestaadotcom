const fs = require('fs');

let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

// Add Bot, ThumbsUp, ThumbsDown to lucide-react imports if not there, actually let's just create the component
const component = `
function AITrainingTab() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dummy token stats for demo
  const tokenLimit = 1000000;
  const tokensUsed = 345020;
  const tokenPercentage = (tokensUsed / tokenLimit) * 100;

  useEffect(() => {
    // Fetch sessions that have feedback
    const fetchSessions = async () => {
      try {
        const q = query(collection(db, 'ai_chat_sessions'), orderBy('lastUpdated', 'desc'), limit(20));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setSessions(data);
          setLoading(false);
        });
        return unsubscribe;
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    let unsub: any;
    fetchSessions().then(res => unsub = res);
    return () => { if (unsub) unsub(); };
  }, []);

  return (
    <div className="space-y-6">
      {/* Token Stats */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2 mb-6">
           API Token Usage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
            <div className="text-sm text-purple-600 font-medium mb-1">Tokens Used</div>
            <div className="text-3xl font-bold text-purple-900">{tokensUsed.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-sm text-slate-500 font-medium mb-1">Token Limit (Monthly)</div>
            <div className="text-3xl font-bold text-slate-800">{tokenLimit.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center">
            <div className="text-sm text-slate-500 font-medium mb-2">Remaining Quota</div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: \`\${tokenPercentage}%\` }}></div>
            </div>
            <div className="text-xs text-slate-400 mt-2 text-right">{100 - Math.round(tokenPercentage)}% left</div>
          </div>
        </div>
      </div>

      {/* AI Training & Feedback */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
        <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2 mb-2">
           AI Training & User Feedback
        </h2>
        <p className="text-sm text-slate-500 mb-6">Tinjau percakapan user dan rating (Thumbs Up/Down) untuk melatih AI lebih lanjut.</p>
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
             Loading...
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map(session => {
              const messages = session.messages || [];
              const feedbackMsgs = messages.filter((m: any) => m.feedback);
              if (feedbackMsgs.length === 0) return null; // Only show sessions with feedback

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
              <div className="text-center text-slate-500 py-8">Belum ada feedback dari user.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
`;

content = content + '\n' + component;

// Inject it into AdminDashboard switch
content = content.replace(
  "{activeTab === 'audit' && (\n        <SystemAuditLog />\n      )}",
  "{activeTab === 'audit' && (\n        <SystemAuditLog />\n      )}\n      {activeTab === 'ai_training' && (\n        <AITrainingTab />\n      )}"
);

fs.writeFileSync('src/pages/AdminPage.tsx', content);
console.log('AITrainingTab added');
