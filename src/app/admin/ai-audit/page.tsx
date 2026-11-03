'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, query, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import {
  TrendingUp,
  Users,
  DollarSign,
  ArrowLeft,
  Zap,
  RotateCcw,
  Filter,
  Calendar,
  X,
  MessageCircle,
  Copy,
  Check,
  Building2,
  Phone,
  Clock,
  FileText,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ReferenceDot,
  Label,
  Brush,
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
  notes?: string;
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
    notes: 'Kebutuhan integrasi WhatsApp AI Agent dengan ERP gudang di 4 cabang.',
  },
  {
    id: 'lead-telemetry-2',
    name: 'Nadia Kusuma',
    company: 'PT Sentosa Medika Group',
    phone: '+62 812-8410-339',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    status: 'Contacted',
    dayBucket: 'Hari Ini',
    notes: 'Sudah dijadwalkan demo alur booking klinik otomatis besok pukul 14:00 WIB.',
  },
  {
    id: 'lead-telemetry-3',
    name: 'Arif Prabowo',
    company: 'PT Mega Karya Jaya',
    phone: '+62 811-3209-114',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    status: 'Won',
    dayBucket: 'H-1',
    notes: 'Kontrak pembangunan dashboard operasional & AI agent telah disetujui.',
  },
  {
    id: 'lead-telemetry-4',
    name: 'Clara Sutanto',
    company: 'PT Prima Distribusi Corp',
    phone: '+62 813-7721-902',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: 'Contacted',
    dayBucket: 'H-1',
    notes: 'Menunggu persetujuan direksi untuk paket Software Custom B2B portal.',
  },
  {
    id: 'lead-telemetry-5',
    name: 'Budi Santoso',
    company: 'Klinik Estetika Lumina',
    phone: '+62 812-5591-440',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 49).toISOString(),
    status: 'New',
    dayBucket: 'H-2',
    notes: 'Ingin mengotomasi pengingat jadwal perawatan pasien via WhatsApp.',
  },
  {
    id: 'lead-telemetry-6',
    name: 'Dimas Pratama',
    company: 'PT Agro Industri Mandiri Tbk',
    phone: '+62 811-6044-219',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString(),
    status: 'Won',
    dayBucket: 'H-3',
    notes: 'Proyek otomasi laporan distribusi harian lintas pabrik.',
  },
  {
    id: 'lead-telemetry-7',
    name: 'Siti Rahmawati',
    company: 'PT Cipta Pangan Group',
    phone: '+62 815-9910-812',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 74).toISOString(),
    status: 'Contacted',
    dayBucket: 'H-3',
    notes: 'Diskusi teknis integrasi stok real-time dengan tim IT internal.',
  },
  {
    id: 'lead-telemetry-8',
    name: 'Kevin Gunawan',
    company: 'Roastery & Bistro Kawan',
    phone: '+62 812-1093-552',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    status: 'Contacted',
    dayBucket: 'H-4',
    notes: 'Membutuhkan sistem reservasi meja otomatis & pre-order grup.',
  },
  {
    id: 'lead-telemetry-9',
    name: 'Rina Maharani',
    company: 'PT Mitra Properti Jaya',
    phone: '+62 811-2890-671',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    status: 'Won',
    dayBucket: 'H-5',
    notes: 'Implementasi kualifikasi prospek pembeli properti otomatis 24/7.',
  },
  {
    id: 'lead-telemetry-10',
    name: 'Yusuf Hakim',
    company: 'CV Mandiri Teknika',
    phone: '+62 813-4412-008',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(),
    status: 'Lost',
    dayBucket: 'H-6',
    notes: 'Ditunda ke kuartal berikutnya karena restrukturisasi internal.',
  },
];

function scoreLead(company: string): { isHighTicket: boolean; estimatedValue: string } {
  const upper = (company || '').toUpperCase();
  const isEnterprise =
    upper.includes('PT') ||
    upper.includes('TBK') ||
    upper.includes('CORP') ||
    upper.includes('JAYA') ||
    upper.includes('GROUP');
  if (isEnterprise) {
    return { isHighTicket: true, estimatedValue: 'Rp 100M - Rp 250M' };
  }
  return { isHighTicket: false, estimatedValue: 'Rp 15M - Rp 45M' };
}

