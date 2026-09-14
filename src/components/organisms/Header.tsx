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

        {/* Floating Clean Header Pill */}
        <div className="w-full px-4 sm:px-6 pt-3">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.1 }}
            className={`transition-all duration-300 ease-out flex items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-6 pointer-events-auto rounded-2xl ${
              scrolled
                ? 'bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg py-3' 
                : 'bg-white/80 backdrop-blur-xl border border-slate-200/80 py-3.5 shadow-sm'
            }`}
          >
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 md:gap-2 group select-none pointer-events-auto shrink-0">
              <div className="relative flex items-center justify-center w-8 md:w-8 h-8 md:h-8 rounded-xl bg-purple-50 border border-purple-200 group-hover:bg-purple-100 transition-all duration-300 shadow-xs">
                <svg className="w-4 h-4 md:w-4 md:h-4 text-purple-700 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-8 8 8 8 8-8-8-8z" />
                  <path d="m12 8-4 4 4 4 4-4-4-4z" />
                </svg>
              </div>
              
              <div className="flex flex-col text-left">
                <span className="font-display text-base md:text-[16px] font-black tracking-tight text-slate-900 leading-none">
                  chestaa<span className="text-purple-600">dot</span>com
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href 
                  ? location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                  : item.children?.some(child => location.pathname === child.href || location.pathname.startsWith(child.href));
                  
                return (
                  <div key={item.name} className="relative group/navitem">
                    {item.href ? (
                      <Link
                        to={item.href}
                        className={`rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-200 relative flex items-center px-4 py-2 ${
                          isActive
                            ? 'text-purple-900 bg-purple-50 border border-purple-200 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <div
                        className={`rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-200 relative flex items-center px-4 py-2 gap-1.5 cursor-pointer ${
                          isActive
                            ? 'text-purple-900 bg-purple-50 border border-purple-200 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                        }`}
                      >
                        {item.name}
                        <ChevronDown size={12} className="group-hover/navitem:rotate-180 transition-transform duration-200 text-slate-400" />
                      </div>
                    )}

                    {/* Dropdown Menu */}
                    {item.children && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 translate-y-2 pointer-events-none group-hover/navitem:opacity-100 group-hover/navitem:translate-y-0 group-hover/navitem:pointer-events-auto transition-all duration-300 z-50">
                        <div className="w-64 bg-white border border-slate-200 shadow-xl rounded-2xl p-2.5 flex flex-col gap-1.5 relative">
                          {/* Triangle indicator */}
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-200 rotate-45" />
                          
                          {item.children.map(child => {
                            const Icon = child.icon;
                            const isChildActive = location.pathname === child.href || location.pathname.startsWith(child.href);
                            return (
                              <Link
                                key={child.name}
                                to={child.href}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all border ${
                                  isChildActive 
                                    ? 'bg-purple-50 text-purple-950 border-purple-200 font-bold' 
                                    : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-transparent'
                                }`}
                              >
                                <div className={`p-2 rounded-xl border ${isChildActive ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                  <Icon size={16} />
                                </div>
                                <div className="flex flex-col text-left">
                                  <span className="text-xs font-bold font-sans">{child.name}</span>
                                  <span className="text-[10px] text-slate-500 font-sans tracking-wide">{child.subtitle}</span>
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            
            {/* Action Area */}
            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Search Trigger Button */}
              <motion.button
                id="header-search-btn"
                onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-950 border border-purple-200 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs group"
                title="Cari Halaman, Layanan & Artikel (⌘K)"
                aria-label="Cari Website (⌘K)"
              >
                <Search size={14} className="text-purple-700 group-hover:scale-110 transition-transform shrink-0" />
                <span className="hidden sm:inline text-slate-800 group-hover:text-purple-950">Cari</span>
                <kbd className="hidden md:inline-flex items-center text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-lg bg-white border border-purple-200 text-purple-900 shadow-2xs">
                  ⌘K
                </kbd>
              </motion.button>

              {/* Desktop Direct Contact Button */}
              <motion.a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="hidden md:flex items-center gap-1.5 text-[11px] font-mono font-bold text-white bg-slate-900 hover:bg-purple-900 active:scale-95 px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer uppercase tracking-widest border border-slate-800"
              >
                <MessageCircle size={13} className="shrink-0 text-purple-400" />
                <span>Chat</span>
              </motion.a>

              {/* Mobile Chat Quick Icon */}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.92 }}
                className="md:hidden flex items-center justify-center min-w-[38px] min-h-[38px] rounded-xl bg-slate-900 text-white border border-slate-800 shadow-2xs cursor-pointer"
                aria-label="Chat with us via WhatsApp"
              >
                <MessageCircle size={16} className="text-purple-400" />
              </motion.a>

              {/* Mobile Hamburger Toggle Button */}
              <motion.button
                id="mobile-hamburger-btn"
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center min-w-[38px] min-h-[38px] rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-950 border border-purple-200 transition-colors cursor-pointer shadow-2xs"
                aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                aria-expanded={mobileMenuOpen}
              >
                <Menu size={18} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay (Polished Rounded Corners) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 md:hidden bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 240 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm md:hidden bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between overflow-y-auto rounded-l-3xl"
              style={{ overscrollBehavior: 'contain' }}
            >
              {/* Top Bar inside Drawer */}
              <div className="w-full flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0 bg-slate-50/50">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 group select-none"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-purple-50 border border-purple-200">
                    <svg className="w-4 h-4 text-purple-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-8 8 8 8 8-8-8-8z" />
                      <path d="m12 8-4 4 4 4 4-4-4-4z" />
                    </svg>
                  </div>
                  <span className="font-display text-lg font-black tracking-tight text-slate-900">
                    chestaa<span className="text-purple-600">dot</span>com
                  </span>
                </Link>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-2xs"
                  aria-label="Tutup navigasi"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Scrollable Center Content */}
              <div className="flex-1 flex flex-col px-6 py-6 space-y-6 w-full">
                {/* Quick Search Bar */}
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent('open-command-palette'));
                  }}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium cursor-pointer hover:bg-slate-100 transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <Search size={18} className="text-purple-700 shrink-0" />
                    <span className="text-slate-800 font-sans font-medium">Cari Layanan, Portfolio...</span>
                  </div>
                  <kbd className="px-2.5 py-1 rounded-xl bg-white text-[11px] font-mono font-bold text-purple-900 border border-slate-200 shadow-2xs">
                    ⌘K
                  </kbd>
                </motion.button>

                {/* Navigation Links List */}
                <nav className="space-y-2.5">
                  {NAV_ITEMS.map((item, index) => {
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
                        transition={{ duration: 0.25, delay: 0.1 + index * 0.04 }}
                        className="flex flex-col gap-1"
                      >
                        {item.href ? (
                          <Link
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between p-3.5 rounded-2xl transition-all border ${
                              isActive
                                ? 'bg-purple-50 border-purple-200 text-purple-950 font-bold shadow-2xs'
                                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-3.5">
                              <div className={`p-2.5 rounded-xl border ${isActive ? 'bg-purple-100 text-purple-900 border-purple-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                <Icon size={18} />
                              </div>
                              <span className="font-display text-base tracking-tight font-bold">
                                {item.name}
                              </span>
                            </div>
                            <ChevronRight size={16} className="text-slate-400" />
                          </Link>
                        ) : (
                          <button
                            onClick={() => toggleMenu(item.name)}
                            className={`flex items-center justify-between p-3.5 rounded-2xl transition-all w-full border ${
                              isActive || isExpanded
                                ? 'bg-purple-50 border-purple-200 text-purple-950 font-bold'
                                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-3.5">
                              <div className={`p-2.5 rounded-xl border ${isActive || isExpanded ? 'bg-purple-100 text-purple-900 border-purple-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                <Icon size={18} />
                              </div>
                              <span className="font-display text-base tracking-tight font-bold">
                                {item.name}
                              </span>
                            </div>
                            <ChevronDown size={18} className={`transition-transform duration-300 text-slate-400 ${isExpanded ? 'rotate-180 text-purple-700' : ''}`} />
                          </button>
                        )}

                        {/* Mobile Dropdown Items */}
                        <AnimatePresence>
                          {item.children && isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-3 pr-1 py-2 space-y-2 border-l-2 border-purple-200 ml-6 mt-1 bg-slate-50/50">
                                {item.children.map((child) => {
                                  const ChildIcon = child.icon;
                                  const isChildActive = location.pathname === child.href || location.pathname.startsWith(child.href);
                                  return (
                                    <Link
                                      key={child.name}
                                      to={child.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={`flex items-center justify-between p-3 rounded-xl transition-all border ${
                                        isChildActive
                                          ? 'bg-purple-100 text-purple-950 font-bold border-purple-200'
                                          : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl border ${isChildActive ? 'bg-purple-200 text-purple-800 border-purple-300' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                          <ChildIcon size={15} />
                                        </div>
                                        <div className="flex flex-col text-left">
                                          <span className="font-sans text-xs font-bold">{child.name}</span>
                                          <span className="text-[10px] text-slate-500 font-sans">{child.subtitle}</span>
                                        </div>
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

                {/* Direct Contact Action Button */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <a
                    id="mobile-drawer-whatsapp-btn"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between w-full py-4 px-5 bg-slate-900 hover:bg-purple-900 active:scale-[0.98] text-white rounded-2xl font-mono font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle size={18} className="text-purple-400" />
                      <span>Konsultasi WhatsApp</span>
                    </div>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-mono py-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Lead Architect Online &bull; BSD City</span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Info */}
              <div className="w-full px-6 py-4 border-t border-slate-100 bg-slate-50/50 text-center text-[11px] text-slate-500 font-mono shrink-0">
                <span>CHESTAADOTCOM &copy; 2026 &bull; All Rights Reserved</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
