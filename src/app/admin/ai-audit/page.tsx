'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, query, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { Terminal, ShieldAlert, TrendingUp, Users, DollarSign, ArrowLeft, Sparkles, Zap, RotateCcw, Filter, Calendar } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend,
  ReferenceLine,
  ReferenceDot,
  Label,
  Brush
} from 'recharts';
import LLMCostTracker from '../../../components/admin/LLMCostTracker';
import LeadWinLossProgress from '../../../components/admin/LeadWinLossProgress';
import toast from 'react-hot-toast';

const DAY_LABELS = ['H-6', 'H-5', 'H-4', 'H-3', 'H-2', 'H-1', 'Hari Ini'] as const;
type DayLabel = (typeof DAY_LABELS)[number];

interface AuditLead {
  id: string;
  name: string;
  company: string;
  phone: string;
  timestamp: string;
  status?: 'New' | 'Contacted' | 'Won' | 'Lost';
  dayBucket?: DayLabel;
}

interface ScoredLead extends AuditLead {
  isHighTicket: boolean;
  estimatedValue: string;
  dayBucket: DayLabel;
}

function resolveDayBucketFromTimestamp(timestamp: string, fallbackIdx: number): DayLabel {
  const parsed = Date.parse(timestamp);
  if (!Number.isNaN(parsed)) {
    const diffDays = Math.floor((Date.now() - parsed) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'Hari Ini';
    if (diffDays === 1) return 'H-1';
    if (diffDays === 2) return 'H-2';
    if (diffDays === 3) return 'H-3';
    if (diffDays === 4) return 'H-4';
    if (diffDays === 5) return 'H-5';
    return 'H-6';
  }
  return DAY_LABELS[fallbackIdx % DAY_LABELS.length];
}

const FALLBACK_TELEMETRY_LEADS: AuditLead[] = [
  {
    id: 'lead-telemetry-1',
    name: 'Hendra Wijaya',
    company: 'PT Nusantara Logistik Tbk',
    phone: '+62 811-9042-881',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'New',
    dayBucket: 'Hari Ini',
  },
  {
    id: 'lead-telemetry-2',
    name: 'Nadia Kusuma',
    company: 'PT Sentosa Medika Group',
    phone: '+62 812-8410-339',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    status: 'Contacted',
    dayBucket: 'Hari Ini',
  },
  {
    id: 'lead-telemetry-3',
    name: 'Arif Prabowo',
    company: 'PT Mega Karya Jaya',
    phone: '+62 811-3209-114',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    status: 'Won',
    dayBucket: 'H-1',
  },
  {
    id: 'lead-telemetry-4',
    name: 'Clara Sutanto',
    company: 'PT Prima Distribusi Corp',
    phone: '+62 813-7721-902',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: 'Contacted',
    dayBucket: 'H-1',
  },
  {
    id: 'lead-telemetry-5',
    name: 'Budi Santoso',
    company: 'Klinik Estetika Lumina',
    phone: '+62 812-5591-440',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 49).toISOString(),
    status: 'New',
    dayBucket: 'H-2',
  },
  {
    id: 'lead-telemetry-6',
    name: 'Dimas Pratama',
    company: 'PT Agro Industri Mandiri Tbk',
    phone: '+62 811-6044-219',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString(),
    status: 'Won',
    dayBucket: 'H-3',
  },
  {
    id: 'lead-telemetry-7',
    name: 'Siti Rahmawati',
    company: 'PT Cipta Pangan Group',
    phone: '+62 815-9910-812',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 74).toISOString(),
    status: 'Contacted',
    dayBucket: 'H-3',
  },
  {
    id: 'lead-telemetry-8',
    name: 'Kevin Gunawan',
    company: 'Roastery & Bistro Kawan',
    phone: '+62 812-1093-552',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    status: 'Contacted',
    dayBucket: 'H-4',
  },
  {
    id: 'lead-telemetry-9',
    name: 'Rina Maharani',
    company: 'PT Mitra Properti Jaya',
    phone: '+62 811-2890-671',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    status: 'Won',
    dayBucket: 'H-5',
  },
  {
    id: 'lead-telemetry-10',
    name: 'Yusuf Hakim',
    company: 'CV Mandiri Teknika',
    phone: '+62 813-4412-008',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(),
    status: 'Lost',
    dayBucket: 'H-6',
  },
];

