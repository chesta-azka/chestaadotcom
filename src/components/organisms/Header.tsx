import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Menu, X, Home, Sparkles, Briefcase, GitFork, User, BookOpen, ArrowRight, Search, Mail, Phone, ChevronRight, ChevronDown, MapPin, GraduationCap, CheckSquare } from 'lucide-react';
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
    children: [
      { name: 'Web Dev Next.js', href: '/#services', icon: Sparkles, subtitle: 'Pembuatan Website Cepat & Modern' },
      { name: 'AI Integration', href: '/#services', icon: Sparkles, subtitle: 'Otomatisasi dengan Google Gemini' },
      { name: 'UI/UX Design', href: '/#services', icon: Sparkles, subtitle: 'Desain Antarmuka Premium' },
      { name: 'Workflow', href: '/workflow', icon: GitFork, subtitle: 'Proses Kerja & Eksekusi' },
    ]
  },
  {
    name: 'Showcase',
    children: [
      { name: 'Portfolio', href: '/portfolio', icon: Briefcase, subtitle: 'Galeri & Hasil Nyata' },
      { name: 'Case Studies', href: '/case-studies', icon: Briefcase, subtitle: 'Analisis Mendalam' },
      { name: 'About', href: '/about', icon: User, subtitle: 'Profil Founder & Visi' },
    ]
  },
  {
    name: 'Developers',
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
      
      // Hide on scroll down, show on scroll up
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

  // Close mobile menu on route change & unlock scroll
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  }, [location.pathname]);

  // Lock body scroll when full-screen mobile menu is open
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

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Dynamically measure and broadcast header height to :root --header-height
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

  // Removed academy exception to make header visible on all pages

  const whatsappUrl = `https://wa.me/6282125447232?text=${encodeURIComponent('Halo Mas Chesta, saya ingin konsultasi mengenai layanan pembuatan website dan solusi AI di CHESTAADOTCOM.')}`;

  return (
    <>
      <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none transition-transform duration-300 ease-in-out translate-y-0`}>
        {/* Top Notice Banner */}
        <div className="w-full pointer-events-auto">
          <LocalSEOBanner />
        </div>

        {/* Floating Clean Header Pill */}
        <div className="w-full">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.1 }}
            className={`transition-all duration-300 ease-out flex items-center justify-between w-full px-4 md:px-8 pointer-events-auto ${
              scrolled
                ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-2' 
                : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/40 py-2.5'
            }`}
          >
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 md:gap-2 group select-none pointer-events-auto shrink-0">
              <div className="relative flex items-center justify-center w-8 md:w-7 h-8 md:h-7 rounded-lg md:rounded-xl bg-purple-50 border border-purple-200/80 group-hover:border-purple-400 group-hover:bg-purple-100 transition-all duration-300 shadow-2xs">
                <svg className="w-4 h-4 md:w-3.5 md:h-3.5 text-purple-700 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-8 8 8 8 8-8-8-8z" />
                  <path d="m12 8-4 4 4 4 4-4-4-4z" />
                </svg>
              </div>
              
              <div className="flex flex-col text-left">
                <span className="font-display text-base md:text-[15px] font-bold tracking-tight text-slate-900 leading-none">
                  chestaa<span className="text-purple-500">dot</span>com
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href 
                  ? location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                  : item.children?.some(child => location.pathname === child.href || location.pathname.startsWith(child.href));
                  
                return (
                  <div key={item.name} className="relative group/navitem">
                    {item.href ? (
                      <Link
                        to={item.href}
                        className={` rounded-full text-sm font-medium font-sans tracking-tight transition-colors duration-200 relative flex items-center px-4 py-2 ${
                          isActive
                            ? 'text-purple-900 bg-purple-100/60 font-semibold'
                            : 'text-slate-600 hover:text-purple-900 hover:bg-slate-100/60'
                        }`}
                      >
                        {item.name}
                        
                      </Link>
                    ) : (
                      <div
                        className={` rounded-full text-sm font-medium font-sans tracking-tight transition-colors duration-200 relative flex items-center px-4 py-2 gap-1 cursor-pointer ${
                          isActive
                            ? 'text-purple-900 bg-purple-100/60 font-semibold'
                            : 'text-slate-600 hover:text-purple-900 hover:bg-slate-100/60'
                        }`}
                      >
                        {item.name}
                        <ChevronDown size={12} className="group-hover/navitem:rotate-180 transition-transform duration-200" />
                        
                      </div>
                    )}

                    {/* Dropdown Menu */}
                    {item.children && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/navitem:opacity-100 group-hover/navitem:translate-y-0 group-hover/navitem:pointer-events-auto transition-all duration-300 z-50">
                        <div className="w-56 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl shadow-purple-900/5 rounded-2xl p-2 flex flex-col gap-1 relative">
                          {/* Triangle indicator */}
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-200 rotate-45" />
                          
                          {item.children.map(child => {
                            const Icon = child.icon;
                            const isChildActive = location.pathname === child.href || location.pathname.startsWith(child.href);
                            return (
                              <Link
                                key={child.name}
                                to={child.href}
                                className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
                                  isChildActive 
                                    ? 'bg-purple-50 text-purple-900' 
                                    : 'hover:bg-slate-50 text-slate-700 hover:text-purple-700'
                                }`}
                              >
                                <div className={`p-1.5 rounded-lg ${isChildActive ? 'bg-purple-100' : 'bg-slate-100 text-slate-500'}`}>
                                  <Icon size={14} className={isChildActive ? 'text-purple-600' : ''} />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs font-bold font-sans">{child.name}</span>
                                  <span className="text-[9px] text-slate-500 font-sans tracking-wide">{child.subtitle}</span>
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
              {/* Search Trigger Button (Desktop & Tablet) */}
              <motion.button
                id="header-search-btn"
                onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-50 hover:bg-purple-100/90 text-purple-900 border border-purple-200/90 text-xs font-semibold transition-all cursor-pointer shadow-2xs group"
                title="Cari Halaman, Layanan & Artikel (⌘K)"
                aria-label="Cari Website (⌘K)"
              >
                <Search size={14} className="text-purple-700 group-hover:scale-110 transition-transform shrink-0" />
                <span className="hidden sm:inline text-slate-700 group-hover:text-purple-950 font-medium">Cari</span>
                <kbd className="hidden md:inline-flex items-center text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white border border-purple-200 text-purple-700 shadow-2xs">
                  ⌘K
                </kbd>
              </motion.button>

              {/* Desktop Direct Contact Button */}
              <motion.a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="hidden md:flex items-center gap-1.5 text-[11px] font-sans font-bold text-white bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-900 hover:to-indigo-900 active:scale-95 px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:shadow-purple-800/20 transition-all cursor-pointer uppercase tracking-wider"
              >
                <MessageCircle size={13} className="shrink-0" />
                <span>Chat</span>
              </motion.a>

              {/* Mobile Chat with us Quick Icon */}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.92 }}
                className="md:hidden flex items-center justify-center min-w-[38px] min-h-[38px] rounded-full bg-gradient-to-r from-purple-800 to-indigo-800 text-white shadow-xs cursor-pointer"
                aria-label="Chat with us via WhatsApp"
              >
                <MessageCircle size={16} />
              </motion.a>

              {/* Mobile Hamburger Toggle Button */}
              <motion.button
                id="mobile-hamburger-btn"
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center min-w-[38px] min-h-[38px] rounded-full bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-purple-900 border border-purple-200/80 transition-colors cursor-pointer"
                aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                aria-expanded={mobileMenuOpen}
              >
                <Menu size={18} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 md:hidden bg-white flex flex-col justify-between overflow-y-auto"
            style={{ overscrollBehavior: 'contain' }}
          >
            {/* Top Bar inside Overlay */}
            <div className="w-full flex items-center justify-between px-6 py-5 border-b border-slate-200 shrink-0">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 group select-none"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-purple-50 border border-purple-200">
                  <svg className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-8 8 8 8 8-8-8-8z" />
                    <path d="m12 8-4 4 4 4 4-4-4-4z" />
                  </svg>
                </div>
                <span className="font-display text-lg font-bold tracking-tight text-slate-900">
                  chestaa<span className="text-purple-600">dot</span>com
                </span>
              </Link>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-900 border border-slate-200 transition-all cursor-pointer"
                aria-label="Tutup navigasi layar penuh"
              >
                <X size={22} />
              </motion.button>
            </div>

            {/* Scrollable Center Content */}
            <div className="flex-1 flex flex-col px-6 py-6 space-y-6 max-w-lg mx-auto w-full">
              {/* Quick Search Bar */}
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.08 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-command-palette'));
                }}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium cursor-pointer hover:bg-slate-100 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Search size={18} className="text-purple-600 shrink-0" />
                  <span className="text-slate-600 font-sans">Cari Layanan, Portofolio, Artikel...</span>
                </div>
                <kbd className="px-2.5 py-1 rounded-lg bg-white text-[11px] font-mono font-semibold text-purple-600 border border-slate-200">
                  ⌘K
                </kbd>
              </motion.button>

              {/* Navigation Links List */}
              <nav className="space-y-2 py-2">
                {NAV_ITEMS.map((item, index) => {
                  const Icon = item.icon || (item.children ? ChevronDown : ChevronRight);
                  const isActive = item.href 
                    ? location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                    : item.children?.some(child => location.pathname === child.href || location.pathname.startsWith(child.href));
                  const isExpanded = expandedMenus.includes(item.name);

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.12 + index * 0.04 }}
                      className="flex flex-col gap-1"
                    >
                      {item.href ? (
                        <Link
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                            isActive
                              ? 'bg-purple-100/80 border border-purple-200/50 text-purple-900 shadow-sm'
                              : 'bg-transparent border border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className={`p-2.5 rounded-xl ${isActive ? 'bg-purple-100 text-purple-900' : 'bg-slate-50 text-slate-600'}`}>
                              <Icon size={18} />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="font-display text-base font-bold tracking-tight">
                                {item.name}
                              </span>
                              <span className="text-xs text-slate-500 font-sans">
                                {item.subtitle}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isActive && (
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-400/30">
                                Aktif
                              </span>
                            )}
                            <ChevronRight size={18} className="text-slate-500" />
                          </div>
                        </Link>
                      ) : (
                        <button
                          onClick={() => toggleMenu(item.name)}
                          className={`flex items-center justify-between p-3.5 rounded-2xl transition-all w-full ${
                            isActive || isExpanded
                              ? 'bg-purple-50 border border-purple-100 text-purple-900'
                              : 'bg-transparent border border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className={`p-2.5 rounded-xl ${isActive || isExpanded ? 'bg-purple-100 text-purple-900' : 'bg-slate-50 text-slate-600'}`}>
                              <ChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="font-display text-base font-bold tracking-tight">
                                {item.name}
                              </span>
                            </div>
                          </div>
                        </button>
                      )}

                      {/* Mobile Dropdown Items */}
                      <AnimatePresence>
                        {item.children && isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pr-2 py-2 space-y-2 border-l border-slate-200 ml-6 mt-1">
                              {item.children.map((child) => {
                                const ChildIcon = child.icon;
                                const isChildActive = location.pathname === child.href || location.pathname.startsWith(child.href);
                                return (
                                  <Link
                                    key={child.name}
                                    to={child.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                                      isChildActive
                                        ? 'bg-purple-100/50 border border-purple-200/50 text-purple-900'
                                        : 'bg-transparent border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`p-2 rounded-lg ${isChildActive ? 'bg-purple-100 text-purple-900' : 'bg-slate-50 text-slate-600'}`}>
                                        <ChildIcon size={16} />
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="font-sans text-sm font-bold">{child.name}</span>
                                        <span className="text-[10px] text-slate-500">{child.subtitle}</span>
                                      </div>
                                    </div>
                                    {isChildActive && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2" />
                                    )}
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

              {/* Direct Contact & Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.38 }}
                className="space-y-4 pt-4 border-t border-slate-200"
              >
                {/* WhatsApp Action Button */}
                <a
                  id="mobile-fullscreen-whatsapp-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between w-full py-4 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98] text-white rounded-2xl font-sans font-bold text-xs uppercase tracking-widest shadow-xl shadow-purple-900/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle size={20} className="text-white" />
                    <span>Konsultasi WhatsApp</span>
                  </div>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Status Indicator */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-sans">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Lead Architect Online &bull; Respon Cepat</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Footer Info */}
            <div className="w-full px-6 py-4 border-t border-slate-200 text-center text-[11px] text-slate-500 font-sans shrink-0">
              <span>CHESTAADOTCOM &copy; 2026 &bull; Cisauk &amp; BSD City</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
