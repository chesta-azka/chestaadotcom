import { ReactNode } from 'react';

interface DashboardNavItemProps {
  key?: string | number;
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: string | number;
}

export default function DashboardNavItem({ icon, label, isActive, onClick, badge }: DashboardNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group ${
        isActive 
          ? 'bg-[#6b21a8] text-black shadow-lg shadow-[#6b21a8]/10' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`${isActive ? 'text-black' : 'text-[#6b21a8] group-hover:text-[#6b21a8] opacity-80'}`}>
          {icon}
        </span>
        <span className="text-xs font-sans font-bold tracking-wider uppercase">
          {label}
        </span>
      </div>
      
      {badge && (
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
          isActive ? 'bg-black text-[#6b21a8]' : 'bg-slate-200 text-slate-600'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}
