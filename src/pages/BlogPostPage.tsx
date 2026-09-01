import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Zap, ChevronLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Markdown from 'markdown-to-jsx';
import TableOfContents from '../components/organisms/TableOfContents.tsx';
import BlogInteractions from '../components/organisms/BlogInteractions.tsx';
import { ALL_ARTICLES, Article } from '../data/blogData';

const StatCard = ({ percentage, label }: { percentage: string, label: string }) => (
  <div className="my-10 p-8 rounded-3xl bg-gradient-to-br from-slate-950 to-purple-950 text-white shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 border border-purple-500/20 relative overflow-hidden group">
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full group-hover:bg-purple-500/30 transition-colors" />
    <div className="text-6xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-fuchsia-400 drop-shadow-sm">
      {percentage}
    </div>
    <div className="text-lg font-sans font-medium text-slate-300 leading-snug max-w-sm">
      {label}
    </div>
  </div>
);

const TrendBar = ({ label, progress }: { label: string, progress: number }) => (
  <div className="my-10 p-8 rounded-3xl bg-slate-50 border border-purple-100 shadow-sm relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-20" />
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 gap-2">
      <div className="text-sm font-bold text-slate-800 uppercase tracking-widest">{label}</div>
      <div className="text-2xl font-display font-black text-purple-900">{progress}%</div>
    </div>
    <div className="w-full bg-slate-200/80 rounded-full h-4 overflow-hidden shadow-inner">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.min(progress, 100)}%` }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gradient-to-r from-purple-600 to-fuchsia-600 h-full rounded-full relative"
      >
        <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)', backgroundSize: '1rem 1rem' }} />
      </motion.div>
    </div>
  </div>
);

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Find article from real data
  const post = ALL_ARTICLES.find(p => p.slug === slug) || ALL_ARTICLES[0];
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "image": [post.image],
    "datePublished": "2026-08-31T08:00:00+08:00",
    "dateModified": "2026-08-31T08:00:00+08:00",
    "author": [{
        "@type": "Person",
        "name": post.author?.name || "Chesta Azka",
        "url": "https://chestaa.com/about"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "CHESTAADOTCOM",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chestaa.com/logo.png"
      }
    },
    "description": post.desc,
    "about": {
      "@type": "Organization",
      "name": "CHESTAADOTCOM B2B Web Development",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "BSD City, Cisauk",
        "addressRegion": "Banten",
        "addressCountry": "ID"
      }
    },
    "contentLocation": {
      "@type": "Place",
      "name": "BSD City & Cisauk Tech Hub"
    }
  };

  // Convert old content array or use raw MDX
  let unifiedContent = post.mdxContent || post.content.map(c => 
    typeof c === 'string' ? c : `![${c.alt}](${c.url})`
  ).join('\n\n');

  // Strip frontmatter if present
  if (unifiedContent.startsWith('---')) {
    const endOfFrontmatter = unifiedContent.indexOf('---', 3);
    if (endOfFrontmatter !== -1) {
      unifiedContent = unifiedContent.substring(endOfFrontmatter + 3).trim();
    }
  }

  // Inject IDs and extract headings
  const headings: { id: string; text: string }[] = [];
  unifiedContent = unifiedContent.replace(/^##\s+(.*)$/gm, (match, title) => {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    headings.push({ id, text: title });
    return `## <span id="${id}"></span>${title}`;
  });

  return (
    <main className="min-h-screen bg-white pt-40 md:pt-48 font-sans">
      <Helmet>
        <title>{post.title} | CHESTAADOTCOM Insights</title>
        <meta name="description" content={post.desc} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[550px] w-full overflow-hidden bg-purple-950">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <img 
            src={post.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000'} 
            alt={post.title}
            className="w-full h-full object-cover opacity-50 scale-105 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        </motion.div>

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-16 w-full">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 text-xs font-bold tracking-widest uppercase bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <ChevronLeft size={16} /> KEMBALI KE ARTIKEL
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {post.tags?.slice(0,3).map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white tracking-widest uppercase">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.15] tracking-tight mb-8 drop-shadow-md">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-sans">
               <div className="flex items-center gap-3">
                 <img 
                   src={post.author?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256'} 
                   alt={post.author?.name}
                   className="w-10 h-10 rounded-full bg-purple-800 border-2 border-purple-500/50 object-cover"
                 />
                 <div className="flex flex-col">
                   <span className="font-bold">{post.author?.name || 'Chesta Azka'}</span>
                   <span className="text-xs text-white/60">{post.author?.role || 'Lead Architect'}</span>
                 </div>
               </div>
               <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
               <div className="flex items-center gap-2 text-white/80 font-medium">
                 <Calendar size={14} className="text-purple-400" /> {post.date}
               </div>
               <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
               <div className="flex items-center gap-2 text-white/80 font-medium">
                 <Clock size={14} className="text-purple-400" /> {post.readTime}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex gap-12 items-start">
         <article className="flex-1">
           <div className="prose prose-lg prose-slate max-w-none
                        prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-200
                        prose-h3:text-2xl prose-h3:mt-8
                        prose-p:font-sans prose-p:leading-[1.8] prose-p:tracking-[0.015em] prose-p:text-slate-700 prose-p:mb-8
                        prose-a:text-purple-700 prose-a:font-semibold hover:prose-a:text-purple-900
                        prose-strong:text-slate-900 prose-strong:font-bold
                        prose-blockquote:border-l-4 prose-blockquote:border-purple-600 prose-blockquote:bg-purple-50/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl prose-blockquote:font-sans prose-blockquote:italic prose-blockquote:text-slate-700 prose-blockquote:leading-[1.75]
                        prose-img:rounded-3xl prose-img:shadow-xl prose-img:my-12
                        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-8 prose-ul:leading-[1.8]
                        prose-li:my-3 prose-li:text-slate-700">
             <Markdown
               options={{
                 overrides: {
                   StatCard: { component: StatCard },
                   TrendBar: { component: TrendBar }
                 }
               }}
             >
               {unifiedContent}
             </Markdown>
           </div>
           
           <div className="mt-20 pt-10 border-t border-purple-100">
             <BlogInteractions slug={slug || 'vibe-coding-and-ai-web-development-2026'} />
           </div>
         </article>
         
         {/* Sidebar TOC */}
         <TableOfContents headings={headings} />
      </div>
    </main>
  );
}
