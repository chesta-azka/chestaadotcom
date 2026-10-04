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
    <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-5 font-mono">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <Cpu size={16} />
          <span>LLM API Cost &amp; Token Governor</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded ${isAIActive ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'}`}>
            {isAIActive ? 'AI STATUS: ACTIVE' : 'AI STATUS: KILLED'}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-emerald-300">
          <span>Daily LLM API Limit</span>
          <span>{tokenUsage.toLocaleString()} / {dailyLimit.toLocaleString()} Tokens ({percentage}%)</span>
        </div>
        <div className="w-full bg-black rounded-full h-3 border border-emerald-500/40 overflow-hidden p-0.5">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${percentage > 85 ? 'bg-rose-500' : 'bg-emerald-400'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-emerald-500/20">
        <div className="text-[11px] text-emerald-500">
          {isAIActive ? 'Sistem beroperasi normal dengan pengamanan dual-engine.' : 'Kill-Switch aktif. Concierge beralih ke contact form.'}
        </div>
        <button
          onClick={toggleKillSwitch}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            isAIActive 
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
          }`}
        >
          <Power size={14} />
          <span><b>{isAIActive ? 'ENGAGE KILL-SWITCH' : 'REACTIVATE AI'}</b></span>
        </button>
      </div>
    </div>
  );
}
