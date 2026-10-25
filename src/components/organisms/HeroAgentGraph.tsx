import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, Calendar, Database, FileText, Bell, Bot } from 'lucide-react';
import gsap from 'gsap';
import { useMotionMode, MOTION_TOKENS } from '../../lib/motion';
import { parseLocalizedPath } from '../../lib/i18n';

interface ToolNode {
  id: string;
  name: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  status: string;
}

/**
 * HeroAgentGraph
 * - Pointer-reactive 3D tilt on desktop (max 3 degrees, lerped smoothly)
 * - Sequential SVG line draw (stroke-dashoffset) on initial mount
 * - Data dots traveling along paths (<animateMotion>)
 * - Soft node pulse on active step
 * - Completely pauses all timers, pointer lerp, and SVG animations when offscreen
 */
export default function HeroAgentGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const motionMode = useMotionMode();
  const location = useLocation();
  const { locale } = parseLocalizedPath(location.pathname);

  const targetTilt = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: 0, y: 0 });

  const tools: ToolNode[] =
    locale === 'en'
      ? [
          {
            id: 'wa',
            name: 'WhatsApp',
            icon: <MessageSquare size={15} className="text-[#6A3FD0]" />,
            x: 84,
            y: 88,
            status: 'Incoming Message',
          },
          {
            id: 'calendar',
            name: 'Calendar',
            icon: <Calendar size={15} className="text-[#6A3FD0]" />,
            x: 336,
            y: 74,
            status: 'Check Free Slot',
          },
          {
            id: 'db',
            name: 'Database',
            icon: <Database size={15} className="text-[#6A3FD0]" />,
            x: 356,
            y: 266,
            status: 'Record Saved',
          },
          {
            id: 'invoice',
            name: 'Invoice',
            icon: <FileText size={15} className="text-[#6A3FD0]" />,
            x: 184,
            y: 342,
            status: 'Invoice Ready',
          },
          {
            id: 'notif',
            name: 'Notification',
            icon: <Bell size={15} className="text-[#6A3FD0]" />,
            x: 72,
            y: 252,
            status: 'Notify Team',
          },
        ]
      : [
          {
            id: 'wa',
            name: 'WhatsApp',
            icon: <MessageSquare size={15} className="text-[#6A3FD0]" />,
            x: 84,
            y: 88,
            status: 'Pesan Masuk',
          },
          {
            id: 'calendar',
            name: 'Kalender',
            icon: <Calendar size={15} className="text-[#6A3FD0]" />,
            x: 336,
            y: 74,
            status: 'Cek Slot Kosong',
          },
          {
            id: 'db',
            name: 'Database',
            icon: <Database size={15} className="text-[#6A3FD0]" />,
            x: 356,
            y: 266,
            status: 'Data Tersimpan',
          },
          {
            id: 'invoice',
            name: 'Invoice',
            icon: <FileText size={15} className="text-[#6A3FD0]" />,
            x: 184,
            y: 342,
            status: 'Tagihan Siap',
          },
          {
            id: 'notif',
            name: 'Notifikasi',
            icon: <Bell size={15} className="text-[#6A3FD0]" />,
            x: 72,
            y: 252,
            status: 'Lapor ke Tim',
          },
        ];

  const centerX = 215;
  const centerY = 196;

  // Pause everything when Hero leaves viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting;
        setIsVisible(intersecting);
        if (svgRef.current) {
          try {
            if (intersecting && motionMode === 'full') {
              svgRef.current.unpauseAnimations?.();
            } else {
              svgRef.current.pauseAnimations?.();
            }
          } catch {
            // Ignore in environments without SMIL pauseAnimations
          }
        }
      },
      { threshold: 0.08 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [motionMode]);

  // Sequential SVG line draw on mount
  useEffect(() => {
    if (motionMode === 'reduced' || !svgRef.current) return;
    const lines = svgRef.current.querySelectorAll<SVGLineElement>('.agent-draw-line');
    if (!lines.length) return;

    lines.forEach((line) => {
      const x1 = parseFloat(line.getAttribute('x1') || '0');
      const y1 = parseFloat(line.getAttribute('y1') || '0');
      const x2 = parseFloat(line.getAttribute('x2') || '0');
      const y2 = parseFloat(line.getAttribute('y2') || '0');
      const len = Math.hypot(x2 - x1, y2 - y1);
      line.style.strokeDasharray = `${len}`;
      line.style.strokeDashoffset = `${len}`;
    });

    gsap.to(lines, {
      strokeDashoffset: 0,
      duration: 0.75,
      stagger: 0.09,
      ease: MOTION_TOKENS.easings.gsapOut,
      delay: 0.15,
    });
  }, [motionMode]);

  // Step ticker interval (paused when offscreen or reduced motion)
  useEffect(() => {
    if (!isVisible || motionMode === 'reduced') return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % tools.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isVisible, motionMode, tools.length]);

  // Desktop pointer-reactive lerped tilt (max 3 degrees, hooked to single GSAP ticker)
  useEffect(() => {
    if (!isVisible || motionMode !== 'full') return;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const tick = () => {
      const card = cardRef.current;
      if (!card) return;
      currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * 0.12;
      currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * 0.12;

      if (
        Math.abs(currentTilt.current.x) > 0.01 ||
        Math.abs(currentTilt.current.y) > 0.01
      ) {
        card.style.transform = `perspective(900px) rotateX(${currentTilt.current.x.toFixed(
          2
        )}deg) rotateY(${currentTilt.current.y.toFixed(2)}deg) translateZ(0)`;
      } else {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      }
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [isVisible, motionMode]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || motionMode !== 'full' || !isVisible) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    // Clamp strictly within max 3 degrees
    targetTilt.current.x = Math.max(-3, Math.min(3, -ny * 5.5));
    targetTilt.current.y = Math.max(-3, Math.min(3, nx * 5.5));
  };

  const handlePointerLeave = () => {
    targetTilt.current.x = 0;
    targetTilt.current.y = 0;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-[460px] mx-auto select-none"
      aria-label={
        locale === 'en'
          ? 'AI Agent workflow illustration connecting WhatsApp, Calendar, Database, Invoice, and Notifications'
          : 'Ilustrasi alur kerja AI Agent yang menghubungkan WhatsApp, Kalender, Database, Invoice, dan Notifikasi'
      }
    >
      <div
        ref={cardRef}
        className="relative rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] p-5 md:p-6 overflow-hidden shadow-[0_8px_24px_-8px_rgba(106,63,208,0.06)]"
      >
        {/* Caption Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em]">
          <span className="text-[#6A3FD0] font-semibold">
            {locale === 'en' ? 'Agent workflow graph' : 'Ilustrasi alur agent'}
          </span>
          <span className="text-[#5B5675]">
            {locale === 'en' ? 'Automated · Real-time' : 'Otomatis · Real-time'}
          </span>
        </div>

        {/* SVG Node Graph */}
        <div className="relative aspect-[430/380] w-full">
          <svg
            ref={svgRef}
            viewBox="0 0 430 380"
            className="w-full h-full overflow-visible"
            aria-hidden="true"
          >
            {/* Connecting Lines */}
            {tools.map((t, index) => {
              const isActive = isVisible && activeStep === index;
              return (
                <g key={`connection-${t.id}`}>
                  {/* Base Sequential Draw Line */}
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={t.x}
                    y2={t.y}
                    stroke="rgba(91, 60, 196, 0.16)"
                    strokeWidth="1.5"
                    className="agent-draw-line"
                  />

                  {/* Active Highlight Line */}
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={t.x}
                    y2={t.y}
                    stroke="#6A3FD0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 260ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />

                  {/* Data Dot Traveling Along Path (only in full mode while visible) */}
                  {isVisible && motionMode === 'full' && (
                    <circle r={isActive ? 3.5 : 2.5} fill="#6A3FD0" opacity={isActive ? 1 : 0.65}>
                      <animateMotion
                        path={`M ${centerX} ${centerY} L ${t.x} ${t.y}`}
                        dur={`${2.2 + index * 0.28}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Central Agent Node */}
            <g transform={`translate(${centerX}, ${centerY})`}>
              <circle r="34" fill="#FFFFFF" stroke="#6A3FD0" strokeWidth="1.5" />
              <circle
                r="26"
                fill="#F8F6FE"
                stroke="rgba(91, 60, 196, 0.14)"
                strokeWidth="1"
              />
            </g>
          </svg>

          {/* HTML Overlay for Central Agent Label & Icon */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
            style={{ left: `${(centerX / 430) * 100}%`, top: `${(centerY / 380) * 100}%` }}
          >
            <div className="w-9 h-9 rounded-full bg-[#6A3FD0] text-[#FFFFFF] flex items-center justify-center shadow-[0_4px_12px_rgba(106,63,208,0.25)]">
              <Bot size={18} />
            </div>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.06em] font-semibold text-[#17122B] bg-[#FFFFFF] px-2 py-0.5 rounded-full border border-[rgba(91,60,196,0.14)]">
              AI Agent
            </span>
          </div>

          {/* HTML Overlay for Tool Nodes (soft scale pulse within 1.0 -> 1.03 spec) */}
          {tools.map((t, index) => {
            const isActive = activeStep === index;
            return (
              <div
                key={t.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
                  isActive ? 'scale-[1.03] z-20' : 'scale-100 z-10'
                }`}
                style={{ left: `${(t.x / 430) * 100}%`, top: `${(t.y / 380) * 100}%` }}
              >
                <div
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-[16px] transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#FFFFFF] border-2 border-[#6A3FD0] shadow-[0_6px_16px_-6px_rgba(106,63,208,0.2)]'
                      : 'bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isActive ? 'bg-[#EFEAFB]' : 'bg-[#F8F6FE]'
                    }`}
                  >
                    {t.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-semibold text-[#17122B] whitespace-nowrap leading-tight">
                      {t.name}
                    </span>
                    <span className="font-mono text-[9px] text-[#5B5675] whitespace-nowrap leading-tight">
                      {t.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Step Ticker Bar */}
        <div className="mt-2 pt-3 border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between font-mono text-[11px] text-[#5B5675]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0]" />
            <span>
              {locale === 'en' ? 'Action' : 'Aksi'}: {tools[activeStep]?.status}
            </span>
          </span>
          <span className="text-[#6A3FD0] font-semibold">0{activeStep + 1} / 05</span>
        </div>
      </div>
    </div>
  );
}
