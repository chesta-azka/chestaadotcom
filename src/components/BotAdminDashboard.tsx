import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Lock,
  Server,
  Cpu,
  HardDrive,
  RefreshCw,
  Download,
  RotateCcw,
  Play,
  Square,
  MessageSquarePlus,
  BookOpen,
  FileSpreadsheet,
  Users,
  Search,
  Trash2,
  Plus,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  LogOut,
  Clock,
  Terminal,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';

interface ServerResources {
  state: string;
  current_state?: string;
  memory_bytes: number;
  cpu_absolute: number;
  disk_bytes: number;
  uptime: number;
}

interface KnowledgeData {
  learned_qa_cache: Record<string, any>;
  learned_facts: string[];
  leads_audit: any[];
}

type AdminTab = 'qa' | 'facts' | 'batch' | 'leads';

const STORAGE_PIN_KEY = 'chestaa_bot_admin_passcode';

function formatBytesToMB(bytes: number): string {
  if (!bytes || isNaN(bytes)) return '0.0 MB';
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatUptime(msOrSec: number): string {
  if (!msOrSec || isNaN(msOrSec) || msOrSec <= 0) return '0m';
  // Pterodactyl v1 returns uptime in milliseconds (or seconds in older versions)
  const totalSeconds = msOrSec > 10_000_000 ? Math.floor(msOrSec / 1000) : Math.floor(msOrSec);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (days > 0) return `${days}h ${hours}j ${minutes}m`;
  if (hours > 0) return `${hours}j ${minutes}m`;
  return `${ Math.max(minutes, 1) }m`;
}

function sanitizeWhatsAppNumber(raw: string): string {
  const digits = String(raw || '')
    .replace(/@s\.whatsapp\.net|@c\.us|@lid/gi, '')
    .replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('0')) {
    return `62${digits.slice(1)}`;
  }
  return digits;
}

function resolveQaAnswerText(val: any): string {
  if (typeof val === 'string') return val;
  if (val && typeof val === 'object') {
    return String(val.answer ?? val.a ?? val.response ?? val.text ?? JSON.stringify(val));
  }
  return String(val ?? '');
}

