'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Cpu, 
  Layers, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Clock,
  Coins
} from 'lucide-react';

const SERVICES = [
  {
    id: "landing-page-kilat",
    number: "01",
    title: "Next-Gen Web Architecture",
    tagline: "Kecepatan Muat Sub-Detik (< 0.2s)",
    description: "Website dan landing page kelas atas yang dimuat secara instan tanpa jeda loading. Dirancang untuk mengunci perhatian calon pelanggan beranggaran besar dan memaksimalkan konversi iklan di detik pertama.",
    outcomes: [
      "Performa loading instan (< 0.2s) di semua jaringan seluler",
      "Struktur visual Apple-grade eksklusif tanpa template generik",
      "Formulir konversi terintegrasi langsung ke WhatsApp sales"
    ],
    metricBadge: "Konversi Iklan Maksimal",
    icon: Zap,
    ctaMessage: "Halo Mas Chesta, kami tertarik membangun Next-Gen Web Architecture yang super cepat untuk bisnis kami."
  },
  {
    id: "autonomous-sales-agent",
    number: "02",
    title: "Autonomous Sales Assistant",
    tagline: "Asisten Cerdas Otonom 24/7",
    description: "Sistem cerdas mandiri yang melayani pelanggan tanpa kenal lelah. Otomatis menjawab pertanyaan spesifikasi produk, menyaring prospek paling siap beli, dan mengantarkannya langsung ke rekening perusahaan.",
    outcomes: [
      "Respon instan 24 jam sehari tanpa biaya lembur staf malam",
      "Kualifikasi lead otomatis untuk memisahkan buyer serius vs iseng",
      "Pangkas biaya operasional gaji admin hingga puluhan juta"
    ],
    metricBadge: "Pangkas Beban Gaji Admin",
    icon: Cpu,
    ctaMessage: "Halo Mas Chesta, kami ingin mengintegrasikan Autonomous Sales Assistant 24/7 untuk menangani prospek kami."
  },
  {
    id: "database-integration",
    number: "03",
    title: "Zero-Error Data Integration",
    tagline: "Sistem Otomatis Tanpa Salah Rekap",
    description: "Otomatisasi total alur pesanan dari hulu ke hilir. Menghilangkan kesalahan manusia dalam mencatat nominal, tipe pesanan, dan alamat kirim. Sinkronisasi instan antara katalog, pesanan, dan keuangan.",
    outcomes: [
      "100% akurasi pencatatan data pesanan (Nol salah kirim)",
      "Sinkronisasi real-time antara gudang, sales, dan finance",
      "Laporan penjualan rapi otomatis tanpa input spreadsheet ganda"
    ],
    metricBadge: "Nol Risiko Human-Error",
    icon: Layers,
    ctaMessage: "Halo Mas Chesta, kami butuh sistem Zero-Error Data Integration untuk menghentikan salah input pesanan."
  },
  {
    id: "enterprise-ecosystem",
    number: "04",
    title: "Custom Corporate Ecosystem",
    tagline: "100% Hak Milik Aset Perusahaan",
    description: "Ekosistem digital independen yang dibangun khusus sesuai SOP operasional perusahaan Anda. Dilengkapi kontrol multi-user, panel kelola internal, dan kepemilikan penuh tanpa biaya sewa platform bulanan.",
    outcomes: [
      "Seluruh kode sumber dan sistem 100% mutlak milik Anda selamanya",
      "Nol biaya langganan bulanan platform pihak ketiga",
      "Manajemen hak akses bertingkat (Direksi, Manajer, Staf)"
    ],
    metricBadge: "Bebas Biaya Sewa Bulanan",
    icon: Building2,
    ctaMessage: "Halo Mas Chesta, kami ingin konsultasi pembangunan Custom Corporate Ecosystem yang 100% hak milik kami."
  }
];

export default function CoreServicesGrid() {
  return (
    <section className="py-16 md:py-20 relative bg-transparent overflow-hidden" id="services">
      {/* Background spatial atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-200/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header with Elite Typographic Hierarchy */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="tracking-widest uppercase">KATALOG LAYANAN UTAMA</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 font-display leading-[1.08] text-balance">
            Arsitektur Solusi Bisnis Presisi Tinggi.
          </h2>

          <p className="text-slate-600 mt-5 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-balance">
            Solusi rekayasa digital modular yang dirancang untuk menghentikan inefisiensi manual, melipatgandakan kecepatan closing, dan mengamankan profitabilitas.
          </p>
        </div>

        {/* 2x2 High-End Glassmorphic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const waHref = `https://wa.me/6282125447232?text=${encodeURIComponent(service.ctaMessage)}`;

            return (
              <div
                key={service.id}
                className="rounded-[2.25rem] bg-white/70 backdrop-blur-xl border border-purple-100/60 hover:border-purple-300 p-8 sm:p-10 shadow-xl shadow-purple-900/5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-medium text-purple-900 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                        {service.number}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                        {service.tagline}
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-purple-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                      <Icon size={22} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl sm:text-3xl font-semibold font-display text-slate-900 tracking-tight leading-snug mb-3">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light mb-6">
                    {service.description}
                  </p>

                  {/* Key Operational Outcomes */}
                  <div className="space-y-3 pt-4 border-t border-purple-100/60 mb-8">
                    {service.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5" />
                        <span className="font-medium leading-tight">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Outcome Badge & Direct Consultation Trigger */}
                <div className="pt-6 border-t border-purple-100/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 self-start sm:self-auto">
                    <ShieldCheck size={13} className="text-emerald-600" />
                    <span>{service.metricBadge}</span>
                  </div>

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-purple-900 hover:text-purple-700 font-mono tracking-wider uppercase group/link transition-colors cursor-pointer"
                  >
                    <span>Konsultasi Layanan Ini</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform text-purple-600" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Executive Consultation Banner */}
        <div className="rounded-[2rem] bg-gradient-to-r from-purple-950 via-slate-950 to-purple-950 border border-purple-800/50 p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="text-left max-w-2xl">
            <h4 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-white mb-2">
              Butuh Kombinasi Solusi Khusus Sesuai SOP Perusahaan Anda?
            </h4>
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Diskusikan langsung dengan Principal Architect kami. Kami memetakan kebutuhan sistem dan menghitung efisiensi anggaran tanpa komitmen di awal.
            </p>
          </div>

          <a
            href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20kami%20ingin%20konsultasi%20kustomisasi%20arsitektur%20solusi%20untuk%20perusahaan%20kami."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold text-sm shadow-[0_12px_32px_-8px_rgba(147,51,234,0.5)] transition-all shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-3"
          >
            <span>Jadwalkan Konsultasi Khusus</span>
            <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}
