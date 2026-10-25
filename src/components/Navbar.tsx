"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'Beranda', desc: 'Halaman utama CHESTAADOTCOM', href: '/' },
  { label: 'Layanan', desc: 'Website, AI Agent, Software Custom & Otomasi', href: '/layanan' },
  { label: 'Portofolio', desc: 'Proyek yang sudah kami bangun', href: '/portfolio' },
  { label: 'Studi Kasus', desc: 'Cerita di balik proyeknya', href: '/case-studies' },
  { label: 'Cara Kerja', desc: 'Tahapan kerja dari diskusi sampai rilis', href: '/#cara-kerja' },
  { label: 'Harga', desc: 'Estimasi investasi dan paket layanan', href: '/#harga' },
  { label: 'Blog', desc: 'Catatan praktis seputar sistem dan AI', href: '/blog' },
  { label: 'Tentang Kami', desc: 'Profil tim & prinsip kerja kami', href: '/about' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-5 md:px-8 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-4'
      }`}
    >
      <div className="w-full max-w-[1120px] flex items-center justify-between font-sans transition-all duration-300 px-5 md:px-6 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(23,18,43,0.06)] border border-[rgba(91,60,196,0.14)]">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2.5 min-h-[44px]"
        >
          <div className="w-8 h-8 relative rounded-xl overflow-hidden border border-purple-100 bg-white">
            <Image
              src="/chesta.png"
              alt="Chestaa Logo"
              fill
              className="object-contain p-1"
              priority
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-[15px] font-display font-semibold tracking-tight text-[#17122B]">
            CHESTAADOTCOM
          </span>
        </Link>

        {/* Clean Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center w-11 h-11 text-[#17122B] hover:text-[#6A3FD0] transition-colors cursor-pointer bg-transparent border-0 p-0 focus:outline-hidden"
          aria-label={menuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          aria-expanded={menuOpen}
        >
          <div className="relative w-6 h-5 flex flex-col justify-between items-end">
            <span
              className={`block h-[2px] bg-current rounded-full transition-transform duration-200 origin-center ${
                menuOpen ? 'w-6 translate-y-[9px] rotate-45' : 'w-6'
              }`}
            />
            <span
              className={`block h-[2px] bg-current rounded-full transition-opacity duration-200 ${
                menuOpen ? 'opacity-0 w-6' : 'w-4'
              }`}
            />
            <span
              className={`block h-[2px] bg-current rounded-full transition-transform duration-200 origin-center ${
                menuOpen ? 'w-6 -translate-y-[9px] -rotate-45' : 'w-5'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Hamburger Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-[1120px] mt-2.5 bg-white/95 backdrop-blur-xl rounded-[24px] p-5 md:p-7 shadow-[0_20px_50px_-12px_rgba(23,18,43,0.12)] border border-[rgba(91,60,196,0.14)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group p-4 rounded-[18px] bg-[#F8F6FE]/60 hover:bg-[#F8F6FE] border border-transparent hover:border-[rgba(91,60,196,0.14)] transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-display text-[15px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0]">
                      {item.label}
                    </span>
                    <ArrowUpRight size={16} className="text-[#5B5675] group-hover:text-[#6A3FD0]" />
                  </div>
                  <p className="text-[12.5px] text-[#5B5675] leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-[rgba(91,60,196,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                BSD City · Tangerang Selatan · Jabodetabek
              </p>
              <a
                href="https://wa.me/6282125447232?text=Halo%20Chesta%20%26%20Zeeshan%2C%20saya%20ingin%20konsultasi%20gratis."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#6A3FD0] hover:text-[#5B35B5] transition-colors"
              >
                <MessageCircle size={15} />
                <span>Diskusi via WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
