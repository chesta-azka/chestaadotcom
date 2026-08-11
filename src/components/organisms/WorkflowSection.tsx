import { motion } from 'motion/react';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

const steps = [
    { icon: Search, title: "Discovery & Ideation", desc: "Menggali secara mendalam ide, tujuan, dan kebutuhan proyek untuk memastikan hasil sesuai harapan.", id: "01" },
    { icon: PenTool, title: "Planning & Wireframing", desc: "Membuat rancangan visual dan pengalaman pengguna yang menarik dan intuitif.", id: "02" },
    { icon: Code, title: "Development & Integration", desc: "Mengembangkan sistem dengan teknologi terkini yang cepat, aman, dan responsif.", id: "03" },
    { icon: Rocket, title: "Go Live & Support", desc: "Meluncurkan proyek secara optimal disertai dukungan berkelanjutan di masa depan.", id: "04" }
];

export default function WorkflowSection() {
    return (
        <section className="py-24 bg-transparent text-white relative overflow-hidden">
            {/* Seamless background blending gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
            <div className="mx-auto max-w-7xl px-6 relative">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4">Proses Transparan.</h2>
                    <p className="text-gray-400 text-base font-sans max-w-lg mx-auto">Kami memastikan setiap langkah berjalan optimal untuk hasil terbaik.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 relative">
                    {steps.map((step, i) => (
                        <motion.div 
                            key={step.title}
                            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="p-6 md:p-8 bg-[#131825]/50 backdrop-blur-md border border-white/5 rounded-[2rem] hover:border-[#D4FF00]/30 hover:bg-[#131825]/80 transition-all duration-300 relative z-10 flex flex-col group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4FF00] group-hover:scale-110 transition-transform duration-300">
                                    <step.icon size={22} strokeWidth={1.5} />
                                </div>
                                <span className="text-5xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors duration-300">{step.id}</span>
                            </div>
                            <h3 className="text-xl font-bold font-sans tracking-tight mb-3">{step.title}</h3>
                            <p className="text-gray-400 text-sm font-sans leading-relaxed flex-grow">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
