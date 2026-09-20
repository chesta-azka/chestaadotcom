import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Menu, X, Home, Sparkles, Briefcase, GitFork, User, BookOpen, ArrowRight, Search, Mail, Phone, ChevronRight, ChevronDown, MapPin, GraduationCap, CheckSquare, Code2, Bot, ShoppingBag, Target, FolderGit2, LineChart, UserCircle2, Terminal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LocalSEOBanner from '../molecules/LocalSEOBanner.tsx';

interface NavItem {
  name: string;
  href?: string;
  icon?: any;
  subtitle?: string;
  children?: { name: string; href: string; icon: any; subtitle: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '/', icon: Home, subtitle: 'Beranda' },
  {
    name: 'Layanan',
    icon: Code2,
    children: [
      { name: 'Web Dev Next.js', href: '/layanan/web-development-nextjs', icon: Code2, subtitle: 'Website Super Cepat & Enterprise' },
      { name: 'AI & Chatbot', href: '/layanan/ai-integration', icon: Bot, subtitle: 'Otomatisasi Google Gemini 24/7' },
      { name: 'E-Commerce Automation', href: '/layanan/ecommerce-automation', icon: ShoppingBag, subtitle: 'Toko Online & Checkout Kilat' },
      { name: 'Landing Page Konversi', href: '/layanan/landing-page', icon: Target, subtitle: 'Melejitkan Omset Iklan Anda' },
    ]
  },
  {
    name: 'Showcase',
    icon: FolderGit2,
    children: [
      { name: 'Portfolio', href: '/portfolio', icon: FolderGit2, subtitle: 'Galeri & Hasil Nyata' },
      { name: 'Case Studies', href: '/case-studies', icon: LineChart, subtitle: 'Analisis Mendalam' },
      { name: 'About', href: '/about', icon: UserCircle2, subtitle: 'Profil Founder & Visi' },
    ]
  },
  {
    name: 'Developers',
    icon: Terminal,
    children: [
      { name: 'Tech Insights', href: '/blog', icon: BookOpen, subtitle: 'Jurnal Vibe Coding' },
      { name: 'Academy', href: '/academy', icon: GraduationCap, subtitle: 'Tutorial & Dokumentasi' },
      { name: 'Quiz Evaluasi', href: '/quiz', icon: CheckSquare, subtitle: 'Uji Kompetensi' },
    ]
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 15);
      
      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [scrolled]);

  const whatsappUrl = `https://wa.me/6282125447232?text=${encodeURIComponent('Halo Mas Chesta, saya ingin konsultasi mengenai layanan pembuatan website dan solusi AI di CHESTAADOTCOM.')}`;

  return (
    <>
      <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none transition-transform duration-300 ease-in-out translate-y-0`}>
        {/* Top Notice Banner */}
        <div className="w-full pointer-events-auto">
          <LocalSEOBanner />
        </div>

        {/* Desktop Navbar */}
        <div className="w-full pointer-events-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`transition-all duration-300 ease-out flex items-center justify-between w-full px-4 md:px-12 bg-white border-b border-slate-200 ${
              scrolled ? 'py-3 shadow-sm' : 'py-5'
            }`}
          >
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group select-none pointer-events-auto">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 group-hover:bg-slate-800 transition-all duration-300 shadow-sm">
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-8 8 8 8 8-8-8-8z" />
                </svg>
              </div>
              
              <span className="font-display text-xl font-black tracking-tighter text-slate-900 leading-none">
                CHESTAA<span className="text-slate-900">DOT</span>COM
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-2" aria-label="Main Navigation">
              <ul className="flex items-center gap-1 list-none p-0 m-0">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href 
                  ? location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                  : item.children?.some(child => location.pathname === child.href || location.pathname.startsWith(child.href));
                  
                return (
                  <li key={item.name} className="relative group/navitem list-none">
                    {item.href ? (
                      <Link
                        to={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`text-[12px] font-sans font-semibold tracking-wide transition-all duration-200 px-4 py-2 rounded-lg ${
                          isActive
                            ? 'text-slate-900 bg-slate-100'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        aria-haspopup="true"
                        aria-expanded="false"
                        className={`text-[12px] font-sans font-semibold tracking-wide transition-all duration-200 px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer ${
                          isActive
                            ? 'text-slate-900 bg-slate-100'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        {item.name}
                        <ChevronDown size={14} className="group-hover/navitem:rotate-180 transition-transform duration-200 opacity-70" />
                      </button>
                    )}

                    {/* Dropdown Menu */}
                    {item.children && (
                      <div className="absolute top-full left-0 pt-3 opacity-0 translate-y-2 pointer-events-none group-hover/navitem:opacity-100 group-hover/navitem:translate-y-0 group-hover/navitem:pointer-events-auto transition-all duration-200 z-50">
                        <ul className="w-72 bg-white border border-slate-200 shadow-2xl rounded-xl p-2 flex flex-col gap-1 relative list-none m-0">
                          {item.children.map(child => {
                            const Icon = child.icon;
                            const isChildActive = location.pathname === child.href || location.pathname.startsWith(child.href);
                            return (
                              <li key={child.name} className="list-none">
                                <Link
                                  to={child.href}
                                  aria-current={isChildActive ? 'page' : undefined}
                                  className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                                    isChildActive
                                        ? 'bg-slate-100 text-slate-900 font-bold'
                                        : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                                  }`}
                                >
                                  <div className={`p-2 rounded-lg ${isChildActive ? 'bg-slate-200 text-slate-900' : 'bg-slate-100 text-slate-500'}`}>
                                    <Icon size={16} />
                                  </div>
                                  <div className="flex flex-col text-left">
                                    <span className="text-sm font-bold">{child.name}</span>
                                    <span className="text-xs text-slate-400 font-normal leading-tight mt-0.5">{child.subtitle}</span>
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
              </ul>
            </nav>
            
            {/* Action Area */}
            <div className="flex items-center gap-4 pointer-events-auto">
              <motion.button
                onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
                className="p-2.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Cari (⌘K)"
              >
                <Search size={20} />
              </motion.button>

              <motion.a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden md:flex items-center gap-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 px-6 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle size={18} />
                <span>Konsultasi</span>
              </motion.a>

              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-900 cursor-pointer"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Enhanced Slide-out Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop with smooth blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 md:hidden bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Slide-out Drawer Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-50 w-[86vw] max-w-[360px] md:hidden bg-white border-l border-slate-200/90 shadow-2xl flex flex-col justify-between overflow-hidden"
              style={{ overscrollBehavior: 'contain' }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Drawer"
            >
              {/* Drawer Header with Chesta's Brand & Close */}
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between shrink-0">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 group select-none"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-100/70 border border-purple-200">
                    <svg className="w-4 h-4 text-purple-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-8 8 8 8 8-8-8-8z" />
                      <path d="m12 8-4 4 4 4 4-4-4-4z" />
                    </svg>
                  </div>
                  <span className="font-display text-base font-black tracking-tight text-slate-900">
                    chestaa<span className="text-purple-600">dot</span>com
                  </span>
                </Link>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                  aria-label="Tutup navigasi"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Scrollable Center Content */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {/* Founder Identity Card with Chesta's Photo */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50/60 to-slate-50 border border-purple-100 flex items-center gap-3 shadow-2xs">
                  <div className="relative shrink-0">
                    <img 
                      src="/chesta.png" 
                      alt="Chesta Azka Sofyan - Founder & Lead Architect" 
                      className="w-12 h-12 rounded-xl object-cover object-top border border-purple-200 shadow-xs"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-sm font-bold text-slate-900 truncate">Chesta Azka Sofyan</span>
                    </div>
                    <span className="text-[11px] font-mono text-purple-800 font-bold uppercase tracking-wider">Lead Digital Architect</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      BSD City &bull; Siap Konsultasi
                    </span>
                  </div>
                </div>

                {/* Quick Search Bar */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent('open-command-palette'));
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Search size={15} className="text-purple-700 shrink-0" />
                    <span className="text-slate-600 font-sans">Cari Layanan &amp; Artikel...</span>
                  </div>
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white text-[10px] font-mono font-bold text-purple-900 border border-slate-200">
                    ⌘K
                  </kbd>
                </button>

                {/* Main Nav Links Accordion with Staggered Animation */}
                <nav className="space-y-1.5 pt-1" aria-label="Mobile Drawer Navigation">
                  {NAV_ITEMS.map((item, idx) => {
                    const Icon = item.icon || ChevronRight;
                    const isActive = item.href 
                      ? location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                      : item.children?.some(child => location.pathname === child.href || location.pathname.startsWith(child.href));
                    const isExpanded = expandedMenus.includes(item.name);

                    return (
                      <motion.div 
                        key={item.name} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (idx * 0.05), duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col"
                      >
                        {item.href ? (
                          <Link
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                              isActive
                                ? 'bg-purple-50 text-purple-950 font-bold border border-purple-200/80 shadow-2xs'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-1.5 rounded-lg ${isActive ? 'bg-purple-100 text-purple-900' : 'bg-slate-100 text-slate-500'}`}>
                                <Icon size={16} />
                              </div>
                              <span className="font-sans text-xs font-semibold tracking-tight uppercase">
                                {item.name}
                              </span>
                            </div>
                            <ChevronRight size={14} className="text-slate-400" />
                          </Link>
                        ) : (
                          <button
                            onClick={() => toggleMenu(item.name)}
                            aria-expanded={isExpanded}
                            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors w-full cursor-pointer ${
                              isActive || isExpanded
                                ? 'bg-purple-50/70 text-purple-950 font-bold border border-purple-200/60'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-1.5 rounded-lg ${isActive || isExpanded ? 'bg-purple-100 text-purple-900' : 'bg-slate-100 text-slate-500'}`}>
                                <Icon size={16} />
                              </div>
                              <span className="font-sans text-xs font-semibold tracking-tight uppercase">
                                {item.name}
                              </span>
                            </div>
                            <ChevronDown size={15} className={`transition-transform duration-200 text-slate-400 ${isExpanded ? 'rotate-180 text-purple-700' : ''}`} />
                          </button>
                        )}

                        {/* Submenu Dropdown */}
                        <AnimatePresence>
                          {item.children && isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-8 pr-1 py-1.5 space-y-1">
                                {item.children.map((child) => {
                                  const ChildIcon = child.icon;
                                  const isChildActive = location.pathname === child.href || location.pathname.startsWith(child.href);
                                  return (
                                    <Link
                                      key={child.name}
                                      to={child.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={`flex items-center gap-2.5 p-2 rounded-lg transition-colors text-left ${
                                        isChildActive
                                          ? 'bg-purple-100 text-purple-950 font-bold'
                                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                                      }`}
                                    >
                                      <ChildIcon size={14} className={isChildActive ? 'text-purple-700' : 'text-slate-400'} />
                                      <div className="flex flex-col min-w-0">
                                        <span className="font-sans text-xs font-semibold">{child.name}</span>
                                        <span className="text-[10px] text-slate-400 truncate">{child.subtitle}</span>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="px-5 py-4 border-t border-slate-200 bg-slate-50/80 space-y-2.5 shrink-0">
                <a
                  id="mobile-drawer-whatsapp-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between w-full py-3 px-4 bg-slate-900 hover:bg-purple-900 active:scale-[0.98] text-white rounded-xl font-mono font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle size={16} className="text-purple-400" />
                    <span>Chat WhatsApp</span>
                  </div>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono px-1">
                  <span>BSD City &bull; Cisauk</span>
                  <span className="text-purple-700 font-bold">CHESTAADOTCOM</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
