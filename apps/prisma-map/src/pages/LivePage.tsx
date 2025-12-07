import React from 'react';
import { Link } from 'react-router-dom';
import { PhaseGuard } from '../components/PhaseGuard';
import { getPhase } from '@prisma/config';

export const LivePage: React.FC = () => {
  const phase = getPhase();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-serif text-2xl">Live stream</h2>
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-neutral-600">Currently: {phase}</p>
      <PhaseGuard
        allowed={['live']}
        fallback={
          <div className="font-serif text-sm text-neutral-700">
            The performance is not live at this moment. During the show, this panel will carry a link or embed for the
            stream. For now, explore the map and routes.
          </div>
        }
      >
        <div className="border border-neutral-300 rounded-2xl p-4 bg-white shadow-sm">
          <div className="h-48 flex items-center justify-center text-neutral-500 font-mono text-xs">
            Livestream placeholder (connect AV later)
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
  );
};
