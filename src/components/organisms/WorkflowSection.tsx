import { motion, useScroll, useTransform } from 'motion/react';
import { MessageCircle, CheckCircle2, Code2, Globe2, ArrowRight, Bot } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { useRef } from 'react';

const steps = [
    { 
      icon: MessageCircle, 
      title: "1. Konsultasi WhatsApp", 
      desc: "Diskusikan visi, referensi desain, dan kebutuhan website Anda secara langsung via WhatsApp dengan Mas Chesta tanpa ribet.", 
      id: "01" 
    },
    { 
      icon: CheckCircle2, 
      title: "2. Penawaran & Paket", 
      desc: "Pilih paket flat transparan mulai Rp650.000 (Promo UMKM Rp540.000) sudah termasuk domain .com dan server cepat.", 
      id: "02" 
    },
    { 
      icon: Code2, 
      title: "3. Rapid Build & Staging", 
      desc: "Proses pembuatan cepat 1-3 hari kerja. Anda menerima link staging live di WhatsApp untuk pengecekan dan revisi.", 
      id: "03" 
    },
    { 
      icon: Globe2, 
      title: "4. Go-Live & Handover", 
      desc: "Website resmi aktif di domain Anda dengan SSL HTTPS, skor performa 100, dan serah terima aset kepemilikan 100%.", 
      id: "04" 
    }
];

export default function WorkflowSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const openWhatsApp = () => {
      const url = `https://wa.me/6282125447232?text=${encodeURIComponent('Halo Mas Chesta, saya ingin konsultasi alur pemesanan website untuk bisnis saya.')}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    const openFloatingAI = () => {
      window.dispatchEvent(new CustomEvent('open-floating-ai'));
    };

    return (
        <section className="py-4 sm:py-8 text-slate-900 relative overflow-hidden" ref={containerRef}>
            {/* Subtle Clean Accents */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-200/50 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-200/50 to-transparent" />
            <div className="absolute -left-40 top-20 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-40 bottom-20 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full relative z-10">
                <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-14">
                    <SectionHeader 
                        metaTag="ALUR PEMESANAN PRAKTIS"
                        title="Alur Langsung via WhatsApp."
                        description="Proses cepat tanpa birokrasi formulir web. Konsultasi langsung dengan Principal Engineer dan pantau proses pembuatan dari WhatsApp Anda."
                        align="center"
                    />
                </div>
                
                <div className="@container w-full relative">
                    {/* Scroll-triggered progress bar track (Desktop) */}
                    <div className="hidden @4xl:block absolute top-[60px] left-[12.5%] right-[12.5%] h-1 bg-purple-100/70 rounded-full overflow-hidden z-0">
                        <motion.div 
                            className="absolute inset-y-0 left-0 bg-purple-600 rounded-full origin-left"
                            style={{ scaleX }}
                        />
                    </div>

                    {/* Scroll-triggered progress bar track (Mobile & Tablet) */}
                    <div className="block @4xl:hidden absolute left-[60px] top-[12.5%] bottom-[12.5%] w-1 bg-purple-100/70 rounded-full overflow-hidden z-0">
                        <motion.div 
                            className="absolute inset-x-0 top-0 bg-purple-600 rounded-full origin-top"
                            style={{ scaleY }}
                        />
                    </div>

                    <div className="grid grid-cols-1 @4xl:grid-cols-4 gap-6 @md:gap-8 relative z-10 max-w-md @4xl:max-w-none mx-auto">
                        {steps.map((step, i) => (
                            <motion.div 
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="relative flex flex-col h-full bg-white/90 backdrop-blur-2xl rounded-3xl p-8 border border-purple-100 shadow-xl shadow-purple-950/5 hover:shadow-2xl hover:shadow-purple-900/10 hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 group"
                            >
                                    {/* Number Badge */}
                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-900 text-white font-mono font-bold text-sm rounded-2xl flex items-center justify-center shadow-lg shadow-purple-950/20 transform rotate-3 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300">
                                        {step.id}
                                    </div>

                                    {/* Icon Container */}
                                    <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-6 text-purple-700 group-hover:bg-purple-900 group-hover:text-white transition-colors duration-300">
                                        <step.icon size={24} strokeWidth={1.75} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-display font-bold tracking-tight mb-3 text-slate-900 group-hover:text-purple-900 transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="font-sans text-slate-600 text-sm md:text-[15px] leading-relaxed flex-grow antialiased">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            ))}
                    </div>

                    {/* Action Bar Below Grid */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                      <button
                        onClick={openWhatsApp}
                        className="inline-flex items-center gap-2.5 px-8 py-4 bg-purple-900 hover:bg-purple-800 text-white rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-950/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat with us on WhatsApp
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={openFloatingAI}
                        className="inline-flex items-center gap-2 px-7 py-4 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Bot className="w-4 h-4 text-purple-700" />
                        Tanya via Assistant Web
                      </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
