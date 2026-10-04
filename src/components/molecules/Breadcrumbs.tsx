import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbPropItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbPropItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href.startsWith('http') ? item.href : `https://chestaa.com${item.href}`
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono mb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />
      <ol className="flex items-center space-x-2 list-none p-0 m-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href + index} className="flex items-center space-x-2">
              {index > 0 && <ChevronRight size={14} className="text-slate-600 shrink-0" />}
              {isLast ? (
                <span className="text-emerald-400 font-bold tracking-wider uppercase">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-slate-400 hover:text-white transition-colors tracking-wider uppercase"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
