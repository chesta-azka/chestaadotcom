import { useEffect, useState } from 'react';
import MetaTags from '../components/atoms/MetaTags';
import { generateArticleSchema } from '../lib/seo';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Zap, ChevronLeft, Check, Copy, MessageSquare, User, Briefcase, CheckCircle2, Sparkles, Layers, ShieldCheck, Quote, ArrowRight, Link as LinkIcon, Heart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from 'react-hot-toast';
import TableOfContents from '../components/organisms/TableOfContents.tsx';
import NotFoundPage from './NotFoundPage.tsx';
import SocialShare from '../components/molecules/SocialShare.tsx';
import { SocialPreviewGenerator } from '../components/molecules/SocialPreviewGenerator.tsx';
import LazyImage from '../components/atoms/LazyImage.tsx';
import ReadNextSection from '../components/organisms/ReadNextSection.tsx';
import RecommendedReading from '../components/organisms/RecommendedReading.tsx';
import BlogComments from '../components/organisms/BlogComments.tsx';
import InteractiveInsight from '../components/molecules/InteractiveInsight.tsx';
import CaseStudyPromotion from '../components/molecules/CaseStudyPromotion.tsx';
import { ALL_ARTICLES, Article } from '../data/blogData';
import { TextSelectionToolbar } from '../components/organisms/TextSelectionToolbar.tsx';
import FloatingSocialShare from '../components/organisms/FloatingSocialShare.tsx';
import Breadcrumbs from '../components/atoms/Breadcrumbs.tsx';
import { generateMetaDescription } from '../utils/blogUtils';
import { useContentPerformanceTracker } from '../hooks/useContentPerformanceTracker';
import { db } from '../lib/firebase';
import { doc, onSnapshot, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore';

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
        <div className="h-64 w-full bg-slate-100 rounded-xl my-8" />
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
    <div className="my-10 p-6 sm:p-8 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-slate-900 shadow-xs relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
            <Sparkles size={16} />
          </div>
          <h4 className="font-display font-bold text-base sm:text-lg text-purple-950 tracking-tight m-0">
            {title}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {list.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-purple-100/80 shadow-2xs">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm font-sans text-slate-800 leading-relaxed m-0">{item}</p>
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
    <div className="my-12 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
      <div className="bg-slate-100 px-6 py-3.5 text-slate-800 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-purple-600" />
          <span className="font-display font-bold text-sm tracking-wide text-slate-900">Perbandingan Arsitektur Teknis</span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full font-bold">
          2026 Tech Paradigm
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        <div className="p-6 sm:p-7 bg-slate-50/50">
          <h5 className="font-display font-bold text-slate-700 text-sm mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> {leftTitle}
          </h5>
          <ul className="space-y-2.5 m-0 p-0 list-none">
            {leftList.map((item, i) => (
              <li key={i} className="text-sm font-sans text-slate-600 flex items-start gap-2.5 leading-relaxed">
                <span className="text-rose-500 font-bold text-sm leading-none mt-0.5">&times;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 sm:p-7 bg-purple-50/30">
          <h5 className="font-display font-bold text-purple-950 text-sm mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {rightTitle}
          </h5>
          <ul className="space-y-2.5 m-0 p-0 list-none">
            {rightList.map((item, i) => (
              <li key={i} className="text-sm font-sans text-purple-950 flex items-start gap-2.5 leading-relaxed font-medium">
                <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
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
  <div className="my-10 p-6 sm:p-8 rounded-2xl bg-purple-50/60 border-l-4 border-purple-600 shadow-xs relative">
    <Quote size={32} className="text-purple-300/80 mb-3" />
    <p className="font-display font-semibold text-slate-900 text-base sm:text-lg md:text-xl leading-relaxed italic mb-4">
      "{quote}"
    </p>
    {(author || role) && (
      <div className="flex items-center gap-3 pt-3 border-t border-purple-200/60">
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
  <div className="my-10 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
    <h5 className="font-display font-bold text-slate-900 text-base sm:text-lg mb-5 flex items-center gap-2.5">
      <ShieldCheck className="text-purple-600" size={20} />
      {title}
    </h5>
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
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
  <div className="my-10 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 shadow-2xs">
    <div className="text-5xl sm:text-6xl font-display font-black text-purple-700 shrink-0 tracking-tight">
      {percentage}
    </div>
    <div className="space-y-1">
      <div className="text-base sm:text-lg font-display font-bold text-slate-900 leading-snug">
        {label}
      </div>
      {caption && (
        <p className="text-xs sm:text-sm font-sans text-slate-500 leading-relaxed m-0">
          {caption}
        </p>
      )}
    </div>
  </div>
);

// Progress bars removed per user instruction
const TrendBar = () => null;

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
    toast.success('Gokil! Kode berhasil disalin ke clipboard 🚀', {
      icon: '🔥',
      style: { borderRadius: '12px', background: '#1e293b', color: '#fff' }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden bg-slate-950 my-10 border border-slate-800 shadow-2xl">
      <div className="flex items-center justify-between px-5 py-3 bg-slate-900/80 border-b border-slate-800 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-500 ml-2 uppercase tracking-widest bg-slate-800/50 px-2 py-0.5 rounded">
            {language}
          </span>
        </div>
        <button 
          onClick={handleCopy} 
          className="text-slate-400 hover:text-white transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-slate-800 hover:bg-purple-600 px-3 py-1.5 rounded-lg cursor-pointer group/btn"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="group-hover/btn:scale-110 transition-transform" />}
          <span>{copied ? 'Anjay Tersalin!' : 'Salin Kode'}</span>
        </button>
      </div>
      <div className="text-[13px] sm:text-sm overflow-x-auto font-mono">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{ margin: 0, padding: '1.75rem', background: 'transparent', lineHeight: '1.7' }}
          wrapLines={true}
          showLineNumbers={text.split('\n').length > 3}
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
      className="scroll-mt-32 font-display font-extrabold tracking-tight text-slate-900 text-2xl sm:text-3xl md:text-4xl mt-16 md:mt-20 mb-6 pt-8 border-t border-slate-200 flex items-center justify-between group"
    >
      <span>{children}</span>
      <a 
        href={`#${headingId}`} 
        className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-600 hover:text-purple-800 ml-3 text-xl no-underline font-normal"
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
      className="scroll-mt-32 font-display font-bold tracking-tight text-slate-900 text-xl sm:text-2xl mt-12 md:mt-14 mb-4 flex items-center justify-between group"
    >
      <span>{children}</span>
      <a 
        href={`#${headingId}`} 
        className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-600 hover:text-purple-800 ml-3 text-lg no-underline font-normal"
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
    className="scroll-mt-32 font-display font-bold tracking-tight text-slate-900 text-lg sm:text-xl mt-8 mb-3"
  >
    {children}
  </h4>
);

const InlineCTA = () => (
  <div className="my-12 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-purple-50 via-slate-50 to-indigo-50/50 border border-purple-200/80 text-slate-900 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
    <div className="relative z-10 flex-1 text-center md:text-left space-y-2">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
        <Sparkles size={13} className="text-purple-600" /> Solusi Arsitektur B2B
      </div>
      <h4 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-slate-900 m-0">
        Siap Mengakselerasi Pertumbuhan Digital Bisnis Anda?
      </h4>
      <p className="text-slate-600 font-sans text-sm sm:text-base m-0 leading-relaxed max-w-xl">
        Konsultasikan kebutuhan arsitektur website Next.js, integrasi Firebase NoSQL, atau implementasi AI Lead Scoring bersama Founder & Lead Architect Chesta Azka.
      </p>
    </div>
    <a 
      href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta%2C%20saya%20membaca%20artikel%20Vibe%20Coding%20dan%20ingin%20konsultasi%20strategi%20website%20bisnis%20kami." 
      target="_blank" 
      rel="noopener noreferrer" 
      className="relative z-10 whitespace-nowrap bg-purple-900 hover:bg-purple-950 text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 shrink-0 group/btn"
    >
      <MessageSquare size={15} className="text-purple-300" />
      <span>Konsultasi WhatsApp</span>
      <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
    </a>
  </div>
);

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [postLikes, setPostLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useContentPerformanceTracker(slug || '');

  useEffect(() => {
    if (!slug) return;
    
    // Real-time sync for post likes
    const postRef = doc(db, 'blog_interactions', slug);
    const unsubscribe = onSnapshot(postRef, (docSnap) => {
      if (docSnap.exists()) {
        setPostLikes(docSnap.data().likes || 0);
      }
    });

    const likedKey = `liked-post-${slug}`;
    setHasLiked(!!localStorage.getItem(likedKey));

    return () => unsubscribe();
  }, [slug]);

  const handleLikePost = async () => {
    if (!slug) return;
    const likedKey = `liked-post-${slug}`;
    if (localStorage.getItem(likedKey)) {
      toast('Lo udah ngasih like di artikel ini! ❤️', { icon: '✨' });
      return;
    }

    try {
      const postRef = doc(db, 'blog_interactions', slug);
      const docSnap = await getDoc(postRef);
      
      if (!docSnap.exists()) {
        await setDoc(postRef, { likes: 1, createdAt: new Date().toISOString() });
      } else {
        await updateDoc(postRef, { likes: increment(1) });
      }

      localStorage.setItem(likedKey, 'true');
      setHasLiked(true);
      toast.success('Mantap! Like lo udah kedaftar 🚀', { icon: '🔥' });
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error('Gagal ngasih like, coba lagi ya! 😅');
    }
  };

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Tautan artikel berhasil disalin!');
  };

  // Generate an optimized meta description if the manual one is short or missing
  const optimizedDescription = post 
    ? (post.desc && post.desc.length > 50 ? post.desc : generateMetaDescription(post.mdxContent || post.content))
    : 'Jurnal teknologi dan wawasan AI automation.';

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

  const unifiedContent = post.mdxContent || post.content?.map((c: any) => typeof c === 'string' ? c : `![${c.alt}](${c.url})`).join('\n\n') || '';
  
  // Extract headings for TOC (h2 and h3) using the same logic as custom components
  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  
  const headings = unifiedContent.match(/^###?\s+(.*)/gm)?.map((h: string) => {
    const isH3 = h.startsWith('### ');
    const text = h.replace(/^###?\s+/, '');
    return { 
      id: slugify(text), 
      text: text, 
      level: isH3 ? 3 : 2 
    };
  }) || [];

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      <MetaTags 
        title={post.title}
        description={optimizedDescription}
        image={post.image}
        ogType="article"
        publishedTime={post.date}
        author={post.author?.name || "Chesta Azka Sofyan"}
        path={`/blog/${post.slug}`}
        schemaString={JSON.stringify(generateArticleSchema(post.title, optimizedDescription, `https://chestaa.com/blog/${post.slug}`, post.image || "https://chestaa.com/favicon.svg", post.date, post.author?.name || "Chesta Azka Sofyan"))}
      />

      <FloatingSocialShare title={post.title} description={post.desc} />

      {/* Clean Editorial Article Header */}
      <header className="pt-28 md:pt-36 pb-10 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-6">
          <Breadcrumbs 
            items={[
              { name: 'Blog', item: '/blog' },
              { name: post.title, item: `/blog/${post.slug}` }
            ]} 
          />
          
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {post.tags?.slice(0, 4).map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-purple-100/70 border border-purple-200 text-[11px] font-bold text-purple-900 tracking-wider font-mono uppercase">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-display font-black text-slate-900 leading-[1.14] tracking-tight mb-6">
            {post.title}
          </h1>

          {post.desc && (
            <p className="text-lg sm:text-xl font-sans text-slate-600 leading-relaxed max-w-3xl mb-8">
              {post.desc}
            </p>
          )}
          
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-200/80">
             <div className="flex flex-wrap items-center gap-5 text-sm font-sans text-slate-600">
               <div className="flex items-center gap-3">
                 <LazyImage 
                   src={post.author?.avatar || '/chesta.png'} blurSrc={post.author?.avatar || '/chesta.png'}
                   alt={post.author?.name}
                   className="w-11 h-11 rounded-full bg-purple-100 border border-purple-200 object-cover shadow-xs"
                 />
                 <div className="flex flex-col">
                   <span className="font-bold text-slate-900 text-sm sm:text-base leading-tight">{post.author?.name || 'Chesta Azka'}</span>
                   <span className="text-xs text-purple-700 font-medium font-mono">{post.author?.role || 'Lead Architect & Engineer'}</span>
                 </div>
               </div>
               <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
               <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500">
                 <Calendar size={14} className="text-purple-600" /> {post.date}
               </div>
               <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
               <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500">
                 <Clock size={14} className="text-purple-600" /> {post.readTime}
               </div>
               <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
               <button 
                 onClick={handleLikePost}
                 className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-colors ${
                   hasLiked ? 'text-rose-600' : 'text-slate-500 hover:text-rose-600'
                 }`}
               >
                 <Heart size={14} className={hasLiked ? 'fill-rose-600' : ''} />
                 <span>{postLikes} Likes</span>
               </button>
             </div>

             <SocialShare title={post.title} description={post.desc} />
          </div>

          {/* Featured Image Frame */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm aspect-[21/9] sm:aspect-[2.2/1] relative bg-slate-100">
            <LazyImage 
              src={post.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000'} 
              blurSrc={(post.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=20') + '&blur=20'}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Content Section with Generous Breathable Spacing */}
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
         <article className="w-full min-w-0">
           
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
             <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
               <Zap size={14} className="text-purple-500" /> Professional Insight
             </div>
             <button 
               onClick={handleCopyLink}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 border border-slate-200 hover:border-purple-200 text-[11px] font-bold uppercase tracking-widest transition-all shadow-xs cursor-pointer"
             >
               <LinkIcon size={13} />
               <span>Salin Link</span>
             </button>
           </div>

           <div className="prose prose-lg max-w-none prose-h1:hidden
                        prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
                        prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-16 md:prose-h2:mt-20 prose-h2:mb-6 prose-h2:pt-8 prose-h2:border-t prose-h2:border-slate-200
                        prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-10 md:prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-slate-900
                        prose-h4:text-lg md:prose-h4:text-xl prose-h4:mt-8 md:prose-h4:mt-10 prose-h4:mb-3 prose-h4:font-display prose-h4:text-slate-900
                        prose-p:font-sans prose-p:leading-[1.9] prose-p:text-slate-700 prose-p:text-[1.125rem] prose-p:mb-8 prose-p:mt-0
                        prose-a:text-purple-700 prose-a:font-semibold hover:prose-a:text-purple-900 prose-a:underline-offset-4
                        prose-strong:text-slate-900 prose-strong:font-bold
                        prose-blockquote:my-10 prose-blockquote:py-5 prose-blockquote:px-6 sm:prose-blockquote:px-8 prose-blockquote:bg-purple-50/50 prose-blockquote:border-l-4 prose-blockquote:border-purple-600 prose-blockquote:rounded-r-2xl prose-blockquote:font-sans prose-blockquote:italic prose-blockquote:text-slate-800 prose-blockquote:leading-relaxed prose-blockquote:text-base sm:prose-blockquote:text-lg
                        prose-img:rounded-xl prose-img:shadow-md prose-img:my-12 prose-img:border prose-img:border-slate-200
                        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-8 prose-ul:space-y-3 prose-ul:leading-relaxed
                        prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-8 prose-ol:space-y-3 prose-ol:leading-relaxed
                        prose-li:text-slate-700 prose-li:text-[1.075rem] marker:text-purple-600 marker:font-bold
                        prose-hr:my-14 prose-hr:border-slate-200">
             <Markdown
               options={{
                 overrides: {
                   h1: { component: () => null },
                   h2: { component: Heading2 },
                   h3: { component: Heading3 },
                   h4: { component: Heading4 },
                   StatCard: { component: StatCard },
                   TrendBar: { component: TrendBar },
                   code: { component: CodeBlock },
                   InlineCTA: { component: InlineCTA },
                   KeyTakeaways: { component: KeyTakeaways },
                   ArchitectureComparison: { component: ArchitectureComparison },
                   InteractiveInsight: { component: InteractiveInsight },
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
           
           <CaseStudyPromotion currentTags={post.tags || []} />
           
           <BlogComments slug={slug || ''} />


            {/* Author Bio Box */}
            <div className="mt-16 bg-slate-50 border border-slate-200/80 p-8 sm:p-10 rounded-xl flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
              <div className="w-24 h-24 rounded-full bg-purple-100 ring-4 ring-white shadow-lg shrink-0 overflow-hidden relative">
                <LazyImage 
                  src={post.author?.avatar || '/chesta.png'} 
                  blurSrc={post.author?.avatar || '/chesta.png'}
                  alt={post.author?.name}
                  className="w-full h-full object-cover object-top"
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
         </article>
         
         {/* Sidebar TOC & Recommendations */}
         <aside className="hidden lg:flex flex-col gap-8 sticky top-28 h-fit w-80">
           <TableOfContents headings={headings} />
           <RecommendedReading currentArticle={post} allArticles={ALL_ARTICLES} />
         </aside>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Dynamic Intelligent Related Articles Section */}
        <ReadNextSection currentArticle={post} allArticles={ALL_ARTICLES} />
      </div>
    </main>
  );
}
