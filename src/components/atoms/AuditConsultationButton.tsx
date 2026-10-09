'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useAuditCtaTracker } from '../../hooks/useAuditCtaTracker';

interface AuditConsultationButtonProps {
  whatsappUrl: string;
  serviceTitle?: string;
  serviceSlug?: string;
  className?: string;
}

export default function AuditConsultationButton({
  whatsappUrl,
  serviceTitle,
  serviceSlug,
  className = '',
}: AuditConsultationButtonProps) {
  const { trackAuditClick } = useAuditCtaTracker();

  const handleClick = () => {
    trackAuditClick({
      serviceTitle,
      serviceSlug,
      ctaText: 'Dapatkan Audit & Konsultasi Gratis',
      href: whatsappUrl,
    });
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={
          className ||
          'inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-lg cursor-pointer'
        }
      >
        <MessageCircle size={18} />
        <span>
          <b>Dapatkan Audit &amp; Konsultasi Gratis</b>
        </span>
      </a>
    </motion.div>
  );
}
