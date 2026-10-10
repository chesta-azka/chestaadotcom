'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  ChevronDown, 
  FolderGit2, 
  ArrowUpRight 
} from 'lucide-react';
import FAQSchema from '../../../components/atoms/FAQSchema';

interface ServiceContent {
  tagline: string;
  h1: string;
  subText: string;
  miniFeatures: { num: string; title: string; subtitle: string }[];
  problemHeading: string;
  problemSubText: string;
  problemPoints: { num: string; text: string }[];
  resultStatement: string;
  componentsHeading: string;
  components: { num: string; title: string; desc: string }[];
  processHeading: string;
  processSubText: string;
  processSteps: { num: string; title: string; desc: string }[];
  workProofHeading: string;
  workProofProject: string;
  workProofDesc: string;
  workProofTags: string[];
  partnerValuesHeading: string;
  partnerValues: { num: string; title: string; desc: string }[];
  aiMethodologyHeading: string;
  aiMethodologySubText: string;
  aiMethodologySteps: { num: string; title: string; desc: string }[];
  techStackHeading: string;
  techStack: { name: string; role: string }[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  ctaSubText: string;
}

const DEFAULT_AI_CONTENT: ServiceContent = {
  tagline: 'Konsultasi Gratis',
  h1: 'Integrasi AI Praktis untuk Skalabilitas Perusahaan.',
  subText: 'Kami mengintegrasikan AI praktis untuk chatbot, automasi alur kerja, knowledge base, dan rekomendasi.',
  miniFeatures: [
    { num: '01', title: 'Tujuan bisnis', subtitle: 'Business Goal' },
    { num: '02', title: 'Pengalaman pengguna', subtitle: 'User Experience' },
    { num: '03', title: 'Fondasi teknis', subtitle: 'Technical Foundation' },
  ],
  problemHeading: 'Kedengarannya familiar?',
  problemSubText: 'Kami memulai dari hambatan operasional yang dirasakan bisnis—bukan dari daftar teknologi.',
  problemPoints: [
    { num: '01', text: 'Tim layanan pelanggan menghabiskan waktu menjawab pertanyaan berulang.' },
    { num: '02', text: 'Banyak proses administratif manual yang sebenarnya dapat berjalan otomatis.' },
    { num: '03', text: 'Bisnis ingin mengadopsi AI, tetapi belum menemukan titik mulai yang aman, terukur, dan bernilai.' },
  ],
  resultStatement: 'Tim Anda menghemat ratusan jam pada pekerjaan berulang tanpa kehilangan kontrol absolut atas kualitas.',
  componentsHeading: 'Komponen yang Dihadirkan',
  components: [
    { num: '01', title: 'Chatbot Customer Service', desc: 'Menjawab pertanyaan umum dengan konteks, batasan, dan jalur eskalasi manusia yang jelas.' },
    { num: '02', title: 'Automasi Workflow', desc: 'Menghubungkan berbagai perangkat lunak agar tugas administratif berjalan otomatis (Zero-Touch).' },
    { num: '03', title: 'Sistem Rekomendasi', desc: 'Menyajikan produk atau konten hiper-relevan berdasarkan konteks pengguna.' },
    { num: '04', title: 'Ringkasan Otomatis', desc: 'Mengubah dokumen atau percakapan panjang menjadi data yang dapat ditindaklanjuti.' },
    { num: '05', title: 'Knowledge Base', desc: 'Karyawan AI yang menjawab murni berdasarkan dokumen dan sumber data perusahaan yang telah disetujui.' },
    { num: '06', title: 'Proof of Concept', desc: 'Menguji nilai, risiko, dan ROI sebelum integrasi diperluas ke seluruh perusahaan.' },
  ],
  processHeading: 'Proses transparan dari inisiasi hingga rilis.',
  processSubText: 'Setiap tahap memiliki keluaran pasti, momen peninjauan, dan keputusan yang disepakati bersama.',
  processSteps: [
    { num: '01', title: 'Identifikasi', desc: 'Mencari proses repetitif bernilai tinggi untuk diotomatisasi.' },
    { num: '02', title: 'Proof of Concept', desc: 'Membangun versi terbatas untuk menguji akurasi dan kelayakan.' },
    { num: '03', title: 'Integrasi', desc: 'Menghubungkan model AI dengan sistem, database, dan workflow perusahaan Anda.' },
    { num: '04', title: 'Ukur & Skala', desc: 'Memantau kualitas, biaya server, dan dampak operasional sebelum memperluas skala.' },
  ],
  workProofHeading: 'Integrasi AI · Selected Work',
  workProofProject: 'Enterprise Knowledge Assistant',
  workProofDesc: 'Implementasi AI terkontrol yang mencari jawaban eksklusif dari dokumen internal, menampilkan rujukan sumber, dan secara cerdas meneruskan kasus sensitif kepada agen manusia.',
  workProofTags: ['OpenAI', 'Vector Database', 'Node.js'],
  partnerValuesHeading: 'Bukan sekadar selesai. Dibangun agar berhasil.',
  partnerValues: [
    { num: '01', title: 'Proses transparan', desc: 'Progres dan arsitektur terlihat di setiap tahap.' },
    { num: '02', title: 'Timeline jelas', desc: 'Fase, keluaran, dan checkpoint disepakati sejak hari pertama.' },
    { num: '03', title: 'Hasil terukur', desc: 'Metrik kesuksesan ditentukan berdasarkan efisiensi uang dan waktu.' },
    { num: '04', title: 'Milik Anda', desc: 'Kode sumber dan aset final diserahkan sepenuhnya. Tidak ada vendor lock-in.' },
  ],
  aiMethodologyHeading: 'Dipercepat oleh AI. Disempurnakan oleh Pakar Manusia.',
  aiMethodologySubText: 'AI mengotomatisasi proses repetitif, sementara keputusan strategis, keamanan, dan kesesuaian bisnis dieksekusi langsung oleh arsitek kami.',
  aiMethodologySteps: [
    { num: '01', title: 'Draf awal', desc: 'Mempercepat eksplorasi arsitektur.' },
    { num: '02', title: 'Kurasi', desc: 'Menyaring logika dan hasil yang paling efisien.' },
    { num: '03', title: 'Sentuhan manusia', desc: 'Memastikan hasil akhir aman, beretika, dan dapat dipertanggungjawabkan.' },
  ],
  techStackHeading: 'Dipilih karena reliabilitas, bukan sekadar tren.',
  techStack: [
    { name: 'OpenAI', role: 'LLM & Reasoning' },
    { name: 'Anthropic', role: 'Claude Engine' },
    { name: 'Node.js', role: 'High-Concurrency API' },
    { name: 'n8n', role: 'Workflow Automation' },
    { name: 'PostgreSQL', role: 'Vector DB & Relational' },
  ],
  faqHeading: 'Pertanyaan seputar jasa Integrasi AI.',
  faqs: [
    {
      q: 'Model AI apa yang digunakan?',
      a: 'Model dipilih berdasarkan kebutuhan, privasi data, latency, dan efisiensi biaya—termasuk OpenAI atau Anthropic.',
    },
    {
      q: 'Apakah aman untuk data perusahaan?',
      a: 'Sistem kami menggunakan arsitektur terisolasi. Data Anda tidak dilatih untuk model publik.',
    },
    {
      q: 'Berapa lama fase proof of concept?',
      a: 'Fase proof of concept biasanya berlangsung antara 7 hingga 14 hari kerja untuk menguji kelayakan, latensi, dan kepuasan pengguna sebelum peluncuran menyeluruh.',
    },
    {
      q: 'Bisa terhubung ke database kami yang sudah ada?',
      a: 'Bisa. Kami membangun integrasi API terenkripsi, webhook dua arah, serta konektor langsung ke PostgreSQL, MySQL, SAP, ERP, Odoo, maupun CRM internal Anda.',
    },
    {
      q: 'Bagaimana ROI (Return on Investment) diukur?',
      a: 'ROI diukur dari efisiensi ratusan jam operasional manual per bulan, penurunan biaya penanganan tiket bantuan, serta akselerasi siklus konversi penjualan prospek.',
    },
  ],
  ctaHeading: 'Apa hambatan operasional yang ingin Anda hancurkan?',
  ctaSubText: 'Ceritakan tantangan yang perusahaan Anda hadapi. Kami bantu memetakan arsitektur dan menentukan langkah digitalisasi yang tepat.',
};

export default function ServiceDetailPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const industries = [
    { number: '01', name: 'Company Profile', href: '/industri/company-profile' },
    { number: '02', name: 'Rental Mobil', href: '/industri/rental-mobil' },
    { number: '03', name: 'Klinik & Kesehatan', href: '/industri/klinik-kesehatan' },
    { number: '04', name: 'Virtual Office', href: '/industri/virtual-office' },
    { number: '05', name: 'Tour & Travel', href: '/industri/tour-travel' },
    { number: '06', name: 'Fashion', href: '/industri/fashion' },
    { number: '07', name: 'Kontraktor', href: '/industri/kontraktor' },
    { number: '08', name: 'Konsultan', href: '/industri/konsultan' },
    { number: '09', name: 'Legalitas Usaha', href: '/industri/legalitas-usaha' },
    { number: '10', name: 'Perhiasan', href: '/industri/perhiasan' },
  ];

