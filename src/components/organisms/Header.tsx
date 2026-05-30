import { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/#work' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'Blog', path: '/blog' }
  ];

  return (
    <>
      {/* Floating Header */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
          className="bg-[#0D111A]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl pointer-events-auto"
        >
          <Link to="/" className="flex items-center gap-2.5 group select-none pointer-events-auto">
            {/* Elegant Geometric Architectural Emblem */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#131825] border border-white/10 group-hover:border-[#D4FF00]/40 transition-colors duration-300">
              <svg className="w-4 h-4 text-[#D4FF00] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-8 8 8 8 8-8-8-8z" />
                <path d="m12 8-4 4 4 4 4-4-4-4z" />
              </svg>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#D4FF00] to-green-400 opacity-0 group-hover:opacity-10 blur-sm transition-opacity duration-300" />
            </div>
            
            <div className="flex flex-col text-left">
              <span className="font-display text-base font-extrabold tracking-tight text-white leading-none">
                chestaa<span className="text-[#D4FF00]">.</span>com
              </span>
              <span className="font-mono text-[7px] tracking-[0.2em] text-gray-500 uppercase leading-none mt-1">
                Digital Architect
              </span>
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
                      className="font-sans text-sm font-medium text-gray-300 transition-colors hover:text-white"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="font-sans text-sm font-medium text-gray-300 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </nav>
          
          <div className="hidden md:block">
            <a href={location.pathname === '/' ? '#pricing' : '/#pricing'} className="text-sm font-sans font-medium text-[#0A0F1C] bg-[#D4FF00] px-5 py-2.5 rounded-full hover:bg-[#c2e600] transition-colors">
              Get Started
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </header>

      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed inset-0 z-40 bg-[#06080F]/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
      >
        <nav className="flex flex-col gap-8 text-center">
          {links.map((link) => {
             const isAnchor = link.path.startsWith('/#');
             return isAnchor ? (
              <a
                key={link.name}
                href={link.path}
                className="font-display text-4xl font-medium text-white tracking-tighter"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
             ) : (
              <Link
                key={link.name}
                to={link.path}
                className="font-display text-4xl font-medium text-white tracking-tighter"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
             )
          })}
        </nav>
      </motion.div>
    </>
  );
}
