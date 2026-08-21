import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Home, Briefcase, FileText, Phone, Zap, ChevronRight, LayoutGrid, Moon, BookOpen, Sparkles, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ALL_ARTICLES } from '../../data/blogData';
import { PROJECTS } from '../../data/projects';

type ActionItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  category: string;
  path?: string;
  action?: () => void;
  shortcut?: string;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  const STATIC_ACTIONS: ActionItem[] = [
    { id: 'theme', title: 'Toggle Dark/Light Mode', subtitle: 'Ubah tema tampilan', icon: Moon, action: toggleTheme, category: 'General', shortcut: 't' },
    { id: 'home', title: 'Beranda', subtitle: 'Kembali ke halaman utama', icon: Home, path: '/', category: 'Pages', shortcut: 'h' },
    { id: 'services', title: 'Layanan', subtitle: 'Jasa pembuatan website & AI', icon: Zap, path: '/services', category: 'Pages', shortcut: 's' },
    { id: 'portfolio', title: 'Portofolio', subtitle: 'Lihat hasil karya kami', icon: Briefcase, path: '/portfolio', category: 'Pages', shortcut: 'p' },
    { id: 'about', title: 'Tentang Kami', subtitle: 'Profil CHESTADOTCOM', icon: LayoutGrid, path: '/about', category: 'Pages', shortcut: 'a' },
    { id: 'blog', title: 'Blog', subtitle: 'Artikel seputar bisnis & tech', icon: FileText, path: '/blog', category: 'Pages', shortcut: 'b' },
    { id: 'contact', title: 'Hubungi Kami', subtitle: 'Konsultasi gratis sekarang', icon: Phone, action: () => window.open('https://wa.me/6282125447232', '_blank'), category: 'General', shortcut: 'c' }
  ];

  const SUGGESTED_ACTIONS: ActionItem[] = [
    { 
      id: 'ask-ai', 
      title: 'Tanya AI Assistant', 
      subtitle: 'Konsultasi cerdas dengan AI Agent kami', 
      icon: Sparkles, 
      action: () => window.dispatchEvent(new CustomEvent('open-ai-chat', { detail: { message: 'Halo, saya ingin konsultasi mengenai layanan dari chestaadotcom.' } })), 
      category: 'Suggested' 
    },
    { id: 'suggest-services', title: 'Layanan Premium', subtitle: 'Eksplorasi layanan website & AI', icon: Zap, path: '/services', category: 'Suggested', shortcut: 's' },
    { id: 'suggest-portfolio', title: 'Showcase Portofolio', subtitle: 'Lihat hasil karya premium kami', icon: Briefcase, path: '/portfolio', category: 'Suggested', shortcut: 'p' },
    { id: 'suggest-contact', title: 'Hubungi Tim Sales', subtitle: 'Diskusi langsung via WhatsApp', icon: MessageCircle, action: () => window.open('https://wa.me/6282125447232', '_blank'), category: 'Suggested', shortcut: 'c' }
  ];

  useEffect(() => {
    const handleOpenCommandPalette = () => setIsOpen(true);
    window.addEventListener('open-command-palette', handleOpenCommandPalette);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      // Ignore single key shortcuts if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Handle global shortcuts
      const key = e.key.toLowerCase();
      const shortcutAction = STATIC_ACTIONS.find(a => a.shortcut === key);
      
      if (shortcutAction && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setIsOpen(false);
        if (shortcutAction.path) {
          navigate(shortcutAction.path);
        } else if (shortcutAction.action) {
          shortcutAction.action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenCommandPalette);
    };
  }, [navigate]); // Added navigate to deps since we use it

  const ARTICLE_ACTIONS: ActionItem[] = ALL_ARTICLES.map(art => ({
    id: `article-${art.slug}`,
    title: art.title,
    subtitle: `Insight • ${art.cat}`,
    icon: BookOpen,
    path: `/blog?read=${art.slug}`,
    category: 'Articles'
  }));

  const PROJECT_ACTIONS: ActionItem[] = PROJECTS.map(proj => ({
    id: `project-${proj.id}`,
    title: proj.title,
    subtitle: `Portofolio • ${proj.category}`,
    icon: Briefcase,
    path: `/portfolio/${proj.id}`,
    category: 'Projects'
  }));

  const SERVICE_ACTIONS: ActionItem[] = [
    { id: 'srv-web', title: 'Web Development', subtitle: 'Layanan Pembuatan Website Premium', icon: Zap, path: '/services#web', category: 'Services' },
    { id: 'srv-ai', title: 'AI Solutions', subtitle: 'Integrasi AI & Automasi Bisnis', icon: Zap, path: '/services#ai', category: 'Services' },
    { id: 'srv-seo', title: 'SEO Optimization', subtitle: 'Optimasi Mesin Pencari Google', icon: Zap, path: '/services#seo', category: 'Services' }
  ];

  const ALL_ACTIONS = [...STATIC_ACTIONS, ...SERVICE_ACTIONS, ...PROJECT_ACTIONS, ...ARTICLE_ACTIONS];

  const displayedActions = searchQuery.trim() === ''
    ? SUGGESTED_ACTIONS
    : ALL_ACTIONS.filter(action => 
        action.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        action.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleAction = (action: typeof ALL_ACTIONS[0]) => {
    setIsOpen(false);
    if (action.path) {
      navigate(action.path);
    } else if (action.action) {
      action.action();
    }
  };

  const groupedActions = displayedActions.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = [];
    acc[curr.category].push(curr);
    return acc;
  }, {} as Record<string, typeof ALL_ACTIONS>);

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
            className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 z-[101] overflow-hidden flex flex-col max-h-[70vh]"
          >
            <div className="flex items-center px-4 py-4 border-b border-slate-100">
              <Search size={18} className="text-gray-400 mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Cari halaman, layanan, atau artikel blog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-gray-400 font-sans text-sm"
              />
              <span className="text-[10px] font-mono text-gray-400 bg-slate-100 px-2 py-1 rounded">ESC</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {displayedActions.length > 0 ? (
                Object.entries(groupedActions).map(([category, actions], catIdx) => (
                  <motion.div 
                    key={category} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: catIdx * 0.05 }}
                    className="mb-4 last:mb-0"
                  >
                    <div className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 mt-2">
                      {category}
                    </div>
                    {actions.map((action, actIdx) => (
                      <motion.button
                        key={action.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: (catIdx * 0.05) + (actIdx * 0.03) }}
                        onClick={() => handleAction(action)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${action.icon === Sparkles ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-[#4f46e5]'}`}>
                            <action.icon size={18} />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-sm font-bold text-slate-900 truncate group-hover:text-[#4f46e5] transition-colors">{action.title}</div>
                            <div className="text-xs text-slate-500 truncate">{action.subtitle}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-3">
                          {action.shortcut && (
                            <kbd className="hidden sm:inline-flex items-center justify-center h-5 px-1.5 text-[9px] font-mono font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded group-hover:border-[#4f46e5]/30 group-hover:text-[#4f46e5] transition-colors">
                              {action.shortcut.toUpperCase()}
                            </kbd>
                          )}
                          <ChevronRight size={16} className="text-gray-300 group-hover:text-[#4f46e5] transition-colors" />
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center text-slate-500 text-sm"
                >
                  Tidak ada hasil yang ditemukan untuk "{searchQuery}"
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
