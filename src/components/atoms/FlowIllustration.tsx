import React, { useState, useEffect, useRef, useId, useMemo } from 'react';
import {
  FileText,
  MessageSquare,
  Workflow,
  Sheet,
  Calendar,
  Receipt,
  Bell,
  Bot,
  Database,
  Users,
  User,
  Smartphone,
  CheckCircle2,
  Layers,
  LayoutDashboard,
  MapPin,
  AlertCircle,
  Search,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import {
  IllustrationData,
  IllustrationNode,
  IllustrationEdge,
  getIllustrationData,
} from '../../data/illustrations';
import { useMotionMode } from '../../lib/motion';

// Icon registry for dynamic lookup in SVG
const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  MessageSquare,
  Workflow,
  Sheet,
  Calendar,
  Receipt,
  Bell,
  Bot,
  Database,
  Users,
  User,
  Smartphone,
  CheckCircle2,
  Layers,
  LayoutDashboard,
  MapPin,
  AlertCircle,
  Search,
  Sparkles,
};

export interface FlowIllustrationProps {
  id?: string;
  data?: IllustrationData;
  locale?: 'id' | 'en';
  activeStep?: number;
  activeAreaId?: string;
  className?: string;
  showStepCaption?: boolean;
}

export default function FlowIllustration({
  id = 'workflow-flow',
  data: customData,
  locale = 'id',
  activeStep,
  activeAreaId,
  className = '',
  showStepCaption = false,
}: FlowIllustrationProps) {
  const uniqueId = useId().replace(/:/g, '');
  const motionMode = useMotionMode();
  const isLiteOrReduced = motionMode === 'lite' || motionMode === 'reduced';

  // Resolved illustration data
  const data: IllustrationData = useMemo(() => {
    if (customData) return customData;
    const found = getIllustrationData(id, locale);
    if (found) return found;
    return getIllustrationData('workflow-flow', 'id')!;
  }, [id, customData, locale]);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [isVisible, setIsVisible] = useState<boolean>(isLiteOrReduced);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

  // Active highlighted node and edge sets
  const activeNodeIds = useMemo(() => {
    const set = new Set<string>();
    // Highlight based on current active step prop if passed
    if (typeof activeStep === 'number' && data.steps && data.steps[activeStep]) {
      data.steps[activeStep].highlightNodes.forEach((nodeId) => set.add(nodeId));
    }
    // Highlight active area if provided (for area-flow)
    if (activeAreaId) {
      set.add(activeAreaId.toLowerCase());
    }
    // Highlight hovered or keyboard-focused node
    if (hoveredNodeId) set.add(hoveredNodeId);
    if (focusedNodeId) set.add(focusedNodeId);
    return set;
  }, [activeStep, data.steps, activeAreaId, hoveredNodeId, focusedNodeId]);

  // IntersectionObserver for 40% visibility trigger & offscreen pausing
  useEffect(() => {
    if (isLiteOrReduced) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            try {
              svgRef.current?.unpauseAnimations();
            } catch {
              // Ignore if not supported
            }
          } else {
            try {
              svgRef.current?.pauseAnimations();
            } catch {
              // Ignore
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    // Document visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        try {
          svgRef.current?.pauseAnimations();
        } catch {
          // Ignore
        }
      } else if (isVisible) {
        try {
          svgRef.current?.unpauseAnimations();
        } catch {
          // Ignore
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVisible, isLiteOrReduced]);

  // Compute geometry helper: node bounds & connecting paths
  const nodesMap = useMemo(() => {
    const map = new Map<string, IllustrationNode>();
    data.nodes.forEach((n) => {
      // If node is an area node and matches activeAreaId, mark it
      const isMatchedArea =
        Boolean(activeAreaId) &&
        (n.id.toLowerCase() === activeAreaId?.toLowerCase() ||
          activeAreaId?.toLowerCase().includes(n.id.toLowerCase()) ||
          n.id.toLowerCase().includes(activeAreaId?.toLowerCase() || ''));
      map.set(n.id, {
        ...n,
        isCurrentArea: n.isCurrentArea || isMatchedArea,
      });
    });
    return map;
  }, [data.nodes, activeAreaId]);

  // Generate smooth connecting path between two nodes
  const getEdgePath = (edge: IllustrationEdge): string => {
    if (edge.pathD) return edge.pathD;
    const fromNode = nodesMap.get(edge.from);
    const toNode = nodesMap.get(edge.to);
    if (!fromNode || !toNode) return '';

    const fromSize = fromNode.role === 'hub' ? 36 : 28;
    const toSize = toNode.role === 'hub' ? 36 : 28;

    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;

    // Horizontal connection
    if (Math.abs(dx) >= Math.abs(dy)) {
      const startX = dx > 0 ? fromNode.x + fromSize : fromNode.x - fromSize;
      const startY = fromNode.y;
      const endX = dx > 0 ? toNode.x - toSize : toNode.x + toSize;
      const endY = toNode.y;
      const midX = (startX + endX) / 2;
      return `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
    }

    // Vertical / diagonal connection
    const startX = fromNode.x;
    const startY = dy > 0 ? fromNode.y + fromSize : fromNode.y - fromSize;
    const endX = toNode.x;
    const endY = dy > 0 ? toNode.y - toSize : toNode.y + toSize;
    const midY = (startY + endY) / 2;
    return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
  };

  const isDark = data.theme === 'dark';

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-[24px] overflow-hidden transition-colors ${
        isDark
          ? 'bg-[#1A0E42] border border-[rgba(255,255,255,0.14)] text-white shadow-[0_12px_40px_-12px_rgba(26,14,66,0.6)]'
          : 'bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[#17122B] shadow-[0_10px_36px_-10px_rgba(106,63,208,0.08)]'
      } ${className}`}
      role="region"
      aria-labelledby={`flow-title-${uniqueId}`}
    >
      {/* Top Header Bar with Title and Caption Chip */}
      <div
        className={`flex items-center justify-between px-5 py-3.5 border-b ${
          isDark
            ? 'border-[rgba(255,255,255,0.12)] bg-[#2B1763]/60'
            : 'border-[rgba(91,60,196,0.12)] bg-[#F8F6FE]'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              isDark ? 'bg-[#B9A2F2]' : 'bg-[#6A3FD0]'
            }`}
          />
          <span
            id={`flow-title-${uniqueId}`}
            className={`font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.08em] font-semibold truncate ${
              isDark ? 'text-white' : 'text-[#17122B]'
            }`}
          >
            {data.title}
          </span>
        </div>

        {/* Caption Chip: "Ilustrasi" */}
        <span
          className={`shrink-0 font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1 ${
            isDark
              ? 'bg-[#1A0E42] text-[#B9A2F2] border border-[rgba(255,255,255,0.14)]'
              : 'bg-[#EFEAFB] text-[#6A3FD0] border border-[rgba(91,60,196,0.14)]'
          }`}
        >
          <Sparkles size={11} className={isDark ? 'text-[#B9A2F2]' : 'text-[#6A3FD0]'} />
          <span>{data.chipLabel || (locale === 'en' ? 'Illustration' : 'Ilustrasi')}</span>
        </span>
      </div>

      {/* Schematic Notice (if applicable, e.g. for area-flow) */}
      {data.schematicNotice && (
        <div
          className={`px-5 py-1.5 text-[11px] font-mono border-b ${
            isDark
              ? 'bg-[#1A0E42]/80 border-[rgba(255,255,255,0.08)] text-[#B9A2F2]'
              : 'bg-[#EFEAFB]/50 border-[rgba(91,60,196,0.08)] text-[#5B5675]'
          }`}
        >
          {data.schematicNotice}
        </div>
      )}

      {/* Accessible Screen Reader Steps (visually hidden) */}
      <div className="sr-only">
        <p id={`flow-desc-${uniqueId}`}>{data.description}</p>
        <ol>
          {data.steps.map((s, idx) => (
            <li key={idx}>
              Langkah {idx + 1}: {s.caption}
            </li>
          ))}
        </ol>
      </div>

      {/* SVG Container */}
      <div className="relative p-2 sm:p-4">
        <svg
          ref={svgRef}
          viewBox={data.viewBox}
          className="w-full h-auto overflow-visible select-none"
          role="img"
          aria-labelledby={`flow-title-${uniqueId}`}
          aria-describedby={`flow-desc-${uniqueId}`}
        >
          {/* =================================================================
              LAYER 1: CONNECTING EDGES & TRAVELING DOTS
              ================================================================= */}
          <g className="edges-layer">
            {data.edges.map((edge) => {
              const pathD = getEdgePath(edge);
              if (!pathD) return null;
              const pathId = `edge-path-${uniqueId}-${edge.id}`;
              const isFailure = edge.kind === 'failure';
              const isBranch = edge.kind === 'branch';
              const isConnectedToHovered =
                hoveredNodeId === edge.from ||
                hoveredNodeId === edge.to ||
                focusedNodeId === edge.from ||
                focusedNodeId === edge.to;
              const isConnectedToActive =
                activeNodeIds.has(edge.from) && activeNodeIds.has(edge.to);

              const strokeColor = isDark
                ? isConnectedToHovered || isConnectedToActive
                  ? '#B9A2F2'
                  : 'rgba(255, 255, 255, 0.16)'
                : isConnectedToHovered || isConnectedToActive
                ? '#6A3FD0'
                : 'rgba(91, 60, 196, 0.22)';

              const strokeWidth = isConnectedToHovered || isConnectedToActive ? 2 : 1.5;

              return (
                <g key={edge.id} className="edge-group">
                  {/* Base path */}
                  <path
                    id={pathId}
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isFailure || isBranch ? '4 4' : undefined}
                    strokeLinecap="round"
                    className="transition-colors duration-200"
                  />

                  {/* Traveling Dots via SVG animateMotion (zero JS per frame) */}
                  {!isLiteOrReduced && isVisible && edge.dots > 0 && !isFailure && (
                    <g aria-hidden="true">
                      {Array.from({ length: Math.min(edge.dots, 2) }).map((_, dIdx) => {
                        const dur = 3.2;
                        const begin = `${dIdx * (dur / 2)}s`;
                        return (
                          <circle
                            key={dIdx}
                            r="3"
                            fill={isDark ? '#B9A2F2' : '#7C54E0'}
                            opacity="0.9"
                          >
                            <animateMotion
                              dur={`${dur}s`}
                              repeatCount="indefinite"
                              begin={begin}
                            >
                              <mpath href={`#${pathId}`} />
                            </animateMotion>
                          </circle>
                        );
                      })}
                    </g>
                  )}

                  {/* Static parked dots for reduced motion or lite mode */}
                  {isLiteOrReduced && edge.dots > 0 && !isFailure && (
                    <g aria-hidden="true">
                      {/* Midpoint marker dot */}
                      {(() => {
                        const fromNode = nodesMap.get(edge.from);
                        const toNode = nodesMap.get(edge.to);
                        if (!fromNode || !toNode) return null;
                        const mx = (fromNode.x + toNode.x) / 2;
                        const my = (fromNode.y + toNode.y) / 2;
                        return (
                          <circle
                            cx={mx}
                            cy={my}
                            r="3"
                            fill={isDark ? '#B9A2F2' : '#7C54E0'}
                            opacity="0.75"
                          />
                        );
                      })()}
                    </g>
                  )}

                  {/* Edge Label (e.g. Failure or Branch, never red) */}
                  {edge.label && (
                    <g aria-hidden="true">
                      {(() => {
                        const fromNode = nodesMap.get(edge.from);
                        const toNode = nodesMap.get(edge.to);
                        if (!fromNode || !toNode) return null;
                        const lx = (fromNode.x + toNode.x) / 2;
                        const ly = (fromNode.y + toNode.y) / 2 - 8;
                        return (
                          <g transform={`translate(${lx}, ${ly})`}>
                            <rect
                              x={-54}
                              y={-10}
                              width={108}
                              height={16}
                              rx={8}
                              fill={isDark ? '#2B1763' : '#EFEAFB'}
                              stroke={isDark ? '#B9A2F2' : '#6A3FD0'}
                              strokeWidth={0.75}
                            />
                            <text
                              x={0}
                              y={2}
                              textAnchor="middle"
                              fill={isDark ? '#FFFFFF' : '#6A3FD0'}
                              fontSize="8"
                              fontFamily="JetBrains Mono, monospace"
                              fontWeight="600"
                            >
                              {edge.label}
                            </text>
                          </g>
                        );
                      })()}
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* =================================================================
              LAYER 2: SOFTWARE-FLOW MODULE BLOCKS (if defined)
              ================================================================= */}
          {data.modules && data.modules.length > 0 && (
            <g className="software-modules-layer" aria-hidden="true">
              {data.modules.map((mod, mIdx) => {
                const mx = 200 + mIdx * 54;
                const my = 230;
                return (
                  <g key={mod.id} transform={`translate(${mx}, ${my})`}>
                    <rect
                      x={-24}
                      y={-28}
                      width={48}
                      height={56}
                      rx={10}
                      fill={isDark ? '#2B1763' : '#F8F6FE'}
                      stroke={mod.accent ? '#6A3FD0' : 'rgba(91,60,196,0.18)'}
                      strokeWidth={mod.accent ? 1.5 : 1}
                    />
                    <text
                      x={0}
                      y={-12}
                      textAnchor="middle"
                      fill={isDark ? '#B9A2F2' : '#6A3FD0'}
                      fontSize="7"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="700"
                    >
                      {mod.code}
                    </text>
                    <text
                      x={0}
                      y={4}
                      textAnchor="middle"
                      fill={isDark ? '#FFFFFF' : '#17122B'}
                      fontSize="9"
                      fontWeight="600"
                    >
                      {mod.title}
                    </text>
                    <rect
                      x={-14}
                      y={10}
                      width={28}
                      height={3}
                      rx={1.5}
                      fill={mod.accent ? '#6A3FD0' : isDark ? '#B9A2F2' : '#7C54E0'}
                      opacity={0.6}
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* =================================================================
              LAYER 3: SPEED METER (for website-flow)
              ================================================================= */}
          {data.speedMeter && (
            <g transform="translate(220, 240)" aria-hidden="true">
              {/* Circular track */}
              <circle
                cx="0"
                cy="0"
                r="18"
                fill="none"
                stroke={isDark ? 'rgba(255,255,255,0.12)' : 'rgba(91,60,196,0.14)'}
                strokeWidth="3"
              />
              {/* Speed ring */}
              <circle
                cx="0"
                cy="0"
                r="18"
                fill="none"
                stroke="#6A3FD0"
                strokeWidth="3"
                strokeDasharray="113"
                strokeDashoffset="28"
                strokeLinecap="round"
                transform="rotate(-90)"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fill={isDark ? '#FFFFFF' : '#6A3FD0'}
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
              >
                99
              </text>
              <text
                x="0"
                y="28"
                textAnchor="middle"
                fill={isDark ? '#B9A2F2' : '#5B5675'}
                fontSize="8"
                fontFamily="JetBrains Mono, monospace"
              >
                {data.speedLabel || 'Ilustrasi kecepatan'}
              </text>
            </g>
          )}

          {/* =================================================================
              LAYER 4: NODES (with layered shadows, no SVG filters)
              ================================================================= */}
          <g className="nodes-layer">
            {Array.from(nodesMap.values()).map((node) => {
              const isHub = node.role === 'hub';
              const size = isHub ? 72 : 56;
              const radius = isHub ? 20 : 16;
              const half = size / 2;
              const IconComponent = ICON_MAP[node.icon] || Workflow;
              const isActive = activeNodeIds.has(node.id) || node.isCurrentArea;
              const isHovered = hoveredNodeId === node.id || focusedNodeId === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer transition-transform duration-200"
                  tabIndex={0}
                  role="button"
                  aria-label={`${node.label}${isActive ? ' (aktif)' : ''}`}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onFocus={() => setFocusedNodeId(node.id)}
                  onBlur={() => setFocusedNodeId(null)}
                >
                  {/* Layered soft shadow: 2 offset rects (NO SVG FILTERS) */}
                  <rect
                    x={-half}
                    y={-half + 4}
                    width={size}
                    height={size}
                    rx={radius}
                    fill={isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(106, 63, 208, 0.05)'}
                    aria-hidden="true"
                  />
                  <rect
                    x={-half}
                    y={-half + 2}
                    width={size}
                    height={size}
                    rx={radius}
                    fill={isDark ? 'rgba(0, 0, 0, 0.25)' : 'rgba(106, 63, 208, 0.08)'}
                    aria-hidden="true"
                  />

                  {/* Hub breathing pulse ring (composited, disabled in lite/reduced) */}
                  {isHub && !isLiteOrReduced && (
                    <rect
                      x={-half - 4}
                      y={-half - 4}
                      width={size + 8}
                      height={size + 8}
                      rx={radius + 4}
                      fill="none"
                      stroke={isDark ? '#B9A2F2' : '#6A3FD0'}
                      strokeWidth="1.5"
                      opacity="0.35"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.35;0.05;0.35"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="stroke-width"
                        values="1.5;3;1.5"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </rect>
                  )}

                  {/* Active highlight ring (2px purple-600) */}
                  {isActive && (
                    <rect
                      x={-half - 3}
                      y={-half - 3}
                      width={size + 6}
                      height={size + 6}
                      rx={radius + 3}
                      fill="none"
                      stroke={isDark ? '#B9A2F2' : '#6A3FD0'}
                      strokeWidth={2}
                    />
                  )}

                  {/* Main Node Card Body */}
                  <rect
                    x={-half}
                    y={-half}
                    width={size}
                    height={size}
                    rx={radius}
                    fill={
                      isDark
                        ? isActive
                          ? '#2B1763'
                          : '#1F114A'
                        : isActive
                        ? '#EFEAFB'
                        : '#FFFFFF'
                    }
                    stroke={
                      isActive
                        ? isDark
                          ? '#B9A2F2'
                          : '#6A3FD0'
                        : isDark
                        ? 'rgba(255, 255, 255, 0.16)'
                        : 'rgba(91, 60, 196, 0.18)'
                    }
                    strokeWidth={isActive ? 1.5 : 1}
                  />

                  {/* Center Icon */}
                  <g transform={`translate(-12, -12)`} aria-hidden="true">
                    <IconComponent
                      size={24}
                      strokeWidth={1.5}
                      className={
                        isActive
                          ? isDark
                            ? 'text-[#FFFFFF]'
                            : 'text-[#6A3FD0]'
                          : isDark
                          ? 'text-[#B9A2F2]'
                          : 'text-[#6A3FD0]'
                      }
                    />
                  </g>

                  {/* Node Label Below */}
                  <text
                    x={0}
                    y={half + 16}
                    textAnchor="middle"
                    fill={
                      isDark
                        ? isActive
                          ? '#FFFFFF'
                          : '#B9A2F2'
                        : isActive
                        ? '#17122B'
                        : '#5B5675'
                    }
                    fontSize="11"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight={isActive ? 700 : 500}
                  >
                    {node.label}
                  </text>

                  {/* Optional Tooltip on Hover / Focus */}
                  {isHovered && (
                    <g transform={`translate(0, ${-half - 12})`} aria-hidden="true">
                      <rect
                        x={-50}
                        y={-18}
                        width={100}
                        height={20}
                        rx={6}
                        fill={isDark ? '#2B1763' : '#17122B'}
                        stroke={isDark ? '#B9A2F2' : 'none'}
                        strokeWidth={0.5}
                      />
                      <text
                        x={0}
                        y={-4}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="9"
                        fontFamily="Plus Jakarta Sans, sans-serif"
                        fontWeight="600"
                      >
                        {node.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Optional Step Caption Footer (for synchronized Cara Kerja steps) */}
      {showStepCaption && typeof activeStep === 'number' && data.steps[activeStep] && (
        <div
          className={`px-5 py-3 border-t text-[13px] font-medium flex items-center gap-2.5 ${
            isDark
              ? 'border-[rgba(255,255,255,0.1)] bg-[#1F114A] text-white'
              : 'border-[rgba(91,60,196,0.12)] bg-[#F8F6FE] text-[#17122B]'
          }`}
        >
          <span
            className={`font-mono text-[11px] px-2 py-0.5 rounded-full font-bold ${
              isDark ? 'bg-[#2B1763] text-[#B9A2F2]' : 'bg-[#EFEAFB] text-[#6A3FD0]'
            }`}
          >
            0{activeStep + 1}
          </span>
          <span className="truncate">{data.steps[activeStep].caption}</span>
        </div>
      )}
    </div>
  );
}
