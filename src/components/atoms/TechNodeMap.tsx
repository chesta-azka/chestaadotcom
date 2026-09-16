import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'motion/react';

interface TechNode extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  size: number;
  label: string;
}

interface TechLink extends d3.SimulationLinkDatum<TechNode> {
  source: string | TechNode;
  target: string | TechNode;
  value: number;
}

const nodes: TechNode[] = [
  // Core
  { id: 'Chesta', group: 1, size: 45, label: 'CHESTAA' },
  
  // Frontend
  { id: 'React', group: 2, size: 30, label: 'React' },
  { id: 'NextJS', group: 2, size: 35, label: 'Next.js' },
  { id: 'Tailwind', group: 2, size: 25, label: 'Tailwind' },
  { id: 'Motion', group: 2, size: 25, label: 'Motion' },
  { id: 'TypeScript', group: 2, size: 28, label: 'TypeScript' },
  
  // Backend & Cloud
  { id: 'Firebase', group: 3, size: 32, label: 'Firebase' },
  { id: 'GCP', group: 3, size: 35, label: 'GCP' },
  { id: 'Firestore', group: 3, size: 22, label: 'Firestore' },
  { id: 'CloudRun', group: 3, size: 22, label: 'Cloud Run' },
  
  // AI
  { id: 'Gemini', group: 4, size: 38, label: 'Gemini AI' },
  { id: 'AIStudio', group: 4, size: 28, label: 'AI Studio' },
  { id: 'LLM', group: 4, size: 25, label: 'LLMs' },
  
  // Design
  { id: 'Figma', group: 5, size: 25, label: 'Figma' },
  { id: 'Framer', group: 5, size: 22, label: 'Framer' },
];

const links: TechLink[] = [
  // Core connections
  { source: 'Chesta', target: 'NextJS', value: 2 },
  { source: 'Chesta', target: 'GCP', value: 2 },
  { source: 'Chesta', target: 'Gemini', value: 2 },
  { source: 'Chesta', target: 'Figma', value: 2 },
  
  // Tech relationships
  { source: 'NextJS', target: 'React', value: 1 },
  { source: 'NextJS', target: 'Tailwind', value: 1 },
  { source: 'NextJS', target: 'TypeScript', value: 1 },
  { source: 'React', target: 'Motion', value: 1 },
  
  { source: 'GCP', target: 'CloudRun', value: 1 },
  { source: 'GCP', target: 'Firebase', value: 1 },
  { source: 'Firebase', target: 'Firestore', value: 1 },
  
  { source: 'Gemini', target: 'AIStudio', value: 1 },
  { source: 'Gemini', target: 'LLM', value: 1 },
  { source: 'Gemini', target: 'GCP', value: 1 },
  
  { source: 'Figma', target: 'Framer', value: 1 },
  { source: 'Figma', target: 'NextJS', value: 1 },
];

export default function TechNodeMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height])
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation<TechNode>(nodes)
      .force('link', d3.forceLink<TechNode, TechLink>(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX(width / 2).strength(0.1))
      .force('y', d3.forceY(height / 2).strength(0.1));

    const g = svg.append('g');

    const link = g.append('g')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value) * 2);

    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag<any, TechNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    const colors = ['#6b21a8', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

    node.append('circle')
      .attr('r', d => d.size)
      .attr('fill', d => colors[d.group - 1])
      .attr('fill-opacity', 0.15)
      .attr('stroke', d => colors[d.group - 1])
      .attr('stroke-width', 2)
      .attr('class', 'transition-all duration-300 hover:fill-opacity-30 cursor-pointer');

    node.append('text')
      .text(d => d.label)
      .attr('x', 0)
      .attr('y', 5)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-[10px] font-mono font-bold fill-slate-700 pointer-events-none uppercase tracking-tighter')
      .style('font-size', d => d.id === 'Chesta' ? '12px' : '10px');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="w-full bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200 overflow-hidden relative"
    >
      <div className="absolute top-6 left-6 z-10">
        <h4 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
          Tech Ecosystem Map
        </h4>
        <p className="text-[10px] text-slate-500 font-medium mt-1">
          Interactive force-directed visualization of our tech stack
        </p>
      </div>
      
      <div className="absolute bottom-6 left-6 z-10 flex gap-4">
        {[
          { label: 'Core', color: 'bg-purple-600' },
          { label: 'Frontend', color: 'bg-blue-500' },
          { label: 'Cloud', color: 'bg-emerald-500' },
          { label: 'AI', color: 'bg-amber-500' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-tighter">{item.label}</span>
          </div>
        ))}
      </div>

      <svg ref={svgRef} className="w-full h-[500px]" />
    </motion.div>
  );
}
