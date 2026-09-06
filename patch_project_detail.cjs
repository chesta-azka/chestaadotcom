const fs = require('fs');

const code = `import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Globe, Calendar, User, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import LazyImage from '../components/atoms/LazyImage';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeUpVariant = {
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
        <div className="max-w-2xl bg-white/60 backdrop-blur-xl border border-white p-12 rounded-3xl shadow-sm">
          <h1 className="text-3xl font-display font-bold mb-4">Project Not Found</h1>
          <p className="text-slate-500 mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/portfolio" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-900 text-white font-bold hover:bg-purple-600 transition-colors">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pt-32 pb-20 selection:bg-purple-100 selection:text-purple-900">
      <motion.div 
        className="max-w-5xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* Back Link */}
        <motion.div variants={fadeUpVariant} className="mb-10">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-purple-700 transition-colors bg-slate-50 hover:bg-purple-50 px-5 py-2.5 rounded-full border border-slate-200">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.header variants={fadeUpVariant} className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              {project.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-10 tracking-tight leading-tight">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-8 lg:gap-16 py-6 border-y border-slate-100 mb-8">
            {project.client && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5"><User size={12} /> Client</span>
                <span className="text-sm font-medium text-slate-800">{project.client}</span>
              </div>
            )}
            {project.duration && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5"><Calendar size={12} /> Duration</span>
                <span className="text-sm font-medium text-slate-800">{project.duration}</span>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5"><Globe size={12} /> Live Link</span>
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors">
                Visit Website <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </motion.header>

        {/* Hero Image */}
        <motion.div variants={fadeUpVariant} className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-slate-100 mb-16 shadow-sm border border-slate-100 relative group">
          <LazyImage src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        </motion.div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Main Body */}
          <div className="lg:col-span-2 flex flex-col gap-14">
            
            {project.overview && (
              <motion.section variants={fadeUpVariant}>
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-5">Project Overview</h2>
                <p className="text-[15px] text-slate-600 leading-relaxed md:leading-loose">
                  {project.overview}
                </p>
              </motion.section>
            )}

            {project.challenges && (
              <motion.section variants={fadeUpVariant}>
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-5">The Challenge</h2>
                <p className="text-[15px] text-slate-600 leading-relaxed md:leading-loose">
                  {project.challenges}
                </p>
              </motion.section>
            )}

            {project.solution && (
              <motion.section variants={fadeUpVariant}>
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-5">Our Solution</h2>
                <p className="text-[15px] text-slate-600 leading-relaxed md:leading-loose">
                  {project.solution}
                </p>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <motion.div variants={fadeUpVariant} className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1.5 bg-white border border-slate-200/60 rounded-xl text-xs font-medium text-slate-600 shadow-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="bg-purple-50/50 rounded-3xl p-8 border border-purple-100/50">
              <h3 className="text-xs font-bold uppercase tracking-widest text-purple-900 mb-6">Key Features</h3>
              <ul className="flex flex-col gap-5">
                {project.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-[13px] font-medium text-purple-900 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
`;
fs.writeFileSync('src/pages/ProjectDetailPage.tsx', code);
console.log('ProjectDetailPage.tsx updated successfully');
