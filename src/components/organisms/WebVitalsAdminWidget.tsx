import React, { useEffect, useState } from 'react';
import { Activity, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function WebVitalsAdminWidget() {
  const [vitals, setVitals] = useState<any>(null);

  useEffect(() => {
    try {
      const data = localStorage.getItem('web-vitals-data');
      if (data) {
        setVitals(JSON.parse(data));
      }
    } catch (e) {}
  }, []);

  if (!vitals) return null;

  const metrics = ['LCP', 'CLS', 'INP', 'FCP', 'TTFB'];
  let hasWarnings = false;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <Activity size={18} className="text-purple-600" />
        <h3 className="font-display font-bold text-slate-900">Core Web Vitals Tracker</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {metrics.map(metric => {
          const data = vitals[metric];
          if (!data) return null;
          
          if (data.isPoor) hasWarnings = true;

          return (
            <div key={metric} className={`p-3 rounded-xl border ${data.isPoor ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-slate-600">{metric}</span>
                {data.isPoor ? <AlertCircle size={14} className="text-red-500" /> : <CheckCircle size={14} className="text-emerald-500" />}
              </div>
              <div className={`text-lg font-bold font-sans ${data.isPoor ? 'text-red-700' : 'text-slate-900'}`}>
                {typeof data.value === 'number' ? data.value.toFixed(2) : data.value}
                <span className="text-[10px] text-slate-500 font-normal ml-1">
                  {metric === 'CLS' ? '' : 'ms'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {hasWarnings && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3"
        >
          <Info size={16} className="text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm font-sans text-red-800">
            <strong>Peringatan SEO:</strong> Beberapa metrik Core Web Vitals melebihi ambang batas aman. Hal ini dapat menurunkan peringkat pencarian dan mengganggu AEO. Segera optimalkan aset (gambar, skrip) atau waktu respons server.
          </p>
        </motion.div>
      )}
    </div>
  );
}
