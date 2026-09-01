"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKanban } from '../hooks/useKanban';
import { KanbanTicket, TicketStatus } from '../lib/db';
import { 
  CheckCircle2, Clock, AlertCircle, PlayCircle, Plus, 
  Trash2, X, ArrowRight, ArrowLeft, History, Search, 
  Check 
} from 'lucide-react';
import toast from 'react-hot-toast';

export function AdminKanbanBoard({ workspaceSlug }: { workspaceSlug: string }) {
  const { tickets, loading, addTicket, deleteTicket, moveTicket } = useKanban(workspaceSlug);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [viewHistoryTicket, setViewHistoryTicket] = useState<(KanbanTicket & { id: string }) | null>(null);
  
  // New ticket modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newStatus, setNewStatus] = useState<TicketStatus>('Backlog');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [newTag, setNewTag] = useState('Feature');
  const [searchQuery, setSearchQuery] = useState('');

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        setIsAddModalOpen(true);
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
    toast.success(`${selectedTickets.length} tiket dipindahkan ke ${status}`);
    setSelectedTickets([]);
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      await addTicket(newTitle, newStatus, newDesc, newTag, newPriority);
      setNewTitle('');
      setNewDesc('');
      setIsAddModalOpen(false);
      toast.success('Tiket baru berhasil dibuat!');
    } catch (e) {
      toast.error('Gagal menambahkan tiket');
    }
  };

  const handleDeleteTicket = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm('Hapus tiket ini?')) return;
    try {
      await deleteTicket(id);
      toast.success('Tiket dihapus');
    } catch (e) {
      toast.error('Gagal menghapus tiket');
    }
  };

  const getNextStatus = (current: TicketStatus): TicketStatus | null => {
    if (current === 'Backlog') return 'In Progress';
    if (current === 'In Progress') return 'Client Review';
    if (current === 'Client Review') return 'Deployed';
    return null;
  };

  const getPrevStatus = (current: TicketStatus): TicketStatus | null => {
    if (current === 'Deployed') return 'Client Review';
    if (current === 'Client Review') return 'In Progress';
    if (current === 'In Progress') return 'Backlog';
    return null;
  };

  if (loading) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center font-sans space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-purple-900 border-t-transparent animate-spin" />
        <span className="text-sm font-medium text-slate-500">Menghubungkan Kanban Database...</span>
      </div>
    );
  }

  const columns: { title: TicketStatus; icon: any; color: string; headerColor: string }[] = [
    { title: 'Backlog', icon: Clock, color: 'bg-purple-50/20 border-purple-100', headerColor: 'text-slate-700' },
    { title: 'In Progress', icon: PlayCircle, color: 'bg-purple-50/40 border-purple-100', headerColor: 'text-purple-900' },
    { title: 'Client Review', icon: AlertCircle, color: 'bg-amber-50/40 border-amber-200', headerColor: 'text-amber-800' },
    { title: 'Deployed', icon: CheckCircle2, color: 'bg-emerald-50/40 border-emerald-200', headerColor: 'text-emerald-700' },
  ];

  const filteredTickets = tickets.filter(t => {
    return t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
           (t.tag && t.tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="w-full font-sans space-y-6">
      {/* Top Controls: Legend, Search & Action Buttons */}
      <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span>Backlog ({tickets.filter(t => t.status === 'Backlog').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
            <span>In Progress ({tickets.filter(t => t.status === 'In Progress').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Client Review ({tickets.filter(t => t.status === 'Client Review').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Deployed ({tickets.filter(t => t.status === 'Deployed').length})</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="relative w-full md:w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tiket..."
              className="w-full pl-8 pr-3 py-1.5 bg-purple-50/30 border border-purple-100 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-900 text-white rounded-xl text-xs font-bold hover:bg-purple-800 transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            <Plus size={15} />
            <span>Tambah Tiket</span>
          </button>
        </div>
      </div>

      {/* Bulk Action Bar */}
      <AnimatePresence>
        {selectedTickets.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-purple-950 text-white rounded-2xl flex items-center justify-between shadow-md px-5"
          >
            <span className="text-xs font-semibold">{selectedTickets.length} tiket dipilih</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleBulkMove('In Progress')} 
                className="px-3 py-1 text-xs font-medium bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors cursor-pointer"
              >
                Ke In Progress
              </button>
              <button 
                onClick={() => handleBulkMove('Client Review')} 
                className="px-3 py-1 text-xs font-medium bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors cursor-pointer"
              >
                Ke Review
              </button>
              <button 
                onClick={() => handleBulkMove('Deployed')} 
                className="px-3 py-1 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
              >
                Approve & Deploy
              </button>
              <button 
                onClick={() => setSelectedTickets([])} 
                className="px-2.5 py-1 text-xs text-purple-200 hover:text-white"
              >
                Batal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4-Column Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {columns.map(col => {
          const colTickets = filteredTickets.filter(t => t.status === col.title);
          const ColIcon = col.icon;

          return (
            <div 
              key={col.title} 
              className={`rounded-3xl p-4 flex flex-col gap-3 border shadow-xs ${col.color} min-h-[450px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1 py-1">
                <div className="flex items-center gap-2">
                  <ColIcon size={16} className={col.headerColor} />
                  <h3 className="font-bold text-slate-900 text-xs tracking-tight uppercase">
                    {col.title}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded-full border border-purple-100">
                  {colTickets.length}
                </span>
              </div>

              {/* Tickets List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-0.5">
                {colTickets.length === 0 ? (
                  <div className="h-24 border border-dashed border-purple-200 rounded-2xl flex items-center justify-center text-slate-400 text-xs font-mono">
                    Kosong
                  </div>
                ) : (
                  colTickets.map(ticket => {
                    const isSelected = selectedTickets.includes(ticket.id);
                    const hasRevisions = ticket.revision_notes && ticket.revision_notes.length > 0;
                    const nextSt = getNextStatus(ticket.status);
                    const prevSt = getPrevStatus(ticket.status);

                    let priorityColor = 'bg-slate-100 text-slate-700';
                    if (ticket.priority === 'High') priorityColor = 'bg-rose-50 text-rose-700 border border-rose-200';
                    if (ticket.priority === 'Medium') priorityColor = 'bg-amber-50 text-amber-700 border border-amber-200';

                    return (
                      <motion.div
                        layout
                        layoutId={ticket.id}
                        key={ticket.id}
                        onClick={() => toggleSelect(ticket.id)}
                        className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-200 select-none ${
                          isSelected 
                            ? 'ring-2 ring-purple-900 bg-white shadow-md' 
                            : 'bg-white hover:bg-purple-50/30 border border-purple-100 shadow-xs'
                        }`}
                      >
                        {/* Tags & Priority */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-semibold bg-purple-50 text-purple-900 px-2 py-0.5 rounded-md border border-purple-100">
                              {ticket.tag || 'Feature'}
                            </span>
                            {ticket.priority && (
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${priorityColor}`}>
                                {ticket.priority}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={(e) => handleDeleteTicket(e, ticket.id)}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 p-1 rounded-md transition-opacity cursor-pointer"
                            title="Hapus Tiket"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        {/* Title & Description */}
                        <h4 className="font-bold text-slate-900 text-xs leading-snug mb-1">
                          {ticket.title}
                        </h4>
                        {ticket.description && (
                          <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
                            {ticket.description}
                          </p>
                        )}

                        {/* Revision Notification Badge */}
                        {hasRevisions && (
                          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setViewHistoryTicket(ticket); }}
                              className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-rose-50 hover:bg-rose-100 text-rose-800 uppercase flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <History size={12} />
                              <span>{ticket.revision_notes?.length} Catatan Revisi</span>
                            </button>
                          </div>
                        )}

                        {/* Quick Column Shift Controls */}
                        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                          {prevSt ? (
                            <button
                              onClick={(e) => { e.stopPropagation(); moveTicket(ticket.id, prevSt); }}
                              className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 hover:text-slate-900 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title={`Kembalikan ke ${prevSt}`}
                            >
                              <ArrowLeft size={12} />
                              <span className="hidden sm:inline">{prevSt}</span>
                            </button>
                          ) : <div />}

                          {nextSt ? (
                            <button
                              onClick={(e) => { e.stopPropagation(); moveTicket(ticket.id, nextSt); }}
                              className="flex items-center gap-1 text-[10px] font-semibold text-purple-900 hover:text-purple-700 p-1 hover:bg-purple-50 rounded-lg transition-colors ml-auto cursor-pointer"
                              title={`Pindahkan ke ${nextSt}`}
                            >
                              <span className="hidden sm:inline">{nextSt}</span>
                              <ArrowRight size={12} />
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 ml-auto">
                              <Check size={12} />
                              <span>Live Deployed</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Quick Add Button inside Column */}
              <button
                onClick={() => { setNewStatus(col.title); setIsAddModalOpen(true); }}
                className="w-full py-2 border border-dashed border-purple-200 rounded-2xl text-[11px] font-semibold text-slate-500 hover:text-purple-900 hover:bg-purple-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
              >
                <Plus size={13} />
                <span>Tambah ke {col.title}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Revision History Side Drawer */}
      <AnimatePresence>
        {viewHistoryTicket && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setViewHistoryTicket(null)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-50"
            />
            <motion.div 
              initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-purple-100 shadow-2xl z-50 p-6 overflow-y-auto font-sans"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-rose-600">
                  <History size={20} />
                  <h3 className="font-bold text-slate-900 text-base">Riwayat Revisi Klien</h3>
                </div>
                <button 
                  onClick={() => setViewHistoryTicket(null)} 
                  className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-5">
                <div className="p-4 bg-purple-50/40 rounded-2xl border border-purple-100">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Tiket Terkait</span>
                  <p className="text-slate-900 font-bold text-sm">{viewHistoryTicket.title}</p>
                </div>

                <div className="relative border-l-2 border-purple-100 ml-3 space-y-6 pb-4">
                  {viewHistoryTicket.revision_notes?.map((rev, idx) => (
                    <div key={idx} className="relative pl-5">
                      <div className="absolute w-3 h-3 bg-rose-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                      <div className="p-4 bg-white border border-purple-100 rounded-2xl shadow-xs space-y-1.5">
                        <span className="text-[10px] text-slate-400 font-mono block">
                          {typeof rev.timestamp === 'string' ? new Date(rev.timestamp).toLocaleString('id-ID') : 'Baru saja'}
                        </span>
                        <p className="text-xs text-slate-800 leading-relaxed font-sans">
                          "{rev.note}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => { 
                    moveTicket(viewHistoryTicket.id, 'Client Review', true); 
                    setViewHistoryTicket(null); 
                    toast.success('Tiket ditandai sudah diperbaiki dan dikirim kembali ke Client Review');
                  }}
                  className="w-full py-3.5 bg-purple-900 hover:bg-purple-800 text-white rounded-2xl font-bold text-xs flex justify-center items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <CheckCircle2 size={16} />
                  <span>Selesai Diperbaiki &bull; Kirim ke Client Review</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Ticket Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white border border-purple-100 rounded-3xl shadow-xl z-50 p-6 font-sans"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-900">
                    <Plus size={18} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Buat Tiket Pekerjaan Baru</h3>
                </div>
                <button 
                  onClick={() => setIsAddModalOpen(false)} 
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Judul Task / Fitur</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Contoh: Integrasi WhatsApp Workflow & Direct Transfer"
                    className="w-full p-3 bg-purple-50/30 border border-purple-100 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Deskripsi Teknis (Opsional)</label>
                  <textarea
                    rows={3}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Detail implementasi atau acceptance criteria..."
                    className="w-full p-3 bg-purple-50/30 border border-purple-100 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200 resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Kolom Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as TicketStatus)}
                      className="w-full p-2.5 bg-purple-50/30 border border-purple-100 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                      <option value="Backlog">Backlog</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Client Review">Client Review</option>
                      <option value="Deployed">Deployed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Prioritas</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as any)}
                      className="w-full p-2.5 bg-purple-50/30 border border-purple-100 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tag</label>
                    <select
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full p-2.5 bg-purple-50/30 border border-purple-100 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                      <option value="Feature">Feature</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Design">Design</option>
                      <option value="Bugfix">Bugfix</option>
                      <option value="Deployment">Deployment</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-purple-900 hover:bg-purple-800 rounded-xl shadow-xs cursor-pointer"
                  >
                    Buat Tiket
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminKanbanBoard;
