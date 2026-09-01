import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Menu, X, Home, Sparkles, Briefcase, GitFork, User, BookOpen, ArrowRight, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LocalSEOBanner from '../molecules/LocalSEOBanner.tsx';

const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Services', href: '/services', icon: Sparkles },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Workflow', href: '/workflow', icon: GitFork },
  { name: 'About', href: '/about', icon: User },
  { name: 'Blog', href: '/blog', icon: BookOpen },
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
  }, [scrolled, mobileMenuOpen]);

  const whatsappUrl = `https://wa.me/6282125447232?text=${encodeURIComponent('Halo Mas Chesta, saya ingin konsultasi mengenai layanan pembuatan website dan solusi AI di CHESTAADOTCOM.')}`;

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none transition-all duration-300">
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
            scrolled || mobileMenuOpen
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
              className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white shadow-xs cursor-pointer"
              aria-label="Chat with us"
            >
              <MessageCircle size={15} />
            </motion.a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200/80 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Slide-Down Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="w-full max-w-4xl px-4 sm:px-6 mt-2 pointer-events-auto md:hidden">
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/95 backdrop-blur-2xl border border-purple-100 rounded-3xl p-5 shadow-[0_20px_50px_rgba(88,28,135,0.12)] space-y-4"
            >
              {/* Quick Mobile Search Input Trigger */}
              <button
                id="mobile-menu-search-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-command-palette'));
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-purple-50/70 border border-purple-200/90 text-slate-700 text-xs font-medium cursor-pointer hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Search size={16} className="text-purple-700" />
                  <span className="text-slate-600 font-sans">Cari layanan, portofolio, artikel...</span>
                </div>
                <kbd className="px-2 py-0.5 rounded-lg bg-white text-[10px] font-mono font-semibold text-purple-700 border border-purple-200 shadow-2xs">
                  Cari
                </kbd>
              </button>

              {/* Navigation Grid */}
              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3.5 py-3 rounded-2xl text-xs font-semibold font-sans transition-all ${
                        isActive
                          ? 'bg-purple-100/80 text-purple-950 border border-purple-200'
                          : 'bg-purple-50/40 text-slate-700 hover:bg-purple-50 hover:text-purple-900 border border-transparent'
                      }`}
                    >
                      <div className={`p-1.5 rounded-xl ${isActive ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700'}`}>
                        <Icon size={14} />
                      </div>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* High-Conversion Mobile WhatsApp Action */}
              <div className="pt-2 border-t border-purple-100">
                <a
                  id="mobile-menu-whatsapp-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between w-full py-3.5 px-5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-2xl font-sans font-bold text-xs uppercase tracking-wider shadow-md shadow-purple-600/25 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle size={18} className="text-white" />
                    <span>Chat with us on WhatsApp</span>
                  </div>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-slate-500 font-sans">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Respon Cepat via WhatsApp</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