export default function BotAdminDashboard() {
  const [passcode, setPasscode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem(STORAGE_PIN_KEY) || '';
    }
    return '';
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<AdminTab>('qa');
  const [resources, setResources] = useState<ServerResources | null>(null);
  const [knowledge, setKnowledge] = useState<KnowledgeData>({
    learned_qa_cache: {},
    learned_facts: [],
    leads_audit: [],
  });

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isActionPending, setIsActionPending] = useState<boolean>(false);
  const [feedbackBanner, setFeedbackBanner] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Tab 1: Q&A Instan (/train) state
  const [qaQuestion, setQaQuestion] = useState<string>('');
  const [qaAnswer, setQaAnswer] = useState<string>('');
  const [qaSearch, setQaSearch] = useState<string>('');

  // Tab 2: Fakta AI (/learn) state
  const [factInput, setFactInput] = useState<string>('');
  const [factSearch, setFactSearch] = useState<string>('');

  // Tab 3: Batch Import state
  const [batchText, setBatchText] = useState<string>('');

  // Tab 4: Leads state
  const [leadsSearch, setLeadsSearch] = useState<string>('');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const showToast = useCallback((type: 'success' | 'error', message: string) => {
    setFeedbackBanner({ type, message });
  }, []);

  useEffect(() => {
    if (!feedbackBanner) return;
    const timer = window.setTimeout(() => setFeedbackBanner(null), 5000);
    return () => window.clearTimeout(timer);
  }, [feedbackBanner]);

  const fetchDashboardData = useCallback(
    async (activePin: string, silent = false) => {
      if (!activePin) return false;
      if (!silent) setIsRefreshing(true);
      setAuthError(null);

      try {
        const response = await fetch('/api/bot-admin?action=dashboard', {
          method: 'GET',
          headers: {
            'x-admin-passcode': activePin,
          },
        });

        const data = await response.json().catch(() => ({}));

        if (response.status === 401) {
          window.sessionStorage.removeItem(STORAGE_PIN_KEY);
          setIsAuthenticated(false);
          setPasscode('');
          setAuthError(data?.error || 'PIN Admin salah atau sesi berakhir.');
          return false;
        }

        if (!response.ok || !data?.success) {
          // If passcode was valid (not 401) but Pterodactyl env is missing or unreachable,
          // keep authenticated so admin can see the diagnostic message inside dashboard.
          window.sessionStorage.setItem(STORAGE_PIN_KEY, activePin);
          setIsAuthenticated(true);
          showToast(
            'error',
            data?.error || `Gagal memuat data dari Pterodactyl (HTTP ${response.status}).`
          );
          return true;
        }

        window.sessionStorage.setItem(STORAGE_PIN_KEY, activePin);
        setIsAuthenticated(true);
        if (data.resources) {
          setResources(data.resources);
        }
        if (data.knowledge) {
          setKnowledge({
            learned_qa_cache: data.knowledge.learned_qa_cache || {},
            learned_facts: Array.isArray(data.knowledge.learned_facts)
              ? data.knowledge.learned_facts
              : [],
            leads_audit: Array.isArray(data.knowledge.leads_audit)
              ? data.knowledge.leads_audit
              : [],
          });
        }
        return true;
      } catch (err: any) {
        setAuthError(err?.message || 'Gagal menghubungi endpoint /api/bot-admin.');
        return false;
      } finally {
        setIsRefreshing(false);
        setAuthLoading(false);
      }
    },
    [showToast]
  );

  useEffect(() => {
    if (passcode) {
      setAuthLoading(true);
      fetchDashboardData(passcode);
    }
  }, [passcode, fetchDashboardData]);

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = pinInput.trim();
    if (!trimmed) {
      setAuthError('Masukkan PIN Admin terlebih dahulu.');
      return;
    }
    setAuthLoading(true);
    const ok = await fetchDashboardData(trimmed);
    if (ok) {
      setPasscode(trimmed);
      setPinInput('');
    }
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(STORAGE_PIN_KEY);
    setPasscode('');
    setPinInput('');
    setIsAuthenticated(false);
    setResources(null);
  };

  const handleDownloadExcel = async () => {
    if (!passcode) return;
    setIsActionPending(true);
    try {
      const response = await fetch('/api/bot-admin?action=download_excel', {
        method: 'GET',
        headers: {
          'x-admin-passcode': passcode,
        },
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.url) {
        throw new Error(data?.error || 'Gagal mendapatkan tautan unduhan database_ai.xlsx.');
      }

      const anchor = document.createElement('a');
      anchor.href = data.url;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.download = 'database_ai.xlsx';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      showToast('success', 'Tautan unduhan database_ai.xlsx berhasil dibuka.');
    } catch (err: any) {
      showToast('error', err?.message || 'Gagal mengunduh database_ai.xlsx.');
    } finally {
      setIsActionPending(false);
    }
  };

  const handlePowerAction = async (signal: 'restart' | 'start' | 'stop') => {
    if (!passcode) return;
    setIsActionPending(true);
    try {
      const response = await fetch('/api/bot-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({ action: 'power', signal }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || `Gagal mengirim sinyal ${signal}.`);
      }
      showToast('success', data.message || `Sinyal ${signal} berhasil dikirim ke server.`);
      window.setTimeout(() => {
        fetchDashboardData(passcode, true);
      }, 2200);
    } catch (err: any) {
      showToast('error', err?.message || `Gagal menjalankan perintah power ${signal}.`);
    } finally {
      setIsActionPending(false);
    }
  };

  const handleAddTrain = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = qaQuestion.trim();
    const a = qaAnswer.trim();
    if (!q || !a) {
      showToast('error', 'Pertanyaan dan jawaban wajib diisi.');
      return;
    }

    setIsActionPending(true);
    try {
      const response = await fetch('/api/bot-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          action: 'add_train',
          question: q,
          answer: a,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Gagal menyimpan Q&A.');
      }
      if (data.knowledge) {
        setKnowledge(data.knowledge);
      }
      setQaQuestion('');
      setQaAnswer('');
      showToast('success', `Q&A "${q}" berhasil disimpan ke knowledge.json.`);
    } catch (err: any) {
      showToast('error', err?.message || 'Gagal menyimpan Q&A.');
    } finally {
      setIsActionPending(false);
    }
  };

  const handleDeleteQa = async (key: string) => {
    if (!passcode || !key) return;
    setIsActionPending(true);
    try {
      const response = await fetch('/api/bot-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          action: 'delete_qa',
          question: key,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Gagal menghapus Q&A.');
      }
      if (data.knowledge) {
        setKnowledge(data.knowledge);
      }
      showToast('success', `Q&A "${key}" berhasil dihapus.`);
    } catch (err: any) {
      showToast('error', err?.message || 'Gagal menghapus Q&A.');
    } finally {
      setIsActionPending(false);
    }
  };

  const handleAddLearn = async (e: React.FormEvent) => {
    e.preventDefault();
    const fact = factInput.trim();
    if (!fact) {
      showToast('error', 'Teks fakta tidak boleh kosong.');
      return;
    }

    setIsActionPending(true);
    try {
      const response = await fetch('/api/bot-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          action: 'add_learn',
          fact,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Gagal menambahkan fakta AI.');
      }
      if (data.knowledge) {
        setKnowledge(data.knowledge);
      }
      setFactInput('');
      showToast('success', 'Fakta baru berhasil ditambahkan ke knowledge.json.');
    } catch (err: any) {
      showToast('error', err?.message || 'Gagal menyimpan fakta baru.');
    } finally {
      setIsActionPending(false);
    }
  };

  const handleDeleteFact = async (index: number, factText: string) => {
    if (!passcode) return;
    setIsActionPending(true);
    try {
      const response = await fetch('/api/bot-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          action: 'delete_fact',
          index,
          fact: factText,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Gagal menghapus fakta.');
      }
      if (data.knowledge) {
        setKnowledge(data.knowledge);
      }
      showToast('success', 'Fakta berhasil dihapus dari knowledge.json.');
    } catch (err: any) {
      showToast('error', err?.message || 'Gagal menghapus fakta.');
    } finally {
      setIsActionPending(false);
    }
  };

  const handleBatchImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchText.trim()) {
      showToast('error', 'Tempelkan baris perintah /train atau /learn terlebih dahulu.');
      return;
    }

    setIsActionPending(true);
    try {
      const response = await fetch('/api/bot-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          action: 'batch_import',
          text: batchText,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Gagal memproses batch import.');
      }
      if (data.knowledge) {
        setKnowledge(data.knowledge);
      }
      setBatchText('');
      showToast(
        'success',
        data.message ||
          `Berhasil mengimpor ${data.trainedCount || 0} Q&A dan ${data.learnedCount || 0} fakta.`
      );
    } catch (err: any) {
      showToast('error', err?.message || 'Gagal menjalankan batch import.');
    } finally {
      setIsActionPending(false);
    }
  };

  // Derived lists & search filters
  const qaEntries = useMemo(() => {
    const cache = knowledge.learned_qa_cache || {};
    const list = Object.entries(cache).map(([question, rawVal]) => ({
      question,
      answer: resolveQaAnswerText(rawVal),
    }));
    const query = qaSearch.trim().toLowerCase();
    if (!query) return list;
    return list.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
    );
  }, [knowledge.learned_qa_cache, qaSearch]);

  const filteredFacts = useMemo(() => {
    const facts = Array.isArray(knowledge.learned_facts) ? knowledge.learned_facts : [];
    const mapped = facts.map((text, index) => ({ text: String(text), index }));
    const query = factSearch.trim().toLowerCase();
    if (!query) return mapped;
    return mapped.filter((item) => item.text.toLowerCase().includes(query));
  }, [knowledge.learned_facts, factSearch]);

  const batchPreviewStats = useMemo(() => {
    const lines = batchText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.startsWith('#'));
    let trainCount = 0;
    let learnCount = 0;
    for (const line of lines) {
      if (/^\/train\s+/i.test(line) && line.includes('|')) {
        trainCount++;
      } else if (/^\/learn\s+/i.test(line)) {
        learnCount++;
      } else if (line.includes('|')) {
        trainCount++;
      }
    }
    return { totalLines: lines.length, trainCount, learnCount };
  }, [batchText]);

  const filteredLeads = useMemo(() => {
    const rawLeads = Array.isArray(knowledge.leads_audit) ? knowledge.leads_audit : [];
    const normalized = rawLeads.map((lead, idx) => {
      if (typeof lead === 'string') {
        const phoneMatch = lead.match(/(?:\+?62|08)\d{7,13}/);
        const rawPhone = phoneMatch ? phoneMatch[0] : '';
        return {
          id: `lead-${idx}`,
          name: 'Prospek WhatsApp',
          phone: sanitizeWhatsAppNumber(rawPhone),
          displayPhone: rawPhone || '-',
          summary: lead,
          timestamp: '-',
          status: 'Terdata',
        };
      }
      const rawPhone =
        lead?.phone ||
        lead?.number ||
        lead?.sender ||
        lead?.jid ||
        lead?.from ||
        lead?.wa ||
        '';
      const cleanPhone = sanitizeWhatsAppNumber(rawPhone);
      const name =
        lead?.name ||
        lead?.pushName ||
        lead?.senderName ||
        lead?.clientName ||
        (cleanPhone ? `+${cleanPhone}` : `Prospek #${idx + 1}`);
      const summary =
        lead?.summary ||
        lead?.message ||
        lead?.text ||
        lead?.need ||
        lead?.notes ||
        lead?.intent ||
        JSON.stringify(lead);
      const timestamp =
        lead?.timestamp ||
        lead?.date ||
        lead?.createdAt ||
        lead?.time ||
        '-';
      const status = lead?.status || lead?.tier || lead?.stage || 'Masuk';

      return {
        id: lead?.id || `lead-${idx}`,
        name: String(name),
        phone: cleanPhone,
        displayPhone: cleanPhone ? `+${cleanPhone}` : String(rawPhone || '-'),
        summary: String(summary),
        timestamp: String(timestamp),
        status: String(status),
      };
    });

    const query = leadsSearch.trim().toLowerCase();
    if (!query) return normalized;
    return normalized.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.displayPhone.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
    );
  }, [knowledge.leads_audit, leadsSearch]);

  const serverState = (resources?.state || resources?.current_state || 'offline').toLowerCase();
  const isOnline = serverState === 'running';
  const isStarting = serverState === 'starting' || serverState === 'stopping';

  // Render PIN Authentication Gate if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-5">
            <div>
              <p className="text-xs font-mono text-slate-400">CHESTAADOTCOM · INTERNAL CONSOLE</p>
              <h1 className="text-xl font-bold text-white mt-1">Bot WhatsApp Admin Panel</h1>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed">
            Masukkan PIN Admin untuk mengakses kendali server Pterodactyl, melatih basis pengetahuan AI (<code className="text-indigo-300 font-mono text-xs">/knowledge.json</code>), dan memantau prospek WhatsApp.
          </p>

          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-start gap-3 text-xs text-rose-200">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-pin-input"
                className="block text-xs font-medium text-slate-300 mb-2"
              >
                PIN Keamanan Admin
              </label>
              <input
                id="admin-pin-input"
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan PIN Admin..."
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi Akses...</span>
                </>
              ) : (
                <>
                  <Terminal className="w-4 h-4" />
                  <span>Masuk ke Konsol Bot</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <span>Proteksi Header x-admin-passcode</span>
            <a
              href="/id"
              className="text-slate-400 hover:text-white transition-colors whitespace-nowrap"
            >
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Server Status & Control Header */}
      <header className="border-b border-slate-800 bg-slate-900/70 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Brand & Live Status */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-white tracking-tight whitespace-nowrap">
                    CHESTAADOTCOM Bot Console
                  </span>
                  <span className="text-slate-600" aria-hidden="true">
                    ·
                  </span>
                  <span
                    className={`text-xs font-mono font-semibold ${
                      isOnline
                        ? 'text-emerald-400'
                        : isStarting
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {isOnline
                      ? 'ONLINE (RUNNING)'
                      : isStarting
                      ? `TRANSISI (${serverState.toUpperCase()})`
                      : `OFFLINE (${serverState.toUpperCase()})`}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono tabular-nums mt-0.5">
                  <span className="inline-flex items-center gap-1">
                    <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                    RAM: <strong className="text-slate-200">{formatBytesToMB(resources?.memory_bytes || 0)}</strong>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-slate-500" />
                    CPU: <strong className="text-slate-200">{(resources?.cpu_absolute || 0).toFixed(1)}%</strong>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Uptime: <strong className="text-slate-200">{formatUptime(resources?.uptime || 0)}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Server Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => fetchDashboardData(passcode)}
              disabled={isRefreshing || isActionPending}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
              <span>Segarkan Data</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadExcel}
              disabled={isActionPending}
              className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh database_ai.xlsx</span>
            </button>

            <button
              type="button"
              onClick={() => handlePowerAction('restart')}
              disabled={isActionPending}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Bot</span>
            </button>

            <button
              type="button"
              onClick={() => handlePowerAction(isOnline ? 'stop' : 'start')}
              disabled={isActionPending}
              className={`px-3 py-2 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 ${
                isOnline
                  ? 'bg-rose-950/50 hover:bg-rose-900/60 border-rose-500/40 text-rose-300'
                  : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500 text-white'
              }`}
            >
              {isOnline ? (
                <>
                  <Square className="w-3.5 h-3.5" />
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Start</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              title="Keluar dari sesi Admin"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6">
        {/* Feedback Notification Banner */}
        {feedbackBanner && (
          <div
            className={`p-4 rounded-xl border flex items-center justify-between gap-4 text-sm ${
              feedbackBanner.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {feedbackBanner.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{feedbackBanner.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedbackBanner(null)}
              className="text-xs font-mono underline opacity-80 hover:opacity-100 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Summary Metric Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-xs text-slate-400">Total Q&amp;A Instan (/train)</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-white mt-1">
              {Object.keys(knowledge.learned_qa_cache || {}).length}
            </p>
            <p className="text-xs text-slate-500 mt-1">Tersimpan di learned_qa_cache</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-xs text-slate-400">Total Fakta AI (/learn)</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-indigo-400 mt-1">
              {(knowledge.learned_facts || []).length}
            </p>
            <p className="text-xs text-slate-500 mt-1">Tersimpan di learned_facts</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-xs text-slate-400">Prospek Masuk (leads_audit)</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-emerald-400 mt-1">
              {(knowledge.leads_audit || []).length}
            </p>
            <p className="text-xs text-slate-500 mt-1">Siap ditindaklanjuti via WA</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-xs text-slate-400">Pemakaian Disk Server</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-slate-200 mt-1">
              {formatBytesToMB(resources?.disk_bytes || 0)}
            </p>
            <p className="text-xs text-slate-500 mt-1">File /knowledge.json aktif</p>
          </div>
        </div>

        {/* 4 Management Tabs Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('qa')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'qa'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Q&amp;A Instan (/train)</span>
            <span className="font-mono tabular-nums opacity-80">
              ({Object.keys(knowledge.learned_qa_cache || {}).length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('facts')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'facts'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Fakta AI (/learn)</span>
            <span className="font-mono tabular-nums opacity-80">
              ({(knowledge.learned_facts || []).length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('batch')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'batch'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Batch Import</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Prospek Masuk (Leads)</span>
            <span className="font-mono tabular-nums opacity-80">
              ({(knowledge.leads_audit || []).length})
            </span>
          </button>
        </div>

        {/* TAB 1: Q&A Instan (/train) */}
        {activeTab === 'qa' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form Tambah / Update Q&A */}
            <form
              onSubmit={handleAddTrain}
              className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
            >
              <div>
                <h2 className="text-base font-bold text-white">Tambah / Perbarui Q&amp;A Instan</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Menyimpan pasangan pertanyaan dan jawaban langsung ke objek{' '}
                  <code className="text-indigo-300 font-mono">learned_qa_cache</code> di dalam{' '}
                  <code className="text-indigo-300 font-mono">/knowledge.json</code>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Pertanyaan Pelanggan (Pemicu)
                </label>
                <input
                  type="text"
                  value={qaQuestion}
                  onChange={(e) => setQaQuestion(e.target.value)}
                  placeholder="Contoh: berapa harga buat website?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Jawaban Instan Bot
                </label>
                <textarea
                  rows={5}
                  value={qaAnswer}
                  onChange={(e) => setQaAnswer(e.target.value)}
                  placeholder="Contoh: Pembuatan website dan landing page di CHESTAADOTCOM dimulai dari Rp1.200.000 dengan domain atas nama klien..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isActionPending}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Simpan ke learned_qa_cache</span>
              </button>
            </form>

            {/* Daftar Q&A */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-white">
                    Daftar Q&amp;A Tersimpan ({qaEntries.length})
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Klik item untuk menyalin ke form edit atau hapus pertanyaan yang sudah usang.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={qaSearch}
                    onChange={(e) => setQaSearch(e.target.value)}
                    placeholder="Cari pertanyaan / jawaban..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {qaEntries.length === 0 ? (
                <div className="p-8 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center space-y-2">
                  <p className="text-sm font-medium text-slate-300">
                    Belum ada Q&amp;A yang cocok di learned_qa_cache.
                  </p>
                  <p className="text-xs text-slate-500">
                    Tambahkan Q&amp;A baru melalui formulir di sebelah kiri atau lewat tab Batch Import.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-800 max-h-[540px] overflow-y-auto pr-1">
                  {qaEntries.map((item) => (
                    <div
                      key={item.question}
                      className="py-3.5 flex items-start justify-between gap-4 group"
                    >
                      <div
                        onClick={() => {
                          setQaQuestion(item.question);
                          setQaAnswer(item.answer);
                        }}
                        className="space-y-1 cursor-pointer flex-1 min-w-0"
                      >
                        <p className="text-xs font-mono font-semibold text-indigo-300 break-words">
                          Q: {item.question}
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap break-words">
                          {item.answer}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteQa(item.question)}
                        disabled={isActionPending}
                        title="Hapus Q&A ini"
                        className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/50 transition-colors shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Fakta AI (/learn) */}
        {activeTab === 'facts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form Tambah Fakta */}
            <form
              onSubmit={handleAddLearn}
              className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
            >
              <div>
                <h2 className="text-base font-bold text-white">Tambah Fakta AI (/learn)</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Menambahkan baris pengetahuan baru ke array{' '}
                  <code className="text-indigo-300 font-mono">learned_facts</code> sebagai konteks RAG bot WhatsApp.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Kalimat Fakta Resmi
                </label>
                <textarea
                  rows={5}
                  value={factInput}
                  onChange={(e) => setFactInput(e.target.value)}
                  placeholder="Contoh: CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan menerapkan skema pembayaran DP 50% di awal serta pelunasan 50% sebelum handover."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isActionPending}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Tambahkan ke learned_facts</span>
              </button>
            </form>

            {/* Daftar Fakta */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-white">
                    Daftar Fakta AI ({filteredFacts.length})
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Fakta yang digunakan bot saat menyusun jawaban kontekstual ke calon klien.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={factSearch}
                    onChange={(e) => setFactSearch(e.target.value)}
                    placeholder="Cari fakta..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {filteredFacts.length === 0 ? (
                <div className="p-8 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center space-y-2">
                  <p className="text-sm font-medium text-slate-300">
                    Belum ada fakta di learned_facts.
                  </p>
                  <p className="text-xs text-slate-500">
                    Tambahkan fakta baru melalui form di sebelah kiri atau tab Batch Import.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-800 max-h-[540px] overflow-y-auto pr-1">
                  {filteredFacts.map((fact) => (
                    <div
                      key={`${fact.index}-${fact.text.slice(0, 24)}`}
                      className="py-3.5 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="text-xs font-mono tabular-nums text-slate-500 mt-0.5 shrink-0">
                          #{fact.index + 1}
                        </span>
                        <p className="text-sm text-slate-200 leading-relaxed break-words">
                          {fact.text}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteFact(fact.index, fact.text)}
                        disabled={isActionPending}
                        title="Hapus fakta ini"
                        className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/50 transition-colors shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Batch Import */}
        {activeTab === 'batch' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-white">
                  Batch Import (/train &amp; /learn Sekaligus)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Tempelkan banyak baris sekaligus dengan format{' '}
                  <code className="text-indigo-300 font-mono">/train Pertanyaan | Jawaban</code> atau{' '}
                  <code className="text-indigo-300 font-mono">/learn Fakta</code>.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono tabular-nums text-slate-400">
                <span>Baris Valid: <strong className="text-white">{batchPreviewStats.totalLines}</strong></span>
                <span aria-hidden="true">·</span>
                <span>/train: <strong className="text-indigo-400">{batchPreviewStats.trainCount}</strong></span>
                <span aria-hidden="true">·</span>
                <span>/learn: <strong className="text-emerald-400">{batchPreviewStats.learnCount}</strong></span>
              </div>
            </div>

            <form onSubmit={handleBatchImport} className="space-y-4">
              <textarea
                rows={12}
                value={batchText}
                onChange={(e) => setBatchText(e.target.value)}
                placeholder={`/train Berapa harga pembuatan website? | Pembuatan website dan landing page mulai dari Rp1.200.000, angka final ditentukan setelah sesi audit gratis 30 menit.\n/train Bagaimana sistem pembayarannya? | DP 50% sebelum pengerjaan dimulai dan pelunasan 50% sebelum serah terima (handover).\n/learn Domain dan hosting didaftarkan penuh atas nama klien.\n/learn Co-founder CHESTAADOTCOM adalah Chesta Azka (arsitektur, produk, teknologi) dan Zeeshan (operasional & client success).`}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-500">
                  Seluruh baris akan digabungkan dengan isi <code className="font-mono">/knowledge.json</code> saat ini tanpa menghapus data lama.
                </p>

                <button
                  type="submit"
                  disabled={isActionPending || batchPreviewStats.totalLines === 0}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Jalankan Batch Import ke Server</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: Prospek Masuk (Leads) */}
        {activeTab === 'leads' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white">
                  Daftar Prospek WhatsApp Masuk ({filteredLeads.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Data terekam dari array <code className="text-indigo-300 font-mono">leads_audit</code> di dalam <code className="text-indigo-300 font-mono">/knowledge.json</code>.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={leadsSearch}
                  onChange={(e) => setLeadsSearch(e.target.value)}
                  placeholder="Cari nama, nomor WA, atau kebutuhan..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {filteredLeads.length === 0 ? (
              <div className="p-10 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center space-y-2">
                <p className="text-sm font-medium text-slate-300">
                  Belum ada data prospek di leads_audit.
                </p>
                <p className="text-xs text-slate-500">
                  Saat bot WhatsApp mencatat prospek baru ke <code className="font-mono">leads_audit</code>, daftarnya akan langsung tampil di tabel ini.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-mono text-slate-400">
                      <th className="py-3 px-4">Waktu</th>
                      <th className="py-3 px-4">Nama / Pengirim</th>
                      <th className="py-3 px-4">Nomor WhatsApp</th>
                      <th className="py-3 px-4">Ringkasan Kebutuhan / Catatan Audit</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Tindak Lanjut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-sm">
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-3 px-4 text-xs font-mono tabular-nums text-slate-400 whitespace-nowrap">
                          {lead.timestamp}
                        </td>
                        <td className="py-3 px-4 font-medium text-white whitespace-nowrap">
                          {lead.name}
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums text-xs text-slate-300 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span>{lead.displayPhone}</span>
                            {lead.phone && (
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard?.writeText(lead.phone);
                                  setCopiedPhone(lead.id);
                                  window.setTimeout(() => setCopiedPhone(null), 1500);
                                }}
                                title="Salin nomor"
                                className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-slate-200 cursor-pointer"
                              >
                                {copiedPhone === lead.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-300 max-w-md break-words leading-relaxed">
                          {lead.summary}
                        </td>
                        <td className="py-3 px-4 text-xs font-mono text-slate-400 whitespace-nowrap">
                          {lead.status}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          {lead.phone ? (
                            <a
                              href={`https://wa.me/${lead.phone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors whitespace-nowrap"
                            >
                              <span>Chat WA</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="text-xs text-slate-600 font-mono">Tanpa Nomor</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
