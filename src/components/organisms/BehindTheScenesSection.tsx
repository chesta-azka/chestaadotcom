import React from 'react';
import { ArrowRight, Sparkles, Shield, Cpu, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function BehindTheScenesSection() {
  return (
    <section 
      className="py-20 sm:py-28 w-full bg-slate-50/60 text-slate-900 border-t border-slate-200/80 relative overflow-hidden text-left" 
      id="di-balik-layar"
      aria-label="Di balik layar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        
        {/* Section Header: Fully Left-Aligned, Editorial Typographic Power */}
        <div className="max-w-4xl space-y-4 mb-14 sm:mb-16 text-left">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-purple-700 uppercase">
              02 — Di balik layar
            </span>
            <span className="w-12 h-px bg-purple-200" aria-hidden="true" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            Perubahan nyata yang terasa<br />
            dalam pekerjaan sehari-hari.
          </h2>

          <p className="text-base sm:text-lg font-sans text-slate-600 leading-relaxed font-normal pt-1 max-w-3xl">
            Solusi digital dan AI kami dibangun bukan untuk memperumit, melainkan mempercepat eksekusi operasional tim Anda dengan keandalan tanpa kompromi.
          </p>
        </div>

        {/* Visual Architecture Showcase Cards with Imagery and Smooth Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-sm hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300"
          >
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
                alt="Arsitektur Multi-Agent & RAG Pipeline"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
              
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-400/30 text-purple-200 text-xs font-mono font-semibold flex items-center gap-1.5">
                <Cpu size={12} className="text-purple-400" />
                <span>RAG & Multi-Agent Architecture</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg sm:text-xl font-bold font-display">
                  Sistem AI Terisolasi Tanpa Kebocoran Data
                </h3>
                <p className="text-xs text-purple-200 mt-1 line-clamp-2">
                  Memproses dokumen internal perusahaan secara eksklusif dengan privasi enterprise dan jalur eskalasi akurat.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Teknologi: OpenAI / Claude + Vector DB</span>
                <span className="text-purple-700 font-bold">Latency &lt; 400ms</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-sm hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300"
          >
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop"
                alt="Infrastruktur Edge Caching & Database Real-Time"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
              
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-400/30 text-purple-200 text-xs font-mono font-semibold flex items-center gap-1.5">
                <Activity size={12} className="text-emerald-400" />
                <span>Next.js 15 Edge SSR Engine</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg sm:text-xl font-bold font-display">
                  Rendering Sub-Detik Skala Korporat
                </h3>
                <p className="text-xs text-purple-200 mt-1 line-clamp-2">
                  Arsitektur zero-bloat tanpa plugin lambat, menjamin Core Web Vitals 100/100 dan konversi maksimal.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Infrastruktur: Cloudflare Edge + PostgreSQL</span>
                <span className="text-emerald-600 font-bold">Uptime 99.98%</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 Pillars: 01, 02, 03, 04 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-t border-slate-200/80 pt-6 sm:pt-8 text-left">
          
          <div className="text-left space-y-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 block">
              01
            </span>
            <p className="text-sm sm:text-base font-medium text-slate-900 tracking-normal leading-relaxed">
              Proses lebih sederhana — kurangi pekerjaan berulang.
            </p>
          </div>

          <div className="text-left space-y-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 block">
              02
            </span>
            <p className="text-sm sm:text-base font-medium text-slate-900 tracking-normal leading-relaxed">
              Informasi saling terhubung — data selaras dan mudah ditemukan.
            </p>
          </div>

          <div className="text-left space-y-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 block">
              03
            </span>
            <p className="text-sm sm:text-base font-medium text-slate-900 tracking-normal leading-relaxed">
              Keputusan lebih jelas — kondisi bisnis mudah dipantau.
            </p>
          </div>

          <div className="text-left space-y-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 block">
              04
            </span>
            <p className="text-sm sm:text-base font-medium text-slate-900 tracking-normal leading-relaxed">
              Siap mengikuti perkembangan — sistem dikembangkan sesuai kebutuhan.
            </p>
          </div>

        </div>

        {/* Link / CTA */}
        <div className="pt-10 sm:pt-14 text-left">
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-slate-950 hover:text-purple-700 transition-colors group cursor-pointer"
          >
            <span>Kenali seluruh arsitektur solusi kami</span>
            <ArrowRight size={16} className="text-purple-700 group-hover:translate-x-1.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
