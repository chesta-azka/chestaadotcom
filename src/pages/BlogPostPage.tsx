import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Zap, ChevronLeft, Check, Copy, MessageSquare, User, Briefcase, CheckCircle2, Sparkles, Layers, ShieldCheck, Quote, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TableOfContents from '../components/organisms/TableOfContents.tsx';
import BlogInteractions from '../components/organisms/BlogInteractions.tsx';
import NotFoundPage from './NotFoundPage.tsx';
import SocialShare from '../components/molecules/SocialShare.tsx';
import LazyImage from '../components/atoms/LazyImage.tsx';
import ReadNextSection from '../components/organisms/ReadNextSection.tsx';
import { ALL_ARTICLES, Article } from '../data/blogData';
import { TextSelectionToolbar } from '../components/organisms/TextSelectionToolbar.tsx';

// Skeleton Component for Blog Post Loading State
const BlogPostSkeleton = () => (
  <main className="min-h-screen bg-white pt-40 md:pt-48 font-sans">
    {/* Hero Skeleton */}
    <div className="relative h-[60vh] min-h-[550px] w-full overflow-hidden bg-slate-900 animate-pulse">
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-4xl mx-auto px-6 pb-16 w-full space-y-6">
          <div className="h-6 w-32 bg-slate-700 rounded-full" />
          <div className="h-16 w-3/4 bg-slate-800 rounded-2xl" />
          <div className="h-16 w-2/3 bg-slate-800 rounded-2xl" />
          <div className="flex gap-4 items-center pt-4">
            <div className="w-10 h-10 rounded-full bg-slate-700" />
            <div className="h-4 w-40 bg-slate-700 rounded-full" />
          </div>
        </div>
      </div>
    </div>
    {/* Content Skeleton */}
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start animate-pulse">
      <div className="w-full space-y-8">
        <div className="h-8 w-1/3 bg-slate-100 rounded-xl" />
        <div className="h-4 w-full bg-slate-50 rounded-lg" />
        <div className="h-4 w-full bg-slate-50 rounded-lg" />
        <div className="h-4 w-5/6 bg-slate-50 rounded-lg" />
        <div className="h-64 w-full bg-slate-100 rounded-3xl my-8" />
        <div className="h-8 w-1/4 bg-slate-100 rounded-xl" />
        <div className="h-4 w-full bg-slate-50 rounded-lg" />
        <div className="h-4 w-4/5 bg-slate-50 rounded-lg" />
      </div>
      <div className="hidden lg:block w-72 space-y-4">
        <div className="h-8 w-32 bg-slate-100 rounded-xl" />
        <div className="h-4 w-full bg-slate-50 rounded-lg" />
        <div className="h-4 w-5/6 bg-slate-50 rounded-lg" />
        <div className="h-4 w-4/5 bg-slate-50 rounded-lg" />
        <div className="h-4 w-full bg-slate-50 rounded-lg" />
      </div>
    </div>
  </main>
);

