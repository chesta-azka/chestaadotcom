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
  hideOnHome?: boolean;
}

export default function Breadcrumbs({ items, currentTitle, className = '', hideOnHome = true }: BreadcrumbsProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome && hideOnHome) return null;
  
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

  // If we only have home item and we're not on home, it might be an empty path or something
  if (fullItems.length <= 1 && !isHome) {
    // Attempt one last time with simple path split if getBreadcrumbsForRoute failed to find subsegments
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      fullItems = [
        { name: 'Beranda', item: 'https://chestaa.com/' },
        ...segments.map((seg, i) => ({
          name: seg.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          item: `https://chestaa.com/${segments.slice(0, i + 1).join('/')}`
        }))
      ];
    }
  }

  const schema = generateBreadcrumbs(fullItems);

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-widest text-slate-400 overflow-x-auto whitespace-nowrap py-2 no-scrollbar ${className}`}
    >
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
      />
      <ol className="flex items-center gap-3 list-none p-0 m-0">
        {fullItems.map((bc, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === fullItems.length - 1;
          const localPath = bc.item.replace('https://chestaa.com', '') || '/';

          return (
            <li key={bc.item + idx} className="flex items-center gap-3 list-none">
              {isFirst ? (
                <Link 
                  to="/" 
                  className="flex items-center gap-1.5 text-slate-400 hover:text-purple-600 transition-colors group"
                  title="Beranda"
                >
                  <Home size={12} className="shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">BERANDA</span>
                </Link>
              ) : isLast ? (
                <span 
                  aria-current="page"
                  className="text-purple-600 font-black truncate max-w-[150px] sm:max-w-xs md:max-w-md"
                  title={bc.name}
                >
                  {bc.name.toUpperCase()}
                </span>
              ) : (
                <Link 
                  to={localPath} 
                  className="text-slate-400 hover:text-slate-600 transition-colors truncate max-w-[120px] sm:max-w-xs"
                >
                  {bc.name.toUpperCase()}
                </Link>
              )}
              {!isLast && <ChevronRight size={10} className="text-slate-300 shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
