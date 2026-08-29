import re

with open("src/pages/AdminPage.tsx", "r") as f:
    content = f.read()

# 1. Add AnalyticsDashboard component
analytics_dashboard = """
function AnalyticsDashboard({ logs, tokenStats, heatmapData }: any) {
  const [leads, setLeads] = useState<any[]>([]);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'ai_leads'), (snapshot) => {
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
        if (session.leadScored) continue; // Skip already scored
        
        const messages = session.messages || [];
        const userMessages = messages.filter((m: any) => m.role === 'user');
        if (userMessages.length < 2) continue; // Skip short conversations
        
        const transcript = messages.map((m: any) => `${m.role}: ${m.content}`).join('\\n');
        
        const res = await fetch('/api/score-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leadId: docSnap.id, transcript })
        });
        
        if (res.ok) {
          const { ai_score } = await res.json();
          // Save to ai_leads
          await setDoc(doc(db, 'ai_leads', docSnap.id), {
            sessionId: docSnap.id,
            score: ai_score,
            createdAt: serverTimestamp(),
            messageCount: messages.length,
            userId: session.userId || 'anonymous'
          });
          
          // Mark session as scored
          await updateDoc(doc(db, 'ai_chat_sessions', docSnap.id), { leadScored: true });
          processed++;
        }
      }
      toast.success(`Berhasil menganalisis ${processed} prospek baru.`);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menganalisis chat.");
    } finally {
      setProcessing(false);
    }
  };

  const chartData = useMemo(() => {
    const grouped = leads.reduce((acc, lead) => {
      const date = lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString('id-ID') : new Date().toLocaleDateString('id-ID');
      if (!acc[date]) acc[date] = { Hot: 0, Warm: 0, Cold: 0 };
      acc[date][lead.score] = (acc[date][lead.score] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(grouped).map(([date, counts]: any) => ({
      date,
      Hot: counts.Hot || 0,
      Warm: counts.Warm || 0,
      Cold: counts.Cold || 0
    }));
  }, [leads]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">Dashboard & Analytics</h2>
          <p className="text-slate-500">Analisis prospek AI dan konsumsi token</p>
        </div>
        <button 
          onClick={handleProcessLeads}
          disabled={processing}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {processing ? <Loader2 className="animate-spin" size={18} /> : <Activity size={18} />}
          {processing ? 'Menganalisis...' : 'Analisis Prospek Baru'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 mb-1">Total Prospek</h3>
            <p className="text-3xl font-display font-bold text-slate-900">{leads.length}</p>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 mb-1">Hot Leads</h3>
            <p className="text-3xl font-display font-bold text-orange-500">{leads.filter(l => l.score === 'Hot').length}</p>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 mb-1">Warm Leads</h3>
            <p className="text-3xl font-display font-bold text-yellow-500">{leads.filter(l => l.score === 'Warm').length}</p>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 mb-1">Cold Leads</h3>
            <p className="text-3xl font-display font-bold text-blue-500">{leads.filter(l => l.score === 'Cold').length}</p>
         </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Tren Kualitas Prospek (AI Scoring)</h3>
          {chartData.length > 0 ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <RechartsTooltip cursor={{ fill: '#F1F5F9' }} />
                  <Bar dataKey="Hot" stackId="a" fill="#f97316" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="Warm" stackId="a" fill="#eab308" />
                  <Bar dataKey="Cold" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] w-full flex items-center justify-center text-slate-500 bg-slate-50 rounded-xl">
              Belum ada data scoring. Klik 'Analisis Prospek Baru'.
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Konsumsi Token vs Limit</h3>
          <div className="mb-4">
             <div className="flex justify-between items-end mb-2">
               <span className="text-sm text-slate-500">Bulan ini</span>
               <span className="text-xl font-bold text-slate-900">{tokenStats.current_tokens.toLocaleString()} / {tokenStats.monthly_limit.toLocaleString()}</span>
             </div>
             <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${tokenStats.current_tokens / tokenStats.monthly_limit > 0.8 ? 'bg-red-500' : 'bg-purple-600'}`} 
                  style={{ width: `${Math.min((tokenStats.current_tokens / Math.max(tokenStats.monthly_limit, 1)) * 100, 100)}%` }}
                />
             </div>
          </div>
          <p className="text-sm text-slate-500 mb-6">Visualisasi tren interaksi AI Harian (Berdasarkan jumlah chat log):</p>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heatmapData.slice(-14)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="count" stroke="#9333ea" strokeWidth={3} dot={{ r: 4, fill: '#9333ea', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
"""

if "function AnalyticsDashboard" not in content:
    content = content.replace("export default function AdminPage() {", analytics_dashboard + "\nexport default function AdminPage() {")

# 2. Replace dashboard tab content
dashboard_match = re.search(r"(\{activeTab === 'dashboard' && \(\s*<div className=\"space-y-6\">.*?)(?=\{activeTab === 'chat' && \()", content, re.DOTALL)
if dashboard_match:
    original_dash = dashboard_match.group(1)
    new_dash = """{activeTab === 'dashboard' && (
        <AnalyticsDashboard logs={logs} tokenStats={tokenStats} heatmapData={heatmapData} />
      )}
      """
    content = content.replace(original_dash, new_dash)

# 3. Add feedback filter logic in AITrainingTab
if "const [filterFeedback, setFilterFeedback]" not in content:
    # find AITrainingTab
    ai_training_match = re.search(r"function AITrainingTab\(\) \{.*?const \[loading, setLoading\] = useState\(true\);", content, re.DOTALL)
    if ai_training_match:
        original_ai_training = ai_training_match.group(0)
        new_ai_training = original_ai_training + "\n  const [filterFeedback, setFilterFeedback] = useState<'all' | 'down' | 'up'>('all');"
        content = content.replace(original_ai_training, new_ai_training)
        
    # Replace the filtering inside the map
    # We have `if (messages[i].feedback) {` inside `sessions.flatMap`
    
    old_if = "if (messages[i].feedback) {"
    new_if = """if (messages[i].feedback) {
                          if (filterFeedback === 'down' && messages[i].feedback !== 'down') continue;
                          if (filterFeedback === 'up' && messages[i].feedback !== 'up') continue;"""
    content = content.replace(old_if, new_if)

    # Add the filter UI above the table
    table_header_match = re.search(r"<p className=\"text-sm text-slate-500 mb-6\">Tinjau rekam data user feedback secara detail pada jawaban AI.</p>\s*\{loading \? \(", content, re.DOTALL)
    if table_header_match:
        filter_ui = """<p className="text-sm text-slate-500 mb-4">Tinjau rekam data user feedback secara detail pada jawaban AI.</p>
          <div className="flex items-center gap-2 mb-6">
            <button onClick={() => setFilterFeedback('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterFeedback === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Semua Feedback</button>
            <button onClick={() => setFilterFeedback('down')} className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${filterFeedback === 'down' ? 'bg-red-500 text-white' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>👎 Negatif (Thumbs Down)</button>
            <button onClick={() => setFilterFeedback('up')} className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${filterFeedback === 'up' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>👍 Positif (Thumbs Up)</button>
          </div>
          {loading ? ("""
        content = content.replace(table_header_match.group(0), filter_ui)

with open("src/pages/AdminPage.tsx", "w") as f:
    f.write(content)

