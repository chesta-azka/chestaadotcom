import { motion } from 'motion/react';
import TextRevealSmooth from '../atoms/TextRevealSmooth';

export default function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Strategy & Wireframe', desc: 'Pemetaan audiens, target konversi, dan kerangka arsitektur sebelum menulis 1 baris kode.' },
    { num: '02', title: 'High-Fidelity Build', desc: 'Desain visual eksklusif dan pengembangan menggunakan Next.js. Fokus pada micro-interactions.' },
    { num: '03', title: 'Go-Live & Scale', desc: 'Optimasi SEO on-page, integrasi analytics, dan peluncuran ditenagai infrastruktur Vercel.' }
  ];

  return (
    <section className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-24 md:mb-32 max-w-4xl"
        >
          <span className="text-[#6b21a8] font-sans font-medium text-sm uppercase tracking-widest block mb-6">
            03 — The Workflow
          </span>
          <div className="text-6xl md:text-6xl font-display font-medium tracking-tight text-slate-900 leading-[1.05] flex flex-wrap">
            <TextRevealSmooth 
              text="Proses Terukur, Konversi Maksimal." 
              highlightWords={["Konversi", "Maksimal."]}
              highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-400 font-serif italic pr-4"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {steps.map((s, i) => (
            <motion.div 
              key={s.num} 
              className="relative pt-10"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.1 }}
            >
              <div className="text-7xl md:text-[6rem] lg:text-[7.5rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-purple-200 to-purple-50 mb-8 leading-none select-none">
                {s.num}
              </div>
              <h3 className="text-2xl lg:text-3xl font-display font-medium tracking-tight text-slate-900 mb-4">{s.title}</h3>
              <p className="text-slate-600 font-sans leading-relaxed text-base">{s.desc}</p>
              
              {/* Animated Progress bar */}
              <motion.div 
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-purple-400 to-purple-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
              />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-slate-100 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
