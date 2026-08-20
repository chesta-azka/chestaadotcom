import { motion } from 'motion/react';
import { ArrowRight, Bot, TrendingUp, Clock, Users } from 'lucide-react';
import LazyImage from '../atoms/LazyImage';

const CASE_STUDIES = [
  {
    id: "ai-cs-1",
    title: "Otomatisasi Customer Service 24/7",
    client: "RetailFashion ID",
    description: "Implementasi Agen AI untuk menangani 1.000+ chat pelanggan per hari, memberikan respon instan dan akurat seputar stok, pengiriman, dan retur.",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=800&auto=format&fit=crop",
    metrics: [
      { label: "Waktu Respon", before: "45 Menit", after: "Instan (< 2d)", icon: Clock },
      { label: "Kepuasan (CSAT)", before: "3.2 / 5", after: "4.8 / 5", icon: Users },
      { label: "Konversi Sales", before: "2.1%", after: "5.4%", icon: TrendingUp },
    ]
  },
  {
    id: "ai-cs-2",
    title: "Sistem Manajemen Inventaris AI",
    client: "GudangLokal",
    description: "Penggunaan algoritma AI prediktif untuk membaca tren penjualan dan mengotomatiskan pesanan stok ulang sebelum barang habis.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    metrics: [
      { label: "Stok Habis (Out-of-stock)", before: "15%", after: "0.5%", icon: TrendingUp },
      { label: "Biaya Operasional", before: "Tinggi", after: "Turun 40%", icon: Clock },
      { label: "Akurasi Prediksi", before: "Manual", after: "98.5%", icon: Bot },
    ]
  }
];

export default function AICaseStudies() {
  return (
    <section className="py-24 border-t border-slate-100 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 md:mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-indigo-50 border border-indigo-100 mx-auto text-xs font-mono tracking-widest text-[#4f46e5] uppercase mb-6 shadow-sm">
            <Bot size={14} />
            <span>AI Agentic Transformation</span>
          </div>
          <h2 className="text-fluid-h2 font-display font-medium text-slate-900 tracking-tight mb-6">
            Solusi AI di Dunia Nyata
          </h2>
          <p className="text-slate-600 font-sans max-w-2xl mx-auto text-lg leading-relaxed">
            Lihat langsung bagaimana implementasi AI Agentic kami mengubah operasional bisnis manual menjadi ekosistem digital otomatis yang efisien dan akurat.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {CASE_STUDIES.map((study, index) => (
            <div 
              key={study.id}
              className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white aspect-[4/3] group">
                  <LazyImage 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6">
                     <span className="text-white/90 font-mono text-xs font-bold tracking-widest uppercase mb-1 block">Klien: {study.client}</span>
                     <h3 className="text-2xl font-display font-medium text-white">{study.title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 flex flex-col gap-8">
                <div>
                  <h3 className="text-3xl font-display font-medium text-slate-900 mb-4">{study.title}</h3>
                  <p className="text-slate-600 font-sans leading-relaxed text-lg">{study.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-100 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <metric.icon size={18} className="text-[#4f46e5] mb-4" />
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">{metric.label}</p>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-400 line-through decoration-red-400/50">Before: {metric.before}</span>
                        <span className="text-lg font-sans font-black text-slate-900">After: {metric.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div>
                  <a 
                    href="https://wa.me/6282125447232?text=Halo%20CHESTADOTCOM%2C%20saya%20tertarik%20dengan%20solusi%20AI%20seperti%20studi%20kasus%20di%20portfolio."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4f46e5] text-white font-sans font-bold text-sm hover:bg-indigo-700 transition-colors shadow-md"
                  >
                    Terapkan AI di Bisnis Anda <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
