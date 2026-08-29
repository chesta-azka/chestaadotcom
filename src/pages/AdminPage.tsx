
function LiveTakeoverManager() {
  const [takeoverSession, setTakeoverSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMsg, setInputMsg] = useState('');

  useEffect(() => {
    // Listen for chat sessions requiring human
    const q = query(
      collection(db, 'ai_chat_sessions'), 
      where('requiresHuman', '==', true),
      where('humanTakeover', '==', false)
    );
    
    const unsub = onSnapshot(q, (snapshot) => {
       snapshot.docChanges().forEach((change) => {
          if (change.type === 'added' || change.type === 'modified') {
             const data = change.doc.data();
             if (!data.humanTakeover) {
                toast(`HOT LEAD ALERT: Visitor requesting human connection! Session ID: ${change.doc.id}`, {
                   duration: 10000,
                   icon: '🚨',
                   style: { background: '#000', color: '#fff' }
                });
                // Allow admin to click to take over
                const id = change.doc.id;
                setTimeout(() => {
                   if(window.confirm(`Take over chat session ${id}?`)) {
                      handleTakeover(id);
                   }
                }, 500); // Wait for toast, then prompt (or could make toast actionable)
             }
          }
       });
    });
    return unsub;
  }, []);

  const handleTakeover = async (id: string) => {
     try {
       await updateDoc(doc(db, 'ai_chat_sessions', id), {
          humanTakeover: true,
          humanTakeoverAt: serverTimestamp()
       });
       setTakeoverSession(id);
     } catch(e) {
       toast.error("Takeover failed");
     }
  };

  useEffect(() => {
    if (!takeoverSession) return;
    const unsub = onSnapshot(doc(db, 'ai_chat_sessions', takeoverSession), (snap) => {
       if (snap.exists()) {
          setMessages(snap.data().messages || []);
       }
    });
    return unsub;
  }, [takeoverSession]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !takeoverSession) return;
    
    const newMessages = [...messages, { role: 'ai', content: inputMsg.trim() }];
    setMessages(newMessages); // optimistic
    setInputMsg('');
    
    await updateDoc(doc(db, 'ai_chat_sessions', takeoverSession), {
       messages: newMessages,
       lastUpdated: serverTimestamp()
    });
  };

  if (!takeoverSession) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 flex flex-col h-[500px]">
       <div className="bg-black text-white p-3 flex justify-between items-center border-b-2 border-black">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h3 className="font-mono font-bold text-sm">LIVE OVERRIDE</h3>
          </div>
          <button onClick={() => setTakeoverSession(null)}><X size={16} /></button>
       </div>
       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((m, i) => (
             <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-start' : 'items-end'}`}>
               <span className="text-[10px] font-mono font-bold mb-1 text-slate-500">
                 {m.role === 'user' ? 'VISITOR' : 'PRINCIPAL ENGINEER'}
               </span>
               <div className={`px-4 py-2 ${m.role === 'user' ? 'bg-white border-2 border-black text-black' : 'bg-black text-white'} font-sans text-sm max-w-[85%]`}>
                 {m.content}
               </div>
             </div>
          ))}
       </div>
       <form onSubmit={sendMessage} className="border-t-2 border-black p-3 bg-white flex gap-2">
         <input 
           value={inputMsg}
           onChange={e => setInputMsg(e.target.value)}
           className="flex-1 border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none"
           placeholder="Override Groq..."
         />
         <button type="submit" className="bg-black text-white px-4 py-2 font-bold font-mono">
           SEND
         </button>
       </form>
    </div>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { doc, setDoc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';

import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Search, Sparkles, Loader2, Eye, EyeOff, AlertTriangle, FileText, CheckCircle2, Lock, LogOut, MessageSquare, Clock, BarChart as BarChartIcon, Users as UsersIcon, PenTool, Shield, Zap, ChevronDown, Folder, Activity } from 'lucide-react';
import MetaTags from '../components/atoms/MetaTags';
import ReactMarkdown from 'react-markdown';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { collection, query, orderBy, limit, getDocs, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';
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
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
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
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="admin@chestaadotcom.id"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all pr-12"
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
              className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              {resetting ? 'Mengirim...' : 'Lupa Password?'}
            </button>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center mt-2 disabled:bg-purple-400"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : (isSetup ? 'Buat Akun / Masuk' : 'Masuk Dashboard')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}


const AdminChatHistoryFolders = ({ sessions }: { sessions: any[] }) => {
  const pairs: any[] = [];
  
  sessions.forEach(session => {
    let currentPair: any = null;
    const history = session.messages || [];
    history.forEach((msg: any, idx: number) => {
      if (msg.role === 'user') {
        if (currentPair) pairs.push(currentPair);
        currentPair = { userMsg: msg, userIdx: idx, aiMsgs: [], sessionInfo: session };
      } else if (msg.role === 'ai' && currentPair) {
        currentPair.aiMsgs.push(msg);
      }
    });
    if (currentPair) pairs.push(currentPair);
  });

  const categories = {
    'Pricing': [] as any[],
    'Services': [] as any[],
    'General': [] as any[],
  };

  pairs.forEach(pair => {
    const text = (pair.userMsg.content || '').toLowerCase();
    if (text.match(/harga|biaya|price|pricing|bayar|paket|murah|kalkulator|estimasi|budget/)) {
      categories['Pricing'].push(pair);
    } else if (text.match(/fitur|layanan|service|bikin|buat|waktu|lama|proses|seo|desain|toko|blog|portofolio/)) {
      categories['Services'].push(pair);
    } else {
      categories['General'].push(pair);
    }
  });

  const [openFolder, setOpenFolder] = useState<string | null>('Pricing');

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mt-6">
      <div className="mb-6">
        <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
          <Folder size={20} className="text-purple-600" /> Kategori Topik (History Folders)
        </h2>
        <p className="text-sm text-slate-500">Menganalisis topik pembicaraan dari seluruh history percakapan AI.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(categories).map(([cat, catPairs]) => (
          <div key={cat} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col h-[400px]">
            <button 
              onClick={() => setOpenFolder(openFolder === cat ? null : cat)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-100 shrink-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200">
                  <Folder size={16} className="text-purple-500" />
                </div>
                <div className="text-left">
                  <span className="block font-semibold text-sm text-slate-800">{cat}</span>
                  <span className="block text-[10px] text-slate-500">{catPairs.length} Topik</span>
                </div>
              </div>
              <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${openFolder === cat ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`flex-1 p-3 space-y-3 overflow-y-auto custom-scrollbar transition-all duration-300 ${openFolder === cat ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
              {catPairs.length === 0 ? (
                <div className="text-center text-xs text-slate-400 py-10">Folder Kosong</div>
              ) : (
                catPairs.map((pair, i) => (
                  <div key={i} className="bg-white rounded-xl p-3.5 border border-slate-100 shadow-sm hover:shadow transition-shadow">
                    <div className="text-xs font-semibold text-slate-700 mb-2 line-clamp-2">{pair.userMsg.content}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-3 pl-2 border-l-2 border-purple-100 leading-relaxed">
                      {pair.aiMsgs[0]?.content || '...'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30'); // '7', '30', 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [tokenStats, setTokenStats] = useState({ current_tokens: 0, monthly_limit: 1000000 });

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

  // Threshold Checker for AI Tokens
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'system_config', 'ai_usage'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTokenStats({
          current_tokens: data.current_tokens || 0,
          monthly_limit: data.monthly_limit || 1000000
        });
        if (data.current_tokens && data.monthly_limit) {
          const ratio = data.current_tokens / data.monthly_limit;
          if (ratio >= 0.8) {
             toast.error(`Peringatan Kritis: Konsumsi token Groq API (${data.current_tokens.toLocaleString()}) melebihi 80% dari kuota bulanan!`, { id: 'token-warning', duration: 6000 });
          }
        }
      }
    });
    return unsub;
  }, []);
  
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
        <AnalyticsDashboard />
      )}
      {activeTab === 'ai_leads' && (
        <AILeadsScoringDashboard />
      )}
      {activeTab === 'chat' && (
        <div className="space-y-8">
          <div className="flex items-end justify-between border-b-2 border-black pb-4">
            <div>
              <h2 className="text-3xl font-mono font-black text-black uppercase tracking-tighter mb-2">Comm-Link Audit</h2>
              <p className="text-black font-mono text-sm">Intercepted neural chat logs from the Floating AI Assistant.</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
              <input 
                type="text"
                placeholder="SEARCH TRANSMISSIONS..."
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                className="pl-10 pr-4 py-2 bg-white border-2 border-black font-mono text-sm focus:outline-none focus:bg-slate-50 w-full sm:w-[300px] uppercase placeholder:text-slate-400"
              />
              <AnimatePresence>
                {showSuggestions && autocompleteSuggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 overflow-hidden"
                  >
                    {autocompleteSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm font-mono text-black hover:bg-black hover:text-white transition-colors uppercase border-b-2 border-black last:border-b-0"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="border-2 border-black bg-white flex flex-col">
            <div className="bg-black text-white px-4 py-3 border-b-2 border-black flex justify-between items-center">
              <h3 className="font-mono font-bold uppercase tracking-widest text-sm">Transmission Stream</h3>
              <div className="flex items-center gap-2">
                <MessageSquare size={14} />
                <span className="font-mono text-xs font-bold">{filteredLogs.length} LOGS INTERCEPTED</span>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-slate-50 min-h-[500px]">
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <Loader2 size={24} className="text-black animate-spin" />
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="text-center text-black font-mono py-10 uppercase font-bold text-sm">
                  No transmissions detected.
                </div>
              ) : (
                <div className="divide-y-2 divide-black">
                  {filteredLogs.map((log) => {
                    const sentiment = getSentiment(log.message || '');
                    return (
                      <div key={log.id} className="p-6 bg-white hover:bg-slate-100 transition-colors flex gap-6">
                        <div className="w-12 h-12 bg-black flex items-center justify-center text-white shrink-0">
                          <MessageSquare size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-mono font-bold text-black uppercase tracking-wider">Unidentified Visitor</p>
                            <div className="flex items-center gap-4">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 border-2 border-black ${sentiment === 'positive' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                {sentiment}
                              </span>
                              <span className="text-xs font-mono font-bold text-black flex items-center gap-1">
                                <Clock size={12} />
                                {log.timestamp ? new Date(log.timestamp.toDate()).toLocaleString('id-ID') : '00:00:00'}
                              </span>
                            </div>
                          </div>
                          <p className="text-base font-mono text-slate-800 leading-relaxed border-l-4 border-black pl-4">"{log.message}"</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="space-y-8">
          <div className="flex items-end justify-between border-b-2 border-black pb-4">
            <div>
              <h2 className="text-3xl font-mono font-black text-black uppercase tracking-tighter mb-2">Document Generator</h2>
              <p className="text-black font-mono text-sm">Automated Neural Synthesis of business contracts and proposals.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-2 bg-black text-white font-mono text-sm font-bold uppercase hover:bg-slate-800 transition-colors">
              <FileText size={16} /> GENERATE NEW
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="border-2 border-black bg-white p-6 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4">
                <Briefcase size={20} />
              </div>
              <h3 className="font-mono font-bold uppercase tracking-widest text-lg mb-2">Service Proposal</h3>
              <p className="text-sm font-mono text-slate-600 mb-6">Auto-generate client-specific digital agency proposals.</p>
              <button className="w-full py-2 border-2 border-black font-mono text-sm font-bold uppercase hover:bg-black hover:text-white transition-colors">
                SYNTHESIZE
              </button>
            </div>
            
            <div className="border-2 border-black bg-white p-6 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4">
                <Shield size={20} />
              </div>
              <h3 className="font-mono font-bold uppercase tracking-widest text-lg mb-2">NDA Contract</h3>
              <p className="text-sm font-mono text-slate-600 mb-6">Standard Non-Disclosure Agreement for new contractors.</p>
              <button className="w-full py-2 border-2 border-black font-mono text-sm font-bold uppercase hover:bg-black hover:text-white transition-colors">
                SYNTHESIZE
              </button>
            </div>

            <div className="border-2 border-black bg-white p-6 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4">
                <Activity size={20} />
              </div>
              <h3 className="font-mono font-bold uppercase tracking-widest text-lg mb-2">SLA Agreement</h3>
              <p className="text-sm font-mono text-slate-600 mb-6">Service Level Agreement for enterprise software clients.</p>
              <button className="w-full py-2 border-2 border-black font-mono text-sm font-bold uppercase hover:bg-black hover:text-white transition-colors">
                SYNTHESIZE
              </button>
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
      {activeTab === 'ai_training' && (
        <AITrainingTab />
      )}
{activeTab === 'seo_manager' && (
        <SEOManager />
      )}

      {activeTab === 'business_config' && (
        <BusinessConfigManager />
      )}
      {activeTab === 'content' && (
        <PageManager />
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
        toast.error(data.error || 'Audit Failed');
      }
    } catch (e) {
      toast.error('Network Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-4 border-black bg-white flex flex-col min-h-[500px]">
      <div className="bg-black text-white px-8 py-6 border-b-4 border-black flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-mono font-black uppercase tracking-tighter flex items-center gap-3">
            <Shield size={28} strokeWidth={3} /> SLA Node Health
          </h2>
          <p className="text-sm font-mono mt-2 tracking-widest text-slate-400">Diagnostic API for Service Level Agreements</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col border-b-4 lg:border-b-0 lg:border-r-4 border-black">
          <div className="p-4 border-b-4 border-black bg-slate-100">
            <span className="font-mono font-bold text-sm uppercase">Input Stream</span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 w-full bg-white p-6 font-mono text-sm focus:outline-none resize-none placeholder:text-slate-300"
            placeholder="PASTE RAW NODE DATA HERE..."
          ></textarea>
          <button
            onClick={handleAudit}
            disabled={loading || !content}
            className="w-full py-4 bg-black text-white font-mono font-bold uppercase tracking-widest hover:bg-slate-800 disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
            {loading ? 'ANALYZING...' : 'INITIATE DIAGNOSTIC'}
          </button>
        </div>
        
        <div className="flex flex-col bg-slate-50">
          <div className="p-4 border-b-4 border-black bg-slate-200">
            <span className="font-mono font-bold text-sm uppercase">Diagnostic Output</span>
          </div>
          <div className="flex-1 p-6 overflow-auto">
            {result ? (
              <div className="font-mono text-sm prose prose-sm prose-slate max-w-none">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 font-mono text-sm uppercase text-center">
                Awaiting input stream...
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
          setSeoData(docSnap.data() as any);
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
          <Search size={20} className="text-purple-600" /> SEO Route Manager
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
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${selectedRoute === r.path ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {r.name}
              <div className="text-xs text-slate-400 font-normal mt-0.5">{r.path}</div>
            </button>
          ))}
        </div>
        <div className="flex-1 flex flex-col max-w-2xl">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 size={24} className="text-purple-600 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Meta Title</label>
                <input 
                  type="text"
                  value={seoData.title}
                  onChange={e => setSeoData({...seoData, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="Misal: Jasa Web Profesional | Nama Bisnis"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Meta Description</label>
                <textarea 
                  value={seoData.description}
                  onChange={e => setSeoData({...seoData, description: e.target.value})}
                  className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                  placeholder="Deskripsi singkat yang akan muncul di Google pencarian..."
                />
              </div>
              <div className="pt-4">
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
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
            <UsersIcon size={20} className="text-purple-600" /> User Management
          </h2>
          <p className="text-sm text-slate-500">
            Kelola peran pengguna (Admin/User).
          </p>
        </div>
        <button
          onClick={makeMeAdmin}
          className="px-4 py-2 bg-purple-50 text-purple-700 text-sm font-medium rounded-xl hover:bg-purple-100 transition-colors"
        >
          Darurat: Jadikan Saya Admin
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={24} className="text-purple-600 animate-spin" />
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
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                      {u.role || 'user'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select 
                      value={u.role || 'user'}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-white border border-slate-200 text-sm rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500"
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




const FeedbackTableRow = ({ session, msg, index, userCtx, timestamp }: any) => {
  const [categorizing, setCategorizing] = useState(false);
  const [category, setCategory] = useState(msg.category || "");

  const handleCategorize = async () => {
    if (categorizing || category) return;
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

  useEffect(() => {
    // Automated sentiment analysis trigger when a 'thumbs down' is recorded
    if (msg.feedback === 'down' && !category && !categorizing) {
      handleCategorize();
    }
  }, [msg.feedback, category]);

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
          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${msg.feedback === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
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


const TokenUsageMonitor = () => {
  const [tokenCount, setTokenCount] = useState(0);
  // Using a smaller quota for demonstration so it triggers easily if there's history
  const QUOTA = 5000; 
  const [warned, setWarned] = useState(false);
  
  useEffect(() => {
    const q = query(collection(db, 'ai_chat_sessions'));
    const unsub = onSnapshot(q, (snapshot) => {
      let charCount = 0;
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.messages) {
          data.messages.forEach((m: any) => {
             charCount += (m.content || '').length;
          });
        }
      });
      // 1 token ~= 4 chars roughly
      const estimatedTokens = Math.floor(charCount / 4);
      setTokenCount(estimatedTokens);
      
      if (estimatedTokens > QUOTA * 0.8 && !warned) {
         toast.error('Peringatan: Penggunaan LLM Token mencapai >80% batas bulanan!', {
           duration: 8000,
           icon: '⚠️'
         });
         setWarned(true);
      }
    });
    return () => unsub();
  }, [warned]);

  const percentage = Math.min((tokenCount / QUOTA) * 100, 100).toFixed(1);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-6">
       <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
         <Zap size={24} />
       </div>
       <div className="flex-1">
         <div className="flex justify-between items-end mb-2">
           <div>
             <h3 className="font-semibold text-slate-800">Token Monitor (Real-time)</h3>
             <p className="text-xs text-slate-500">Estimasi penggunaan API Gemini (Bulan Ini)</p>
           </div>
           <div className="text-right">
             <span className={`text-lg font-bold ${tokenCount > QUOTA * 0.8 ? 'text-red-600' : 'text-slate-800'}`}>
               {tokenCount.toLocaleString()}
             </span>
             <span className="text-xs text-slate-500 font-medium"> / {QUOTA.toLocaleString()}</span>
           </div>
         </div>
         <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
           <div 
             className={`h-full rounded-full transition-all duration-1000 ${tokenCount > QUOTA * 0.8 ? 'bg-red-500' : tokenCount > QUOTA * 0.5 ? 'bg-amber-400' : 'bg-emerald-500'}`}
             style={{ width: `${percentage}%` }}
           ></div>
         </div>
       </div>
    </div>
  );
};

function AITrainingTab() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterFeedback, setFilterFeedback] = useState<'all' | 'down' | 'up'>('all');
  
  // Stats
  const [totalUpvotes, setTotalUpvotes] = useState(0);
  const [totalDownvotes, setTotalDownvotes] = useState(0);
  
  // Knowledge Base
  const [knowledge, setKnowledge] = useState<any[]>([]);
  const [newContext, setNewContext] = useState('');
  
  // Real-time token stats from firestore (mocked fallback if missing)
    // @ts-ignore
  const exportToCSV = () => {
    const rows = [["Session ID", "Waktu", "Konteks User", "Jawaban AI", "Rating", "Kategori"]];
    sessions.forEach(session => {
      const messages = (session as any).messages || [];
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].feedback) {
                          if (filterFeedback === 'down' && messages[i].feedback !== 'down') continue;
                          if (filterFeedback === 'up' && messages[i].feedback !== 'up') continue;
          let userCtx = "N/A";
          if (i > 0 && messages[i-1].role === 'user') {
            userCtx = messages[i-1].content;
          }
          const timestamp = session.lastUpdated?.toDate ? session.lastUpdated.toDate().toLocaleString('id-ID') : '-';
          rows.push([
            session.id,
            timestamp,
            '"' + userCtx.replace(/"/g, '""') + '"',
            '"' + messages[i].content.replace(/"/g, '""') + '"',
            messages[i].feedback,
            messages[i].category || 'General'
          ]);
        }
      }
    });
    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "feedback_logs.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const [tokenMetrics, setTokenMetrics] = useState({ limit: 1000000, used: 345020 });
  const tokenPercentage = (tokenMetrics.used / tokenMetrics.limit) * 100;

  useEffect(() => {
    if (tokenPercentage >= 80) {
      toast.error(`Peringatan: Kuota AI mencapai ${tokenPercentage.toFixed(1)}%!`, {
        duration: 5000,
        position: 'top-right',
      });
    }
  }, [tokenPercentage >= 80]); // Only re-run if it crosses the 80% threshold

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
          data.forEach((s: any) => {
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
      <TokenUsageMonitor />
      {tokenPercentage >= 80 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3">
          <div className="text-red-500 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-red-800">Peringatan Kuota Token AI</h3>
            <p className="text-sm text-red-700 mt-1">Konsumsi token AI Anda telah mencapai <strong>{tokenPercentage.toFixed(1)}%</strong> dari batas bulanan. Segera tingkatkan limit atau perbarui paket Anda untuk mencegah gangguan layanan chat.</p>
          </div>
        </div>
      )}
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
                  className={`h-full rounded-full transition-all duration-500 ${tokenPercentage > 90 ? 'bg-red-500' : tokenPercentage > 75 ? 'bg-orange-500' : 'bg-purple-600'}`} 
                  style={{ width: `${Math.min(100, tokenPercentage)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Summary & LLM Insights Dashboard */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col">
           <h2 className="text-xl font-display font-medium text-slate-900 flex items-center justify-between gap-2 mb-6">
             <div className="flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
               AI Feedback Insights
             </div>
          </h2>
          
          <div className="flex items-center gap-4 mb-6">
             <div className="flex-1 bg-green-50 border border-green-100 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">👍</div>
                <div className="text-2xl font-bold text-green-700">{totalUpvotes}</div>
                <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1">Positif</div>
             </div>
             <div className="flex-1 bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">👎</div>
                <div className="text-2xl font-bold text-red-700">{totalDownvotes}</div>
                <div className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-1">Negatif</div>
             </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex-1">
             <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                Categorized Pain Points (Auto-Parse)
             </h3>
             <div className="space-y-3">
               {(() => {
                 const counts: Record<string, number> = {};
                 let totalNeg = 0;
                 sessions.forEach(s => {
                   (s.messages || []).forEach((m: any) => {
                     if (m.feedback === 'down') {
                        const cat = m.category || "Uncategorized";
                        counts[cat] = (counts[cat] || 0) + 1;
                        totalNeg++;
                     }
                   });
                 });
                 const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
                 if (entries.length === 0) return <div className="text-xs text-slate-400 italic">Belum ada data pain point.</div>;

                 return entries.map(([cat, count]) => (
                   <div key={cat} className="flex items-center gap-3">
                     <div className="w-24 text-xs font-medium text-slate-600 truncate" title={cat}>{cat}</div>
                     <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-red-400 rounded-full" style={{ width: `${(count / Math.max(totalNeg, 1)) * 100}%` }}></div>
                     </div>
                     <div className="w-8 text-right text-xs font-bold text-slate-500">{count}</div>
                   </div>
                 ));
               })()}
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
            <button type="submit" disabled={!newContext.trim()} className="w-full bg-slate-900 text-white font-medium py-2 rounded-xl text-sm disabled:opacity-50 transition-colors hover:bg-slate-800">
               + Tambahkan Konteks
            </button>
          </form>

          <div className="flex-1 overflow-y-auto space-y-3">
             {knowledge.length === 0 && <div className="text-center text-sm text-slate-400 py-4">Belum ada dataset kustom.</div>}
             {knowledge.map(k => (
               <div key={k.id} className={`p-3 border rounded-xl text-sm ${k.active ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                 <p className="text-slate-700 mb-3">{k.content}</p>
                 <div className="flex justify-between items-center">
                   <button onClick={() => toggleContextActive(k.id, k.active)} className={`text-xs font-medium ${k.active ? 'text-green-600' : 'text-slate-500'}`}>
                     {k.active ? 'Status: Aktif' : 'Status: Nonaktif'}
                   </button>
                   <button onClick={() => deleteContext(k.id)} className="text-xs text-red-500 hover:underline font-medium">Hapus</button>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* AI Training & Feedback Log Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
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
          </div>
          <p className="text-sm text-slate-500 mb-4">Tinjau rekam data user feedback secara detail pada jawaban AI.</p>
          <div className="flex items-center gap-2 mb-6">
            <button onClick={() => setFilterFeedback('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterFeedback === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Semua Feedback</button>
            <button onClick={() => setFilterFeedback('down')} className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${filterFeedback === 'down' ? 'bg-red-500 text-white' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>👎 Negatif (Thumbs Down)</button>
            <button onClick={() => setFilterFeedback('up')} className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${filterFeedback === 'up' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>👍 Positif (Thumbs Up)</button>
          </div>
          {loading ? (
            <div className="flex-1 flex items-center justify-center">Loading...</div>
          ) : (
            <div className="flex-1 overflow-x-auto rounded-2xl border border-slate-200 custom-scrollbar max-h-[500px]">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="sticky top-0 bg-slate-50 shadow-sm z-10">
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Waktu/Sesi</th>
                    <th className="px-4 py-3 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Konteks User</th>
                    <th className="px-4 py-3 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Jawaban AI</th>
                    <th className="px-4 py-3 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase text-center">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {sessions.flatMap(session => {
                    const messages = session.messages || [];
                    const rows = [];
                    for (let i = 0; i < messages.length; i++) {
                       if (messages[i].feedback) {
                          if (filterFeedback === 'down' && messages[i].feedback !== 'down') continue;
                          if (filterFeedback === 'up' && messages[i].feedback !== 'up') continue;
                          let userCtx = "N/A";
                          if (i > 0 && messages[i-1].role === 'user') {
                             userCtx = messages[i-1].content;
                          }
                          const timestamp = session.lastUpdated?.toDate ? session.lastUpdated.toDate().toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-';
                          
                          rows.push(
                            <FeedbackTableRow 
                               key={`${session.id}-${i}`}
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
                  })}
                  {sessions.every(s => !((s as any).messages || []).some((m: any) => m.feedback)) && (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-sm text-slate-500">Belum ada feedback yang terekam.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <AdminChatHistoryFolders sessions={sessions} />
    </div>
  );
}


function AnalyticsDashboard() {
  const [liveVisitors, setLiveVisitors] = useState<any[]>([]);
  const [prunableCount, setPrunableCount] = useState<number | null>(null);
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

    // 4. Prunable Messages Count
    const fetchPrunable = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const res = await fetch('/api/admin/prunable-count', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setPrunableCount(data.count || 0);
      } catch(e) {
        console.error("Prunable count error", e);
      }
    };
    fetchPrunable();

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
}


function AILeadsScoringDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmModalLead, setConfirmModalLead] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, 'ai_leads'), orderBy('createdAt', 'desc')), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeads(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleConvertToClient = async (lead: any) => {
    try {
      const workspaceId = `WS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const passcode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const wsRef = doc(db, 'workspaces', workspaceId);
      await setDoc(wsRef, {
         passcode,
         createdAt: serverTimestamp(),
         clientName: "New VIP Client",
         leadSourceId: lead.id,
         status: 'active'
      });
      
      const messagesRef = collection(db, 'workspaces', workspaceId, 'chat_messages');
      await setDoc(doc(messagesRef), {
         sender: 'admin',
         text: 'Welcome to your VIP Workspace! Our Principal Engineer will be with you shortly.',
         timestamp: serverTimestamp(),
         read: false
      });
      
      toast.success(`Converted! Link: /client?ws=${workspaceId} | Passcode: ${passcode}`, { duration: 10000 });
      // We could also update the lead to mark it converted
      await updateDoc(doc(db, 'ai_leads', lead.id), { converted: true });
      setConfirmModalLead(null);
    } catch(e) {
       toast.error("Failed to convert lead.");
    }
  };

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
                <th className="px-4 py-3 font-mono text-xs font-bold uppercase border-b-2 border-black text-black">Action</th>
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
                  <td className="px-4 py-3 font-mono text-xs text-black">
                    <button 
                       onClick={() => setConfirmModalLead(lead)}
                       className="px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
                    >
                      Convert to Client
                    </button>
                  </td>
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

      <AnimatePresence>
        {confirmModalLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setConfirmModalLead(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-mono font-black text-black uppercase tracking-tighter mb-4 border-b-2 border-black pb-2">Confirm Conversion</h3>
              <p className="font-mono text-sm text-slate-700 mb-6 leading-relaxed">
                Are you sure you want to convert lead <strong className="text-black">{confirmModalLead.sessionId}</strong> to a client?
                This will automatically provision a new VIP workspace, generate a secure passcode, and create the initial welcome messages.
              </p>
              <div className="flex items-center gap-4 justify-end">
                <button
                  onClick={() => setConfirmModalLead(null)}
                  className="px-4 py-2 border-2 border-black font-mono text-sm font-bold uppercase hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleConvertToClient(confirmModalLead)}
                  className="px-4 py-2 bg-black text-white font-mono text-sm font-bold uppercase hover:bg-slate-800 transition-colors"
                >
                  Confirm & Provision
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthGuard fallback={<AdminLogin />}>
      <MetaTags title="Admin Area | CHESTAADOTCOM" description="Secure Admin Dashboard" />
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
            <Shield size={20} className="text-purple-600" /> System Audit Log
          </h2>
          <p className="text-sm text-slate-500">
            Read-only log of significant admin actions.
          </p>
        </div>
      </div>
      
      <div className="flex-1 overflow-x-auto rounded-2xl border border-slate-200 custom-scrollbar">
        {loading ? (
          <div className="h-full flex items-center justify-center min-h-[300px]">
            <Loader2 size={24} className="text-purple-600 animate-spin" />
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
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
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



function PageManager() {
  const [pages, setPages] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('pricing_config');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Fetch all editable page contents
    const q = query(collection(db, 'page_content'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPages(data);
      setLoading(false);
      
      const current = data.find(d => d.id === selectedPage);
      if (current) {
        // Only set content if we aren't currently editing (or just on initial load)
        // Here we just initialize if it exists
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    const current = pages.find(p => p.id === selectedPage);
    if (current) {
      setContent(current.content || '');
    } else {
      if (selectedPage === 'pricing_config') {
         setContent(`Data harga layanan yang FIX dan WAJIB kamu ikuti (PENTING: Selalu tekankan bahwa harga kita SANGAT TERJANGKAU dan mulai dari Rp 2.500.000):
- Paket Basic / Landing Page: Mulai dari Rp 2.500.000 (Cocok untuk profil bisnis awal yang elegan dan responsif).
- Paket UMKM Starter: Mulai dari Rp 5.000.000 (Cocok untuk company profile, SEO Basic).
- E-Commerce Web: Mulai dari Rp 10.000.000 (Payment gateway, katalog produk).
- Custom Website (Enterprise/Premium) & Agentic AI: Mulai dari Rp 15.000.000 (Tergantung kompleksitas fitur).`);
      } else {
         setContent('');
      }
    }
  }, [selectedPage, pages]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'page_content', selectedPage), {
        content,
        updatedAt: serverTimestamp()
      }, { merge: true });
      toast.success('Konten berhasil disimpan');
    } catch (error) {
      console.error(error);
      toast.error('Gagal menyimpan konten');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[600px] flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
            <PenTool size={20} className="text-purple-600" /> Page & Content Manager
          </h2>
          <p className="text-sm text-slate-500">
            Atur dan perbarui teks di setiap halaman dan konfigurasi AI Pricing.
          </p>
        </div>
        <select 
          value={selectedPage} 
          onChange={(e) => setSelectedPage(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-purple-500"
        >
          <option value="pricing_config">Pricing & AI Config</option>
          <option value="home_hero">Homepage Hero Text</option>
          <option value="about_company">About Us Details</option>
          <option value="contact_info">Contact Information</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">Markdown / Text Input</label>
          <textarea 
            value={content}
            onChange={e => setContent(e.target.value)}
            className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono text-sm resize-none custom-scrollbar"
            placeholder="Tulis detail/konten di sini..."
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">Live Preview (Markdown)</label>
          <div className="flex-1 w-full p-6 bg-white border border-slate-200 rounded-2xl overflow-y-auto prose prose-slate max-w-none custom-scrollbar">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
         <button 
           onClick={handleSave}
           disabled={saving}
           className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-md flex items-center gap-2"
         >
            {saving ? <Loader2 size={16} className="animate-spin" /> : null}
            Simpan Konten
         </button>
      </div>
    </div>
  );
}


function BusinessConfigManager() {
  const [config, setConfig] = useState({
    starting_price: 2500000,
    umkm_price: 5000000,
    ecommerce_price: 10000000,
    enterprise_price: 15000000,
    service_base_rate: 540000
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'system_config', 'business_variables'), (docSnap) => {
      if (docSnap.exists()) {
        setConfig(prev => ({ ...prev, ...docSnap.data() }));
      }
    });
    return unsub;
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'system_config', 'business_variables'), {
        ...config,
        updatedAt: serverTimestamp()
      }, { merge: true });
      toast.success('Business configuration updated!');
    } catch (error) {
      console.error(error);
      toast.error('Gagal menyimpan konfigurasi bisnis');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  return (
    <div className="bg-white p-8 border-4 border-black flex flex-col min-h-[500px]">
      <div className="mb-8 border-b-4 border-black pb-6">
        <h2 className="text-3xl font-display font-black tracking-tighter uppercase text-black flex items-center gap-3">
          <Briefcase size={28} strokeWidth={3} /> Business Configuration
        </h2>
        <p className="text-base font-mono font-bold text-slate-600 mt-2 uppercase tracking-tight">
          SYS.VARS &gt; AI_SOURCE_OF_TRUTH
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-mono font-bold tracking-widest uppercase text-black">Starting Price / Landing Page (Rp)</label>
          <input type="number" name="starting_price" value={config.starting_price} onChange={handleChange} className="px-5 py-4 bg-white border-2 border-black focus:outline-none focus:ring-4 focus:ring-black/20 font-mono text-lg font-bold" />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-mono font-bold tracking-widest uppercase text-black">UMKM Starter Price (Rp)</label>
          <input type="number" name="umkm_price" value={config.umkm_price} onChange={handleChange} className="px-5 py-4 bg-white border-2 border-black focus:outline-none focus:ring-4 focus:ring-black/20 font-mono text-lg font-bold" />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-mono font-bold tracking-widest uppercase text-black">E-Commerce Base Price (Rp)</label>
          <input type="number" name="ecommerce_price" value={config.ecommerce_price} onChange={handleChange} className="px-5 py-4 bg-white border-2 border-black focus:outline-none focus:ring-4 focus:ring-black/20 font-mono text-lg font-bold" />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-mono font-bold tracking-widest uppercase text-black">Enterprise / Custom Price (Rp)</label>
          <input type="number" name="enterprise_price" value={config.enterprise_price} onChange={handleChange} className="px-5 py-4 bg-white border-2 border-black focus:outline-none focus:ring-4 focus:ring-black/20 font-mono text-lg font-bold" />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-mono font-bold tracking-widest uppercase text-black">Service Calculator Base Rate (Rp)</label>
          <input type="number" name="service_base_rate" value={config.service_base_rate} onChange={handleChange} className="px-5 py-4 bg-white border-2 border-black focus:outline-none focus:ring-4 focus:ring-black/20 font-mono text-lg font-bold" />
        </div>
      </div>

      <div className="flex justify-end pt-6 mt-auto">
        <button 
           onClick={handleSave}
           disabled={saving}
           className="bg-black hover:bg-transparent hover:text-black text-white border-4 border-black font-mono font-bold text-lg uppercase tracking-widest py-4 px-10 transition-all flex items-center gap-3 disabled:opacity-50"
         >
            {saving ? <Loader2 size={20} className="animate-spin" /> : null}
            UPDATE_SYS_VARS
         </button>
      </div>
    </div>
  );
}