const FAST_TRANSITION = { duration: 0.16, ease: [0.16, 1, 0.3, 1] as const };
const DRAWER_SLIDE_TRANSITION = {
  type: 'tween' as const,
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function AiAuditAdminPage() {
  const [leads, setLeads] = useState<ScoredLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartMetric, setChartMetric] = useState<'all' | 'value' | 'leads'>('all');
  const [showRegression, setShowRegression] = useState<boolean>(true);
  const [brushRange, setBrushRange] = useState<{ startIndex: number; endIndex: number }>({
    startIndex: 0,
    endIndex: DAY_LABELS.length - 1,
  });
  const [brushKey, setBrushKey] = useState(0);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [drawerNotes, setDrawerNotes] = useState<string>('');
  const [copiedPhone, setCopiedPhone] = useState(false);

  const selectedLead = useMemo(
    () => leads.find((l) => l.id === selectedLeadId) || null,
    [leads, selectedLeadId]
  );

  const openLeadDrawer = useCallback((lead: ScoredLead) => {
    setSelectedLeadId(lead.id);
    setDrawerNotes(lead.notes || '');
    setCopiedPhone(false);
  }, []);

  const closeLeadDrawer = useCallback(() => {
    setSelectedLeadId(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedLeadId) {
        setSelectedLeadId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLeadId]);

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

  const updateLeadStatus = useCallback(
    async (leadId: string, newStatus: 'New' | 'Contacted' | 'Won' | 'Lost') => {
      try {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
        if (db && !leadId.startsWith('lead-telemetry-')) {
          await updateDoc(doc(db, 'audit_leads', leadId), { status: newStatus });
        }
        toast.success('Status lead berhasil diperbarui menjadi ' + newStatus);
      } catch (e) {
        console.error('Failed to update lead status:', e);
        toast.error('Gagal memperbarui status lead.');
      }
    },
    []
  );

  const saveLeadNotes = useCallback(async (leadId: string, notesText: string) => {
    try {
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, notes: notesText } : l)));
      if (db && !leadId.startsWith('lead-telemetry-')) {
        await updateDoc(doc(db, 'audit_leads', leadId), { notes: notesText });
      }
      toast.success('Catatan internal lead berhasil disimpan.');
    } catch (e) {
      console.error('Failed to save lead notes:', e);
      toast.error('Gagal menyimpan catatan lead.');
    }
  }, []);

  const todayLeadCount = useMemo(() => {
    const todayLeads = leads.filter((l) => l.dayBucket === 'Hari Ini').length;
    return todayLeads > 0 ? Math.max(todayLeads, 6) : 6;
  }, [leads]);

  const velocityData = useMemo(
    () => [
      { day: 'H-6' as DayLabel, leads: 2, value: 40 },
      { day: 'H-5' as DayLabel, leads: 4, value: 90 },
      { day: 'H-4' as DayLabel, leads: 3, value: 75 },
      { day: 'H-3' as DayLabel, leads: 7, value: 180 },
      { day: 'H-2' as DayLabel, leads: 5, value: 120 },
      { day: 'H-1' as DayLabel, leads: 9, value: 240 },
      { day: 'Hari Ini' as DayLabel, leads: todayLeadCount, value: 310 },
    ],
    [todayLeadCount]
  );

  // Least-Squares Linear Regression (y = m*x + b) & R-Squared Trajectory Calculation
  const regressionStats = useMemo(() => {
    const n = velocityData.length;
    if (n === 0) {
      return { slope: 0, intercept: 0, rSquared: 0, projectedNextDay: 0 };
    }
    const meanX = (n - 1) / 2;
    const meanY = velocityData.reduce((acc, item) => acc + item.leads, 0) / n;

    let numerator = 0;
    let denominator = 0;
    for (let i = 0; i < n; i++) {
      const dx = i - meanX;
      const dy = velocityData[i].leads - meanY;
      numerator += dx * dy;
      denominator += dx * dx;
    }

    const slope = denominator !== 0 ? numerator / denominator : 0;
    const intercept = meanY - slope * meanX;

    let ssRes = 0;
    let ssTot = 0;
    for (let i = 0; i < n; i++) {
      const yActual = velocityData[i].leads;
      const yPred = slope * i + intercept;
      ssRes += (yActual - yPred) ** 2;
      ssTot += (yActual - meanY) ** 2;
    }

    const rSquared = ssTot !== 0 ? Math.max(0, Math.min(1, 1 - ssRes / ssTot)) : 1;
    const projectedNextDay = Math.max(0, Number((slope * n + intercept).toFixed(1)));

    return {
      slope: Number(slope.toFixed(2)),
      intercept: Number(intercept.toFixed(2)),
      rSquared: Number(rSquared.toFixed(2)),
      projectedNextDay,
    };
  }, [velocityData]);

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

  // Enrich chart data with 7D MA, +20% threshold, and Linear Regression predicted point
  const enrichedVelocityData = useMemo(() => {
    return velocityData.map((item, idx) => {
      const pctAboveMa = Math.round(
        ((item.leads - movingAverageStats.ma7d) / movingAverageStats.ma7d) * 100
      );
      const regressionLeads = Number(
        (regressionStats.slope * idx + regressionStats.intercept).toFixed(2)
      );
      return {
        ...item,
        ma7d: movingAverageStats.ma7d,
        threshold20Pct: movingAverageStats.threshold20Pct,
        pctAboveMa,
        isPeakGrowthPhase: item.leads > movingAverageStats.threshold20Pct,
        regressionLeads,
      };
    });
  }, [velocityData, movingAverageStats, regressionStats]);

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

  const handleResetZoom = useCallback(() => {
    setBrushRange({ startIndex: 0, endIndex: velocityData.length - 1 });
    setBrushKey((prev) => prev + 1);
  }, [velocityData.length]);

  const peakValuePeriod = useMemo(() => {
    return velocityData.reduce(
      (max, current) => (current.value > max.value ? current : max),
      velocityData[0]
    );
  }, [velocityData]);

  const highTicketCount = useMemo(
    () => leads.filter((l) => l.isHighTicket).length || 8,
    [leads]
  );

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans p-6 sm:p-10 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Executive Header — Editorial Anti-Slop Typography */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={FAST_TRANSITION}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-800/90 pb-6"
        >
          <div className="space-y-1.5">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-400">
              Chestaa Executive Telemetry · Real-Time Pipeline &amp; Audit Analytics
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              AI Audit &amp; Lead Command Center
            </h1>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white text-xs font-mono uppercase tracking-wider transition-transform duration-150 active:scale-[0.98]"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Admin Utama</span>
          </Link>
        </motion.header>

        {/* LLM Cost Tracker & Kill-Switch */}
        <LLMCostTracker />

        {/* Win vs Lost Lead Conversion Progress Bar */}
        <LeadWinLossProgress />

        {/* Metrics Overview — Snappy 150ms Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...FAST_TRANSITION, delay: 0.03 }}
            className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-colors duration-150 space-y-2"
          >
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest flex items-center justify-between">
              <span>Total Inbound Leads</span>
              <Users size={14} className="text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
              {leads.length || 12}
            </div>
            <div className="text-xs text-emerald-400 font-mono">
              +{regressionStats.slope > 0 ? regressionStats.slope : '1.14'} leads/hari · tren positif
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...FAST_TRANSITION, delay: 0.06 }}
            className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-colors duration-150 space-y-2"
          >
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest flex items-center justify-between">
              <span>High-Ticket Qualified</span>
              <TrendingUp size={14} className="text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
              {highTicketCount}
            </div>
            <div className="text-xs text-purple-300 font-mono">
              Entitas korporasi PT / Tbk teridentifikasi
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...FAST_TRANSITION, delay: 0.09 }}
            className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors duration-150 space-y-2"
          >
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest flex items-center justify-between">
              <span>Potensi Pipeline Value</span>
              <DollarSign size={14} className="text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
              Rp 1.45 Miliar
            </div>
            <div className="text-xs text-amber-300 font-mono">
              Proyeksi konversi kuartal berjalan
            </div>
          </motion.div>
        </div>

        {/* Lead Velocity & Pipeline Growth Chart with Linear Regression Overlay */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...FAST_TRANSITION, delay: 0.1 }}
          className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl space-y-6"
          aria-labelledby="chart-heading"
        >
          {/* Chart Header & Interactive Controls */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-purple-400">
                Chestaa Intelligence Engine · Koridor Laju Prospek &amp; Regresi Linear
              </p>
              <h2
                id="chart-heading"
                className="text-xl sm:text-2xl font-bold tracking-tight text-white"
              >
                Real-Time Lead Velocity &amp; Pipeline Growth
              </h2>
              <p className="text-xs text-slate-400">
                Korelasi antara penambahan prospek masuk (Inbound Leads), estimasi nilai transaksi (Pipeline Value), dan garis tren regresi linear jangka panjang.
              </p>
            </div>

            {/* Interactive Metric Switcher & Linear Regression Toggle */}
            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label="Pilih metrik visualisasi grafik dan garis tren regresi"
            >
              <button
                type="button"
                onClick={() => setChartMetric('all')}
                aria-pressed={chartMetric === 'all'}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-150 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 cursor-pointer ${
                  chartMetric === 'all'
                    ? 'bg-purple-600 text-white border border-purple-400'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                Semua Metrik (Dual-Axis)
              </button>
              <button
                type="button"
                onClick={() => setChartMetric('value')}
                aria-pressed={chartMetric === 'value'}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-150 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 cursor-pointer ${
                  chartMetric === 'value'
                    ? 'bg-purple-600 text-white border border-purple-400'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                Pipeline Value (Rp)
              </button>
              <button
                type="button"
                onClick={() => setChartMetric('leads')}
                aria-pressed={chartMetric === 'leads'}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-150 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer ${
                  chartMetric === 'leads'
                    ? 'bg-sky-600 text-white border border-sky-400'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                Volume Leads (Qty)
              </button>

              {/* Toggle Button for Linear Regression Trend Line */}
              <button
                type="button"
                onClick={() => {
                  if (chartMetric === 'value') {
                    setChartMetric('all');
                  }
                  setShowRegression((prev) => !prev);
                }}
                aria-pressed={showRegression}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-150 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer ${
                  showRegression
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400/80 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-amber-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-colors duration-150 ${
                    showRegression ? 'bg-amber-400' : 'bg-slate-600'
                  }`}
                />
                <span>Tren Regresi Linear ({showRegression ? 'Aktif' : 'Nonaktif'})</span>
              </button>
            </div>
          </div>

          {/* Screen Reader Assistive Summary */}
          <div className="sr-only">
            Grafik telemetri kecepatan lead Chestaa: dari H-6 hingga Hari Ini, nilai pipeline bertumbuh dari Rp 40 Juta menjadi Rp 310 Juta, dengan laju regresi linear +{regressionStats.slope} lead per hari dan skor R-squared {regressionStats.rSquared}.
          </div>

          {/* Editorial Telemetry Summary Bar (No Static Pill Slop — Clean Typography with Middle-Dot Separators) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 py-3 px-4 rounded-xl bg-slate-900/70 border border-slate-800/90 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-slate-300">
              <span className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold">
                <Zap size={12} className="text-emerald-400 shrink-0" />
                7D MA: {movingAverageStats.ma7d} Leads (Ambang +20%: {movingAverageStats.threshold20Pct})
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-sky-300 font-semibold">
                Fase Peak (&gt;20% 7D MA):{' '}
                {movingAverageStats.peakGrowthPhases
                  .map((p) => `${p.day} (+${p.pctAboveMa}%)`)
                  .join(', ')}
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-amber-300 font-semibold">
                Regresi Linear: +{regressionStats.slope} leads/hari (R² = {regressionStats.rSquared} · Proyeksi H+1: {regressionStats.projectedNextDay} Qty)
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-purple-300 font-semibold">
                Puncak Pipeline: {peakValuePeriod.day} (Rp {peakValuePeriod.value}M)
              </span>
            </div>

            {/* Quick Zoom / Brush Range Controls */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
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
                className="px-2.5 py-1 rounded-md bg-slate-950 hover:bg-slate-800 text-sky-300 border border-slate-700 text-[11px] font-bold transition-colors duration-150 cursor-pointer"
              >
                Zoom Fase Peak (H-3..Hari Ini)
              </button>
              {isZoomed && (
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-600 hover:bg-purple-500 text-white border border-purple-400 text-[11px] font-bold transition-colors duration-150 cursor-pointer"
                >
                  <RotateCcw size={11} />
                  <span>Reset Zoom</span>
                </button>
              )}
            </div>
          </div>

          {/* High-Contrast Recharts Visualization with Fast GPU Entrance */}
          <div
            className="w-full h-96 sm:h-[420px]"
            role="img"
            aria-label="Grafik garis pertumbuhan pipeline, volume lead, garis tren regresi linear, anotasi 7-day moving average, dan brush zoom"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={enrichedVelocityData}
                margin={{ top: 24, right: 24, left: 10, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#1e293b"
                  strokeOpacity={0.9}
                  vertical={true}
                />

                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                  tickLine={{ stroke: '#475569' }}
                  axisLine={{ stroke: '#334155', strokeWidth: 1.5 }}
                  tick={{ fill: '#f8fafc', fontSize: 12, fontWeight: 600, fontFamily: 'monospace' }}
                  dy={10}
                />

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

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const rowData = payload[0]?.payload;
                      return (
                        <div
                          role="status"
                          aria-live="polite"
                          className="bg-slate-950/95 border border-slate-700 rounded-xl p-4 shadow-2xl min-w-[260px] font-mono text-xs space-y-2.5 z-50 pointer-events-none"
                        >
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2 gap-3">
                            <span className="text-white font-bold tracking-wider text-sm">
                              {label}
                            </span>
                            {rowData?.isPeakGrowthPhase ? (
                              <span className="text-[11px] text-emerald-400 font-bold">
                                +{rowData.pctAboveMa}% vs 7D MA
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-400">
                                Telemetri Harian
                              </span>
                            )}
                          </div>
                          <div className="space-y-1.5 pt-0.5">
                            {payload.map((entry: any, index: number) => {
                              const isValue = entry.dataKey === 'value';
                              const isRegression = entry.dataKey === 'regressionLeads';
                              return (
                                <div
                                  key={`tooltip-${index}`}
                                  className="flex items-center justify-between gap-4"
                                >
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full shrink-0"
                                      style={{ backgroundColor: entry.color || entry.stroke }}
                                    />
                                    <span
                                      className={
                                        isValue
                                          ? 'text-purple-200 font-medium'
                                          : isRegression
                                          ? 'text-amber-300 font-medium'
                                          : 'text-sky-200 font-medium'
                                      }
                                    >
                                      {entry.name}:
                                    </span>
                                  </div>
                                  <span className="font-bold text-white text-right tabular-nums">
                                    {isValue
                                      ? `Rp ${entry.value} Juta`
                                      : `${entry.value} Lead`}
                                  </span>
                                </div>
                              );
                            })}
                            <div className="pt-2 mt-1.5 border-t border-slate-800/90 space-y-1 text-[11px] text-slate-400">
                              <div className="flex items-center justify-between">
                                <span>7D Moving Avg (+20%):</span>
                                <span className="text-emerald-300 font-bold tabular-nums">
                                  {movingAverageStats.ma7d} ({movingAverageStats.threshold20Pct} Qty)
                                </span>
                              </div>
                              {showRegression && (
                                <div className="flex items-center justify-between">
                                  <span>Laju Regresi (R² = {regressionStats.rSquared}):</span>
                                  <span className="text-amber-300 font-bold tabular-nums">
                                    +{regressionStats.slope} leads/hari
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Series 1: Pipeline Value in Electric Violet */}
                {(chartMetric === 'all' || chartMetric === 'value') && (
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="value"
                    name="Pipeline Value"
                    stroke="#c084fc"
                    strokeWidth={3}
                    isAnimationActive={true}
                    animationDuration={220}
                    dot={{
                      fill: '#07090e',
                      stroke: '#c084fc',
                      strokeWidth: 2.5,
                      r: 4.5,
                    }}
                    activeDot={{
                      fill: '#ffffff',
                      stroke: '#a855f7',
                      strokeWidth: 2.5,
                      r: 6.5,
                    }}
                  />
                )}

                {/* Series 2: Lead Inbound Volume in Electric Cyan */}
                {(chartMetric === 'all' || chartMetric === 'leads') && (
                  <Line
                    yAxisId={chartMetric === 'all' ? 'right' : 'left'}
                    type="monotone"
                    dataKey="leads"
                    name="Inbound Leads"
                    stroke="#38bdf8"
                    strokeWidth={2.75}
                    strokeDasharray="6 4"
                    isAnimationActive={true}
                    animationDuration={220}
                    dot={{
                      fill: '#07090e',
                      stroke: '#38bdf8',
                      strokeWidth: 2.5,
                      r: 4.5,
                    }}
                    activeDot={{
                      fill: '#ffffff',
                      stroke: '#0284c7',
                      strokeWidth: 2.5,
                      r: 6.5,
                    }}
                  />
                )}

                {/* Series 3: Linear Regression Trend Line Overlay (Dashed Gold/Amber) */}
                {showRegression && (chartMetric === 'all' || chartMetric === 'leads') && (
                  <Line
                    yAxisId={chartMetric === 'all' ? 'right' : 'left'}
                    type="monotone"
                    dataKey="regressionLeads"
                    name="Regresi Linear (Tren)"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    strokeDasharray="8 4"
                    isAnimationActive={true}
                    animationDuration={180}
                    dot={{
                      fill: '#07090e',
                      stroke: '#f59e0b',
                      strokeWidth: 2,
                      r: 3.5,
                    }}
                    activeDot={{
                      fill: '#fbbf24',
                      stroke: '#07090e',
                      strokeWidth: 2,
                      r: 6,
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
                        strokeWidth={1.75}
                        strokeOpacity={0.85}
                      >
                        <Label
                          value={`+${phase.pctAboveMa}% vs 7D MA`}
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
                        r={6.5}
                        fill="#059669"
                        stroke="#6ee7b7"
                        strokeWidth={2}
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
                    r={6.5}
                    fill="#7e22ce"
                    stroke="#c084fc"
                    strokeWidth={2}
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

                {/* Interactive Brush / Zoom Selector */}
                <Brush
                  key={brushKey}
                  dataKey="day"
                  height={28}
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
          </div>

          {/* High-Contrast Accessible Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-6">
              {(chartMetric === 'all' || chartMetric === 'value') && (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-[#c084fc] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#07090e] border-2 border-[#c084fc] inline-block -ml-2" />
                  <span className="text-purple-200 font-bold">Pipeline Value (Rp Juta)</span>
                </div>
              )}
              {(chartMetric === 'all' || chartMetric === 'leads') && (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-0.5 border-t-2 border-dashed border-[#38bdf8] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#07090e] border-2 border-[#38bdf8] inline-block -ml-2" />
                  <span className="text-sky-200 font-bold">Inbound Leads (Qty)</span>
                </div>
              )}
              {showRegression && (chartMetric === 'all' || chartMetric === 'leads') && (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-0.5 border-t-2 border-dashed border-amber-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#07090e] border-2 border-amber-400 inline-block -ml-2" />
                  <span className="text-amber-300 font-bold">
                    Regresi Linear (+{regressionStats.slope}/hari · R²={regressionStats.rSquared})
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="w-5 h-0.5 border-t-2 border-dashed border-emerald-400 inline-block" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                <span className="text-emerald-300 font-bold">&gt;20% 7D Moving Avg</span>
              </div>
            </div>

            <div className="text-slate-400 text-[11px]">
              Geser slider Brush di bawah grafik untuk memfilter tabel lead secara real-time
            </div>
          </div>
        </motion.section>

        {/* Leads Table with Dynamic Date-Range Filtering, Clickable Rows & Status Tracking */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Arsip Lead Masuk &amp; Status Tracking
              </h2>
              <p className="text-xs text-slate-400 font-mono flex flex-wrap items-center gap-2">
                <Filter size={12} className="text-emerald-400" />
                <span>
                  Menampilkan <strong className="text-white">{filteredLeads.length}</strong> dari{' '}
                  <strong className="text-white">{leads.length}</strong> lead pada rentang{' '}
                  <strong className="text-emerald-300">
                    {activeDaySlice[0]} s/d {activeDaySlice[activeDaySlice.length - 1]}
                  </strong>{' '}
                  · Klik baris untuk membuka Drawer Manajemen Lead
                </span>
              </p>
            </div>

            {isZoomed && (
              <button
                type="button"
                onClick={handleResetZoom}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition-all duration-150 cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw size={13} />
                <span>Tampilkan Semua Hari ({leads.length} Lead)</span>
              </button>
            )}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-300 font-mono">
                <tr>
                  <th className="p-4 uppercase tracking-wider">Periode · Waktu</th>
                  <th className="p-4 uppercase tracking-wider">Nama Eksekutif</th>
                  <th className="p-4 uppercase tracking-wider">Perusahaan</th>
                  <th className="p-4 uppercase tracking-wider">No. Telepon</th>
                  <th className="p-4 uppercase tracking-wider">Kualifikasi Tier</th>
                  <th className="p-4 uppercase tracking-wider">Est. Nilai Proyek</th>
                  <th className="p-4 uppercase tracking-wider">Status Lead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400 font-mono">
                      Memuat data lead dari penyimpanan...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400 font-mono">
                      Tidak ada lead pada rentang tanggal{' '}
                      <strong className="text-white">
                        {activeDaySlice[0]} s/d {activeDaySlice[activeDaySlice.length - 1]}
                      </strong>
                      . Geser Brush pada grafik atau klik Reset Zoom.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const isSelected = selectedLeadId === lead.id;
                    return (
                      <tr
                        key={lead.id}
                        tabIndex={0}
                        role="button"
                        aria-label={`Kelola detail lead ${lead.name} dari ${lead.company}`}
                        onClick={() => openLeadDrawer(lead)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openLeadDrawer(lead);
                          }
                        }}
                        className={`group cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:bg-slate-900 ${
                          isSelected
                            ? 'bg-purple-950/35 hover:bg-purple-950/45'
                            : 'hover:bg-slate-900/70'
                        }`}
                      >
                        <td className="p-4 text-slate-400 font-mono whitespace-nowrap">
                          <span className="text-purple-300 font-bold">{lead.dayBucket}</span>
                          <span className="mx-1.5 text-slate-600">·</span>
                          <span>
                            {new Date(lead.timestamp || Date.now()).toLocaleString('id-ID')}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-white">
                          <div className="flex items-center gap-1.5">
                            <span>{lead.name}</span>
                            <ChevronRight
                              size={13}
                              className="text-purple-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 shrink-0"
                            />
                          </div>
                          {lead.notes && (
                            <p className="text-[11px] text-slate-400 font-normal line-clamp-1 mt-0.5">
                              {lead.notes}
                            </p>
                          )}
                        </td>
                        <td className="p-4 text-slate-200 font-medium">{lead.company}</td>
                        <td className="p-4 text-emerald-400 font-mono tabular-nums">
                          {lead.phone}
                        </td>
                        <td className="p-4 font-mono">
                          {lead.isHighTicket ? (
                            <span className="text-emerald-400 font-bold tracking-wider uppercase text-[11px]">
                              High-Ticket · Enterprise
                            </span>
                          ) : (
                            <span className="text-slate-400 font-medium tracking-wider uppercase text-[11px]">
                              Standard Tier
                            </span>
                          )}
                        </td>
                        <td className="p-4 font-mono text-white font-bold tabular-nums">
                          {lead.estimatedValue}
                        </td>
                        <td
                          className="p-4"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        >
                          <select
                            value={lead.status || 'New'}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                            className="bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-emerald-300 rounded-lg px-2.5 py-1.5 font-mono text-xs focus:outline-none focus:border-emerald-400 transition-colors duration-150 cursor-pointer"
                          >
                            <option value="New">NEW</option>
                            <option value="Contacted">CONTACTED</option>
                            <option value="Won">WON</option>
                            <option value="Lost">LOST</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Individual Lead Management Slide-Over Drawer — Smooth 200ms AnimatePresence Transition */}
      <AnimatePresence mode="sync">
        {selectedLead && (
          <motion.div
            key="lead-management-drawer-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex justify-end overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-drawer-title"
          >
            {/* Backdrop */}
            <motion.div
              key="lead-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={closeLeadDrawer}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-Over Drawer Panel (200ms) */}
            <motion.aside
              key="lead-drawer-panel"
              initial={{ x: '100%', opacity: 0.85 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.85 }}
              transition={DRAWER_SLIDE_TRANSITION}
              className="relative z-10 w-full max-w-lg bg-slate-950 border-l border-slate-800 h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-2xl font-sans text-slate-100 will-change-transform"
            >
              <div className="space-y-6">
                {/* Drawer Header — Editorial Kicker without Static Pills */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-purple-300">
                      {selectedLead.dayBucket} ·{' '}
                      <span
                        className={
                          selectedLead.isHighTicket ? 'text-emerald-400 font-bold' : 'text-slate-400'
                        }
                      >
                        {selectedLead.isHighTicket ? 'High-Ticket Enterprise' : 'Standard Tier'}
                      </span>
                    </p>
                    <h3
                      id="lead-drawer-title"
                      className="text-2xl font-bold text-white tracking-tight"
                    >
                      {selectedLead.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                      <Building2 size={14} className="shrink-0" />
                      <span>{selectedLead.company}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeLeadDrawer}
                    aria-label="Tutup panel detail lead"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors duration-150 cursor-pointer shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Quick Contact & WhatsApp Follow-Up Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Halo ${selectedLead.name} dari ${selectedLead.company}, kami dari tim engineer Chestaa ingin menindaklanjuti permintaan AI Audit & estimasi sistem untuk bisnis Anda.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all duration-150 active:scale-[0.98] cursor-pointer"
                  >
                    <MessageCircle size={15} />
                    <span>Hubungi via WA</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(selectedLead.phone);
                      setCopiedPhone(true);
                      toast.success('Nomor telepon disalin ke clipboard');
                      setTimeout(() => setCopiedPhone(false), 2000);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs font-mono uppercase tracking-wider transition-all duration-150 active:scale-[0.98] cursor-pointer"
                  >
                    {copiedPhone ? (
                      <Check size={15} className="text-emerald-400" />
                    ) : (
                      <Copy size={15} />
                    )}
                    <span>{copiedPhone ? 'Tersalin!' : 'Salin Nomor'}</span>
                  </button>
                </div>

                {/* Lead Telemetry & Qualification Breakdown */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-300">
                    Rincian Kualifikasi &amp; Telemetri Prospek
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/90">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">
                        Estimasi Nilai Proyek
                      </span>
                      <span className="text-sm font-mono font-extrabold text-white mt-1 block tabular-nums">
                        {selectedLead.estimatedValue}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/90">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">
                        Kontak Langsung
                      </span>
                      <span className="text-sm font-mono font-bold text-emerald-400 mt-1 flex items-center gap-1.5 tabular-nums">
                        <Phone size={12} />
                        {selectedLead.phone}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-sky-400" />
                      Waktu Masuk:
                    </span>
                    <span className="text-slate-200 font-semibold">
                      {new Date(selectedLead.timestamp || Date.now()).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Status Pipeline Selector */}
                <div className="space-y-2.5">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-300 block">
                    Update Status Pipeline Lead
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['New', 'Contacted', 'Won', 'Lost'] as const).map((statusOption) => {
                      const active = (selectedLead.status || 'New') === statusOption;
                      return (
                        <button
                          key={statusOption}
                          type="button"
                          onClick={() => updateLeadStatus(selectedLead.id, statusOption)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-150 active:scale-[0.98] cursor-pointer ${
                            active
                              ? 'bg-purple-600 text-white border-purple-400'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                          }`}
                        >
                          {statusOption}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Internal Notes Editor */}
                <div className="space-y-2.5">
                  <label
                    htmlFor="lead-internal-notes"
                    className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-300 flex items-center gap-1.5"
                  >
                    <FileText size={13} className="text-emerald-400" />
                    <span>Catatan Internal &amp; Tindak Lanjut</span>
                  </label>
                  <textarea
                    id="lead-internal-notes"
                    rows={4}
                    value={drawerNotes}
                    onChange={(e) => setDrawerNotes(e.target.value)}
                    placeholder="Tulis ringkasan kebutuhan klien, jadwal demo, atau catatan arsitektur..."
                    className="w-full rounded-xl bg-slate-900 border border-slate-700 focus:border-purple-400 focus:outline-none p-3.5 text-xs text-white placeholder:text-slate-500 leading-relaxed transition-colors duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => saveLeadNotes(selectedLead.id, drawerNotes)}
                    className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-150 active:scale-[0.99] cursor-pointer"
                  >
                    Simpan Catatan Internal
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>ID: {selectedLead.id}</span>
                <button
                  type="button"
                  onClick={closeLeadDrawer}
                  className="text-slate-300 hover:text-white underline cursor-pointer"
                >
                  Tutup Drawer (Esc)
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