  return (
    <div className="bg-white text-slate-900 selection:bg-purple-100 selection:text-purple-900 font-sans">
      <FAQSchema faqs={DEFAULT_AI_CONTENT.faqs} />

      {/* SECTION 1: HERO */}
      <section id="hero" className="relative py-24 md:py-32 bg-gradient-to-b from-purple-50/50 via-white to-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="space-y-8 max-w-4xl">
            
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/6282125447232?text=Halo%20chestaadotcom,%20saya%20ingin%20konsultasi%20gratis%20mengenai%20integrasi%20AI%20dan%20otomatisasi%20bisnis."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 text-purple-900 font-medium text-xs hover:bg-purple-200/80 transition-colors"
              >
                <Sparkles size={13} className="text-purple-700" />
                <span>{DEFAULT_AI_CONTENT.tagline}</span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href="#components"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-purple-700 transition-colors"
              >
                <span>Lihat lingkup ↓</span>
              </a>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.12]">
              {DEFAULT_AI_CONTENT.h1}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl">
              {DEFAULT_AI_CONTENT.subText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              {DEFAULT_AI_CONTENT.miniFeatures.map((feat) => (
                <div key={feat.num} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <span className="text-xs font-mono font-bold text-purple-700">{feat.num}</span>
                  <div className="font-bold text-sm text-slate-950">{feat.title}</div>
                  <div className="text-xs text-slate-500 font-normal">{feat.subtitle}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: PROBLEM */}
      <section id="problem" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {DEFAULT_AI_CONTENT.problemHeading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {DEFAULT_AI_CONTENT.problemSubText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEFAULT_AI_CONTENT.problemPoints.map((point) => (
              <div key={point.num} className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-purple-300 transition-all">
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-md inline-block">
                  {point.num}
                </span>
                <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
                  {point.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: RESULT */}
      <section id="result" className="py-24 bg-purple-900 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="max-w-4xl space-y-6">
            <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-tight text-white tracking-tight">
              &ldquo;{DEFAULT_AI_CONTENT.resultStatement}&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMPONENTS */}
      <section id="components" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {DEFAULT_AI_CONTENT.componentsHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEFAULT_AI_CONTENT.components.map((comp) => (
              <div key={comp.num} className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/5 transition-all space-y-3">
                <span className="text-xs font-mono font-bold text-purple-700">{comp.num}</span>
                <h3 className="font-bold text-base text-slate-950">{comp.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {comp.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: PROCESS */}
      <section id="process" className="py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {DEFAULT_AI_CONTENT.processHeading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {DEFAULT_AI_CONTENT.processSubText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEFAULT_AI_CONTENT.processSteps.map((step) => (
              <div key={step.num} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md inline-block">
                  {step.num}
                </span>
                <h3 className="font-bold text-base text-slate-950">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: WORK PROOF */}
      <section id="work-proof" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-8">
          
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {DEFAULT_AI_CONTENT.workProofHeading}
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-6">
            <div className="space-y-3 max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-950">
                {DEFAULT_AI_CONTENT.workProofProject}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {DEFAULT_AI_CONTENT.workProofDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {DEFAULT_AI_CONTENT.workProofTags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-semibold text-slate-700">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors"
              >
                <span>Lihat portofolio</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: PARTNER VALUES */}
      <section id="partner-values" className="py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {DEFAULT_AI_CONTENT.partnerValuesHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEFAULT_AI_CONTENT.partnerValues.map((val) => (
              <div key={val.num} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-mono font-bold text-purple-700">{val.num}</span>
                <h3 className="font-bold text-base text-slate-950">{val.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 8: AI METHODOLOGY */}
      <section id="ai-methodology" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {DEFAULT_AI_CONTENT.aiMethodologyHeading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {DEFAULT_AI_CONTENT.aiMethodologySubText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEFAULT_AI_CONTENT.aiMethodologySteps.map((step) => (
              <div key={step.num} className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-purple-300 transition-all">
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-md inline-block">
                  {step.num}
                </span>
                <h3 className="font-bold text-base text-slate-950">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: INDUSTRY CONTEXT (WITH RICH PURPLE HOVER & AUDIT TOOLTIP) */}
      <section id="industry-context" className="py-24 bg-slate-50 border-b border-slate-200/80 overflow-visible">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              Konteks industri mengubah solusinya.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Jelajahi bagaimana arsitektur AI kami disesuaikan dengan alur konversi di sektor spesifik Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
            {industries.map((ind) => (
              <div key={ind.number} className="relative group">
                {/* Audit Industry Needs Tooltip */}
                <div 
                  role="tooltip"
                  className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 z-30 whitespace-nowrap"
                >
                  <div className="px-2.5 py-1 rounded-md bg-purple-950 text-white text-[11px] font-mono font-medium shadow-xl border border-purple-400/40 flex items-center gap-1.5">
                    <Sparkles size={11} className="text-purple-300" />
                    <span>Audit Industry Needs</span>
                  </div>
                  <div className="w-2 h-2 bg-purple-950 rotate-45 mx-auto -mt-1 border-r border-b border-purple-400/40" />
                </div>

                <Link
                  href={ind.href}
                  className="w-full p-4 rounded-2xl bg-white border border-slate-200/90 group-hover:border-purple-600 group-hover:bg-purple-900 transition-all duration-300 shadow-2xs group-hover:shadow-xl group-hover:shadow-purple-900/20 flex flex-col justify-between min-h-[104px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-purple-700 group-hover:text-purple-300 transition-colors">
                      {ind.number}
                    </span>
                    <ArrowUpRight size={14} className="text-slate-400 group-hover:text-purple-200 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-white leading-tight transition-colors">
                    {ind.name}
                  </div>
                  <div className="text-[10px] text-slate-400 group-hover:text-purple-300/80 transition-colors">
                    Solusi Khusus Sektor
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 10: TECH STACK */}
      <section id="tech-stack" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {DEFAULT_AI_CONTENT.techStackHeading}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {DEFAULT_AI_CONTENT.techStack.map((tech) => (
              <div key={tech.name} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 hover:border-purple-300 transition-colors">
                <div className="font-display font-bold text-base text-slate-950">{tech.name}</div>
                <div className="text-[11px] font-mono text-slate-500">{tech.role}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 11: FAQ */}
      <section id="faq" className="py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {DEFAULT_AI_CONTENT.faqHeading}
            </h2>
          </div>

          <div className="space-y-3">
            {DEFAULT_AI_CONTENT.faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-purple-700 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaqIndex === index ? 'rotate-180 text-purple-600' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-purple-950 text-white space-y-6 shadow-2xl shadow-purple-950/20">
            <div className="space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold">
                Langkah Berikutnya
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                {DEFAULT_AI_CONTENT.ctaHeading}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-purple-200 leading-relaxed">
                {DEFAULT_AI_CONTENT.ctaSubText}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center items-center gap-3.5">
              <a
                href="https://wa.me/6282125447232?text=Halo%20chestaadotcom!%20Saya%20ingin%20diskusikan%20kebutuhan%20integrasi%20AI%20dan%20otomatisasi%20bisnis."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-purple-950 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <MessageCircle size={16} className="text-purple-900" />
                <span>Diskusikan Kebutuhan Anda</span>
                <ArrowRight size={14} />
              </a>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-purple-900/60 hover:bg-purple-900 text-white rounded-full font-semibold text-xs sm:text-sm border border-purple-700/60 transition-colors"
              >
                <FolderGit2 size={15} />
                <span>Lihat Karya Kami</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
