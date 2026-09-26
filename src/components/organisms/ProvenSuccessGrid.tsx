'use client';

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Quote, Star, ArrowRight, ShieldCheck, Clock, Zap } from 'lucide-react';

const SUCCESS_STORIES = [
  {
    client: "Distributor Logistik Korporat (BSD City)",
    category: "Otomasi Operasional & Logistik",
    primaryMetric: "3.4x",
    primaryLabel: "Kapasitas Proses Pesanan Harian",
    secondaryHighlight: "Pangkas 120+ Jam Kerja Lembur/Bulan",
    description: "Sebelumnya admin kewalahan mencatat pesanan manual via chat. Setelah menggunakan sistem otomatis anti-salah input, error pencatatan turun 0% dan pesanan diproses 5x lebih cepat.",
    quote: "Sistem dari CHESTAADOTCOM mengubah total efisiensi kantor kami. Tidak ada lagi selisih stok atau admin salah input harga.",
    author: "Bapak Haryanto, Direktur Operasional",
    icon: Clock
  },
  {
    client: "Klinik Estetika & Skincare (Jakarta Selatan)",
    category: "Sistem Booking & AI Assistant",
    primaryMetric: "24/7",
    primaryLabel: "Respon Pelanggan & Booking Otonom",
    secondaryHighlight: "Nol Biaya Tambahan Staf CS Malam",
    description: "Asisten AI otonom menjawab konsultasi produk dan melakukan booking jadwal pasien bahkan di tengah malam, melipatgandakan jumlah lead masuk tanpa menambah staf CS.",
    quote: "Pasien sangat terbantu dengan sistem tanya-jawab otomatis yang akurat. Konversi janji temu klinik meningkat drastis.",
    author: "Dr. Melinda, Founder & Medical Lead",
    icon: ShieldCheck
  },
  {
    client: "E-Commerce Fashion Wholesale (Tangerang)",
    category: "Mesin Penjualan Kilat & Katalog",
    primaryMetric: "< 0.2s",
    primaryLabel: "Kecepatan Muat Akses Seluler",
    secondaryHighlight: "100% Bebas Biaya Sewa Platform Bulanan",
    description: "Memindahkan operasional dari platform sewaan bulanan yang lambat ke arsitektur web berperforma tinggi. Hasilnya, pengunjung langsung checkout tanpa kendala loading.",
    quote: "Paling puas karena hak milik kode 100% di tangan kami. Tidak ada lagi tagihan langganan agensi yang mencekik setiap bulan.",
    author: "Ibu Siska, Head of Marketing",
    icon: Zap
  },
  {
    client: "Manufaktur Komponen Otomotif (Cikarang)",
    category: "Sistem Inventaris Real-Time",
    primaryMetric: "Nol",
    primaryLabel: "Kesalahan Input Data & Selisih Stok",
    secondaryHighlight: "Sinkronisasi Gudang & Finance Instan",
    description: "Otomatisasi sinkronisasi antara gudang dan finance. Tidak ada lagi tumpang tindih data atau keterlambatan laporan akhir bulan.",
    quote: "Investasi terbaik tahun ini. Efisiensi tim naik tajam karena tidak perlu lagi rekap data manual berjam-jam.",
    author: "Bapak Surya, Direktur Utama",
    icon: ShieldCheck
  }
];

export default function ProvenSuccessGrid() {
  const whatsappUrl = "https://wa.me/6282125447232?text=" + encodeURIComponent("Halo Mas Chesta, kami ingin mendiskusikan studi kasus sukses serupa untuk peningkatan omset bisnis kami.");

  return (
    <section className="py-16 md:py-20 relative bg-slate-50/50 border-t border-purple-100/60 overflow-hidden" id="proven-success">
      {/* Background Spatial Atmosphere */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[400px] bg-purple-200/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header with Extreme Typographic Hierarchy */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold mb-4 shadow-sm">
            <TrendingUp className="w-4 h-4 text-purple-600 animate-pulse" />
            <span className="tracking-widest uppercase">BUKTI KELAS DUNIA &amp; KLIEN SUKSES</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight font-display text-slate-900 leading-[1.1] text-balance">
            Hasil Nyata: Efisiensi &amp; Dominasi Pasar.
          </h2>
          
          <p className="text-slate-600 mt-5 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-balance">
            Studi kasus otentik dari perusahaan yang menghentikan inefisiensi manual dan beralih ke arsitektur otonom.
          </p>
        </div>

        {/* High-End Masonry / Overlapping Grid with Stark Typographic Contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14 items-stretch">
          {SUCCESS_STORIES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 sm:p-10 rounded-[2.25rem] bg-white/70 backdrop-blur-xl border border-purple-100/50 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group shadow-xl shadow-purple-900/5 hover:shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono font-bold text-purple-800 uppercase bg-purple-50 px-3.5 py-1 rounded-full border border-purple-100">
                      {item.category}
                    </span>
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  {/* Stark Typographic Contrast: Operational Outcome Callout */}
                  <div className="mb-6 pb-6 border-b border-purple-100/60">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-4xl sm:text-5xl font-display font-black text-purple-950 tracking-tighter">
                        {item.primaryMetric}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      {item.primaryLabel}
                    </div>
                    <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      <Icon size={12} className="text-emerald-600" />
                      <span>{item.secondaryHighlight}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-black text-slate-900 mb-3 tracking-tight">
                    {item.client}
                  </h3>
                  <p className="text-sm text-slate-600 font-sans font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-purple-100/60">
                  <div className="flex items-start gap-3">
                    <Quote size={20} className="text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm italic text-slate-700 font-medium mb-2 leading-relaxed">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <p className="text-[11px] font-bold text-slate-900 font-mono uppercase tracking-wider">
                        {item.author}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* High-Contrast Centered CTA */}
        <div className="text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-purple-900 hover:bg-purple-800 text-white font-sans font-bold text-sm transition-all shadow-[0_12px_32px_-8px_rgba(88,28,135,0.4)] group cursor-pointer"
          >
            <span>Ingin Hasil Serupa? Diskusikan Proyek Anda</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
