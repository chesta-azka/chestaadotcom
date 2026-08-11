import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface DashboardCardProps {
  title: string;
  value?: string | number;
  icon: ReactNode;
  children?: ReactNode;
  trend?: {
    value: string;
    isUp: boolean;
  };
  className?: string;
}

export default function DashboardCard({ title, value, icon, children, trend, className = '' }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/[0.02] border border-gray-100 rounded-3xl p-6 hover:bg-white/[0.04] transition-all duration-300 group ${className}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-2xl bg-gray-100 border border-gray-100 text-[#4f46e5] group-hover:bg-[#4f46e5] group-hover:text-black transition-colors duration-300">
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-mono px-2 py-1 rounded-full ${trend.isUp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            {trend.isUp ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">{title}</p>
        {value !== undefined && (
          <p className="text-2xl font-display font-bold text-gray-900 tracking-tight">{value}</p>
        )}
      </div>
      
      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
}
