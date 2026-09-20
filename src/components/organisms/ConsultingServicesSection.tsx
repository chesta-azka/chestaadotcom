import { motion } from 'motion/react';
import { ShieldCheck, SearchCode, Database, MessageSquare, ArrowUpRight, Zap, Lightbulb, Users } from 'lucide-react';
import AnimatedHeading from '../atoms/AnimatedHeading';

const consultingServices = [
  {
    title: "Security & Vulnerability Audit",
    desc: "Audit keamanan mendalam untuk mengidentifikasi celah pada infrastruktur digital Anda sebelum menjadi masalah fatal.",
    icon: ShieldCheck,
    color: "text-rose-500",
    bg: "bg-rose-50"
  },
  {
    title: "Performance Optimization Strategy",
    desc: "Strategi teknis untuk mengubah website lambat menjadi sistem berkecepatan tinggi dengan skor PageSpeed 99+.",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    title: "AI Readiness & Roadmap",
    desc: "Konsultasi strategis untuk menentukan bagaimana AI dapat diintegrasikan secara efektif ke dalam alur kerja bisnis Anda.",
    icon: Lightbulb,
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    title: "System Migration & Modernization",
    desc: "Migrasi aman dari sistem legacy (seperti WordPress) ke arsitektur modern yang lebih aman dan scalable.",
    icon: Database,
    color: "text-blue-500",
    bg: "bg-blue-50"
  }
];

import OptimizedImage from '../atoms/OptimizedImage';

export default function ConsultingServicesSection() {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 mb-4 block">
              SPECIALIZED ADVISORY
            </span>
            <AnimatedHeading as="h2" className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-display mb-4">
              Konsultasi Strategis & <br className="hidden sm:block" /> Audit Teknis Independen.
            </AnimatedHeading>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl">
              Selain rekayasa sistem, kami memberikan panduan objektif untuk membantu Anda membuat keputusan teknologi yang tepat dan aman bagi masa depan bisnis.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm relative">
                  <OptimizedImage 
                    src={`https://picsum.photos/seed/expert${i}/100/100`} 
                    alt="Expert" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
            <div className="text-xs font-mono font-bold text-slate-400">
              EXPERT CONSULTANTS
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {consultingServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/[0.03] transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${service.bg} ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 font-display mb-3 tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 font-sans">
                {service.desc}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-purple-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Pelajari Detail</span>
                <ArrowUpRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a 
            href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20ingin%20jadwal%20audit%20teknis%20untuk%20sistem%20saya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl hover:bg-purple-700 transition-all font-mono text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-slate-900/10"
          >
            <MessageSquare size={16} />
            <span>Jadwalkan Audit Strategis</span>
          </a>
        </div>
      </div>
    </section>
  );
}
