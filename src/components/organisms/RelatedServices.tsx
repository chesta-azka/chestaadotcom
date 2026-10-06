import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';

interface RelatedServicesProps {
  currentSlug: string;
}

export default function RelatedServices({ currentSlug }: RelatedServicesProps) {
  // Filter out current service and grab other services
  const otherServices = Object.entries(SERVICES_DATA)
    .filter(([slug]) => slug !== currentSlug)
    .slice(0, 4);

  return (
    <div className="mt-16 pt-16 border-t border-slate-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest block mb-2">EXPLORE SOLUTIONS</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Solusi Digital Lainnya
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Optimalkan seluruh alur kerja bisnis Anda dengan arsitektur digital dan otomatisasi AI yang terintegrasi penuh.
          </p>
        </div>
        <Link 
          href="/services"
          className="group flex items-center gap-2 text-xs font-mono font-bold text-purple-600 uppercase tracking-widest hover:text-purple-800 transition-colors"
        >
          <span>Lihat Semua Layanan</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Horizontal Carousel / Grid */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent -mx-4 px-4 sm:mx-0 sm:px-0">
        {otherServices.map(([slug, service]) => {
          return (
            <div 
              key={slug} 
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] flex-shrink-0 flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-mono font-bold uppercase tracking-wider">
                  {service.category}
                </div>
                <h3 className="text-lg font-bold text-slate-900 line-clamp-2 min-h-[56px] leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {service.heroDescription}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link 
                  href={`/services/${slug}`}
                  className="text-xs font-mono font-bold text-purple-600 hover:text-purple-800 uppercase tracking-wider flex items-center gap-1.5 group/link"
                >
                  <span>Pelajari Solusi</span>
                  <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
