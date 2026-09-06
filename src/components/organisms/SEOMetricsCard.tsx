import React from 'react';
import { Activity, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

interface SEOMetricsCardProps {
  metrics?: {
    lcp: string;
    cls: string;
    tbt: string;
  };
}

export default function SEOMetricsCard({ metrics }: SEOMetricsCardProps) {
  const defaultMetrics = {
    lcp: metrics?.lcp || '0.8s',
    cls: metrics?.cls || '0.00',
    tbt: metrics?.tbt || '15ms',
  };

  const tableData = [
    { name: 'LCP (Load)', project: defaultMetrics.lcp, baseline: '2.5s', status: 'good' },
    { name: 'CLS (Visual)', project: defaultMetrics.cls, baseline: '0.10', status: 'good' },
    { name: 'TBT (Interactivity)', project: defaultMetrics.tbt, baseline: '200ms', status: 'good' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
          <Activity size={18} />
        </div>
        <div>
          <h4 className="font-display font-bold text-slate-900 text-sm">Core Web Vitals</h4>
          <span className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-widest">Performance comparison</span>
        </div>
      </div>

      <div className="w-full">
        {/* Table Header */}
        <div className="grid grid-cols-3 gap-4 border-b border-slate-100 pb-2 mb-3">
          <div className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-widest col-span-1">Metric</div>
          <div className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-widest text-right">Project</div>
          <div className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-widest text-right">Baseline</div>
        </div>

        {/* Table Body */}
        <div className="space-y-3">
          {tableData.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-center">
              <div className="text-xs font-sans font-medium text-slate-600 col-span-1">
                {item.name}
              </div>
              <div className="flex items-center justify-end gap-1.5 text-right">
                <span className="text-sm font-mono font-bold text-emerald-600">{item.project}</span>
              </div>
              <div className="text-xs font-mono font-medium text-slate-400 text-right">
                {item.baseline}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] font-sans font-medium text-slate-500 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Passing all assessments
        </span>
        <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
          <ArrowDown size={10} />
          <span>SUPERIOR</span>
        </div>
      </div>
    </div>
  );
}
