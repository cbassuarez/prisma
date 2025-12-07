import React from 'react';
import { Link } from 'react-router-dom';
import { getPhase } from '@prisma/config';
import { motion } from 'framer-motion';

export const Landing: React.FC = () => {
  const phase = getPhase();

  let ctaLabel = 'Explore the map';
  if (phase === 'live') ctaLabel = 'Choose a route to follow';
  else if (phase === 'day-of-early') ctaLabel = 'Preview routes';

  return (
    <div className="flex flex-col gap-6 md:gap-10 lg:gap-12 py-4">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl"
      >
        <h1 className="font-serif text-3xl md:text-4xl mb-3">
          PRISMA · CalArts Edition
        </h1>
        <p className="font-mono text-xs md:text-sm tracking-[0.16em] uppercase mb-4">
          Processional / ritual · unsettled campus routes · convergence at The Wild Beast
        </p>
        <p className="font-serif text-sm md:text-base leading-relaxed">
          A campus-wide performance in four threads. Each path begins elsewhere on the grounds and converges at The
          Wild Beast. The map is both an architectural drawing and a set of instructions.
        </p>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="flex flex-wrap items-center gap-3"
      >
        <Link
          to="/map"
          className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-50 text-xs font-mono uppercase tracking-[0.18em]"
        >
          {ctaLabel}
        </Link>
        <Link
          to="/about"
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-neutral-400 text-[10px] font-mono uppercase tracking-[0.18em]"
        >
          About this experiment
        </Link>
      </motion.div>
    </div>
  );
};
