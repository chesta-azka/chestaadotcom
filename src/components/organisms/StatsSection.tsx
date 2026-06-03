import { motion, useInView, animate } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        onUpdate: (latest) => setCount(Math.round(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.span className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">
        {count}
        <span className="text-[#D4FF00]">+</span>
      </motion.span>
      <span className="text-gray-400 font-mono text-xs uppercase tracking-widest mt-2">{label}</span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-16 md:py-24 border-y border-white/5 bg-[#06080F]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06080F]/0 via-[#06080F] to-[#06080F]/0 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        <Counter value={12} label="Proyek Selesai" />
        <Counter value={8} label="Klien UMKM" />
        <Counter value={15} label="Website Optimasi" />
        <Counter value={1} label="Tahun Pengalaman" />
      </div>
    </section>
  );
}
