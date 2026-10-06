"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Shield, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/servicesData';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 180);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [scrolled]);

  return (
    <motion.header 
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3' 
          : 'py-5'
      }`}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between font-sans transition-all duration-300 ${
        scrolled 
          ? 'px-6 md:px-8 py-3 bg-white/95 backdrop-blur-md rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.08)] border border-slate-200/60 w-[95%] md:w-[90%]' 
          : 'px-6 md:px-12 bg-transparent'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-purple-900 rounded-xl flex items-center justify-center shadow-xs border border-purple-800">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <Link to="/" onClick={() => setServicesOpen(false)}>
            <span className="text-lg font-display font-medium tracking-tight text-slate-900">
              CHESTADOTCOM
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600">
          <Link to="/" onClick={() => setServicesOpen(false)} className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-700 transition-colors">Beranda</Link>
          
          {/* Dropdown Layanan - Contains ALL Service Pages */}
          <div 
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              type="button"
              onClick={() => setServicesOpen(prev => !prev)}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              className={`px-4 py-2 rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                servicesOpen ? 'bg-slate-100 text-purple-700' : 'hover:bg-slate-100 hover:text-purple-700'
              }`}
            >
              Layanan
              <svg 
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-purple-700' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu Listing All Service Pages */}
            <AnimatePresence>
              {servicesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-2 w-80 z-50 pointer-events-auto"
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 flex flex-col gap-1 max-h-[420px] overflow-y-auto no-scrollbar">
                    <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-50 rounded-lg mb-1">
                      Semua Layanan Enterprise ({Object.keys(SERVICES_DATA).length})
                    </div>
                    {Object.entries(SERVICES_DATA).map(([key, data]) => (
                      <Link 
                        key={key}
                        to={`/services/${key}`} 
                        onClick={() => setServicesOpen(false)} 
                        className="px-3.5 py-2.5 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition-colors text-slate-700 block border border-transparent hover:border-purple-200"
                      >
                        <div className="font-bold text-xs text-slate-900">{data.title}</div>
                        <div className="text-[11px] font-normal text-slate-500 mt-0.5 line-clamp-1">{data.subtitle}</div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/case-studies" onClick={() => setServicesOpen(false)} className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-700 transition-colors">Studi Kasus</Link>
          <a href="#pricing" onClick={() => setServicesOpen(false)} className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-700 transition-colors">Paket Promo</a>
        </nav>

        <div className="flex items-center gap-3">
          <a 
            href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta!%20Saya%20ingin%20konsultasi%20pembuatan%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-900 hover:bg-purple-800 text-white font-sans text-sm font-medium rounded-full shadow-xs border border-purple-800 transition-all cursor-pointer"
          >
            <MessageCircle size={14} />
            <span>Chat WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
