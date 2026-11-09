import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MessageSquare,
  Bot,
  User,
  ArrowRight,
  RotateCcw,
  Check,
  Shield,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import { parseLocalizedPath, getTranslation } from '../../lib/i18n';
import { useMotionMode } from '../../lib/motion';

/**
 * AgentSimulationSection
 * Fully redesigned "SIMULASI KINERJA AGENT" with two distinct side-by-side divs:
 * - DIV KIRI: Panel Percakapan Chat WhatsApp (Customer chat simulator)
 * - DIV KANAN: Panel Tindakan & Log Sistem Otomasi (System action logs & tool calls)
 */
export default function AgentSimulationSection() {
  const location = useLocation();
  const { locale } = parseLocalizedPath(location.pathname);
  const motionMode = useMotionMode();
  const isLiteOrReduced = motionMode === 'lite' || motionMode === 'reduced';

  const sectionRef = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState<number>(6);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(true);

  // Meter counter targets
  const targetCounts = {
    messages: 42,
    bookings: 11,
    handoffs: 3,
    reminders: 6,
  };

  // Interpolated counter values during steps 1 to 6
  const getStepMetrics = (step: number) => {
    switch (step) {
      case 1:
        return { messages: 2, bookings: 0, handoffs: 0, reminders: 0 };
      case 2:
        return { messages: 14, bookings: 4, handoffs: 0, reminders: 0 };
      case 3:
        return { messages: 22, bookings: 6, handoffs: 0, reminders: 0 };
      case 4:
        return { messages: 31, bookings: 8, handoffs: 3, reminders: 0 };
      case 5:
        return { messages: 37, bookings: 9, handoffs: 3, reminders: 6 };
      case 6:
      default:
        return targetCounts;
    }
  };

  const currentMetrics = isLiteOrReduced ? targetCounts : getStepMetrics(currentStep);

  // Step advancement timer loop (when user clicks Replay)
  useEffect(() => {
    if (isLiteOrReduced) {
      setCurrentStep(6);
      return;
    }

    if (!isRunning) return;

    let timerId: number | null = null;

    const advance = () => {
      setCurrentStep((prev) => {
        if (prev < 6) {
          timerId = window.setTimeout(advance, 700);
          return prev + 1;
        } else {
          setIsRunning(false);
          return 6;
        }
      });
    };

    timerId = window.setTimeout(advance, 700);

    return () => {
      if (timerId !== null) window.clearTimeout(timerId);
    };
  }, [isRunning, isLiteOrReduced]);

  // Tab visibility pause/resume handler
  useEffect(() => {
    if (isLiteOrReduced) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsRunning(false);
      } else if (hasStarted && currentStep < 6) {
        setIsRunning(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [hasStarted, currentStep, isLiteOrReduced]);

  // Replay handler
  const handleReplay = useCallback(() => {
    setCurrentStep(1);
    setIsRunning(true);
    setHasStarted(true);
  }, []);

  const t = useCallback((key: string) => getTranslation(locale, key), [locale]);

  return (
    <section
      id="alur-agent"
      ref={sectionRef}
      aria-label={t('sim.aria.section')}
      style={{
        // High-contrast Dark Obsidian & Neon Violet section tokens
        ['--sim-bg-0' as string]: '#0B0819',
        ['--sim-bg-1' as string]: '#130D2B',
        ['--sim-text' as string]: '#FFFFFF',
        ['--sim-text-2' as string]: '#EDE9FE',
        ['--sim-text-3' as string]: '#DDD6FE',
        ['--sim-label' as string]: '#C4B5FD',
        ['--sim-line' as string]: 'rgba(167, 139, 250, 0.24)',
        ['--sim-panel' as string]: '#160E36',
        ['--sim-bubble-agent' as string]: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
        ['--sim-bubble-user' as string]: '#211842',
      }}
      className="relative py-20 md:py-28 text-[#FFFFFF] overflow-hidden bg-[linear-gradient(180deg,#0B0819_0%,#130D2B_100%)] border-y border-[rgba(167,139,250,0.22)]"
    >
      {/* =========================================================================
          BACKGROUND LAYERS (static, deep obsidian depth, zero white haze wash)
          ========================================================================= */}
      {/* 1. Vivid violet & purple ambient radial glows for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 650px at 15% 25%, rgba(139, 92, 246, 0.18), transparent 70%),
            radial-gradient(circle 650px at 85% 75%, rgba(124, 58, 237, 0.16), transparent 70%)
          `,
        }}
      />

      {/* 2. Hairline 64px grid with radial mask fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 50%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 50%, transparent 100%)',
        }}
      />

      {/* =========================================================================
          MAIN LAYOUT CONTAINER (div:nth-of-type(3))
          ========================================================================= */}
      <div className="relative z-20 max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* =====================================================================
            HEADER & CONTROLS BLOCK
            ===================================================================== */}
        <div className="mb-10 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[rgba(167,139,250,0.2)]">
            <div className="max-w-[760px]">
              {/* Eyebrow & Chip */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono text-[12px] md:text-[13px] uppercase tracking-[0.1em] font-bold text-[#C4B5FD] drop-shadow-[0_1px_4px_rgba(139,92,246,0.35)]">
                  {t('sim.eyebrow')}
                </span>
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-[0.08em] font-semibold border border-[rgba(167,139,250,0.35)] bg-[#1F1744] text-[#DDD6FE] select-none">
                  {t('sim.chip')}
                </span>
              </div>

              {/* H2 Headline */}
              <h2
                style={{ color: '#FFFFFF' }}
                className="mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold tracking-[-0.02em] text-[#FFFFFF] leading-[1.25]"
              >
                {t('sim.title')}
              </h2>

              {/* Subheadline */}
              <p
                style={{ color: '#F5F3FF' }}
                className="mt-3 text-[15px] md:text-[16px] text-[#F5F3FF] leading-[1.7] max-w-[64ch] font-normal"
              >
                {t('sim.sub')}
              </p>
            </div>

            {/* Controls, Legend, and Replay Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end gap-3.5 shrink-0">
              {/* 3-Item Legend */}
              <div className="flex items-center gap-3 text-[12px] flex-wrap">
                <div className="flex items-center gap-1.5 text-[#EDE9FE] font-medium">
                  <div className="w-4 h-4 rounded-md bg-[#251A4D] border border-[rgba(167,139,250,0.3)] flex items-center justify-center shrink-0">
                    <User size={10} className="text-[#DDD6FE]" />
                  </div>
                  <span>{t('sim.legend.user')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#EDE9FE] font-medium">
                  <div className="w-4 h-4 rounded-md bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center shrink-0 shadow-xs">
                    <Bot size={10} className="text-[#FFFFFF]" />
                  </div>
                  <span>{t('sim.legend.agent')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#EDE9FE] font-medium">
                  <div className="w-4 h-4 rounded-md bg-[#251A4D] border border-[rgba(251,191,36,0.4)] flex items-center justify-center shrink-0">
                    <Shield size={10} className="text-[#FDE68A]" />
                  </div>
                  <span>{t('sim.legend.handoff')}</span>
                </div>
              </div>

              {/* Ghost Replay Button */}
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(167,139,250,0.35)] bg-[#1A1238] text-[#FFFFFF] hover:bg-[#251A4D] hover:border-[#C4B5FD] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C4B5FD] transition-colors font-sans text-[13px] font-semibold cursor-pointer shadow-sm"
                title={t('sim.button.replay')}
              >
                <RotateCcw size={14} className="text-[#C4B5FD]" />
                <span>{t('sim.button.replay')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TWO SEPARATE DIVS (KIRI: CHAT | KANAN: ACTIONS & SYSTEM LOG)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* =====================================================================
              DIV KIRI: Panel Percakapan Chat (WhatsApp Simulator)
              ===================================================================== */}
          <div className="rounded-[28px] border border-[rgba(167,139,250,0.28)] bg-[#100B26] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_50px_rgba(5,2,18,0.7)] overflow-hidden flex flex-col">
            {/* Header Div Kiri */}
            <div className="px-5 sm:px-6 py-4 border-b border-[rgba(167,139,250,0.2)] flex items-center justify-between gap-3 bg-[#160E36]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#251A4D] border border-[rgba(167,139,250,0.3)] flex items-center justify-center text-[#C4B5FD] shadow-xs">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <span className="font-mono text-[12px] uppercase tracking-[0.08em] font-bold text-[#FFFFFF] block leading-tight">
                    {t('sim.col.chat')}
                  </span>
                  <span className="text-[11px] text-[#DDD6FE] block leading-tight">
                    {t('sim.console.header')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#0B0819] px-3 py-1.5 rounded-full border border-[rgba(167,139,250,0.2)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#A7F3D0]">
                  {t('sim.console.status')}
                </span>
              </div>
            </div>

            {/* Feed Div Kiri */}
            <div className="p-5 sm:p-6 space-y-4 bg-[#100B26]">
              {/* Event 1 (08:02) */}
              <ChatEventBox isVisible={currentStep >= 1} time="08:02">
                <UserBubble text={t('sim.e1.user')} time="08:02" />
                <AgentBubble text={t('sim.e1.agent')} time="08:02" />
              </ChatEventBox>

              {/* Event 2 (08:03) */}
              <ChatEventBox isVisible={currentStep >= 2} time="08:03">
                <UserBubble text={t('sim.e2.user')} time="08:03" />
                <AgentBubble text={t('sim.e2.agent')} time="08:03" />
              </ChatEventBox>

              {/* Event 3 (09:15) */}
              <ChatEventBox isVisible={currentStep >= 3} time="09:15">
                <UserBubble text={t('sim.e3.user')} time="09:15" />
                <AgentBubble text={t('sim.e3.agent')} time="09:15" />
              </ChatEventBox>

              {/* Event 4 (10:40) - Handoff */}
              <ChatEventBox isVisible={currentStep >= 4} time="10:40">
                <UserBubble text={t('sim.e4.user')} time="10:40" />
                <StaffHandoffCard text={t('sim.e4.staffCard')} />
                <AgentBubble text={t('sim.e4.agent')} time="10:40" />
              </ChatEventBox>

              {/* Event 5 (13:00) - Background Reminder */}
              <ChatEventBox isVisible={currentStep >= 5} time="13:00">
                <div className="p-3 rounded-xl bg-[#211648] border border-[rgba(167,139,250,0.25)] text-[12px] text-[#EDE9FE] flex items-center gap-2">
                  <Clock size={13} className="text-[#C4B5FD] shrink-0" />
                  <span className="font-medium">
                    {locale === 'en'
                      ? 'Background schedule task · 6 appointment reminders dispatched.'
                      : 'Tugas latar kalender · 6 pengingat janji temu dikirim otomatis.'}
                  </span>
                </div>
              </ChatEventBox>

              {/* Event 6 (21:30) - Night booking */}
              <ChatEventBox isVisible={currentStep >= 6} time="21:30">
                <UserBubble text={t('sim.e6.user')} time="21:30" />
                <AgentBubble text={t('sim.e6.agent')} time="21:30" />
                <div className="text-[11px] font-mono text-[#DDD6FE] italic pl-1 flex items-center gap-1.5 font-medium">
                  <Sparkles size={12} className="text-[#C4B5FD] shrink-0" />
                  <span>{t('sim.e6.note')}</span>
                </div>
              </ChatEventBox>
            </div>
          </div>

          {/* =====================================================================
              DIV KANAN: Panel Tindakan & Log Sistem Otomasi (System Action Terminal)
              ===================================================================== */}
          <div className="rounded-[28px] border border-[rgba(167,139,250,0.28)] bg-[#100B26] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_50px_rgba(5,2,18,0.7)] overflow-hidden flex flex-col">
            {/* Header Div Kanan */}
            <div className="px-5 sm:px-6 py-4 border-b border-[rgba(167,139,250,0.2)] flex items-center justify-between gap-3 bg-[#160E36]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#251A4D] border border-[rgba(167,139,250,0.3)] flex items-center justify-center text-[#C4B5FD] shadow-xs">
                  <Zap size={16} />
                </div>
                <div>
                  <span className="font-mono text-[12px] uppercase tracking-[0.08em] font-bold text-[#FFFFFF] block leading-tight">
                    {t('sim.col.actions')}
                  </span>
                  <span className="text-[11px] text-[#DDD6FE] block leading-tight">
                    {locale === 'en' ? 'Automated System Execution' : 'Log Eksekusi Sistem & API'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#0B0819] px-3 py-1.5 rounded-full border border-[rgba(167,139,250,0.2)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#DDD6FE]">
                  {locale === 'en' ? 'Auto-Execute' : 'Otomasi Aktif'}
                </span>
              </div>
            </div>

            {/* Actions Feed Div Kanan */}
            <div className="p-5 sm:p-6 space-y-4 bg-[#100B26]">
              {/* Event 1 (08:02) */}
              <ActionEventBox isVisible={currentStep >= 1} time="08:02" label="Calendar API">
                <ToolCallItem
                  name={t('sim.e1.action1')}
                  status={t('sim.status.completed')}
                  isCompleted={currentStep >= 1}
                />
              </ActionEventBox>

              {/* Event 2 (08:03) */}
              <ActionEventBox isVisible={currentStep >= 2} time="08:03" label="Booking & CRM">
                <div className="space-y-2">
                  <ToolCallItem
                    name={t('sim.e2.action1')}
                    status={t('sim.status.completed')}
                    isCompleted={currentStep >= 2}
                  />
                  <ToolCallItem
                    name={t('sim.e2.action2')}
                    status={t('sim.status.completed')}
                    isCompleted={currentStep >= 2}
                  />
                  <ToolCallItem
                    name={t('sim.e2.action3')}
                    status={t('sim.status.completed')}
                    isCompleted={currentStep >= 2}
                  />
                </div>
              </ActionEventBox>

              {/* Event 3 (09:15) */}
              <ActionEventBox isVisible={currentStep >= 3} time="09:15" label="Knowledge Base">
                <ToolCallItem
                  name={t('sim.e3.action1')}
                  status={t('sim.status.completed')}
                  isCompleted={currentStep >= 3}
                />
              </ActionEventBox>

              {/* Event 4 (10:40) - Handoff */}
              <ActionEventBox isVisible={currentStep >= 4} time="10:40" label="Staff Escalation">
                <div className="space-y-2">
                  <ToolCallItem
                    name={t('sim.e4.action1')}
                    status={t('sim.status.completed')}
                    isCompleted={currentStep >= 4}
                  />
                  <ToolCallItem
                    name={t('sim.e4.action2')}
                    status={t('sim.status.handedOff')}
                    isCompleted={currentStep >= 4}
                    isHandoff
                  />
                </div>
              </ActionEventBox>

              {/* Event 5 (13:00) - Background Reminder */}
              <ActionEventBox isVisible={currentStep >= 5} time="13:00" label="Cron Schedule">
                <ToolCallItem
                  name={t('sim.e5.action1')}
                  status={t('sim.status.completed')}
                  detail={t('sim.e5.result')}
                  isCompleted={currentStep >= 5}
                />
              </ActionEventBox>

              {/* Event 6 (21:30) - Night booking */}
              <ActionEventBox isVisible={currentStep >= 6} time="21:30" label="After-Hours API">
                <div className="space-y-2">
                  <ToolCallItem
                    name={t('sim.e6.action1')}
                    status={t('sim.status.completed')}
                    isCompleted={currentStep >= 6}
                  />
                  <ToolCallItem
                    name={t('sim.e6.action2')}
                    status={t('sim.status.completed')}
                    isCompleted={currentStep >= 6}
                  />
                </div>
              </ActionEventBox>
            </div>

            {/* Bottom Summary Strip (Four Meters) in Div Kanan */}
            <div className="px-5 sm:px-6 py-5 border-t border-[rgba(167,139,250,0.22)] bg-[#160E36]">
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] font-bold text-[#C4B5FD] mb-3">
                {t('sim.summary.title')}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Meter 1: Messages processed */}
                <div className="p-3 rounded-xl bg-[#1C133E] border border-[rgba(167,139,250,0.25)]">
                  <span className="font-mono text-[24px] sm:text-[28px] font-bold text-[#FFFFFF] tabular-nums leading-none block">
                    {currentMetrics.messages}
                  </span>
                  <span className="text-[11px] text-[#DDD6FE] font-medium mt-1.5 block">
                    {t('sim.metric.messages')}
                  </span>
                </div>

                {/* Meter 2: Bookings created */}
                <div className="p-3 rounded-xl bg-[#1C133E] border border-[rgba(167,139,250,0.25)]">
                  <span className="font-mono text-[24px] sm:text-[28px] font-bold text-[#FFFFFF] tabular-nums leading-none block">
                    {currentMetrics.bookings}
                  </span>
                  <span className="text-[11px] text-[#DDD6FE] font-medium mt-1.5 block">
                    {t('sim.metric.bookings')}
                  </span>
                </div>

                {/* Meter 3: Handed off to staff */}
                <div className="p-3 rounded-xl bg-[#1C133E] border border-[rgba(167,139,250,0.25)]">
                  <span className="font-mono text-[24px] sm:text-[28px] font-bold text-[#FFFFFF] tabular-nums leading-none block">
                    {currentMetrics.handoffs}
                  </span>
                  <span className="text-[11px] text-[#DDD6FE] font-medium mt-1.5 block">
                    {t('sim.metric.handoffs')}
                  </span>
                </div>

                {/* Meter 4: Reminders sent */}
                <div className="p-3 rounded-xl bg-[#1C133E] border border-[rgba(167,139,250,0.25)]">
                  <span className="font-mono text-[24px] sm:text-[28px] font-bold text-[#FFFFFF] tabular-nums leading-none block">
                    {currentMetrics.reminders}
                  </span>
                  <span className="text-[11px] text-[#DDD6FE] font-medium mt-1.5 block">
                    {t('sim.metric.reminders')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p
          style={{ color: '#E9D5FF' }}
          className="mt-4 text-[12px] text-[#E9D5FF] text-center select-none font-medium"
        >
          {t('sim.footer.note')}
        </p>
      </div>
    </section>
  );
}

/* =============================================================================
   HELPER ATOMS FOR SEPARATE DIV KIRI & DIV KANAN
   ============================================================================= */

function ChatEventBox({
  isVisible,
  time,
  children,
}: {
  isVisible: boolean;
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 6px, 0)',
        opacity: isVisible ? 1 : 0.45,
        transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms ease-out',
      }}
      className="p-3.5 sm:p-4 rounded-2xl bg-[#19113B] border border-[rgba(167,139,250,0.28)] space-y-2.5"
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] font-bold text-[#F5F3FF] bg-[#291B5C] border border-[rgba(167,139,250,0.35)] px-2 py-0.5 rounded">
          {time}
        </span>
        <span className="text-[10px] font-mono text-[#C4B5FD] font-semibold">WhatsApp</span>
      </div>
      {children}
    </div>
  );
}

function ActionEventBox({
  isVisible,
  time,
  label,
  children,
}: {
  isVisible: boolean;
  time: string;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 6px, 0)',
        opacity: isVisible ? 1 : 0.45,
        transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms ease-out',
      }}
      className="p-3.5 sm:p-4 rounded-2xl bg-[#19113B] border border-[rgba(167,139,250,0.28)] space-y-2.5"
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] font-bold text-[#F5F3FF] bg-[#291B5C] border border-[rgba(167,139,250,0.35)] px-2 py-0.5 rounded">
          {time}
        </span>
        <span className="text-[10px] font-mono text-[#A7F3D0] font-semibold">
          {label || 'Execution'}
        </span>
      </div>
      {children}
    </div>
  );
}

function UserBubble({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tl-sm px-3.5 py-2.5 bg-[#261B4D] border border-[rgba(167,139,250,0.4)] text-[#FFFFFF] shadow-md">
        <p
          style={{ color: '#FFFFFF' }}
          className="text-[13px] sm:text-[14px] leading-[1.5] text-[#FFFFFF] font-medium"
        >
          {text}
        </p>
        <span className="text-[10px] font-mono text-[#E9D5FF] mt-1 block text-right font-semibold">
          {time}
        </span>
      </div>
    </div>
  );
}

function AgentBubble({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tr-sm px-3.5 py-2.5 bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] border border-[rgba(255,255,255,0.32)] text-[#FFFFFF] shadow-lg">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#FFFFFF] mb-1 font-bold">
          <Bot size={11} className="text-[#FFFFFF]" />
          <span>Agent</span>
        </div>
        <p
          style={{ color: '#FFFFFF' }}
          className="text-[13px] sm:text-[14px] leading-[1.5] text-[#FFFFFF] font-medium"
        >
          {text}
        </p>
        <span className="text-[10px] font-mono text-[#F5F3FF] mt-1 block text-right font-semibold">
          {time}
        </span>
      </div>
    </div>
  );
}

function StaffHandoffCard({ text }: { text: string }) {
  return (
    <div className="p-3 rounded-xl bg-[#2D1B54] border border-[rgba(251,191,36,0.5)] text-[#FFFFFF] text-[12px] leading-relaxed shadow-sm">
      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] font-bold text-[#FDE68A] mb-1">
        <Shield size={12} className="text-[#FDE68A]" />
        <span>Ringkasan untuk staf</span>
      </div>
      <p style={{ color: '#FFFFFF' }} className="text-[#FFFFFF] font-medium">
        {text}
      </p>
    </div>
  );
}

interface ToolCallItemProps {
  name: string;
  status: string;
  detail?: string;
  isCompleted?: boolean;
  isHandoff?: boolean;
}

function ToolCallItem({ name, status, detail, isCompleted = true, isHandoff = false }: ToolCallItemProps) {
  return (
    <div className="p-2.5 rounded-xl bg-[#1C133E] border border-[rgba(167,139,250,0.25)] text-[12px]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[#FFFFFF] font-medium line-clamp-1">{name}</span>
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#C4B5FD] shrink-0">
          {isHandoff ? (
            <ArrowRight size={12} className="text-[#C4B5FD]" />
          ) : (
            <Check size={12} className="text-[#A7F3D0]" />
          )}
          <span className={isHandoff ? 'text-[#C4B5FD]' : 'text-[#A7F3D0]'}>{status}</span>
        </div>
      </div>

      {/* 2px Animated Progress Line */}
      <div className="mt-2 w-full h-[2px] rounded-full bg-[rgba(255,255,255,0.12)] overflow-hidden">
        <div
          style={{
            transform: isCompleted ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="w-full h-full bg-[#A78BFA] rounded-full"
        />
      </div>

      {detail && (
        <span className="mt-1.5 block text-[11px] font-mono text-[#DDD6FE]">{detail}</span>
      )}
    </div>
  );
}
