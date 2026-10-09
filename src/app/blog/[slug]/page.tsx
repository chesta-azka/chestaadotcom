import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_ARTICLES, Article } from '../../../data/blogData';
import Link from 'next/link';
import Image from 'next/image';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArrowLeft, Calendar, Clock, User, ListTree } from 'lucide-react';
import Breadcrumbs from '../../../components/atoms/Breadcrumbs';
import RelatedArticles from '../../../components/organisms/RelatedArticles';
import BlogTableOfContents from '../../../components/molecules/BlogTableOfContents';
import { injectSemanticLinks } from '../../../lib/semantic-linker';

const solidBlurBase64 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoMjQxLCAyNDUsIDI0OSwgMSkiLz48L3N2Zz4=';

const darkBlurBase64 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoMTUsIDIzLCA0MiwgMSkiLz48L3N2Zz4=';

/**
 * Replaces standard <img> tags generated in parsed HTML with optimized wrappers using next/image,
 * applying dynamic responsive sizes and blur placeholders for superior performance and zero CLS.
 */
function replaceStandardImagesWithNextImage(htmlContent: string): string {
  if (!htmlContent) return '';

  // 1. Match and transform <figure> blocks containing <img> tags
  let transformedHtml = htmlContent.replace(
    /<figure[^>]*>\s*<img\b([^>]*)>(?:\s*<figcaption[^>]*>([\s\S]*?)<\/figcaption>)?\s*<\/figure>/gi,
    (fullMatch, imgAttrs, captionContent) => {
      const srcMatch = imgAttrs.match(/src=["']([^"']+)["']/i);
      const altMatch = imgAttrs.match(/alt=["']([^"']*)["']/i);
      const src = srcMatch ? srcMatch[1] : '';
      const alt = altMatch ? altMatch[1] : '';
      const caption = captionContent ? captionContent.replace(/<[^>]*>/g, '').trim() : alt;

      if (!src) return fullMatch;

      const figureElement = React.createElement(
        'figure',
        { className: 'my-10 w-full not-prose' },
        React.createElement(
          'div',
          {
            className:
              'relative w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200/80 shadow-md bg-slate-100',
          },
          React.createElement(Image, {
            src,
            alt: alt || 'Blog visual asset',
            fill: true,
            placeholder: 'blur',
            blurDataURL: solidBlurBase64,
            sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px',
            className: 'object-cover',
            referrerPolicy: 'no-referrer',
          })
        ),
        caption
          ? React.createElement(
              'figcaption',
              { className: 'text-xs text-slate-500 mt-2.5 text-center font-mono' },
              caption
            )
          : null
      );

      return renderToStaticMarkup(figureElement);
    }
  );

  // 2. Match and replace remaining standalone <img> tags (such as author badges, inline media, etc.)
  transformedHtml = transformedHtml.replace(/<img\b([^>]*)\/?>/gi, (fullMatch, attrs) => {
    const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
    const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
    const classMatch = attrs.match(/class=["']([^"']*)["']/i);

    const src = srcMatch ? srcMatch[1] : '';
    const alt = altMatch ? altMatch[1] : '';
    const className = classMatch ? classMatch[1] : '';

    if (!src) return fullMatch;

    // Check if image is an author avatar or fixed-dimension badge
    const isFixedAvatar = /w-(?:16|20|24|28|32|36|40|44|48)/.test(className);

    if (isFixedAvatar) {
      // Extract width dimension to supply dynamic responsive sizes
      const sizeMatch = className.match(/w-(\d+)/);
      const widthVal = sizeMatch ? parseInt(sizeMatch[1], 10) * 4 : 144;
      const dynamicSizes = `(max-width: 640px) ${widthVal}px, ${widthVal}px`;

      const wrapperElement = React.createElement(
        'div',
        {
          className: `relative ${className} overflow-hidden bg-slate-900`,
        },
        React.createElement(Image, {
          src,
          alt: alt || 'Author photo',
          fill: true,
          placeholder: 'blur',
          blurDataURL: darkBlurBase64,
          sizes: dynamicSizes,
          className: 'object-cover object-top',
          referrerPolicy: 'no-referrer',
        })
      );

      return renderToStaticMarkup(wrapperElement);
    }

    // General responsive image replacement with dynamic sizes and blur placeholder
    const responsiveWrapper = React.createElement(
      'div',
      {
        className:
          'my-8 relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200/80 shadow-md bg-slate-100 not-prose',
      },
      React.createElement(Image, {
        src,
        alt: alt || 'Visual illustration',
        fill: true,
        placeholder: 'blur',
        blurDataURL: solidBlurBase64,
        sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px',
        className: 'object-cover',
        referrerPolicy: 'no-referrer',
      })
    );

    return renderToStaticMarkup(responsiveWrapper);
  });

  return transformedHtml;
}

type Props = {
  params: Promise<{ slug: string }>;
};

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

