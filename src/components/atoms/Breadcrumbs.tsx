import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbs } from '../../lib/seo';

interface BreadcrumbItem {
  name: string;
  item: string; // The URL path
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const location = useLocation();
  
  const fullItems = [
    { name: 'Home', item: '/' },
    ...items
  ];

  const schema = generateBreadcrumbs(fullItems.map(bc => ({
    ...bc,
    item: bc.item.startsWith('/') ? `https://chestaa.com${bc.item}` : bc.item
  })));

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm font-sans text-slate-500 overflow-x-auto whitespace-nowrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol className="flex items-center gap-2 list-none p-0 m-0">
        {fullItems.map((bc, idx) => {
          const isLast = idx === fullItems.length - 1;
          return (
            <li key={bc.item} className="flex items-center gap-2 list-none">
              {idx === 0 ? (
                <Link to={bc.item} className="flex items-center gap-1.5 text-slate-600 hover:text-purple-700 transition-colors">
                  <Home size={14} />
                  <span className="sr-only">Home</span>
                </Link>
              ) : (
                <Link 
                  to={bc.item} 
                  aria-current={isLast ? 'page' : undefined}
                  className={`transition-colors ${isLast ? 'text-purple-900 font-bold pointer-events-none' : 'text-slate-600 hover:text-purple-700'}`}
                >
                  {bc.name}
                </Link>
              )}
              {!isLast && <ChevronRight size={14} className="text-slate-400 shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
