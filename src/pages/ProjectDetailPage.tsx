import React, { useEffect } from 'react';
import MetaTags from '../components/atoms/MetaTags';
import { generatePortfolioSchema } from '../lib/seo';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, User, Calendar, Globe, ExternalLink, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import LazyImage from '../components/atoms/LazyImage';
import CaseStudyLayout from '../components/CaseStudyLayout';
import Breadcrumbs from '../components/atoms/Breadcrumbs';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const fadeUpVariant: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col items-center justify-center p-6 text-center pt-24">
        <div className="max-w-2xl bg-white/60 backdrop-blur-xl border border-white p-12 rounded-xl shadow-sm">
          <h1 className="text-3xl font-display font-bold mb-4 tracking-tight">Project Not Found</h1>
          <p className="text-slate-500 mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/portfolio" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-purple-600 transition-colors">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const suggestedProjects = PROJECTS.filter(p => p.id !== project.id).slice(0, 3);

  // 3 high quality screenshots for interactive hover galleries
  const walkthroughImages = [
    project.thumbnail,
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pt-32 pb-20 selection:bg-purple-100 selection:text-purple-900">
      <MetaTags 
        title={`${project.title} - Portfolio | CHESTAADOTCOM`}
        description={project.description}
        path={`/portfolio/${project.id}`}
        breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Portfolio', item: '/portfolio' }, { name: project.title, item: `/portfolio/${project.id}` }]}
        schemaString={JSON.stringify(generatePortfolioSchema(project.title, project.description, `https://chestaa.com/portfolio/${project.id}`, project.thumbnail))}
      />
      
      <motion.div 
        className="max-w-7xl mx-auto px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* Back Link */}
        <motion.div variants={fadeUpVariant} className="mb-10">
          <Breadcrumbs 
            items={[
              { name: 'Portfolio', item: '/portfolio' },
              { name: project.title, item: `/portfolio/${project.id}` }
            ]} 
          />
        </motion.div>

        {/* Header Section */}
        <motion.header variants={fadeUpVariant} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-100 font-mono">
              {project.category}
            </span>
            <span className="text-[11px] font-mono font-medium text-slate-500">
              Studi Kasus &amp; Bedah Arsitektur
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-8 tracking-tight leading-tight max-w-5xl">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-8 lg:gap-16 py-6 border-y border-slate-100 mb-12 rounded-xl bg-slate-50/60 px-6">
            {project.client && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 font-mono"><User size={12} /> Client</span>
                <span className="text-sm font-medium text-slate-800">{project.client}</span>
              </div>
            )}
            {project.duration && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 font-mono"><Calendar size={12} /> Duration</span>
                <span className="text-sm font-medium text-slate-800">{project.duration}</span>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 font-mono"><Globe size={12} /> Live Link</span>
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors">
                Visit Website <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </motion.header>

        {/* Split-Screen Case Study Layout (800+ words left, sticky animated gallery right) */}
        <motion.div variants={fadeUpVariant}>
          <CaseStudyLayout 
            project={project} 
            walkthroughImages={walkthroughImages} 
            suggestedProjects={suggestedProjects} 
          />
        </motion.div>

        {/* Suggested / Other Projects Section */}
        <motion.div variants={fadeUpVariant} className="mt-28 pt-16 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-100">
                Eksplorasi Lainnya
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-2 tracking-tight">
                Studi Kasus Proyek Lainnya
              </h2>
            </div>
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-purple-600 hover:text-purple-800 transition-colors"
            >
              Lihat Semua Portfolio <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestedProjects.map((item) => (
              <Link 
                key={item.id} 
                to={`/portfolio/${item.id}`}
                className="group bg-slate-50 border border-slate-200 hover:border-purple-300 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                  <LazyImage src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-widest text-purple-800 rounded-xl shadow-xs">
                    {item.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-base mb-2 group-hover:text-purple-700 transition-colors line-clamp-1 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                    <span>Baca Studi Kasus</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
