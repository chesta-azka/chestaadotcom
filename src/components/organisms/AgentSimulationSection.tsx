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
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 800px',
        // Section-scoped tokens
        ['--sim-bg-0' as string]: '#1A0E42',
        ['--sim-bg-1' as string]: '#2B1763',
        ['--sim-text' as string]: '#FFFFFF',
        ['--sim-text-2' as string]: '#D6CEF3',
        ['--sim-text-3' as string]: '#B9AEDF',
        ['--sim-label' as string]: '#B9A2F2',
        ['--sim-line' as string]: 'rgba(255, 255, 255, 0.14)',
        ['--sim-panel' as string]: 'rgba(255, 255, 255, 0.06)',
        ['--sim-bubble-agent' as string]: 'linear-gradient(135deg, #7C54E0, #6A3FD0)',
        ['--sim-bubble-user' as string]: 'rgba(255, 255, 255, 0.10)',
      }}
      className="relative py-20 md:py-28 text-[var(--sim-text)] overflow-hidden bg-[linear-gradient(180deg,#1A0E42_0%,#2B1763_100%)]"
    >
      {/* =========================================================================
          BACKGROUND LAYERS (static, cheap, zero blur, zero animation)
          ========================================================================= */}
      {/* 1. Soft radial glows (top-left #7C54E0 @ 0.28, bottom-right #6A3FD0 @ 0.22) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 600px at 15% 20%, rgba(124, 84, 224, 0.28), transparent 70%),
            radial-gradient(circle 600px at 85% 80%, rgba(106, 63, 208, 0.22), transparent 70%)
          `,
        }}
      />

      {/* 2. Hairline 64px grid at rgba(255,255,255,0.035) with radial mask fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 50%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 50%, transparent 100%)',
        }}
      />

      {/* 3. Top and bottom 120px edge gradients blending seamlessly into neighboring white sections */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-[120px] bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(255,255,255,0)_100%)] z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[120px] bg-[linear-gradient(0deg,#FFFFFF_0%,rgba(255,255,255,0)_100%)] z-10"
      />

      {/* =========================================================================
          SCREEN READER ACCESSIBLE SCRIPT (visually hidden)
          ========================================================================= */}
      <div className="sr-only">
        <h2>{t('sim.title')}</h2>
        <p>{t('sim.sub')}</p>
        <ol>
          <li>
            <strong>08:02 - {t('sim.legend.user')}:</strong> {t('sim.e1.user')}.{' '}
            <strong>{t('sim.legend.agent')}:</strong> {t('sim.e1.action1')} ({t('sim.status.completed')}).{' '}
            <strong>Balasan:</strong> {t('sim.e1.agent')}
          </li>
          <li>
            <strong>08:03 - {t('sim.legend.user')}:</strong> {t('sim.e2.user')}.{' '}
            <strong>{t('sim.legend.agent')}:</strong> {t('sim.e2.action1')}, {t('sim.e2.action2')},{' '}
            {t('sim.e2.action3')} ({t('sim.status.completed')}). <strong>Balasan:</strong>{' '}
            {t('sim.e2.agent')}
          </li>
          <li>
            <strong>09:15 - {t('sim.legend.user')}:</strong> {t('sim.e3.user')}.{' '}
            <strong>{t('sim.legend.agent')}:</strong> {t('sim.e3.action1')} ({t('sim.status.completed')}).{' '}
            <strong>Balasan:</strong> {t('sim.e3.agent')}
          </li>
          <li>
            <strong>10:40 - {t('sim.legend.user')}:</strong> {t('sim.e4.user')}.{' '}
            <strong>{t('sim.legend.agent')}:</strong> {t('sim.e4.action1')} ({t('sim.status.completed')}),{' '}
            {t('sim.e4.action2')} ({t('sim.status.handedOff')}). <strong>Ringkasan staf:</strong>{' '}
            {t('sim.e4.staffCard')}. <strong>Balasan:</strong> {t('sim.e4.agent')}
          </li>
          <li>
            <strong>13:00 - {t('sim.legend.agent')}:</strong> {t('sim.e5.action1')} ({t('sim.status.completed')} -{' '}
            {t('sim.e5.result')}).
          </li>
          <li>
            <strong>21:30 - {t('sim.legend.user')}:</strong> {t('sim.e6.user')}.{' '}
            <strong>{t('sim.legend.agent')}:</strong> {t('sim.e6.action1')}, {t('sim.e6.action2')} ({t('sim.status.completed')}).{' '}
            <strong>Balasan:</strong> {t('sim.e6.agent')}. ({t('sim.e6.note')})
          </li>
        </ol>
        <p>
          {t('sim.summary.title')}: {t('sim.metric.messages')} {targetCounts.messages},{' '}
          {t('sim.metric.bookings')} {targetCounts.bookings}, {t('sim.metric.handoffs')}{' '}
          {targetCounts.handoffs}, {t('sim.metric.reminders')} {targetCounts.reminders}.
        </p>
      </div>

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
              <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] font-semibold text-[var(--sim-label)]">
                {t('sim.eyebrow')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-[0.08em] font-semibold border border-[var(--sim-line)] bg-[var(--sim-panel)] text-[var(--sim-label)] select-none">
                {t('sim.chip')}
              </span>
            </div>

            {/* H2 Headline */}
            <h2 className="mt-3 text-[clamp(1.5rem,2.6vw,2.125rem)] font-semibold tracking-[-0.02em] text-[var(--sim-text)] leading-[1.25]">
              {t('sim.title')}
            </h2>

            {/* Subheadline (max 56ch) */}
            <p className="mt-3.5 text-[15px] md:text-[16px] text-[var(--sim-text-2)] leading-[1.65] max-w-[56ch]">
              {t('sim.sub')}
            </p>

            {/* 3-Item Legend (clean unboxed metadata, zero candy badges) */}
            <div className="mt-7 pt-6 border-t border-[var(--sim-line)] space-y-2.5 text-[13px]">
              <div className="flex items-center gap-2.5 text-[var(--sim-text-2)]">
                <div className="w-5 h-5 rounded-md bg-[rgba(255,255,255,0.10)] border border-[var(--sim-line)] flex items-center justify-center shrink-0">
                  <User size={12} className="text-[var(--sim-text-2)]" />
                </div>
                <span>{t('sim.legend.user')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[var(--sim-text-2)]">
                <div className="w-5 h-5 rounded-md bg-[linear-gradient(135deg,#7C54E0,#6A3FD0)] flex items-center justify-center shrink-0">
                  <Bot size={12} className="text-[var(--sim-text)]" />
                </div>
                <span>{t('sim.legend.agent')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[var(--sim-text-2)]">
                <div className="w-5 h-5 rounded-md bg-[rgba(255,255,255,0.08)] border border-[var(--sim-line)] flex items-center justify-center shrink-0">
                  <Shield size={12} className="text-[var(--sim-label)]" />
                </div>
                <span>{t('sim.legend.handoff')}</span>
              </div>
            </div>

            {/* Ghost Replay Button */}
            <div className="mt-7">
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--sim-line)] bg-transparent text-[var(--sim-text)] hover:bg-[var(--sim-panel)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--sim-label)] transition-colors font-sans text-[13px] font-medium cursor-pointer"
                title={t('sim.button.replay')}
              >
                <RotateCcw size={14} className="text-[var(--sim-label)]" />
                <span>{t('sim.button.replay')}</span>
              </button>
            </div>
          </div>

          {/* =====================================================================
              RIGHT 7 COLUMNS: The High-Contrast Simulation Console
              ===================================================================== */}
          <div className="lg:col-span-7">
            <div
              aria-hidden="true"
              className="rounded-[28px] border border-[var(--sim-line)] bg-[rgba(34,18,84,0.88)] backdrop-blur-[16px] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_24px_60px_rgba(10,5,30,0.45)] overflow-hidden"
            >
              {/* Console Header Row */}
              <div className="px-5 sm:px-6 py-4 border-b border-[var(--sim-line)] flex items-center justify-between gap-3 bg-[rgba(255,255,255,0.02)]">
                <div className="flex items-center gap-2.5">
                  <MessageSquare size={16} className="text-[var(--sim-label)]" />
                  <span className="font-mono text-[12px] uppercase tracking-[0.08em] font-semibold text-[var(--sim-text)]">
                    {t('sim.console.header')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--sim-label)]" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-medium text-[var(--sim-label)]">
                    {t('sim.console.status')}
                  </span>
                </div>
              </div>

              {/* Console Body: Two Columns (Percakapan | Tindakan agent) */}
              <div className="p-5 sm:p-6 space-y-5">
                {/* Columns Header Bar */}
                <div className="hidden sm:grid grid-cols-12 gap-4 pb-2 border-b border-[var(--sim-line)] font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--sim-label)] font-semibold">
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
                      <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[var(--sim-line)] text-[12px] text-[var(--sim-text-3)] flex items-center gap-2">
                        <Clock size={13} className="text-[var(--sim-label)] shrink-0" />
                        <span>
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
                        <div className="text-[11px] font-mono text-[var(--sim-text-3)] italic pl-1 flex items-center gap-1.5">
                          <Sparkles size={12} className="text-[var(--sim-label)] shrink-0" />
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
              <div className="px-5 sm:px-6 py-5 border-t border-[var(--sim-line)] bg-[rgba(255,255,255,0.02)]">
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[var(--sim-label)] mb-3">
                  {t('sim.summary.title')}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Meter 1: Messages processed */}
                  <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--sim-line)]">
                    <span className="font-mono text-[28px] md:text-[32px] font-semibold text-[var(--sim-text)] tabular-nums leading-none block">
                      {currentMetrics.messages}
                    </span>
                    <span className="text-[12px] text-[var(--sim-text-3)] font-medium mt-1.5 block">
                      {t('sim.metric.messages')}
                    </span>
                  </div>

                  {/* Meter 2: Bookings created */}
                  <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--sim-line)]">
                    <span className="font-mono text-[28px] md:text-[32px] font-semibold text-[var(--sim-text)] tabular-nums leading-none block">
                      {currentMetrics.bookings}
                    </span>
                    <span className="text-[12px] text-[var(--sim-text-3)] font-medium mt-1.5 block">
                      {t('sim.metric.bookings')}
                    </span>
                  </div>

                  {/* Meter 3: Handed off to staff */}
                  <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--sim-line)]">
                    <span className="font-mono text-[28px] md:text-[32px] font-semibold text-[var(--sim-text)] tabular-nums leading-none block">
                      {currentMetrics.handoffs}
                    </span>
                    <span className="text-[12px] text-[var(--sim-text-3)] font-medium mt-1.5 block">
                      {t('sim.metric.handoffs')}
                    </span>
                  </div>

                  {/* Meter 4: Reminders sent */}
                  <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--sim-line)]">
                    <span className="font-mono text-[28px] md:text-[32px] font-semibold text-[var(--sim-text)] tabular-nums leading-none block">
                      {currentMetrics.reminders}
                    </span>
                    <span className="text-[12px] text-[var(--sim-text-3)] font-medium mt-1.5 block">
                      {t('sim.metric.reminders')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <p className="mt-3 text-[12px] text-[var(--sim-text-3)] text-center sm:text-left select-none">
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
  if (!isVisible) return null;

  return (
    <div
      style={{
        transform: 'translate3d(0, 0, 0)',
        opacity: 1,
        transition: 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 320ms ease-out',
      }}
      className="p-3.5 sm:p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[var(--sim-line)] space-y-3 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-start"
    >
      {/* Left Chat Area */}
      <div className="sm:col-span-7 space-y-2.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] font-semibold text-[var(--sim-text-3)] bg-[rgba(255,255,255,0.06)] px-2 py-0.5 rounded">
            {time}
          </span>
        </div>
        {chatNodes}
      </div>

      {/* Right Action Log */}
      <div className="sm:col-span-5 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-[var(--sim-line)] sm:pl-4 space-y-2">
        <span className="sm:hidden font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--sim-label)] block mb-1">
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
      <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tl-sm px-3.5 py-2.5 bg-[var(--sim-bubble-user)] border border-[var(--sim-line)] text-[var(--sim-text)] shadow-xs">
        <p className="text-[13px] sm:text-[14px] leading-[1.5] text-[var(--sim-text)] font-normal">
          {text}
        </p>
        <span className="text-[10px] font-mono text-[var(--sim-text-3)] mt-1 block text-right">
          {time}
        </span>
      </div>
    </div>
  );
}

