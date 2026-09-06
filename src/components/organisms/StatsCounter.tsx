import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';

interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
  decimals?: number;
}

const stats: StatItem[] = [
  {
    id: 'projects',
    value: 50,
    suffix: '+',
    label: 'Proyek Selesai',
    description: 'Aplikasi web & arsitektur AI yang berhasil diluncurkan.'
  },
  {
    id: 'speed',
    value: 0.5,
    suffix: 's',
    label: 'Rata-rata Waktu Muat',
    description: 'Kecepatan pemuatan ultra-cepat untuk SEO & konversi optimal.',
    decimals: 1
  },
  {
    id: 'uptime',
    value: 99.9,
    suffix: '%',
    label: 'Server Uptime',
    description: 'Keandalan infrastruktur untuk bisnis yang selalu aktif.',
    decimals: 1
  },
  {
    id: 'roi',
    value: 300,
    suffix: '%',
    label: 'Estimasi ROI',
    description: 'Peningkatan efisiensi melalui otomasi cerdas AI.'
  }
];

const Counter = ({ value, decimals = 0 }: { value: number, decimals?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easeProgress * value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
    </span>
  );
};

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col relative group p-8 rounded-3xl bg-slate-50/70 hover:bg-white border border-slate-200/90 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-default"
    >
      {/* Mouse-following spotlight glow effect */}
      <div
        className="absolute pointer-events-none -inset-px transition-opacity duration-300 rounded-3xl z-0"
        style={{
          opacity,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(168, 85, 247, 0.12), transparent 70%)`
        }}
      />
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-baseline gap-1 mb-2">
            {stat.prefix && (
              <span className="text-2xl font-display font-medium text-slate-400">{stat.prefix}</span>
            )}
            <h4 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-slate-900 group-hover:text-purple-700 transition-colors">
              <Counter value={stat.value} decimals={stat.decimals} />
            </h4>
            {stat.suffix && (
              <span className="text-3xl font-display font-medium text-purple-600">{stat.suffix}</span>
            )}
          </div>
          <div className="w-12 h-1 bg-purple-200 rounded-full mb-5 group-hover:w-full group-hover:bg-purple-600 transition-all duration-500" />
          <h5 className="text-lg font-display font-semibold text-slate-900 mb-2">{stat.label}</h5>
        </div>
        <p className="text-sm font-sans text-slate-600 leading-relaxed">
          {stat.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-50/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200/80 font-mono font-bold uppercase tracking-wider text-xs mb-4 inline-block">
            Verified Performance &amp; Metrics
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-900">
            Dampak Nyata dalam Angka
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
