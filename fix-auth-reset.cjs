const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

// Update imports
code = code.replace(
  "import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';",
  "import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';"
);

// We need to insert a handleResetPassword function and UI inside AdminLogin
const oldAdminLoginStart = "function AdminLogin() {";
const oldAdminLoginContent = code.substring(code.indexOf(oldAdminLoginStart), code.indexOf('function AdminDashboard() {'));

const newAdminLoginContent = `function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const isSetup = searchParams.get('setup') === 'true';

  const handleResetPassword = async () => {
    if (!email) {
      setErrorMsg('Harap masukkan alamat email Anda di kolom email untuk mereset password.');
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
      setErrorMsg('Gagal mereset: ' + msg);
      toast.error('Gagal mengirim email reset');
    } finally {
      setResetting(false);
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
          toast.success('Admin account created!');
        } catch (err: any) {
          if (err.code === 'auth/email-already-in-use') {
            setErrorMsg('Email ini sudah terdaftar. Sistem mencoba masuk otomatis...');
            try {
              await signInWithEmailAndPassword(auth, email, password);
              toast.success('Login berhasil');
            } catch (signInErr: any) {
              setErrorMsg('Email sudah terdaftar, tapi password SALAH. Jika lupa, klik "Lupa Password" di bawah.');
            }
          } else if (err.code === 'auth/weak-password') {
            setErrorMsg('Password terlalu lemah. Harap gunakan setidaknya 6 karakter.');
          } else {
            throw err;
          }
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Login berhasil');
      }
    } catch (error: any) {
      let msg = error.message || 'Autentikasi gagal';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        msg = 'Email atau password yang Anda masukkan salah. Jika lupa, klik "Lupa Password" di bawah.';
      } else if (error.code === 'auth/user-not-found') {
        msg = 'Akun tidak ditemukan. Harap pastikan email sudah benar.';
      } else if (error.code === 'auth/too-many-requests') {
        msg = 'Terlalu banyak percobaan gagal. Silakan coba lagi nanti atau reset password.';
      }
      setErrorMsg(msg);
      toast.error(msg);
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

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-start gap-3">
            <Sparkles className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
            <p className="text-sm text-red-700 font-medium">{errorMsg}</p>
          </div>
        )}

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
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="••••••••"
              required
            />
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

`;

code = code.replace(oldAdminLoginContent, newAdminLoginContent);
fs.writeFileSync('src/pages/AdminPage.tsx', code);
