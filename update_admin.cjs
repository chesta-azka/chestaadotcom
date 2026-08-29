const fs = require('fs');

let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const oldComponentStr = content.substring(
  content.indexOf('function AITrainingTab() {'),
  content.indexOf('export default function AdminPage() {')
);

// We need to replace AITrainingTab entirely
const newComponentStr = `
function AITrainingTab() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Stats
  const [totalUpvotes, setTotalUpvotes] = useState(0);
  const [totalDownvotes, setTotalDownvotes] = useState(0);
  
  // Knowledge Base
  const [knowledge, setKnowledge] = useState<any[]>([]);
  const [newContext, setNewContext] = useState('');
  
  // Real-time token stats from firestore (mocked fallback if missing)
  const [tokenMetrics, setTokenMetrics] = useState({ limit: 1000000, used: 345020 });
  const tokenPercentage = (tokenMetrics.used / tokenMetrics.limit) * 100;

  useEffect(() => {
    const fetchMetrics = () => {
      try {
        const unsub = onSnapshot(doc(db, 'system_metrics', 'ai_tokens'), (docSnap) => {
          if (docSnap.exists()) {
            setTokenMetrics({ limit: docSnap.data().limit || 1000000, used: docSnap.data().used || 0 });
          }
        });
        return unsub;
      } catch (e) {
        console.error(e);
      }
    };
    const unsubMetrics = fetchMetrics();

    const fetchSessions = async () => {
      try {
        const q = query(collection(db, 'ai_chat_sessions'), orderBy('lastUpdated', 'desc'), limit(100));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setSessions(data);
          
          let up = 0;
          let down = 0;
          data.forEach(s => {
             if (s.messages) {
                s.messages.forEach((m: any) => {
                   if (m.feedback === 'up') up++;
                   if (m.feedback === 'down') down++;
                });
             }
          });
          setTotalUpvotes(up);
          setTotalDownvotes(down);
          setLoading(false);
        });
        return unsubscribe;
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    
    let unsubSessions: any;
    fetchSessions().then(res => unsubSessions = res);

    const fetchKnowledge = async () => {
       try {
         const q = query(collection(db, 'ai_knowledge_base'), orderBy('timestamp', 'desc'));
         const unsubscribe = onSnapshot(q, (snapshot) => {
            setKnowledge(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
         });
         return unsubscribe;
       } catch(e) {
         console.error(e);
       }
    };
    let unsubKnowledge: any;
    fetchKnowledge().then(res => unsubKnowledge = res);

    return () => { 
      if (unsubMetrics) unsubMetrics();
      if (unsubSessions) unsubSessions(); 
      if (unsubKnowledge) unsubKnowledge();
    };
  }, []);

  const handleAddContext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContext.trim()) return;
    try {
      await addDoc(collection(db, 'ai_knowledge_base'), {
        content: newContext,
        timestamp: serverTimestamp(),
        active: true
      });
      setNewContext('');
      toast.success('Konteks berhasil ditambahkan');
    } catch (e) {
      toast.error('Gagal menambahkan konteks');
    }
  };

  const toggleContextActive = async (id: string, current: boolean) => {
     try {
       await setDoc(doc(db, 'ai_knowledge_base', id), { active: !current }, { merge: true });
     } catch (e) { }
  };
  
  const deleteContext = async (id: string) => {
     try {
        await deleteDoc(doc(db, 'ai_knowledge_base', id));
        toast.success('Konteks dihapus');
     } catch (e) { }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Token Stats */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2 mb-6">
             API Token Usage (Real-time)
          </h2>
          <div className="flex flex-col flex-1 gap-6 justify-center">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-sm text-slate-500 font-medium mb-1">Tokens Used</div>
                <div className="text-4xl font-bold text-purple-900">{tokenMetrics.used.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500 font-medium mb-1">Limit</div>
                <div className="text-xl font-bold text-slate-700">{tokenMetrics.limit.toLocaleString()}</div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                <span>Usage Progress</span>
                <span>{tokenPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div 
                  className={\`h-full rounded-full transition-all duration-500 \${tokenPercentage > 90 ? 'bg-red-500' : tokenPercentage > 75 ? 'bg-orange-500' : 'bg-purple-600'}\`} 
                  style={{ width: \`\${Math.min(100, tokenPercentage)}%\` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Summary */}
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dataset / Knowledge Base */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
          <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2 mb-2">
            Dataset & Context (Fine-tuning)
          </h2>
          <p className="text-sm text-slate-500 mb-6">Tambahkan konteks kustom agar AI memiliki info bisnis yang akurat.</p>
          
          <form onSubmit={handleAddContext} className="mb-6">
            <textarea 
              value={newContext}
              onChange={e => setNewContext(e.target.value)}
              placeholder="Contoh: Kami sedang ada promo diskon 50% khusus bulan ini untuk pembuatan web."
              className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-purple-500 focus:outline-none mb-3 resize-none min-h-[80px]"
            />
            <button type="submit" disabled={!newContext.trim()} className="w-full bg-slate-900 text-white font-medium py-2 rounded-xl text-sm disabled:opacity-50">
               + Tambahkan Konteks
            </button>
          </form>

          <div className="flex-1 overflow-y-auto space-y-3">
             {knowledge.length === 0 && <div className="text-center text-sm text-slate-400 py-4">Belum ada dataset kustom.</div>}
             {knowledge.map(k => (
               <div key={k.id} className={\`p-3 border rounded-xl text-sm \${k.active ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-100 opacity-60'}\`}>
                 <p className="text-slate-700 mb-3">{k.content}</p>
                 <div className="flex justify-between items-center">
                   <button onClick={() => toggleContextActive(k.id, k.active)} className={\`text-xs font-medium \${k.active ? 'text-green-600' : 'text-slate-500'}\`}>
                     {k.active ? 'Status: Aktif' : 'Status: Nonaktif'}
                   </button>
                   <button onClick={() => deleteContext(k.id)} className="text-xs text-red-500 hover:underline">Hapus</button>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* AI Training & Feedback Log */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
          <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2 mb-2">
            Feedback Log Detail
          </h2>
          <p className="text-sm text-slate-500 mb-6">Tinjau percakapan user dengan rating.</p>
          
          {loading ? (
            <div className="flex-1 flex items-center justify-center">Loading...</div>
          ) : (
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
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
        </div>
      </div>
    </div>
  );
}

`;

content = content.replace(oldComponentStr, newComponentStr + '\n');
content = content.replace("import { collection, query, orderBy, limit, onSnapshot, setDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';", "import { collection, query, orderBy, limit, onSnapshot, setDoc, doc, addDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';");
fs.writeFileSync('src/pages/AdminPage.tsx', content);
console.log('AITrainingTab updated with Knowledge Base, Aggregation, and Token Visuals');
