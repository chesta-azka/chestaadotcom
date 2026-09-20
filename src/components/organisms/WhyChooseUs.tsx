'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Code2, Zap, Unlock, ShieldCheck, Cpu, Globe } from 'lucide-react';

const FEATURES = [
  {
    title: '100% Source Code Ownership',
    description: 'Anda memegang kendali penuh. Kami menyerahkan seluruh kode sumber tanpa biaya lisensi tersembunyi atau hak cipta tertinggal.',
    icon: Code2,
  },
  {
    title: 'Sub-second Latency',
    description: 'Kecepatan adalah prioritas. Arsitektur Next.js kami memastikan load-time di bawah 1 detik untuk pengalaman pengguna yang superior.',
    icon: Zap,
  },
  {
    title: 'No Vendor Lock-in',
    description: 'Kebebasan infrastruktur. Sistem kami dibangun di atas standar terbuka (Open Source), memungkinkan Anda berpindah kapan saja.',
    icon: Unlock,
  },
  {
    title: 'Bank-Grade Security',
    description: 'Keamanan tanpa kompromi. Implementasi enkripsi data dan audit keamanan berkala untuk melindungi aset digital Anda.',
    icon: ShieldCheck,
  },
  {
    title: 'Agentic AI Ready',
    description: 'Masa depan ada di sini. Infrastruktur kami siap diintegrasikan dengan Agentic AI untuk otomatisasi proses bisnis yang cerdas.',
    icon: Cpu,
  },
  {
    title: 'Global Edge Delivery',
    description: 'Akses cepat dari mana saja. Konten Anda didistribusikan melalui jaringan CDN global untuk performa maksimal di seluruh dunia.',
    icon: Globe,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded"
          >
            Value Engineering
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl font-display font-black text-slate-900 tracking-tight"
          >
            Mengapa Memilih CHESTAADOTCOM?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-500 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Kami melampaui standar pembuatan website biasa dengan fokus pada kepemilikan aset, performa ekstrem, dan skalabilitas jangka panjang.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-10 bg-white border-2 border-slate-50 rounded-2xl hover:border-violet-600 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-violet-100 group flex flex-col items-start"
            >
              <div className="w-14 h-14 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <feature.icon size={28} strokeWidth={2} />
              </div>
              <h3 className="mt-8 text-xl font-black text-slate-900 tracking-tight group-hover:text-violet-600 transition-colors">
                {feature.title}
              </h3>
              <p className="mt-4 text-slate-500 text-base leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
