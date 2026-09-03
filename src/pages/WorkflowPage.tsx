import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ShieldCheck, ArrowRight, Sparkles, MessageCircle, Clock, CheckCircle2, Code2, Globe2, Bot } from 'lucide-react';
import MetaTags from '../components/atoms/MetaTags';

const phases = [
  {
    id: '01',
    title: 'Konsultasi 1-on-1 via WhatsApp',
    badge: 'Direct Comm-Link',
    icon: <MessageCircle className="w-8 h-8 text-purple-600" strokeWidth={1.75} />,
    color: 'from-purple-500 to-indigo-600',
    description: 'Diskusikan ide, referensi desain, target bisnis, atau fitur website Anda secara instan langsung dengan Chesta Azka Sofyan (Principal Engineer). Tanpa formulir rumit atau proses berbelit.',
    features: ['Respon Cepat Langsung via WhatsApp', 'Konsultasi Gratis & Rekomendasi Solusi', 'Bisa Tanya via Floating Assistant di Web'],
    actionLabel: 'Chat WhatsApp Sekarang',
    waText: 'Halo Mas Chesta, saya ingin konsultasi kebutuhan pembuatan website untuk bisnis saya.'
  },
  {
    id: '02',
    title: 'Penentuan Paket & Kesepakatan',
    badge: 'Fixed & Transparent',
    icon: <CheckCircle2 className="w-8 h-8 text-purple-600" strokeWidth={1.75} />,
    color: 'from-purple-600 to-purple-800',
    description: 'Kami memberikan penawaran transparan mulai dari Rp650.000 (atau promo spesial UMKM Rp540.000 flat) sudah termasuk domain .com dan server cloud. Tanpa biaya tersembunyi.',
    features: ['Investasi Jelas Mulai Rp650K (Promo Rp540K)', 'Gratis Domain .com & Cloud Setup', 'Timeline Pasti 1-3 Hari Kerja'],
    actionLabel: 'Pilih Paket & Konfirmasi',
    waText: 'Halo Mas Chesta, saya ingin konfirmasi paket website Rp650K / promo Rp540K untuk domain .com saya.'
  },
  {
    id: '03',
    title: 'Pengerjaan Cepat & Live Staging Review',
    badge: 'Rapid Engineering',
    icon: <Code2 className="w-8 h-8 text-purple-600" strokeWidth={1.75} />,
    color: 'from-indigo-600 to-purple-600',
    description: 'Website langsung dibangun menggunakan arsitektur modern Next.js yang super cepat. Kami mengirimkan link live staging ke WhatsApp Anda untuk dicek dan direvisi bersama.',
    features: ['Link Preview Staging Dikirim ke WA', 'Revisi & Feedback Langsung 1-on-1', 'Skor Kecepatan Google PageSpeed 95-100'],
    actionLabel: 'Cek Standar Kualitas Staging',
    waText: 'Halo Mas Chesta, boleh info contoh staging preview dan proses development website?'
  },
  {
    id: '04',
    title: 'Go Live & Serah Terima 100%',
    badge: '100% Full Ownership',
    icon: <Globe2 className="w-8 h-8 text-purple-600" strokeWidth={1.75} />,
    color: 'from-purple-700 to-emerald-600',
    description: 'Website langsung dipublikasikan ke domain resmi Anda dengan sertifikat SSL aktif. Seluruh akses kepemilikan dan panduan pengelolaan diserahkan penuh kepada Anda.',
    features: ['Domain .com & SSL HTTPS Aktif', 'Kepemilikan Penuh 100% Tanpa Kunci', 'Garansi Teknis & Dukungan Purna Jual via WA'],
    actionLabel: 'Mulai Proyek Sekarang',
    waText: 'Halo Mas Chesta, saya siap memulai pembuatan website. Mohon info data yang perlu disiapkan.'
  }
];

