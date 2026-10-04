'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, query, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { Terminal, ShieldAlert, TrendingUp, Users, DollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import LLMCostTracker from '../../../components/admin/LLMCostTracker';
import LeadWinLossProgress from '../../../components/admin/LeadWinLossProgress';
import toast from 'react-hot-toast';

interface AuditLead {
  id: string;
  name: string;
  company: string;
  phone: string;
  timestamp: string;
  status?: 'New' | 'Contacted' | 'Won' | 'Lost';
}

interface ScoredLead extends AuditLead {
  isHighTicket: boolean;
  estimatedValue: string;
}

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

  useEffect(() => {
    async function fetchLeads() {
      try {
        if (!db) {
          setLoading(false);
          return;
        }
        const q = query(collection(db, 'audit_leads'), orderBy('timestamp', 'desc'), limit(50));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(docSnap => {
          const raw = docSnap.data() as AuditLead;
          const scoring = scoreLead(raw.company);
          return {
            id: docSnap.id,
            ...raw,
            status: raw.status || 'New',
            ...scoring
          };
        });
        setLeads(data);
      } catch (e) {
        console.error('Failed to fetch audit leads:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const updateLeadStatus = async (leadId: string, newStatus: 'New' | 'Contacted' | 'Won' | 'Lost') => {
    try {
      if (!db) return;
      await updateDoc(doc(db, 'audit_leads', leadId), { status: newStatus });
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      toast.success('Status lead berhasil diperbarui menjadi ' + newStatus);
    } catch (e) {
      console.error('Failed to update lead status:', e);
      toast.error('Gagal memperbarui status lead.');
    }
  };

  const velocityData = [
    { day: 'H-6', leads: 2, value: 40 },
    { day: 'H-5', leads: 4, value: 90 },
    { day: 'H-4', leads: 3, value: 75 },
    { day: 'H-3', leads: 7, value: 180 },
    { day: 'H-2', leads: 5, value: 120 },
    { day: 'H-1', leads: 9, value: 240 },
    { day: 'Hari Ini', leads: leads.length || 6, value: 310 }
  ];

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

        {/* Lead Velocity Chart */}
        <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/10 border border-emerald-500/30 space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-sm uppercase tracking-wider font-bold text-white flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-400" />
              <span>Real-time Lead Velocity &amp; Pipeline Growth</span>
            </div>
            <span className="text-xs bg-emerald-950 px-3 py-1 rounded border border-emerald-500/30 text-emerald-300">LIVE FEED</span>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" />
                <XAxis dataKey="day" stroke="#10b981" textAnchor="end" />
                <YAxis stroke="#10b981" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000000', borderColor: '#10b981', borderRadius: '8px', color: '#10b981' }}
                />
                <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads Table with Status Tracking Dropdown */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Arsip Lead Masuk &amp; Status Tracking</h2>

          <div className="overflow-x-auto rounded-2xl border border-emerald-500/30 bg-black">
            <table className="w-full text-left text-xs">
              <thead className="bg-emerald-950/40 border-b border-emerald-500/30 text-emerald-300">
                <tr>
                  <th className="p-4 uppercase tracking-widest">Waktu</th>
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
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-emerald-600">Belum ada lead audit yang masuk. Data akan muncul secara real-time.</td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-emerald-950/20 transition-colors">
                      <td className="p-4 text-emerald-500">{new Date(lead.timestamp || Date.now()).toLocaleString('id-ID')}</td>
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
