import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

const ROILineChart = ({ roiPercentage }: { roiPercentage: number }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.innerHTML = '';

    const width = 300;
    const height = 150;
    const margin = { top: 10, right: 10, bottom: 20, left: 35 };

    const data = [
      { month: 1, value: 0 },
      { month: 2, value: roiPercentage * 0.1 },
      { month: 3, value: roiPercentage * 0.3 },
      { month: 4, value: roiPercentage * 0.6 },
      { month: 5, value: roiPercentage * 0.85 },
      { month: 6, value: roiPercentage }
    ];

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('width', '100%')
      .style('height', '100%')
      .style('overflow', 'visible');

    const x = d3.scaleLinear()
      .domain([1, 6])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 100])
      .range([height - margin.bottom, margin.top]);

    const line = d3.line<{month: number, value: number}>()
      .x(d => x(d.month))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    const area = d3.area<{month: number, value: number}>()
      .x(d => x(d.month))
      .y0(height - margin.bottom)
      .y1(d => y(d.value))
      .curve(d3.curveMonotoneX);

    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'roi-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#6b21a8')
      .attr('stop-opacity', 0.5);
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#6b21a8')
      .attr('stop-opacity', 0);

    svg.append('path')
      .datum(data)
      .attr('fill', 'url(#roi-gradient)')
      .attr('d', area);

    const path = svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#6b21a8')
      .attr('stroke-width', 3)
      .attr('d', line);

    const pathNode = path.node();
    if (pathNode) {
      const totalLength = pathNode.getTotalLength();
      path
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeCubicOut)
        .attr('stroke-dashoffset', 0);
    }

    svg.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.month))
      .attr('cy', d => y(d.value))
      .attr('r', 0)
      .attr('fill', '#fff')
      .attr('stroke', '#6b21a8')
      .attr('stroke-width', 2)
      .transition()
      .delay((d, i) => i * (2000 / data.length))
      .duration(500)
      .attr('r', 4);

    const yAxis = d3.axisLeft(y)
      .ticks(4)
      .tickFormat(d => d + '%');
      
    const yAxisGroup = svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis);
      
    yAxisGroup.select('.domain').remove();
    yAxisGroup.selectAll('line').remove();
    yAxisGroup.selectAll('text')
      .attr('fill', '#94a3b8')
      .style('font-family', 'ui-monospace, monospace')
      .style('font-size', '9px');
      
  }, [roiPercentage]);

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#6b21a8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="flex flex-col items-start space-y-1 mb-6 relative z-10">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">ROI GROWTH METRIC</span>
        <span className="text-4xl font-mono font-bold text-[#6b21a8] tracking-tight">+{roiPercentage}%</span>
      </div>
      <div ref={chartRef} className="w-full relative z-10 aspect-[2/1]" />
    </div>
  );
};

export default ROILineChart;
