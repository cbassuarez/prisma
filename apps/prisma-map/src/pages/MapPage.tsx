import React, { useEffect, useMemo, useState } from 'react';
import {
  MapPhaseMode,
  RouteId,
  getMapPhaseMode,
  getRouteProgress,
  prismaMapConfig
} from '@prisma/config';
import { PrismaSvgMap } from '../components/PrismaSvgMap';

type FloorCode = 'SUB' | 'L2' | 'L3';

const modeCopy: Record<MapPhaseMode, { label: string; line: string }> = {
  pre: {
    label: 'SIM',
    line: 'Routes are drawn but dormant until the performance.'
  },
  live: {
    label: 'LIVE',
    line: 'Routes are awake in the corridors tonight.'
  },
  trace: {
    label: 'TRACE',
    line: 'Afterimage · the routes have been walked; echoes remain.'
  }
};

const routeColorTokens: Record<string, string> = {
  red: '#e34e4e',
  blue: '#2f66d0',
  yellow: '#e0b422',
  green: '#2f9d4d'
};

const GEO_BOUNDS = {
  minLat: 34.3945,
  maxLat: 34.3995,
  minLng: -118.5655,
  maxLng: -118.5605
};

const SVG_BOUNDS = { xMin: 40, xMax: 560, yMin: 52, yMax: 340 };

function projectPosition(lat: number, lng: number) {
  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
  const clampedLat = clamp(lat, GEO_BOUNDS.minLat, GEO_BOUNDS.maxLat);
  const clampedLng = clamp(lng, GEO_BOUNDS.minLng, GEO_BOUNDS.maxLng);

  const tLng = (clampedLng - GEO_BOUNDS.minLng) / (GEO_BOUNDS.maxLng - GEO_BOUNDS.minLng);
  const tLat = (clampedLat - GEO_BOUNDS.minLat) / (GEO_BOUNDS.maxLat - GEO_BOUNDS.minLat);

  const x = SVG_BOUNDS.xMin + tLng * (SVG_BOUNDS.xMax - SVG_BOUNDS.xMin);
  const y = SVG_BOUNDS.yMax - tLat * (SVG_BOUNDS.yMax - SVG_BOUNDS.yMin);
  return { x, y };
}

export const MapPage: React.FC = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<RouteId>('A');
  const [floor, setFloor] = useState<FloorCode>('L2');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [userPosition, setUserPosition] = useState<{ x: number; y: number } | null>(null);
  const [tick, setTick] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const mode = useMemo(() => getMapPhaseMode(new Date(tick)), [tick]);
  const routeProgress = useMemo(() => getRouteProgress(selectedRouteId, new Date(tick)), [selectedRouteId, tick]);

  const routes = prismaMapConfig.routes;
  const activeRoute = routes.find(r => r.id === selectedRouteId);

  const handleEnableLocation = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation not available on this device.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        const projected = projectPosition(latitude, longitude);
        setUserPosition(projected);
        setLocationEnabled(true);
      },
      () => {
        setLocationError('Unable to fetch location.');
        setLocationEnabled(false);
      }
    );
  };

  const modeMeta = modeCopy[mode];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="text-neutral-800 flex flex-col gap-1">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-neutral-700">
          MAP · LIVE ROUTE CONSOLE · {modeMeta.label}
        </div>
        <div className="text-sm text-neutral-700 font-mono">{modeMeta.line}</div>
      </div>

      <div className="w-full bg-white/70 border border-neutral-200 rounded-3xl shadow-sm p-4 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-3">
          <PrismaSvgMap
            routeId={selectedRouteId}
            routeProgress={routeProgress}
            floor={floor}
            onFloorChange={setFloor}
            onRouteDotClick={setSelectedRouteId}
            userPosition={userPosition}
            showUser={locationEnabled}
          />
          {mode === 'live' && (
            <div className="font-mono text-[11px] tracking-[0.08em] text-neutral-600 text-center">
              Cursor shows the score’s estimated position; performers may wander.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {routes.map(route => {
                const tone = routeColorTokens[route.colorKey] || route.color;
                const isActive = route.id === selectedRouteId;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => setSelectedRouteId(route.id)}
                    className="px-3 py-2 rounded-full border text-sm font-mono tracking-[0.08em] transition-colors"
                    style={{
                      borderColor: tone,
                      backgroundColor: isActive ? tone : 'transparent',
                      color: isActive ? '#f5f2ec' : '#111111'
                    }}
                  >
                    {route.shortLabel}
                  </button>
                );
              })}
            </div>

            <div className="border border-neutral-200 rounded-2xl p-3 bg-neutral-50">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-neutral-600">Active route</div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex flex-col">
                  <span className="font-serif text-lg">{activeRoute?.displayName ?? '—'}</span>
                  <span className="font-mono text-xs text-neutral-600">{activeRoute?.codename}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs uppercase tracking-[0.1em]">Floor: {floor}</div>
                  <div className="font-mono text-[11px] text-neutral-600">
                    {activeRoute?.floorHint ?? 'Mixed circulation'}
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-neutral-200 rounded-2xl p-3 bg-white">
              <Disclosure
                title="Text route description"
                defaultOpen={true}
                body={
                  <div className="mt-2 flex flex-col gap-2 text-sm text-neutral-800">
                    <ol className="list-decimal list-inside space-y-1">
                      {(activeRoute?.fieldManualSteps ?? []).map(step => (
                        <li key={step} className="font-serif">
                          {step}
                        </li>
                      ))}
                    </ol>
                    <div className="italic text-neutral-600 font-serif text-sm">
                      If you lose the line, re-enter at any node you recognize.
                    </div>
                  </div>
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="border border-neutral-200 rounded-2xl p-3 bg-white">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-neutral-600">Location</div>
              <div className="mt-2 text-sm text-neutral-800">
                This allows the map to estimate where you are on campus. Your location is not stored.
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={handleEnableLocation}
                  className="px-3 py-2 rounded-full bg-neutral-900 text-neutral-50 font-mono text-xs uppercase tracking-[0.12em]"
                >
                  Enable
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocationEnabled(false);
                    setLocationError(null);
                  }}
                  className="px-3 py-2 rounded-full border border-neutral-300 font-mono text-xs uppercase tracking-[0.12em]"
                >
                  Not now
                </button>
              </div>
              {locationError && (
                <div className="mt-2 font-mono text-xs text-red-600">{locationError}</div>
              )}
              {locationEnabled && userPosition && (
                <div className="mt-2 font-mono text-xs text-green-700">Location enabled.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DisclosureProps {
  title: string;
  body: React.ReactNode;
  defaultOpen?: boolean;
}

const Disclosure: React.FC<DisclosureProps> = ({ title, body, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between font-mono text-xs uppercase tracking-[0.12em] text-neutral-700"
      >
        <span>{title}</span>
        <span className="text-lg leading-none">{open ? '▾' : '▸'}</span>
      </button>
      {open && <div className="mt-2">{body}</div>}
    </div>
  );
};
