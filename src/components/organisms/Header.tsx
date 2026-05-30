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
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-white flex items-center gap-2">
            CHESTA<span className="w-2 h-2 rounded-full bg-[#D4FF00]"></span>
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
