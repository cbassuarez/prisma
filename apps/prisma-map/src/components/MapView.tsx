import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { prismaMapConfig, RouteId } from '@prisma/config';
import { AudienceMap } from '../svg/AudienceMap';
import { RouteSelector } from './RouteSelector';
import { FloorSelector } from './FloorSelector';

type FloorId = 'sub' | 'l2' | 'l3';

interface SvgRefs {
  floors: Record<FloorId, SVGGElement | null>;
  floorButtons: Record<FloorId, SVGGElement | null>;
  routeGroups: Record<RouteId, SVGGElement | null>;
  cursorDot: SVGCircleElement | null;
}

export const MapView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRoute = (searchParams.get('route')?.toUpperCase() as RouteId) || 'A';

  const [currentRoute, setCurrentRoute] = useState<RouteId>(initialRoute);
  const [currentFloor, setCurrentFloor] = useState<FloorId>('l2');
  const [isAnimating, setIsAnimating] = useState(false);

  const svgContainerRef = useRef<HTMLDivElement | null>(null);
  const svgRefs = useRef<SvgRefs | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // After mount, query the SVG DOM.
  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;

    const svg = container.querySelector('svg');
    if (!svg) return;

    const getGroup = (id: string) => svg.querySelector(`#${id}`) as SVGGElement | null;
    const getCircle = (id: string) => svg.querySelector(`#${id}`) as SVGCircleElement | null;

    const floors: SvgRefs['floors'] = {
      sub: getGroup('floor-sub'),
      l2: getGroup('floor-l2'),
      l3: getGroup('floor-l3')
    };

    const floorButtons: SvgRefs['floorButtons'] = {
      sub: getGroup('floor-sub-button'),
      l2: getGroup('floor-l2-button'),
      l3: getGroup('floor-l3-button')
    };

    const routeGroups: SvgRefs['routeGroups'] = {
      A: getGroup('routeGroup_A'),
      B: getGroup('routeGroup_B'),
      C: getGroup('routeGroup_C'),
      D: getGroup('routeGroup_D')
    };

    svgRefs.current = {
      floors,
      floorButtons,
      routeGroups,
      cursorDot: getCircle('cursorDot')
    };

    // initialize floor
    setFloor('l2');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setFloor(floor: FloorId) {
    if (!svgRefs.current) return;
    setCurrentFloor(floor);

    const { floors, floorButtons } = svgRefs.current;

    (Object.keys(floors) as FloorId[]).forEach(key => {
      const el = floors[key];
      if (!el) return;
      el.style.display = key === floor ? 'block' : 'none';
    });

    (Object.keys(floorButtons) as FloorId[]).forEach(key => {
      const group = floorButtons[key];
      if (!group) return;
      const rect = group.querySelector('rect');
      const text = group.querySelector('text');
      if (!rect || !text) return;
      if (key === floor) {
        rect.setAttribute('class', 'floor-button-active');
        text.setAttribute('fill', '#f5f2ec');
      } else {
        rect.setAttribute('class', 'floor-button');
        text.removeAttribute('fill');
      }
    });
  }

  function emphasizeRoute(routeId: RouteId) {
    if (!svgRefs.current) return;
    const { routeGroups } = svgRefs.current;

    (Object.keys(routeGroups) as RouteId[]).forEach(key => {
      const g = routeGroups[key];
      if (!g) return;
      g.style.opacity = key === routeId ? '1' : '0.35';
    });
  }

  function handleRouteChange(next: RouteId) {
    setCurrentRoute(next);
    emphasizeRoute(next);
  }

  function stopAnimation() {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsAnimating(false);
  }

  function animateRoute(routeId: RouteId, durationMs = 80000) {
    if (!svgRefs.current) return;
    const { cursorDot } = svgRefs.current;
    if (!cursorDot) return;

    const poly = svgContainerRef.current?.querySelector(`#route_${routeId}`) as SVGPolylineElement | null;
    if (!poly) return;

    const pointsAttr = poly.getAttribute('points') || '';
    const points = pointsAttr
      .trim()
      .split(/\s+/)
      .map(pair => {
        const [x, y] = pair.split(',').map(Number);
        return { x, y };
      })
      .filter(p => Number.isFinite(p.x) && Number.isFinite(p.y));

    if (points.length < 2) return;

    stopAnimation();
    setIsAnimating(true);

    const route = prismaMapConfig.routes.find(r => r.id === routeId);
    const effectiveDuration = (route?.defaultDurationSeconds ?? durationMs / 1000) * 1000;

    let startTime: number | null = null;

    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const t = (ts - startTime) / effectiveDuration;

      if (t >= 1) {
        const last = points[points.length - 1];
        cursorDot.style.visibility = 'visible';
        cursorDot.setAttribute('cx', String(last.x));
        cursorDot.setAttribute('cy', String(last.y));
        setIsAnimating(false);
        animationFrameRef.current = null;
        return;
      }

      const scaled = t * (points.length - 1);
      const i = Math.floor(scaled);
      const frac = scaled - i;
      const p0 = points[i];
      const p1 = points[i + 1] || p0;

      const x = p0.x + (p1.x - p0.x) * frac;
      const y = p0.y + (p1.y - p0.y) * frac;

      cursorDot.style.visibility = 'visible';
      cursorDot.setAttribute('cx', String(x));
      cursorDot.setAttribute('cy', String(y));

      // TODO: use prismaMapConfig.route.segments to auto-switch floors
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);
  }

  useEffect(() => {
    emphasizeRoute(currentRoute);
  }, [currentRoute]);

  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full max-w-3xl border border-neutral-300 rounded-3xl shadow-sm bg-prisma-paper overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-300 flex items-center justify-between">
          <div>
            <div className="font-serif text-sm">CalArts Campus · Map</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em]">
              Choose any line you can see or imagine
            </div>
          </div>
          <RouteSelector currentRoute={currentRoute} onChange={handleRouteChange} />
        </div>
        <div className="p-3">
          <div ref={svgContainerRef} className="w-full flex items-center justify-center">
            <AudienceMap />
          </div>
        </div>
        <div className="px-4 py-2 border-t border-neutral-300 flex items-center justify-between">
          <FloorSelector currentFloor={currentFloor} onChange={setFloor} />
          <button
            type="button"
            onClick={() => animateRoute(currentRoute)}
            className="inline-flex items-center px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-50 text-[10px] font-mono uppercase tracking-[0.18em]"
          >
            {isAnimating ? 'Following…' : 'Play route'}
          </button>
        </div>
      </div>
    </div>
  );
};
