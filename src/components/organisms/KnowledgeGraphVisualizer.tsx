'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, Search, ZoomIn, ZoomOut, RotateCcw, 
  Sparkles, Database, FileText, Check, Copy, X, 
  Clock, ShieldCheck, Zap, Sliders, Play, Pause,
  Layers, Download, Cpu
} from 'lucide-react';
import { 
  KnowledgeNode, 
  cosineSimilarity, 
  subscribeToKnowledgeGraph, 
  searchVectorBrain, 
  VectorSearchResult 
} from '../../lib/vectorBrain';
import toast from 'react-hot-toast';

export interface KnowledgeGraphVisualizerProps {
  nodes?: KnowledgeNode[];
  onNodeSelect?: (node: KnowledgeNode, relevanceScore: number) => void;
  selectedNodeId?: string | null;
  className?: string;
  initialQuery?: string;
  height?: number | string;
}

// Math simulation types (Strict Separation of Concerns: D3 strictly computes, React renders)
interface SimNode extends d3.SimulationNodeDatum {
  id: string;
  title: string;
  content: string;
  category: KnowledgeNode['category'];
  embedding?: number[];
  source: KnowledgeNode['source'];
  confidence?: number;
  syncedAt?: any;
  tags?: string[];
  relevanceScore: number;
  radius: number;
  isNew?: boolean;
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  id: string;
  source: SimNode | string;
  target: SimNode | string;
  weight: number;
  isNew?: boolean;
}

const CATEGORY_THEME: Record<string, { fill: string; stroke: string; glow: string; label: string; streamColor: string }> = {
  architecture: { fill: '#6366f1', stroke: '#818cf8', glow: 'rgba(99, 102, 241, 0.5)', streamColor: '#818cf8', label: 'Architecture' },
  pricing: { fill: '#10b981', stroke: '#34d399', glow: 'rgba(16, 185, 129, 0.5)', streamColor: '#34d399', label: 'Pricing & Cost' },
  performance: { fill: '#f59e0b', stroke: '#fbbf24', glow: 'rgba(245, 158, 11, 0.5)', streamColor: '#fbbf24', label: 'Performance' },
  seo: { fill: '#06b6d4', stroke: '#22d3ee', glow: 'rgba(6, 182, 212, 0.5)', streamColor: '#22d3ee', label: 'Local SEO' },
  automation: { fill: '#a855f7', stroke: '#c084fc', glow: 'rgba(168, 85, 247, 0.5)', streamColor: '#c084fc', label: 'Automation' },
  auto_learned: { fill: '#f43f5e', stroke: '#fb7185', glow: 'rgba(244, 63, 94, 0.5)', streamColor: '#fb7185', label: 'Auto-Learned' },
};

