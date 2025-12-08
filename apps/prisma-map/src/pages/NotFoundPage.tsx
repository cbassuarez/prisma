import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">
        404 · Off the map
      </p>
      <h1 className="font-serif text-2xl md:text-3xl">
        This page is outside the plotted routes.
      </h1>
      <p className="font-serif text-sm md:text-[15px] leading-relaxed max-w-md text-neutral-700">
        PRISMA knows four main paths and a handful of corridors. This URL is not one of them. You can return to the main
        map or start again at the landing page.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        <Link
          to="/map"
          className="inline-flex items-center px-3 py-1.5 rounded-full border border-neutral-900 bg-neutral-900 text-neutral-50 text-[10px] font-mono uppercase tracking-[0.18em]"
        >
          Go to map
        </Link>
        <Link
          to="/"
          className="inline-flex items-center px-3 py-1.5 rounded-full border border-neutral-400 text-[10px] font-mono uppercase tracking-[0.18em]"
        >
          Back to landing
        </Link>
      </div>
    </div>
  );
};
