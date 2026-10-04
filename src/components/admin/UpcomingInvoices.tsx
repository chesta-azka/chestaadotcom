'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { FileText, DollarSign, Clock, CheckCircle2 } from 'lucide-react';

interface RetainerInvoice {
  id: string;
  clientName: string;
  monthlyFee: number;
  billingCycleDate: string;
  status: string;
}

export default function UpcomingInvoices() {
  const [invoices, setInvoices] = useState<RetainerInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        if (!db) {
          setLoading(false);
          return;
        }
        const q = query(collection(db, 'retainer_contracts'), orderBy('createdAt', 'desc'), limit(10));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as RetainerInvoice[];
        
        if (data.length === 0) {
          // Mock initial retainer data if empty
          setInvoices([
            { id: '1', clientName: 'NusaKarya Digital PT', monthlyFee: 15000000, billingCycleDate: '2026-11-01', status: 'Awaiting Payment' },
            { id: '2', clientName: 'Vanguard Creative Corp', monthlyFee: 22500000, billingCycleDate: '2026-11-05', status: 'Awaiting Payment' }
          ]);
        } else {
          setInvoices(data);
        }
      } catch (e) {
        console.error('Failed to fetch retainer invoices:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchInvoices();
  }, []);

  return (
    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-6 shadow-2xl font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider">
          <FileText size={16} />
          <span>Financial Operations // Upcoming Invoices</span>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
          AUTOMATED BILLING
        </span>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="p-6 text-center text-slate-400 font-mono text-xs">Memuat data tagihan retainer...</div>
        ) : invoices.length === 0 ? (
          <div className="p-6 text-center text-slate-400 font-mono text-xs">Tidak ada tagihan mendatang.</div>
        ) : (
          invoices.map((inv) => (
            <div key={inv.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
              <div className="space-y-1">
                <div className="text-sm font-bold text-white font-sans">{inv.clientName}</div>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <Clock size={12} /> Jasa Billing: {inv.billingCycleDate}
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right">
                  <div className="text-sm font-extrabold text-emerald-400">Rp {inv.monthlyFee.toLocaleString('id-ID')}</div>
                  <span className="text-[10px] bg-amber-950/80 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                    {inv.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
