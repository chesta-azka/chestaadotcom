"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKanban } from '../hooks/useKanban';
import { 
  CheckCircle2, Clock, PlayCircle, Edit3, Check, X, 
  Send, Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ClientKanbanViewProps {
  workspaceSlug: string;
}

export function ClientKanbanView({ workspaceSlug }: ClientKanbanViewProps) {
  const { tickets, loading, submitRevision, approveTicket } = useKanban(workspaceSlug);
  const [activeRevisionId, setActiveRevisionId] = useState<string | null>(null);
  const [revisionNote, setRevisionNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center font-sans space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-purple-900 border-t-transparent animate-spin" />
        <span className="text-sm font-medium text-slate-500">Memuat status pengerjaan proyek...</span>
      </div>
    );
  }

  const handleRevisionSubmit = async (id: string) => {
    if (!revisionNote.trim()) {
      toast.error('Harap masukkan catatan revisi Anda.');
      return;
    }
    setIsSubmitting(true);
    try {
      await submitRevision(id, revisionNote.trim());
      setRevisionNote('');
      setActiveRevisionId(null);
      toast.success('Permintaan revisi telah dikirim ke Tim Engineer!', { icon: '📝' });
    } catch (e) {
      toast.error('Gagal mengirim revisi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApprove = async (id: string, title: string) => {
    try {
      await approveTicket(id);
      toast.success(`"${title}" berhasil disetujui & live deployed!`, { icon: '🎉' });
    } catch (e) {
      toast.error('Gagal menyetujui tiket.');
    }
  };

  const deployedCount = tickets.filter(t => t.status === 'Deployed').length;
  const reviewCount = tickets.filter(t => t.status === 'Client Review').length;
  const progressPercentage = tickets.length > 0 ? Math.round((deployedCount / tickets.length) * 100) : 0;

  return (
    <div className="w-full font-sans space-y-6">
      {/* Header & Overall Project Progress Meter */}
      <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-purple-50 text-purple-900">
              <Sparkles size={16} />
            </span>
            <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight">Live Project Milestones & Kanban</h2>
          </div>
          <p className="text-xs text-slate-500">
            Pantau progres implementasi teknis secara real-time. Anda dapat menyetujui fitur atau meminta revisi kapan saja.
          </p>
        </div>

        {/* Progress Gauge */}
        <div className="w-full md:w-64 bg-purple-50/40 p-4 rounded-2xl border border-purple-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Total Selesai</span>
            <span className="font-bold text-purple-900 font-mono">{progressPercentage}%</span>
          </div>
          <div className="w-full h-2.5 bg-purple-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-purple-900 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>{deployedCount} dari {tickets.length} Milestone</span>
            <span>{reviewCount} Butuh Review</span>
          </div>
        </div>
      </div>

      {/* Review Required Highlight Banner if any */}
      {reviewCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-amber-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {reviewCount}
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">Review Klien Diperlukan</h4>
              <p className="text-xs text-amber-800">Ada {reviewCount} fitur/milestone yang siap Anda uji coba dan setujui di bawah.</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-amber-100 rounded-xl text-amber-900 hidden sm:inline">
            Aksi Langsung
          </span>
        </div>
      )}

      {/* Tickets List */}
      {tickets.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-purple-100">
          <Clock className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
          <h3 className="text-sm font-bold text-slate-800">Belum Ada Milestone Terdaftar</h3>
          <p className="text-xs text-slate-500 mt-1">Tim engineer kami sedang merancang roadmap teknis untuk workspace Anda.</p>
        </div>
      ) : (
        <motion.div layout className="space-y-3.5">
          {tickets.map(ticket => {
            const isReview = ticket.status === 'Client Review';
            const isRevising = activeRevisionId === ticket.id;
            const isDeployed = ticket.status === 'Deployed';
            const isInProgress = ticket.status === 'In Progress';

            let statusColor = 'text-slate-600 bg-slate-100 border-slate-200';
            let StatusIcon = Clock;
            let statusText = 'Antrean (Backlog)';
            
            if (isInProgress) { 
              statusColor = 'text-purple-900 bg-purple-50 border-purple-200'; 
              StatusIcon = PlayCircle; 
              statusText = 'Sedang Dikerjakan';
            }
            if (isReview) { 
              statusColor = 'text-amber-800 bg-amber-50 border-amber-300'; 
              StatusIcon = Edit3; 
              statusText = 'Menunggu Review Anda';
            }
            if (isDeployed) { 
              statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200'; 
              StatusIcon = CheckCircle2; 
              statusText = 'Live Deployed & Approved';
            }

            return (
              <motion.div 
                layout
                key={ticket.id}
                className={`p-5 rounded-3xl border transition-all duration-300 ${
                  isReview 
                    ? 'bg-amber-50/40 border-amber-300 shadow-xs' 
                    : 'bg-white border-purple-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-2xl border ${statusColor} shrink-0 mt-0.5 sm:mt-0`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${statusColor}`}>
                          {statusText}
                        </span>
                        {ticket.tag && (
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            {ticket.tag}
                          </span>
                        )}
                        {ticket.client_approved && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                            <Check size={11} /> Verified
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {ticket.title}
                      </h3>
                      {ticket.description && (
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-2xl">
                          {ticket.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Client Review Interactive Actions */}
                  {isReview && !isRevising && (
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <button
                        onClick={() => setActiveRevisionId(ticket.id)}
                        className="px-3.5 py-2 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-xl transition-all cursor-pointer"
                      >
                        Minta Revisi
                      </button>
                      <button
                        onClick={() => handleApprove(ticket.id, ticket.title)}
                        className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Setujui (Approve)</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Revision Expansion Box */}
                <AnimatePresence>
                  {isRevising && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                            <Edit3 size={14} />
                            <span>Tuliskan Catatan Perubahan atau Penyesuaian</span>
                          </label>
                          <button 
                            onClick={() => { setActiveRevisionId(null); setRevisionNote(''); }} 
                            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <textarea
                          autoFocus
                          value={revisionNote}
                          onChange={(e) => setRevisionNote(e.target.value)}
                          onKeyDown={(e) => {
                            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                              e.preventDefault();
                              handleRevisionSubmit(ticket.id);
                            }
                          }}
                          placeholder="Jelaskan detail bagian mana yang ingin disesuaikan atau diperbaiki..."
                          className="w-full p-3 bg-white border border-amber-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[90px] resize-none"
                        />

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-slate-400 font-mono">Tip: Tekan Ctrl+Enter untuk kirim</span>
                          <button
                            onClick={() => handleRevisionSubmit(ticket.id)}
                            disabled={isSubmitting || !revisionNote.trim()}
                            className="px-4 py-2 bg-purple-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Catatan Revisi'}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

export default ClientKanbanView;
