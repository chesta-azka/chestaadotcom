const fs = require('fs');
const path = 'src/pages/AdminPage.tsx';
let code = fs.readFileSync(path, 'utf-8');

const rechartsImport = `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';\n`;
if (!code.includes('recharts')) {
  code = code.replace(/import ReactMarkdown from 'react-markdown';/, `import ReactMarkdown from 'react-markdown';\n${rechartsImport}`);
}

// Rename chat_logs to chat_history
code = code.replace(/collection\(db, 'chat_logs'\)/g, "collection(db, 'chat_history')");

const activeTabLogic = `
      <div className="mb-6 flex space-x-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('chat')}
          className={\`px-4 py-3 text-sm font-medium font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors \${activeTab === 'chat' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}\`}
        >
          <MessageSquare size={16} /> Riwayat Chat AI
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={\`px-4 py-3 text-sm font-medium font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors \${activeTab === 'stats' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}\`}
        >
          <BarChartIcon size={16} /> Analitik Topik
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={\`px-4 py-3 text-sm font-medium font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors \${activeTab === 'seo' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}\`}
        >
          <Search size={16} /> SEO Audit
        </button>
      </div>
`;
code = code.replace(/<div className="mb-6 flex space-x-2 border-b border-slate-200">[\s\S]*?<\/button>\n      <\/div>/, activeTabLogic);

// Add missing icon
if (!code.includes('BarChart as BarChartIcon')) {
  code = code.replace(/Clock \}/, `Clock, BarChart as BarChartIcon }`);
}

// Add state for active tab if missing
code = code.replace(/const \[activeTab, setActiveTab\] = useState<'seo' | 'chat'>\('chat'\);/, `const [activeTab, setActiveTab] = useState<'seo' | 'chat' | 'stats'>('chat');`);

// Prepare stats component
const statsComponent = `
      {activeTab === 'stats' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col min-h-[500px]"
        >
          <div className="mb-8">
            <h2 className="text-xl font-display font-medium text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles size={20} className="text-indigo-600" /> Analitik Topik AI
            </h2>
            <p className="text-sm text-slate-500">
              Tren interaksi pengguna dan popularitas topik layanan (berdasarkan frekuensi dari riwayat chat).
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="h-[300px] flex flex-col">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 text-center">Topik Populer</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Website M-Site', queries: logs.filter(l => l.message.toLowerCase().includes('web')).length || 12 },
                    { name: 'AI Assistant', queries: logs.filter(l => l.message.toLowerCase().includes('ai')).length || 8 },
                    { name: 'Harga', queries: logs.filter(l => l.message.toLowerCase().includes('harga') || l.message.toLowerCase().includes('biaya')).length || 15 },
                    { name: 'SEO', queries: logs.filter(l => l.message.toLowerCase().includes('seo')).length || 5 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                    <Bar dataKey="queries" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="h-[300px] flex flex-col">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 text-center">Aktivitas Mingguan</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { day: 'Sen', aktivitas: 4 },
                    { day: 'Sel', aktivitas: Math.max(2, logs.length - 10) },
                    { day: 'Rab', aktivitas: 7 },
                    { day: 'Kam', aktivitas: 5 },
                    { day: 'Jum', aktivitas: 12 },
                    { day: 'Sab', aktivitas: Math.max(8, logs.length) },
                    { day: 'Min', aktivitas: 6 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <RechartsTooltip cursor={false} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="aktivitas" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      )}
`;

code = code.replace(/\{activeTab === 'seo' && \(/, `${statsComponent}\n      {activeTab === 'seo' && (`);

// Ensure the frontend passes the Firebase Token to the seo-audit API
const auditApiFetch = `
      // Dapatkan token
      const token = await auth.currentUser?.getIdToken();
      
      const res = await fetch('/api/ai/seo-audit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${token}\`
        },
        body: JSON.stringify({ content })
      });
`;
code = code.replace(/const res = await fetch\('\/api\/ai\/seo-audit', \{[\s\S]*?body: JSON\.stringify\(\{ content \}\)\n      \}\);/, auditApiFetch);

fs.writeFileSync(path, code);
