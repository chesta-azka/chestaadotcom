import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LazyImage from '../components/atoms/LazyImage.tsx';
import { ArrowUpRight, Monitor, Sparkles, TrendingUp, ShieldAlert, CheckCircle, ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CITIES } from '../data/AreasData';
import MetaTags from '../components/atoms/MetaTags';
import AISolutionsSection from '../components/organisms/AISolutionsSection.tsx';
import Breadcrumbs from '../components/atoms/Breadcrumbs';
import ServiceComparisonTable from '../components/organisms/ServiceComparisonTable';
import FloatingQuoteTrigger from '../components/organisms/FloatingQuoteTrigger';
import SectionHeader from '../components/organisms/SectionHeader';

interface ServiceItem {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  color: string;
  glow: string;
  num: string;
  points: string[];
}

const servicesList: ServiceItem[] = [
  {
    id: "web-dev",
    name: "Cloud Architecture",
    title: "High-Performance Enterprise Development",
    subtitle: "Arsitektur perangkat lunak skalabel menggunakan ekosistem React/Node.js kelas premium. Kami mengeliminasi limitasi legacy system dengan infrastruktur cloud modern yang menjamin latensi sangat rendah, keamanan tinggi, dan kemampuan manuver bisnis tanpa batas.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=850&auto=format&fit=crop",
    ctaText: "Konsultasi Infrastruktur Cloud",
    color: "#4f46e5", // Indigo
    glow: "rgba(79, 70, 229, 0.35)",
    num: "01",
    points: [
      "Arsitektur modern React, Node.js, & Next.js",
      "Skalabilitas infrastruktur berbasis Cloud (Serverless/Containers)",
      "Optimasi performa & latensi di bawah 0.8 detik",
      "Sistem keamanan berlapis standar enterprise"
    ]
  },
  {
    id: "ui-ux",
    name: "Intelligent UX",
    title: "Data-Driven Interface Design",
    subtitle: "Desain sistem antarmuka berkelas dunia yang memadukan fungsionalitas intuitif, psikologi kognitif, dan arsitektur informasi. Kami merancang visualisasi enterprise untuk memastikan adopsi pengguna maksimal dan retensi tinggi di seluruh ekosistem digital.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=850&auto=format&fit=crop",
    ctaText: "Mulai Diskusi Desain Produk",
    color: "#06B6D4", // Teal-cyan
    glow: "rgba(6, 182, 212, 0.35)",
    num: "02",
    points: [
      "Prototyping interaktif & fungsional (Figma)",
      "Penerapan sistem komponen modular (Design System)",
      "Responsivitas adaptif (Mobile, Tablet, Desktop)",
      "Validasi alur kerja berdasarkan data empiris"
    ]
  },
  {
    id: "digital-strat",
    name: "AI Automation",
    title: "Agentic AI & Business Automation",
    subtitle: "Integrasi kecerdasan buatan (AI) terdepan untuk mengotomatisasi operasional kompleks. Dari pemrosesan bahasa alami (NLP) hingga autonomous agent, kami mentransformasi alur kerja manual menjadi sistem cerdas yang berjalan 24/7 dengan presisi absolut.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=850&auto=format&fit=crop",
    ctaText: "Implementasi Solusi AI",
    color: "#F97316", // Warm Orange
    glow: "rgba(249, 115, 22, 0.35)",
    num: "03",
    points: [
      "Integrasi LLM & Agentic AI Workflow",
      "Automasi layanan pelanggan cerdas (Autonomous Bot)",
      "Analisis data real-time & pelaporan otomatis",
      "Optimasi alur kerja bisnis secara proaktif"
    ]
  },
  {
    id: "branding",
    name: "Corporate Identity",
    title: "Premium Enterprise Branding",
    subtitle: "Formulasi identitas korporat premium yang kohesif dan otoritatif. Kami merancang aset visual esensial yang merepresentasikan inovasi teknis dan reputasi enterprise Anda secara meyakinkan kepada pemangku kepentingan dan target pasar global.",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=850&auto=format&fit=crop",
    ctaText: "Rancang Identitas Korporat",
    color: "#22C55E", // Green
    glow: "rgba(34, 197, 110, 0.35)",
    num: "04",
    points: [
      "Rancangan logo korporat resolusi ultra-tinggi",
      "Penyusunan Brand Guidelines komprehensif",
      "Standardisasi aset visual digital & cetak",
      "Pembangunan arsitektur merek jangka panjang"
    ]
  }
];

