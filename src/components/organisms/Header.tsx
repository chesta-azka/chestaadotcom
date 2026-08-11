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
          className="bg-white/[0.03] backdrop-blur-2xl border border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl pointer-events-auto"
        >
          <Link to="/" className="flex items-center gap-2.5 group select-none pointer-events-auto">
            {/* Elegant Geometric Architectural Emblem */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 group-hover:border-[#4f46e5]/40 transition-colors duration-300">
              <svg className="w-4 h-4 text-[#4f46e5] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-8 8 8 8 8-8-8-8z" />
                <path d="m12 8-4 4 4 4 4-4-4-4z" />
              </svg>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#4f46e5] to-green-400 opacity-0 group-hover:opacity-10 blur-sm transition-opacity duration-300" />
            </div>
            
            <div className="flex flex-col text-left">
              <span className="font-display text-base font-extrabold tracking-tight text-gray-900 leading-none">
                chestaa<span className="text-[#4f46e5]">dot</span>com
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1 h-1 rounded-full bg-[#4f46e5] animate-pulse" />
                <span className="font-mono text-[7px] tracking-[0.2em] text-gray-500 uppercase leading-none">
                  Digital Architect v2.6
                </span>
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
            {links.map((link) => {
              const isAnchor = link.path.startsWith('/#');
              return (
                <motion.div key={link.name} whileHover={{ y: -1 }}>
                  {isAnchor ? (
                    <a
                      href={location.pathname === '/' ? link.path.substring(1) : link.path}
                      className="font-sans text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="font-sans text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <a href={location.pathname === '/' ? '#pricing' : '/#pricing'} className="text-sm font-sans font-medium text-[#0A0F1C] bg-[#4f46e5] px-5 py-2.5 rounded-full hover:bg-[#c2e600] transition-colors">
              Get Started
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-900 p-2 rounded-full hover:bg-gray-200 transition-colors menu-toggle-btn">
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
            className="fixed inset-0 z-40 bg-gray-100 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden cursor-pointer touch-pan-y"
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
