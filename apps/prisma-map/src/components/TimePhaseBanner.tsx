import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePhase } from '../state/PhaseContext';

export const TimePhaseBanner: React.FC = () => {
  const { phase } = usePhase();

  const text =
    phase === 'pre'
      ? 'You are early. This is a rehearsal map; the performance converges at The Wild Beast.'
      : phase === 'live'
        ? 'The performance is live. Choose a route and follow the map.'
        : 'Archive mode: PRISMA has left its trace. You can still traverse the map.';

  return (
    <AnimatePresence mode="wait">
      {text && (
        <motion.div
          key={phase}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="px-4 py-2 bg-neutral-200 text-xs font-mono tracking-[0.16em] uppercase border-b border-neutral-300"
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
