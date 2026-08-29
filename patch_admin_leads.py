import re

with open("src/pages/AdminPage.tsx", "r") as f:
    content = f.read()

ai_leads_component = """
function AILeadsScoringDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, 'ai_leads'), orderBy('createdAt', 'desc')), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeads(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleProcessLeads = async () => {
    setProcessing(true);
    try {
      const q = query(collection(db, 'ai_chat_sessions'), orderBy('lastUpdated', 'desc'), limit(50));
      const snapshot = await getDocs(q);
      
      let processed = 0;
      for (const docSnap of snapshot.docs) {
        const session = docSnap.data();
        if (session.leadScored) continue;
        
        const messages = session.messages || [];
        const userMessages = messages.filter((m: any) => m.role === 'user');
        if (userMessages.length < 2) continue;
        
        const res = await fetch('/api/score-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leadId: docSnap.id })
        });
        
        if (res.ok) {
          processed++;
        }
      }
      toast.success(`Processed ${processed} new leads via Groq API.`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze leads.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between border-b-2 border-black pb-4">
        <div>
          <h2 className="text-3xl font-mono font-black text-black uppercase tracking-tighter mb-2">AI Leads Scoring</h2>
          <p className="text-black font-mono text-sm">Groq-powered intent analysis and lead categorization.</p>
        </div>
        <button 
          onClick={handleProcessLeads}
          disabled={processing}
          className="flex items-center gap-2 px-6 py-2 bg-black text-white font-mono text-sm font-bold uppercase hover:bg-slate-800 disabled:opacity-50 transition-colors"
        >
          {processing ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />}
          {processing ? 'ANALYZING NEURAL...' : 'TRIGGER GROQ ANALYSIS'}
        </button>
      </div>

      <div className="border-2 border-black bg-white">
        <div className="bg-black text-white px-4 py-3 border-b-2 border-black">
          <h3 className="font-mono font-bold uppercase tracking-widest text-sm">Lead Directory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-mono text-xs font-bold uppercase border-b-2 border-black text-black">Lead ID</th>
                <th className="px-4 py-3 font-mono text-xs font-bold uppercase border-b-2 border-black text-black">Intent Score</th>
                <th className="px-4 py-3 font-mono text-xs font-bold uppercase border-b-2 border-black text-black">Messages</th>
                <th className="px-4 py-3 font-mono text-xs font-bold uppercase border-b-2 border-black text-black">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center font-mono text-sm text-black">Loading leads...</td>
                </tr>
              ) : leads.length > 0 ? leads.map((lead, i) => (
                <tr key={i} className="hover:bg-slate-100 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-black truncate max-w-[200px]">{lead.sessionId}</td>
                  <td className="px-4 py-3 font-mono text-xs font-black uppercase">
                    {lead.score === 'Hot' && <span className="bg-black text-white px-2 py-1">HOT LEAD</span>}
                    {lead.score === 'Warm' && <span className="border-2 border-black px-2 py-1">WARM</span>}
                    {lead.score === 'Cold' && <span className="text-slate-500">COLD</span>}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-black">{lead.messageCount}</td>
                  <td className="px-4 py-3 font-mono text-xs text-black">{lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleString('id-ID') : '-'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center font-mono text-sm text-black">No leads scored yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
"""

if "function AILeadsScoringDashboard" not in content:
    content = content.replace("export default function AdminPage() {", ai_leads_component + "\nexport default function AdminPage() {")

tab_render = """      {activeTab === 'ai_leads' && (
        <AILeadsScoringDashboard />
      )}"""

if "{activeTab === 'ai_leads'" not in content:
    content = content.replace("{activeTab === 'dashboard' && (\n        <AnalyticsDashboard />\n      )}", "{activeTab === 'dashboard' && (\n        <AnalyticsDashboard />\n      )}\n" + tab_render)

with open("src/pages/AdminPage.tsx", "w") as f:
    f.write(content)

