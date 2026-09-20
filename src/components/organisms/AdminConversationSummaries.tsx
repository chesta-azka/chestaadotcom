import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Sparkles, FileText, CheckCircle2, AlertCircle, ArrowUpRight, ShieldCheck, RefreshCw, Layers } from 'lucide-react';
import LeadBadge from '../atoms/LeadBadge';
import toast from 'react-hot-toast';

interface LeadSummary {
  sessionId: string;
  clientIntent: string;
  projectScope: string;
  leadTier: 'Cold Lead' | 'Warm Lead' | 'Hot Lead';
  bulletPoints: string[];
  recommendedAction: string;
  createdAt?: any;
}

export default function AdminConversationSummaries() {
  const [summaries, setSummaries] = useState<LeadSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'admin_leads_summary'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: LeadSummary[] = [];
      snapshot.forEach((docSnap) => {
        data.push({ sessionId: docSnap.id, ...docSnap.data() } as LeadSummary);
      });
      setSummaries(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching admin lead summaries:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGenerateSummary = async () => {
    setGenerating(true);
    try {
      // Fetch recent chat sessions to summarize
      const resSessions = await fetch('/api/score-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: "Klien ingin membuat website company profile UMKM dengan domain .com dan menanyakan harga promo Rp540K serta jadwal pengerjaan 1-3 hari." })
      });
      
      const data = await resSessions.json();
      if (data.success) {
        // Now trigger summary generation
        const resSum = await fetch('/api/ai/summarize-conversation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: `SESSION-DEMO-${Math.floor(Math.random() * 1000)}`,
            transcript: "Klien ingin membuat website company profile UMKM dengan domain .com dan menanyakan harga promo Rp540K serta jadwal pengerjaan 1-3 hari.",
            leadScore: "Hot"
          })
        });
        const sumData = await resSum.json();
        if (sumData.success) {
          toast.success("Ringkasan percakapan AI berhasil dibuat & disinkronkan ke Firestore!");
        } else {
          toast.error("Gagal membuat ringkasan.");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat memproses ringkasan.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-display font-medium text-slate-900 mb-1 flex items-center gap-2">
            <FileText className="text-purple-600" size={22} />
            Automated Conversation Summaries
          </h2>
          <p className="text-slate-600 text-sm">
            Ringkasan eksekutif otomatis kebutuhan klien, cakupan proyek, dan tier lead yang disinkronkan secara aman ke Firestore.
          </p>
        </div>
        <button
          onClick={handleGenerateSummary}
          disabled={generating}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-mono font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-50"
        >
          {generating ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} />}
          {generating ? 'MENYUSUN RINGKASAN...' : 'SIMULASI AI SUMMARY'}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500 font-mono text-sm">Memuat ringkasan percakapan...</div>
      ) : summaries.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs">
          <Layers className="mx-auto text-purple-400 mb-3" size={36} />
          <h3 className="font-display font-medium text-slate-900 text-base mb-1">Belum Ada Ringkasan Percakapan</h3>
          <p className="text-slate-500 text-xs max-w-md mx-auto mb-6">
            Saat sesi chat klien mencapai tahap penutupan atau tombol simulasi diklik, AI akan otomatis menghasilkan ringkasan terstruktur di sini.
          </p>
          <button
            onClick={handleGenerateSummary}
            className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles size={13} /> Buat Ringkasan Pertama
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {summaries.map((summary, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:border-purple-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider truncate max-w-[180px]">
                    ID: {summary.sessionId}
                  </span>
                  <LeadBadge tier={summary.leadTier} showScore={false} />
                </div>

                <h3 className="text-base font-display font-semibold text-slate-900 mb-1">
                  {summary.clientIntent || 'Eksplorasi Layanan'}
                </h3>
                <p className="text-xs font-mono text-purple-700 bg-purple-50/80 px-2.5 py-1 rounded-lg inline-block mb-4 border border-purple-100">
                  Lingkup: {summary.projectScope || 'Pengembangan Web'}
                </p>

                <div className="space-y-2 mb-5">
                  <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wide">Poin Kebutuhan Klien:</p>
                  <ul className="space-y-1.5">
                    {(summary.bulletPoints || []).map((point, pIdx) => (
                      <li key={pIdx} className="text-xs font-sans text-slate-700 flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-purple-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-2">
                <div className="flex items-start gap-2 bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
                  <ShieldCheck size={14} className="text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-0.5">Rekomendasi Tindakan Admin:</span>
                    <p className="text-xs font-sans text-slate-800 font-medium">{summary.recommendedAction || 'Segera tindak lanjuti prospek ini.'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
