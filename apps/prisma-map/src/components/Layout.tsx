import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TimePhaseBanner } from './TimePhaseBanner';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-prisma-paper text-prisma-ink flex flex-col">
      <header className="px-4 py-3 border-b border-neutral-300 flex items-center justify-between">
        <Link to="/" className="font-serif text-lg tracking-wide">
          PRISMA · CalArts Edition
        </Link>
        <nav className="flex gap-4 text-xs font-mono uppercase tracking-[0.18em]">
          <Link to="/map" className={location.pathname.startsWith('/map') ? 'underline' : ''}>
            Map
          </Link>
          <Link to="/routes/A" className={location.pathname.startsWith('/routes') ? 'underline' : ''}>
            Routes
          </Link>
          <Link to="/live" className={location.pathname.startsWith('/live') ? 'underline' : ''}>
            Live
          </Link>
          <Link to="/about" className={location.pathname.startsWith('/about') ? 'underline' : ''}>
            About
          </Link>
          <Link to="/doc" className={location.pathname.startsWith('/doc') ? 'underline' : ''}>
            Doc
          </Link>
        </nav>
      </header>

      <TimePhaseBanner />

      <main className="flex-1 flex items-stretch justify-center">
        <div className="w-full max-w-5xl px-4 py-6">{children}</div>
      </main>
    </div>
  );
};
