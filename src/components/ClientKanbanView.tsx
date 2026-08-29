"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKanban } from '../hooks/useKanban';
import { CheckCircle2, Clock, PlayCircle, Edit3, Check, X, Send } from 'lucide-react';

export function ClientKanbanView({ workspaceSlug }: { workspaceSlug: string }) {
  const { tickets, loading, submitRevision, approveTicket } = useKanban(workspaceSlug);
  const [activeRevisionId, setActiveRevisionId] = useState<string | null>(null);
  const [revisionNote, setRevisionNote] = useState('');

  if (loading) return <div className="p-8 text-center animate-pulse dark:text-slate-400">Loading your board...</div>;

  const handleRevisionSubmit = async (id: string) => {
    if (!revisionNote.trim()) return;
    await submitRevision(id, revisionNote);
    setRevisionNote('');
    setActiveRevisionId(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6 font-sans">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mb-8">Project Tracker</h2>
      
      <div className="space-y-4">
        {tickets.map(ticket => {
          const isReview = ticket.status === 'Client Review';
          const isRevising = activeRevisionId === ticket.id;

          let statusColor = 'text-slate-500 bg-slate-100 dark:bg-slate-800';
          let StatusIcon = Clock;
          
          if (ticket.status === 'In Progress') { statusColor = 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'; StatusIcon = PlayCircle; }
          if (ticket.status === 'Client Review') { statusColor = 'text-amber-600 bg-amber-100 dark:bg-amber-900/30'; StatusIcon = Edit3; }
          if (ticket.status === 'Deployed') { statusColor = 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30'; StatusIcon = CheckCircle2; }

          return (
            <motion.div 
              layout
              key={ticket.id}
              className={`p-5 rounded-3xl border backdrop-blur-xl shadow-sm transition-all duration-300
                ${isReview ? 'bg-white/80 dark:bg-slate-900/80 border-amber-200 dark:border-amber-900/50 ring-1 ring-amber-500/20' : 'bg-white/40 dark:bg-slate-900/40 border-white/20 dark:border-white/10'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-2xl ${statusColor}`}>
                    <StatusIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{ticket.title}</h3>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{ticket.status}</p>
                  </div>
                </div>

                {/* Client Review Actions */}
                {isReview && !isRevising && (
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveRevisionId(ticket.id)}
                      className="px-4 py-2 text-sm font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 dark:text-amber-400 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 rounded-xl transition-colors"
                    >
                      Request Revision
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => approveTicket(ticket.id)}
                      className="px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 rounded-xl transition-colors flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" /> Approve
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Revision Expansion */}
              <AnimatePresence>
                {isRevising && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 20 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">What needs to be changed?</label>
                        <button onClick={() => { setActiveRevisionId(null); setRevisionNote(''); }} className="text-slate-400 hover:text-slate-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        autoFocus
                        value={revisionNote}
                        onChange={(e) => setRevisionNote(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.ctrlKey && e.key === 'Enter') {
                            e.preventDefault();
                            handleRevisionSubmit(ticket.id);
                          }
                        }}
                        placeholder="Please describe the adjustments required..."
                        className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[100px] resize-none mb-3"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleRevisionSubmit(ticket.id)}
                          disabled={!revisionNote.trim()}
                          className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl flex items-center gap-2 disabled:opacity-50 transition-opacity"
                        >
                          <Send className="w-4 h-4" /> Submit Feedback
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
