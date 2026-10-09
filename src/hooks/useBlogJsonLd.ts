'use client';

import { useEffect, useMemo } from 'react';
import { ALL_ARTICLES, type Article } from '../data/blogData';
import { parseDateToISOString } from '../utils/dateUtils';
import { generateMetaDescription } from '../utils/blogUtils';

export interface BlogJsonLdResult {
  articleSchema: Record<string, any> | null;
  breadcrumbSchema: Record<string, any> | null;
  combinedSchema: Record<string, any> | null;
  jsonLdString: string;
}

/**
 * Pure utility function to generate Schema.org JSON-LD for an article by slug or Article object.
 * Adheres to Google Search Central guidelines for BlogPosting and BreadcrumbList schemas.
 */
export function generateBlogJsonLd(slugOrArticle: string | Article): BlogJsonLdResult {
  const article: Article | undefined = typeof slugOrArticle === 'string'
    ? ALL_ARTICLES.find(a => a.slug === slugOrArticle)
    : slugOrArticle;

  if (!article) {
    return {
      articleSchema: null,
      breadcrumbSchema: null,
      combinedSchema: null,
      jsonLdString: '',
    };
  }

  const siteUrl = 'https://chestaa.com';
  const articleUrl = `${siteUrl}/blog/${article.slug}`;
  const imageUrl = article.image || `${siteUrl}/favicon.svg`;
  const authorName = article.author?.name || 'Chesta Azka Sofyan';
  const authorRole = article.author?.role || 'Digital Architect & AI Strategist';

  const rawDescription = article.desc && article.desc.length > 40
    ? article.desc
    : generateMetaDescription(article.mdxContent || article.content);

  // ISO dates
  const publishedIso = parseDateToISOString(article.date) || new Date().toISOString();
  const modifiedIso = publishedIso;

  // Approximate word count
  const textBody = typeof article.content === 'string' 
    ? article.content 
    : Array.isArray(article.content) 
      ? article.content.map(c => typeof c === 'string' ? c : '').join(' ')
      : article.mdxContent || '';
  const wordCount = textBody.split(/\s+/).filter(Boolean).length || 800;

  // 1. Google-compliant BlogPosting & TechArticle Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': ['BlogPosting', 'TechArticle'],
    '@id': `${articleUrl}#article`,
    isPartOf: {
      '@type': 'Blog',
      '@id': `${siteUrl}/blog#blog`,
      name: 'CHESTAADOTCOM Strategic Digital Journal',
      url: `${siteUrl}/blog`,
    },
    headline: article.title,
    description: rawDescription,
    image: [imageUrl],
    datePublished: publishedIso,
    dateModified: modifiedIso,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
      url: `${siteUrl}/about`,
      sameAs: [
        'https://id.linkedin.com/in/chesta-azka',
        'https://github.com/chestacode'
      ]
    },
    publisher: {
      '@type': 'Organization',
      name: 'CHESTAADOTCOM',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/chesta.png`,
        width: 512,
        height: 512,
      },
    },
    articleSection: article.cat || 'Teknologi & Bisnis',
    keywords: (article.tags || ['Next.js', 'AI Automation', 'Digital Transformation', 'BSD City']).join(', '),
    wordCount: wordCount,
    timeRequired: `PT${article.readTimeMinutes || 10}M`,
    inLanguage: 'id-ID',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.executive-summary', 'article p'],
    },
  };

  // 2. BreadcrumbList Schema for Google Search Snippets
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${articleUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: `${siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog & Masterclass',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  // Combined Graph Schema
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [articleSchema, breadcrumbSchema],
  };

  return {
    articleSchema,
    breadcrumbSchema,
    combinedSchema,
    jsonLdString: JSON.stringify(combinedSchema, null, 2),
  };
}

/**
 * React Hook that automatically generates and injects JSON-LD Schema Markup
 * into the document's <head> based on the post slug.
 * Cleans up and re-injects seamlessly when navigating between blog posts.
 */
export function useBlogJsonLd(slug: string | undefined): BlogJsonLdResult {
  const schemaResult = useMemo(() => {
    if (!slug) {
      return {
        articleSchema: null,
        breadcrumbSchema: null,
        combinedSchema: null,
        jsonLdString: '',
      };
    }
    return generateBlogJsonLd(slug);
  }, [slug]);

  useEffect(() => {
    if (!slug || !schemaResult.jsonLdString) return;

    const scriptId = `jsonld-blog-post-${slug}`;
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    scriptTag.text = schemaResult.jsonLdString;

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
      }
    };
  }, [slug, schemaResult.jsonLdString]);

  return schemaResult;
}

export default useBlogJsonLd;
