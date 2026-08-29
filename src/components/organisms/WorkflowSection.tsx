import { motion, useScroll, useTransform } from 'motion/react';
import { Search, PenTool, Code, Rocket, ArrowRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { useRef } from 'react';

const steps = [
    { icon: Search, title: "Discovery & Architecture", desc: "Menganalisis proses bisnis dan merancang arsitektur sistem enterprise yang skalabel.", id: "01" },
    { icon: PenTool, title: "Intelligent Design", desc: "Merancang antarmuka pengguna berbasis data dan alur kerja terotomatisasi yang mulus.", id: "02" },
    { icon: Code, title: "Agile Development", desc: "Implementasi teknologi mutakhir dengan standar keamanan tinggi dan integrasi AI.", id: "03" },
    { icon: Rocket, title: "Deployment & Scaling", desc: "Peluncuran sistem yang terukur disertai dukungan infrastruktur berkelanjutan.", id: "04" }
];

export default function WorkflowSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section className="py-4 sm:py-8 text-slate-900 relative overflow-hidden" ref={containerRef}>
            {/* Background Accents */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute -left-40 top-20 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-40 bottom-20 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full relative z-10">
                <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-14">
                    <SectionHeader 
                        metaTag="ENTERPRISE WORKFLOW"
                        title="Metodologi Eksekusi."
                        description="Pendekatan terstruktur kami memastikan setiap fase integrasi berjalan optimal, aman, dan berorientasi pada skalabilitas bisnis Anda."
                        align="center"
                    />
                </div>
                
                <div className="@container w-full relative">
                    {/* Scroll-triggered progress bar track (Desktop) */}
                    <div className="hidden @4xl:block absolute top-[60px] left-[12.5%] right-[12.5%] h-1 bg-slate-200/50 rounded-full overflow-hidden z-0">
                        <motion.div 
                            className="absolute inset-y-0 left-0 bg-purple-600 rounded-full origin-left"
                            style={{ scaleX }}
                        />
                    </div>

                    {/* Scroll-triggered progress bar track (Mobile & Tablet) */}
                    <div className="block @4xl:hidden absolute left-[60px] top-[12.5%] bottom-[12.5%] w-1 bg-slate-200/50 rounded-full overflow-hidden z-0">
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
                                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="relative flex flex-col h-full bg-white/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/60 shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-500/10 hover:bg-white/60 hover:-translate-y-1 transition-all duration-300 group"
                            >
                                    {/* Number Badge */}
                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-slate-900 text-white font-mono font-bold text-sm rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300">
                                        {step.id}
                                    </div>

                                    {/* Icon Container */}
                                    <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-6 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                        <step.icon size={24} strokeWidth={1.5} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-display font-bold tracking-tight mb-3 text-slate-900 group-hover:text-purple-600 transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm md:text-base font-sans leading-relaxed flex-grow">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
        </section>
    );
}