export default function ServicesPage() {
  // Web developer category is open by default ('web-dev')
  const [activeTab, setActiveTab] = useState<string>("web-dev");
  const [showTips, setShowTips] = useState<boolean>(false);

  const buildWhatsAppLink = (serviceName: string) => {
    const text = `Halo CHESTADOTCOM, saya sangat tertarik berdiskusi mengenai layanan [${serviceName}] premium untuk meningkatkan kredibilitas digital bisnis saya. Boleh jadwalkan sesi konsultasi awal gratis?`;
    return `https://wa.me/6282125447232?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto bg-transparent min-h-screen text-slate-900 select-none">
      <MetaTags 
        title="Daftar Layanan Arsitektur - CHESTADOTCOM"
        description="Pilih pilar jasa digital premium kami mulai dari Web Developer kustom Next.js, Desain UI/UX minimalist, Strategi Digital marketing, hingga visual Branding eksklusif untuk UMKM Indonesia."
        path="/services"
      />
      
      {/* Editorial Title Header */}
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: 'Layanan', path: '/services' }
          ]} 
        />
      </div>
      <SectionHeader 
        metaTag="OUR BRAND CAPABILITIES"
        title={
          <>
            Arsitektur Layanan <br className="hidden sm:block" />
            Kelas Premium.
          </>
        }
        description="Fokus kami sederhana: menyingkirkan kerumitan teknis digital dan membangun visual bisnis Anda agar terlihat luar biasa meyakinkan."
      />

      {/* Accordion Layout System (Cards) */}
      <div className="space-y-6 relative z-10">
        
        {servicesList.map((service, index) => {
          const isOpen = activeTab === service.id;
          
          return (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`border rounded-[2.5rem] overflow-hidden transition-all duration-500 transform hover:scale-[1.015] hover:shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] hover:border-[#4f46e5]/20 hover:z-20 relative ${isOpen ? 'bg-white shadow-xl border-[#4f46e5]/30' : 'border-slate-200 bg-white/70 backdrop-blur-md hover:bg-white'}`}
            >
              {/* Header Accordion Clickable Row */}
              <button
                onClick={() => setActiveTab(isOpen ? "" : service.id)}
                className="w-full flex items-center justify-between py-8 px-6 sm:px-10 text-left outline-none focus:outline-none transition-all duration-300 relative group cursor-pointer"
              >
                {/* Visual glow backdrop highlight on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 10% 50%, ${service.color}, transparent 60%)`
                  }}
                />

                <div className="flex items-center gap-4 sm:gap-8 relative z-10">
                  {/* Service Number (01, 02, etc.) */}
                  <span className={`font-mono text-xs tracking-wider transition-colors pt-0.5 hidden sm:inline ${isOpen ? 'text-[#4f46e5] font-bold' : 'text-slate-600 group-hover:text-slate-600'}`}>
                    {service.num}
                  </span>

                  {/* Bullet Dot with customizable colors & subtle ring glow */}
                  <span className="relative flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center shrink-0">
                    <span 
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full transition-all duration-500 ${isOpen ? 'opacity-40' : 'opacity-0 group-hover:opacity-30'}`}
                      style={{ backgroundColor: service.color }}
                    />
                    <span 
                      className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 border border-[#06080F] transition-all duration-300"
                      style={{ 
                        backgroundColor: service.color,
                        boxShadow: isOpen ? `0 0 15px ${service.glow}` : `0 0 5px rgba(255,255,255,0.1)`
                      }}
                    />
                  </span>

                  {/* Accordion Title label */}
                  <h3 className={`text-xl sm:text-2xl md:text-3xl font-display font-medium tracking-tight transition-all duration-300 ${isOpen ? 'text-slate-900 translate-x-1' : 'text-slate-700 group-hover:text-slate-900'}`}>
                    {service.name}
                  </h3>
                  
    </div>

                {/* Right side status indicator */}
                <div className="flex items-center gap-4 relative z-10 shrink-0">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest hidden md:inline group-hover:text-[#4f46e5] transition-colors pt-0.5">
                    {isOpen ? 'TAP TO COLLAPSE' : 'TAP TO EXPAND'}
                  </span>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#4f46e5] border-[#4f46e5] rotate-45 shadow-[0_0_20px_rgba(79,70,229,0.3)]' : 'border-slate-100 bg-white/[0.01] group-hover:bg-slate-100 group-hover:border-white/20'}`}>
                    <ArrowUpRight 
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isOpen ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'}`} 
                      strokeWidth={1.5}
                    />
                    
    </div>
                  
    </div>
              </button>

              {/* Collapsed/Expanded Content Row */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: "auto", 
                      opacity: 1,
                      transition: { 
                        height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.3, delay: 0.1 }
                      } 
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: { 
                        height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.2 }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    {/* Interior Details Panel - Elegant Vertical Stack */}
                    <div className="px-6 pb-12 sm:px-12 md:pb-16 border-t border-white/[0.05] flex flex-col gap-6 pt-8 text-left">
                      
                      {/* 1. Title */}
                      <div className="space-y-2">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-100 text-[10px] font-mono text-slate-600 font-bold uppercase tracking-widest">
                          ⚡ {service.name} Overview Details
                        </span>
                        
                        <h4 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-slate-900 tracking-tight leading-snug">
                          {service.title}
                        </h4>
                        
    </div>

                      {/* 2. Gambar (Framed Banner Mockup On Top) */}
                      <div className="w-full aspect-[21/9] sm:aspect-[24/10] md:aspect-[3/1] rounded-2xl overflow-hidden border border-slate-200 relative hover:border-[#4f46e5]/40 transition-colors shadow-2xl bg-[#0A0D16] z-10">
                        {/* Outer thin glass overlay mock frame */}
                        <div className="absolute top-3 left-3 right-3 h-6 bg-black/40 rounded-lg flex items-center px-3 gap-1.5 border border-slate-100 z-20">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                          <span className="text-[8px] text-gray-505 font-mono ml-2 tracking-widest uppercase text-slate-600">browser_preview.app</span>
                          
    </div>
                        
                        {/* Img background fit */}
                        <div className="absolute top-[38px] inset-x-3 bottom-3 rounded-xl overflow-hidden bg-black/60">
                          <motion.div
                            initial={{ scale: 0.98, opacity: 0.7 }}
                            animate={{ scale: 1, opacity: 0.95 }}
                            transition={{ duration: 0.6 }}
                            className="w-full h-full"
                          >
                            <LazyImage 
                              src={service.image} 
                              alt={service.name} 
                              className="w-full h-full object-cover opacity-85 hover:scale-103 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0"
                            />
                          </motion.div>
                          
    </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        
    </div>

                      {/* 3. Subtitle Description & Features Checklist */}
                      <div className="space-y-6">
                        <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed max-w-4xl">
                          {service.subtitle}
                        </p>

                        {/* Fast features checkboxes bullets list */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 max-w-3xl">
                          {service.points.map((pt, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-2.5">
                              <div className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center shrink-0 border border-slate-100">
                                <CheckCircle size={12} className="text-[#4f46e5]" strokeWidth={2.5} />
                                
    </div>
                              <span className="text-[11px] sm:text-xs font-sans text-slate-700 font-medium">{pt}</span>
                              
    </div>
                          ))}
                          
    </div>
                        
    </div>

                      {/* 4. CTA */}
                      <div className="pt-6 border-t border-slate-100">
                        <a
                          href={buildWhatsAppLink(service.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-[#4f46e5] text-white font-mono font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-indigo-500 hover:shadow-indigo-500/30 select-none"
                        >
                          <span>{service.ctaText.toUpperCase()}</span>
                          <ArrowUpRight size={14} className="stroke-[2px]" />
                        </a>
                        
    </div>

                      
    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
    </motion.div>
          );
        })}

      </div>

      {/* SECTION: AI Solutions Section */}
      <AISolutionsSection />

      {/* SECTION: Wilayah Jangkauan Kota */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-24 border-t border-slate-100 pt-16 relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#06B6D4]/3 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="mb-12 max-w-2xl text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#06B6D4]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#06B6D4] uppercase pt-0.5">
              GEOGRAPHIC TARGET AREAS
            </span>
            
    </div>
          <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-slate-900 mb-4 leading-none">
            Wilayah Jangkauan Layanan Kota.
          </h2>
          <p className="text-sm text-slate-600 font-sans leading-relaxed">
            Menghadirkan optimasi web modern kustom, riset pasar lokal autentik, dan visibilitas Google Search maksimal untuk kesuksesan brand Anda di kota-kota prioritas Indonesia.
          </p>
          
    </div>

        {/* City navigation grid links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 mt-8">
          {CITIES.map((city) => (
            <Link
              key={city}
              to={`/area/${city.toLowerCase()}`}
              className="group flex flex-col justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-[#4f46e5]/30 transition-all duration-500 transform hover:scale-[1.03] hover:shadow-[0_10px_30px_-10px_rgba(79,70,229,0.2)] relative overflow-hidden"
            >
              {/* Subtle top horizontal indicator */}
              <div className="absolute top-0 inset-x-4 h-[1px] bg-[#4f46e5]/0 group-hover:bg-[#4f46e5]/20 transition-all duration-500" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="p-1.5 rounded-lg bg-slate-100 text-slate-500 group-hover:text-[#4f46e5] group-hover:bg-[#4f46e5]/10 transition-all">
                  <MapPin size={12} />
                </span>
                <ArrowUpRight size={12} className="text-slate-600 group-hover:text-[#4f46e5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                
    </div>
              
              <div>
                <span className="text-[10px] font-mono tracking-widest text-slate-500 group-hover:text-[#4f46e5]/80 transition-colors uppercase font-bold">
                  AREA SERVED
                </span>
                <h4 className="text-sm font-sans font-extrabold tracking-tight text-slate-900 uppercase mt-0.5 group-hover:tracking-wide transition-all">
                  {city}
                </h4>
                
    </div>
            </Link>
          ))}
          
    </div>
      </motion.section>

      {/* SECTION: High-Performance Conversion Call-To-Action Element underneath with animated high fidelity feedback */}
      <motion.section 
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 border border-slate-100 rounded-3xl p-8 md:p-12 bg-slate-50 hover:bg-slate-50 hover:border-[#4f46e5]/30 transition-all duration-500 relative overflow-hidden text-left mb-6"
      >
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#4f46e5]/4 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#06B6D4]/3 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#4f46e5]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#4f46e5] uppercase pt-0.5">
              100% PERSONALIZED ROADMAP
            </span>
            
    </div>
          
          <h3 className="text-2xl md:text-4xl text-slate-900 tracking-tight leading-tight mb-4 font-display font-medium">
            Siap Merevolusi Brand Digital Anda & Mendominasi Kompetisi Lokal?
          </h3>
          
          <p className="text-sm md:text-base text-slate-600 font-sans leading-relaxed mb-8 max-w-2xl">
            Mari diskusikan rancangan website, strategi konversi, serta visualisasi branding terbaik khusus kota Anda secara privat bersama desainer pimpinan CHESTADOTCOM. Tanpa komitmen, tanpa bot perantara.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 relative">
            <a
              href="https://wa.me/6282125447232?text=Halo%20CHESTADOTCOM%2C%20saya%20tertarik%20dengan%20layanan%20jasa%20digital%2520premium%2520Anda.%20Bisa%20bantu%20analisis%20potensi%20brand%20saya%20untuk%20pasar%20lokal%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#4f46e5] text-white font-mono font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-indigo-500 hover:shadow-indigo-500/30 select-none shrink-0"
            >
              <MessageCircle size={14} className="stroke-[2.5px]" />
              <span>KONSULTASI GRATIS SEKARANG (WA)</span>
              <ArrowUpRight size={14} className="stroke-[2px]" />
            </a>

            {/* Interactive Tooltip Component */}
            <div className="relative flex items-center justify-center sm:justify-start">
              <button
                onMouseEnter={() => setShowTips(true)}
                onMouseLeave={() => setShowTips(false)}
                onClick={() => setShowTips(!showTips)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 bg-white/[0.02] hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all text-[9px] font-mono font-bold uppercase tracking-wider cursor-help select-none"
              >
                <Sparkles size={11} className="text-[#4f46e5]" />
                <span>💡 2 TIPS CHAT WA</span>
              </button>

              <AnimatePresence>
                {showTips && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 mb-3 w-[290px] p-4 rounded-2xl bg-white backdrop-blur-md border border-[#4f46e5]/20 shadow-[0_12px_40px_rgba(0,0,0,0.8)] z-50 text-left cursor-default pointer-events-none"
                  >
                    <div className="space-y-2.5 text-[11px] leading-relaxed">
                      <div className="font-mono text-[9px] text-[#4f46e5] font-black uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                        <MessageCircle size={11} />
                        FORMULA CHAT RESPON CEPAT
                        
    </div>
                      <div className="space-y-2 font-sans text-slate-600">
                        <p>
                          <strong className="text-slate-900">1. Cantumkan Jenis Usaha & Kota:</strong> Membantu kami memetakan referensi pasar lokal unik dengan respons kilat.
                        </p>
                        <p>
                          <strong className="text-slate-900">2. Berikan Inspirasi Web:</strong> Sebutkan 1 kompetitor atau referensi digital global yang sesuai selera Anda.
                        </p>
                        
    </div>
                      
    </div>
                    {/* Tooltip triangle indicator */}
                    <div className="absolute top-full left-1/2 sm:left-6 -translate-x-1/2 border-8 border-transparent border-t-[#090D15] -mt-[1px]" />
                  </motion.div>
                )}
              </AnimatePresence>
              
    </div>
            
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-slate-200 bg-white/[0.02] text-slate-700 font-mono font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-slate-100 hover:border-white/20 select-none"
            >
              <span>LIHAT SHOWCASE KAMI</span>
              <ArrowRight size={12} />
            </Link>
            
    </div>
          
    </div>
      </motion.section>

      <ServiceComparisonTable />

      {/* Authority footer notice at the bottom under accordion */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 text-center max-w-xl mx-auto border border-slate-100 rounded-3xl p-6 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent relative overflow-hidden"
      >
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-32 h-32 bg-[#4f46e5]/2 rounded-full blur-xl pointer-events-none" />
        <p className="text-xs text-slate-500 font-mono tracking-wide leading-relaxed">
          Semua pilar di atas dirancang dari awal oleh CHESTADOTCOM (Digital Architect 2026) demi memastikan performa performative serta integritas konversi penuh. Tidak ada template murahan, melainkan murni keunggulan desain estetika premium.
        </p>
      </motion.div>
      <FloatingQuoteTrigger />
    </div>
  );
}
