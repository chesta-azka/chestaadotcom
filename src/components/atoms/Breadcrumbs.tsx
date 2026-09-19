import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbs, getBreadcrumbsForRoute, BreadcrumbItemSchema } from '../../lib/seo';

export interface BreadcrumbItem {
  name?: string;
  label?: string;
  item?: string;
  path?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  currentTitle?: string;
  className?: string;
}

export default function Breadcrumbs({ items, currentTitle, className = '' }: BreadcrumbsProps) {
  const location = useLocation();
  
  let fullItems: BreadcrumbItemSchema[] = [];

  if (items && items.length > 0) {
    fullItems = [
      { name: 'Beranda', item: 'https://chestaa.com/' },
      ...items.map(i => {
        const rawPath = i.item || i.path || '';
        const fullUrl = rawPath.startsWith('http') 
          ? rawPath 
          : `https://chestaa.com${rawPath.startsWith('/') ? rawPath : '/' + rawPath}`;
        return {
          name: i.name || i.label || '',
          item: fullUrl
        };
      })
    ];
  } else {
    fullItems = getBreadcrumbsForRoute(location.pathname, currentTitle);
  }

  const schema = generateBreadcrumbs(fullItems);

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`mb-6 flex items-center text-xs sm:text-sm font-sans text-slate-500 overflow-x-auto whitespace-nowrap py-1 ${className}`}
    >
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
      />
      <ol className="flex items-center gap-2 list-none p-0 m-0">
        {fullItems.map((bc, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === fullItems.length - 1;
          const localPath = bc.item.replace('https://chestaa.com', '') || '/';

          return (
            <li key={bc.item + idx} className="flex items-center gap-2 list-none">
              {isFirst ? (
                <Link 
                  to="/" 
                  className="flex items-center gap-1.5 text-slate-600 hover:text-purple-700 transition-colors font-medium hover:underline underline-offset-4"
                  title="Kembali ke Beranda"
                >
                  <Home size={14} className="shrink-0" />
                  <span>Beranda</span>
                </Link>
              ) : isLast ? (
                <span 
                  aria-current="page"
                  className="text-purple-950 font-semibold font-display truncate max-w-[240px] sm:max-w-xs md:max-w-md"
                  title={bc.name}
                >
                  {bc.name}
                </span>
              ) : (
                <Link 
                  to={localPath} 
                  className="text-slate-600 hover:text-purple-700 transition-colors font-medium hover:underline underline-offset-4 truncate max-w-[180px] sm:max-w-xs"
                >
                  {bc.name}
                </Link>
              )}
              {!isLast && <ChevronRight size={13} className="text-slate-300 shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
