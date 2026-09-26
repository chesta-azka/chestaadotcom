import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, MessageSquare, BarChart, PenTool, LayoutDashboard, Search, Home, Users, Menu, X, Shield, Bot, Briefcase, Plus, FileText, Activity, MapPin, Sparkles, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SystemHealthHeader from '../organisms/SystemHealthHeader';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminDashboardLayout({ children, onLogout, activeTab, setActiveTab }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const tabs = [
    { id: 'dashboard', label: 'Dashboard & Analytics', icon: Activity },
    { id: 'appointments', label: 'Discovery Appointments', icon: Calendar },
    { id: 'kanban', label: 'Live Kanban & Vault', icon: Briefcase },
    { id: 'content_crud', label: 'Content CRUD Hub', icon: FileText },
    { id: 'blog_generator', label: 'Blog Outline AI', icon: PenTool },
    { id: 'blog_performance', label: 'Editorial Performance', icon: BarChart },
    { id: 'ai_leads', label: 'AI Lead Scoring', icon: Users },
    { id: 'ai_summaries', label: 'AI Chat Summaries', icon: FileText },
    { id: 'ai_training', label: 'AI Feedback & Training', icon: Sparkles },
    { id: 'business_config', label: 'Workspace Generator', icon: Plus },
    { id: 'chat', label: 'Comm-Link Audit', icon: MessageSquare },
    { id: 'blog_moderation', label: 'Blog Moderation', icon: Sparkles },
    { id: 'stats', label: 'Document Generator', icon: FileText },
    { id: 'seo', label: 'SLA Node Health', icon: Shield },
    { id: 'seo_manager', label: 'GEO-SEO Radar', icon: MapPin },
    { id: 'users', label: 'User Management', icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 w-full relative z-[100] overflow-hidden selection:bg-purple-600 selection:text-white font-sans">
      
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-6 right-6 z-[120] p-3 bg-white border border-slate-200 shadow-sm rounded-xl hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
      >
        {isMobileMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[105] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Modern Collapsible Sidebar */}
      <motion.aside 
        className={`fixed lg:static inset-y-0 left-0 bg-white text-slate-900 flex flex-col pt-6 pb-6 border-r border-slate-200/80 shadow-[4px_0_24px_rgba(0,0,0,0.02)] shrink-0 z-[110] transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
        initial={false}
        animate={{ x: window.innerWidth >= 1024 ? 0 : (isMobileMenuOpen ? 0 : (isCollapsed ? -80 : -288)) }}
      >
        
        {/* Header / Logo & Collapse Toggle */}
        <div className={`px-5 mb-8 flex items-center ${isCollapsed ? 'justify-center flex-col gap-3' : 'justify-between'}`}>
          <Link to="/" className="text-xl font-display font-semibold text-slate-900 flex flex-col gap-1 overflow-hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="bg-purple-600 text-white px-2.5 py-1 rounded-lg text-xs font-mono w-max leading-none">
              {isCollapsed ? 'SYS' : 'SYS.ADMIN'}
            </span>
            {!isCollapsed && <span className="text-xs tracking-wider text-slate-500 font-medium">COMMAND_CENTER</span>}
          </Link>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-purple-50 hover:text-purple-700 text-slate-500 transition-colors cursor-pointer"
            title={isCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                title={isCollapsed ? tab.label : undefined}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 font-medium text-[13px] transition-all rounded-xl cursor-pointer group relative ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 shadow-2xs font-semibold'
                    : 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
              >
                <tab.icon size={18} strokeWidth={2.5} className={`shrink-0 ${isActive ? 'text-purple-600' : 'text-slate-500 group-hover:text-slate-900'}`} />
                {!isCollapsed && <span className="truncate">{tab.label}</span>}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-150 transition-opacity z-50">
                    {tab.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="px-3 mt-auto pt-4 border-t border-slate-100">
          <button
            onClick={onLogout}
            title={isCollapsed ? "Terminate Session" : undefined}
            className={`w-full flex items-center gap-3 px-3.5 py-3 bg-white border border-slate-200 shadow-2xs rounded-xl font-mono font-medium uppercase text-xs hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all cursor-pointer group ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <LogOut size={16} strokeWidth={2.5} className="text-slate-600 group-hover:text-white shrink-0 transition-colors" />
            {!isCollapsed && <span className="truncate">LOGOUT</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area (No Footer) */}
      <main className="flex-1 overflow-y-auto pt-20 lg:pt-8 pb-16 px-4 sm:px-8 h-screen w-full lg:w-auto bg-slate-50/80">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          <div className="flex justify-end mb-6 border-b border-slate-200/80 pb-4 shrink-0">
            <SystemHealthHeader />
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="h-full pb-12"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
