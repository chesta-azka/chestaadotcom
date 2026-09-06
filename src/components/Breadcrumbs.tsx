import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'motion/react';
import curriculumData from '../data/academy-curriculum.json';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  let courseTitle = 'Masterclass';
  if (pathnames.length >= 2 && pathnames[0] === 'academy') {
    if (pathnames[1] === 'resources') {
      courseTitle = 'Resources & Checklist';
    } else {
      const found = curriculumData.tutorialContent?.find((c: any) => c.id === pathnames[1]);
      if (found) courseTitle = found.title;
    }
  }

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-wrap items-center gap-2 px-3.5 py-1.5 mb-6 bg-purple-50/80 border border-purple-100 rounded-full w-max font-sans text-xs shadow-2xs"
      aria-label="Breadcrumb"
    >
      <Link to="/" className="text-slate-600 hover:text-purple-900 transition-colors flex items-center gap-1 font-medium">
        <Home className="w-3.5 h-3.5" /> Beranda
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
      <Link to="/academy" className="text-slate-600 hover:text-purple-900 transition-colors font-medium">
        Academy
      </Link>
      {pathnames.length > 1 && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-purple-900 font-semibold line-clamp-1 max-w-[200px]">{courseTitle}</span>
        </>
      )}
    </motion.nav>
  );
}
