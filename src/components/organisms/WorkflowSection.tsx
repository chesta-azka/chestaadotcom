import { motion } from 'motion/react';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

const steps = [
    { icon: Search, title: "Discovery", desc: "Menggali ide dan kebutuhan bisnis Anda.", id: "01" },
    { icon: PenTool, title: "Planning", desc: "Rancangan visual intuitif & kustom.", id: "02" },
    { icon: Code, title: "Development", desc: "Eksekusi kode berkinerja tinggi.", id: "03" },
    { icon: Rocket, title: "Go Live", desc: "Peluncuran & dukungan berkelanjutan.", id: "04" }
];

export default function WorkflowSection() {
    return (
        <section className="relative py-24 bg-[#06080F]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#06080F]/0 via-[#06080F] to-[#06080F]/0 pointer-events-none" />
            <div className="relative mx-auto max-w-5xl px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-display font-medium mb-4 text-white">Alur Kerja yang Efisien.</h2>
                    <p className="text-gray-500 text-lg font-sans">Proses lugas untuk hasil maksimal.</p>
                </div>
                
                <div className="space-y-6">
                    {steps.map((step, i) => (
                        <motion.div 
                            key={step.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="flex items-center gap-6 p-6 rounded-2xl bg-[#0D111A] border border-white/5 hover:border-white/10 transition-colors"
                        >
                             <div className="w-12 h-12 rounded-full bg-[#131825] border border-white/5 flex items-center justify-center text-[#D4FF00] font-mono text-xs">
                                 {step.id}
                             </div>
                             <div>
                                <h3 className="text-white font-bold mb-1">{step.title}</h3>
                                <p className="text-gray-500 text-sm">{step.desc}</p>
                             </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
