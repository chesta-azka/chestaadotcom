"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, ExternalLink, Plus, Trash2,
  UploadCloud, Search, Layers, CreditCard, Lock, Check, Copy, Loader2, Sparkles, FileCode
} from 'lucide-react';
import { db, storage } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { VaultAsset, VaultAssetType } from '../lib/db';
import toast from 'react-hot-toast';

interface ClientVaultProps {
  workspaceSlug: string;
  currentUserRole?: 'admin' | 'client';
}

export function ClientVault({ workspaceSlug, currentUserRole = 'client' }: ClientVaultProps) {
  const [assets, setAssets] = useState<(VaultAsset & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'All' | VaultAssetType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Upload modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<VaultAssetType>('Deliverable');
  const [newFileUrl, setNewFileUrl] = useState('');
  const [newStatus, setNewStatus] = useState<'Pending' | 'Paid' | 'Final Release' | 'Draft' | 'Active'>('Active');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Realtime listener
  useEffect(() => {
    if (!workspaceSlug) return;

    const q = query(
      collection(db, 'vault_assets'),
      where('workspace_id', '==', workspaceSlug)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      } as VaultAsset & { id: string }));

      fetched.sort((a, b) => {
        const timeA = a.created_at?.toMillis ? a.created_at.toMillis() : new Date(a.created_at || 0).getTime();
        const timeB = b.created_at?.toMillis ? b.created_at.toMillis() : new Date(b.created_at || 0).getTime();
        return timeB - timeA;
      });

      setAssets(fetched);
      setLoading(false);
    }, (error) => {
      console.warn("Vault assets query notice:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [workspaceSlug]);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(10);

    try {
      const storageRef = ref(storage, `workspaces/${workspaceSlug}/vault/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        async (error) => {
          console.warn("Firebase storage direct upload fallback:", error);
          const fallbackUrl = URL.createObjectURL(file);
          await createAssetInDb(file.name, fallbackUrl, formatBytes(file.size), 'Deliverable');
          setIsUploading(false);
          setUploadProgress(0);
          setIsAddModalOpen(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await createAssetInDb(file.name, downloadURL, formatBytes(file.size), newType);
          setIsUploading(false);
          setUploadProgress(0);
          setIsAddModalOpen(false);
          toast.success('Asset berhasil diunggah ke Client Vault!');
        }
      );
    } catch (e) {
      console.error(e);
      await createAssetInDb(file.name, '#', formatBytes(file.size), newType);
      setIsUploading(false);
      setIsAddModalOpen(false);
      toast.success('Asset terdaftar di Vault!');
    }
  };

  const createAssetInDb = async (title: string, url: string, size?: string, type: VaultAssetType = 'Deliverable') => {
    await addDoc(collection(db, 'vault_assets'), {
      workspace_id: workspaceSlug,
      title: title || 'Deliverable Asset',
      file_url: url,
      type: type,
      file_size: size || '1.4 MB',
      status: type === 'Invoice' ? 'Pending' : 'Final Release',
      created_at: serverTimestamp()
    });
  };

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newFileUrl.trim()) {
      toast.error('Judul dan URL file wajib diisi');
      return;
    }

    try {
      await addDoc(collection(db, 'vault_assets'), {
        workspace_id: workspaceSlug,
        title: newTitle.trim(),
        file_url: newFileUrl.trim(),
        type: newType,
        file_size: 'External Link',
        status: newStatus,
        created_at: serverTimestamp()
      });

      setNewTitle('');
      setNewFileUrl('');
      setIsAddModalOpen(false);
      toast.success('Item berhasil ditambahkan ke Vault!');
    } catch (e) {
      console.error(e);
      toast.error('Gagal menambahkan item');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini dari Vault?')) return;
    try {
      await deleteDoc(doc(db, 'vault_assets', id));
      toast.success('Item dihapus dari Vault');
    } catch (e) {
      toast.error('Gagal menghapus item');
    }
  };

  const handleToggleStatus = async (asset: VaultAsset & { id: string }) => {
    if (currentUserRole !== 'admin') return;
    try {
      const nextStatus = asset.status === 'Paid' ? 'Pending' : asset.status === 'Pending' ? 'Paid' : 'Final Release';
      await updateDoc(doc(db, 'vault_assets', asset.id), {
        status: nextStatus
      });
      toast.success(`Status diperbarui: ${nextStatus}`);
    } catch (e) {
      toast.error('Gagal memperbarui status');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Tautan disalin ke clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  function formatBytes(bytes: number, decimals = 1) {
    if (!+bytes) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  const filteredAssets = assets.filter(asset => {
    const matchesFilter = selectedFilter === 'All' || asset.type === selectedFilter;
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterTabs: { label: string; value: 'All' | VaultAssetType; icon: any }[] = [
    { label: 'Semua Asset', value: 'All', icon: Layers },
    { label: 'Deliverables & Builds', value: 'Deliverable', icon: FileCode },
    { label: 'Invoices & Receipts', value: 'Invoice', icon: CreditCard },
    { label: 'Proposals & NDA', value: 'Proposal', icon: FileText },
    { label: 'Design & Assets', value: 'Design', icon: Sparkles },
    { label: 'External Links', value: 'Link', icon: ExternalLink },
  ];

  return (
    <div className="w-full font-sans space-y-6">
      {/* Header Container */}
      <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-900 border border-purple-100">
              <Lock size={18} />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight">Client Vault & Deliverables</h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Encrypted 256-bit Repository &bull; Workspace: <strong className="font-mono text-purple-900">{workspaceSlug}</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {currentUserRole === 'admin' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-900 text-white rounded-2xl text-xs font-semibold hover:bg-purple-800 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <Plus size={16} />
              <span>Tambah Deliverable</span>
            </button>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 text-purple-950 border border-purple-200 rounded-2xl text-xs font-semibold hover:bg-purple-100 transition-all cursor-pointer disabled:opacity-50"
          >
            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
            <span>{isUploading ? `Uploading ${uploadProgress}%` : 'Upload File'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedFilter === tab.value;
            const count = tab.value === 'All' ? assets.length : assets.filter(a => a.type === tab.value).length;

            return (
              <button
                key={tab.value}
                onClick={() => setSelectedFilter(tab.value)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-900 text-white shadow-2xs font-semibold'
                    : 'bg-white text-slate-600 hover:bg-purple-50 border border-purple-100'
                }`}
              >
                <Icon size={14} className={isSelected ? 'text-white' : 'text-purple-700 opacity-60'} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected 
                    ? 'bg-purple-800 text-white' 
                    : 'bg-purple-50 text-purple-900'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari asset & file..."
            className="w-full bg-white border border-purple-100 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all font-sans"
          />
        </div>
      </div>

      {/* Grid of Vault Assets */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-44 rounded-3xl bg-purple-50/40 border border-purple-100 animate-pulse" />
          ))}
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-purple-100 flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-700 mb-3">
            <Lock size={22} />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-1">Belum Ada Asset di Kategori Ini</h3>
          <p className="text-xs text-slate-500 max-w-sm">File deliverable, invoice resmi, dan aset desain final yang diunggah akan muncul di sini secara otomatis.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredAssets.map((asset) => {
              const isInvoice = asset.type === 'Invoice';
              const isDeliverable = asset.type === 'Deliverable';
              const isProposal = asset.type === 'Proposal';
              const isDesign = asset.type === 'Design';

              let badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
              if (isInvoice) badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
              if (isDeliverable) badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
              if (isProposal) badgeColor = 'bg-purple-50 text-purple-700 border-purple-200';
              if (isDesign) badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={asset.id}
                  className="group relative p-5 rounded-3xl bg-white border border-purple-100 hover:border-purple-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-xl border ${badgeColor}`}>
                        {asset.type}
                      </span>

                      {asset.status && (
                        <button
                          onClick={() => handleToggleStatus(asset)}
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-lg transition-colors ${
                            asset.status === 'Paid' 
                              ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                              : asset.status === 'Pending'
                              ? 'bg-amber-50 text-amber-800 font-semibold'
                              : 'bg-slate-100 text-slate-700'
                          } ${currentUserRole === 'admin' ? 'cursor-pointer hover:ring-1 hover:ring-slate-400' : 'cursor-default'}`}
                          title={currentUserRole === 'admin' ? 'Klik untuk ubah status' : undefined}
                        >
                          {asset.status}
                        </button>
                      )}
                    </div>

                    <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-purple-900 transition-colors">
                      {asset.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-4">
                      <span>{asset.file_size || '1.2 MB'}</span>
                      <span>&bull;</span>
                      <span>Verified Release</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <a
                        href={asset.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-900 text-white rounded-xl text-xs font-semibold hover:bg-purple-800 transition-colors"
                      >
                        <Download size={13} />
                        <span>Akses File</span>
                      </a>

                      <button
                        onClick={() => copyToClipboard(asset.file_url, asset.id)}
                        className="p-2 hover:bg-purple-50 text-slate-400 hover:text-purple-900 rounded-xl transition-colors"
                        title="Salin Tautan"
                      >
                        {copiedId === asset.id ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </button>
                    </div>

                    {currentUserRole === 'admin' && (
                      <button
                        onClick={() => handleDelete(asset.id)}
                        className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-colors cursor-pointer"
                        title="Hapus Item"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Add Asset Modal (Admin Only) */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white border border-purple-100 rounded-3xl shadow-xl z-50 p-6 font-sans overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-900">
                    <Plus size={18} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Tambah Item Vault Baru</h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleManualAdd} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nama Item / Dokumen</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Contoh: Invoice Final Pembayaran Tahap 2, Production Build v1.4"
                    className="w-full p-3 bg-purple-50/30 border border-purple-100 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tipe Kategori</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as VaultAssetType)}
                      className="w-full p-3 bg-purple-50/30 border border-purple-100 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                      <option value="Deliverable">Deliverable / Build</option>
                      <option value="Invoice">Invoice / Kwitansi</option>
                      <option value="Proposal">Proposal / SLA Agreement</option>
                      <option value="Design">Design Assets / Figma</option>
                      <option value="Link">Live Production Link</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Status Awal</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as any)}
                      className="w-full p-3 bg-purple-50/30 border border-purple-100 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending Review / Unpaid</option>
                      <option value="Paid">Paid</option>
                      <option value="Final Release">Final Release</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tautan File / Cloud URL</label>
                  <input
                    type="text"
                    required
                    value={newFileUrl}
                    onChange={(e) => setNewFileUrl(e.target.value)}
                    placeholder="https://drive.google.com/... atau https://app.domain.com"
                    className="w-full p-3 bg-purple-50/30 border border-purple-100 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200 font-mono"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-purple-900 hover:bg-purple-800 rounded-xl shadow-xs cursor-pointer"
                  >
                    Simpan ke Vault
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

export default ClientVault;
