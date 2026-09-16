import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbs } from '../../lib/seo';

export default function BreadcrumbNavigation() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs = [
    { name: 'Home', item: 'https://chestaa.com/' },
    ...pathnames.map((value, index) => {
      const last = index === pathnames.length - 1;
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const name = value
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return { 
        name, 
        item: `https://chestaa.com${to}` 
      };
    }),
  ];

  const schema = generateBreadcrumbs(breadcrumbs);

  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex items-center text-sm font-sans text-slate-500 overflow-x-auto whitespace-nowrap py-2 no-print">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol className="flex items-center gap-2 list-none p-0 m-0">
        <li className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1.5 text-slate-500 hover:text-purple-700 transition-colors">
            <Home size={14} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <ChevronRight size={14} className="text-slate-300 shrink-0" />
        </li>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const name = value
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return (
            <li key={to} className="flex items-center gap-2">
              {last ? (
                <span className="text-purple-900 font-bold" aria-current="page">
                  {name}
                </span>
              ) : (
                <>
                  <Link to={to} className="text-slate-500 hover:text-purple-700 transition-colors">
                    {name}
                  </Link>
                  <ChevronRight size={14} className="text-slate-300 shrink-0" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
