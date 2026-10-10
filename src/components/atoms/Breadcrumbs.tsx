'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
  currentTitle?: string;
  hideOnHome?: boolean;
}

export default function Breadcrumbs({ 
  items, 
  className = '',
  currentTitle,
  hideOnHome = true
}: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Handle null pathname safely
  if (!pathname) return null;

  const isHome = pathname === '/' || pathname === '';

  // Don't show on homepage if hideOnHome is true
  if (isHome && hideOnHome) return null;
  
  let fullItems: BreadcrumbItem[] = [];

  if (items && items.length > 0) {
    fullItems = [
      { name: 'Beranda', item: '/' },
      ...items
    ];
  } else {
    // Auto-generate from path
    const segments = pathname.split('/').filter(Boolean);
    fullItems = [
      { name: 'Beranda', item: '/' },
      ...segments.map((seg, i) => {
        const path = `/${segments.slice(0, i + 1).join('/')}`;
        const isLast = i === segments.length - 1;
        
        // Use currentTitle for the last segment if provided
        if (isLast && currentTitle) {
          return { name: currentTitle, item: path };
        }

        // Prettify segment
        let name = seg
          .split('-')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        
        // Custom name mapping if needed
        if (seg === 'services') name = 'Layanan';
        if (seg === 'area') name = 'Wilayah';
        
        return { name, item: path };
      })
    ];
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-400 py-4 ${className}`}
    >
      <ol className="flex items-center gap-3 list-none p-0 m-0">
        {fullItems.map((bc, idx) => {
          const isLast = idx === fullItems.length - 1;

          return (
            <li key={bc.item + idx} className="flex items-center gap-3">
              {isLast ? (
                <span 
                  aria-current="page"
                  className="text-purple-600 truncate max-w-[200px]"
                >
                  {bc.name.toUpperCase()}
                </span>
              ) : (
                <Link 
                  href={bc.item} 
                  className="hover:text-purple-700 transition-colors flex items-center gap-1.5"
                >
                  {idx === 0 && <Home size={12} className="shrink-0" />}
                  <span>{bc.name.toUpperCase()}</span>
                </Link>
              )}
              {!isLast && (
                <ChevronRight size={10} className="text-slate-300 shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
