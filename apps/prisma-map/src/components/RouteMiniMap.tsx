import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RouteId } from '@prisma/config';
import { AudienceMap } from '../svg/AudienceMap';

interface RouteMiniMapProps {
  activeRouteId: RouteId;
}

const startPositions: Record<RouteId, { x: number; y: number }> = {
  A: { x: 95, y: 190 },
  B: { x: 274, y: 229 },
  C: { x: 220, y: 206 },
  D: { x: 210, y: 240 }
};

export const RouteMiniMap: React.FC<RouteMiniMapProps> = ({ activeRouteId }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pingKey, setPingKey] = useState<number>(Date.now());

  useEffect(() => {
    setPingKey(Date.now());
  }, [activeRouteId]);

  useEffect(() => {
    const svg = containerRef.current?.querySelector('svg');
    if (!svg) return;
    const routeGroups: Record<RouteId, SVGGElement | null> = {
      A: svg.querySelector('#routeGroup_A'),
      B: svg.querySelector('#routeGroup_B'),
      C: svg.querySelector('#routeGroup_C'),
      D: svg.querySelector('#routeGroup_D')
    };
    (Object.keys(routeGroups) as RouteId[]).forEach(id => {
      const group = routeGroups[id];
      if (!group) return;
      group.style.opacity = id === activeRouteId ? '1' : '0.25';
      const poly = group.querySelector('polyline');
      if (poly) {
        poly.setAttribute('stroke-width', id === activeRouteId ? '4.5' : '2.4');
      }
    });
  }, [activeRouteId]);

  const start = startPositions[activeRouteId];
  const pctX = (start.x / 600) * 100;
  const pctY = (start.y / 400) * 100;

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-2xl border border-neutral-300 bg-white">
      <div className="absolute inset-0 opacity-60 pointer-events-none" aria-hidden>
        <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,#d6cdbf_1px,transparent_0)] [background-size:18px_18px]" />
      </div>
      <div className="relative z-10">
        <AudienceMap />
      </div>
      {start && (
        <motion.div
          key={pingKey}
          className="pointer-events-none absolute"
          style={{ left: `${pctX}%`, top: `${pctY}%`, transform: 'translate(-50%, -50%)' }}
          initial={{ scale: 0.6, opacity: 0.3 }}
          animate={{ scale: [0.6, 1.2, 0.8, 1], opacity: [0.3, 0.8, 0.6, 0] }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        >
          <div className="w-12 h-12 rounded-full border border-rose-400/60 bg-rose-200/10" />
        </motion.div>
      )}
    </div>
  );
};