export default function WorkflowPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openWhatsApp = (text: string) => {
    const url = `https://wa.me/6282125447232?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openFloatingAssistant = () => {
    window.dispatchEvent(new CustomEvent('open-floating-ai'));
  };

  return (
    <main className="min-h-screen bg-[#FAFAFC] text-slate-900 pt-40 md:pt-48 pb-32 overflow-hidden selection:bg-purple-500/20">
      <MetaTags 
        title="Alur Pemesanan & Konsultasi WhatsApp | CHESTAADOTCOM" 
        description="Workflow pembuatan website praktis tanpa ribet. Konsultasi langsung 1-on-1 via WhatsApp atau Floating Assistant dengan Chesta Azka Sofyan."
      />

      {/* Bright Clean Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex justify-center items-center -z-10">
        <motion.div 
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-purple-100/50 blur-[130px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] rounded-full bg-indigo-50/60 blur-[150px]" 
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[90px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <motion.span 
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-purple-900 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase mb-8 border border-purple-200/80 shadow-sm shadow-purple-900/5"
            >
              <Sparkles className="w-4 h-4 text-purple-700" /> ALUR PRAKTIS VIA WHATSAPP
            </motion.span>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight mb-6 leading-[1.12] text-slate-900">
              Konsultasi & Order <br/>
              <span className="text-purple-900">
                Langsung di WhatsApp.
              </span>
            </h1>
            
            <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 antialiased">
              Tidak perlu mendaftar akun atau mengisi formulir panjang di web. Cukup chat langsung kebutuhan Anda ke WhatsApp atau gunakan Floating Assistant di pojok kanan bawah.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openWhatsApp('Halo Mas Chesta, saya ingin konsultasi langsung pembuatan website untuk bisnis saya.')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-purple-900 hover:bg-purple-800 text-white rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-950/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Chat WhatsApp Sekarang
              </button>
              <button
                onClick={openFloatingAssistant}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-purple-700" />
                Buka Assistant Web
              </button>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="relative max-w-5xl mx-auto" ref={containerRef}>
          
          {/* Animated Purple Gradient Line */}
          <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-px bg-purple-100 -translate-x-1/2 hidden md:block rounded-full">
            <motion.div 
              className="w-full w-[3px] -ml-[1px] bg-gradient-to-b from-purple-700 via-purple-600 to-indigo-600 origin-top rounded-full shadow-[0_0_12px_rgba(107,33,168,0.4)]"
              style={{ scaleY: lineHeight }}
            />
          </div>

          <div className="space-y-24 md:space-y-36">
            {phases.map((phase, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={phase.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-14 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  
                  {/* Timeline Node (Mobile Only) */}
                  <div className="absolute left-7 top-10 w-px h-full bg-purple-100 md:hidden" />

                  {/* Content Container */}
                  <div className={`flex-1 w-full ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div 
                      whileHover={{ x: isEven ? -6 : 6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className={`flex items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200 font-mono text-[11px] font-bold uppercase tracking-wider">
                          {phase.badge}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-slate-900 mb-4">
                        {phase.title}
                      </h3>
                      
                      <p className="font-sans text-[16px] text-slate-600 leading-[1.68] tracking-[-0.011em] mb-6 max-w-lg ml-auto mr-auto md:ml-0 md:mr-0 antialiased">
                        {phase.description}
                      </p>

                      <ul className={`flex flex-col gap-3 mb-6 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                        {phase.features.map((feature, fIndex) => (
                          <motion.li 
                            key={fIndex} 
                            initial={{ opacity: 0, x: isEven ? 15 : -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + (fIndex * 0.08), duration: 0.4 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2.5 text-sm font-sans font-medium text-slate-700"
                          >
                            {isEven && <span className="hidden md:block">{feature}</span>}
                            <div className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                            <span className={isEven ? "md:hidden" : ""}>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className={`flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <button
                          onClick={() => openWhatsApp(phase.waText)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-900 text-purple-900 hover:text-white border border-purple-200 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xs cursor-pointer group"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-purple-600 group-hover:text-white transition-colors" />
                          {phase.actionLabel}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Node (Desktop) / Left Node (Mobile) */}
                  <div className="relative shrink-0 z-10 flex flex-col items-center pl-4 md:pl-0">
                    <motion.div 
                      whileHover={{ scale: 1.08, rotate: 3 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-3xl shadow-xl shadow-purple-950/5 border border-purple-100 flex items-center justify-center relative overflow-hidden group cursor-pointer"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-purple-600 transition-opacity duration-300" />
                      {phase.icon}
                    </motion.div>
                    <div className="mt-4 px-3.5 py-1 rounded-full bg-purple-900 text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
                      Phase {phase.id}
                    </div>
                  </div>

                  {/* Visual Card (Crisp White + Purple Tint) */}
                  <div className="flex-1 w-full pl-12 md:pl-0">
                    <motion.div 
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative group rounded-[2rem] overflow-hidden bg-white border border-purple-100 shadow-xl shadow-purple-950/5 p-8 transition-all hover:shadow-2xl hover:shadow-purple-900/10 hover:border-purple-200"
                    >
                      <div className="relative z-10 flex flex-col items-center justify-center min-h-[190px] text-center">
                        <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-200/80 flex items-center justify-center mb-4 text-purple-700 shadow-xs">
                          {phase.icon}
                        </div>
                        <h4 className="font-display font-bold text-slate-900 text-lg mb-1">{phase.title}</h4>
                        <p className="font-sans text-xs text-slate-500 max-w-xs">Terhubung langsung ke WhatsApp & Staging Live Preview.</p>
                      </div>
                    </motion.div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Card */}
        <div className="mt-32 text-center pb-12">
           <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex flex-col items-center bg-white border border-purple-200/80 rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-purple-950/5 w-full max-w-3xl mx-auto relative overflow-hidden"
           >
             <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-900 border border-purple-200 flex items-center justify-center mb-6 shadow-xs">
               <MessageCircle className="w-7 h-7" />
             </div>

             <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight relative z-10 text-slate-900">
               Siap Wujudkan Website Bisnis Anda?
             </h2>
             <p className="font-sans text-slate-600 mb-8 text-base max-w-md relative z-10 leading-relaxed">
               Langsung terhubung dengan Principal Engineer Chesta Azka. Dapatkan konsultasi gratis dan rancangan awal dalam hitungan menit.
             </p>
             
             <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
               <button 
                 onClick={() => openWhatsApp('Halo Mas Chesta, saya ingin memesan website untuk bisnis saya. Bagaimana langkah awalnya?')} 
                 className="px-8 py-4 bg-purple-900 hover:bg-purple-800 text-white rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all hover:scale-105 active:scale-95 shadow-xl shadow-purple-950/20 flex items-center gap-2.5 cursor-pointer"
               >
                 <MessageCircle className="w-4 h-4" />
                 Chat Langsung via WhatsApp
               </button>
               <button 
                 onClick={openFloatingAssistant} 
                 className="px-8 py-4 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
               >
                 <Bot className="w-4 h-4 text-purple-700" />
                 Gunakan Assistant Web
               </button>
             </div>
           </motion.div>
        </div>
      </div>
    </main>
  );
}
