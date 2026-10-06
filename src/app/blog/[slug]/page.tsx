import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_ARTICLES, Article } from '../../../data/blogData';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Breadcrumbs from '../../../components/atoms/Breadcrumbs';
import RelatedArticles from '../../../components/organisms/RelatedArticles';
import { injectSemanticLinks } from '../../../lib/semantic-linker';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = ALL_ARTICLES.find(p => p.slug === slug);

  if (!post) {
    return {
      title: 'Artikel Tidak Ditemukan | CHESTAA',
      description: 'Maaf, artikel yang Anda cari tidak ditemukan dalam arsip insights.'
    };
  }

  const canonicalUrl = `https://chestaa.com/blog/${slug}`;
  const ogImageUrl = `https://chestaa.com/api/og?title=${encodeURIComponent(post.title)}&category=Blog`;

  return {
    title: `${post.title} | CHESTAA`,
    description: post.desc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.desc,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author?.name || 'Chestaa Enterprise AI'],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.desc,
      images: [ogImageUrl],
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = ALL_ARTICLES.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.desc,
    "image": post.image || `https://chestaa.com/api/og?title=${encodeURIComponent(post.title)}&category=Blog`,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Chesta Azka"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Chestaa Enterprise AI",
      "url": "https://chestaa.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chestaa.com/favicon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://chestaa.com/blog/${slug}`
    }
  };

  const serializeJsonLd = (schema: object) => {
    return JSON.stringify(schema)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  };

  // Inject autonomous semantic internal links into raw/MDX content
  const rawContent = typeof post.mdxContent === 'string' ? post.mdxContent : (Array.isArray(post.content) && typeof post.content[0] === 'string' ? post.content[0] : post.desc);
  const optimizedContent = injectSemanticLinks(rawContent);

  return (
    <div className="pt-36 pb-28 min-h-screen font-sans bg-[#fbfbfd] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-10">
        {/* Breadcrumb Integration */}
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Blog', path: '/blog' }, { label: post.title, path: `/blog/${slug}` }]} />

        {/* Back Link */}
        <div>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Blog Hub</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-6 border-b border-slate-200 pb-10">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-widest font-bold">
              {post.cat}
            </span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            {post.desc}
          </p>

          {post.author && (
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold font-mono">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{post.author.name}</div>
                <div className="text-xs text-slate-500 font-mono">{post.author.role}</div>
              </div>
            </div>
          )}
        </div>

        {/* Article Content with Injected Semantic Links */}
        <div className="prose prose-slate prose-lg max-w-none font-sans space-y-6 leading-relaxed text-slate-700 text-base sm:text-lg">
          <div dangerouslySetInnerHTML={{ __html: optimizedContent }} />
        </div>

        {/* Related Articles Component */}
        <RelatedArticles currentSlug={slug} category={post.cat} />

      </div>
    </div>
  );
}
