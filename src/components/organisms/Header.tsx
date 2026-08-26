import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SERVICE_DEFINITIONS } from '../../data/ServiceDefinition';
import LocalSEOBanner from '../molecules/LocalSEOBanner.tsx';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const location = useLocation();
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent | TouchEvent) => {
      // If the menu is closed, do nothing
      if (!isOpen) return;

      // If click target exists and is outside of BOTH the menu and the hamburger button
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Safely check if we clicked on the button that triggers/toggles the menu to avoid conflict
        const isToggleClick = (event.target as HTMLElement).closest('.menu-toggle-btn');
        if (!isToggleClick) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('touchstart', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('touchstart', handleDocumentClick);
    };
  }, [isOpen]);

  const links = [
    { name: 'Beranda', path: '/' },
    { name: 'Layanan', path: '/services' },
    { name: 'Portofolio', path: '/portfolio' },
    { name: 'Wawasan', path: '/blog' },
    { name: 'Tentang', path: '/about' }
  ];

  return (
    <>
      {/* Floating Header */}
      {/* Floating Header Container */}
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
        
        {/* The Banner takes full width at the very top, and has pointer events enabled */}
        <div className="w-full pointer-events-auto">
          <LocalSEOBanner />
        </div>

        {/* The Floating Pill is slightly pushed down from the banner or the top */}
        <div className="flex justify-center px-6 mt-4 sm:mt-6 w-full">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
          className={`transition-all duration-500 ease-out rounded-full px-6 flex items-center justify-between w-full max-w-5xl pointer-events-auto ${scrolled ? 'bg-white/5 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(30,41,59,0.1)] ring-1 ring-white/50 py-3' : 'bg-white/0 backdrop-blur-none border border-transparent shadow-none py-4'}`}
        >
          <Link to="/" className="flex items-center gap-2.5 group select-none pointer-events-auto">
            {/* Elegant Geometric Architectural Emblem */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 group-hover:border-[#4f46e5]/40 transition-colors duration-300">
              <svg className="w-4 h-4 text-[#4f46e5] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-8 8 8 8 8-8-8-8z" />
                <path d="m12 8-4 4 4 4 4-4-4-4z" />
              </svg>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#4f46e5] to-green-400 opacity-0 group-hover:opacity-10 blur-sm transition-opacity duration-300" />
            </div>
            
            <div className="flex flex-col text-left">
              <span className="font-display text-base font-extrabold tracking-tight text-slate-900 leading-none">
                chestaa<span className="text-[#4f46e5]">dot</span>com
              </span>
            </div>
          </Link>
        <nav className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
            {links.map((link) => {
              const isAnchor = link.path.startsWith('/#');
              const isLayanan = link.name === 'Layanan';
              
              return (
                <motion.div key={link.name} className="relative group" whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  {isAnchor ? (
                    <a
                      href={location.pathname === '/' ? link.path.substring(1) : link.path}
                      className="font-sans text-sm font-medium text-slate-700 transition-colors group-hover:text-indigo-600 flex items-center gap-1 py-4"
                    >
                      {link.name}
                      {isLayanan && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="font-sans text-sm font-medium text-slate-700 transition-colors group-hover:text-indigo-600 flex items-center gap-1 py-4"
                    >
                      {link.name}
                      {isLayanan && <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
                    </Link>
                  )}
                  
                  {isLayanan && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-[650px] pointer-events-none group-hover:pointer-events-auto z-50">
                      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/30 ring-1 ring-white/20 p-4 relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:bg-white/10 before:backdrop-blur-xl before:border-l before:border-t before:border-white/80 before:rotate-45">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-h-[60vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300/50 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/50 [&::-webkit-scrollbar-thumb]:rounded-full">
                          {SERVICE_DEFINITIONS.map(service => (
                            <Link 
                              key={service.slug} 
                              to={`/layanan/${service.slug}`} 
                              className="relative z-10 px-3 py-3 hover:bg-white/30 rounded-2xl transition-colors text-sm font-medium text-slate-800 flex flex-col group/item"
                            >
                              <span className="flex items-center gap-2 font-semibold transition-transform duration-300 group-hover/item:translate-x-1">
                                <service.icon size={16} className="text-indigo-600 transition-transform duration-300 group-hover/item:scale-110" />
                                {service.title}
                              </span>
                              <span className="text-xs text-slate-500 font-normal mt-1 leading-relaxed line-clamp-1 transition-transform duration-300 group-hover/item:translate-x-1">{service.description}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </nav>
          
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <motion.div whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="ml-2">
              <a href={location.pathname === '/' ? '#pricing' : '/#pricing'} className="text-sm font-sans font-medium text-white bg-slate-900 px-5 py-2.5 rounded-full hover:bg-indigo-600 transition-colors shadow-sm inline-block">
                Mulai Proyek
              </a>
            </motion.div>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2 rounded-full hover:bg-slate-200 transition-colors menu-toggle-btn">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed top-24 right-6 left-6 z-40 bg-white/10 backdrop-blur-2xl border border-white/80 ring-1 ring-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-3xl p-6 flex flex-col md:hidden transform origin-top"
          >
            <motion.nav 
              ref={menuRef}
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.03, staggerDirection: -1 }
                }
              }}
              className="flex flex-col gap-4 text-left z-10"
            >
              {links.map((link) => {
                const isAnchor = link.path.startsWith('/#');
                
                const itemVariants = {
                  open: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
                  closed: { opacity: 0, x: -10, transition: { duration: 0.2 } }
                };

                return (
                  <motion.div
                    key={link.name}
                    variants={itemVariants}
                    className="overflow-hidden"
                  >
                    {isAnchor ? (
                      <a
                        href={location.pathname === '/' ? link.path.substring(1) : link.path}
                        className={`block font-display text-2xl font-semibold tracking-tight hover:text-[#4f46e5] transition-colors ${
                          location.hash === link.path.substring(1) ? 'text-[#4f46e5]' : 'text-slate-800'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </a>
                    ) : link.name === 'Layanan' ? (
                      <div className="flex flex-col">
                        <button
                          className={`block font-display text-2xl font-semibold tracking-tight hover:text-[#4f46e5] transition-colors flex items-center justify-between w-full text-left ${
                            location.pathname === link.path || location.pathname.startsWith('/services') ? 'text-[#4f46e5]' : 'text-slate-800'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileServicesOpen(!mobileServicesOpen);
                          }}
                        >
                          {link.name}
                          <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden mt-4 pl-4 border-l-2 border-indigo-100 flex flex-col gap-4"
                            >
                              {SERVICE_DEFINITIONS.map(service => (
                                <Link 
                                  key={service.slug} 
                                  to={`/layanan/${service.slug}`} 
                                  onClick={() => setIsOpen(false)} 
                                  className="group/mobile text-lg font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-3 transition-all duration-300 hover:translate-x-2"
                                >
                                  <service.icon size={20} className="text-indigo-500 transition-transform duration-300 group-hover/mobile:scale-110" />
                                  {service.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className={`block font-display text-2xl font-semibold tracking-tight hover:text-[#4f46e5] transition-colors flex items-center justify-between ${
                          location.pathname === link.path ? 'text-[#4f46e5]' : 'text-slate-800'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
              <motion.div 
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 10 }
                }}
                className="pt-4 mt-2 border-t border-slate-100"
              >
                <a 
                  href={location.pathname === '/' ? '#pricing' : '/#pricing'} 
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center font-sans font-semibold text-white bg-indigo-600 px-6 py-4 rounded-xl hover:bg-slate-900 transition-colors shadow-sm"
                >
                  Mulai Konsultasi Enterprise
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
