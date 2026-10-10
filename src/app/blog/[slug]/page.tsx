import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_ARTICLES, Article } from '../../../data/blogData';
import Link from 'next/link';
import Image from 'next/image';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArrowLeft, Calendar, Clock, User, ListTree, ChevronRight, Hash, Sparkles } from 'lucide-react';
import RelatedArticles from '../../../components/organisms/RelatedArticles';
import BlogTableOfContents from '../../../components/molecules/BlogTableOfContents';
import { injectSemanticLinks } from '../../../lib/semantic-linker';

const solidBlurBase64 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoMjQxLCAyNDUsIDI0OSwgMSkiLz48L3N2Zz4=';

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface FaqItem {
  question: string;
  answer: string;
}

// Helper to replace standard images with next image
function replaceStandardImagesWithNextImage(htmlContent: string): string {
  if (!htmlContent) return '';

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

  transformedHtml = transformedHtml.replace(/<img\b([^>]*)\/?>/gi, (fullMatch, attrs) => {
    const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
    const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
    const classMatch = attrs.match(/class=["']([^"']*)["']/i);

    const src = srcMatch ? srcMatch[1] : '';
    const alt = altMatch ? altMatch[1] : '';
    const className = classMatch ? classMatch[1] : '';

    if (!src) return fullMatch;

    const isFixedAvatar = /w-(?:16|20|24|28|32|36|40|44|48)/.test(className);

    if (isFixedAvatar) {
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
          sizes: dynamicSizes,
          className: 'object-cover',
          referrerPolicy: 'no-referrer',
        })
      );
      return renderToStaticMarkup(wrapperElement);
    }

    const standardElement = React.createElement(
      'div',
      {
        className:
          'relative w-full aspect-[16/9] sm:aspect-[16/10] my-8 overflow-hidden rounded-2xl border border-slate-200/80 shadow-md bg-slate-100',
      },
      React.createElement(Image, {
        src,
        alt: alt || 'Blog visual illustration',
        fill: true,
        placeholder: 'blur',
        blurDataURL: solidBlurBase64,
        sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px',
        className: 'object-cover',
        referrerPolicy: 'no-referrer',
      })
    );

    return renderToStaticMarkup(standardElement);
  });

  return transformedHtml;
}

// Clean helper to slugify strings into URL anchor identifiers
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

// Helper to extract H2 and H3 headings for Sitelinks generation
function extractHeadings(markdown: string): TocHeading[] {
  if (!markdown) return [];
  const cleanMd = markdown.replace(/^---[\s\S]*?---/, '');
  const lines = cleanMd.split('\n');
  const headings: TocHeading[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^##\s+/, '').replace(new RegExp('\\x2A{1,2}', 'g'), '').replace(/`/g, '').trim();
      const id = slugify(text);
      if (id && text) {
        headings.push({ id, text, level: 2 });
      }
    } else if (trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^###\s+/, '').replace(new RegExp('\\x2A{1,2}', 'g'), '').replace(/`/g, '').trim();
      const id = slugify(text);
      if (id && text) {
        headings.push({ id, text, level: 3 });
      }
    }
  }
  return headings;
}

