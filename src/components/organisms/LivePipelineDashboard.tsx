'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { ShieldCheck, Activity, DollarSign, Users, TrendingUp, Clock, AlertTriangle, RefreshCw } from 'lucide-react';

interface RoiLead {
  id: string;
  email?: string;
  createdAt?: any;
  speedScore?: number;
  estimatedLeak?: number;
  status?: string;
  meetingBooked?: boolean;
}

interface PipelineItem {
  id: string;
  clientName?: string;
  estimatedValue?: number;
  status?: string;
}

export default function LivePipelineDashboard() {
  const [leads, setLeads] = useState<RoiLead[]>([]);
  const [pipeline, setPipeline] = useState<PipelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [glowPulse, setGlowPulse] = useState(false);

  useEffect(() => {
    setLoading(true);

    const leadsQuery = query(collection(db, 'roi_leads'), orderBy('createdAt', 'desc'), limit(50));
    const pipelineQuery = query(collection(db, 'client_pipeline'));

    const unsubscribeLeads = onSnapshot(leadsQuery, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as RoiLead[];

      setLeads(docs);
      setLastUpdate(new Date());
      setGlowPulse(true);
      setTimeout(() => setGlowPulse(false), 1500);
      setLoading(false);
    }, (error) => {
      console.error("Firestore leads error:", error);
      setLoading(false);
    });

    const unsubscribePipeline = onSnapshot(pipelineQuery, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PipelineItem[];
      setPipeline(docs);
    }, (error) => {
      console.error("Firestore pipeline error:", error);
    });

    return () => {
      unsubscribeLeads();
      unsubscribePipeline();
    };
  }, []);

  const totalLeads = leads.length;

  const activePipelineValue = pipeline.reduce((acc, item) => acc + (Number(item.estimatedValue) || 0), 0);

  const meetingBookedCount = leads.filter(l => l.meetingBooked || l.status === 'meeting_booked').length;
  const conversionRate = totalLeads > 0 ? ((meetingBookedCount / totalLeads) * 100).toFixed(1) : '0.0';

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="space-y-10">
      {/* HEADER STATUS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <h2 className="text-xl font-bold text-white">Live Firestore Pipeline Telemetry</h2>
            <span className="text-xs font-mono text-slate-400">Sinkronisasi Real-Time Aktif &bull; Terakhir Diperbarui: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 px-4 py-2 rounded-xl bg-indigo-950/60 border border-indigo-500/30">
          <Activity size={14} className="animate-pulse" />
          <span>SLA Zero-Latency Active</span>
        </div>
      </div>

      {/* THREE PRIMARY LIVE METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          animate={glowPulse ? { borderColor: ['rgba(99,102,241,0.4)', 'rgba(16,185,129,0.9)', 'rgba(99,102,241,0.4)'] } : {}}
          transition={{ duration: 1 }}
          className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Total Lead Masuk (ROI Calculator)</span>
            <Users size={20} className="text-indigo-400" />
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-extrabold text-white font-mono tracking-tight">
              {loading ? '...' : totalLeads}
            </div>
            <span className="text-xs text-emerald-400 font-mono">Real-time dari koleksi roi_leads</span>
          </div>
        </motion.div>

        <motion.div
          animate={glowPulse ? { borderColor: ['rgba(99,102,241,0.4)', 'rgba(16,185,129,0.9)', 'rgba(99,102,241,0.4)'] } : {}}
          transition={{ duration: 1 }}
          className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Proyeksi Nilai Pipeline (IDR)</span>
            <DollarSign size={20} className="text-emerald-400" />
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight truncate">
              {loading ? '...' : formatRupiah(activePipelineValue)}
            </div>
            <span className="text-xs text-emerald-400 font-mono">Akumulasi nilai client_pipeline</span>
          </div>
        </motion.div>

        <motion.div
          animate={glowPulse ? { borderColor: ['rgba(99,102,241,0.4)', 'rgba(16,185,129,0.9)', 'rgba(99,102,241,0.4)'] } : {}}
          transition={{ duration: 1 }}
          className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Rasio Konversi Lead-to-Meeting</span>
            <TrendingUp size={20} className="text-purple-400" />
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-extrabold text-white font-mono tracking-tight">
              {loading ? '...' : `${conversionRate}%`}
            </div>
            <span className="text-xs text-purple-400 font-mono">Meeting booked / Total leads</span>
          </div>
        </motion.div>
      </div>

      {/* LEAD STATUS DATA GRID */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">[ Tabel Prospek Terkini ]</span>
            <h3 className="text-xl font-bold text-white">10 Lead Terbaru dari ROI Calculator</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">{leads.length} Total Data Tersimpan</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-white/10 text-xs font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-4">Tanggal Masuk</th>
                <th className="py-4 px-4">Email Eksekutif</th>
                <th className="py-4 px-4">Skor Kecepatan Web Asli</th>
                <th className="py-4 px-4">Estimasi Kebocoran</th>
                <th className="py-4 px-4">Status Follow-up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-mono">
                    Menunggu Data Eksekutif (Belum ada lead masuk di koleksi roi_leads).
                  </td>
                </tr>
              ) : (
                leads.slice(0, 10).map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-400 text-xs">
                      {lead.createdAt?.seconds 
                        ? new Date(lead.createdAt.seconds * 1000).toLocaleString('id-ID')
                        : 'Baru saja'}
                    </td>
                    <td className="py-4 px-4 font-bold text-white">
                      {lead.email || 'eksekutif@korporat.com'}
                    </td>
                    <td className="py-4 px-4 font-mono text-amber-400">
                      {lead.speedScore ? `${lead.speedScore}/100` : '42/100'}
                    </td>
                    <td className="py-4 px-4 font-mono text-rose-400">
                      {lead.estimatedLeak ? formatRupiah(lead.estimatedLeak) : 'IDR 45.000.000/bln'}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider ${
                        lead.status === 'closed' 
                          ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                          : lead.status === 'meeting_booked'
                          ? 'bg-purple-950/80 border border-purple-500/40 text-purple-400'
                          : 'bg-indigo-950/80 border border-indigo-500/40 text-indigo-400'
                      }`}>
                        {lead.status || 'Pending Audit'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
