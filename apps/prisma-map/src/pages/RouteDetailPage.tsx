import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { prismaMapConfig, RouteId } from '@prisma/config';
import { motion } from 'framer-motion';

export const RouteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const routeId = (id?.toUpperCase() ?? 'A') as RouteId;
  const route = prismaMapConfig.routes.find(r => r.id === routeId);

  if (!route) {
    return (
      <div className="text-sm font-mono">
        Unknown route. <Link to="/routes/A" className="underline">Go to Route A</Link>
      </div>
    );
  }

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h2 className="font-serif text-2xl mb-2">Route {route.id}</h2>
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-3">
          {route.displayName}
        </p>
        <p className="font-serif text-sm leading-relaxed mb-4">
          {route.description}
        </p>
        <p className="font-mono text-[11px] leading-relaxed">
          This page hints at the route without revealing the score itself. The live performance and campus itself carry
          the rest of the information.
        </p>

        <div className="mt-5 flex gap-3">
          <Link
            to={`/map?route=${route.id}`}
            className="inline-flex items-center px-3 py-1.5 rounded-full border border-neutral-900 bg-neutral-900 text-neutral-50 text-[10px] font-mono uppercase tracking-[0.18em]"
          >
            Open map with route {route.id}
          </Link>
          <Link
            to="/map"
            className="inline-flex items-center px-3 py-1.5 rounded-full border border-neutral-400 text-[10px] font-mono uppercase tracking-[0.18em]"
          >
            View all routes
          </Link>
        </div>
      </div>

      <div className="border border-neutral-300 rounded-2xl overflow-hidden bg-prisma-paper">
        <div className="px-4 py-2 border-b border-neutral-300 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Map preview</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Route {route.id}</span>
        </div>
        <div className="p-2">
          {/* Later: embed a mini MapView that emphasizes only this route */}
          <div className="h-64 flex items-center justify-center text-xs font-mono text-neutral-500">
            Mini-map placeholder (wired later)
          </div>
        </div>
      </div>
    </motion.div>
  );
};