// Executive Key Takeaways Summary Box
const KeyTakeaways = ({ title = "Executive Summary & Key Takeaways", items }: { title?: string, items?: string[] }) => {
  const defaultItems = [
    "Vibe Coding menggantikan penulisan kode manual berulang dengan orkestrasi arsitektural berbasis AI intensif.",
    "Next.js Server-Side Rendering (SSR) & Edge Caching menjamin skor Core Web Vitals < 0.8s dan dominasi Local SEO Google BSD City.",
    "Firebase NoSQL memangkas latensi query hingga -82% dengan sinkronisasi data real-time instan.",
    "AI Lead Scoring mengotomatisasi kualifikasi prospek B2B bernilai tinggi secara real-time via WhatsApp."
  ];
  const list = items || defaultItems;

  return (
    <div className="my-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 text-white shadow-2xl border border-purple-500/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/15 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
            <Sparkles size={18} />
          </div>
          <h4 className="font-display font-bold text-lg sm:text-xl text-purple-200 tracking-tight m-0">
            {title}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-sm font-sans text-slate-200 leading-relaxed m-0">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Architecture Comparison Component
const ArchitectureComparison = ({
  leftTitle = "Traditional Dev (2020-2024)",
  leftItems,
  rightTitle = "Vibe Coding 2026 (CHESTAADOTCOM)",
  rightItems
}: {
  leftTitle?: string;
  leftItems?: string[];
  rightTitle?: string;
  rightItems?: string[];
}) => {
  const defaultLeft = [
    "Boilerplate manual berbulan-bulan",
    "Database SQL relasional kaku & migrasi rumit",
    "Lead scoring statis & pengisian form pasif",
    "Beban komputasi berat di sisi browser pengguna (SPA lelet)"
  ];
  const defaultRight = [
    "Scaffolding instan dalam menit via AI System Prompting",
    "Firebase NoSQL fleksibel dengan latensi query milidetik",
    "AI Lead Scoring prediktif & notifikasi sales otomatis",
    "Next.js SSR & Server Components di Edge Server terdekat"
  ];

  const leftList = leftItems || defaultLeft;
  const rightList = rightItems || defaultRight;

  return (
    <div className="my-16 rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-lg">
      <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-purple-400" />
          <span className="font-display font-bold text-sm tracking-wide">Perbandingan Arsitektur Teknis</span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 bg-purple-900/60 px-2.5 py-1 rounded-full">
          2026 Tech Paradigm
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        <div className="p-6 sm:p-8 bg-slate-50/70">
          <h5 className="font-display font-bold text-slate-700 text-base mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> {leftTitle}
          </h5>
          <ul className="space-y-3 m-0 p-0 list-none">
            {leftList.map((item, i) => (
              <li key={i} className="text-sm font-sans text-slate-600 flex items-start gap-2.5 leading-relaxed">
                <span className="text-rose-500 font-bold text-base leading-none mt-0.5">&times;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 sm:p-8 bg-purple-50/40">
          <h5 className="font-display font-bold text-purple-950 text-base mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {rightTitle}
          </h5>
          <ul className="space-y-3 m-0 p-0 list-none">
            {rightList.map((item, i) => (
              <li key={i} className="text-sm font-sans text-purple-950 flex items-start gap-2.5 leading-relaxed font-medium">
                <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Pull Quote Component
const QuoteBox = ({ quote, author, role }: { quote: string; author?: string; role?: string }) => (
  <div className="my-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border-l-4 border-purple-600 shadow-sm relative">
    <Quote size={40} className="text-purple-300/60 mb-4" />
    <p className="font-display font-semibold text-slate-800 text-lg sm:text-xl md:text-2xl leading-relaxed italic mb-4">
      "{quote}"
    </p>
    {(author || role) && (
      <div className="flex items-center gap-3 pt-4 border-t border-purple-100">
        <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
          {author ? author.charAt(0) : 'C'}
        </div>
        <div>
          {author && <div className="font-display font-bold text-sm text-slate-900">{author}</div>}
          {role && <div className="font-sans text-xs text-purple-700 font-medium">{role}</div>}
        </div>
      </div>
    )}
  </div>
);

// High-Contrast Checklist Component
const CheckList = ({ title, items }: { title: string; items: string[] }) => (
  <div className="my-12 p-8 rounded-3xl bg-slate-50 border border-slate-200">
    <h5 className="font-display font-bold text-slate-900 text-lg mb-6 flex items-center gap-2.5">
      <ShieldCheck className="text-purple-600" size={20} />
      {title}
    </h5>
    <div className="space-y-3.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-100 shadow-2xs">
          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="text-sm font-sans text-slate-700 leading-relaxed">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const StatCard = ({ percentage, label, caption }: { percentage: string; label: string; caption?: string }) => (
  <div className="my-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 border border-purple-500/25 relative overflow-hidden group">
    <div className="absolute -right-10 -top-10 w-48 h-48 bg-purple-500/25 blur-3xl rounded-full group-hover:bg-purple-500/35 transition-colors duration-500" />
    <div className="text-6xl sm:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-400 drop-shadow-md shrink-0">
      {percentage}
    </div>
    <div className="space-y-1 max-w-lg">
      <div className="text-lg sm:text-xl font-display font-bold text-white leading-snug">
        {label}
      </div>
      {caption && (
        <p className="text-xs sm:text-sm font-sans text-purple-200/80 leading-relaxed m-0">
          {caption}
        </p>
      )}
    </div>
  </div>
);

const TrendBar = ({ label, progress }: { label: string; progress: number }) => (
  <div className="my-14 p-8 sm:p-10 rounded-3xl bg-slate-50 border border-purple-100 shadow-sm relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-30" />
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 gap-2">
      <div className="text-xs font-mono font-bold text-slate-700 uppercase tracking-widest">{label}</div>
      <div className="text-3xl font-display font-black text-purple-900">{progress}%</div>
    </div>
    <div className="w-full bg-slate-200/80 rounded-full h-4 overflow-hidden shadow-inner">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.min(progress, 100)}%` }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 h-full rounded-full relative"
      >
        <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)', backgroundSize: '1rem 1rem' }} />
      </motion.div>
    </div>
  </div>
);

const CodeBlock = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  const [copied, setCopied] = useState(false);
  const match = /lang-(\w+)/.exec(className || '');
  const isInline = !match && !className?.includes('lang-');
  const text = String(children).replace(/\n$/, '');

  if (isInline && !String(children).includes('\n')) {
    return <code className="bg-purple-50 text-purple-900 px-2 py-0.5 rounded-md text-sm font-mono border border-purple-200/70 font-semibold">{children}</code>;
  }

  const language = match ? match[1] : 'typescript';

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-3xl overflow-hidden bg-[#18181b] my-12 shadow-2xl border border-slate-800">
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#27272a] border-b border-black/40">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/90" />
            <div className="w-3 h-3 rounded-full bg-amber-500/90" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
          </div>
          <span className="text-xs font-mono font-medium text-slate-300 ml-3">{language}</span>
        </div>
        <button 
          onClick={handleCopy} 
          className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg cursor-pointer"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <div className="text-sm overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{ margin: 0, padding: '1.75rem', background: 'transparent' }}
          wrapLines={true}
          showLineNumbers={true}
        >
          {text}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

function extractTextNode(node: any): string {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractTextNode).join('');
  if (node.props && node.props.children) return extractTextNode(node.props.children);
  return '';
}

const Heading2 = ({ children, id, ...props }: any) => {
  const text = extractTextNode(children);
  const headingId = id || text.replace(/<[^>]+>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return (
    <h2
      id={headingId}
      {...props}
      className="scroll-mt-32 font-display font-extrabold tracking-tight text-slate-950 text-3xl sm:text-4xl mt-28 md:mt-36 mb-8 pt-10 border-t-2 border-purple-100/80 flex items-center justify-between group"
    >
      <span>{children}</span>
      <a 
        href={`#${headingId}`} 
        className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-300 hover:text-purple-600 ml-3 text-2xl no-underline font-normal"
        aria-label="Tautan ke bagian ini"
      >
        #
      </a>
    </h2>
  );
};

const Heading3 = ({ children, id, ...props }: any) => {
  const text = extractTextNode(children);
  const headingId = id || text.replace(/<[^>]+>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return (
    <h3
      id={headingId}
      {...props}
      className="scroll-mt-32 font-display font-bold tracking-tight text-purple-950 text-2xl sm:text-3xl mt-20 md:mt-24 mb-6 flex items-center justify-between group"
    >
      <span>{children}</span>
      <a 
        href={`#${headingId}`} 
        className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-200 hover:text-purple-500 ml-3 text-xl no-underline font-normal"
        aria-label="Tautan ke bagian ini"
      >
        #
      </a>
    </h3>
  );
};

const Heading4 = ({ children, ...props }: any) => (
  <h4
    {...props}
    className="scroll-mt-32 font-display font-bold tracking-tight text-slate-900 text-xl sm:text-2xl mt-14 md:mt-16 mb-5"
  >
    {children}
  </h4>
);

const InlineCTA = () => (
  <div className="my-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-purple-900 via-purple-950 to-indigo-950 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/15 transition-colors duration-700 pointer-events-none" />
    <div className="relative z-10 flex-1 text-center md:text-left space-y-2">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-purple-200 text-xs font-bold uppercase tracking-wider mb-2">
        <Sparkles size={14} /> Solusi Arsitektur B2B
      </div>
      <h4 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white m-0">
        Siap Mengakselerasi Pertumbuhan Digital Bisnis Anda?
      </h4>
      <p className="text-purple-200 font-sans text-sm sm:text-base m-0 leading-relaxed max-w-xl">
        Konsultasikan kebutuhan arsitektur website Next.js, integrasi Firebase NoSQL, atau implementasi AI Lead Scoring bersama Founder & Lead Architect Chesta Azka.
      </p>
    </div>
    <a 
      href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta%2C%20saya%20membaca%20artikel%20Vibe%20Coding%20dan%20ingin%20konsultasi%20strategi%20website%20bisnis%20kami." 
      target="_blank" 
      rel="noopener noreferrer" 
      className="relative z-10 whitespace-nowrap bg-white hover:bg-purple-50 text-purple-950 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2 shrink-0 group/btn"
    >
      <MessageSquare size={16} className="text-purple-700" />
      <span>Konsultasi WhatsApp</span>
      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
    </a>
  </div>
);

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Find article from real data
  const post = ALL_ARTICLES.find(p => p.slug === slug);
  
  if (isLoading) {
    return <BlogPostSkeleton />;
  }
  
  if (!post) {
    return (
      <main className="min-h-screen bg-slate-50 pt-40 md:pt-48 pb-24 font-sans flex flex-col items-center justify-center px-6">
        <Helmet>
          <title>Artikel Tidak Ditemukan | CHESTAADOTCOM</title>
        </Helmet>
        <div className="w-24 h-24 bg-white shadow-xl shadow-purple-900/5 rounded-full flex items-center justify-center mb-8 text-purple-600 border border-purple-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="m9 9.5 3 3 3-3"/></svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 text-center tracking-tight">
          Artikel Tidak Ditemukan
        </h1>
        <p className="text-slate-500 text-lg mb-10 max-w-md text-center leading-relaxed">
          Maaf, jurnal insight yang Anda cari mungkin telah dipindahkan atau URL tidak valid. Mari kembali menjelajahi wawasan strategi digital lainnya.
        </p>
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 bg-purple-900 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-xl hover:bg-purple-950 transition-all hover:-translate-y-1"
        >
          <ArrowLeft size={16} /> KEMBALI KE BLOG HUB
        </Link>
      </main>
    );
  }

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

  // Extract all H2 and H3 tags from the markdown content
  const headings: { id: string; text: string; level: number }[] = [];
  let headingCount = 0;
  
  // Track unique IDs
  const idMap = new Map<string, number>();

  unifiedContent = unifiedContent.replace(/^(#{2,3})\s+(.*)$/gm, (match, hashes, title) => {
    const cleanTitle = title.replace(/<[^>]+>/g, '').trim();
    let baseId = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    let id = baseId;
    if (idMap.has(baseId)) {
      const count = idMap.get(baseId)! + 1;
      idMap.set(baseId, count);
      id = `${baseId}-${count}`;
    } else {
      idMap.set(baseId, 1);
    }

    headings.push({ id, text: cleanTitle, level: hashes.length });
    
    if (hashes === '##') {
      headingCount++;
      if (headingCount === 3) {
        return `<InlineCTA />

<h2 id="${id}">${title}</h2>`;
      }
      return `<h2 id="${id}">${title}</h2>`;
    }
    
    return `<h3 id="${id}">${title}</h3>`;
  });

  return (
    <main className="min-h-screen bg-white pt-36 md:pt-44 font-sans relative">
      <TextSelectionToolbar />
      <div className="hidden 2xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-40">
        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 rotate-180 mb-2" style={{ writingMode: 'vertical-rl' }}>Bagikan</div>
        <div className="w-[1px] h-12 bg-slate-200 mx-auto" />
        <SocialShare title={post.title} description={post.desc} vertical className="relative" />
      </div>
      
      <Helmet>
        <title>{post.title} | CHESTAADOTCOM Insights</title>
        <meta name="description" content={post.desc} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Top Reading Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 origin-left z-50 shadow-sm"
      />

      {/* Hero Section */}
      <div className="relative h-[62vh] min-h-[560px] w-full overflow-hidden bg-purple-950">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <LazyImage 
            src={post.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000'} 
            blurSrc={(post.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=20') + '&blur=20'}
            alt={post.title}
            className="w-full h-full object-cover opacity-50 scale-105 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-purple-950/40" />
        </motion.div>

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-20 w-full">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 text-xs font-bold tracking-widest uppercase bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/15">
              <ChevronLeft size={16} /> KEMBALI KE BLOG HUB
            </Link>
            
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              {post.tags?.slice(0, 4).map(tag => (
                <span key={tag} className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[10px] font-bold text-white tracking-widest uppercase">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.14] tracking-tight mb-8 drop-shadow-md">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-sans pt-2 border-t border-white/15">
               <div className="flex items-center gap-3">
                 <LazyImage 
                   src={post.author?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256'} 
                   blurSrc={(post.author?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=20&w=20') + '&blur=10'}
                   alt={post.author?.name}
                   className="w-11 h-11 rounded-full bg-purple-800 border-2 border-purple-400/80 object-cover shadow-md"
                 />
                 <div className="flex flex-col">
                   <span className="font-bold text-white leading-tight">{post.author?.name || 'Chesta Azka'}</span>
                   <span className="text-xs text-purple-200">{post.author?.role || 'Lead Architect & Engineer'}</span>
                 </div>
               </div>
               <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/40" />
               <div className="flex items-center gap-2 text-white/90 font-medium">
                 <Calendar size={15} className="text-purple-300" /> {post.date}
               </div>
               <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/40" />
               <div className="flex items-center gap-2 text-white/90 font-medium">
                 <Clock size={15} className="text-purple-300" /> {post.readTime}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with Generous Breathable Spacing */}
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 items-start">
         <article className="w-full min-w-0">
           <div className="prose prose-lg prose-slate max-w-none
                        prose-headings:font-display prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-950
                        prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-28 md:prose-h2:mt-36 prose-h2:mb-8 prose-h2:pt-10 prose-h2:border-t-2 prose-h2:border-purple-100/80
                        prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-20 md:prose-h3:mt-24 prose-h3:mb-6 prose-h3:text-purple-950
                        prose-h4:text-xl md:prose-h4:text-2xl prose-h4:mt-14 md:prose-h4:mt-16 prose-h4:mb-5 prose-h4:font-display prose-h4:text-slate-900
                        prose-p:font-sans prose-p:leading-[2.1] md:prose-p:leading-[2.2] prose-p:tracking-[0.012em] prose-p:text-slate-700 prose-p:text-[1.125rem] prose-p:mb-12 prose-p:mt-0
                        prose-a:text-purple-700 prose-a:font-semibold hover:prose-a:text-purple-900 prose-a:underline-offset-4
                        prose-strong:text-slate-950 prose-strong:font-bold
                        prose-blockquote:my-16 prose-blockquote:py-8 prose-blockquote:px-8 sm:prose-blockquote:px-10 prose-blockquote:bg-gradient-to-r prose-blockquote:from-purple-50/90 prose-blockquote:to-indigo-50/50 prose-blockquote:border-l-4 prose-blockquote:border-purple-600 prose-blockquote:rounded-r-3xl prose-blockquote:font-sans prose-blockquote:italic prose-blockquote:text-slate-800 prose-blockquote:leading-[1.95] prose-blockquote:text-lg prose-blockquote:shadow-sm
                        prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-16 prose-img:border prose-img:border-slate-100
                        prose-ul:list-disc prose-ul:pl-8 prose-ul:my-12 prose-ul:space-y-4 prose-ul:leading-[1.95]
                        prose-ol:list-decimal prose-ol:pl-8 prose-ol:my-12 prose-ol:space-y-4 prose-ol:leading-[1.95]
                        prose-li:text-slate-700 prose-li:text-[1.075rem] marker:text-purple-600 marker:font-bold
                        prose-hr:my-24 prose-hr:border-slate-200/90">
             <Markdown
               options={{
                 overrides: {
                   h2: { component: Heading2 },
                   h3: { component: Heading3 },
                   h4: { component: Heading4 },
                   StatCard: { component: StatCard },
                   TrendBar: { component: TrendBar },
                   code: { component: CodeBlock },
                   InlineCTA: { component: InlineCTA },
                   KeyTakeaways: { component: KeyTakeaways },
                   ArchitectureComparison: { component: ArchitectureComparison },
                   QuoteBox: { component: QuoteBox },
                   CheckList: { component: CheckList },
                   img: { component: LazyImage }
                 }
               }}
             >
               {unifiedContent}
             </Markdown>
           </div>
           
           {/* Social Sharing Section */}
           <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
             <div>
               <h3 className="text-xl font-display font-bold text-slate-900 mb-1">Bagikan Artikel Ini</h3>
               <p className="text-xs text-slate-500 font-sans">Bantu rekan bisnis & tim engineering Anda memahami strategi Vibe Coding 2026.</p>
             </div>
             <SocialShare title={post.title} description={post.desc} />
           </div>
           
           {/* Interactive Reactions */}
           <div className="mt-14 pt-10 border-t border-purple-100">
             <BlogInteractions slug={slug || 'vibe-coding-and-ai-web-development-2026'} />
           </div>

            {/* Author Bio Box */}
            <div className="mt-16 bg-slate-50 border border-slate-200/80 p-8 sm:p-10 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
              <div className="w-24 h-24 rounded-full bg-purple-100 ring-4 ring-white shadow-lg shrink-0 overflow-hidden relative">
                <LazyImage 
                  src={post.author?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256'} 
                  blurSrc={(post.author?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=20&w=20') + '&blur=10'}
                  alt={post.author?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="text-2xl font-display font-bold text-slate-900 mb-1">{post.author?.name || 'Chesta Azka'}</h4>
                  <p className="text-xs font-bold text-purple-700 uppercase tracking-widest">{post.author?.role || 'Lead Architect & Engineer'}</p>
                </div>
                <p className="text-slate-600 font-sans text-sm leading-relaxed max-w-2xl">
                  Berpengalaman dalam merancang arsitektur sistem skala enterprise dan integrasi kecerdasan buatan (AI) untuk transformasi digital perusahaan. Spesialis dalam arsitektur Cloud-Native, Next.js Server Components, sistem waktu nyata (Real-time), dan otomatisasi alur kerja tingkat lanjut di Cisauk & BSD City.
                </p>
                <div className="pt-2 flex items-center justify-center md:justify-start gap-4">
                  <Link to="/portfolio" className="inline-flex items-center gap-2 bg-purple-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-purple-950 transition-colors shadow-sm">
                    <Briefcase size={14} /> Lihat Portofolio
                  </Link>
                  <Link to="/about" className="inline-flex items-center gap-2 bg-white text-slate-800 border border-slate-200 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors">
                    <User size={14} /> Profil Lengkap
                  </Link>
                </div>
              </div>
            </div>

            {/* Dynamic Intelligent Read Next Section */}
            <ReadNextSection currentArticle={post} allArticles={ALL_ARTICLES} />
         </article>
         
         {/* Sidebar TOC */}
         <TableOfContents headings={headings} />
      </div>
    </main>
  );
}
