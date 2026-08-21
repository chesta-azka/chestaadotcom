import { motion } from 'motion/react';
import { Search, PenTool, Code, Rocket } from 'lucide-react';
import SectionHeader from './SectionHeader';

const steps = [
    { icon: Search, title: "Discovery & Ideation", desc: "Menggali secara mendalam ide, tujuan, dan kebutuhan proyek untuk memastikan hasil sesuai harapan.", id: "01" },
    { icon: PenTool, title: "Planning & Wireframing", desc: "Membuat rancangan visual dan pengalaman pengguna yang menarik dan intuitif.", id: "02" },
    { icon: Code, title: "Development & Integration", desc: "Mengembangkan sistem dengan teknologi terkini yang cepat, aman, dan responsif.", id: "03" },
    { icon: Rocket, title: "Go Live & Support", desc: "Meluncurkan proyek secara optimal disertai dukungan berkelanjutan di masa depan.", id: "04" }
];

export default function WorkflowSection() {
    return (
        <section className="py-24 bg-transparent text-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
            <div className="mx-auto max-w-7xl px-6 relative z-10">
                
                <div className="flex flex-col items-center justify-center text-center mb-20">
                    <SectionHeader 
                        metaTag="PROSES KERJA TERSTRUKTUR"
                        title="Metodologi Eksekusi."
                        description="Kami memastikan setiap fase pengembangan digital berjalan optimal, transparan, dan berorientasi pada hasil terbaik."
                        align="center"
                    />
                </div>
                
                {/* Timeline Container */}
                <div className="relative w-full max-w-5xl mx-auto">
                    {/* Connecting Line (Desktop: Horizontal, Mobile: Vertical) */}
                    <div className="absolute left-[40px] lg:hidden top-0 bottom-0 w-px bg-indigo-100" />
                    <div className="hidden lg:block absolute top-[48px] left-[12.5%] right-[12.5%] h-px bg-indigo-100" />

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-12 lg:gap-y-0 lg:gap-x-8">
                        {steps.map((step, i) => (
                            <motion.div 
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="relative flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center group"
                            >
                                {/* Step Icon Node */}
                                <div className="relative z-10 w-20 h-20 lg:w-24 lg:h-24 shrink-0 flex items-center justify-center mb-0 lg:mb-6 mr-6 lg:mr-0">
                                    <div className="absolute inset-0 bg-white rounded-2xl shadow-sm border border-slate-200/60 group-hover:border-indigo-300 transition-colors duration-500" />
                                    <div className="absolute inset-2 bg-indigo-50/50 rounded-xl group-hover:bg-indigo-600 transition-colors duration-500 flex items-center justify-center">
                                        <step.icon size={28} className="text-indigo-600 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                                    </div>
                                    <div className="absolute -top-3 -right-3 bg-white w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center shadow-sm">
                                        <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">{step.id}</span>
                                    </div>
                                </div>

                                {/* Step Content */}
                                <div className="flex-1 mt-1 lg:mt-0">
                                    <h3 className="text-lg md:text-xl font-display font-bold tracking-tight mb-2 lg:mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm md:text-base font-sans leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                
            </div>
        </section>
    );
}
