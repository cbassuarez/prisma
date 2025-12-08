import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PhaseGuard } from '../components/PhaseGuard';
import { GridPaperBackground } from '../components/GridPaperBackground';
import { EmergencyOverlay } from '../components/EmergencyOverlay';
import { usePhase } from '../state/PhaseContext';

function useCountdown(target: Date | null) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    if (!target) return undefined;
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (!target) return null;
  const diff = Math.max(0, target.getTime() - now.getTime());
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export const LivePage: React.FC = () => {
  const { phase, nextChangeAt } = usePhase();
  const countdown = useCountdown(nextChangeAt);

  const phaseCopy = {
    pre: {
      title: 'PRISMA is sleeping in the hallways.',
      body: 'Performance begins at 8:00 PM at THE WILD BEAST. Routes remain latent but can be studied.'
    },
    live: {
      title: 'Routes are active, listening.',
      body: 'The halls are awake; you may already be on the map. Track performers and stay with your color.'
    },
    archive: {
      title: 'Afterimage control.',
      body: 'The score has finished, but the routes continue without you. Walk the residue; leave your own trace.'
    }
  }[phase];

  return (
    <GridPaperBackground variant="light" className="min-h-[70vh] rounded-3xl overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600">Live control</p>
            <h1 className="font-serif text-3xl">/{phase.toUpperCase()}</h1>
          </div>
          {countdown && (
            <div className="text-right font-mono text-xs text-neutral-700">
              <p className="uppercase tracking-[0.2em]">Next phase</p>
              <p className="text-lg">{countdown}</p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-neutral-300 bg-white/80 p-5 shadow-sm">
          <h2 className="font-serif text-xl mb-2">{phaseCopy.title}</h2>
          <p className="font-mono text-sm leading-relaxed text-neutral-700">{phaseCopy.body}</p>
        </div>

        <PhaseGuard allowed={['live']}>
          <div className="border border-rose-400/70 rounded-2xl p-4 bg-rose-50/60 shadow-inner">
            <div className="h-48 flex items-center justify-center text-neutral-700 font-mono text-xs">
              Livestream placeholder (silent) · awaiting operator feed
            </div>
          </div>
        </PhaseGuard>

        <Link
          to="/map"
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-50 text-[10px] font-mono uppercase tracking-[0.18em] w-max"
        >
          Open the map
        </Link>
      </div>
      <EmergencyOverlay density="medium" />
    </GridPaperBackground>
  );
};
