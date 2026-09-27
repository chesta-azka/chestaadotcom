'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Cpu, Network, Zap, Plus, RefreshCw, Trash2, 
  Database, Activity, CheckCircle2, AlertTriangle, ShieldCheck, 
  Flame, Search, ArrowUpRight, Copy, Check, Radio, Eye, Layers,
  Sparkles, Code, Server, GitCommit, Play, ArrowRight, FileText
} from 'lucide-react';
import { 
  subscribeToKnowledgeGraph, 
  injectKnowledgeNode, 
  deleteKnowledgeNode, 
  seedKnowledgeBrain, 
  searchVectorBrain, 
  type KnowledgeNode, 
  type VectorSearchResult 
} from '../../lib/vectorBrain';
import toast from 'react-hot-toast';
import KnowledgeGraphVisualizer from './KnowledgeGraphVisualizer';

const CATEGORY_STYLES: Record<string, { badge: string; text: string; dot: string; glow: string; streamColor: string }> = {
  architecture: { badge: 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300', text: 'text-indigo-400', dot: '#818cf8', glow: 'rgba(129, 140, 248, 0.6)', streamColor: '#6366f1' },
  pricing: { badge: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300', text: 'text-emerald-400', dot: '#34d399', glow: 'rgba(52, 211, 153, 0.6)', streamColor: '#10b981' },
  performance: { badge: 'bg-amber-950/80 border-amber-500/40 text-amber-300', text: 'text-amber-400', dot: '#fbbf24', glow: 'rgba(251, 191, 36, 0.6)', streamColor: '#f59e0b' },
  seo: { badge: 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300', text: 'text-cyan-400', dot: '#22d3ee', glow: 'rgba(34, 211, 238, 0.6)', streamColor: '#06b6d4' },
  automation: { badge: 'bg-purple-950/80 border-purple-500/40 text-purple-300', text: 'text-purple-400', dot: '#c084fc', glow: 'rgba(192, 132, 252, 0.6)', streamColor: '#a855f7' },
  auto_learned: { badge: 'bg-rose-950/80 border-rose-500/40 text-rose-300', text: 'text-rose-400', dot: '#fb7185', glow: 'rgba(251, 113, 133, 0.6)', streamColor: '#f43f5e' },
};

export default function AdminKnowledgeGraph() {
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSyncingNodeId, setActiveSyncingNodeId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  
  // Real-time RAG Search Simulator State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<VectorSearchResult[]>([]);
  const [searchLatency, setSearchLatency] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'d3_force' | 'svg_topology'>('d3_force');

  // Raw Injection Form State
  const [rawText, setRawText] = useState('');
  const [rawTitle, setRawTitle] = useState('');
  const [rawCategory, setRawCategory] = useState<KnowledgeNode['category']>('architecture');
  const [isInjecting, setIsInjecting] = useState(false);
  const [flashSuccessId, setFlashSuccessId] = useState<string | null>(null);
  const [injectedChunksCount, setInjectedChunksCount] = useState<number | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 850, height: 480 });

  // 1. Real-time Firestore onSnapshot Subscription
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToKnowledgeGraph(
      (updatedNodes) => {
        // Trigger soft pulsing on newly added or updated nodes
        if (nodes.length > 0 && updatedNodes.length > nodes.length) {
          const newest = updatedNodes[0];
          setActiveSyncingNodeId(newest.id);
          setTimeout(() => setActiveSyncingNodeId(null), 3500);
        }
        setNodes(updatedNodes);
        setLoading(false);

        if (updatedNodes.length === 0) {
          seedKnowledgeBrain().catch(console.warn);
        }
      },
      (err) => {
        console.error("Firestore onSnapshot subscription failed:", err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Window resize handler for SVG canvas
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setSvgDimensions({ width: rect.width || 850, height: rect.height || 480 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [nodes.length]);

  // Compute organic 2D orbital network coordinates for circular nodes
  const graphLayout = useMemo(() => {
    const w = svgDimensions.width;
    const h = svgDimensions.height;
    const centerX = w / 2;
    const centerY = h / 2;
    const total = nodes.length;

    if (total === 0) return { nodesWithPos: [], links: [] };

    const nodesWithPos = nodes.map((node, i) => {
      const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
      // Stagger orbital layers for an organic neural web
      const orbitalRadius = 120 + (i % 3) * 55;
      const x = Math.max(50, Math.min(w - 50, centerX + Math.cos(angle) * orbitalRadius));
      const y = Math.max(50, Math.min(h - 50, centerY + Math.sin(angle) * (orbitalRadius * 0.76)));
      return { ...node, x, y };
    });

    const links: { source: typeof nodesWithPos[0]; target: typeof nodesWithPos[0]; streamColor: string }[] = [];
    for (let i = 0; i < nodesWithPos.length; i++) {
      for (let j = i + 1; j < nodesWithPos.length; j++) {
        const a = nodesWithPos[i];
        const b = nodesWithPos[j];
        if (a.category === b.category || Math.abs(i - j) === 1 || (i === 0 && j === nodesWithPos.length - 1)) {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 310) {
            const streamColor = CATEGORY_STYLES[a.category]?.streamColor || '#818cf8';
            links.push({ source: a, target: b, streamColor });
          }
        }
      }
    }

    return { nodesWithPos, links };
  }, [nodes, svgDimensions]);

  // Raw Knowledge Injection: Triggers Cloud Function with 15% Semantic Overlap Chunking
  const handleRawInjectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) {
      toast.error("Silakan masukkan teks atau data perusahaan.");
      return;
    }

    const titleToUse = rawTitle.trim() || `Insight: ${rawText.slice(0, 45).replace(/\n/g, ' ')}...`;

    setIsInjecting(true);
    setInjectedChunksCount(null);

    try {
      // 1. Trigger Cloud Function auto-learning vectorizer with 15% overlap
      const cfRes = await fetch('/api/cloud-functions/auto-learn-vectorizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: titleToUse,
          text: rawText.trim(),
          category: rawCategory
        })
      });

      const cfData = await cfRes.json();
      if (cfData.success && cfData.node) {
        const chunksCount = cfData.nodes?.length || 1;
        setInjectedChunksCount(chunksCount);
        setFlashSuccessId(cfData.node.id);
        setSelectedNode(cfData.node);
        toast.success(`Berhasil! ${chunksCount} simpul semantik (overlap 15%) disinkronkan ke Firestore Vector Brain.`);
        setRawText('');
        setRawTitle('');
        setTimeout(() => setFlashSuccessId(null), 3500);
      } else {
        // Fallback to direct injection endpoint
        const fallbackRes = await injectKnowledgeNode({
          title: titleToUse,
          content: rawText.trim(),
          category: rawCategory,
          source: 'manual_injection'
        });

        if (fallbackRes.success && fallbackRes.node) {
          setFlashSuccessId(fallbackRes.node.id);
          setSelectedNode(fallbackRes.node);
          toast.success("Knowledge node disinkronkan ke Firestore.");
          setRawText('');
          setRawTitle('');
          setTimeout(() => setFlashSuccessId(null), 3500);
        } else {
          toast.error(fallbackRes.error || "Gagal menyuntikkan knowledge node.");
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Injeksi gagal.");
    } finally {
      setIsInjecting(false);
    }
  };

  // Test Top-3 RAG Vector Search
  const handleTestSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await searchVectorBrain(searchQuery.trim());
      setSearchResults(res.results.slice(0, 3)); // STRICTLY TOP 3
      setSearchLatency(res.latencyMs);
      if (res.results.length > 0) {
        setSelectedNode(res.results[0].node);
        toast.success(`Top-3 RAG Cosine match (${res.latencyMs}ms)`);
      } else {
        toast.error("Tidak ada simpul dengan kemiripan semantik tinggi.");
      }
    } catch (err) {
      toast.error("Pencarian vektor gagal.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleDeleteNode = async (id: string, title: string) => {
    if (!window.confirm(`Hapus node "${title}" dari Firestore Brain?`)) return;
    try {
      const res = await deleteKnowledgeNode(id);
      if (res.success) {
        toast.success("Simpul pengetahuan berhasil dihapus.");
        if (selectedNode?.id === id) setSelectedNode(null);
      } else {
        toast.error("Gagal menghapus simpul.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Penghapusan gagal.");
    }
  };

  const filteredNodes = useMemo(() => {
    return nodes.filter((n) => {
      if (filterCategory !== 'all' && n.category !== filterCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
      }
      return true;
    });
  }, [nodes, filterCategory, searchQuery]);

  return (
    <div className="min-h-full bg-slate-950 text-slate-100 font-mono p-4 sm:p-7 rounded-3xl border border-slate-800 shadow-[0_30px_90px_rgba(0,0,0,0.7)] relative overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {/* High-Contrast Engineering Terminal Grid Backdrop */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Global CSS for SVG Dash-Stream Animations */}
      <style>{`
        @keyframes svgDashFlow {
          0% {
            stroke-dashoffset: 64;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-data-stream {
          animation: svgDashFlow 2.8s linear infinite;
        }
        .animate-data-stream-fast {
          animation: svgDashFlow 1.4s linear infinite;
        }
      `}</style>

      {/* Top Terminal Command Bar */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              SYS.BRAIN // KNOWLEDGE GRAPH COMMAND CENTER
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-slate-400">
              TOP-3 RAG // 15% OVERLAP
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            Real-Time SVG Neural Node Network
          </h1>
          <p className="text-xs text-slate-400 max-w-3xl mt-1 leading-relaxed font-sans">
            Terminal arsitektur vektor Firestore dengan sinkronisasi listener onSnapshot real-time, aliran data SVG stroke-dasharray bercahaya, dan injeksi semantik overlap 15%.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Switcher: D3 Interactive Force Graph vs SVG Stream */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
            <button
              onClick={() => setViewMode('d3_force')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'd3_force' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Network size={13} />
              <span>D3 Interactive Graph</span>
            </button>
            <button
              onClick={() => setViewMode('svg_topology')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'svg_topology' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity size={13} />
              <span>SVG Stream</span>
            </button>
          </div>

          <button
            onClick={() => seedKnowledgeBrain().then(() => toast.success("Core nodes re-seeded"))}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Seed Core Architect Nodes"
          >
            <RefreshCw size={14} className="text-emerald-400" />
            <span>RE-SEED BRAIN</span>
          </button>
        </div>
      </div>

      {/* Telemetry Status Strip */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1">
            <span>SYNCED NODES</span>
            <Database size={14} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{nodes.length}</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
            ● onSnapshot Stream
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1">
            <span>SEMANTIC OVERLAP</span>
            <Cpu size={14} className="text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">15% OVERLAP</div>
          <span className="text-[10px] text-indigo-400 flex items-center gap-1 mt-0.5">
            Zero Context Loss
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1">
            <span>RAG RETRIEVAL</span>
            <Zap size={14} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            TOP-3 CHUNKS
          </div>
          <span className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5">
            Token-Restricted Context
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1">
            <span>AUTO-LEARNED</span>
            <Flame size={14} className="text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {nodes.filter(n => n.category === 'auto_learned').length}
          </div>
          <span className="text-[10px] text-rose-400 flex items-center gap-1 mt-0.5">
            Cloud Function Active
          </span>
        </div>

      </div>

      {/* Main Command Center: Real-Time SVG Node Network + Raw Injection Form */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 Cols): Pure Real-Time SVG Node Network (NO BASIC GRIDS) */}
        <div className="lg:col-span-8 space-y-4">
          
          {viewMode === 'd3_force' ? (
            <KnowledgeGraphVisualizer
              nodes={nodes}
              onNodeSelect={(node, relevance) => setSelectedNode(node)}
              selectedNodeId={selectedNode?.id}
              height={520}
            />
          ) : (
            <div className="relative bg-slate-950 rounded-2xl border border-slate-800/90 shadow-2xl overflow-hidden min-h-[480px] flex flex-col">
              
              {/* SVG Network HUD Bar */}
              <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Terminal size={14} className="text-emerald-400" />
                  <span className="font-bold">SVG_NODE_TOPOLOGY</span>
                  <span className="text-slate-500">// {nodes.length} CIRCULAR NODES CONNECTED</span>
                </div>

                {/* Category Filter Chips */}
                <div className="flex items-center gap-1 overflow-x-auto max-w-full">
                  {['all', 'architecture', 'pricing', 'performance', 'seo', 'automation', 'auto_learned'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-2 py-0.5 rounded text-[10px] transition-all cursor-pointer ${
                        filterCategory === cat
                          ? 'bg-purple-600 text-white font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pure SVG Animated Node Network */}
              <div className="flex-1 w-full h-[480px] relative flex items-center justify-center bg-slate-950">
                {loading ? (
                  <div className="flex flex-col items-center gap-3 text-slate-500">
                    <RefreshCw size={24} className="animate-spin text-purple-500" />
                    <span className="text-xs">ESTABLISHING REAL-TIME FIRESTORE ON_SNAPSHOT STREAM...</span>
                  </div>
                ) : nodes.length === 0 ? (
                  <div className="text-center p-6 text-slate-500">
                    <AlertTriangle size={28} className="mx-auto mb-2 text-amber-500" />
                    <p className="text-sm">Knowledge Graph Kosong di Firestore</p>
                  </div>
                ) : (
                  <svg
                    ref={svgRef}
                    className="w-full h-full select-none"
                    viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
                  >
                    <defs>
                      <radialGradient id="centerCoreGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="neuralLink" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.25" />
                      </linearGradient>
                    </defs>

                    {/* Central System Core Halo */}
                    <circle
                      cx={svgDimensions.width / 2}
                      cy={svgDimensions.height / 2}
                      r={140}
                      fill="url(#centerCoreGlow)"
                    />
                    <circle
                      cx={svgDimensions.width / 2}
                      cy={svgDimensions.height / 2}
                      r={26}
                      fill="#0f172a"
                      stroke="#818cf8"
                      strokeWidth={2}
                      className="animate-pulse"
                    />
                    <text
                      x={svgDimensions.width / 2}
                      y={svgDimensions.height / 2 + 4}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize={8}
                      fontWeight="bold"
                    >
                      BRAIN
                    </text>

                    {/* Animated Connecting Neural Paths using stroke-dasharray to simulate glowing data streams */}
                    {graphLayout.links.map((link, i) => (
                      <g key={`stream-link-${i}`}>
                        {/* Base static faint path */}
                        <line
                          x1={link.source.x}
                          y1={link.source.y}
                          x2={link.target.x}
                          y2={link.target.y}
                          stroke="#1e293b"
                          strokeWidth={1.5}
                        />
                        {/* Flowing stroke-dasharray glowing data stream */}
                        <line
                          x1={link.source.x}
                          y1={link.source.y}
                          x2={link.target.x}
                          y2={link.target.y}
                          stroke={link.streamColor}
                          strokeWidth={1.6}
                          strokeDasharray="6 10"
                          className={i % 2 === 0 ? "animate-data-stream" : "animate-data-stream-fast"}
                          strokeOpacity={0.75}
                        />
                      </g>
                    ))}

                    {/* Connectors from Central Core to each Circular Node */}
                    {graphLayout.nodesWithPos.map((node, i) => (
                      <line
                        key={`core-stream-${i}`}
                        x1={svgDimensions.width / 2}
                        y1={svgDimensions.height / 2}
                        x2={node.x}
                        y2={node.y}
                        stroke="#475569"
                        strokeWidth={1}
                        strokeDasharray="4 8"
                        className="animate-data-stream"
                        strokeOpacity={0.4}
                      />
                    ))}

                    {/* Circular Nodes with Framer Motion Soft Pulsing */}
                    {graphLayout.nodesWithPos.map((node) => {
                      const isSelected = selectedNode?.id === node.id;
                      const isFlashing = flashSuccessId === node.id;
                      const isSyncing = activeSyncingNodeId === node.id;
                      const style = CATEGORY_STYLES[node.category] || CATEGORY_STYLES.architecture;

                      return (
                        <g
                          key={node.id}
                          transform={`translate(${node.x}, ${node.y})`}
                          onClick={() => setSelectedNode(node)}
                          className="cursor-pointer group"
                        >
                          {/* Soft Pulsing Aura Ring on Sync or Selection */}
                          {(isSelected || isFlashing || isSyncing) && (
                            <motion.circle
                              r={30}
                              fill="none"
                              stroke={isFlashing ? '#34d399' : style.dot}
                              strokeWidth={2}
                              strokeDasharray="4 4"
                              animate={{ rotate: 360, scale: [1, 1.15, 1], opacity: [0.9, 0.4, 0.9] }}
                              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            />
                          )}

                          {/* Outer Glow Halo */}
                          <circle
                            r={isSelected ? 20 : 16}
                            fill={style.dot}
                            fillOpacity={0.2}
                            className="transition-all duration-300 group-hover:scale-125"
                          />

                          {/* Circular Node Core Body */}
                          <circle
                            r={isSelected ? 16 : 13}
                            fill={isFlashing ? '#34d399' : style.dot}
                            stroke="#020617"
                            strokeWidth={2}
                            filter="drop-shadow(0 0 12px rgba(0,0,0,0.9))"
                            className="transition-transform group-hover:scale-110"
                          />

                          {/* Category Symbol / Initial */}
                          <text
                            textAnchor="middle"
                            dy=".35em"
                            fill="#020617"
                            fontSize={9}
                            fontWeight="bold"
                            pointerEvents="none"
                          >
                            {node.category.slice(0, 1).toUpperCase()}
                          </text>

                          {/* Node Label Text */}
                          <text
                            y={26}
                            textAnchor="middle"
                            fill={isSelected ? '#ffffff' : '#94a3b8'}
                            fontSize={9}
                            fontWeight={isSelected ? 'bold' : 'normal'}
                            className="transition-colors group-hover:fill-white select-none pointer-events-none"
                          >
                            {node.title.length > 20 ? node.title.slice(0, 18) + '...' : node.title}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                )}
              </div>

              {/* Bottom Status Ticker */}
              <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-bold">STREAM_ACTIVE</span>
                  <span className="text-slate-500">Firestore onSnapshot data streams flowing</span>
                </div>
                <span className="text-slate-500 hidden sm:block">Click any circular node to inspect properties & chunking</span>
              </div>

            </div>
          )}

          {/* Real-time Top-3 RAG Search Simulator */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Search size={14} className="text-purple-400" />
                TOP-3 RAG COSINE SIMILARITY SIMULATOR
              </span>
              {searchLatency !== null && (
                <span className="text-emerald-400 text-[11px]">
                  Top-3 matched in {searchLatency}ms
                </span>
              )}
            </div>

            <form onSubmit={handleTestSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Simulasikan pertanyaan klien untuk menguji Top-3 Cosine Similarity retrieval..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-purple-500"
              />
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                {isSearching ? <RefreshCw size={13} className="animate-spin" /> : <Zap size={13} />}
                <span>TEST TOP-3</span>
              </button>
            </form>

            {searchResults.length > 0 && (
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Top 3 Injected Chunks into LLM Context Window:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {searchResults.map((res, idx) => (
                    <div
                      key={res.node.id}
                      onClick={() => setSelectedNode(res.node)}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500 text-xs cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-white truncate">#{idx + 1} {res.node.title}</span>
                        <span className="text-emerald-400 font-bold ml-1">
                          {(res.similarity * 100).toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-slate-400 line-clamp-2 text-[11px] font-sans leading-relaxed">{res.node.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column (4 Cols): Sleek Glassmorphic Raw Injection Form & Node Inspector */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Sleek Glassmorphic Raw Text Injection Form with Micro-Interaction */}
          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl relative overflow-hidden">
            
            {/* Glowing Loading State Micro-Interaction Overlay */}
            {isInjecting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-slate-950/85 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="relative mb-3.5">
                  <div className="w-14 h-14 rounded-full border-2 border-purple-500 border-t-transparent animate-spin shadow-[0_0_25px_rgba(168,85,247,0.7)]" />
                  <Sparkles size={18} className="absolute inset-0 m-auto text-purple-400 animate-pulse" />
                </div>
                <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-1">
                  SEMANTIC CHUNKING (15% OVERLAP)...
                </h4>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  Triggering Firebase Cloud Function to vectorize, embed 3,072-D arrays, and synchronize circular nodes.
                </p>
              </motion.div>
            )}

            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal size={15} className="text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Raw Text Injection
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                15% OVERLAP
              </span>
            </div>

            <form onSubmit={handleRawInjectionSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  TITLE / ENTITY IDENTIFIER
                </label>
                <input
                  type="text"
                  value={rawTitle}
                  onChange={e => setRawTitle(e.target.value)}
                  placeholder="e.g. Kebijakan SLA Sub-Detik Next.js 15"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-hidden focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  CATEGORY ROUTE
                </label>
                <select
                  value={rawCategory}
                  onChange={e => setRawCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-purple-500 transition-colors cursor-pointer"
                >
                  <option value="architecture">Architecture</option>
                  <option value="pricing">Pricing & Cost</option>
                  <option value="performance">Performance & Vitals</option>
                  <option value="seo">Local SEO Domination</option>
                  <option value="automation">AI Autonomous Pipelines</option>
                  <option value="auto_learned">Auto-Learned Insight</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  RAW CORPORATE DATA / KNOWLEDGE *
                </label>
                <textarea
                  required
                  rows={4}
                  value={rawText}
                  onChange={e => setRawText(e.target.value)}
                  placeholder="Tempelkan data arsitektur, kebijakan biaya, atau spesifikasi teknis di sini. Sistem akan memecah secara semantik dengan overlap 15%."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-hidden focus:border-purple-500 transition-colors font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isInjecting || !rawText.trim()}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(147,51,234,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Sparkles size={14} />
                <span>INJECT & VECTORIZE</span>
              </button>
            </form>
          </div>

          {/* Circular Node Inspector Panel */}
          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Eye size={15} className="text-indigo-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Node Inspector
                </h3>
              </div>
              {selectedNode && (
                <button
                  onClick={() => handleDeleteNode(selectedNode.id, selectedNode.title)}
                  className="p-1 text-slate-400 hover:text-rose-400 rounded transition-colors cursor-pointer"
                  title="Delete Node"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>

            {selectedNode ? (
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${CATEGORY_STYLES[selectedNode.category]?.badge || 'bg-slate-900 border-slate-800'}`}>
                      {selectedNode.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      {((selectedNode.confidence || 0.95) * 100).toFixed(0)}% RELEVANCE
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1.5 leading-snug">
                    {selectedNode.title}
                  </h4>
                </div>

                {/* Relevance Score Meter */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Sparkles size={11} className="text-emerald-400" />
                      RELEVANCE SCORE
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {((selectedNode.confidence || 0.95) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full" 
                      style={{ width: `${(selectedNode.confidence || 0.95) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Raw Text Snippet with Copy Option */}
                <div>
                  <div className="flex items-center justify-between mb-1 text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1 font-mono">
                      <FileText size={12} className="text-indigo-400" />
                      RAW TEXT SNIPPET
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedNode.content);
                        toast.success("Cuplikan teks mentah disalin.");
                      }}
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Copy size={11} />
                      <span>Salin</span>
                    </button>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed max-h-40 overflow-y-auto scrollbar-thin select-text">
                    {selectedNode.content}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block">CONFIDENCE</span>
                    <span className="text-emerald-400 font-bold">{((selectedNode.confidence || 0.95) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block">SOURCE</span>
                    <span className="text-slate-300 font-bold truncate block">{selectedNode.source}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 col-span-2">
                    <span className="text-slate-500 block">FIRESTORE NODE ID</span>
                    <span className="text-slate-400 font-mono truncate block text-[10px]">{selectedNode.id}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs">
                <Database size={24} className="mx-auto mb-2 text-slate-600" />
                <p>Klik simpul circular pada graf SVG untuk memeriksa chunk semantik & metadata vektor.</p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
