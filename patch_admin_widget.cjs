const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

const target1 = `function AnalyticsDashboard() {
  const [liveVisitors, setLiveVisitors] = useState<any[]>([]);`;
const replacement1 = `function AnalyticsDashboard() {
  const [liveVisitors, setLiveVisitors] = useState<any[]>([]);
  const [prunableCount, setPrunableCount] = useState<number | null>(null);`;
code = code.replace(target1, replacement1);

const target2 = `const unsubLeads = onSnapshot(collection(db, 'ai_leads'), (snapshot) => {
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
    });`;
    
const replacement2 = target2 + `

    // 4. Prunable Messages Count
    const fetchPrunable = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const res = await fetch('/api/admin/prunable-count', {
          headers: { 'Authorization': \`Bearer \${token}\` }
        });
        const data = await res.json();
        setPrunableCount(data.count || 0);
      } catch(e) {
        console.error("Prunable count error", e);
      }
    };
    fetchPrunable();`;
code = code.replace(target2, replacement2);

const target3 = `<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">`;
const replacement3 = `
      {/* Prunable Storage Widget */}
      <div className="border-2 border-black bg-white">
        <div className="bg-black text-white px-4 py-3 border-b-2 border-black flex justify-between items-center">
          <h3 className="font-mono font-bold uppercase tracking-widest text-sm">Storage Retention Health</h3>
        </div>
        <div className="p-6 flex flex-col sm:flex-row items-center gap-6 justify-between">
           <div>
              <p className="font-mono font-bold text-slate-800 uppercase tracking-tight text-lg mb-1">Messages Eligible for AI Pruning (30+ Days)</p>
              <p className="font-mono text-sm text-slate-500 max-w-xl">
                 Displays the total count of messages across all unprotected workspaces that are older than 30 days and currently pending the scheduled AI lead probability evaluation. Low-intent sessions will be automatically deleted.
              </p>
           </div>
           <div className="shrink-0 flex items-center justify-center min-w-[120px] h-24 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-purple-50 rounded-xl">
             <span className="font-mono font-black text-4xl text-purple-600">
               {prunableCount === null ? '...' : prunableCount}
             </span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">`;
code = code.replace(target3, replacement3);

fs.writeFileSync('src/pages/AdminPage.tsx', code);
console.log('AdminPage updated with prunable count widget.');