function AgentBubble({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tr-sm px-3.5 py-2.5 bg-[linear-gradient(135deg,#7C54E0,#6A3FD0)] border border-[rgba(255,255,255,0.18)] text-[var(--sim-text)] shadow-md">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--sim-text)] mb-1">
          <Bot size={11} className="text-[var(--sim-text)]" />
          <span>Agent</span>
        </div>
        <p className="text-[13px] sm:text-[14px] leading-[1.5] text-[var(--sim-text)] font-normal">
          {text}
        </p>
        <span className="text-[10px] font-mono text-[var(--sim-text)] mt-1 block text-right font-medium">
          {time}
        </span>
      </div>
    </div>
  );
}

function StaffHandoffCard({ text }: { text: string }) {
  return (
    <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.08)] border border-[var(--sim-line)] text-[var(--sim-text-2)] text-[12px] leading-relaxed shadow-sm">
      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] font-semibold text-[var(--sim-label)] mb-1">
        <Shield size={12} className="text-[var(--sim-label)]" />
        <span>Ringkasan untuk staf</span>
      </div>
      <p className="text-[var(--sim-text-2)]">{text}</p>
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
    <div className="p-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[var(--sim-line)] text-[12px]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[var(--sim-text)] font-medium line-clamp-1">{name}</span>
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[var(--sim-label)] shrink-0">
          {isHandoff ? (
            <ArrowRight size={12} className="text-[var(--sim-label)]" />
          ) : (
            <Check size={12} className="text-[var(--sim-label)]" />
          )}
          <span>{status}</span>
        </div>
      </div>

      {/* 2px Animated Progress Line (transform: scaleX) */}
      <div className="mt-2 w-full h-[2px] rounded-full bg-[rgba(255,255,255,0.12)] overflow-hidden">
        <div
          style={{
            transform: isCompleted ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="w-full h-full bg-[var(--sim-label)] rounded-full"
        />
      </div>

      {detail && (
        <span className="mt-1.5 block text-[11px] font-mono text-[var(--sim-text-3)]">{detail}</span>
      )}
    </div>
  );
}
