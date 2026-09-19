'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Clock, MousePointer2, Percent, TrendingUp, BookOpen, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function PerformanceDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'content_performance'),
      orderBy('timestamp', 'desc'),
      limit(500)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const metrics = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(metrics);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const stats = useMemo(() => {
    if (data.length === 0) return null;

    const totalReads = data.length;
    const avgReadTime = data.reduce((acc, curr) => acc + (curr.readTimeSeconds || 0), 0) / totalReads;
    const avgScroll = data.reduce((acc, curr) => acc + (curr.scrollDepth || 0), 0) / totalReads;
    const bounceRate = (data.filter(d => d.isBounce).length / totalReads) * 100;

    // Group by slug
    const slugMetrics = data.reduce((acc: any, curr) => {
      if (!acc[curr.slug]) {
        acc[curr.slug] = { slug: curr.slug, reads: 0, totalTime: 0, totalScroll: 0, bounces: 0 };
      }
      acc[curr.slug].reads += 1;
      acc[curr.slug].totalTime += curr.readTimeSeconds || 0;
      acc[curr.slug].totalScroll += curr.scrollDepth || 0;
      if (curr.isBounce) acc[curr.slug].bounces += 1;
      return acc;
    }, {});

    const topArticles = Object.values(slugMetrics)
      .map((m: any) => ({
        ...m,
        avgTime: Math.round(m.totalTime / m.reads),
        avgScroll: Math.round(m.totalScroll / m.reads),
        bounceRate: Math.round((m.bounces / m.reads) * 100)
      }))
      .sort((a: any, b: any) => b.reads - a.reads)
      .slice(0, 10);

    return { totalReads, avgReadTime, avgScroll, bounceRate, topArticles };
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-8 text-center bg-white border border-slate-200 rounded-xl">
        <AlertCircle className="mx-auto h-12 w-12 text-slate-400 mb-4" />
        <h3 className="text-lg font-medium text-slate-900">Belum ada data performa</h3>
        <p className="text-slate-500">Data keterlibatan pengguna akan muncul di sini setelah artikel dibaca.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <BookOpen size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Total Read Sessions</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{stats.totalReads}</div>
          <div className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
            <TrendingUp size={12} /> +12% from last week
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Clock size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Avg. Read Time</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{Math.round(stats.avgReadTime)}s</div>
          <div className="mt-2 text-xs text-slate-400">Time spent per session</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <MousePointer2 size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Avg. Scroll Depth</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{Math.round(stats.avgScroll)}%</div>
          <div className="mt-2 text-xs text-slate-400">Vertical content reach</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <Percent size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Bounce Rate</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{Math.round(stats.bounceRate)}%</div>
          <div className="mt-2 text-xs text-slate-400">Sessions &lt; 15s or 25% scroll</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Article Popularity (Total Reads)</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.topArticles} layout="vertical" margin={{ left: 40, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="slug" 
                width={150} 
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="reads" fill="#6b21a8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Details Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Article Engagement Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Article Slug</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Reads</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Avg Time</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Avg Scroll</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Bounce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.topArticles.map((art: any) => (
                <tr key={art.slug} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 text-sm font-medium text-slate-900 font-mono truncate max-w-[200px]">{art.slug}</td>
                  <td className="px-8 py-4 text-sm text-slate-600 text-right">{art.reads}</td>
                  <td className="px-8 py-4 text-sm text-slate-600 text-right">{art.avgTime}s</td>
                  <td className="px-8 py-4 text-sm text-slate-600 text-right">{art.avgScroll}%</td>
                  <td className="px-8 py-4 text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      art.bounceRate > 50 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {art.bounceRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
