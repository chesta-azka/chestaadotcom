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

export default function Breadcrumbs({ 
  items, 
  currentTitle, 
  className = '', 
  hideOnHome = false 
}: BreadcrumbsProps) {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '';

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
  } else if (isHome) {
    fullItems = [
      { name: 'Beranda', item: 'https://chestaa.com/' },
      { name: 'Arsitektur Web & Otomasi AI', item: 'https://chestaa.com/' }
    ];
  } else {
    fullItems = getBreadcrumbsForRoute(location.pathname, currentTitle);
  }

  // Fallback for custom nested paths
  if (fullItems.length <= 1 && !isHome) {
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
      className={`flex items-center text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400 overflow-x-auto whitespace-nowrap py-2 no-scrollbar ${className}`}
    >
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
      />
      <ol className="flex items-center gap-2.5 list-none p-0 m-0">
        {fullItems.map((bc, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === fullItems.length - 1;
          const localPath = bc.item.replace('https://chestaa.com', '') || '/';

          return (
            <li key={bc.item + idx} className="flex items-center gap-2.5 list-none">
              {isFirst ? (
                <Link 
                  to="/" 
                  className="flex items-center gap-1.5 text-slate-500 hover:text-purple-700 transition-colors group font-medium"
                  title="Beranda CHESTAADOTCOM"
                >
                  <Home size={12} className="shrink-0 text-slate-400 group-hover:text-purple-700 transition-colors" />
                  <span>BERANDA</span>
                </Link>
              ) : isLast ? (
                <span 
                  aria-current="page"
                  className="text-purple-700 font-semibold truncate max-w-[180px] sm:max-w-xs md:max-w-md"
                  title={bc.name}
                >
                  {bc.name.toUpperCase()}
                </span>
              ) : (
                <Link 
                  to={localPath} 
                  className="text-slate-500 hover:text-purple-700 transition-colors truncate max-w-[130px] sm:max-w-xs font-medium"
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
