"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Cpu, 
  Cloud, 
  Shield, 
  Search, 
  Code2, 
  Zap, 
  ArrowUpRight,
  Database,
  Lock,
  Workflow
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Enterprise Web Architecture",
    slug: "web-development-nextjs",
    icon: Globe,
    description: "Rekayasa website performa tinggi menggunakan Next.js 15+ dengan fokus pada skalabilitas dan SEO ekstrem.",
    features: ["Zero-Latency Protocol", "Edge-First Rendering", "Core Web Vitals 100"],
    color: "from-blue-500/20 to-indigo-500/20",
    accent: "text-blue-600"
  },
  {
    title: "Agentic AI Automation",
    slug: "ai-integration",
    icon: Cpu,
    description: "Otomasi operasional 24/7 menggunakan agen AI otonom yang cerdas untuk meningkatkan efisiensi tim Anda.",
    features: ["Autonomous Agents", "Custom LLM Training", "Workflow Integration"],
    color: "from-purple-500/20 to-pink-500/20",
    accent: "text-purple-600"
  },
  {
    title: "Cloud Infrastructure",
    slug: "cloud-infrastructure",
    icon: Cloud,
    description: "Penyusunan arsitektur cloud yang tangguh (High-Availability) pada AWS, Google Cloud, dan Azure.",
    features: ["Auto-Scaling Systems", "Disaster Recovery", "Cost Optimization"],
    color: "from-emerald-500/20 to-teal-500/20",
    accent: "text-emerald-600"
  },
  {
    title: "Cybersecurity Hardening",
    slug: "security-audit",
    icon: Shield,
    description: "Audit keamanan mendalam dan pengerasan sistem untuk melindungi aset digital dari ancaman siber.",
    features: ["Penetration Testing", "Security Audits", "Data Encryption"],
    color: "from-rose-500/20 to-orange-500/20",
    accent: "text-rose-600"
  },
  {
    title: "Advanced SEO & AEO",
    slug: "seo-aeo",
    icon: Search,
    description: "Optimasi untuk mesin pencari tradisional dan algoritma AI (ChatGPT, Perplexity) agar brand Anda tetap relevan.",
    features: ["Local SEO Dominance", "AI Recommendation Engine", "Schema Markup"],
    color: "from-amber-500/20 to-yellow-500/20",
    accent: "text-amber-600"
  },
  {
    title: "Custom Systems & ERP",
    slug: "pembuatan-website",
    icon: Workflow,
    description: "Pengembangan sistem internal kustom, dashboard, dan ERP yang dirancang khusus untuk proses bisnis Anda.",
    features: ["Legacy Migration", "API Orchestration", "Real-time Dashboards"],
    color: "from-slate-500/20 to-slate-700/20",
    accent: "text-slate-700"
  }
];

export default function ServiceCatalog() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="service-catalog">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-purple-600 mb-4 block">
              SERVICE CATALOG v3.0
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-display mb-4">
              Katalog Rekayasa & <br className="hidden sm:block" /> Solusi Strategis.
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl font-sans leading-relaxed">
              Eksplorasi ekosistem layanan kami yang dirancang untuk mentransformasi kompleksitas teknis menjadi keunggulan kompetitif yang nyata.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            <Zap size={12} className="text-amber-500" />
            <span>High-Fidelity Engineering</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              <Link
                to={`/layanan/${service.slug}`}
                className="block h-full bg-white border border-slate-100 rounded-[2rem] p-8 transition-all duration-500 hover:border-transparent hover:shadow-2xl hover:shadow-slate-200/50 overflow-hidden relative"
              >
                {/* Background Gradient Reveal */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white group-hover:border-transparent transition-all duration-500 shadow-sm ${service.accent}`}>
                    <service.icon size={28} />
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900 font-display mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-slate-500 leading-relaxed mb-8 font-sans group-hover:text-slate-700 transition-colors duration-500">
                    {service.description}
                  </p>

                  {/* Feature Pills Reveal */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <span 
                        key={fIndex}
                        className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider group-hover:bg-white group-hover:border-white/50 group-hover:text-slate-600 transition-all duration-300"
                        style={{ transitionDelay: `${fIndex * 50}ms` }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50 group-hover:border-white/20">
                    <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                      Pelajari Solusi
                    </span>
                    <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center bg-white group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-500 group-hover:translate-x-1">
                      <ArrowUpRight size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
