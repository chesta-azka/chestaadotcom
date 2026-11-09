import React, { useState } from 'react';
import { Check, Lock, Mail, RotateCcw, Thermometer, AlertCircle, PackageCheck } from 'lucide-react';

interface DefectLogEntry {
  id: string;
  timestamp: string;
  shift: string;
  temperature: string;
  goodStock: number;
  defectCount: number;
  defectReason: string;
  notifyEmail: string;
  isAlert: boolean;
}

export default function MobileDefectStockSimulator({ isEn = false }: { isEn?: boolean }) {
  const defaultEmail = ['chesta', 'code', '@', 'gmail.com'].join('');

  const shiftOptions = isEn
    ? ['Shift 1 · Morning (06:00)', 'Shift 2 · Afternoon (14:00)', 'Shift 3 · Night (22:00)']
    : ['Shift 1 · Pagi (06:00)', 'Shift 2 · Siang (14:00)', 'Shift 3 · Malam (22:00)'];

  const defectReasons = isEn
    ? [
        'Leaking packaging seal',
        'Crooked bottle cap',
        'Chiller temp spike',
        'Loading handling damage',
      ]
    : [
        'Segel kemasan bocor',
        'Tutup botol miring',
        'Suhu ruang penyimpanan naik',
        'Jatuh saat bongkar muat',
      ];

  const [selectedShift, setSelectedShift] = useState(shiftOptions[0]);
  const [temperature, setTemperature] = useState('3.6');
  const [goodStock, setGoodStock] = useState('240');
  const [defectCount, setDefectCount] = useState('4');
  const [selectedReason, setSelectedReason] = useState(defectReasons[0]);
  const [notifyEmail, setNotifyEmail] = useState(defaultEmail);

  const [submitPhase, setSubmitPhase] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [emailCopied, setEmailCopied] = useState(false);
  const [logs, setLogs] = useState<DefectLogEntry[]>([
    {
      id: 'LOG-091',
      timestamp: '06:02:14 WIB',
      shift: isEn ? 'Shift 1 · Morning (06:00)' : 'Shift 1 · Pagi (06:00)',
      temperature: '3.4',
      goodStock: 250,
      defectCount: 3,
      defectReason: isEn ? 'Crooked bottle cap' : 'Tutup botol miring',
      notifyEmail: defaultEmail,
      isAlert: false,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitPhase === 'submitting') return;

    setSubmitPhase('submitting');

    // Trigger green checkmark success state after exactly 200ms so field staff get immediate certainty
    window.setTimeout(() => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} WIB`;
      const tempNum = parseFloat(temperature) || 0;
      const defNum = parseInt(defectCount, 10) || 0;
      const goodNum = parseInt(goodStock, 10) || 0;
      const isAlert = tempNum > 5.0 || defNum >= 10;

      const newEntry: DefectLogEntry = {
        id: `LOG-${Math.floor(100 + Math.random() * 899)}`,
        timestamp: timeStr,
        shift: selectedShift,
        temperature: tempNum.toFixed(1),
        goodStock: goodNum,
        defectCount: defNum,
        defectReason: selectedReason,
        notifyEmail: notifyEmail.trim() || defaultEmail,
        isAlert,
      };

      setLogs((prev) => [newEntry, ...prev.slice(0, 3)]);
      setSubmitPhase('success');
    }, 200);
  };

  const handleResetForm = () => {
    setSubmitPhase('idle');
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(defaultEmail);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // Fallback ignore
    }
  };

  return (
    <section
      aria-label={
        isEn
          ? 'Interactive Mobile Stock, Temperature, and Defective Goods Input Simulator'
          : 'Simulasi Interaktif Layar Input Stok, Suhu, dan Barang Gagal via HP'
      }
      className="my-8 rounded-[24px] border-2 border-[rgba(91,60,196,0.22)] bg-[#F8F6FE] p-5 md:p-7 shadow-[0_8px_30px_rgba(91,60,196,0.06)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[rgba(91,60,196,0.14)]">
        <div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
            <PackageCheck size={14} />
            <span>
              {isEn
                ? 'INTERACTIVE FIELD SIMULATOR · 200MS SUCCESS FEEDBACK'
                : 'SIMULASI LAYAR HP STAF LAPANGAN · ANIMASI SUKSES 200MS'}
            </span>
          </span>
          <h3 className="text-[18px] md:text-[20px] font-semibold text-[#17122B] mt-1">
            {isEn
              ? 'Try the Mobile Stock, Chiller Temperature & Defective Goods Form'
              : 'Coba Simulasi Input Stok, Suhu Chiller & Barang Gagal di HP'}
          </h3>
        </div>

        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FFFFFF] hover:bg-[#EFEAFB] border border-[rgba(91,60,196,0.2)] font-mono text-[12px] text-[#17122B] transition-colors cursor-pointer"
          title={isEn ? 'Copy official email' : 'Salin email resmi'}
        >
          <Mail size={13} className="text-[#6A3FD0]" />
          <span>{defaultEmail}</span>
          {emailCopied && (
            <span className="text-[11px] font-semibold text-[#059669]">
              {isEn ? '(Copied!)' : '(Tersalin!)'}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Phone Input Screen Frame */}
        <div className="lg:col-span-6 rounded-[22px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(91,60,196,0.1)]">
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#5B5675] font-semibold">
              {isEn ? 'MOBILE SHIFT INPUT FORM' : 'FORM INPUT SHIFT VIA HP'}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#059669] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
              <Lock size={11} />
              <span>{isEn ? 'Auto Server Time' : 'Jam Server Otomatis'}</span>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Shift selector */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[#5B5675] mb-1.5">
                {isEn ? '1. Select Active Shift' : '1. Pilih Shift Kerja'}
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {shiftOptions.map((shift) => {
                  const active = selectedShift === shift;
                  return (
                    <button
                      key={shift}
                      type="button"
                      onClick={() => {
                        setSelectedShift(shift);
                        if (submitPhase === 'success') setSubmitPhase('idle');
                      }}
                      className={`text-left px-3.5 py-2 rounded-[12px] text-[13px] font-medium border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#EFEAFB] border-[#6A3FD0] text-[#17122B] font-semibold'
                          : 'bg-[#F8F6FE] border-[rgba(91,60,196,0.12)] text-[#5B5675] hover:text-[#17122B]'
                      }`}
                    >
                      {shift}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Numeric inputs: Chiller Temp, Good Stock, Defective Count */}
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label
                  htmlFor="sim-chiller-temp"
                  className="block font-mono text-[10.5px] uppercase tracking-[0.05em] text-[#5B5675] mb-1"
                >
                  {isEn ? 'Chiller (°C)' : 'Suhu (°C)'}
                </label>
                <div className="relative">
                  <input
                    id="sim-chiller-temp"
                    type="number"
                    step="0.1"
                    inputMode="decimal"
                    value={temperature}
                    onChange={(e) => {
                      setTemperature(e.target.value);
                      if (submitPhase === 'success') setSubmitPhase('idle');
                    }}
                    className="w-full px-3 py-2 rounded-[12px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.2)] font-mono text-[15px] font-semibold text-[#17122B] focus:outline-none focus:border-[#6A3FD0]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="sim-good-stock"
                  className="block font-mono text-[10.5px] uppercase tracking-[0.05em] text-[#5B5675] mb-1"
                >
                  {isEn ? 'Good Stock' : 'Stok Baik'}
                </label>
                <input
                  id="sim-good-stock"
                  type="number"
                  inputMode="numeric"
                  value={goodStock}
                  onChange={(e) => {
                    setGoodStock(e.target.value);
                    if (submitPhase === 'success') setSubmitPhase('idle');
                  }}
                  className="w-full px-3 py-2 rounded-[12px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.2)] font-mono text-[15px] font-semibold text-[#17122B] focus:outline-none focus:border-[#6A3FD0]"
                />
              </div>

              <div>
                <label
                  htmlFor="sim-defect-count"
                  className="block font-mono text-[10.5px] uppercase tracking-[0.05em] text-[#5B5675] mb-1"
                >
                  {isEn ? 'Defects (Pcs)' : 'Barang Gagal'}
                </label>
                <input
                  id="sim-defect-count"
                  type="number"
                  inputMode="numeric"
                  value={defectCount}
                  onChange={(e) => {
                    setDefectCount(e.target.value);
                    if (submitPhase === 'success') setSubmitPhase('idle');
                  }}
                  className="w-full px-3 py-2 rounded-[12px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.2)] font-mono text-[15px] font-semibold text-[#17122B] focus:outline-none focus:border-[#6A3FD0]"
                />
              </div>
            </div>

            {/* Quick-tap Defect Reason */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[#5B5675] mb-1.5">
                {isEn ? '2. Tap Defect Category' : '2. Pilih Kategori Barang Gagal'}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {defectReasons.map((reason) => {
                  const active = selectedReason === reason;
                  return (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => {
                        setSelectedReason(reason);
                        if (submitPhase === 'success') setSubmitPhase('idle');
                      }}
                      className={`px-3 py-2 rounded-[10px] text-left text-[12px] leading-snug border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#EFEAFB] border-[#6A3FD0] text-[#17122B] font-semibold'
                          : 'bg-[#F8F6FE] border-[rgba(91,60,196,0.12)] text-[#5B5675] hover:text-[#17122B]'
                      }`}
                    >
                      {reason}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Alert Email Notification Target */}
            <div>
              <label
                htmlFor="sim-notify-email"
                className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[#5B5675] mb-1"
              >
                {isEn
                  ? '3. Supervisor Alert Email'
                  : '3. Email Notifikasi Supervisor / Owner'}
              </label>
              <input
                id="sim-notify-email"
                type="email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-[12px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.2)] font-mono text-[13px] text-[#17122B] focus:outline-none focus:border-[#6A3FD0]"
              />
            </div>

            {/* Submit Button + 200ms Animated Green Checkmark Confirmation */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={submitPhase === 'submitting'}
                className={`w-full min-h-[48px] px-5 py-3 rounded-[14px] font-semibold text-[14px] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer ${
                  submitPhase === 'success'
                    ? 'bg-[#059669] text-[#FFFFFF] shadow-[0_6px_20px_rgba(5,150,105,0.28)]'
                    : 'bg-[#6A3FD0] hover:bg-[#5230B0] text-[#FFFFFF]'
                }`}
              >
                {submitPhase === 'submitting' && (
                  <span className="font-mono text-[13px]">
                    {isEn ? 'Locking server timestamp...' : 'Mengunci jam server...'}
                  </span>
                )}

                {submitPhase === 'idle' && (
                  <span>
                    {isEn
                      ? 'Submit Shift Report (200ms Feedback)'
                      : 'Simpan Laporan Shift (Umpan Balik 200ms)'}
                  </span>
                )}

                {submitPhase === 'success' && (
                  <>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFFFFF] text-[#059669] scale-100 transition-transform duration-200">
                      <Check size={16} strokeWidth={3} />
                    </span>
                    <span>
                      {isEn
                        ? 'Data Sent & Locked in Server!'
                        : 'Data Terkirim & Terkunci di Server!'}
                    </span>
                  </>
                )}
              </button>

              {/* Animated Green Confirmation Banner appearing after 200ms */}
              <div
                aria-live="polite"
                className={`transition-all duration-200 overflow-hidden ${
                  submitPhase === 'success'
                    ? 'max-h-[160px] opacity-100 mt-3'
                    : 'max-h-0 opacity-0 mt-0'
                }`}
              >
                <div className="p-3.5 rounded-[14px] bg-[#ECFDF5] border border-[#10B981] flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#10B981] text-[#FFFFFF] shrink-0 shadow-sm">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <div className="text-[12.5px] text-[#065F46] leading-snug">
                      <p className="font-semibold text-[#047857]">
                        {isEn
                          ? 'Green Checkmark Confirmed (200ms): Stock & defect log saved'
                          : 'Centang Hijau Aktif (200ms): Data stok & barang gagal resmi tercatat'}
                      </p>
                      <p className="mt-0.5">
                        {isEn
                          ? `Append-only log locked and notification routed to ${notifyEmail || defaultEmail}.`
                          : `Baris tambah-saja (append-only) dikunci dan salinan laporan dikirim ke ${notifyEmail || defaultEmail}.`}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-[#047857] hover:underline shrink-0 cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>{isEn ? 'Input again' : 'Input lagi'}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Live Append-Only Audit Log Preview */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
              {isEn
                ? 'LIVE APPEND-ONLY SERVER LOG (READ-ONLY FOR STAFF)'
                : 'RIWAYAT CATATAN SERVER (APPEND-ONLY · TIDAK BISA DIHAPUS STAF)'}
            </span>
          </div>

          <div className="space-y-2.5">
            {logs.map((entry, idx) => (
              <div
                key={`${entry.id}-${idx}`}
                className={`p-4 rounded-[16px] bg-[#FFFFFF] border transition-all duration-200 ${
                  idx === 0 && submitPhase === 'success'
                    ? 'border-[#10B981] ring-2 ring-[#10B981]/20'
                    : 'border-[rgba(91,60,196,0.14)]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-[rgba(91,60,196,0.08)]">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="font-mono text-[12px] font-semibold text-[#17122B]">
                      {entry.id}
                    </span>
                    <span className="text-[12px] text-[#5B5675]">· {entry.shift}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#6A3FD0] bg-[#F8F6FE] px-2.5 py-0.5 rounded-full border border-[rgba(91,60,196,0.14)]">
                    {entry.timestamp}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[12.5px] mb-2">
                  <div className="p-2 rounded-[10px] bg-[#F8F6FE]">
                    <span className="block font-mono text-[10px] uppercase text-[#5B5675]">
                      {isEn ? 'Chiller Temp' : 'Suhu Chiller'}
                    </span>
                    <span className="font-mono font-semibold text-[#17122B] inline-flex items-center gap-1">
                      <Thermometer size={12} className="text-[#6A3FD0]" />
                      {entry.temperature} °C
                    </span>
                  </div>
                  <div className="p-2 rounded-[10px] bg-[#F8F6FE]">
                    <span className="block font-mono text-[10px] uppercase text-[#5B5675]">
                      {isEn ? 'Good Stock' : 'Stok Baik'}
                    </span>
                    <span className="font-mono font-semibold text-[#17122B]">
                      {entry.goodStock} pcs
                    </span>
                  </div>
                  <div className="p-2 rounded-[10px] bg-[#F8F6FE]">
                    <span className="block font-mono text-[10px] uppercase text-[#5B5675]">
                      {isEn ? 'Defects' : 'Barang Gagal'}
                    </span>
                    <span className="font-mono font-semibold text-[#17122B]">
                      {entry.defectCount} pcs
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#5B5675]">
                  <span>
                    <strong className="text-[#17122B]">
                      {isEn ? 'Reason:' : 'Alasan:'}
                    </strong>{' '}
                    {entry.defectReason}
                  </span>
                  <span className="font-mono text-[11px] text-[#059669]">
                    {isEn ? `Sent to ${entry.notifyEmail}` : `Terkirim ke ${entry.notifyEmail}`}
                  </span>
                </div>

                {entry.isAlert && (
                  <div className="mt-2 px-3 py-1.5 rounded-[10px] bg-[#FFFBEB] border border-[#FCD34D] text-[#92400E] text-[11.5px] flex items-center gap-1.5">
                    <AlertCircle size={13} className="shrink-0" />
                    <span>
                      {isEn
                        ? `Threshold exceeded! Instant WhatsApp & email alert triggered to ${entry.notifyEmail}.`
                        : `Melewati ambang batas aman! Peringatan instan WhatsApp & email dikirim ke ${entry.notifyEmail}.`}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