// Extract FAQs for Schema generation
function extractFaqs(markdown: string): FaqItem[] {
  if (!markdown) return [];
  const faqs: FaqItem[] = [];

  const faqSectionRegex = /##\s*[^#\n]*(?:FAQ|Pertanyaan)[^\n]*\n([\s\S]*?)(?=\n##\s|\n---\s*\n##|$)/i;
  const match = markdown.match(faqSectionRegex);

  if (match && match[1]) {
    const sectionContent = match[1].trim();
    const qBlocks = sectionContent.split(/\n+(?=(?:\x2A\x2A[^\x2A]+\?\x2A\x2A|###\s+[^\n]+\?))/);
    for (const block of qBlocks) {
      const qMatch = block.match(/^(?:\x2A\x2A(.*?)\x2A\x2A|###\s+(.*))\s*\n+([\s\S]+)$/);
      if (qMatch) {
        const question = (qMatch[1] || qMatch[2] || '').trim();
        const answer = (qMatch[3] || '')
          .replace(/<[^>]*>/g, '')
          .replace(new RegExp('\\x2A{1,2}', 'g'), '')
          .replace(/`/g, '')
          .trim();
        if (question && answer) {
          faqs.push({ question, answer });
        }
      }
    }
  }

  return faqs;
}

// Render markdown to HTML with proper heading IDs for Sitelinks navigation
function renderMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';
  let text = markdown.replace(/^---[\s\S]*?---/, '').trim();

  // Replace h3
  text = text.replace(/^###\s+(.+)$/gm, (_, title) => {
    const cleanTitle = title.replace(new RegExp('\\x2A{1,2}', 'g'), '').trim();
    const id = slugify(cleanTitle);
    return `<h3 id="${id}" class="scroll-mt-32 font-display text-xl sm:text-2xl font-bold text-slate-900 mt-10 mb-3 tracking-tight leading-snug">${cleanTitle}</h3>`;
  });

  // Replace h2
  text = text.replace(/^##\s+(.+)$/gm, (_, title) => {
    const cleanTitle = title.replace(new RegExp('\\x2A{1,2}', 'g'), '').trim();
    const id = slugify(cleanTitle);
    return `<h2 id="${id}" class="scroll-mt-32 font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mt-14 mb-4 pt-6 border-t border-slate-200/80 tracking-tight leading-snug">${cleanTitle}</h2>`;
  });

  // Paragraphs
  const paragraphs = text.split(/\n\s*\n/);
  const formattedParagraphs = paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h2') || trimmed.startsWith('<h3') || trimmed.startsWith('<figure') || trimmed.startsWith('<div')) {
      return trimmed;
    }
    const inlineFormatted = trimmed
      .replace(/\x2A\x2A([^\x2A]+)\x2A\x2A/g, '<strong>$1</strong>')
      .replace(/\x2A([^\x2A]+)\x2A/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-purple-800 text-sm font-mono">$1</code>');
    return `<p class="leading-[1.9] text-slate-700 text-base sm:text-lg mb-6">${inlineFormatted}</p>`;
  });

  return formattedParagraphs.join('\n');
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = ALL_ARTICLES.find(p => p.slug === slug);

  if (!post) {
    return {
      title: 'Artikel Tidak Ditemukan | Chestaa',
      description: 'Artikel wawasan arsitektur digital dan teknologi tidak ditemukan.',
    };
  }

  const ogImageUrl = `https://chestaa.com/api/og?title=${encodeURIComponent(post.title)}&category=Blog`;
  const canonicalUrl = `https://chestaa.com/blog/${slug}`;

  return {
    title: `${post.title} | Chestaa Strategic Journal`,
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
      authors: [post.author?.name || 'Chesta'],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.desc,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = ALL_ARTICLES.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const ogImageUrl = `https://chestaa.com/api/og?title=${encodeURIComponent(post.title)}&category=Blog`;
  const articleUrl = `https://chestaa.com/blog/${slug}`;

  // TASK 1: Strict BlogPosting schema rooted in Organization entity
  const nestedArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    'isPartOf': {
      '@type': 'Blog',
      '@id': 'https://chestaa.com/blog#blog',
      'name': 'Chestaa Strategic Engineering Journal',
      'publisher': {
        '@type': 'Organization',
        '@id': 'https://chestaa.com/#organization',
        'name': 'Chestaa Enterprise AI',
        'url': 'https://chestaa.com',
        'logo': {
          '@type': 'ImageObject',
          '@id': 'https://chestaa.com/#logo',
          'url': 'https://chestaa.com/chesta.png',
          'caption': 'Chestaa Enterprise AI'
        }
      }
    },
    'headline': post.title,
    'description': post.desc,
    'image': [ogImageUrl],
    'datePublished': post.date,
    'dateModified': post.date,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': articleUrl
    },
    'author': {
      '@type': 'Person',
      'name': 'Chesta',
      'jobTitle': 'Principal Architect',
      'url': 'https://chestaa.com/about'
    },
    'publisher': {
      '@type': 'Organization',
      '@id': 'https://chestaa.com/#organization',
      'name': 'Chestaa Enterprise AI',
      'url': 'https://chestaa.com',
      'logo': {
        '@type': 'ImageObject',
        '@id': 'https://chestaa.com/#logo',
        'url': 'https://chestaa.com/chesta.png',
        'caption': 'Chestaa Enterprise AI'
      }
    }
  };

  const serializeJsonLd = (schema: object) => {
    return JSON.stringify(schema)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  };

  const rawContent = typeof post.mdxContent === 'string'
    ? post.mdxContent
    : (Array.isArray(post.content) && typeof post.content[0] === 'string' ? post.content[0] : post.desc);

  // Extract headings for Table of Contents and Sitelinks
  const headings = extractHeadings(rawContent);

  const parsedHtml = renderMarkdownToHtml(rawContent);
  const semanticLinkedHtml = injectSemanticLinks(parsedHtml);
  const optimizedContent = replaceStandardImagesWithNextImage(semanticLinkedHtml);

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Beranda',
        'item': 'https://chestaa.com/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': 'https://chestaa.com/blog'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': post.title,
        'item': articleUrl
      }
    ]
  };

  // FAQ Schema
  const extractedFaqs = extractFaqs(rawContent);
  const resolvedFaqs = extractedFaqs.length > 0 ? extractedFaqs : [
    {
      question: `Apa fokus utama artikel ${post.title}?`,
      answer: post.desc,
    },
    {
      question: 'Bagaimana pendekatan arsitektur teknologi yang diterapkan CHESTAA pada topik ini?',
      answer: 'CHESTAA mengutamakan arsitektur performa tinggi, efisiensi operasional berbasis sistem mandiri, dan penyelarasan alur kerja digital dengan pertumbuhan profitabilitas bisnis.',
    },
    {
      question: 'Bagaimana cara berkonsultasi mengenai solusi yang dibahas dalam artikel ini?',
      answer: 'Anda dapat menjadwalkan konsultasi arsitektur digital dan audit sistem gratis langsung dengan tim CHESTAA melalui kanal resmi WhatsApp kami.',
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${articleUrl}#faq`,
    'mainEntity': resolvedFaqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <div className="pt-36 pb-28 min-h-screen h-auto font-sans bg-[#fbfbfd] text-slate-900 overflow-x-hidden overflow-y-visible scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(nestedArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-auto overflow-visible space-y-10">

        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-purple-700">
            <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 uppercase font-bold tracking-wider">
              {post.cat || 'Rekayasa Sistem'}
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

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold font-mono">
              C
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Chesta</div>
              <div className="text-xs text-purple-700 font-mono font-medium">Principal Architect</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 w-full h-auto overflow-visible">
          <main className="flex-1 min-w-0 max-w-4xl space-y-10 h-auto overflow-visible">
            {headings.length > 0 && (
              <nav 
                aria-label="Table of contents" 
                className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-4 not-prose"
              >
                <div className="flex items-center gap-2 pb-3 border-b border-purple-50 text-purple-950">
                  <ListTree size={16} className="text-purple-600" />
                  <span className="font-display font-bold text-sm tracking-tight">
                    Daftar Isi &amp; Navigasi Artikel
                  </span>
                </div>
                <ol className="space-y-2 m-0 p-0 list-none text-sm">
                  {headings.map(h => (
                    <li key={h.id} className={h.level === 3 ? 'pl-4' : 'pl-0'}>
                      <a 
                        href={`#${h.id}`}
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-700 transition-colors py-0.5"
                      >
                        <ChevronRight size={12} className="text-purple-400 shrink-0" />
                        <span className="hover:underline">{h.text}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <article className="prose prose-slate prose-lg max-w-none font-sans leading-relaxed text-slate-700 text-base sm:text-lg h-auto overflow-visible">
              <div dangerouslySetInnerHTML={{ __html: optimizedContent }} />
            </article>

            <div className="pt-12 border-t border-slate-200">
              <RelatedArticles currentSlug={slug} category={post.cat} />
            </div>
          </main>

          {headings.length > 0 && (
            <BlogTableOfContents headings={headings} variant="desktop" />
          )}
        </div>
      </div>
    </div>
  );
}
