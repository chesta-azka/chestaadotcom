import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, MessageCircle, Calendar } from 'lucide-react';
import { ActionButton } from '../organisms/FloatingAIAssistant';
import MeetingSchedulerChips from './MeetingSchedulerChips';

interface QuickReplyChipsProps {
  actions: ActionButton[];
  onSelect: (action: ActionButton) => void;
  disabled?: boolean;
  sessionId?: string;
}

export default function QuickReplyChips({ actions, onSelect, disabled = false, sessionId = 'sess_default' }: QuickReplyChipsProps) {
  const [showScheduler, setShowScheduler] = useState(false);

  if (!actions || actions.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 pt-2 pb-1 max-w-full">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex flex-wrap gap-2 overflow-x-auto max-w-full scrollbar-none items-center"
      >
        {actions.map((action, idx) => {
          const isWhatsApp = action.actionType === 'whatsapp';
          const isSchedule = action.actionType === 'schedule';

          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={disabled}
              onClick={() => {
                if (isSchedule) {
                  setShowScheduler(true);
                } else {
                  onSelect(action);
                }
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                isWhatsApp
                  ? 'bg-purple-600 hover:bg-purple-700 text-white border border-purple-600 shadow-xs shadow-purple-600/20'
                  : isSchedule
                  ? 'bg-purple-900 text-white border border-purple-900 hover:bg-purple-800 shadow-xs'
                  : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:shadow-sm hover:shadow-purple-600/20 group'
              }`}
            >
              {isWhatsApp ? (
                <MessageCircle size={13} className="text-white shrink-0" />
              ) : isSchedule ? (
                <Calendar size={13} className="text-white shrink-0" />
              ) : (
                <Sparkles size={13} className="text-purple-500 group-hover:text-white shrink-0 transition-colors" />
              )}
              <span>{action.label}</span>
              {!isWhatsApp && !isSchedule && (
                <ArrowRight size={12} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {showScheduler && (
        <MeetingSchedulerChips sessionId={sessionId} />
      )}
    </div>
  );
}
