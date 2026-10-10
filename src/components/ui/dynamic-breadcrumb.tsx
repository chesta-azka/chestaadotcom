'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export default function DynamicBreadcrumb() {
  const pathname = usePathname();

  // If homepage, do not render breadcrumbs
  if (pathname === '/' || !pathname) {
    return null;
  }

  const pathSegments = pathname.split('/').filter((segment) => segment.trim() !== '');

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSegments.length - 1;

    // Split dashes and capitalize first letter of each word
    const formattedLabel = segment
      .split('-')
      .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''))
      .join(' ');

    return {
      href,
      label: formattedLabel,
      isLast,
    };
  });

  return (
    <nav aria-label="Breadcrumb" className="w-full max-w-7xl mx-auto px-6 sm:px-8 pt-24 sm:pt-28 pb-3 relative z-20">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 font-medium">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="text-slate-500 hover:text-purple-600 transition-colors"
          >
            Beranda
          </Link>
        </li>

        {breadcrumbItems.map((item) => (
          <li key={item.href} className="inline-flex items-center gap-2">
            <ChevronRight size={14} className="text-slate-300 shrink-0" />
            {item.isLast ? (
              <span className="font-semibold text-purple-600 truncate max-w-[260px] sm:max-w-none" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-slate-500 hover:text-purple-600 transition-colors truncate max-w-[180px] sm:max-w-none"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
