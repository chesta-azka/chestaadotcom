"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Shield, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

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
          ? 'py-3 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between font-sans">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-purple-900 rounded-xl flex items-center justify-center shadow-xs">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <Link href="/">
            <span className="text-lg font-display font-extrabold tracking-tight text-slate-900">
              CHESTADOTCOM
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-600">
          <Link href="/" className="hover:text-purple-900 transition-colors">Beranda</Link>
          <Link href="/case-studies" className="hover:text-purple-900 transition-colors">Studi Kasus</Link>
          <a href="#pricing" className="hover:text-purple-900 transition-colors">Paket Promo</a>
        </nav>

        <div className="flex items-center gap-3">
          <a 
            href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta!%20Saya%20ingin%20konsultasi%20pembuatan%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white font-sans text-xs font-semibold rounded-full shadow-xs transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle size={14} />
            <span>Chat WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
