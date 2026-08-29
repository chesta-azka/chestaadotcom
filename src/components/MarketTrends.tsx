import React, { Suspense } from 'react';
import { fetchMarketTrends } from '../actions/getMarketTrends';
import { Activity } from 'lucide-react';
import Markdown from 'react-markdown';

async function TrendsContent() {
  const trends = await fetchMarketTrends();
  return (
    <div className="markdown-body text-slate-700 dark:text-slate-300">
      <Markdown>{trends}</Markdown>
    </div>
  );
}

export function MarketTrends() {
  return (
    <div className="w-full max-w-4xl mx-auto my-16 p-6 md:p-8 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
          <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Real-Time Live Market Trends
          </h2>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Powered by Google Search</p>
        </div>
      </div>
      <Suspense fallback={
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-5/6"></div>
        </div>
      }>
        <TrendsContent />
      </Suspense>
    </div>
  );
}
