import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/projects';
import { ArrowLeft, CheckCircle2, AlertCircle, Calendar, ExternalLink, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEOProvider from '../components/atoms/SEOProvider';
import Breadcrumbs from '../components/atoms/Breadcrumbs';
import ShareButton from '../components/atoms/ShareButton';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';
import ROILineChart from '../components/organisms/ROILineChart';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find((p) => p.id === id);
  const jsonLd = project ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": project.title,
    "image": [project.image],
    "datePublished": "2026-08-24T08:00:00+08:00",
    "author": [{
        "@type": "Organization",
        "name": "CHESTAADOTCOM"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "CHESTAADOTCOM",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chestaa.com/logo.png"
      }
    },
    "description": project.description,
    "about": {
      "@type": "Place",
      "name": "BSD City, Cisauk, Tangerang"
    }
  } : null;


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
    <div className="pt-[180px] md:pt-[240px] pb-32 min-h-screen bg-transparent relative overflow-hidden select-none">
      <SEOProvider 
        title={`${project.title} — CHESTAADOTCOM`} 
        description={project.description} 
      />

      {/* Cinematic Aura Effect */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-radial-gradient from-[#6b21a8]/5 via-transparent to-transparent opacity-60" />

      <div className="mx-auto max-w-4xl px-6 relative z-10 w-full mt-12">
        {/* Breadcrumb Navigation */}
        <div className="flex justify-between items-center mt-12 mb-8">
          
          <ShareButton title={project.title} text={project.description} className="text-slate-500 hover:text-purple-600 bg-white/40 backdrop-blur-xl shadow-xl shadow-purple-900/5 border border-white/60 px-4 py-2 rounded-full transition-colors hover:bg-white/60" />
        </div>

        {/* Hero Section */}
        <div className="space-y-6 mb-16 mt-12">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="px-3.5 py-1.5 rounded-full bg-[#6b21a8]/10 border border-[#6b21a8]/20 text-[10px] font-mono font-bold text-[#6b21a8] uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-slate-500 flex items-center gap-1.5 font-mono">
              <Calendar size={13} /> {project.duration || '1 Minggu'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-medium text-slate-900 tracking-tight leading-[1.1] max-w-3xl">
            {project.title}
          </h1>

          <div className="flex gap-4 items-center pt-2">
            <span className="text-xs font-mono text-slate-500">Client:</span>
            <span className="text-xs font-sans text-slate-700 font-bold">{project.client || 'Corporate Partner'}</span>
          </div>
        </div>

        {/* Premium Framed Asset Header */}
        <div className="relative aspect-[16/9] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 shadow-2xl mb-16 bg-white">
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-slate-100 pt-16">
          
          {/* Left Block - Detailed Description & Bullet Points */}
          <div className="md:col-span-8 space-y-12">
            
            {/* Overview */}
            <div className="space-y-4">
              <h3 className="text-lg font-display font-semibold text-slate-900 flex items-center gap-2.5">
                Project Overview
              </h3>
              <p className="text-slate-600 font-sans text-base leading-relaxed">
                {project.overview || project.description}
              </p>
            </div>

            {/* Challenges */}
            {project.challenges && (
              <div className="space-y-4">
                <h3 className="text-lg font-display font-semibold text-slate-900 flex items-center gap-2.5">
                  The Business Challenges
                </h3>
                <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            )}

            {/* Solutions & Core Features */}
            {project.solution && (
              <div className="space-y-6">
                <h3 className="text-lg font-display font-semibold text-slate-900 flex items-center gap-2.5">
                  Designed & Coded Solutions
                </h3>
                
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  {project.solution}
                </p>

                {/* Features Checklist */}
                <ul className="space-y-3 pt-4 text-slate-600">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6b21a8] shrink-0" />
                      <span className="text-sm sm:text-base font-sans">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right Block - Sidebar Core Metrics & Action CTAs */}
          <div className="md:col-span-4 space-y-8">
            
            {/* ROI D3 Chart */}
            <ROILineChart roiPercentage={124} />

            {/* Minimal Stat Badge */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#6b21a8]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col items-start space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">PERFORMANCE TARGET</span>
                <span className="text-5xl font-mono font-bold text-[#6b21a8] tracking-tight">{metricValue}</span>
                <span className="text-[10px] font-sans text-slate-600 font-medium">{metricLabel} optimized with perfect score</span>
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className="bg-white/[0.01] border border-slate-100 rounded-2xl p-6 space-y-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">TECH STACK ARCHITECTURE</span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Sticky WhatsApp Conversion Button */}
            <div className="bg-gradient-to-br from-[#131825] to-[#0A0D14] border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="text-slate-900 font-display font-medium text-lg leading-tight">Yakin ingin brand Anda tertinggal?</h4>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">Dapatkan website interaktif super kencang seperti ini untuk menunjang branding bisnis Anda.</p>
              
              <a 
                href={`https://wa.me/6282125447232?text=${encodeURIComponent(`Halo CHESTAADOTCOM, saya tertarik memodifikasi layout eksklusif seperti pada project ${project.title}. Boleh minta penawaran harganya?`)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#6b21a8] text-[#0A0F1C] font-mono text-xs font-extrabold uppercase rounded-xl tracking-wider hover:bg-[#cbf500] transition-colors"
              >
                Mulai Diskusi <ExternalLink size={12} />
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Suggested Other Projects Section */}
      <div className="mx-auto max-w-4xl px-6 relative z-10 w-full mt-24 mb-16">
        <h3 className="text-xl font-display font-semibold text-slate-900 mb-8 border-b border-slate-100 pb-4">
          Lihat Mahakarya Lainnya
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.filter(p => p.id !== project.id).slice(0, 2).map((other) => (
            <Link 
              key={other.id} 
              to={`/portfolio/${other.id}`}
              className="group block rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 hover:border-[#6b21a8]/30 transition-all duration-300"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-white">
                <img 
                  src={other.thumbnail} 
                  alt={other.title} 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-mono font-bold text-[#6b21a8] tracking-widest uppercase block mb-2">
                  {other.category}
                </span>
                <h4 className="text-lg font-display text-slate-900 group-hover:text-[#6b21a8] transition-colors line-clamp-1">
                  {other.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CreativityMarquee />
    </div>
  );
}
