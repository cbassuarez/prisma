import React from 'react';
import type { RouteId } from '@prisma/config';
import { prismaMapConfig } from '@prisma/config';
import { motion } from 'framer-motion';

interface Props {
  currentRoute: RouteId;
  onChange: (route: RouteId) => void;
}

export const RouteSelector: React.FC<Props> = ({ currentRoute, onChange }) => {
  const routes = prismaMapConfig.routes;

  return (
    <motion.div
      className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-neutral-400 bg-prisma-paper/70"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600">Route</span>
      <div className="flex items-center gap-2">
        {routes.map(route => (
          <button
            key={route.id}
            type="button"
            onClick={() => onChange(route.id)}
            className="relative inline-flex items-center gap-1"
          >
            <span
              className="inline-block rounded-full"
              style={{
                width: currentRoute === route.id ? 10 : 8,
                height: currentRoute === route.id ? 10 : 8,
                backgroundColor: route.color,
                boxShadow: currentRoute === route.id ? '0 0 0 2px rgba(0,0,0,0.7)' : 'none'
              }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
              {route.id}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};
