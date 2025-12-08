import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GridPaperBackground } from '../components/GridPaperBackground';
import { EmergencyOverlay } from '../components/EmergencyOverlay';

const posters = [
  { id: 'routeA', title: 'ROUTE GUIDE A', snippet: 'End of the World → Wild Beast', transcript: 'Route A skirts the outer rail: outskirts / perimeter / descent to Beast.' },
  { id: 'routeB', title: 'ROUTE GUIDE B', snippet: 'Sublevel → Main Gallery → Beast', transcript: 'Route B surfaces from SUBLEVEL, tracks the Library spine, pivots to Beast.' },
  { id: 'routeC', title: 'ROUTE GUIDE C', snippet: 'Hallways → Entrance → Beast', transcript: 'Route C moves through interior hallways and glass frontage toward the Beast.' },
  { id: 'emergency', title: 'EMERGENCY PANEL', snippet: 'SOME ROOMS AREN’T FROM THIS FLOOR.', transcript: 'Emergency text: some rooms aren’t from this floor. Ignore one of them. The hallway keeps going.' }
];

export const DocPage: React.FC = () => {
  const [activePoster, setActivePoster] = useState<string | null>(null);

  return (
    <GridPaperBackground variant="light" className="rounded-3xl overflow-hidden">
      <div className="p-6 space-y-6">
        <header className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-600">Documentation</p>
          <h2 className="font-serif text-3xl">Posters & transcripts</h2>
          <p className="font-serif text-sm text-neutral-700 max-w-3xl">
            Field posters will land here as lightboxes. Use the transcripts below each tile while assets are loading.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-4">
          {posters.map(poster => (
            <div key={poster.id} className="rounded-xl border border-neutral-300 bg-white/80 p-4 flex flex-col gap-3 shadow-sm">
              <button
                type="button"
                onClick={() => setActivePoster(poster.id)}
                className="rounded-lg border border-neutral-400/70 bg-neutral-100/70 px-4 py-6 text-left hover:border-neutral-600 transition-colors"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-700">{poster.title}</p>
                <p className="font-serif text-lg text-neutral-900">{poster.snippet}</p>
              </button>
              <div className="font-mono text-xs text-neutral-700 leading-relaxed">
                <p className="uppercase tracking-[0.14em]">Transcript</p>
                <p className="mt-1 text-neutral-800">{poster.transcript}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activePoster && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePoster(null)}
          >
            <motion.div
              className="max-w-4xl w-full bg-white text-neutral-900 rounded-2xl p-6 shadow-xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600">Poster preview</p>
              <p className="font-serif text-2xl mt-2">{posters.find(p => p.id === activePoster)?.title}</p>
              <p className="font-serif text-sm mt-3 text-neutral-800">Visual asset incoming. Use transcript until the print is posted.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <EmergencyOverlay density="medium" />
    </GridPaperBackground>
  );
};
