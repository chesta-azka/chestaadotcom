const fs = require('fs');
const path = 'src/pages/AdminPage.tsx';
let code = fs.readFileSync(path, 'utf-8');

const importReplacement = `import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';\nimport { useSearchParams } from 'react-router-dom';`;
code = code.replace(`import { signInWithEmailAndPassword, signOut } from 'firebase/auth';`, importReplacement);

const adminLoginReplacement = `function AdminLogin() {
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
}`;

code = code.replace(/function AdminLogin\(\) \{[\s\S]*?return \([\s\S]*?  \);\n}/, adminLoginReplacement);

fs.writeFileSync(path, code);
