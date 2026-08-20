import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Home, Briefcase, FileText, Phone, Zap, ChevronRight, LayoutGrid, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    if (isDark) {
      document.body.style.backgroundColor = '#0a0a0a';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#111827';
    }
  };

  const ACTIONS = [
    { id: 'theme', title: 'Toggle Dark/Light Mode', subtitle: 'Ubah tema tampilan', icon: Moon, action: toggleTheme },
    { id: 'home', title: 'Beranda', subtitle: 'Kembali ke halaman utama', icon: Home, path: '/' },
    { id: 'services', title: 'Layanan', subtitle: 'Jasa pembuatan website & AI', icon: Zap, path: '/services' },
    { id: 'portfolio', title: 'Portofolio', subtitle: 'Lihat hasil karya kami', icon: Briefcase, path: '/portfolio' },
    { id: 'about', title: 'Tentang Kami', subtitle: 'Profil CHESTADOTCOM', icon: LayoutGrid, path: '/about' },
    { id: 'blog', title: 'Blog', subtitle: 'Artikel seputar bisnis & tech', icon: FileText, path: '/blog' },
    { id: 'contact', title: 'Hubungi Kami', subtitle: 'Konsultasi gratis sekarang', icon: Phone, action: () => window.open('https://wa.me/6282125447232', '_blank') }
  ];

  const filteredActions = ACTIONS.filter(action => 
    action.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    action.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (action: typeof ACTIONS[0]) => {
    setIsOpen(false);
    if (action.path) {
      navigate(action.path);
    } else if (action.action) {
      action.action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 z-[101] overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-slate-100">
              <Search size={18} className="text-gray-400 mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Cari halaman atau layanan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-gray-400 font-sans text-sm"
              />
              <span className="text-[10px] font-mono text-gray-400 bg-slate-100 px-2 py-1 rounded">ESC</span>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredActions.length > 0 ? (
                filteredActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <action.icon size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{action.title}</div>
                        <div className="text-xs text-slate-500">{action.subtitle}</div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500 text-sm">
                  Tidak ada hasil yang ditemukan untuk "{searchQuery}"
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
