import React from 'react';

interface LeadBadgeProps {
  tier?: string;
  score?: number | string;
  showScore?: boolean;
}

export default function LeadBadge({ tier, score, showScore = true }: LeadBadgeProps) {
  const normalizedTier = (tier || '').toLowerCase();
  const numScore = typeof score === 'number' ? score : parseInt(String(score || '50'), 10);

  let determinedTier = normalizedTier;
  if (!determinedTier) {
    if (numScore >= 75 || determinedTier.includes('hot')) determinedTier = 'hot lead';
    else if (numScore >= 40 || determinedTier.includes('warm')) determinedTier = 'warm lead';
    else determinedTier = 'cold lead';
  }

  const isHot = determinedTier.includes('hot') || numScore >= 75;
  const isWarm = determinedTier.includes('warm') || (numScore >= 40 && numScore < 75);

  if (isHot) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-xs shadow-rose-100/50">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
        HOT LEAD {showScore && score !== undefined ? `(${score})` : ''}
      </span>
    );
  }

  if (isWarm) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
        WARM LEAD {showScore && score !== undefined ? `(${score})` : ''}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      COLD {showScore && score !== undefined ? `(${score})` : ''}
    </span>
  );
}
