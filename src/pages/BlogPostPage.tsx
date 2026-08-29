import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, ChevronRight, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import BlogInteractions from '../components/organisms/BlogInteractions.tsx';

// Mock Blog Data since we don't have a DB yet for blogs
const MOCK_POSTS = {
  "agentic-ai-b2b": {
    title: "How Agentic AI is Reshaping B2B SaaS Workflows in BSD City",
    date: "24 Aug 2026",
    readTime: "8 min read",
    author: "Principal Engineer",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000",
    tags: ["Artificial Intelligence", "B2B SaaS", "Automation"],
    isAI: true,
    content: `
      <p class="lead">The landscape of business-to-business software is experiencing a paradigm shift. Traditional monolithic applications are giving way to intelligent, autonomous ecosystems driven by Agentic AI.</p>
      
      <h2>The Shift from Reactive to Proactive</h2>
      <p>For years, SaaS platforms have relied on user inputs to trigger workflows. You click a button, the system responds. Agentic AI flips this model. By understanding context, analyzing data in real-time, and possessing agency, these systems anticipate needs before they arise.</p>
      
      <blockquote>"We are moving from software as a tool to software as a collaborator. In high-growth corridors like BSD City and Cisauk, businesses adopting Agentic AI are seeing a 400% increase in operational velocity."</blockquote>
      
      <h2>Core Capabilities in Modern Workflows</h2>
      <ul>
        <li><strong>Autonomous Lead Qualification:</strong> AI agents instantly evaluate inbound inquiries, parse requirements, and score intent without human intervention.</li>
        <li><strong>Dynamic Provisioning:</strong> Infrastructure and workspaces are spun up dynamically based on the specific parameters of a negotiated contract.</li>
        <li><strong>Predictive Maintenance:</strong> The AI monitors system health, predicts bottlenecks, and scales resources automatically to maintain 99.9% SLAs.</li>
      </ul>
      
      <p>As we continue to build within the Absolute Walled Garden at chestaa.com, our focus remains on integrating these autonomous capabilities directly into our core infrastructure, ensuring our clients receive unparalleled security and efficiency.</p>
    `
  }
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = MOCK_POSTS[slug as keyof typeof MOCK_POSTS] || MOCK_POSTS["agentic-ai-b2b"]; // fallback for demo
  
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
    "datePublished": "2026-08-24T08:00:00+08:00",
    "dateModified": "2026-08-24T08:00:00+08:00",
    "author": [{
        "@type": "Person",
        "name": post.author
    }],
    "publisher": {
      "@type": "Organization",
      "name": "CHESTAADOTCOM",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chestaa.com/logo.png"
      }
    },
    "description": "Insight on B2B SaaS workflows and AI automation focused on BSD City and Cisauk tech ecosystem.",
    "about": {
      "@type": "Place",
      "name": "BSD City, Cisauk, Tangerang"
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Helmet>
        <title>{post.title} | CHESTAADOTCOM Insights</title>
        <meta name="description" content="Discover deep tech insights tailored for BSD City and Cisauk enterprises." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero Section with Parallax Image */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-black">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          {/* Blur Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </motion.div>

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-16 w-full">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
              <ArrowLeft size={16} /> BACK TO INSIGHTS
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-widest uppercase">
                  {tag}
                </span>
              ))}
              {post.isAI && (
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 text-xs font-bold text-indigo-200 tracking-widest uppercase flex items-center gap-1.5">
                  <Zap size={12} className="text-indigo-400" /> GENERATED BY AI
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-white/80 text-sm font-sans">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-white">
                   {post.author[0]}
                 </div>
                 <span className="font-medium">{post.author}</span>
               </div>
               <div className="w-1 h-1 rounded-full bg-white/30" />
               <div className="flex items-center gap-1.5">
                 <Calendar size={14} /> {post.date}
               </div>
               <div className="w-1 h-1 rounded-full bg-white/30" />
               <div className="flex items-center gap-1.5">
                 <Clock size={14} /> {post.readTime}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section (Apple News / Medium Typography style) */}
      <article className="max-w-3xl mx-auto px-6 py-20">
         <div 
           className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none
                      prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight
                      prose-p:font-serif prose-p:leading-relaxed prose-p:text-slate-800 dark:prose-p:text-slate-200
                      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
                      prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl prose-blockquote:font-serif prose-blockquote:italic
                      prose-img:rounded-3xl prose-img:shadow-2xl"
           dangerouslySetInnerHTML={{ __html: post.content }}
         />
         
         <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
           <BlogInteractions slug={slug || 'agentic-ai-b2b'} />
         </div>
      </article>
      
    </main>
  );
}
