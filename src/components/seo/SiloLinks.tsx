import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';

interface SiloLinksProps {
  currentService?: string;
  currentLocation?: string;
}

export default function SiloLinks({ currentService = 'agency-ai', currentLocation = 'cikarang-dry-port' }: SiloLinksProps) {
  const siloLinks = [
    { title: 'Konsultan IT & AI Enterprise di Kawasan Industri MM2100', href: '/services/ai-integration' },
    { title: 'Jasa Pembuatan ERP Kustom di Jababeka Cikarang', href: '/services/infrastruktur-digital-enterprise' },
    { title: 'Agency AI & Otomatisasi Workflow di KIIC Karawang', href: '/services/karyawan-digital-ai' },
    { title: 'Headless E-Commerce B2B di EJIP Cikarang', href: '/services/toko-online-otonom' },
    { title: 'Dominasi SEO & AEO Korporat di GIIC Kota Deltamas', href: '/services/dominasi-pencarian-seo-aeo' },
    { title: 'Audit Keamanan Siber Pabrik di Suryacipta Karawang', href: '/services/security-audit' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-16 p-6 sm:p-10 rounded-3xl bg-slate-900 text-white font-sans text-left shadow-2xl">
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-mono uppercase tracking-wider">
          <Globe size={14} className="text-purple-400" />
          <span>PROGRAMMATIC SEO SILO • CHESTAADOTCOM</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
          Jaringan Infrastruktur &amp; Solusi Terkait Koridor Industri
        </h3>
        <p className="text-slate-300 text-sm">
          Akses langsung ke pangkalan data arsitektur digital dan otomatisasi AI di berbagai kawasan industri strategis.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {siloLinks.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="p-5 rounded-2xl bg-slate-800/80 hover:bg-purple-900/40 border border-slate-700/80 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between space-y-3 group cursor-pointer"
          >
            <span className="text-xs font-mono text-purple-400">Arsitektur Terverifikasi</span>
            <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-white leading-snug">
              {link.title}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-300 group-hover:text-purple-200">
              <span>Eksplorasi Solusi</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
