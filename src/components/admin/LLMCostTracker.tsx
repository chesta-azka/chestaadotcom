'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ShieldAlert, Zap, Power, Cpu } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LLMCostTracker() {
  const [tokenUsage, setTokenUsage] = useState(48200); // Simulated token count
  const [dailyLimit] = useState(100000); // 100k limit
  const [isAIActive, setIsAIActive] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAiStatus() {
      try {
        if (!db) return;
        const ref = doc(db, 'system_config', 'ai_settings');
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          if (typeof data.isAIActive === 'boolean') {
            setIsAIActive(data.isAIActive);
          }
        }
      } catch (e) {
        console.error('Failed to fetch AI status:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchAiStatus();
  }, []);

  const toggleKillSwitch = async () => {
    try {
      if (!db) return;
      const newState = !isAIActive;
      const ref = doc(db, 'system_config', 'ai_settings');
      await setDoc(ref, { isAIActive: newState }, { merge: true });
      setIsAIActive(newState);
      if (newState) {
        toast.success('AI Concierge berhasil diaktifkan kembali.');
      } else {
        toast.error('KILL-SWITCH DIAKTIFKAN: AI Concierge diturunkan ke kontak formulir standar.');
      }
    } catch (e) {
      console.error('Failed to update kill-switch:', e);
      toast.error('Gagal memperbarui status Kill-Switch.');
    }
  };

  const percentage = Math.min(100, Math.round((tokenUsage / dailyLimit) * 100));

  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5 font-mono">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <Cpu size={16} />
          <span>LLM API Cost &amp; Token Governor</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span
            className={`w-2 h-2 rounded-full ${
              isAIActive ? 'bg-emerald-400' : 'bg-rose-500'
            }`}
          />
          <span className={isAIActive ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
            {isAIActive ? 'Status AI: Aktif' : 'Status AI: Dihentikan'}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-300 tabular-nums">
          <span>Daily LLM API Limit</span>
          <span>
            {tokenUsage.toLocaleString()} / {dailyLimit.toLocaleString()} Tokens ({percentage}%)
          </span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-150 ${
              percentage > 85 ? 'bg-rose-500' : 'bg-emerald-400'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-4">
        <div className="text-[11px] text-slate-400">
          {isAIActive
            ? 'Sistem beroperasi normal dengan pengamanan dual-engine.'
            : 'Kill-Switch aktif. Concierge beralih ke contact form.'}
        </div>
        <button
          type="button"
          onClick={toggleKillSwitch}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-150 active:scale-[0.98] cursor-pointer shrink-0 ${
            isAIActive
              ? 'bg-rose-600 hover:bg-rose-500 text-white'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          <Power size={14} />
          <span>{isAIActive ? 'Engage Kill-Switch' : 'Reactivate AI'}</span>
        </button>
      </div>
    </div>
  );
}
