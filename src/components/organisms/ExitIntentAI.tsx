'use client';

import React, { useEffect } from 'react';

export default function ExitIntentAI() {
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        const hasTriggered = sessionStorage.getItem('chestaa_exit_intent_triggered');
        if (!hasTriggered) {
          sessionStorage.setItem('chestaa_exit_intent_triggered', 'true');
          
          // Forcefully open AI Concierge and inject exit intent message
          window.dispatchEvent(new CustomEvent('open-ai-concierge', {
            detail: {
              initialMessage: 'Sistem mendeteksi Anda akan meninggalkan halaman. Apakah Anda ingin saya mengirimkan ringkasan kalkulasi ROI dan arsitektur ini ke email Anda?'
            }
          }));
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return null;
}
