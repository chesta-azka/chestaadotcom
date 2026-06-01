import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/projects';
import { ArrowLeft, CheckCircle2, AlertCircle, Calendar, ExternalLink, Zap } from 'lucide-react';
import MetaTags from '../components/atoms/MetaTags';
import Breadcrumbs from '../components/atoms/Breadcrumbs';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  // Pre-determined high-performance metric
  const metricValue = '0.8s';
  const metricLabel = 'Load Time';

  return (
    <div className="pt-24 pb-32 min-h-screen bg-transparent relative overflow-hidden select-none">
      <MetaTags 
        title={`${project.title} — CHESTADOTCOM`} 
        description={project.description} 
      />

      {/* Cinematic Aura Effect */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-radial-gradient from-[#D4FF00]/5 via-transparent to-transparent opacity-60" />

      <div className="mx-auto max-w-4xl px-6 relative z-10 w-full mt-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[
          { label: 'Showcase', path: '/portfolio' },
          { label: project.title }
        ]} />

        {/* Back Link */}
        <Link 
          to="/portfolio" 
          className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-gray-500 hover:text-[#D4FF00] transition-colors mb-12 block w-max"
        >
          <ArrowLeft size={14} /> Back to Showcase
        </Link>

        {/* Hero Section */}
        <div className="space-y-6 mb-16">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="px-3.5 py-1.5 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/20 text-[10px] font-mono font-bold text-[#D4FF00] uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-gray-500 flex items-center gap-1.5 font-mono">
              <Calendar size={13} /> {project.duration || '1 Minggu'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight leading-[1.1] max-w-3xl">
            {project.title}
          </h1>

          <div className="flex gap-4 items-center pt-2">
            <span className="text-xs font-mono text-gray-500">Client:</span>
            <span className="text-xs font-sans text-gray-300 font-bold">{project.client || 'Corporate Partner'}</span>
          </div>
        </div>

        {/* Premium Framed Asset Header */}
        <div className="relative aspect-[16/9] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-16 bg-[#0D111A]">
          <picture>
            <img 
              src={project.thumbnail} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
        </div>

        {/* Detailed Layout Container (No Interactive Garbage) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/5 pt-16">
          
          {/* Left Block - Detailed Description & Bullet Points */}
          <div className="md:col-span-8 space-y-12">
            
            {/* Overview */}
            <div className="space-y-4">
              <h3 className="text-lg font-display font-semibold text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#D4FF00] rounded-full inline-block" />
                Project Overview
              </h3>
              <p className="text-gray-400 font-sans text-base leading-relaxed">
                {project.overview || project.description}
              </p>
            </div>

            {/* Challenges */}
            {project.challenges && (
              <div className="space-y-4 bg-white/[0.01] border border-white/5 rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-display font-semibold text-white flex items-center gap-2.5">
                  <AlertCircle size={18} className="text-amber-500" />
                  The Business Challenges
                </h3>
                <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            )}

            {/* Solutions & Core Features */}
            {project.solution && (
              <div className="space-y-6">
                <h3 className="text-lg font-display font-semibold text-white flex items-center gap-2.5">
                  <CheckCircle2 size={18} className="text-[#D4FF00]" />
                  Designed & Coded Solutions
                </h3>
                
                <p className="text-gray-400 font-sans text-base leading-relaxed">
                  {project.solution}
                </p>

                {/* Features Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                      <span className="inline-flex w-5 h-5 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/20 items-center justify-center text-[#D4FF00] font-bold text-xs shrink-0 select-none">✓</span>
                      <span className="text-xs sm:text-sm text-gray-300 font-sans font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Block - Sidebar Core Metrics & Action CTAs */}
          <div className="md:col-span-4 space-y-8">
            
            {/* Minimal Stat Badge */}
            <div className="bg-[#131825]/40 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4FF00]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col items-start space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">PERFORMANCE TARGET</span>
                <span className="text-5xl font-mono font-bold text-[#D4FF00] tracking-tight">{metricValue}</span>
                <span className="text-[10px] font-sans text-gray-400 font-medium">{metricLabel} optimized with perfect score</span>
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 space-y-4">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">TECH STACK ARCHITECTURE</span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-bold text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Sticky WhatsApp Conversion Button */}
            <div className="bg-gradient-to-br from-[#131825] to-[#0A0D14] border border-white/10 rounded-2xl p-6 space-y-4">
              <h4 className="text-white font-display font-medium text-lg leading-tight">Yakin ingin brand Anda tertinggal?</h4>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">Dapatkan website interaktif super kencang seperti ini untuk menunjang branding bisnis Anda.</p>
              
              <a 
                href={`https://wa.me/6282125447232?text=${encodeURIComponent(`Halo CHESTADOTCOM, saya tertarik memodifikasi layout eksklusif seperti pada project ${project.title}. Boleh minta penawaran harganya?`)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#D4FF00] text-[#0A0F1C] font-mono text-xs font-extrabold uppercase rounded-xl tracking-wider hover:bg-[#cbf500] transition-colors"
              >
                Mulai Diskusi <ExternalLink size={12} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