function extractFaqs(markdown: string): FaqItem[] {
  if (!markdown) return [];
  const faqs: FaqItem[] = [];

  // Match section under ## ... (FAQ) or ## ... Pertanyaan ...
  const faqSectionRegex = /##\s*[^#\n]*(?:FAQ|Pertanyaan)[^\n]*\n([\s\S]*?)(?=\n##\s|\n---\s*\n##|$)/i;
  const match = markdown.match(faqSectionRegex);

  if (match && match[1]) {
    const sectionContent = match[1].trim();
    const qBlocks = sectionContent.split(/\n+(?=(?:\*\*[^*]+\?\*\*|###\s+[^\n]+\?))/);
    for (const block of qBlocks) {
      const qMatch = block.match(/^(?:\*\*(.*?)\*\*|###\s+(.*))\s*\n+([\s\S]+)$/);
      if (qMatch) {
        const question = (qMatch[1] || qMatch[2] || '').trim();
        const answer = (qMatch[3] || '')
          .replace(/<[^>]*>/g, '')
          .replace(/\*\*/g, '')
          .replace(/\*/g, '')
          .replace(/`/g, '')
          .trim();
        if (question && answer) {
          faqs.push({ question, answer });
        }
      }
    }
  }

  // Fallback scan for standalone bold questions across the markdown
  if (faqs.length === 0) {
    const boldQuestions = /^\*\*([A-Z0-9\s,.-]+?\?)\*\*\s*\n+([^*\n#][\s\S]+?)(?=\n\*\*|\n##|\n---|$)/gim;
    let bMatch;
    while ((bMatch = boldQuestions.exec(markdown)) !== null) {
      const q = bMatch[1].trim();
      const a = bMatch[2].replace(/<[^>]*>/g, '').replace(/\*\*/g, '').trim();
      if (q.length > 10 && a.length > 20 && !faqs.some(f => f.question === q)) {
        faqs.push({ question: q, answer: a });
      }
    }
  }

  return faqs;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

function extractHeadings(markdown: string): TocHeading[] {
  if (!markdown) return [];
  const cleanMd = markdown.replace(/^---[\s\S]*?---/, '');
  const lines = cleanMd.split('\n');
  const headings: TocHeading[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^##\s+/, '').replace(/\*\*/g, '').replace(/`/g, '').trim();
      const id = slugify(text);
      if (id && text) {
        headings.push({ id, text, level: 2 });
      }
    } else if (trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '').replace(/`/g, '').trim();
      const id = slugify(text);
      if (id && text) {
        headings.push({ id, text, level: 3 });
      }
    }
  }
  return headings;
}

function renderMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';
  let text = markdown.replace(/^---[\s\S]*?---/, '').trim();

  // Replace h3 first
  text = text.replace(/^###\s+(.+)$/gm, (_, title) => {
    const cleanTitle = title.replace(/\*\*/g, '').trim();
    const id = slugify(cleanTitle);
    return `<h3 id="${id}" class="scroll-mt-32 font-display text-xl sm:text-2xl font-bold text-slate-900 mt-10 mb-3 tracking-tight leading-snug">${cleanTitle}</h3>`;
  });

  // Replace h2 next
  text = text.replace(/^##\s+(.+)$/gm, (_, title) => {
    const cleanTitle = title.replace(/\*\*/g, '').trim();
    const id = slugify(cleanTitle);
    return `<h2 id="${id}" class="scroll-mt-32 font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mt-14 mb-4 pt-6 border-t border-slate-200/80 tracking-tight leading-snug">${cleanTitle}</h2>`;
  });

  // Remove top-level h1 if matched (article title is in header)
  text = text.replace(/^#\s+(.+)$/gm, '');

  // Horizontal rules
  text = text.replace(/^---$/gm, '<hr class="my-10 border-slate-200" />');

  // Bold and Italic
  text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em class="italic text-slate-800">$1</em>');

  // Code blocks & inline code
  text = text.replace(/```([\w-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="my-6 p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-sm overflow-x-auto"><code class="language-${lang}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  });
  text = text.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-purple-50 text-purple-900 font-mono text-xs font-semibold border border-purple-200/60">$1</code>');

  // Blockquotes
  text = text.replace(/^>\s+(.+)$/gm, '<blockquote class="my-6 pl-4 border-l-4 border-purple-600 bg-purple-50/40 py-3 pr-4 rounded-r-xl italic text-slate-700 font-sans">$1</blockquote>');

  // Markdown links (do not match markdown images)
  text = text.replace(/(?<!\!)\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-purple-700 font-semibold underline decoration-purple-400 hover:text-purple-900 transition-colors">$1</a>');

  // Markdown images
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure class="my-8"><img src="$2" alt="$1" class="rounded-2xl border border-slate-200/80 shadow-md w-full object-cover" /><figcaption class="text-xs text-slate-500 mt-2 text-center font-mono">$1</figcaption></figure>');

  // Unordered lists
  text = text.replace(/^-\s+(.+)$/gm, '<li class="text-slate-700 leading-relaxed">$1</li>');
  text = text.replace(/(<li[\s\S]*?<\/li>\n?)+/g, '<ul class="list-disc pl-6 space-y-2 my-4 text-slate-700 leading-relaxed font-sans">$&</ul>');

  // Paragraph wrapping for non-HTML blocks
  const blocks = text.split(/\n{2,}/);
  const htmlBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || 
        trimmed.startsWith('<div') || 
        trimmed.startsWith('<ul') || 
        trimmed.startsWith('<ol') || 
        trimmed.startsWith('<pre') || 
        trimmed.startsWith('<blockquote') || 
        trimmed.startsWith('<hr') || 
        trimmed.startsWith('<figure') ||
        trimmed.startsWith('<img') ||
        trimmed.startsWith('<table')) {
      return trimmed;
    }
    return `<p class="font-sans text-base sm:text-lg text-slate-700 leading-relaxed mb-6 font-normal">${trimmed}</p>`;
  });

  return htmlBlocks.filter(Boolean).join('\n');
}

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
        "url": "https://chestaa.com/chesta.png"
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

  // Get raw markdown content
  const rawContent = typeof post.mdxContent === 'string' 
    ? post.mdxContent 
    : (Array.isArray(post.content) && typeof post.content[0] === 'string' ? post.content[0] : post.desc);

  // Extract h2 and h3 headings dynamically
  const headings = extractHeadings(rawContent);

  // Render markdown to HTML with IDs and scroll margins on headings, then inject semantic links
  const parsedHtml = renderMarkdownToHtml(rawContent);
  const semanticLinkedHtml = injectSemanticLinks(parsedHtml);

  // Replace standard <img> tags with dynamic next/image wrappers featuring blur placeholders and responsive sizes
  const optimizedContent = replaceStandardImagesWithNextImage(semanticLinkedHtml);

  // Dynamic BreadcrumbList Schema.org JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://chestaa.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://chestaa.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://chestaa.com/blog/${slug}`
      }
    ]
  };

  // Dynamic FAQ Schema.org JSON-LD extracted from blog content
  const extractedFaqs = extractFaqs(rawContent);
  const fallbackFaqs: FaqItem[] = [
    {
      question: `Apa fokus utama artikel "${post.title}"?`,
      answer: post.desc,
    },
    {
      question: `Bagaimana pendekatan arsitektur teknologi yang diterapkan CHESTAA pada topik ini?`,
      answer: `CHESTAA mengutamakan arsitektur performa tinggi, efisiensi operasional berbasis sistem mandiri, dan penyelarasan alur kerja digital dengan pertumbuhan profitabilitas bisnis.`,
    },
    {
      question: `Bagaimana cara berkonsultasi mengenai solusi yang dibahas dalam artikel ini?`,
      answer: `Anda dapat menjadwalkan konsultasi arsitektur digital dan audit sistem gratis langsung dengan tim CHESTAA melalui kanal resmi kami.`,
    }
  ];

  const resolvedFaqs = extractedFaqs.length > 0 ? extractedFaqs : fallbackFaqs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": resolvedFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="pt-36 pb-28 min-h-screen h-auto font-sans bg-[#fbfbfd] text-slate-900 overflow-x-hidden overflow-y-visible scroll-smooth">
      {/* Dynamic JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      {/* Main Container configured to prevent unintended scroll snapping & handle height/overflow properly */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-auto overflow-visible space-y-10">
        {/* Breadcrumb Integration */}
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Blog', path: '/blog' }, { label: post.title, path: `/blog/${slug}` }]} />

        {/* Back Link */}
        <div>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-700 hover:text-purple-900 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Blog Hub</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-6 border-b border-slate-200 pb-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-widest font-bold">
              {post.cat}
            </span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15] font-display">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            {post.desc}
          </p>

          {post.author && (
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold font-mono">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{post.author.name}</div>
                <div className="text-xs text-slate-500 font-mono">{post.author.role}</div>
              </div>
            </div>
          )}
        </div>

        {/* Content & Table of Contents Grid Layout */}
        <div className="flex flex-col lg:flex-row items-start gap-12 w-full h-auto overflow-visible">
          
          {/* Main Article Content Container */}
          <main className="flex-1 min-w-0 max-w-4xl space-y-10 h-auto overflow-visible">
            {/* Mobile / Tablet Table of Contents Card with entrance animation */}
            {headings.length > 0 && (
              <BlogTableOfContents headings={headings} variant="mobile" />
            )}

            {/* Article Body Content */}
            <article className="prose prose-slate prose-lg max-w-none font-sans leading-relaxed text-slate-700 text-base sm:text-lg h-auto overflow-visible">
              <div dangerouslySetInnerHTML={{ __html: optimizedContent }} />
            </article>

            {/* Related Articles Component */}
            <div className="pt-12 border-t border-slate-200">
              <RelatedArticles currentSlug={slug} category={post.cat} />
            </div>
          </main>

          {/* Desktop Sticky Table of Contents Sidebar with subtle Framer Motion entrance animation */}
          {headings.length > 0 && (
            <BlogTableOfContents headings={headings} variant="desktop" />
          )}

        </div>

      </div>
    </div>
  );
}