function formatTimestamp(val: any): string {
  if (!val) return 'Real-time Synchronized';
  try {
    if (typeof val === 'object' && val.seconds) {
      return new Date(val.seconds * 1000).toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      return d.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  } catch {}
  return String(val);
}

export default function KnowledgeGraphVisualizer({
  nodes: externalNodes,
  onNodeSelect,
  selectedNodeId: externalSelectedNodeId,
  className = '',
  initialQuery = '',
  height = 580
}: KnowledgeGraphVisualizerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgElementRef = useRef<SVGSVGElement | null>(null);

  // Firestore & Internal Node State
  const [internalNodes, setInternalNodes] = useState<KnowledgeNode[]>([]);
  const nodes = externalNodes && externalNodes.length > 0 ? externalNodes : internalNodes;

  // Track newly synced nodes from onSnapshot for entrance & bioluminescent synapse effects
  const prevNodeIdsRef = useRef<Set<string>>(new Set());
  const [newlyAddedNodeIds, setNewlyAddedNodeIds] = useState<Set<string>>(new Set());

  // Interactive Inspector State
  const [selectedNode, setSelectedNode] = useState<SimNode | null>(null);
  const [selectedRelevance, setSelectedRelevance] = useState<number>(0.96);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Real-Time Search Filter State
  const [searchFilter, setSearchFilter] = useState<string>(initialQuery);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Simulation & Viewport State
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0.32);
  const [isSimulationPaused, setIsSimulationPaused] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Pan & Zoom Viewport (Managed via React State)
  const [viewportTransform, setViewportTransform] = useState({ x: 0, y: 0, k: 1 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  // D3 Math Simulation Engine Refs (Math Only, No DOM Mutation)
  const simulationRef = useRef<d3.Simulation<SimNode, SimLink> | null>(null);
  const [animatedNodes, setAnimatedNodes] = useState<SimNode[]>([]);
  const [animatedLinks, setAnimatedLinks] = useState<SimLink[]>([]);

  // 1. Subscribe to Firestore if no external nodes passed
  useEffect(() => {
    if (externalNodes && externalNodes.length > 0) return;
    const unsub = subscribeToKnowledgeGraph(
      (data) => {
        // Detect newly added nodes via onSnapshot
        const newIds = new Set<string>();
        data.forEach(n => {
          if (prevNodeIdsRef.current.size > 0 && !prevNodeIdsRef.current.has(n.id)) {
            newIds.add(n.id);
          }
        });
        if (newIds.size > 0) {
          setNewlyAddedNodeIds(newIds);
          setTimeout(() => setNewlyAddedNodeIds(new Set()), 4000);
        }
        prevNodeIdsRef.current = new Set(data.map(n => n.id));
        setInternalNodes(data);
      },
      (err) => console.error('KnowledgeGraphVisualizer sync failed:', err)
    );
    return () => unsub();
  }, [externalNodes]);

  // Sync external selected node if provided
  useEffect(() => {
    if (!externalSelectedNodeId || !nodes.length) return;
    const target = nodes.find(n => n.id === externalSelectedNodeId);
    if (target) {
      setSelectedNode({
        ...target,
        relevanceScore: target.confidence || 0.94,
        radius: 18
      });
      setSelectedRelevance(target.confidence || 0.94);
    }
  }, [externalSelectedNodeId, nodes]);

  // 2. Compute D3 Graph Math (Nodes & Links based on Cosine Similarity)
  const { initialSimNodes, initialSimLinks } = useMemo(() => {
    if (!nodes || nodes.length === 0) return { initialSimNodes: [], initialSimLinks: [] };

    const filtered = nodes.filter(n => {
      if (filterCategory !== 'all' && n.category !== filterCategory) return false;
      return true;
    });

    const simNodes: SimNode[] = filtered.map(node => {
      const rel = node.confidence || 0.92;
      const radius = 13 + rel * 9;
      const isNew = newlyAddedNodeIds.has(node.id);
      return {
        id: node.id,
        title: node.title,
        content: node.content,
        category: node.category,
        embedding: node.embedding,
        source: node.source,
        confidence: node.confidence,
        syncedAt: node.syncedAt,
        tags: node.tags,
        relevanceScore: rel,
        radius,
        isNew
      };
    });

    // Pairwise Cosine Similarity Links
    const links: SimLink[] = [];
    const len = simNodes.length;

    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const a = simNodes[i];
        const b = simNodes[j];

        let weight = 0;
        if (a.embedding && b.embedding && a.embedding.length > 0 && b.embedding.length > 0) {
          weight = cosineSimilarity(a.embedding, b.embedding);
        } else {
          if (a.category === b.category) weight += 0.42;
          const aTokens = new Set(a.title.toLowerCase().split(/\s+/));
          const bTokens = b.title.toLowerCase().split(/\s+/);
          let shared = 0;
          bTokens.forEach(t => {
            if (t.length > 3 && aTokens.has(t)) shared++;
          });
          weight += Math.min(0.48, shared * 0.16);
        }

        if (weight >= similarityThreshold) {
          const isLinkNew = a.isNew || b.isNew;
          links.push({
            id: `link_${a.id}_${b.id}`,
            source: a.id,
            target: b.id,
            weight,
            isNew: isLinkNew
          });
        }
      }
    }

    return { initialSimNodes: simNodes, initialSimLinks: links };
  }, [nodes, filterCategory, similarityThreshold, newlyAddedNodeIds]);

  // 3. Strict Separation of Concerns: D3 computes coordinates, React + Framer Motion render
  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth || 850;
    const heightNum = typeof height === 'number' ? height : parseInt(height as string, 10) || 580;

    // Clean up previous simulation
    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    // Initialize D3 Force Simulation strictly for mathematics
    const nodesCopy = initialSimNodes.map(d => ({ ...d }));
    const linksCopy = initialSimLinks.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<SimNode, SimLink>(nodesCopy)
      .force(
        'link',
        d3.forceLink<SimNode, SimLink>(linksCopy)
          .id((d: any) => d.id)
          .distance(d => 90 * (1.5 - d.weight * 0.7))
          .strength(d => 0.25 + d.weight * 0.5)
      )
      .force('charge', d3.forceManyBody().strength(-240))
      .force('center', d3.forceCenter(width / 2, heightNum / 2))
      .force('collide', d3.forceCollide<SimNode>().radius(d => d.radius + 18).iterations(2))
      .alphaDecay(0.026);

    simulationRef.current = simulation;

    let animFrame: number;

    simulation.on('tick', () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        setAnimatedNodes([...nodesCopy]);
        setAnimatedLinks([...linksCopy]);
      });
    });

    return () => {
      simulation.stop();
      cancelAnimationFrame(animFrame);
    };
  }, [initialSimNodes, initialSimLinks, height]);

  // Node Click: Suspend D3 physics simulation & open Slide-In Knowledge Inspector
  const handleNodeClick = (node: SimNode) => {
    if (simulationRef.current) {
      simulationRef.current.stop();
      setIsSimulationPaused(true);
    }
    setSelectedNode(node);
    setSelectedRelevance(node.relevanceScore);
    if (onNodeSelect) {
      onNodeSelect(node, node.relevanceScore);
    }
  };

  // Close Knowledge Inspector & Resume D3 Physics Simulation
  const handleCloseInspector = () => {
    setSelectedNode(null);
    if (simulationRef.current) {
      simulationRef.current.alpha(0.2).restart();
      setIsSimulationPaused(false);
    }
  };

  // Toggle manual pause/play of D3 physics
  const toggleSimulationPause = () => {
    if (!simulationRef.current) return;
    if (isSimulationPaused) {
      simulationRef.current.alpha(0.3).restart();
      setIsSimulationPaused(false);
    } else {
      simulationRef.current.stop();
      setIsSimulationPaused(true);
    }
  };

  // Viewport Zoom & Pan Handlers (Pure React State)
  const handleZoom = (factor: number) => {
    setViewportTransform(prev => ({
      ...prev,
      k: Math.max(0.3, Math.min(3.5, prev.k * factor))
    }));
  };

  const handleResetViewport = () => {
    setViewportTransform({ x: 0, y: 0, k: 1 });
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if ((e.target as HTMLElement).tagName !== 'svg') return;
    isPanningRef.current = true;
    panStartRef.current = { x: e.clientX - viewportTransform.x, y: e.clientY - viewportTransform.y };
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isPanningRef.current) return;
    setViewportTransform(prev => ({
      ...prev,
      x: e.clientX - panStartRef.current.x,
      y: e.clientY - panStartRef.current.y
    }));
  };

  const handleMouseUp = () => {
    isPanningRef.current = false;
  };

  const handleCopySnippet = () => {
    if (!selectedNode) return;
    navigator.clipboard.writeText(selectedNode.content);
    setIsCopied(true);
    toast.success("Cuplikan teks mentah disalin ke clipboard.");
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Real-Time Node Search Filter logic
  const isNodeMatching = useCallback((node: SimNode): boolean => {
    const q = searchFilter.trim().toLowerCase();
    if (!q) return true;
    return (
      node.title.toLowerCase().includes(q) ||
      node.content.toLowerCase().includes(q) ||
      node.category.toLowerCase().includes(q) ||
      (node.tags && node.tags.some(t => t.toLowerCase().includes(q))) ||
      false
    );
  }, [searchFilter]);

  // High-Resolution PNG Export (Preserves dark-mode slate-950 for corporate pitch decks)
  const handleExportPng = async () => {
    if (!svgElementRef.current) return;
    setIsExporting(true);
    try {
      const svgEl = svgElementRef.current;
      const rect = svgEl.getBoundingClientRect();
      const width = rect.width || 850;
      const height = rect.height || 580;

      // Clone SVG to modify for export without affecting screen display
      const clonedSvg = svgEl.cloneNode(true) as SVGSVGElement;
      clonedSvg.setAttribute('width', `${width}`);
      clonedSvg.setAttribute('height', `${height}`);
      clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

      // Add crisp dark-mode background rect as first child
      const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bgRect.setAttribute('width', `${width}`);
      bgRect.setAttribute('height', `${height}`);
      bgRect.setAttribute('fill', '#020617'); // slate-950 dark background
      clonedSvg.insertBefore(bgRect, clonedSvg.firstChild);

      // Serialize SVG to XML string
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(clonedSvg);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      // Create 2x high-resolution canvas for crisp Retina output
      const scale = 2;
      const canvas = document.createElement('canvas');
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D context not available');

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);

        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `chestadotcom-knowledge-graph-${Date.now()}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        toast.success('Grafik berhasil diekspor (Retina High-Res 2x PNG)');
        setIsExporting(false);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        toast.error('Gagal mengekspor grafik SVG.');
        setIsExporting(false);
      };
      img.src = url;
    } catch (err) {
      console.error('Export graph error:', err);
      toast.error('Gagal mengekspor grafik.');
      setIsExporting(false);
    }
  };

  // Helper to extract coordinates of links
  const resolvedLinks = useMemo(() => {
    return animatedLinks.map(link => {
      const sourceNode = typeof link.source === 'object' ? link.source as SimNode : animatedNodes.find(n => n.id === link.source);
      const targetNode = typeof link.target === 'object' ? link.target as SimNode : animatedNodes.find(n => n.id === link.target);
      return {
        ...link,
        sourceNode,
        targetNode
      };
    }).filter(l => Boolean(l.sourceNode && l.targetNode));
  }, [animatedLinks, animatedNodes]);

  return (
    <div 
      ref={containerRef}
      className={`relative bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-[0_25px_80px_rgba(0,0,0,0.7)] overflow-hidden font-mono flex flex-col ${className}`}
      style={{ height }}
    >
      {/* Background terminal micro-grid */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top HUD Control Bar with Real-Time Search & High-Res PNG Export */}
      <div className="relative z-10 px-4 py-3 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Title & Telemetry */}
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          <span className="font-bold tracking-wider text-slate-200 uppercase flex items-center gap-1.5">
            <Network size={14} className="text-purple-400" />
            Knowledge Graph Visualizer
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
            {animatedNodes.length} NODES // {resolvedLinks.length} SYNAPSES
          </span>
        </div>

        {/* 1. Sleek Glassmorphic Real-Time Search Input Filter */}
        <div className="flex-1 max-w-sm flex items-center gap-1.5 min-w-[210px]">
          <div className="relative w-full">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Cari node real-time (Next.js, SLA, biaya, SEO)..."
              className="w-full pl-8 pr-7 py-1.5 bg-slate-950/80 backdrop-blur-xl border border-purple-500/30 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-purple-400 focus:ring-1 focus:ring-purple-500/40 transition-colors shadow-2xs font-sans"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* 2. Action Controls & High-Res PNG Export Button */}
        <div className="flex items-center gap-1.5 flex-wrap">
          
          {/* High-Resolution PNG Export Button */}
          <button
            onClick={handleExportPng}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-slate-900 border border-purple-500/30 text-purple-200 hover:text-white hover:bg-purple-950/40 backdrop-blur-md transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
            title="Ekspor graf dalam resolusi tinggi (Retina 2x PNG untuk pitch deck)"
          >
            <Download size={13} className={isExporting ? "animate-bounce text-purple-400" : "text-purple-400"} />
            <span className="font-semibold text-[11px]">{isExporting ? "EXPORTING..." : "EXPORT GRAPH"}</span>
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
              showSettings ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Filter & Ambang Batas Vektor"
          >
            <Sliders size={13} />
          </button>

          <button
            onClick={toggleSimulationPause}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            title={isSimulationPaused ? "Resume D3 Physics" : "Suspend D3 Physics"}
          >
            {isSimulationPaused ? <Play size={13} className="text-emerald-400" /> : <Pause size={13} />}
          </button>

          <button
            onClick={() => handleZoom(1.25)}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn size={13} />
          </button>

          <button
            onClick={() => handleZoom(0.8)}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut size={13} />
          </button>

          <button
            onClick={handleResetViewport}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Reset View"
          >
            <RotateCcw size={13} />
          </button>
        </div>

      </div>

      {/* Settings / Filter Drawer */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative z-10 bg-slate-900/95 border-b border-slate-800 px-4 py-2.5 text-xs flex flex-wrap items-center gap-5"
          >
            <div className="flex items-center gap-2">
              <span className="text-slate-400 uppercase text-[10px] font-bold">Category:</span>
              <div className="flex gap-1 overflow-x-auto">
                {['all', 'architecture', 'pricing', 'performance', 'seo', 'automation', 'auto_learned'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2 py-0.5 rounded text-[10px] cursor-pointer transition-all ${
                      filterCategory === cat
                        ? 'bg-purple-600 text-white font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 uppercase text-[10px] font-bold">
                Cosine Threshold: {(similarityThreshold * 100).toFixed(0)}%
              </span>
              <input
                type="range"
                min="0.1"
                max="0.85"
                step="0.05"
                value={similarityThreshold}
                onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
                className="w-24 accent-purple-500 cursor-pointer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dark-mode Edge-to-Edge SVG Canvas (Separation of Concerns: React + Framer Motion Rendering) */}
      <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-950 select-none">
        
        <svg
          ref={svgElementRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <defs>
            {/* Bioluminescent Synapse Pulse Filter */}
            <filter id="synapse-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Central Ambient Core Glow */}
            <radialGradient id="centerCoreHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Viewport Transform Group for Zoom & Pan */}
          <g transform={`translate(${viewportTransform.x}, ${viewportTransform.y}) scale(${viewportTransform.k})`}>
            
            {/* Central Neural Halo */}
            <circle
              cx={425}
              cy={280}
              r={180}
              fill="url(#centerCoreHalo)"
              pointerEvents="none"
            />

            {/* 1. EDGES: The Bioluminescent Synapse Effect (Framer Motion stroke-dasharray & stroke-dashoffset) */}
            <g className="edges-layer">
              {resolvedLinks.map(link => {
                const s = link.sourceNode!;
                const t = link.targetNode!;
                const sx = s.x || 0;
                const sy = s.y || 0;
                const tx = t.x || 0;
                const ty = t.y || 0;

                const sMatches = isNodeMatching(s);
                const tMatches = isNodeMatching(t);
                const isEdgeDimmed = searchFilter.trim() !== '' && (!sMatches || !tMatches);

                const color = CATEGORY_THEME[s.category]?.streamColor || '#818cf8';

                return (
                  <motion.g 
                    key={link.id}
                    animate={{ opacity: isEdgeDimmed ? 0.15 : 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Base Faint Relationship Guide */}
                    <line
                      x1={sx}
                      y1={sy}
                      x2={tx}
                      y2={ty}
                      stroke="#1e293b"
                      strokeWidth={1}
                      strokeOpacity={0.6}
                    />

                    {/* Bioluminescent Pulse of Digital Energy Travelling From One Node to Another */}
                    <motion.line
                      x1={sx}
                      y1={sy}
                      x2={tx}
                      y2={ty}
                      stroke={color}
                      strokeWidth={link.isNew ? 2.8 : Math.max(1.4, link.weight * 3)}
                      strokeDasharray="8 14"
                      initial={{ strokeDashoffset: 44, opacity: 0 }}
                      animate={{ 
                        strokeDashoffset: [44, 0], 
                        opacity: isEdgeDimmed ? 0.12 : [0.35, 0.95, 0.35] 
                      }}
                      transition={{ 
                        duration: link.isNew ? 1.5 : 2.6, 
                        repeat: Infinity, 
                        ease: 'linear' 
                      }}
                      filter="url(#synapse-glow)"
                    />
                  </motion.g>
                );
              })}
            </g>

            {/* 2. NODES: Framer Motion Rendering with Dynamic Search Opacity & Bioluminescent Glow */}
            <g className="nodes-layer">
              {animatedNodes.map(node => {
                const isSelected = selectedNode?.id === node.id;
                const isNew = node.isNew || newlyAddedNodeIds.has(node.id);
                const theme = CATEGORY_THEME[node.category] || CATEGORY_THEME.architecture;
                const nx = node.x || 0;
                const ny = node.y || 0;

                // Real-Time Search Match Calculation
                const isMatch = isNodeMatching(node);
                const hasActiveSearch = searchFilter.trim() !== '';

                return (
                  <motion.g
                    key={node.id}
                    transform={`translate(${nx}, ${ny})`}
                    // Node Entrance Animation: Elastic spring physics scale 0 to 1
                    initial={{ scale: 0, opacity: 0 }}
                    // Framer Motion Dynamic Search Filtering: 20% opacity for non-matching nodes
                    animate={{ 
                      scale: isSelected ? 1.25 : (hasActiveSearch && isMatch ? 1.1 : 1), 
                      opacity: isMatch ? 1 : 0.2 
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      scale: { type: 'spring', stiffness: 280, damping: 18, mass: 0.9 },
                      opacity: { duration: 0.25, ease: 'easeInOut' }
                    }}
                    onClick={() => handleNodeClick(node)}
                    className="cursor-pointer group"
                  >
                    {/* Vibrant Pulsing Glowing Border for Matching Search Nodes */}
                    {hasActiveSearch && isMatch && (
                      <motion.circle
                        r={node.radius + 8}
                        fill="none"
                        stroke="#c084fc"
                        strokeWidth={2.8}
                        animate={{ 
                          scale: [1, 1.22, 1], 
                          opacity: [0.65, 1, 0.65] 
                        }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                        filter="url(#synapse-glow)"
                      />
                    )}

                    {/* Soft Bioluminescent Pulsing Aura Halo */}
                    <motion.circle
                      r={node.radius + 6}
                      fill={theme.glow}
                      animate={{ 
                        scale: [1, 1.3, 1], 
                        opacity: isNew || isSelected ? [0.6, 0.95, 0.6] : [0.3, 0.6, 0.3] 
                      }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      filter="url(#synapse-glow)"
                    />

                    {/* Active Selected Ring */}
                    {isSelected && (
                      <motion.circle
                        r={node.radius + 10}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={1.8}
                        strokeDasharray="4 4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      />
                    )}

                    {/* Circular Node Core Body */}
                    <circle
                      r={node.radius}
                      fill={theme.fill}
                      stroke={isSelected || (hasActiveSearch && isMatch) ? '#ffffff' : theme.stroke}
                      strokeWidth={isSelected ? 3 : (hasActiveSearch && isMatch ? 2.5 : 1.5)}
                      className="transition-colors shadow-2xl"
                    />

                    {/* Category Initial Text */}
                    <text
                      textAnchor="middle"
                      dy=".35em"
                      fill="#ffffff"
                      fontSize={Math.max(9, node.radius * 0.65)}
                      fontWeight="bold"
                      pointerEvents="none"
                    >
                      {node.category.slice(0, 1).toUpperCase()}
                    </text>

                    {/* Node Title Label */}
                    <text
                      textAnchor="middle"
                      dy={node.radius + 14}
                      fill={isSelected || (hasActiveSearch && isMatch) ? '#ffffff' : '#94a3b8'}
                      fontSize="9.5px"
                      fontFamily="sans-serif"
                      fontWeight={isSelected || (hasActiveSearch && isMatch) ? 'bold' : 'normal'}
                      pointerEvents="none"
                      className="group-hover:fill-white transition-colors"
                    >
                      {node.title.length > 18 ? node.title.slice(0, 16) + '...' : node.title}
                    </text>

                    {/* Live Relevance Score Underneath */}
                    <text
                      textAnchor="middle"
                      dy={node.radius + 25}
                      fill="#34d399"
                      fontSize="8px"
                      fontWeight="bold"
                      pointerEvents="none"
                    >
                      {(node.relevanceScore * 100).toFixed(0)}% rel
                    </text>
                  </motion.g>
                );
              })}
            </g>

          </g>
        </svg>

        {/* Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-[10px] flex items-center gap-3 pointer-events-none">
          {Object.entries(CATEGORY_THEME).map(([key, item]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="text-slate-400 capitalize">{key.replace('_', ' ')}</span>
            </div>
          ))}
        </div>

        {/* INTERACTIVE SIDE-PANEL OVERLAY (SLIDE-IN KNOWLEDGE INSPECTOR) */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="absolute top-0 right-0 bottom-0 w-84 sm:w-96 bg-slate-900/80 backdrop-blur-2xl border-l border-purple-500/30 shadow-[0_0_50px_rgba(0,0,0,0.85)] z-30 flex flex-col overflow-hidden text-xs font-mono"
            >
              {/* Header with Close Button (Resumes D3 Physics Simulation) */}
              <div className="px-5 py-4 border-b border-purple-500/20 flex items-center justify-between bg-slate-950/40">
                <div className="flex items-center gap-2">
                  <Database size={14} className="text-purple-400" />
                  <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                    Knowledge Node Inspector
                  </span>
                </div>
                <button
                  onClick={handleCloseInspector}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Tutup & Lanjutkan Simulasi D3"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Inspector Content */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 font-sans text-slate-300">
                
                {/* Node Title & Category Badge */}
                <div>
                  <span 
                    className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-1.5"
                    style={{ 
                      backgroundColor: `${CATEGORY_THEME[selectedNode.category]?.fill}20`,
                      color: CATEGORY_THEME[selectedNode.category]?.stroke,
                      border: `1px solid ${CATEGORY_THEME[selectedNode.category]?.stroke}40`
                    }}
                  >
                    {selectedNode.category}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-snug font-sans">
                    {selectedNode.title}
                  </h3>
                </div>

                {/* Vector Relevance Similarity Score Gauge */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-purple-500/30 font-mono">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                      <Sparkles size={13} className="text-emerald-400" />
                      VECTOR RELEVANCE SCORE
                    </span>
                    <span className="text-base font-bold text-emerald-400">
                      {(selectedRelevance * 100).toFixed(1)}%
                    </span>
                  </div>

                  {/* Gradient Meter Bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedRelevance * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
                    <span>Cosine Distance Metric</span>
                    <span>Confidence: {((selectedNode.confidence || 0.95) * 100).toFixed(0)}%</span>
                  </div>
                </div>

                {/* Raw Text Snippet Display with Instant Copy */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 font-mono text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <FileText size={12} className="text-indigo-400" />
                      RAW TEXT SNIPPET
                    </span>
                    <button
                      onClick={handleCopySnippet}
                      className="flex items-center gap-1 text-[10px] text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check size={11} /> : <Copy size={11} />}
                      <span>{isCopied ? 'Tersalin' : 'Salin Snippet'}</span>
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 text-xs font-sans text-slate-200 leading-relaxed max-h-56 overflow-y-auto scrollbar-thin select-text">
                    {selectedNode.content}
                  </div>
                </div>

                {/* Injection Timestamp & Metadata */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 font-mono text-[10px] space-y-1.5 text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock size={11} className="text-slate-400" />
                      INJECTION TIMESTAMP:
                    </span>
                    <span className="text-slate-300 font-semibold truncate max-w-[170px]">
                      {formatTimestamp(selectedNode.syncedAt)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Cpu size={11} className="text-slate-400" />
                      VECTOR DIMENSIONS:
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      3,072-D Gemini Embeddings
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1">
                      <ShieldCheck size={11} className="text-slate-400" />
                      FIRESTORE NODE ID:
                    </span>
                    <span className="text-slate-400 font-mono truncate max-w-[150px]">
                      {selectedNode.id}
                    </span>
                  </div>
                </div>

              </div>

              {/* Inspector Footer */}
              <div className="p-3.5 border-t border-purple-500/20 bg-slate-950/60 flex items-center justify-between font-mono text-[10px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>D3 Simulation Suspended</span>
                </span>
                <button
                  onClick={handleCloseInspector}
                  className="px-2.5 py-1 rounded bg-purple-600/30 hover:bg-purple-600 text-purple-300 hover:text-white transition-colors cursor-pointer"
                >
                  Resume Physics
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Bottom Status Ribbon */}
      <div className="relative z-10 px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-semibold">D3 Math Engine + Framer Motion SVG</span>
          <span className="text-slate-600">//</span>
          <span className="text-slate-500">Real-time search filter aktif; non-matching nodes 20% opacity; matching nodes pulsating glow</span>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          <span>High-Res Export: Ready</span>
          <span>Zero DOM Mutation</span>
        </div>
      </div>

    </div>
  );
}
