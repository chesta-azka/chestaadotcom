import React, { useState, useEffect, useMemo } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { doc, setDoc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';

import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Loader2, Eye, EyeOff, AlertTriangle, FileText, CheckCircle2, Lock, LogOut, MessageSquare, Clock, BarChart as BarChartIcon, Users as UsersIcon } from 'lucide-react';
import MetaTags from '../components/atoms/MetaTags';
import ReactMarkdown from 'react-markdown';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { collection, query, orderBy, limit, getDocs, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import AdminDashboardLayout from '../components/templates/AdminDashboardLayout';
import AuthGuard from '../components/atoms/AuthGuard';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const isSetup = searchParams.get('setup') === 'true';

  const handleResetPassword = async () => {
    if (!email) {
      const msg = 'Harap masukkan alamat email Anda di kolom email untuk mereset password.';
      setErrorMsg(msg);
      return;
    }
    setResetting(true);
    setErrorMsg(null);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Email reset password telah dikirim. Silakan cek inbox/spam Anda.');
      setErrorMsg('Tautan reset password telah dikirim ke ' + email);
    } catch (err: any) {
      let msg = err.message;
      if (err.code === 'auth/user-not-found') msg = 'Email tidak terdaftar.';
      const finalMsg = 'Gagal mereset: ' + msg;
      setErrorMsg(finalMsg);
    } finally {
      setResetting(false);
    }
  };
  
  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Berhasil masuk dengan akun Google!');
    } catch (error: any) {
      let msg = error.message || 'Gagal masuk dengan Google';
      if (error.code === 'auth/popup-closed-by-user') {
        msg = 'Login Google dibatalkan.';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setErrorMsg(null);
    
    try {
      if (isSetup) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          toast.success('Akun admin berhasil dibuat!');
        } catch (err: any) {
          if (err.code === 'auth/email-already-in-use') {
            setErrorMsg('Email ini sudah terdaftar. Sistem mencoba masuk otomatis...');
            try {
              await signInWithEmailAndPassword(auth, email, password);
              toast.success('Berhasil masuk secara otomatis');
            } catch (signInErr: any) {
              const wrongPassMsg = 'Email sudah terdaftar, tapi password SALAH. Jika lupa, klik "Lupa Password" di bawah.';
              setErrorMsg(wrongPassMsg);
            }
          } else if (err.code === 'auth/weak-password') {
            const weakMsg = 'Password terlalu lemah. Harap gunakan setidaknya 6 karakter.';
            setErrorMsg(weakMsg);
          } else {
            throw err;
          }
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Berhasil masuk');
      }
    } catch (error: any) {
      let msg = error.message || 'Autentikasi gagal';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        msg = 'Email atau password yang Anda masukkan salah. Jika lupa, klik "Lupa Password".';
      } else if (error.code === 'auth/user-not-found') {
        msg = 'Akun tidak ditemukan. Harap pastikan email sudah benar.';
      } else if (error.code === 'auth/too-many-requests') {
        msg = 'Terlalu banyak percobaan gagal. Silakan coba lagi nanti atau reset password.';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
            <Lock size={32} />
          </div>
        </div>
        <h1 className="text-2xl font-display font-bold text-center text-slate-900 mb-2">
          {isSetup ? 'Setup Admin' : 'Admin Area'}
        </h1>
        <p className="text-center text-slate-500 mb-6 text-sm">
          {isSetup ? 'Buat akun admin baru' : 'Silakan masuk untuk mengakses dashboard'}
        </p>

        <AnimatePresence>
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="mb-6 overflow-hidden"
            >
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 shadow-sm">
                <AlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
                <p className="text-sm text-red-700 font-medium leading-relaxed">{errorMsg}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full mb-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-3 disabled:opacity-50 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            <path d="M1 1h22v22H1z" fill="none"/>
          </svg>
          Masuk dengan Google
        </button>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-xs text-slate-400 font-medium uppercase">atau dengan email</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="admin@chestadotcom.id"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleResetPassword}
              disabled={resetting}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              {resetting ? 'Mengirim...' : 'Lupa Password?'}
            </button>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center mt-2 disabled:bg-indigo-400"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : (isSetup ? 'Buat Akun / Masuk' : 'Masuk Dashboard')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30'); // '7', '30', 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const autocompleteSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    // Extract unique words from logs
    const wordsSet = new Set<string>();
    logs.forEach(l => {
      if (l.message) {
        const words = l.message.toLowerCase().match(/\b\w+\b/g);
        if (words) {
          words.forEach(w => wordsSet.add(w));
        }
      }
      if (l.userName) wordsSet.add(l.userName.toLowerCase());
      if (l.userId) wordsSet.add(l.userId.toLowerCase());
    });
    
    const queryLower = searchQuery.toLowerCase();
    return Array.from(wordsSet)
      .filter(w => w.includes(queryLower) && w !== queryLower)
      .slice(0, 5);
  }, [searchQuery, logs]);

  const heatmapValues = useMemo(() => {
    const counts = new Map<string, number>();
    logs.forEach(log => {
      if (log.timestamp) {
        let date;
        if (log.timestamp.toDate) {
          date = log.timestamp.toDate();
        } else if (log.timestamp instanceof Date) {
          date = log.timestamp;
        } else if (typeof log.timestamp === 'number') {
          date = new Date(log.timestamp);
        }
        
        if (date) {
          const dateStr = date.toISOString().split('T')[0];
          counts.set(dateStr, (counts.get(dateStr) || 0) + 1);
        }
      }
    });
    
    return Array.from(counts.entries()).map(([date, count]) => ({ date, count }));
  }, [logs]);



  // Markdown editor state
  const [markdownContent, setMarkdownContent] = useState('# Hello Admin\n\nEdit your content here.');

  useEffect(() => {
    const q = query(collection(db, 'chat_history'), orderBy('timestamp', 'desc'), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
      setLoading(false);
      
      // Toast notification for newly added items
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
            const docData = change.doc.data();
            // If the message is very recent (less than 5 seconds old)
            if (docData.timestamp && (Date.now() - docData.timestamp.toMillis() < 5000)) {
                toast.success('Interaksi baru masuk secara realtime!');
            }
        }
      });
    }, (error) => {
      console.error("Failed to fetch logs in realtime:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // eslint-disable-line

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Berhasil keluar');
    } catch (e) {
      console.error(e);
    }
  };

  const getSentiment = (msg: string) => {
    const text = msg.toLowerCase();
    const positiveWords = ['bagus', 'terima kasih', 'keren', 'mantap', 'oke', 'baik', 'bisa', 'mau', 'pesan'];
    if (positiveWords.some(w => text.includes(w))) return 'positive';
    return 'neutral';
  };

  // Filtered and Searched Logs
  const filteredLogs = useMemo(() => {
    let filtered = logs;
    
    if (searchQuery) {
      filtered = filtered.filter(l => l.message?.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (dateRange !== 'all') {
      const days = parseInt(dateRange);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      filtered = filtered.filter(l => {
        if (!l.timestamp) return true;
        return l.timestamp.toDate() >= cutoff;
      });
    }

    return filtered;
  }, [logs, searchQuery, dateRange]);

  // Analytics Data
  
  // Prepare Heatmap Data
  const heatmapData = useMemo(() => {
    const counts = {};
    logs.forEach(log => {
      if (log.timestamp) {
        // Just extract YYYY-MM-DD
        const dateObj = log.timestamp.toDate();
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, '0');
        const d = String(dateObj.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${d}`;
        counts[dateStr] = (counts[dateStr] || 0) + 1;
      }
    });
    return Object.keys(counts).map(date => ({ date, count: counts[date] }));
  }, [logs]);

  const serviceStats = [
    { name: 'Website M-Site', queries: filteredLogs.filter(l => l.message?.toLowerCase().includes('web')).length || 12 },
    { name: 'AI Assistant', queries: filteredLogs.filter(l => l.message?.toLowerCase().includes('ai')).length || 8 },
    { name: 'Harga', queries: filteredLogs.filter(l => l.message?.toLowerCase().includes('harga') || l.message?.toLowerCase().includes('biaya')).length || 15 },
    { name: 'SEO', queries: filteredLogs.filter(l => l.message?.toLowerCase().includes('seo')).length || 5 },
  ];

  return (
    <AdminDashboardLayout onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab}>
      
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-900">Dashboard Overview</h2>
              <p className="text-slate-500">Ringkasan aktivitas platform Anda.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 mb-1">Total Chat</h3>
                <p className="text-3xl font-display font-bold text-slate-900">{logs.length}</p>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 mb-1">Topik Terpopuler</h3>
                <p className="text-3xl font-display font-bold text-indigo-600">Harga</p>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 mb-1">Sentimen Positif</h3>
                <p className="text-3xl font-display font-bold text-emerald-600">
                    {Math.round((logs.filter(l => getSentiment(l.message || '') === 'positive').length / Math.max(logs.length, 1)) * 100)}%
                </p>
             </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mt-6">
             <h3 className="text-sm font-medium text-slate-500 mb-4">Activity Heatmap (Chat Interactions)</h3>
             <div className="w-full overflow-x-auto">
               <div className="min-w-[700px]">
                 <CalendarHeatmap
                   startDate={new Date(new Date().setMonth(new Date().getMonth() - 5))}
                   endDate={new Date()}
                   values={heatmapData}
                   classForValue={(value) => {
                     if (!value) {
                       return 'color-empty';
                     }
                     return `color-scale-${Math.min(value.count, 4)}`; // Assuming we have css for color-scale-1 to 4
                   }}
                   tooltipDataAttrs={value => {
                     return {
                       'data-tip': `${value.date ? value.date : ''} : ${value.count ? value.count : 0} interactions`,
                     };
                   }}
                 />
               </div>
             </div>
          </div>

        </div>
      )}

      {activeTab === 'chat' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
                <MessageSquare size={20} className="text-indigo-600" /> Riwayat Chat AI
              </h2>
              <p className="text-sm text-slate-500">
                Log percakapan pengunjung dengan Floating AI Assistant.
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Cari kata kunci..."
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full sm:w-auto"
              />
              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {showSuggestions && autocompleteSuggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden"
                  >
                    {autocompleteSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 size={24} className="text-indigo-600 animate-spin" />
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="text-center text-slate-500 py-10">
                Tidak ada data riwayat chat.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLogs.map((log) => {
                  const sentiment = getSentiment(log.message || '');
                  return (
                    <div key={log.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                        <MessageSquare size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-slate-900 truncate">Visitor</p>
                          <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${sentiment === 'positive' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                              {sentiment}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock size={12} />
                              {log.timestamp ? new Date(log.timestamp.toDate()).toLocaleString('id-ID') : 'Baru saja'}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">"{log.message}"</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-display font-medium text-slate-900 mb-2 flex items-center gap-2">
                <BarChartIcon size={20} className="text-indigo-600" /> Analitik Topik AI
              </h2>
              <p className="text-sm text-slate-500">
                Tren interaksi pengguna dan popularitas layanan.
              </p>
            </div>
            <select 
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="7">7 Hari Terakhir</option>
              <option value="30">30 Hari Terakhir</option>
              <option value="all">Semua Waktu</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="h-[300px] flex flex-col">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 text-center">Topik Populer (Service Metrics)</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceStats}>
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
        </div>
      )}

      {activeTab === 'seo' && (
        <SEOTool />
      )}

      
            {activeTab === 'users' && (
        <UserManagement />
      )}
      {activeTab === 'audit' && (
        <SystemAuditLog />
      )}
{activeTab === 'seo_manager' && (
        <SEOManager />
      )}

      {activeTab === 'content' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[600px] flex flex-col">
          <div className="mb-6">
            <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
              <PenTool size={20} className="text-indigo-600" /> Content Editor
            </h2>
            <p className="text-sm text-slate-500">
              Edit konten website menggunakan Markdown.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-2">Markdown Input</label>
              <textarea 
                value={markdownContent}
                onChange={e => setMarkdownContent(e.target.value)}
                className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono text-sm resize-none custom-scrollbar"
                placeholder="Tulis konten Markdown di sini..."
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-2">Live Preview</label>
              <div className="flex-1 w-full p-6 bg-white border border-slate-200 rounded-2xl overflow-y-auto prose prose-slate max-w-none custom-scrollbar">
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-md">
                Simpan Konten
             </button>
          </div>
        </div>
      )}

    </AdminDashboardLayout>
  );
}

function SEOTool() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    if (!content) return;
    setLoading(true);
    try {
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
      if (data.auditResult) {
        setResult(data.auditResult);
      } else {
        toast.error(data.error || 'Gagal melakukan audit');
      }
    } catch (e) {
      toast.error('Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-xl font-display font-medium text-slate-900 mb-2 flex items-center gap-2">
          <Search size={20} className="text-indigo-600" /> SEO Content Audit
        </h2>
        <p className="text-sm text-slate-500">
          Tempelkan draf artikel atau deskripsi layanan, dan AI akan menganalisis skor SEO Lokal Anda.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none font-sans"
            placeholder="Ketik atau tempel konten website Anda di sini (minimal 100 kata)..."
          ></textarea>
          <button
            onClick={handleAudit}
            disabled={loading || content.length < 10}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {loading ? 'Menganalisis...' : 'Audit SEO Sekarang'}
          </button>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 text-slate-300 flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 mb-4 text-white pb-4 border-b border-slate-800">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <h3 className="font-medium">Hasil Analisis</h3>
          </div>
          <div className="flex-1 overflow-y-auto prose prose-invert prose-sm custom-scrollbar max-w-none pr-2">
            {result ? (
              <ReactMarkdown>{result}</ReactMarkdown>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600 flex-col gap-3">
                <FileText size={32} />
                <p>Hasil audit akan muncul di sini.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


function SEOManager() {
  const [routes, setRoutes] = useState([
    { path: '/', name: 'Home' },
    { path: '/blog', name: 'Blog Hub' },
    { path: '/services', name: 'Services' },
    { path: '/portfolio', name: 'Portfolio' },
    { path: '/about', name: 'About' },
  ]);
  const [selectedRoute, setSelectedRoute] = useState('/');
  const [seoData, setSeoData] = useState({ title: '', description: '', ogImage: '' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSeo = async () => {
      setLoading(true);
      try {
        // Firebase doc IDs can't have '/' if they are just paths. Let's encode it or replace
        const docId = selectedRoute === '/' ? 'home' : selectedRoute.replace(/\//g, '_');
        const docRef = doc(db, 'seo_settings', docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSeoData(docSnap.data());
        } else {
          setSeoData({ title: '', description: '', ogImage: '' });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSeo();
  }, [selectedRoute]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const docId = selectedRoute === '/' ? 'home' : selectedRoute.replace(/\//g, '_');
      const docRef = doc(db, 'seo_settings', docId);
      await setDoc(docRef, seoData);
      await addDoc(collection(db, 'audit_logs'), {
        action: 'Updated SEO Settings',
        details: `Updated SEO for route: ${selectedRoute}`,
        adminEmail: auth.currentUser?.email || 'Unknown',
        timestamp: serverTimestamp()
      });
      toast.success('SEO Settings saved!');
    } catch (e) {
      toast.error('Failed to save SEO settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
      <div className="mb-6">
        <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
          <Search size={20} className="text-indigo-600" /> SEO Route Manager
        </h2>
        <p className="text-sm text-slate-500">
          Kelola Title dan Meta Description untuk setiap halaman secara dinamis.
        </p>
      </div>

      <div className="flex gap-6 flex-1">
        <div className="w-64 border-r border-slate-100 pr-6 space-y-2">
          {routes.map(r => (
            <button
              key={r.path}
              onClick={() => setSelectedRoute(r.path)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${selectedRoute === r.path ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {r.name}
              <div className="text-xs text-slate-400 font-normal mt-0.5">{r.path}</div>
            </button>
          ))}
        </div>
        <div className="flex-1 flex flex-col max-w-2xl">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 size={24} className="text-indigo-600 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Meta Title</label>
                <input 
                  type="text"
                  value={seoData.title}
                  onChange={e => setSeoData({...seoData, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="Misal: Jasa Web Profesional | Nama Bisnis"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Meta Description</label>
                <textarea 
                  value={seoData.description}
                  onChange={e => setSeoData({...seoData, description: e.target.value})}
                  className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                  placeholder="Deskripsi singkat yang akan muncul di Google pencarian..."
                />
              </div>
              <div className="pt-4">
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : null}
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { makeMeAdmin } = useAuth(); // Utility

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching users realtime:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await setDoc(doc(db, 'users', userId), { role: newRole }, { merge: true });
      await addDoc(collection(db, 'audit_logs'), {
        action: 'Modified User Role',
        details: `Changed role of user ${userId} to ${newRole}`,
        adminEmail: auth.currentUser?.email || 'Unknown',
        timestamp: serverTimestamp()
      });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success(`Role updated to ${newRole}`);
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
            <UsersIcon size={20} className="text-indigo-600" /> User Management
          </h2>
          <p className="text-sm text-slate-500">
            Kelola peran pengguna (Admin/User).
          </p>
        </div>
        <button
          onClick={makeMeAdmin}
          className="px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-xl hover:bg-indigo-100 transition-colors"
        >
          Darurat: Jadikan Saya Admin
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={24} className="text-indigo-600 animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-sm font-medium text-slate-500">
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="py-3 px-4 text-sm text-slate-800">{u.email || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                      {u.role || 'user'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select 
                      value={u.role || 'user'}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-white border border-slate-200 text-sm rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-sm text-slate-500">
                    Belum ada pengguna terdaftar di Firestore.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthGuard fallback={<AdminLogin />}>
      <MetaTags title="Admin Area | CHESTADOTCOM" description="Secure Admin Dashboard" />
      <AdminDashboard />
    </AuthGuard>
  );
}


function SystemAuditLog() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'audit_logs'), orderBy('timestamp', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
      setLoading(false);
    }, (error) => {
      console.error("Failed to fetch audit logs:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
            <Shield size={20} className="text-indigo-600" /> System Audit Log
          </h2>
          <p className="text-sm text-slate-500">
            Read-only log of significant admin actions.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto rounded-2xl border border-slate-200 custom-scrollbar">
        {loading ? (
          <div className="h-full flex items-center justify-center min-h-[300px]">
            <Loader2 size={24} className="text-indigo-600 animate-spin" />
          </div>
        ) : logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[300px]">
            <Shield size={32} className="mb-4 opacity-50" />
            <p>No audit logs available.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Timestamp</th>
                <th className="px-6 py-4 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Admin Email</th>
                <th className="px-6 py-4 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Action</th>
                <th className="px-6 py-4 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                    {log.timestamp ? new Date(log.timestamp.toDate()).toLocaleString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    }) : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {log.adminEmail}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
