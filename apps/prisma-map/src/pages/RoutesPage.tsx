import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { prismaMapConfig, RouteId, RouteMeta } from '@prisma/config';
import { RouteMiniMap } from '../components/RouteMiniMap';
import { GridPaperBackground } from '../components/GridPaperBackground';
import { EmergencyOverlay } from '../components/EmergencyOverlay';

interface RouteStripProps {
  route: RouteMeta;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const RouteStrip: React.FC<RouteStripProps> = ({ route, isActive, onHover, onLeave }) => (
  <motion.button
    type="button"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    onFocus={onHover}
    onBlur={onLeave}
    className="w-full text-left py-4 border-b border-neutral-300 last:border-b-0"
    whileHover={{ x: 4 }}
    transition={{ type: 'spring', stiffness: 120, damping: 18 }}
  >
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-sm" style={{ color: route.color }}>
        {route.id}
      </span>
      <span className={`font-mono text-lg ${isActive ? 'font-semibold' : 'font-normal'}`}>{route.labelShort}</span>
    </div>
    <div className="mt-1 font-mono text-xs text-neutral-700">{route.labelLong}</div>
    <p className="mt-2 text-sm font-serif text-neutral-800/90">{route.description}</p>
  </motion.button>
);

export const RoutesPage: React.FC = () => {
  const routes = useMemo(() => Object.values(prismaMapConfig.routeMeta), []);
  const [hoveredRoute, setHoveredRoute] = useState<RouteId>('A');

  return (
    <GridPaperBackground variant="light" className="rounded-3xl overflow-hidden">
      <div className="p-6 space-y-8">
        <header className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-600">Route guide a–d</p>
          <h1 className="font-serif text-3xl">Follow any line you can see</h1>
          <p className="font-serif text-sm text-neutral-700 max-w-3xl">
            A digital counterpart to the hallway posters. Hover or focus each route to ping its trace on the mini-map below.
          </p>
        </header>

        <section className="grid md:grid-cols-[1.2fr_minmax(0,0.9fr)] gap-6 items-start">
          <div className="rounded-2xl border border-neutral-300 bg-white/80">
            {routes.map(route => (
              <RouteStrip
                key={route.id}
                route={route}
                isActive={hoveredRoute === route.id}
                onHover={() => setHoveredRoute(route.id)}
                onLeave={() => setHoveredRoute(prev => prev === route.id ? route.id : prev)}
              />
            ))}
          </div>

          <div>
            <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-neutral-600">Live trace preview</h2>
            <div className="mt-3 rounded-2xl border border-neutral-300 bg-neutral-50/80 p-3 shadow-sm">
              <RouteMiniMap activeRouteId={hoveredRoute} />
            </div>
          </div>
        </section>
      </div>
      <EmergencyOverlay density="medium" />
    </GridPaperBackground>
  );
};

