import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPhase } from '@prisma/config';

export const TimePhaseBanner: React.FC = () => {
  const phase = getPhase();

  let text: string | null = null;

  if (phase === 'pre') {
    text = 'You are early. This is a rehearsal map; the performance converges at The Wild Beast.';
  } else if (phase === 'day-of-early') {
    text = 'The performance begins at 20:00. You can preview the routes and choose a path.';
  } else if (phase === 'live') {
    text = 'The performance is live. Choose a route and follow the map.';
  } else if (phase === 'day-of-late') {
    text = 'The performance has concluded. You can still explore where they walked tonight.';
  } else if (phase === 'day-after') {
    text = 'This happened yesterday. A film/installation is in preparation.';
  } else {
    text = 'Archive mode: PRISMA has left its trace. You can still traverse the map.';
  }

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
