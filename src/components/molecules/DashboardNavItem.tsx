import { ReactNode } from 'react';

interface DashboardNavItemProps {
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
          ? 'bg-[#4f46e5] text-black shadow-lg shadow-[#4f46e5]/10' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`${isActive ? 'text-black' : 'text-[#4f46e5] group-hover:text-[#4f46e5] opacity-80'}`}>
          {icon}
        </span>
        <span className="text-xs font-sans font-bold tracking-wider uppercase">
          {label}
        </span>
      </div>
      
      {badge && (
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
          isActive ? 'bg-black text-[#4f46e5]' : 'bg-gray-200 text-gray-600'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}
