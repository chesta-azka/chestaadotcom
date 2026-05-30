import { motion, useMotionValue, useTransform, animate, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

function Counter({ from, to }: { from: number; to: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -100px 0px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      count.set(from);
      const controls = animate(count, to, { duration: 2, ease: 'easeOut' });
      return controls.stop;
    } else {
      count.set(from);
    }
  }, [inView, count, from, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { value: 120, label: 'BRAND TRANSFORMED', suffix: '+' },
  { value: 99, label: 'PERFORMANCE SCORE', suffix: '%' },
  { value: 450, label: 'STARTING PRICE', suffix: 'K' },
  { value: 24, label: 'TURNAROUND HOURS', suffix: 'H' },
];

export default function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      <div className="w-full relative z-10 border-y border-white/5 bg-[#131825]/40 backdrop-blur-xl mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="py-12 md:py-16 px-4 text-center flex flex-col items-center justify-center relative group"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="absolute inset-0 bg-[#D4FF00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight text-white mb-2 md:mb-4 relative z-10">
                <Counter from={0} to={stat.value} />
                <span className="text-2xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] to-green-400">{stat.suffix}</span>
              </div>
              <div className="text-[10px] md:text-xs font-sans tracking-widest text-[#D4FF00] font-semibold relative z-10">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
