import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Menu, X, Home, Sparkles, Briefcase, GitFork, User, BookOpen, ArrowRight, Search, Mail, Phone, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LocalSEOBanner from '../molecules/LocalSEOBanner.tsx';

const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: Home, subtitle: 'Beranda & Pengantar' },
  { name: 'Services', href: '/services', icon: Sparkles, subtitle: 'Solusi Website & AI' },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase, subtitle: 'Studi Kasus & Hasil Nyata' },
  { name: 'Workflow', href: '/workflow', icon: GitFork, subtitle: 'Proses Kerja & Eksekusi' },
  { name: 'About', href: '/about', icon: User, subtitle: 'Profil Founder & Visi' },
  { name: 'Blog', href: '/blog', icon: BookOpen, subtitle: 'Jurnal Insight & Tech 2026' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
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

  const whatsappUrl = `https://wa.me/6282125447232?text=${encodeURIComponent('Halo Mas Chesta, saya ingin konsultasi mengenai layanan pembuatan website dan solusi AI di CHESTAADOTCOM.')}`;

  return (
    <>
      <header ref={headerRef} className="absolute md:fixed top-0 left-0 right-0 z-40 flex flex-col items-center pointer-events-none transition-all duration-300">
        {/* Top Notice Banner */}
        <div className="w-full pointer-events-auto">
          <LocalSEOBanner />
        </div>

        {/* Floating Clean Header Pill */}
        <div className="flex justify-center px-4 sm:px-6 mt-3 sm:mt-4 w-full">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.1 }}
            className={`transition-all duration-300 ease-out rounded-full px-4 sm:px-7 flex items-center justify-between w-full max-w-4xl pointer-events-auto ${
              scrolled
                ? 'bg-white/95 backdrop-blur-2xl border border-purple-100/90 shadow-[0_8px_30px_rgba(88,28,135,0.08)] ring-1 ring-slate-900/5 py-2.5 sm:py-3' 
                : 'bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3 sm:py-3.5'
            }`}
          >
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group select-none pointer-events-auto shrink-0">
              <div className="relative flex items-center justify-center w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-purple-50 border border-purple-200/80 group-hover:border-purple-400 group-hover:bg-purple-100 transition-all duration-300 shadow-2xs">
                <svg className="w-4 h-4 text-purple-700 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-8 8 8 8 8-8-8-8z" />
                  <path d="m12 8-4 4 4 4 4-4-4-4z" />
                </svg>
              </div>
              
              <div className="flex flex-col text-left">
                <span className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 leading-none">
                  chestaa<span className="text-purple-600">dot</span>com
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium font-sans transition-colors duration-200 relative ${
                      isActive
                        ? 'text-purple-900 font-semibold bg-purple-50/80'
                        : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-purple-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
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
                className="hidden sm:flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-800 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-sm hover:shadow-md hover:shadow-purple-600/20 transition-all cursor-pointer"
              >
                <MessageCircle size={15} className="shrink-0" />
                <span>Chat with us</span>
              </motion.a>

              {/* Mobile Chat with us Quick Icon */}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.92 }}
                className="sm:hidden flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-purple-600 text-white shadow-xs cursor-pointer"
                aria-label="Chat with us via WhatsApp"
              >
                <MessageCircle size={17} />
              </motion.a>

              {/* Mobile Hamburger Toggle Button */}
              <motion.button
                id="mobile-hamburger-btn"
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-purple-900 border border-purple-200/80 transition-colors cursor-pointer"
                aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                aria-expanded={mobileMenuOpen}
              >
                <Menu size={20} />
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
            className="fixed inset-0 z-50 md:hidden bg-slate-950/85 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto"
            style={{ overscrollBehavior: 'contain' }}
          >
            {/* Top Bar inside Overlay */}
            <div className="w-full flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 group select-none"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/40">
                  <svg className="w-4 h-4 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-8 8 8 8 8-8-8-8z" />
                    <path d="m12 8-4 4 4 4 4-4-4-4z" />
                  </svg>
                </div>
                <span className="font-display text-lg font-bold tracking-tight text-white">
                  chestaa<span className="text-purple-400">dot</span>com
                </span>
              </Link>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 transition-all cursor-pointer"
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
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-slate-300 text-sm font-medium cursor-pointer hover:bg-white/15 transition-all shadow-inner"
              >
                <div className="flex items-center gap-3">
                  <Search size={18} className="text-purple-400 shrink-0" />
                  <span className="text-slate-300 font-sans">Cari Layanan, Portofolio, Artikel...</span>
                </div>
                <kbd className="px-2.5 py-1 rounded-lg bg-white/15 text-[11px] font-mono font-semibold text-purple-200 border border-white/20">
                  ⌘K
                </kbd>
              </motion.button>

              {/* Navigation Links List */}
              <nav className="space-y-2 py-2">
                {NAV_ITEMS.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.12 + index * 0.04 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                          isActive
                            ? 'bg-purple-600/30 border border-purple-400/50 text-white shadow-lg shadow-purple-900/30'
                            : 'bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`p-2.5 rounded-xl ${isActive ? 'bg-purple-600 text-white' : 'bg-white/10 text-purple-300'}`}>
                            <Icon size={18} />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-display text-base font-bold tracking-tight">
                              {item.name}
                            </span>
                            <span className="text-xs text-slate-400 font-sans">
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
                          <ChevronRight size={18} className="text-slate-400" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Direct Contact & Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.38 }}
                className="space-y-4 pt-4 border-t border-white/10"
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
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-sans">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Lead Architect Online &bull; Respon Cepat</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Footer Info */}
            <div className="w-full px-6 py-4 border-t border-white/10 text-center text-[11px] text-slate-400 font-sans shrink-0">
              <span>CHESTAADOTCOM &copy; 2026 &bull; Cisauk &amp; BSD City</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
