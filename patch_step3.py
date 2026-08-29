import re

with open("src/pages/AdminPage.tsx", "r") as f:
    content = f.read()

new_analytics = """function AnalyticsDashboard() {
  const [liveVisitors, setLiveVisitors] = useState<any[]>([]);
  const [clickStats, setClickStats] = useState<any[]>([]);
  const [leadStats, setLeadStats] = useState<any[]>([]);
  
  useEffect(() => {
    // 1. Live Visitors
    const unsubVisitors = onSnapshot(collection(db, 'live_visitors'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data()).filter(v => v.is_online);
      setLiveVisitors(data);
    });

    // 2. Click Telemetry
    const unsubClicks = onSnapshot(collection(db, 'click_telemetry'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      const counts: Record<string, number> = {};
      data.forEach(item => {
        const key = item.elementText || item.elementId;
        if (key) {
          counts[key] = (counts[key] || 0) + 1;
        }
      });
      const topClicks = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));
      setClickStats(topClicks);
    });

    // 3. AI Leads
    const unsubLeads = onSnapshot(collection(db, 'ai_leads'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      const grouped: Record<string, number> = {};
      data.forEach(lead => {
        const date = lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString('id-ID') : new Date().toLocaleDateString('id-ID');
        grouped[date] = (grouped[date] || 0) + 1;
      });
      const formatted = Object.entries(grouped)
         .map(([date, count]) => ({ date, count }))
         .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setLeadStats(formatted);
    });

    return () => {
      unsubVisitors();
      unsubClicks();
      unsubLeads();
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-mono font-black text-black uppercase tracking-tighter mb-2">Omniscient Analytics</h2>
        <p className="text-black font-mono text-sm border-b-2 border-black pb-4">Real-time telemetry and intelligence node.</p>
      </div>
      
      {/* Real-Time Visitors Table */}
      <div className="border-2 border-black bg-white">
        <div className="bg-black text-white px-4 py-3 border-b-2 border-black flex justify-between items-center">
          <h3 className="font-mono font-bold uppercase tracking-widest text-sm">Live Visitors Target Lock</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="font-mono text-xs font-bold">{liveVisitors.length} ONLINE</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-mono text-xs font-bold uppercase border-b-2 border-black text-black">Session ID</th>
                <th className="px-4 py-3 font-mono text-xs font-bold uppercase border-b-2 border-black text-black">Source</th>
                <th className="px-4 py-3 font-mono text-xs font-bold uppercase border-b-2 border-black text-black">Current Page</th>
                <th className="px-4 py-3 font-mono text-xs font-bold uppercase border-b-2 border-black text-black">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {liveVisitors.length > 0 ? liveVisitors.map((v, i) => (
                <tr key={i} className="hover:bg-slate-100 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-black truncate max-w-[150px]">{v.session_id}</td>
                  <td className="px-4 py-3 font-mono text-xs text-black">{v.source}</td>
                  <td className="px-4 py-3 font-mono text-xs text-black">{v.current_page}</td>
                  <td className="px-4 py-3 font-mono text-xs text-black">{v.last_active?.toDate ? v.last_active.toDate().toLocaleTimeString('id-ID') : 'Just now'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center font-mono text-sm text-black">No active signals detected.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Click Telemetry Chart */}
        <div className="border-2 border-black bg-white flex flex-col">
          <div className="bg-black text-white px-4 py-3 border-b-2 border-black">
             <h3 className="font-mono font-bold uppercase tracking-widest text-sm">Interaction Frequency</h3>
          </div>
          <div className="p-6 h-[300px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clickStats} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#000" />
                <XAxis type="number" axisLine={{ stroke: '#000', strokeWidth: 2 }} tickLine={{ stroke: '#000' }} tick={{ fill: '#000', fontFamily: 'monospace', fontSize: 10 }} />
                <YAxis dataKey="name" type="category" width={100} axisLine={{ stroke: '#000', strokeWidth: 2 }} tickLine={{ stroke: '#000' }} tick={{ fill: '#000', fontFamily: 'monospace', fontSize: 10 }} />
                <RechartsTooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: 0, fontFamily: 'monospace' }} />
                <Bar dataKey="count" fill="#000" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Leads Growth Chart */}
        <div className="border-2 border-black bg-white flex flex-col">
          <div className="bg-black text-white px-4 py-3 border-b-2 border-black">
             <h3 className="font-mono font-bold uppercase tracking-widest text-sm">AI Lead Genesis</h3>
          </div>
          <div className="p-6 h-[300px] flex-1">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#000" />
                <XAxis dataKey="date" axisLine={{ stroke: '#000', strokeWidth: 2 }} tickLine={{ stroke: '#000' }} tick={{ fill: '#000', fontFamily: 'monospace', fontSize: 10 }} />
                <YAxis axisLine={{ stroke: '#000', strokeWidth: 2 }} tickLine={{ stroke: '#000' }} tick={{ fill: '#000', fontFamily: 'monospace', fontSize: 10 }} />
                <RechartsTooltip cursor={{ stroke: '#000', strokeWidth: 1, strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: 0, fontFamily: 'monospace' }} />
                <Line type="step" dataKey="count" stroke="#000" strokeWidth={3} dot={{ r: 4, fill: '#000', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, fill: '#000' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}"""

# Extract everything from `function AnalyticsDashboard` until `export default function AdminPage`
pattern = re.compile(r"function AnalyticsDashboard\(\{ logs, tokenStats, heatmapData \}: any\) \{.*?\}\s*(?=export default function AdminPage)", re.DOTALL)
content = pattern.sub(new_analytics + "\n\n", content)

# Remove the props from the `<AnalyticsDashboard />` invocation
content = content.replace("<AnalyticsDashboard logs={logs} tokenStats={tokenStats} heatmapData={heatmapData} />", "<AnalyticsDashboard />")

with open("src/pages/AdminPage.tsx", "w") as f:
    f.write(content)

