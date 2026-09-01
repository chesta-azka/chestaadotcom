import React, { Suspense } from 'react';
import { fetchMarketTrends } from '../actions/getMarketTrends';
import { Activity } from 'lucide-react';
import Markdown from 'react-markdown';

async function TrendsContent() {
  const trends = await fetchMarketTrends();
  return (
    <div className="markdown-body text-slate-700 text-sm leading-relaxed">
      <Markdown>{trends}</Markdown>
    </div>
  );
}

export function MarketTrends() {
  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-6 md:p-8 bg-white border border-purple-100 rounded-3xl shadow-xs font-sans">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-purple-50 rounded-xl text-purple-900">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-display font-bold tracking-tight text-slate-900">
            Tren Industri Terkini
          </h2>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-0.5">Analisis Otomatis & Riset Pasar</p>
        </div>
      </div>
      <Suspense fallback={
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-purple-50 rounded w-3/4"></div>
          <div className="h-4 bg-purple-50 rounded w-full"></div>
          <div className="h-4 bg-purple-50 rounded w-5/6"></div>
        </div>
      }>
        <TrendsContent />
      </Suspense>
    </div>
  );
}
