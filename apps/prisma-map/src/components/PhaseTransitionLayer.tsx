import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePhase } from '../state/PhaseContext';

const messages: Record<string, string> = {
  'pre->live': 'SIGNAL: LIVE · THE SCORE WAKES UP IN THE HALLWAYS',
  'live->archive': 'TRACE: AFTERIMAGE · ROUTES CONTINUE WITHOUT YOU'
};

export const PhaseTransitionLayer: React.FC = () => {
  const { lastTransition } = usePhase();
  const [visible, setVisible] = React.useState(lastTransition);

  useEffect(() => {
    if (!lastTransition) return;
    setVisible(lastTransition);
    const timer = window.setTimeout(() => setVisible(null), 2200);
    return () => window.clearTimeout(timer);
  }, [lastTransition]);

  const key = visible ? `${visible.from}->${visible.to}` : '';
  const label = key && messages[key] ? messages[key] : visible ? `PHASE SHIFT: ${visible.from} → ${visible.to}` : '';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={visible.id}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="w-full h-full bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute px-6 py-4 rounded-xl border border-rose-200/60 bg-gradient-to-br from-rose-900/90 via-black/80 to-black/70 text-rose-50 font-mono text-sm tracking-[0.18em] text-center max-w-xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {label}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

