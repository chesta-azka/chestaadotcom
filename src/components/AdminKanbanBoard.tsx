"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKanban } from '../hooks/useKanban';
import { KanbanTicket, TicketStatus } from '../lib/db';
import { CheckCircle2, Clock, AlertCircle, PlayCircle, MoreHorizontal, X, ArrowRight, Save, History } from 'lucide-react';

export function AdminKanbanBoard({ workspaceSlug }: { workspaceSlug: string }) {
  const { tickets, loading, moveTicket } = useKanban(workspaceSlug);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [viewHistoryTicket, setViewHistoryTicket] = useState<KanbanTicket & { id: string } | null>(null);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        // Implement save functionality if needed, e.g., saving order
        console.log("Ctrl+S pressed: Save changes");
      }
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        console.log("Ctrl+Enter pressed: Submit revision note");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedTickets(prev => 
      prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
    );
  };

  const handleBulkMove = (status: TicketStatus) => {
    selectedTickets.forEach(id => {
      moveTicket(id, status);
    });
    setSelectedTickets([]);
  };

  if (loading) return <div className="p-8 text-center animate-pulse dark:text-slate-400">Loading Kanban...</div>;

  const columns: { title: TicketStatus; icon: React.ReactNode; color: string }[] = [
    { title: 'Backlog', icon: <Clock className="w-5 h-5" />, color: 'bg-slate-100 dark:bg-slate-800/50' },
    { title: 'In Progress', icon: <PlayCircle className="w-5 h-5" />, color: 'bg-blue-50/50 dark:bg-blue-900/20' },
    { title: 'Client Review', icon: <AlertCircle className="w-5 h-5" />, color: 'bg-amber-50/50 dark:bg-amber-900/20' },
    { title: 'Deployed', icon: <CheckCircle2 className="w-5 h-5" />, color: 'bg-emerald-50/50 dark:bg-emerald-900/20' },
  ];

  return (
    <div className="w-full h-full p-6 font-sans">
      
      {/* Legend & Bulk Actions */}
      <div className="mb-8 p-4 backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></div> Backlog</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-400"></div> In Progress</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400"></div> Review</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-400"></div> Deployed</div>
          <div className="flex items-center gap-2 border-l border-slate-300 dark:border-slate-700 pl-6">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400 uppercase">
              Revision Requested
            </span>
            <span>Needs fix</span>
          </div>
        </div>

        <AnimatePresence>
          {selectedTickets.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm font-medium">{selectedTickets.length} selected</span>
              <button onClick={() => handleBulkMove('Client Review')} className="px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors">
                Send to Review
              </button>
              <button onClick={() => handleBulkMove('Deployed')} className="px-3 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                Bulk Approve
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Board */}
      <div className="flex gap-6 overflow-x-auto pb-8 h-[calc(100vh-200px)]">
        {columns.map(col => (
          <div key={col.title} className={`flex-shrink-0 w-80 rounded-3xl p-4 flex flex-col gap-4 border border-slate-200/50 dark:border-slate-700/50 ${col.color}`}>
            <div className="flex items-center justify-between px-2">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                {col.icon} {col.title}
              </h3>
              <span className="text-xs font-medium bg-white/50 dark:bg-slate-800/50 px-2 py-1 rounded-full">
                {tickets.filter(t => t.status === col.title).length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
              {tickets.filter(t => t.status === col.title).map(ticket => {
                const isSelected = selectedTickets.includes(ticket.id);
                const hasRevisions = ticket.revision_notes && ticket.revision_notes.length > 0;
                
                return (
                  <motion.div
                    layoutId={ticket.id}
                    key={ticket.id}
                    onClick={() => toggleSelect(ticket.id)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 
                      ${isSelected ? 'ring-2 ring-blue-500 bg-white dark:bg-slate-800 shadow-md' : 'bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 border border-white/40 dark:border-white/10 shadow-sm'}
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">{ticket.title}</h4>
                      {hasRevisions && col.title === 'In Progress' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); setViewHistoryTicket(ticket); }}
                          className="px-2 py-1 rounded text-[10px] font-bold tracking-wider bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/50 dark:hover:bg-red-900/80 dark:text-red-400 uppercase flex items-center gap-1 transition-colors"
                        >
                          <History className="w-3 h-3" />
                          Revision
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Revision History Side Drawer */}
      <AnimatePresence>
        {viewHistoryTicket && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setViewHistoryTicket(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-l border-white/20 dark:border-white/10 shadow-2xl z-50 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-red-500" />
                  Revision History
                </h2>
                <button onClick={() => setViewHistoryTicket(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Ticket</h3>
                  <p className="text-slate-900 dark:text-white font-medium">{viewHistoryTicket.title}</p>
                </div>

                <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 space-y-8 pb-4">
                  {viewHistoryTicket.revision_notes?.map((rev, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-red-500 rounded-full -left-[7.5px] top-1.5 ring-4 ring-white dark:ring-slate-900" />
                      <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
                        <span className="text-xs text-slate-400 block mb-2">
                          {rev.timestamp?.seconds ? new Date(rev.timestamp.seconds * 1000).toLocaleString() : 'Recent'}
                        </span>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          "{rev.note}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => { moveTicket(viewHistoryTicket.id, 'Client Review', true); setViewHistoryTicket(null); }}
                  className="w-full py-3 mt-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold flex justify-center items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <ArrowRight className="w-4 h-4" />
                  Mark as Fixed & Send to Review
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
