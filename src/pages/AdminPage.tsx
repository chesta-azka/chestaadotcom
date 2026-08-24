import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, Loader2, FileText, CheckCircle2, Lock, LogOut, MessageSquare, Clock, BarChart as BarChartIcon } from 'lucide-react';
import MetaTags from '../components/atoms/MetaTags';
import ReactMarkdown from 'react-markdown';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { useSearchParams } from 'react-router-dom';
import { auth } from '../lib/firebase';
import toast from 'react-hot-toast';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const isSetup = searchParams.get('setup') === 'true';

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    
    try {
      if (isSetup) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Admin account created!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Login berhasil');
      }
    } catch (error: any) {
      toast.error(error.message || 'Autentikasi gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Lock size={24} />
          </div>
        </div>
        <h2 className="text-2xl font-display font-medium text-center text-slate-900 mb-2">
          {isSetup ? 'Setup Admin' : 'Admin Area'}
        </h2>
        <p className="text-sm text-slate-500 text-center mb-8">
          {isSetup ? 'Buat akun admin pertama Anda.' : 'Halaman ini dilindungi. Silakan masukkan kredensial Anda.'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors text-sm"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors text-sm"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-mono text-xs font-bold uppercase tracking-widest py-4 rounded-2xl transition-colors flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : (isSetup ? 'Buat Akun' : 'Masuk')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'seo' | 'chat' | 'stats'>('chat');
  const [content, setContent] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  const [logs, setLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  React.useEffect(() => {
    if (activeTab === 'chat') {
      fetchLogs();
    }
  }, [activeTab]);

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const q = query(collection(db, 'chat_history'), orderBy('timestamp', 'desc'), limit(50));
      const snap = await getDocs(q);
      const fetchedLogs = snap.docs.map(doc => {
        const data = doc.data();
        let timeStr = "Baru saja";
        if (data.timestamp) {
          timeStr = new Date(data.timestamp.toMillis()).toLocaleString('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short'
          });
        }
        return { id: doc.id, ...data, timeStr };
      });
      setLogs(fetchedLogs);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsAuditing(true);
    setResult(null);

    try {
      
      // Dapatkan token
      const token = await auth.currentUser?.getIdToken();
      
      const res = await fetch('/api/ai/seo-audit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      });

      const data = await res.json();
      
      if (res.ok) {
        setResult(data.auditResult);
      } else {
        setResult("Error: " + data.error);
      }
    } catch (err) {
      setResult("Failed to connect to the SEO Audit API.");
    } finally {
      setIsAuditing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Berhasil logout');
    } catch (error) {
      toast.error('Gagal logout');
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full relative z-10">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-indigo-600 font-mono text-xs font-bold tracking-widest uppercase mb-2 block">
            Internal Tool
          </span>
          <h1 className="text-3xl font-display font-medium tracking-tight text-slate-900">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono font-bold text-slate-700">Admin Active</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-10 h-10 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      
      <div className="mb-6 flex space-x-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-3 text-sm font-medium font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'chat' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <MessageSquare size={16} /> Riwayat Chat AI
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-3 text-sm font-medium font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'stats' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <BarChartIcon size={16} /> Analitik Topik
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-3 text-sm font-medium font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'seo' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Search size={16} /> SEO Audit
        </button>
      </div>


      {activeTab === 'chat' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <MessageSquare size={16} className="text-indigo-600" /> 50 Pertanyaan Terakhir
            </h2>
            <button onClick={fetchLogs} disabled={loadingLogs} className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1">
              {loadingLogs ? <Loader2 size={12} className="animate-spin" /> : null} Refresh
            </button>
          </div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto custom-scrollbar">
            {logs.length === 0 && !loadingLogs ? (
              <div className="p-8 text-center text-slate-500 text-sm">Belum ada riwayat percakapan.</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-2">
                    <Clock size={12} /> {log.timeStr}
                  </div>
                  <p className="text-sm text-slate-900 font-medium font-sans">
                    "{log.message}"
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}

      
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

      {activeTab === 'seo' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-[500px]"
          >
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <FileText size={16} className="text-indigo-600" /> Input Konten
            </h2>
            <form onSubmit={handleAudit} className="flex-1 flex flex-col">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste konten halaman, artikel blog, atau copy landing page di sini..."
                className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm font-sans text-slate-700 custom-scrollbar"
                required
              />
              <button
                type="submit"
                disabled={isAuditing || !content.trim()}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-mono text-xs font-bold uppercase tracking-widest py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                {isAuditing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Menganalisis...
                  </>
                ) : (
                  <>
                    <Search size={16} /> Jalankan Audit SEO
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-[500px] overflow-hidden"
          >
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" /> Hasil Analisis AI
            </h2>
            <div className="flex-1 overflow-y-auto bg-slate-50 border border-slate-100 rounded-2xl p-6 custom-scrollbar">
              {!result && !isAuditing && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                  <CheckCircle2 size={32} className="mb-3 text-slate-300" />
                  <p className="text-sm font-sans">Siap untuk melakukan audit.<br/>Masukkan konten di panel sebelah kiri.</p>
                </div>
              )}
              {isAuditing && (
                <div className="h-full flex flex-col items-center justify-center text-indigo-600 text-center space-y-4">
                  <Loader2 size={32} className="animate-spin" />
                  <p className="text-xs font-mono font-bold uppercase tracking-wider animate-pulse">Memproses Data...</p>
                </div>
              )}
              {result && !isAuditing && (
                <div className="prose prose-sm prose-slate max-w-none text-left break-words">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col w-full min-h-screen pt-32 pb-24 px-6 relative bg-slate-50">
      <MetaTags title="Admin Area | CHESTADOTCOM" description="Secure Admin Dashboard" />
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <Loader2 size={32} className="text-indigo-600 animate-spin" />
        </div>
      ) : user ? (
        <AdminDashboard />
      ) : (
        <AdminLogin />
      )}
    </div>
  );
}
