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
} from 'lucide-react';
import { parseLocalizedPath, getTranslation } from '../../lib/i18n';
import { useMotionMode } from '../../lib/motion';

/**
 * AgentSimulationSection
 * Fully redesigned "SIMULASI KINERJA AGENT" section with strict section-scoped tokens,
 * high-contrast color hierarchy (body >= 7:1, muted/labels >= 4.5:1), single purple accent,
 * static composite background with 120px edge blending, deterministic 6-event timeline,
 * accessible screen-reader feed, and zero layout shift.
 */
export default function AgentSimulationSection() {
  const location = useLocation();
  const { locale } = parseLocalizedPath(location.pathname);
  const motionMode = useMotionMode();
  const isLiteOrReduced = motionMode === 'lite' || motionMode === 'reduced';

  const sectionRef = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState<number>(isLiteOrReduced ? 6 : 1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(isLiteOrReduced);

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

  // Step advancement timer loop
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
          timerId = window.setTimeout(advance, 1150);
          return prev + 1;
        } else {
          setIsRunning(false);
          return 6;
        }
      });
    };

    timerId = window.setTimeout(advance, 1150);

    return () => {
      if (timerId !== null) window.clearTimeout(timerId);
    };
  }, [isRunning, isLiteOrReduced]);

  // Viewport trigger (starts once when 40% visible)
  useEffect(() => {
    if (isLiteOrReduced || hasStarted) return;

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.38) {
          setHasStarted(true);
          setIsRunning(true);
          observer.disconnect();
        }
      },
      { threshold: [0.2, 0.4, 0.6] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted, isLiteOrReduced]);

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
          MAIN LAYOUT CONTAINER (12 Columns Desktop, Stacked Mobile)
          ========================================================================= */}
      <div className="relative z-20 max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* =====================================================================
              LEFT 5 COLUMNS: Eyebrow, H2, Subheadline, Legend, Replay Button
              ===================================================================== */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
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
            <h2 className="mt-3 text-[clamp(1.6rem,2.8vw,2.25rem)] font-bold tracking-[-0.02em] text-[#FFFFFF] leading-[1.25]">
              {t('sim.title')}
            </h2>

            {/* Subheadline (max 56ch) - Crisp light violet-white text for maximum readability */}
            <p className="mt-3.5 text-[15px] md:text-[16px] text-[#EDE9FE] leading-[1.7] max-w-[56ch] font-normal">
              {t('sim.sub')}
            </p>

            {/* 3-Item Legend */}
            <div className="mt-7 pt-6 border-t border-[rgba(167,139,250,0.22)] space-y-3 text-[13px]">
              <div className="flex items-center gap-2.5 text-[#EDE9FE] font-medium">
                <div className="w-5 h-5 rounded-md bg-[#251A4D] border border-[rgba(167,139,250,0.3)] flex items-center justify-center shrink-0">
                  <User size={12} className="text-[#DDD6FE]" />
                </div>
                <span>{t('sim.legend.user')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#EDE9FE] font-medium">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center shrink-0 shadow-xs">
                  <Bot size={12} className="text-[#FFFFFF]" />
                </div>
                <span>{t('sim.legend.agent')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#EDE9FE] font-medium">
                <div className="w-5 h-5 rounded-md bg-[#251A4D] border border-[rgba(167,139,250,0.3)] flex items-center justify-center shrink-0">
                  <Shield size={12} className="text-[#C4B5FD]" />
                </div>
                <span>{t('sim.legend.handoff')}</span>
              </div>
            </div>

            {/* Ghost Replay Button */}
            <div className="mt-7">
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[rgba(167,139,250,0.35)] bg-[#1A1238] text-[#FFFFFF] hover:bg-[#251A4D] hover:border-[#C4B5FD] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C4B5FD] transition-colors font-sans text-[13px] font-semibold cursor-pointer shadow-sm"
                title={t('sim.button.replay')}
              >
                <RotateCcw size={14} className="text-[#C4B5FD]" />
                <span>{t('sim.button.replay')}</span>
              </button>
            </div>
          </div>

          {/* =====================================================================
              RIGHT 7 COLUMNS: The High-Contrast Simulation Console
              ===================================================================== */}
          <div className="lg:col-span-7">
            <div
              className="rounded-[28px] border border-[rgba(167,139,250,0.28)] bg-[#100B26] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_60px_rgba(5,2,18,0.7)] overflow-hidden"
            >
              {/* Console Header Row */}
              <div className="px-5 sm:px-6 py-4 border-b border-[rgba(167,139,250,0.2)] flex items-center justify-between gap-3 bg-[#160E36]">
                <div className="flex items-center gap-2.5">
                  <MessageSquare size={16} className="text-[#C4B5FD]" />
                  <span className="font-mono text-[12px] uppercase tracking-[0.08em] font-bold text-[#FFFFFF]">
                    {t('sim.console.header')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#A7F3D0]">
                    {t('sim.console.status')}
                  </span>
                </div>
              </div>

              {/* Console Body: Two Columns (Percakapan | Tindakan agent) */}
              <div className="p-5 sm:p-6 space-y-5 bg-[#100B26]">
                {/* Columns Header Bar */}
                <div className="hidden sm:grid grid-cols-12 gap-4 pb-2 border-b border-[rgba(167,139,250,0.18)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#C4B5FD] font-bold">
                  <div className="col-span-7">{t('sim.col.chat')}</div>
                  <div className="col-span-5">{t('sim.col.actions')}</div>
                </div>

                {/* Event Feed Container */}
                <div className="space-y-4">
                  {/* EVENT 1 (08:02) */}
                  <EventRow
                    isVisible={currentStep >= 1}
                    time="08:02"
                    chatNodes={
                      <>
                        <UserBubble text={t('sim.e1.user')} time="08:02" />
                        <AgentBubble text={t('sim.e1.agent')} time="08:02" />
                      </>
                    }
                    actionNodes={
                      <ToolCallItem
                        name={t('sim.e1.action1')}
                        status={t('sim.status.completed')}
                        isCompleted={currentStep >= 1}
                      />
                    }
                  />

                  {/* EVENT 2 (08:03) */}
                  <EventRow
                    isVisible={currentStep >= 2}
                    time="08:03"
                    chatNodes={
                      <>
                        <UserBubble text={t('sim.e2.user')} time="08:03" />
                        <AgentBubble text={t('sim.e2.agent')} time="08:03" />
                      </>
                    }
                    actionNodes={
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
                    }
                  />

                  {/* EVENT 3 (09:15) */}
                  <EventRow
                    isVisible={currentStep >= 3}
                    time="09:15"
                    chatNodes={
                      <>
                        <UserBubble text={t('sim.e3.user')} time="09:15" />
                        <AgentBubble text={t('sim.e3.agent')} time="09:15" />
                      </>
                    }
                    actionNodes={
                      <ToolCallItem
                        name={t('sim.e3.action1')}
                        status={t('sim.status.completed')}
                        isCompleted={currentStep >= 3}
                      />
                    }
                  />

                  {/* EVENT 4 (10:40) - Handoff to staff */}
                  <EventRow
                    isVisible={currentStep >= 4}
                    time="10:40"
                    chatNodes={
                      <>
                        <UserBubble text={t('sim.e4.user')} time="10:40" />
                        <StaffHandoffCard text={t('sim.e4.staffCard')} />
                        <AgentBubble text={t('sim.e4.agent')} time="10:40" />
                      </>
                    }
                    actionNodes={
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
                    }
                  />

                  {/* EVENT 5 (13:00) - Action only, background reminder dispatch */}
                  <EventRow
                    isVisible={currentStep >= 5}
                    time="13:00"
                    chatNodes={
                      <div className="p-3 rounded-xl bg-[#211648] border border-[rgba(167,139,250,0.25)] text-[12px] text-[#EDE9FE] flex items-center gap-2">
                        <Clock size={13} className="text-[#C4B5FD] shrink-0" />
                        <span className="font-medium">
                          {locale === 'en'
                            ? 'Background schedule task · 6 appointment reminders dispatched.'
                            : 'Tugas latar kalender · 6 pengingat janji temu dikirim otomatis.'}
                        </span>
                      </div>
                    }
                    actionNodes={
                      <ToolCallItem
                        name={t('sim.e5.action1')}
                        status={t('sim.status.completed')}
                        detail={t('sim.e5.result')}
                        isCompleted={currentStep >= 5}
                      />
                    }
                  />

                  {/* EVENT 6 (21:30) - Night booking with small note */}
                  <EventRow
                    isVisible={currentStep >= 6}
                    time="21:30"
                    chatNodes={
                      <>
                        <UserBubble text={t('sim.e6.user')} time="21:30" />
                        <AgentBubble text={t('sim.e6.agent')} time="21:30" />
                        <div className="text-[11px] font-mono text-[#DDD6FE] italic pl-1 flex items-center gap-1.5 font-medium">
                          <Sparkles size={12} className="text-[#C4B5FD] shrink-0" />
                          <span>{t('sim.e6.note')}</span>
                        </div>
                      </>
                    }
                    actionNodes={
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
                    }
                  />
                </div>
              </div>

              {/* Bottom Strip: "Ringkasan contoh satu hari" (Four Meters) */}
              <div className="px-5 sm:px-6 py-5 border-t border-[rgba(167,139,250,0.22)] bg-[#160E36]">
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] font-bold text-[#C4B5FD] mb-3">
                  {t('sim.summary.title')}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Meter 1: Messages processed */}
                  <div className="p-3 rounded-xl bg-[#1C133E] border border-[rgba(167,139,250,0.25)]">
                    <span className="font-mono text-[28px] md:text-[32px] font-bold text-[#FFFFFF] tabular-nums leading-none block">
                      {currentMetrics.messages}
                    </span>
                    <span className="text-[12px] text-[#DDD6FE] font-medium mt-1.5 block">
                      {t('sim.metric.messages')}
                    </span>
                  </div>

                  {/* Meter 2: Bookings created */}
                  <div className="p-3 rounded-xl bg-[#1C133E] border border-[rgba(167,139,250,0.25)]">
                    <span className="font-mono text-[28px] md:text-[32px] font-bold text-[#FFFFFF] tabular-nums leading-none block">
                      {currentMetrics.bookings}
                    </span>
                    <span className="text-[12px] text-[#DDD6FE] font-medium mt-1.5 block">
                      {t('sim.metric.bookings')}
                    </span>
                  </div>

                  {/* Meter 3: Handed off to staff */}
                  <div className="p-3 rounded-xl bg-[#1C133E] border border-[rgba(167,139,250,0.25)]">
                    <span className="font-mono text-[28px] md:text-[32px] font-bold text-[#FFFFFF] tabular-nums leading-none block">
                      {currentMetrics.handoffs}
                    </span>
                    <span className="text-[12px] text-[#DDD6FE] font-medium mt-1.5 block">
                      {t('sim.metric.handoffs')}
                    </span>
                  </div>

                  {/* Meter 4: Reminders sent */}
                  <div className="p-3 rounded-xl bg-[#1C133E] border border-[rgba(167,139,250,0.25)]">
                    <span className="font-mono text-[28px] md:text-[32px] font-bold text-[#FFFFFF] tabular-nums leading-none block">
                      {currentMetrics.reminders}
                    </span>
                    <span className="text-[12px] text-[#DDD6FE] font-medium mt-1.5 block">
                      {t('sim.metric.reminders')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <p className="mt-3 text-[12px] text-[#DDD6FE] text-center sm:text-left select-none font-medium">
              {t('sim.footer.note')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   HELPER ATOMS FOR THE SIMULATION CONSOLE
   ============================================================================= */

interface EventRowProps {
  isVisible: boolean;
  time: string;
  chatNodes: React.ReactNode;
  actionNodes: React.ReactNode;
}

function EventRow({ isVisible, time, chatNodes, actionNodes }: EventRowProps) {
  return (
    <div
      style={{
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 6px, 0)',
        opacity: isVisible ? 1 : 0.22,
        transition: 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 320ms ease-out',
      }}
      className="p-3.5 sm:p-4 rounded-2xl bg-[#160E36] border border-[rgba(167,139,250,0.22)] space-y-3 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-start"
    >
      {/* Left Chat Area */}
      <div className="sm:col-span-7 space-y-2.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] font-bold text-[#DDD6FE] bg-[#241752] border border-[rgba(167,139,250,0.25)] px-2 py-0.5 rounded">
            {time}
          </span>
        </div>
        {chatNodes}
      </div>

      {/* Right Action Log */}
      <div className="sm:col-span-5 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-[rgba(167,139,250,0.2)] sm:pl-4 space-y-2">
        <span className="sm:hidden font-mono text-[10px] uppercase tracking-[0.08em] text-[#C4B5FD] font-bold block mb-1">
          Tindakan
        </span>
        {actionNodes}
      </div>
    </div>
  );
}

function UserBubble({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tl-sm px-3.5 py-2.5 bg-[#211842] border border-[rgba(167,139,250,0.32)] text-[#FFFFFF] shadow-md">
        <p className="text-[13px] sm:text-[14px] leading-[1.5] text-[#FFFFFF] font-normal">
          {text}
        </p>
        <span className="text-[10px] font-mono text-[#DDD6FE] mt-1 block text-right font-medium">
          {time}
        </span>
      </div>
    </div>
  );
}

function AgentBubble({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tr-sm px-3.5 py-2.5 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] border border-[rgba(255,255,255,0.25)] text-[#FFFFFF] shadow-lg">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#EDE9FE] mb-1 font-bold">
          <Bot size={11} className="text-[#EDE9FE]" />
          <span>Agent</span>
        </div>
        <p className="text-[13px] sm:text-[14px] leading-[1.5] text-[#FFFFFF] font-normal">
          {text}
        </p>
        <span className="text-[10px] font-mono text-[#EDE9FE] mt-1 block text-right font-medium">
          {time}
        </span>
      </div>
    </div>
  );
}

function StaffHandoffCard({ text }: { text: string }) {
  return (
    <div className="p-3 rounded-xl bg-[#28184C] border border-[rgba(245,158,11,0.4)] text-[#EDE9FE] text-[12px] leading-relaxed shadow-sm">
      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] font-bold text-[#FCD34D] mb-1">
        <Shield size={12} className="text-[#FCD34D]" />
        <span>Ringkasan untuk staf</span>
      </div>
      <p className="text-[#EDE9FE] font-medium">{text}</p>
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
