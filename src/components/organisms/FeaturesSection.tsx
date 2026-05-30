import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Grid2X2, Gauge, Smartphone, MessageCircle } from 'lucide-react';
import PainPointReveal from '../atoms/PainPointReveal';
import TextRevealSmooth from '../atoms/TextRevealSmooth';

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const features = [
    {
      icon: <Gauge strokeWidth={1} className="text-[#D4FF00]" size={36} />,
      title: "Arsitektur Ultra-Ringan",
      desc: "Load time di bawah 0.8 detik. Teknologi modern memastikan website Anda tidak pernah kehilangan pengunjung."
    },
    {
      icon: <Smartphone strokeWidth={1} className="text-[#D4FF00]" size={36} />,
      title: "Mobile-First Perfection",
      desc: "80% pengunjung Anda mobile. Kami mendesain layar mobile pertama untuk UX tanpa cacat."
    },
    {
      icon: <MessageCircle strokeWidth={1} className="text-[#D4FF00]" size={36} />,
      title: "Konversi WhatsApp",
      desc: "Tidak ada form berbelit. UI langsung menuntun calon pembeli anda ke WA dengan pre-filled message."
    },
    {
      icon: <Grid2X2 strokeWidth={1} className="text-[#D4FF00]" size={36} />,
      title: "Premium Aesthetics",
      desc: "Tinggalkan template murahan. Identitas eksklusif yang membedakan Anda dari ratusan kompetitor."
    }
  ];

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-[#0D111A] text-white rounded-[2.5rem] md:rounded-[4rem] mx-4 md:mx-6 my-16 shadow-[0_32px_64px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="text-[#D4FF00] font-sans font-medium text-sm uppercase tracking-widest block mb-6">
              01 — The Standard
            </span>
            <div className="text-5xl md:text-6xl font-display font-medium tracking-tight text-white mb-10 leading-[1.1] flex flex-wrap">
              <TextRevealSmooth 
                text="Tidak Ada Kompromi Kualitas." 
                highlightWords={["Kompromi", "Kualitas."]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-serif italic pr-4"
              />
            </div>
            <div className="text-lg text-gray-400 font-sans leading-relaxed">
              <p>
                <PainPointReveal className="font-sans text-white font-semibold pr-1" /> membunuh potensi bisnis Anda bahkan sebelum klien sempat membaca penawaran. Kami membangun The Ultimate Performance.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div style={{ y: y1 }} className="space-y-6 pt-0 sm:pt-20">
              {features.slice(0, 2).map((f, i) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  key={i} className="bg-[#131825] border border-white/5 rounded-[2rem] p-10 hover:bg-[#1a2133] transition-colors relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#4F46E5]/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 flex items-center mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      {f.icon}
                    </div>
                    <h3 className="text-2xl font-display font-medium text-white mb-4 tracking-tight">{f.title}</h3>
                    <p className="text-gray-400 leading-relaxed font-sans text-sm">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div style={{ y: y2 }} className="space-y-6">
              {features.slice(2, 4).map((f, i) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  key={i} className="bg-[#131825] border border-white/5 rounded-[2rem] p-10 hover:bg-[#1a2133] transition-colors relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#D4FF00]/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 flex items-center mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      {f.icon}
                    </div>
                    <h3 className="text-2xl font-display font-medium text-white mb-4 tracking-tight">{f.title}</h3>
                    <p className="text-gray-400 leading-relaxed font-sans text-sm">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
