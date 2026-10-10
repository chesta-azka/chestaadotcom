"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Shield, MessageCircle, Menu, X, ArrowRight, Sparkles, Layers, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES_DATA } from '../data/servicesData';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        setMobileMenuOpen(false);
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
    <>
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
            ? 'px-5 sm:px-6 md:px-8 py-3 bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-200/80 w-[94%] md:w-[90%]' 
            : 'px-5 sm:px-6 md:px-12 bg-transparent'
        }`}>
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              onClick={() => { setServicesOpen(false); setMobileMenuOpen(false); }} 
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 relative rounded-xl overflow-hidden shadow-xs border border-purple-100 bg-white">
                <Image 
                  src="/chesta.png" 
                  alt="Chestaa Logo" 
                  fill 
                  className="object-contain p-1"
                  priority
                />
              </div>
              <span className="text-lg font-display font-bold tracking-tight text-slate-950">
                CHESTA<span className="text-purple-600">A</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-600">
            <Link 
              href="/" 
              onClick={() => setServicesOpen(false)} 
              className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-700 transition-colors"
            >
              Beranda
            </Link>
            
            {/* Dropdown Layanan */}
            <div 
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                onClick={() => setServicesOpen(false)}
                className={`px-4 py-2 rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                  servicesOpen ? 'bg-slate-100 text-purple-700 font-semibold' : 'hover:bg-slate-100 hover:text-purple-700'
                }`}
                onMouseEnter={handleMouseEnter}
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
              </Link>
              
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-84 z-50 pointer-events-auto"
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 flex flex-col gap-1 max-h-[440px] overflow-y-auto no-scrollbar">
                      <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-50 rounded-lg mb-1 flex items-center justify-between">
                        <span>Solusi Enterprise</span>
                        <span className="text-purple-500">{Object.keys(SERVICES_DATA).length} modul</span>
                      </div>
                      {Object.entries(SERVICES_DATA).map(([key, data]) => (
                        <Link 
                          key={key}
                          href={`/services/${key}`} 
                          onClick={() => setServicesOpen(false)} 
                          className="px-3.5 py-2.5 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition-colors text-slate-700 block border border-transparent hover:border-purple-200 group"
                        >
                          <div className="font-semibold text-xs text-slate-900 group-hover:text-purple-700 flex items-center justify-between">
                            <span>{data.title}</span>
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-600" />
                          </div>
                          <div className="text-[11px] font-normal text-slate-500 mt-0.5 line-clamp-1">{data.subtitle}</div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/case-studies" 
              onClick={() => setServicesOpen(false)} 
              className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-700 transition-colors"
            >
              Studi Kasus
            </Link>
            <a 
              href="#pricing" 
              onClick={() => setServicesOpen(false)} 
              className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-700 transition-colors"
            >
              Paket Promo
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <a 
              href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta!%20Saya%20ingin%20konsultasi%20pembuatan%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4.5 py-2 bg-purple-900 hover:bg-purple-800 text-white font-sans text-xs sm:text-sm font-medium rounded-full shadow-xs border border-purple-800 transition-all cursor-pointer"
            >
              <MessageCircle size={14} />
              <span>Konsultasi</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-700 hover:text-purple-700 hover:bg-slate-100 transition-colors border border-slate-200 focus:outline-hidden"
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white mx-4 mt-20 rounded-3xl p-5 shadow-2xl border border-slate-200/90 max-h-[82vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 relative rounded-lg overflow-hidden border border-purple-100 bg-white">
                    <Image src="/chesta.png" alt="Chestaa Logo" fill className="object-contain p-0.5" />
                  </div>
                  <span className="text-sm font-bold tracking-tight text-slate-950 font-display">
                    CHESTA<span className="text-purple-600">A</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Links */}
              <div className="flex flex-col gap-1 mb-4">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between"
                >
                  <span>Beranda</span>
                  <ArrowRight size={14} className="text-slate-400" />
                </Link>
                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between"
                >
                  <span>Katalog Semua Layanan</span>
                  <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md font-semibold font-mono">
                    {Object.keys(SERVICES_DATA).length} Solusi
                  </span>
                </Link>
                <Link
                  href="/case-studies"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between"
                >
                  <span>Studi Kasus & Hasil ROI</span>
                  <ArrowRight size={14} className="text-slate-400" />
                </Link>
              </div>

              {/* Quick Services List */}
              <div className="pt-3 border-t border-slate-100">
                <div className="text-[10px] font-mono uppercase tracking-wider text-purple-700 font-bold px-3 mb-2 flex items-center gap-1.5">
                  <Sparkles size={11} />
                  <span>Jelajahi Solusi Unggulan</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5 max-h-[220px] overflow-y-auto pr-1">
                  {Object.entries(SERVICES_DATA).slice(0, 8).map(([key, data]) => (
                    <Link
                      key={key}
                      href={`/services/${key}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50/80 border border-slate-100 hover:border-purple-200 transition-all block"
                    >
                      <div className="font-semibold text-xs text-slate-900">{data.title}</div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">{data.subtitle}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <a
                  href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta!%20Saya%20ingin%20konsultasi%20pembuatan%20website."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-900 hover:bg-purple-800 text-white rounded-2xl text-xs font-semibold shadow-xs transition-colors"
                >
                  <MessageCircle size={15} />
                  <span>Konsultasi Langsung via WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
