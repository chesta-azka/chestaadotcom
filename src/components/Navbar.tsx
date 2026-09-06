"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Shield, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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
          <div className="w-9 h-9 bg-purple-900 rounded-xl flex items-center justify-center shadow-xs">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <Link to="/">
            <span className="text-lg font-display font-extrabold tracking-tight text-slate-900">
              CHESTADOTCOM
            </span>
          </Link>
        </div>

                <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600">
          <Link to="/" className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-900 transition-colors">Beranda</Link>
          
          {/* Dropdown Layanan */}
          <div className="relative group">
            <button className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-900 transition-colors flex items-center gap-1">
              Layanan
              <svg className="w-4 h-4 text-slate-400 group-hover:text-purple-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left group-hover:translate-y-0 translate-y-2 z-50">
              <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 p-2 flex flex-col gap-1">
                <Link to="/#services-web" className="px-4 py-2.5 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition-colors text-slate-600 block">
                  <div className="font-semibold text-sm">Web Development</div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">Pembuatan Website Next.js</div>
                </Link>
                <Link to="/#services-mobile" className="px-4 py-2.5 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition-colors text-slate-600 block">
                  <div className="font-semibold text-sm">Mobile Apps</div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">iOS & Android React Native</div>
                </Link>
                <Link to="/#services-ai" className="px-4 py-2.5 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition-colors text-slate-600 block">
                  <div className="font-semibold text-sm">AI Integration</div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">Otomatisasi dengan Google Gemini</div>
                </Link>
                <Link to="/#services-uiux" className="px-4 py-2.5 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition-colors text-slate-600 block">
                  <div className="font-semibold text-sm">UI/UX Design</div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">Desain antarmuka modern & premium</div>
                </Link>
              </div>
            </div>
          </div>

          <Link to="/case-studies" className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-900 transition-colors">Studi Kasus</Link>
          <a href="#pricing" className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-900 transition-colors">Paket Promo</a>
        </nav>

        <div className="flex items-center gap-3">
          <a 
            href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta!%20Saya%20ingin%20konsultasi%20pembuatan%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-900 hover:bg-purple-800 text-white font-sans text-sm font-medium rounded-full shadow-sm hover:shadow transition-all"
          >
            <MessageCircle size={14} />
            <span>Chat WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
