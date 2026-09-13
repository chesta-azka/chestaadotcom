import React from 'react';

interface SectionSeparatorProps {
  variant?: string;
  index?: number;
  label?: string;
  className?: string;
}

export default function SectionSeparator({
  className = ''
}: SectionSeparatorProps) {
  return (
    <div className={`w-full ${className}`}>
      <hr className="w-full border-t border-slate-200 m-0 p-0" />
    </div>
  );
}
