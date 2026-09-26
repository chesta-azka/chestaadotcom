import React from 'react';
import { motion } from 'motion/react';
import LazyImage from '../components/atoms/LazyImage';
import { BookOpen, Sparkles, TrendingUp, CheckCircle2, MessageSquare, Quote, Globe, Calendar, User, ArrowRight } from 'lucide-react';
import { Project } from '../data/projects';
import { Link } from 'react-router-dom';

interface CaseStudyLayoutProps {
  project: Project;
  walkthroughImages: string[];
  suggestedProjects: Project[];
}

export default function CaseStudyLayout({ project, walkthroughImages, suggestedProjects }: CaseStudyLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* LEFT COLUMN: 800+ Words Deep-Dive Architectural Narrative */}
      <div className="lg:col-span-7 space-y-12">
        {project.overview && (
          <article className="bg-slate-50/90 p-8 sm:p-10 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center gap-2 text-purple-700 font-mono text-xs font-medium uppercase tracking-widest mb-4">
              <BookOpen size={16} /> Bab 1: Latar Belakang &amp; Drama Permasalahan Klien
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-slate-900 mb-6 tracking-tight">
              Mengapa Transformasi Digital Ini Menjadi Pertaruhan Hidup-Mati Bisnis Korporat
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed sm:leading-loose space-y-5 text-[15px] sm:text-base">
              <p>{project.overview}</p>
              <p>
                Dalam realitas industri modern di kawasan metropolitan seperti Jakarta, BSD City Tangerang, hingga Bogor, keterlambatan merespons gelombang disrupsi digital bukan lagi sekadar kerugian kecil, melainkan ancaman kebangkrutan yang nyata. Ketika kompetitor mulai beralih menggunakan sistem otonom dan arsitektur web berkecepatan sub-detik, perusahaan yang masih mengandalkan proses manual dan platform monolitik warisan masa lalu (*legacy systems*) pasti akan tertinggal di belakang.
              </p>
              <blockquote className="border-l-4 border-purple-600 pl-6 my-6 italic text-slate-800 font-medium">
                <Quote size={20} className="inline mr-2 text-purple-600" />
                "Kami tidak hanya membangun sebuah website atau aplikasi; kami sedang merancang ulang fondasi operasional agar perusahaan klien dapat berlari sepuluh kali lebih cepat dari para pesaing mereka di industri."
              </blockquote>
            </div>
          </article>
        )}

        {project.challenges && (
          <article className="bg-slate-900 text-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-800">
            <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-medium uppercase tracking-widest mb-4">
              <Sparkles size={16} className="text-purple-400" /> Bab 2: Bedah Hambatan Arsitektur &amp; Kompleksitas Teknis
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-white mb-6 tracking-tight">
              Menaklukkan Latensi Tinggi, Lonjakan Trafik, dan Kompleksitas Arsitektur Modern
            </h2>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed sm:leading-loose space-y-5 text-[15px] sm:text-base">
              <p>{project.challenges}</p>
              <p>
                Setiap hambatan teknis yang kami temui dalam proyek ini menuntut keputusan arsitektural yang presisi. Mulai dari konfigurasi edge middleware, optimalisasi kueri database relasional PostgreSQL, hingga manajemen state reaktif berkecepatan tinggi. Tim engineering kami bekerja siang malam untuk memastikan bahwa sistem tidak hanya berfungsi saat diuji di lingkungan lokal, namun juga tetap kokoh ketika dihantam ribuan permintaan akses simultan dari berbagai wilayah di Indonesia.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 mt-6 border-t border-slate-800">
                <div className="bg-slate-800/90 p-5 rounded-xl border border-slate-700">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-purple-300 mb-2">Zero Downtime Migration</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">Migrasi database besar-besaran tanpa menghentikan transaksi operasional harian klien barang sedetik pun.</p>
                </div>
                <div className="bg-slate-800/90 p-5 rounded-xl border border-slate-700">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-purple-300 mb-2">Memory Leak Prevention</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">Pembersihan event listener dan optimalisasi useEffect hooks untuk menjaga stabilitas memori browser klien.</p>
                </div>
              </div>
            </div>
          </article>
        )}

        {project.solution && (
          <article className="bg-purple-50/70 p-8 sm:p-10 rounded-2xl border border-purple-200/90 shadow-xs">
            <div className="flex items-center gap-2 text-purple-800 font-mono text-xs font-medium uppercase tracking-widest mb-4">
              <Sparkles size={16} /> Bab 3: Solusi Inovatif &amp; Integrasi Agentic AI
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-slate-900 mb-6 tracking-tight">
              Kecerdasan Buatan Otonom yang Bekerja 24/7 Tanpa Henti
            </h2>
            <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed sm:leading-loose space-y-5 text-[15px] sm:text-base">
              <p>{project.solution}</p>
              <p>
                Dengan mengintegrasikan Google Gemini Pro API di lapisan server, aplikasi mampu memahami maksud pengguna secara natural, memberikan rekomendasi yang akurat, dan mengotomatisasi dokumen penting secara instan. Inilah puncak dari rekayasa perangkat lunak modern: teknologi yang tidak hanya menampilkan informasi statis, tetapi juga bertindak sebagai agen otonom yang cerdas bagi perkembangan bisnis Anda.
              </p>
            </div>
          </article>
        )}

        {project.impact && (
          <article className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-purple-950 via-[#1e0a3c] to-slate-900 text-white shadow-xl">
            <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-medium uppercase tracking-widest mb-4">
              <TrendingUp size={16} /> Bab 4: Hasil Akhir, Valuasi, &amp; Dampak Finansial
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-white mb-6 tracking-tight">
              Metrik Kinerja &amp; Keuntungan Nyata yang Dirasakan Klien
            </h2>
            <div className="prose prose-invert max-w-none text-purple-100 leading-relaxed sm:leading-loose space-y-5 text-[15px] sm:text-base">
              <p>{project.impact}</p>
              <p>
                Keberhasilan proyek ini membuktikan bahwa investasi pada infrastruktur digital kelas dunia memberikan pengembalian modal (*ROI*) yang jauh melampaui ekspektasi awal. Efisiensi operasional yang tercipta tidak hanya menghemat biaya tenaga kerja administratif, tetapi juga melipatgandakan kepuasan pelanggan secara drastis.
              </p>
            </div>
          </article>
        )}

        {/* Tech Stack & Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-200">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-mono font-medium uppercase tracking-widest text-slate-900 mb-4">Teknologi yang Digunakan</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-white border border-purple-100 rounded-xl text-xs font-medium text-slate-700 shadow-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
            <h3 className="text-xs font-mono font-medium uppercase tracking-widest text-purple-900 mb-4">Fitur Utama Sistem</h3>
            <ul className="flex flex-col gap-3">
              {project.features.map(feature => (
                <li key={feature} className="flex items-center gap-2 text-xs font-medium text-purple-900">
                  <CheckCircle2 size={16} className="text-purple-600 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* WhatsApp Consultation Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div>
            <h3 className="text-lg font-display font-medium text-white mb-2">Ingin Hasil Serupa untuk Bisnis Anda?</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">Diskusikan kebutuhan arsitektur digital dan estimasi proyek Anda langsung dengan Principal Engineer.</p>
          </div>
          <a 
            href={`https://wa.me/6282125447232?text=${encodeURIComponent(`Halo Mas Chesta, saya tertarik mendiskusikan proyek seperti studi kasus ${project.title}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 hover:from-purple-600 hover:to-indigo-800 text-white text-xs font-mono font-medium uppercase tracking-wider rounded-xl transition-all shadow-md shadow-purple-950/20 shrink-0 cursor-pointer"
          >
            <MessageSquare size={16} /> Konsultasi via WhatsApp
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN: Sticky Framer Motion Animated Image Gallery */}
      <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
        <div className="bg-slate-50 border border-slate-200/90 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <span className="text-xs font-mono font-medium uppercase tracking-widest text-purple-700">Project Walkthrough Gallery</span>
            <span className="text-[11px] font-mono text-slate-400">3 Optimized Views</span>
          </div>

          <div className="space-y-4">
            {walkthroughImages.map((imgUrl, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="rounded-xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200 relative group aspect-[16/10]"
              >
                <LazyImage src={imgUrl} alt={`${project.title} gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-mono font-medium tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl">
                    Interactive Showcase 0{idx + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-2 font-mono">
            <div className="flex justify-between">
              <span>Performance:</span>
              <span className="text-emerald-600 font-medium">100/100 Lighthouse</span>
            </div>
            <div className="flex justify-between">
              <span>Optimization:</span>
              <span className="text-slate-700 font-medium">WebP + Blur-Up Lazy</span>
            </div>
            <div className="flex justify-between">
              <span>Architecture:</span>
              <span className="text-purple-600 font-medium">App Router &amp; Agentic AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
