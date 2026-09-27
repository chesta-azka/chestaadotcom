'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Gauge, Zap } from 'lucide-react';
import { PROJECTS } from '../../data/projects';

export default function ServiceCaseStudiesProof() {
  const proofProjects = PROJECTS.slice(0, 2);

  return (
    <section className="mb-24" id="case-studies">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Zap size={13} className="text-emerald-600" />
            <span>Bukti Riil Pengerjaan</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 tracking-tight">
            Studi Kasus Proyek Nyata.
          </h2>
          <p className="text-slate-600 font-sans text-sm sm:text-base mt-2">
            Lihat bagaimana arsitektur teknis kami diimplementasikan untuk memberikan hasil terukur pada bisnis di BSD City dan Jabodetabek.
          </p>
        </div>
        <Link 
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-700 hover:text-purple-900 uppercase tracking-wider transition-colors"
        >
          <span>Buka Semua Portofolio</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {proofProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            whileHover={{ y: -6 }}
            className="group rounded-3xl bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between shadow-2xs"
          >
            <div>
              {/* Thumbnail Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-slate-900 uppercase tracking-wider shadow-sm">
                    {project.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-mono text-purple-300 block mb-1">
                    {project.client}
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight leading-snug">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Description & Impact Preview */}
              <div className="p-6 sm:p-7">
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>

                {/* Key Metric Highlight */}
                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100/80 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-sans text-purple-950 font-bold">
                    <Gauge size={16} className="text-purple-700 shrink-0" />
                    <span>{project.id === 'rumah-tropis' ? 'Waktu Render Edge' : 'Efisiensi Operasional CS'}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {project.id === 'rumah-tropis' ? '< 0.3s' : '-82% Tiket Manual'}
                  </span>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span 
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Link CTA */}
            <div className="px-6 sm:px-7 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-purple-700 group-hover:text-purple-900">
              <Link 
                to={`/portfolio/${project.id}`}
                className="flex items-center gap-2 hover:underline w-full justify-between"
              >
                <span>Pelajari Arsitektur &amp; Hasil Proyek</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