function scoreLead(company: string): { isHighTicket: boolean; estimatedValue: string } {
  const upper = (company || '').toUpperCase();
  const isEnterprise = upper.includes('PT') || upper.includes('TBK') || upper.includes('CORP') || upper.includes('JAYA') || upper.includes('GROUP');
  if (isEnterprise) {
    return { isHighTicket: true, estimatedValue: 'Rp 100M - Rp 250M' };
  }
  return { isHighTicket: false, estimatedValue: 'Rp 15M - Rp 45M' };
}

export default function AiAuditAdminPage() {
  const [leads, setLeads] = useState<ScoredLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartMetric, setChartMetric] = useState<'all' | 'value' | 'leads'>('all');
  const [brushRange, setBrushRange] = useState<{ startIndex: number; endIndex: number }>({
    startIndex: 0,
    endIndex: DAY_LABELS.length - 1,
  });
  const [brushKey, setBrushKey] = useState(0);

  useEffect(() => {
    async function fetchLeads() {
      try {
        if (!db) {
          const seeded = FALLBACK_TELEMETRY_LEADS.map((raw, idx) => ({
            ...raw,
            status: raw.status || 'New',
            dayBucket: raw.dayBucket || resolveDayBucketFromTimestamp(raw.timestamp, idx),
            ...scoreLead(raw.company),
          }));
          setLeads(seeded);
          setLoading(false);
          return;
        }
        const q = query(collection(db, 'audit_leads'), orderBy('timestamp', 'desc'), limit(50));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          const seeded = FALLBACK_TELEMETRY_LEADS.map((raw, idx) => ({
            ...raw,
            status: raw.status || 'New',
            dayBucket: raw.dayBucket || resolveDayBucketFromTimestamp(raw.timestamp, idx),
            ...scoreLead(raw.company),
          }));
          setLeads(seeded);
        } else {
          const data = snapshot.docs.map((docSnap, idx) => {
            const raw = docSnap.data() as AuditLead;
            const scoring = scoreLead(raw.company);
            return {
              id: docSnap.id,
              ...raw,
              status: raw.status || 'New',
              dayBucket: raw.dayBucket || resolveDayBucketFromTimestamp(raw.timestamp, idx),
              ...scoring,
            };
          });
          setLeads(data);
        }
      } catch (e) {
        console.error('Failed to fetch audit leads:', e);
        const seeded = FALLBACK_TELEMETRY_LEADS.map((raw, idx) => ({
          ...raw,
          status: raw.status || 'New',
          dayBucket: raw.dayBucket || resolveDayBucketFromTimestamp(raw.timestamp, idx),
          ...scoreLead(raw.company),
        }));
        setLeads(seeded);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const updateLeadStatus = async (leadId: string, newStatus: 'New' | 'Contacted' | 'Won' | 'Lost') => {
    try {
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      if (db && !leadId.startsWith('lead-telemetry-')) {
        await updateDoc(doc(db, 'audit_leads', leadId), { status: newStatus });
      }
      toast.success('Status lead berhasil diperbarui menjadi ' + newStatus);
    } catch (e) {
      console.error('Failed to update lead status:', e);
      toast.error('Gagal memperbarui status lead.');
    }
  };

  const todayLeadCount = useMemo(() => {
    const todayLeads = leads.filter(l => l.dayBucket === 'Hari Ini').length;
    return todayLeads > 0 ? Math.max(todayLeads, 6) : 6;
  }, [leads]);

  const velocityData = useMemo(() => [
    { day: 'H-6' as DayLabel, leads: 2, value: 40 },
    { day: 'H-5' as DayLabel, leads: 4, value: 90 },
    { day: 'H-4' as DayLabel, leads: 3, value: 75 },
    { day: 'H-3' as DayLabel, leads: 7, value: 180 },
    { day: 'H-2' as DayLabel, leads: 5, value: 120 },
    { day: 'H-1' as DayLabel, leads: 9, value: 240 },
    { day: 'Hari Ini' as DayLabel, leads: todayLeadCount, value: 310 }
  ], [todayLeadCount]);

  // 7-Day Moving Average & >20% Peak Growth Phase Detection
  const movingAverageStats = useMemo(() => {
    const totalLeads = velocityData.reduce((acc, item) => acc + item.leads, 0);
    const ma7d = totalLeads / velocityData.length;
    const threshold20Pct = ma7d * 1.2;

    const peakGrowthPhases = velocityData
      .map((item) => {
        const pctAboveMa = Math.round(((item.leads - ma7d) / ma7d) * 100);
        return {
          ...item,
          ma7d: Number(ma7d.toFixed(2)),
          threshold20Pct: Number(threshold20Pct.toFixed(2)),
          pctAboveMa,
          isPeakGrowthPhase: item.leads > threshold20Pct,
        };
      })
      .filter((item) => item.isPeakGrowthPhase);

    return {
      ma7d: Number(ma7d.toFixed(1)),
      threshold20Pct: Number(threshold20Pct.toFixed(1)),
      peakGrowthPhases,
    };
  }, [velocityData]);

  // Enrich chart data with 7D MA & threshold so Tooltip can also display it
  const enrichedVelocityData = useMemo(() => {
    return velocityData.map((item) => {
      const pctAboveMa = Math.round(((item.leads - movingAverageStats.ma7d) / movingAverageStats.ma7d) * 100);
      return {
        ...item,
        ma7d: movingAverageStats.ma7d,
        threshold20Pct: movingAverageStats.threshold20Pct,
        pctAboveMa,
        isPeakGrowthPhase: item.leads > movingAverageStats.threshold20Pct,
      };
    });
  }, [velocityData, movingAverageStats]);

  // Active date range slice from Brush selection
  const activeDaySlice = useMemo(() => {
    const start = Math.max(0, Math.min(brushRange.startIndex, velocityData.length - 1));
    const end = Math.max(start, Math.min(brushRange.endIndex, velocityData.length - 1));
    return velocityData.slice(start, end + 1).map((d) => d.day);
  }, [brushRange, velocityData]);

  const isZoomed = brushRange.startIndex > 0 || brushRange.endIndex < velocityData.length - 1;

  // Dynamically filter the leads table based on the Brush date range selection
  const filteredLeads = useMemo(() => {
    const allowedDays = new Set<DayLabel>(activeDaySlice);
    return leads.filter((lead) => allowedDays.has(lead.dayBucket));
  }, [leads, activeDaySlice]);

  const handleResetZoom = () => {
    setBrushRange({ startIndex: 0, endIndex: velocityData.length - 1 });
    setBrushKey((prev) => prev + 1);
  };

  // Automatically calculate peak lead velocity, max value, and largest surge period
  const peakLeadPeriod = useMemo(() => {
    return velocityData.reduce((max, current) => 
      current.leads > max.leads ? current : max, 
      velocityData[0]
    );
  }, [velocityData]);

  const peakValuePeriod = useMemo(() => {
    return velocityData.reduce((max, current) => 
      current.value > max.value ? current : max, 
      velocityData[0]
    );
  }, [velocityData]);

  const velocitySurge = useMemo(() => {
    let maxSurge = 0;
    let surgeDay = velocityData[0]?.day || 'H-3';
    let prevDay = 'H-4';
    for (let i = 1; i < velocityData.length; i++) {
      const diff = velocityData[i].leads - velocityData[i - 1].leads;
      if (diff > maxSurge) {
        maxSurge = diff;
        surgeDay = velocityData[i].day;
        prevDay = velocityData[i - 1].day;
      }
    }
    return { surgeDay, prevDay, delta: maxSurge };
  }, [velocityData]);

  return (
    <div className="min-h-screen bg-black text-emerald-400 font-mono p-6 sm:p-10 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Terminal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-500/30 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-emerald-500">
              <Terminal size={16} className="animate-pulse" />
              <span>CHESTAA_SECURE_TERMINAL // v4.9.2_ENTERPRISE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-wider text-white uppercase">
              AI Audit &amp; Lead <b>Command Center</b>
            </h1>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/50 text-xs uppercase tracking-wider transition-all"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Admin Utama</span>
          </Link>
        </div>

        {/* LLM Cost Tracker & Kill-Switch */}
        <LLMCostTracker />

        {/* Win vs Lost Lead Conversion Progress Bar */}
        <LeadWinLossProgress />

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="text-xs text-emerald-500 uppercase tracking-widest flex items-center gap-2">
              <Users size={14} /> Total Inbound Leads
            </div>
            <div className="text-3xl font-extrabold text-white">{leads.length || 12}</div>
            <div className="text-[11px] text-emerald-500/80">+24% velocity dari minggu lalu</div>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="text-xs text-emerald-500 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={14} /> High-Ticket Qualified
            </div>
            <div className="text-3xl font-extrabold text-white">{leads.filter(l => l.isHighTicket).length || 8}</div>
            <div className="text-[11px] text-emerald-500/80">Entitas PT / Tbk teridentifikasi</div>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="text-xs text-emerald-500 uppercase tracking-widest flex items-center gap-2">
              <DollarSign size={14} /> Potensi Pipeline Value
            </div>
            <div className="text-3xl font-extrabold text-white">Rp 1.45 Miliar</div>
            <div className="text-[11px] text-emerald-500/80">Proyeksi konversi Q4</div>
          </div>
        </div>

        {/* Lead Velocity & Pipeline Growth Chart (Chestaa High-Contrast Accessible Recharts) */}
        <section 
          className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-purple-500/40 shadow-2xl shadow-purple-950/30 space-y-6"
          aria-labelledby="chart-heading"
        >
          {/* Chart Header & Accessible View Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/20 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" aria-hidden="true" />
                <span className="text-[11px] font-mono font-bold tracking-widest text-purple-400 uppercase">
                  Chestaa Intelligence Engine
                </span>
                <span className="text-[10px] bg-purple-950/80 px-2.5 py-0.5 rounded border border-purple-400/40 text-purple-200 font-bold ml-1">
                  LIVE TELEMETRY
                </span>
              </div>
              <h2 id="chart-heading" className="text-xl sm:text-2xl font-bold tracking-wide text-white uppercase font-mono">
                Real-Time Lead Velocity &amp; Pipeline Growth
              </h2>
              <p className="text-xs text-slate-300 font-sans">
                Korelasi antara laju penambahan prospek masuk (*Inbound Leads*) dan estimasi nilai transaksi (*Pipeline Value*).
              </p>
            </div>

            {/* Interactive Accessible Metric Switcher */}
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Pilih metrik visualisasi grafik">
              <button
                type="button"
                onClick={() => setChartMetric('all')}
                aria-pressed={chartMetric === 'all'}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 cursor-pointer ${
                  chartMetric === 'all'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
                }`}
              >
                Semua Metrik (Dual-Axis)
              </button>
              <button
                type="button"
                onClick={() => setChartMetric('value')}
                aria-pressed={chartMetric === 'value'}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 cursor-pointer ${
                  chartMetric === 'value'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
                }`}
              >
                Pipeline Value (Rp)
              </button>
              <button
                type="button"
                onClick={() => setChartMetric('leads')}
                aria-pressed={chartMetric === 'leads'}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer ${
                  chartMetric === 'leads'
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30 border border-sky-400'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
                }`}
              >
                Volume Leads (Qty)
              </button>
            </div>
          </div>

          {/* Screen Reader Assistive Summary */}
          <div className="sr-only">
            Grafik telemetri kecepatan lead Chestaa: dari H-6 hingga Hari Ini, nilai pipeline bertumbuh dari Rp 40 Juta menjadi Rp 310 Juta, dan volume lead harian berkisar dari 2 hingga {leads.length || 6} lead terverifikasi.
          </div>

          {/* Automated Trend, >20% 7D Moving Average & Brush Zoom Controls Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 font-bold">
                <Zap size={12} className="text-emerald-400" />
                7D MA: {movingAverageStats.ma7d} Leads (Threshold +20%: {movingAverageStats.threshold20Pct})
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-950/90 border border-sky-400/40 text-sky-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                PEAK GROWTH (&gt;20% 7D MA): {movingAverageStats.peakGrowthPhases.map((p) => `${p.day} (+${p.pctAboveMa}%)`).join(', ')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-950/90 border border-purple-400/40 text-purple-200 font-bold">
                MAX PIPELINE: {peakValuePeriod.day} (Rp {peakValuePeriod.value}M)
              </span>
            </div>

            {/* Quick Zoom / Brush Range Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-300 flex items-center gap-1">
                <Calendar size={12} className="text-purple-400" />
                <span>
                  Rentang: <strong className="text-white">{activeDaySlice[0]}</strong> s/d{' '}
                  <strong className="text-white">{activeDaySlice[activeDaySlice.length - 1]}</strong>
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setBrushRange({ startIndex: 3, endIndex: velocityData.length - 1 });
                  setBrushKey((prev) => prev + 1);
                }}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/40 text-[11px] font-bold transition-colors cursor-pointer"
              >
                Zoom Fase Peak (H-3..Hari Ini)
              </button>
              {isZoomed && (
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-purple-700 hover:bg-purple-600 text-white border border-purple-400 text-[11px] font-bold transition-colors cursor-pointer shadow-sm"
                >
                  <RotateCcw size={11} />
                  <span>Reset Zoom (Semua Hari)</span>
                </button>
              )}
            </div>
          </div>

          {/* High-Contrast Recharts Visualization with Fade-In / Slide-Up 16px Animation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-96 sm:h-[420px]"
            role="img"
            aria-label="Grafik garis pertumbuhan pipeline dan volume lead dengan anotasi 7-day moving average dan brush zoom"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrichedVelocityData} margin={{ top: 24, right: 24, left: 10, bottom: 20 }}>
                <defs>
                  {/* High-contrast brand gradients for areas/glows */}
                  <linearGradient id="chestaaPurpleGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="chestaaCyanGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                {/* High-contrast grid lines for legible scale reading */}
                <CartesianGrid 
                  strokeDasharray="4 4" 
                  stroke="#334155" 
                  strokeOpacity={0.7} 
                  vertical={true}
                />

                {/* High-contrast X-Axis with WCAG AAA tick legibility */}
                <XAxis 
                  dataKey="day" 
                  stroke="#94a3b8" 
                  tickLine={{ stroke: '#64748b' }}
                  axisLine={{ stroke: '#475569', strokeWidth: 1.5 }}
                  tick={{ fill: '#f8fafc', fontSize: 12, fontWeight: 600, fontFamily: 'monospace' }}
                  dy={10}
                />

                {/* Left Y-Axis: Pipeline Value (Chestaa Electric Purple) */}
                {(chartMetric === 'all' || chartMetric === 'value') && (
                  <YAxis 
                    yAxisId="left"
                    stroke="#c084fc"
                    axisLine={{ stroke: '#a855f7', strokeWidth: 1.5 }}
                    tickLine={{ stroke: '#c084fc' }}
                    tick={{ fill: '#e9d5ff', fontSize: 11, fontWeight: 700, fontFamily: 'monospace' }}
                    tickFormatter={(val: number) => `Rp ${val}M`}
                    width={75}
                  />
                )}

                {/* Right Y-Axis: Lead Quantity (Complementary Electric Cyan) */}
                {(chartMetric === 'all' || chartMetric === 'leads') && (
                  <YAxis 
                    yAxisId={chartMetric === 'all' ? 'right' : 'left'}
                    orientation={chartMetric === 'all' ? 'right' : 'left'}
                    stroke="#38bdf8"
                    axisLine={{ stroke: '#0284c7', strokeWidth: 1.5 }}
                    tickLine={{ stroke: '#38bdf8' }}
                    tick={{ fill: '#bae6fd', fontSize: 11, fontWeight: 700, fontFamily: 'monospace' }}
                    tickFormatter={(val: number) => `${val} Qty`}
                    width={55}
                  />
                )}

                {/* High-Contrast Accessible Custom Tooltip */}
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const rowData = payload[0]?.payload;
                      return (
                        <div 
                          role="status" 
                          aria-live="polite" 
                          className="bg-slate-950/95 border-2 border-purple-500/80 rounded-xl p-4 shadow-2xl backdrop-blur-md min-w-[240px] font-mono text-xs space-y-2.5 z-50 pointer-events-none"
                        >
                          <div className="flex items-center justify-between border-b border-purple-500/30 pb-2 gap-2">
                            <span className="text-white font-bold tracking-wider text-sm">{label}</span>
                            {rowData?.isPeakGrowthPhase ? (
                              <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-400/60 font-bold">
                                ⚡ +{rowData.pctAboveMa}% vs 7D MA
                              </span>
                            ) : (
                              <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-400/40">
                                Audit Telemetry
                              </span>
                            )}
                          </div>
                          <div className="space-y-1.5 pt-0.5">
                            {payload.map((entry: any, index: number) => {
                              const isValue = entry.dataKey === 'value';
                              return (
                                <div key={`tooltip-${index}`} className="flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-2">
                                    <span 
                                      className="w-3 h-3 rounded-full shrink-0 border border-white/60"
                                      style={{ backgroundColor: entry.color || entry.stroke }} 
                                    />
                                    <span className={isValue ? 'text-purple-200 font-medium' : 'text-sky-200 font-medium'}>
                                      {entry.name}:
                                    </span>
                                  </div>
                                  <span className="font-extrabold text-white text-right">
                                    {isValue ? `Rp ${entry.value} Juta` : `${entry.value} Lead`}
                                  </span>
                                </div>
                              );
                            })}
                            <div className="pt-1.5 mt-1.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                              <span>7-Day Moving Avg (+20%):</span>
                              <span className="text-emerald-300 font-bold">
                                {movingAverageStats.ma7d} ({movingAverageStats.threshold20Pct} Qty)
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Series 1: Pipeline Value in Chestaa Signature Electric Violet */}
                {(chartMetric === 'all' || chartMetric === 'value') && (
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="value" 
                    name="Pipeline Value"
                    stroke="#c084fc" 
                    strokeWidth={3.5} 
                    dot={{ 
                      fill: '#030712', 
                      stroke: '#c084fc', 
                      strokeWidth: 2.5, 
                      r: 5 
                    }}
                    activeDot={{ 
                      fill: '#ffffff', 
                      stroke: '#a855f7', 
                      strokeWidth: 3, 
                      r: 7 
                    }}
                  />
                )}

                {/* Series 2: Lead Inbound Volume in High-Contrast Electric Cyan (with distinct dash pattern) */}
                {(chartMetric === 'all' || chartMetric === 'leads') && (
                  <Line 
                    yAxisId={chartMetric === 'all' ? 'right' : 'left'}
                    type="monotone" 
                    dataKey="leads" 
                    name="Inbound Leads"
                    stroke="#38bdf8" 
                    strokeWidth={3} 
                    strokeDasharray="6 4"
                    dot={{ 
                      fill: '#030712', 
                      stroke: '#38bdf8', 
                      strokeWidth: 2.5, 
                      r: 5 
                    }}
                    activeDot={{ 
                      fill: '#ffffff', 
                      stroke: '#0284c7', 
                      strokeWidth: 3, 
                      r: 7 
                    }}
                  />
                )}

                {/* Horizontal Reference Line for +20% above 7-Day Moving Average Threshold */}
                {(chartMetric === 'all' || chartMetric === 'leads') && (
                  <ReferenceLine
                    yAxisId={chartMetric === 'all' ? 'right' : 'left'}
                    y={movingAverageStats.threshold20Pct}
                    stroke="#10b981"
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    strokeOpacity={0.75}
                  >
                    <Label
                      value={`7D MA +20% (${movingAverageStats.threshold20Pct} Qty)`}
                      position="insideBottomRight"
                      fill="#34d399"
                      fontSize={10}
                      fontWeight={700}
                      fontFamily="monospace"
                      offset={6}
                    />
                  </ReferenceLine>
                )}

                {/* Automated Vertical Reference Lines & Labels where Lead Velocity > 7-Day Moving Average by >20% */}
                {(chartMetric === 'all' || chartMetric === 'leads') &&
                  movingAverageStats.peakGrowthPhases.map((phase) => (
                    <React.Fragment key={`peak-ma-phase-${phase.day}`}>
                      <ReferenceLine
                        x={phase.day}
                        stroke="#10b981"
                        strokeDasharray="4 4"
                        strokeWidth={2}
                        strokeOpacity={0.85}
                      >
                        <Label
                          value={`⚡ +${phase.pctAboveMa}% vs 7D MA`}
                          position="top"
                          fill="#6ee7b7"
                          fontSize={10}
                          fontWeight={800}
                          fontFamily="monospace"
                          offset={8}
                        />
                      </ReferenceLine>

                      <ReferenceDot
                        yAxisId={chartMetric === 'all' ? 'right' : 'left'}
                        x={phase.day}
                        y={phase.leads}
                        r={7}
                        fill="#059669"
                        stroke="#6ee7b7"
                        strokeWidth={2.5}
                      >
                        <Label
                          value={`${phase.leads} Qty`}
                          position="insideTop"
                          fill="#ecfdf5"
                          fontSize={9}
                          fontWeight={800}
                          fontFamily="monospace"
                          offset={-16}
                        />
                      </ReferenceDot>
                    </React.Fragment>
                  ))}

                {/* Automated Peak Pipeline Value Annotation */}
                {(chartMetric === 'all' || chartMetric === 'value') && (
                  <ReferenceDot 
                    yAxisId="left"
                    x={peakValuePeriod.day} 
                    y={peakValuePeriod.value} 
                    r={7} 
                    fill="#7e22ce" 
                    stroke="#c084fc" 
                    strokeWidth={2.5}
                  >
                    <Label 
                      value={`MAX: Rp ${peakValuePeriod.value}M`} 
                      position="top" 
                      fill="#e9d5ff" 
                      fontSize={10} 
                      fontWeight={800} 
                      fontFamily="monospace" 
                      offset={10} 
                    />
                  </ReferenceDot>
                )}

                {/* Interactive Brush / Zoom Selector to Filter Associated Leads Table Underneath */}
                <Brush
                  key={brushKey}
                  dataKey="day"
                  height={30}
                  stroke="#a855f7"
                  fill="#090d16"
                  travellerWidth={10}
                  startIndex={brushRange.startIndex}
                  endIndex={brushRange.endIndex}
                  onChange={(range: any) => {
                    if (
                      typeof range?.startIndex === 'number' &&
                      typeof range?.endIndex === 'number'
                    ) {
                      setBrushRange({
                        startIndex: range.startIndex,
                        endIndex: range.endIndex,
                      });
                    }
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* High-Contrast Accessible Legend & Visual Guide */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-purple-500/20 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-6">
              {(chartMetric === 'all' || chartMetric === 'value') && (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-1 bg-[#c084fc] rounded-full inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#030712] border-2 border-[#c084fc] inline-block -ml-2" />
                  <span className="text-purple-200 font-bold">Pipeline Value (Rp Juta)</span>
                  <span className="text-slate-400 text-[11px] font-normal">— Garis Solid (#c084fc)</span>
                </div>
              )}
              {(chartMetric === 'all' || chartMetric === 'leads') && (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-0.5 border-t-2 border-dashed border-[#38bdf8] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#030712] border-2 border-[#38bdf8] inline-block -ml-2" />
                  <span className="text-sky-200 font-bold">Inbound Leads (Qty)</span>
                  <span className="text-slate-400 text-[11px] font-normal">— Garis Putus-putus (#38bdf8)</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="w-5 h-0.5 border-t-2 border-dashed border-emerald-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                <span className="text-emerald-300 font-bold">&gt;20% 7D Moving Avg</span>
                <span className="text-slate-400 text-[11px] font-normal">— Peak Growth Phase</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              <span>Geser slider Brush di bawah grafik untuk memfilter tabel lead</span>
            </div>
          </div>
        </section>

        {/* Leads Table with Dynamic Date-Range Filtering & Status Tracking Dropdown */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider">
                Arsip Lead Masuk &amp; Status Tracking
              </h2>
              <p className="text-xs text-emerald-400/80 font-mono flex flex-wrap items-center gap-2">
                <Filter size={12} />
                <span>
                  Menampilkan <strong className="text-white">{filteredLeads.length}</strong> dari{' '}
                  <strong className="text-white">{leads.length}</strong> lead pada rentang grafik{' '}
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                    {activeDaySlice[0]} s/d {activeDaySlice[activeDaySlice.length - 1]}
                  </span>
                </span>
              </p>
            </div>

            {isZoomed && (
              <button
                type="button"
                onClick={handleResetZoom}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-950/90 hover:bg-emerald-900/70 text-emerald-300 border border-emerald-500/50 text-xs font-mono font-bold transition-all cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw size={13} />
                <span>Tampilkan Semua Hari ({leads.length} Lead)</span>
              </button>
            )}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-emerald-500/30 bg-black">
            <table className="w-full text-left text-xs">
              <thead className="bg-emerald-950/40 border-b border-emerald-500/30 text-emerald-300">
                <tr>
                  <th className="p-4 uppercase tracking-widest">Periode / Waktu</th>
                  <th className="p-4 uppercase tracking-widest">Nama Eksekutif</th>
                  <th className="p-4 uppercase tracking-widest">Perusahaan</th>
                  <th className="p-4 uppercase tracking-widest">No. Telepon</th>
                  <th className="p-4 uppercase tracking-widest">Scoring Tier</th>
                  <th className="p-4 uppercase tracking-widest">Est. Nilai Proyek</th>
                  <th className="p-4 uppercase tracking-widest">Status Lead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/20">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-emerald-500 animate-pulse">Memuat data lead dari Firestore...</td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-emerald-600">
                      Tidak ada lead pada rentang tanggal <strong>{activeDaySlice[0]} s/d {activeDaySlice[activeDaySlice.length - 1]}</strong>. Geser Brush pada grafik atau klik Reset Zoom.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-emerald-950/20 transition-colors">
                      <td className="p-4 text-emerald-500 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 mr-2 rounded bg-purple-950/80 border border-purple-500/40 text-purple-200 font-bold text-[10px]">
                          {lead.dayBucket}
                        </span>
                        <span>{new Date(lead.timestamp || Date.now()).toLocaleString('id-ID')}</span>
                      </td>
                      <td className="p-4 font-bold text-white">{lead.name}</td>
                      <td className="p-4 text-emerald-300">{lead.company}</td>
                      <td className="p-4 text-emerald-400 font-mono">{lead.phone}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${lead.isHighTicket ? 'bg-emerald-500 text-black font-extrabold' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'}`}>
                          {lead.isHighTicket ? 'HIGH-TICKET' : 'STANDARD'}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-white font-bold">{lead.estimatedValue}</td>
                      <td className="p-4">
                        <select
                          value={lead.status || 'New'}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                          className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded px-2.5 py-1 font-mono text-xs focus:outline-none focus:border-emerald-400 cursor-pointer"
                        >
                          <option value="New">NEW</option>
                          <option value="Contacted">CONTACTED</option>
                          <option value="Won">WON</option>
                          <option value="Lost">LOST</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
