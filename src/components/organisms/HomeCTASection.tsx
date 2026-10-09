'use client';

import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useAuditCtaTracker } from '../../hooks/useAuditCtaTracker';

const WHATSAPP_CONSULT_URL =
  'https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20digital%20dan%20audit%20sistem%20bisnis%20kami.';

export default function HomeCTASection() {
  const { trackAuditClick } = useAuditCtaTracker();

  const handleAuditClick = () => {
    trackAuditClick({
      serviceTitle: 'Beranda Konsultasi & Audit Gratis',
      serviceSlug: 'home-audit-konsultasi',
      ctaText: 'Dapatkan Audit & Konsultasi Gratis',
      href: WHATSAPP_CONSULT_URL,
    });
  };

  return (
    <section 
      className="py-20 sm:py-28 w-full bg-slate-950 text-white relative overflow-hidden text-left" 
      id="cta"
      aria-label="Konsultasi dan Audit Gratis"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        
        {/* Section Header: Fully Left-Aligned Editorial Architecture */}
        <div className="max-w-4xl space-y-4 mb-12 sm:mb-14 text-left">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-purple-400 uppercase">
              LANGKAH SELANJUTNYA
            </span>
            <span className="w-12 h-px bg-purple-500/30" aria-hidden="true" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.12]">
            Diskusikan kebutuhan bisnis Anda<br className="hidden sm:inline" /> bersama kami.
          </h2>

          <p className="text-base sm:text-lg font-sans text-slate-300 leading-relaxed font-normal pt-1 max-w-3xl">
            Ceritakan proses kerja dan target yang ingin dicapai perusahaan Anda. Kami bantu memetakan prioritas serta menyusun pendekatan digital yang paling realistis dan terukur.
          </p>
        </div>

        {/* Action Buttons & Value Assurance */}
        <div className="border-t border-white/10 pt-8 sm:pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            {/* Primary Action Button equipped with the audit tracking hook */}
            <a
              href={WHATSAPP_CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleAuditClick}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold tracking-wide transition-all shadow-lg shadow-purple-900/30 cursor-pointer"
            >
              <MessageCircle size={18} />
              <span>Dapatkan Audit &amp; Konsultasi Gratis</span>
              <ArrowRight size={16} />
            </a>

            {/* Direct WhatsApp Chat Action */}
            <a
              href="https://wa.me/6282125447232"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>Hubungi via WhatsApp Langsung</span>
            </a>
          </div>

          {/* Reassurance text */}
          <div className="text-left sm:text-right">
            <span className="text-xs font-mono text-slate-400 block">
              Respons cepat &bull; Diskusi langsung dengan arsitek sistem
            </span>
            <span className="text-[11px] font-sans text-slate-500 block mt-1">
              Tanpa komitmen &bull; Kerahasiaan data bisnis terjamin
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
