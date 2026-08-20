import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const location = useLocation();
  const menuRef = useRef<HTMLElement>(null);

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
    { name: 'Home', path: '/' },
    { name: 'Layanan', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Insight', path: '/blog' },
    { name: 'Tentang', path: '/about' }
  ];

  return (
    <>
      {/* Floating Header */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
          className="bg-white/[0.03] backdrop-blur-2xl border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl pointer-events-auto"
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
                <motion.div key={link.name} className="relative group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {isAnchor ? (
                    <a
                      href={location.pathname === '/' ? link.path.substring(1) : link.path}
                      className="font-sans text-sm font-medium text-slate-700 transition-colors group-hover:text-indigo-600 flex items-center gap-1"
                    >
                      {link.name}
                      {isLayanan && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="font-sans text-sm font-medium text-slate-700 transition-colors group-hover:text-indigo-600 flex items-center gap-1"
                    >
                      {link.name}
                      {isLayanan && <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
                    </Link>
                  )}
                  
                  {isLayanan && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-[340px] pointer-events-none group-hover:pointer-events-auto z-50">
                      <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/10 border border-slate-100 p-3 flex flex-col gap-1 relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:bg-white before:border-l before:border-t before:border-slate-100 before:rotate-45">
                        
                        <div className="px-3 py-2 text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                          Arsitektur Digital
                        </div>
                        <Link to="/services#web" className="relative z-10 px-4 py-3 hover:bg-slate-50 rounded-2xl transition-colors text-sm font-medium text-slate-800 flex flex-col group/item">
                          <span>Web Development</span>
                          <span className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">Website premium, e-commerce & corporate portal</span>
                        </Link>
                        
                        <div className="w-full h-px bg-slate-50 my-1"></div>
                        
                        <div className="px-3 py-2 text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                          Otomasi Cerdas
                        </div>
                        <Link to="/services#ai" className="relative z-10 px-4 py-3 hover:bg-indigo-50/50 rounded-2xl transition-colors text-sm font-medium text-slate-800 flex flex-col group/item">
                          <span className="flex items-center gap-2">AI Solutions <span className="bg-indigo-600/10 text-indigo-600 border border-indigo-600/20 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">New</span></span>
                          <span className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">Agentic AI, customer service bot & analisis data</span>
                        </Link>

                        <div className="w-full h-px bg-slate-50 my-1"></div>
                        
                        <div className="px-3 py-2 text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                          Ekspansi Bisnis
                        </div>
                        <Link to="/services#transformation" className="relative z-10 px-4 py-3 hover:bg-slate-50 rounded-2xl transition-colors text-sm font-medium text-slate-800 flex flex-col group/item">
                          <span>Digital Transformation</span>
                          <span className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">Konsultasi strategi, cloud infrastructure & SEO</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href={location.pathname === '/' ? '#pricing' : '/#pricing'} className="text-sm font-sans font-medium text-white bg-slate-900 px-5 py-2.5 rounded-full hover:bg-indigo-600 transition-colors shadow-sm inline-block">
                Get Started
              </a>
            </motion.div>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-900 p-2 rounded-full hover:bg-slate-200 transition-colors menu-toggle-btn">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.8 }}
            onDragEnd={(e, info) => {
              if (info.offset.x > 80 || info.velocity.x > 300) {
                setIsOpen(false);
              }
            }}
            className="fixed inset-0 z-40 bg-slate-100 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden cursor-pointer touch-pan-y"
          >
            {/* Ambient subtle glow light */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#4f46e5]/5 blur-[120px] pointer-events-none" />
            
            <motion.nav 
              ref={menuRef}
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.15 }
                },
                closed: {
                  transition: { staggerChildren: 0.04, staggerDirection: -1 }
                }
              }}
              className="flex flex-col gap-6 text-center z-10 cursor-default"
            >
              {links.map((link) => {
                const isAnchor = link.path.startsWith('/#');
                
                const itemVariants = {
                  open: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 120, damping: 14 } },
                  closed: { opacity: 0, y: 25, scale: 0.95, transition: { duration: 0.2 } }
                };

                return (
                  <motion.div
                    key={link.name}
                    variants={itemVariants}
                    className="overflow-hidden py-1"
                  >
                    {isAnchor ? (
                      <a
                        href={link.path}
                        className={`font-display text-4xl sm:text-5xl font-medium tracking-tight hover:text-[#4f46e5] transition-colors ${
                          location.hash === link.path.substring(1) ? 'text-[#4f46e5]' : 'text-gray-700'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className={`font-display text-3xl sm:text-4xl font-medium tracking-tight hover:text-[#4f46e5] transition-colors ${
                          location.pathname === link.path ? 'text-[#4f46e5]' : 'text-gray-700'
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
                  open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.45 } },
                  closed: { opacity: 0, y: 25 }
                }}
                className="mt-8 flex flex-col items-center gap-4"
              >
                
                <a 
                  href={location.pathname === '/' ? '#pricing' : '/#pricing'} 
                  onClick={() => setIsOpen(false)}
                  className="inline-flex text-[10px] font-mono font-bold text-[#0A0F1C] bg-[#4f46e5] px-8 py-3.5 rounded-full hover:bg-[#c2e600] transition-colors tracking-wider uppercase w-full justify-center"
                >
                  Get Started
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
