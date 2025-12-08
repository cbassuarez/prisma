import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phase } from '@prisma/config';

interface RitualPhaseStripProps {
  phase: Phase;
}

const phaseLabel: Record<Phase, string> = {
  pre: 'SIM',
  live: 'LIVE',
  archive: 'TRACE'
};

const phaseLine: Record<Phase, string> = {
  pre: 'Routes are drawn but dormant until the performance.',
  live: 'Routes are awake in the corridors tonight.',
  archive: 'Afterimage · the routes have been walked; echoes remain.'
};

export const RitualPhaseStrip: React.FC<RitualPhaseStripProps> = ({ phase }) => {
  return (
    <div className="sticky top-0 z-20 backdrop-blur-sm bg-prisma-paper/70 border-b border-neutral-300/70">
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="px-4 sm:px-6 lg:px-12 py-2 flex flex-col gap-1"
        >
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.24em] text-neutral-800">
            <span>PRISMA</span>
            <span className="text-neutral-500">·</span>
            <span>CalArts Edition</span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-900">{phaseLabel[phase]}</span>
            <span className="flex-1 h-px bg-neutral-300/60" aria-hidden />
            <span className="text-[10px] tracking-[0.2em] text-neutral-600">status</span>
          </div>
          <div className="text-[11px] sm:text-xs font-mono tracking-[0.14em] text-neutral-700">
            {phaseLine[phase]}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
