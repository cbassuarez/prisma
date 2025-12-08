import React, { useMemo } from 'react';
import { RouteId, RouteProgress } from '@prisma/config';

export interface PrismaSvgMapProps {
  routeId: RouteId;
  routeProgress: RouteProgress;
  floor: 'SUB' | 'L2' | 'L3';
  onFloorChange?: (floor: 'SUB' | 'L2' | 'L3') => void;
  onRouteDotClick?: (routeId: RouteId) => void;
  userPosition?: { x: number; y: number } | null;
  showUser?: boolean;
}

interface Point {
  x: number;
  y: number;
}

const ROUTE_POINTS: Record<RouteId, Point[]> = {
  A: [
    { x: 95, y: 190 },
    { x: 140, y: 190 },
    { x: 190, y: 190 },
    { x: 210, y: 190 },
    { x: 230, y: 196 },
    { x: 260, y: 204 },
    { x: 310, y: 210 },
    { x: 360, y: 214 },
    { x: 410, y: 220 },
    { x: 440, y: 230 },
    { x: 450, y: 250 },
    { x: 460, y: 270 },
    { x: 480, y: 290 },
    { x: 500, y: 310 }
  ],
  B: [
    { x: 274, y: 229 },
    { x: 274, y: 214 },
    { x: 274, y: 198 },
    { x: 236, y: 186 },
    { x: 270, y: 186 },
    { x: 318, y: 186 },
    { x: 346, y: 186 },
    { x: 346, y: 176 },
    { x: 346, y: 160 },
    { x: 320, y: 148 },
    { x: 240, y: 148 },
    { x: 295, y: 148 },
    { x: 350, y: 148 },
    { x: 380, y: 180 },
    { x: 420, y: 210 },
    { x: 445, y: 240 },
    { x: 460, y: 270 },
    { x: 480, y: 290 },
    { x: 500, y: 310 }
  ],
  C: [
    { x: 220, y: 206 },
    { x: 230, y: 202 },
    { x: 240, y: 196 },
    { x: 250, y: 188 },
    { x: 260, y: 176 },
    { x: 270, y: 164 },
    { x: 280, y: 156 },
    { x: 290, y: 150 },
    { x: 305, y: 148 },
    { x: 320, y: 148 },
    { x: 335, y: 148 },
    { x: 350, y: 148 },
    { x: 365, y: 160 },
    { x: 390, y: 178 },
    { x: 420, y: 210 },
    { x: 445, y: 238 },
    { x: 460, y: 270 },
    { x: 480, y: 290 },
    { x: 500, y: 310 }
  ],
  D: [
    { x: 210, y: 240 },
    { x: 215, y: 230 },
    { x: 220, y: 222 },
    { x: 230, y: 214 },
    { x: 245, y: 206 },
    { x: 260, y: 198 },
    { x: 275, y: 190 },
    { x: 295, y: 182 },
    { x: 310, y: 174 },
    { x: 325, y: 168 },
    { x: 340, y: 162 },
    { x: 350, y: 158 },
    { x: 355, y: 154 },
    { x: 360, y: 150 },
    { x: 365, y: 150 },
    { x: 380, y: 162 },
    { x: 405, y: 190 },
    { x: 430, y: 220 },
    { x: 450, y: 250 },
    { x: 460, y: 270 },
    { x: 480, y: 290 },
    { x: 500, y: 310 }
  ]
};

function pointsToString(points: Point[]) {
  return points.map(p => `${p.x},${p.y}`).join(' ');
}

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function getPointAlongPolyline(points: Point[], t: number): Point {
  if (!points.length) return { x: 0, y: 0 };
  if (points.length === 1) return points[0];

  const clamped = clamp01(t);
  const scaled = clamped * (points.length - 1);
  const idx = Math.floor(scaled);
  const frac = scaled - idx;
  const p0 = points[idx];
  const p1 = points[idx + 1] || p0;

  return {
    x: p0.x + (p1.x - p0.x) * frac,
    y: p0.y + (p1.y - p0.y) * frac
  };
}

const routeDotClass: Record<RouteId, string> = {
  A: 'route-dot-A',
  B: 'route-dot-B',
  C: 'route-dot-C',
  D: 'route-dot-D'
};

export const PrismaSvgMap: React.FC<PrismaSvgMapProps> = ({
  routeId,
  routeProgress,
  floor,
  onFloorChange,
  onRouteDotClick,
  userPosition,
  showUser
}) => {
  const cursorPoint = useMemo(() => {
    return getPointAlongPolyline(ROUTE_POINTS[routeId], routeProgress.normalizedT);
  }, [routeId, routeProgress.normalizedT]);

  const userVisibility = showUser && userPosition ? 'visible' : 'hidden';
  const cursorVisibility = routeProgress.mode === 'pre' ? 'visible' : 'visible';

  const floorDisplay = {
    SUB: floor === 'SUB' ? 'block' : 'none',
    L2: floor === 'L2' ? 'block' : 'none',
    L3: floor === 'L3' ? 'block' : 'none'
  };

  const activeRouteOpacity = (target: RouteId) => (target === routeId ? 1 : 0.25);

  const handleRouteSelect = (id: RouteId) => () => onRouteDotClick?.(id);

  const handleFloorClick = (next: 'SUB' | 'L2' | 'L3') => () => onFloorChange?.(next);

  const floorButtonClass = (target: 'SUB' | 'L2' | 'L3') =>
    target === floor ? 'floor-button-active' : 'floor-button';

  const floorTextFill = (target: 'SUB' | 'L2' | 'L3') => (target === floor ? '#f5f2ec' : undefined);

  const routePillActiveOpacity = (target: RouteId) => (target === routeId ? 1 : 0.35);

  return (
    <div className="w-full flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
        <defs>
          <pattern id="dotGrid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.7" fill="#d6cdbf" />
          </pattern>

          <style>{`
            .bg-base      { fill: #f5f2ec; }
            .bg-dots      { fill: url(#dotGrid); opacity: 0.9; }

            .top-bar      { fill: #f0e8dd; }
            .bottom-bar   { fill: #f0e8dd; }

            .title-text   { fill: #111111; font-family: "EB Garamond", "Times New Roman", serif; font-size: 16px; }
            .sub-text     { fill: #111111; font-family: "EB Garamond", "Times New Roman", serif; font-size: 11px; }
            .mono-small   { fill: #111111; font-family: "IBM Plex Mono", monospace; font-size: 10px; }
            .mono-tiny    { fill: #111111; font-family: "IBM Plex Mono", monospace; font-size: 9px; }

            .chip         { fill: none; stroke: #b9ac99; stroke-width: 1; rx: 10; ry: 10; }
            .chip-active  { fill: #111111; stroke: #111111; }
            .chip-text    { font-family: "IBM Plex Mono", monospace; font-size: 9px; }

            .map-frame    { fill: none; stroke: rgba(0,0,0,0.0); }

            .building-outline { fill: none; stroke: #111111; stroke-width: 1.5; }
            .corridor     { fill: none; stroke: #c4b7a4; stroke-width: 1; }
            .room-outline { fill: none; stroke: #c4b7a4; stroke-width: 1; }
            .room-fill    { fill: #f5ede1; stroke: #c4b7a4; stroke-width: 1; }

            .node-label   { fill: #111111; font-family: "IBM Plex Mono", monospace; font-size: 9px; }
            .node-dot     { fill: #111111; }
            .node-hollow  { fill: none; stroke: #111111; stroke-width: 1.4; }

            .beast-core   { fill: #111111; }
            .beast-ring   { fill: none; stroke: #111111; stroke-width: 1.6; }

            .transfer-ring { fill: none; stroke: #7b1132; stroke-width: 1.2; }
            .transfer-core { fill: #7b1132; }

            .route        { fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 3.2; }
            .route-A      { stroke: #e34e4e; }
            .route-B      { stroke: #2f66d0; stroke-dasharray: 8 4; }
            .route-C      { stroke: #e0b422; stroke-dasharray: 4 4; }
            .route-D      { stroke: #2f9d4d; stroke-dasharray: 10 3 2 3; }

            .route-start-ring { fill: none; stroke: #111111; stroke-width: 1.4; }
            .route-start-core { stroke: none; }
            .route-start-label { fill: #111111; font-family: "IBM Plex Mono", monospace; font-size: 8px; }

            .user-dot     { fill: none; stroke: #111111; stroke-width: 2; }
            .cursor-dot   { fill: #7b1132; }

            .floor-mini-outline { fill: none; stroke: #111111; stroke-width: 1; }
            .floor-mini-fill    { fill: #f5ede1; }

            .floor-button      { fill: none; stroke: #b9ac99; stroke-width: 1; rx: 6; ry: 6; cursor: pointer; }
            .floor-button-active { fill: #111111; stroke: #111111; cursor: pointer; }
            .floor-button-text  { font-family: "IBM Plex Mono", monospace; font-size: 9px; pointer-events: none; }

            .route-dot-A { fill: #e34e4e; }
            .route-dot-B { fill: #2f66d0; }
            .route-dot-C { fill: #e0b422; }
            .route-dot-D { fill: #2f9d4d; }
          `}</style>
        </defs>

        <rect x="0" y="0" width="600" height="400" className="bg-base" />
        <rect x="0" y="0" width="600" height="400" className="bg-dots" />

        <rect x="0" y="0" width="600" height="44" className="top-bar" />
        <g transform="translate(16,14)">
          <text className="title-text" x="0" y="12">PRISMA · CalArts Edition</text>
          <text className="sub-text" x="0" y="26">Field Manual / Campus Routes</text>
        </g>

        <g transform="translate(360,10)">
          <rect className="chip" x="0" y="0" width="220" height="24" />
          <text className="mono-tiny" x="10" y="16">ROUTE</text>
          <g transform="translate(70,12)" style={{ opacity: routePillActiveOpacity('A'), cursor: 'pointer' }} onClick={handleRouteSelect('A')}>
            <circle cx="0" cy="0" r="4" className="route-dot-A" />
            <text className="chip-text" x="7" y="3">A</text>
          </g>
          <g transform="translate(110,12)" style={{ opacity: routePillActiveOpacity('B'), cursor: 'pointer' }} onClick={handleRouteSelect('B')}>
            <circle cx="0" cy="0" r="4" className="route-dot-B" />
            <text className="chip-text" x="7" y="3">B</text>
          </g>
          <g transform="translate(150,12)" style={{ opacity: routePillActiveOpacity('C'), cursor: 'pointer' }} onClick={handleRouteSelect('C')}>
            <circle cx="0" cy="0" r="4" className="route-dot-C" />
            <text className="chip-text" x="7" y="3">C</text>
          </g>
          <g transform="translate(190,12)" style={{ opacity: routePillActiveOpacity('D'), cursor: 'pointer' }} onClick={handleRouteSelect('D')}>
            <circle cx="0" cy="0" r="4" className="route-dot-D" />
            <text className="chip-text" x="7" y="3">D</text>
          </g>
        </g>

        <rect x="40" y="52" width="520" height="288" className="map-frame" />

        <g id="map-root" transform="translate(0,0)">
          <g id="building">
            <rect x="200" y="120" width="210" height="130" className="building-outline" rx="10" ry="10" />
          </g>

          <g id="floor-sub" data-floor="sub" style={{ display: floorDisplay.SUB }}>
            <rect x="210" y="220" width="190" height="18" className="corridor" />
            <text className="mono-tiny" x="214" y="235">SUBLEVEL</text>

            <g id="node_sublevel" data-floor="sub">
              <rect x="260" y="222" width="28" height="14" className="room-outline" />
              <text className="node-label" x="262" y="220">SUB</text>
            </g>
          </g>

          <g id="floor-l2" data-floor="l2" style={{ display: floorDisplay.L2 }}>
            <rect x="210" y="178" width="190" height="16" className="corridor" />
            <rect x="260" y="162" width="16" height="32" className="corridor" />

            <g id="node_library" data-floor="l2">
              <rect x="220" y="174" width="32" height="22" className="room-fill" />
              <line x1="224" y1="178" x2="248" y2="178" stroke="#c4b7a4" strokeWidth="1" />
              <line x1="224" y1="182" x2="248" y2="182" stroke="#c4b7a4" strokeWidth="1" />
              <line x1="224" y1="186" x2="248" y2="186" stroke="#c4b7a4" strokeWidth="1" />
              <text className="node-label" x="220" y="170">LIBRARY</text>
            </g>

            <g id="node_steves" data-floor="l2">
              <rect x="330" y="174" width="32" height="22" className="room-fill" />
              <rect x="334" y="180" width="12" height="8" className="node-dot" />
              <rect x="350" y="180" width="8" height="4" className="node-dot" />
              <text className="node-label" x="328" y="170">STEVE’S</text>
            </g>
          </g>

          <g id="floor-l3" data-floor="l3" style={{ display: floorDisplay.L3 }}>
            <rect x="210" y="140" width="190" height="16" className="corridor" />
            <g id="node_mainGallery" data-floor="l3">
              <rect x="220" y="136" width="38" height="24" className="room-fill" />
              <text className="node-label" x="218" y="132">MAIN GALLERY</text>
            </g>
            <g id="node_mainEntrance" data-floor="l3">
              <rect x="330" y="136" width="40" height="24" className="room-fill" />
              <line x1="350" y1="136" x2="350" y2="160" stroke="#c4b7a4" strokeWidth="1" />
              <text className="node-label" x="326" y="132">ENTRANCE</text>
            </g>
          </g>

          <g id="node_endOfWorld" data-floor="outdoor">
            <path d="M90 190 L100 176 L112 188 L122 172 L132 184 L122 202 L104 198 Z" fill="#111111" />
            <text className="node-label" x="62" y="210">END OF THE WORLD</text>
          </g>

          <g id="node_markTaper" data-floor="outdoor">
            <rect x="420" y="210" width="40" height="40" className="room-outline" />
            <text className="node-label" x="412" y="206">MARK TAPER</text>
          </g>

          <g id="node_wildBeast" data-floor="outdoor">
            <circle cx="500" cy="310" r="9" className="beast-core" />
            <circle cx="500" cy="310" r="16" className="beast-ring" />
            <text className="node-label" x="476" y="330">THE WILD BEAST</text>
          </g>

          <g id="transfer_mainGallery">
            <circle cx="240" cy="148" r="6" className="transfer-ring" />
            <circle cx="240" cy="148" r="2.4" className="transfer-core" />
          </g>

          <g id="transfer_mainEntrance">
            <circle cx="350" cy="148" r="6" className="transfer-ring" />
            <circle cx="350" cy="148" r="2.4" className="transfer-core" />
          </g>

          <g id="transfer_approachBeast">
            <circle cx="460" cy="290" r="6" className="transfer-ring" />
            <circle cx="460" cy="290" r="2.4" className="transfer-core" />
          </g>

          <g id="routeGroup_A" style={{ opacity: activeRouteOpacity('A') }}>
            <polyline id="route_A" className="route route-A" points={pointsToString(ROUTE_POINTS.A)} />
            <g id="route_A_start" style={{ cursor: 'pointer' }} onClick={handleRouteSelect('A')}>
              <circle className="route-start-ring" cx="95" cy="190" r="7" />
              <circle className={`route-start-core ${routeDotClass.A}`} cx="95" cy="190" r="4" />
              <text className="route-start-label" x="89" y="204">A</text>
            </g>
          </g>

          <g id="routeGroup_B" style={{ opacity: activeRouteOpacity('B') }}>
            <polyline id="route_B" className="route route-B" points={pointsToString(ROUTE_POINTS.B)} />
            <g id="route_B_start" style={{ cursor: 'pointer' }} onClick={handleRouteSelect('B')}>
              <circle className="route-start-ring" cx="274" cy="229" r="7" />
              <circle className={`route-start-core ${routeDotClass.B}`} cx="274" cy="229" r="4" />
              <text className="route-start-label" x="268" y="243">B</text>
            </g>
          </g>

          <g id="routeGroup_C" style={{ opacity: activeRouteOpacity('C') }}>
            <polyline id="route_C" className="route route-C" points={pointsToString(ROUTE_POINTS.C)} />
            <g id="route_C_start" style={{ cursor: 'pointer' }} onClick={handleRouteSelect('C')}>
              <circle className="route-start-ring" cx="220" cy="206" r="7" />
              <circle className={`route-start-core ${routeDotClass.C}`} cx="220" cy="206" r="4" />
              <text className="route-start-label" x="214" y="220">C</text>
            </g>
          </g>

          <g id="routeGroup_D" style={{ opacity: activeRouteOpacity('D') }}>
            <polyline id="route_D" className="route route-D" points={pointsToString(ROUTE_POINTS.D)} />
            <g id="route_D_start" style={{ cursor: 'pointer' }} onClick={handleRouteSelect('D')}>
              <circle className="route-start-ring" cx="210" cy="240" r="7" />
              <circle className={`route-start-core ${routeDotClass.D}`} cx="210" cy="240" r="4" />
              <text className="route-start-label" x="204" y="254">D</text>
            </g>
          </g>

          <circle
            id="cursorDot"
            className="cursor-dot"
            cx={cursorPoint.x}
            cy={cursorPoint.y}
            r="4"
            style={{ visibility: cursorVisibility }}
          />
          <circle
            id="userDot"
            className="user-dot"
            cx={userPosition?.x ?? 80}
            cy={userPosition?.y ?? 260}
            r="6"
            style={{ visibility: userVisibility }}
          />
        </g>

        <rect x="0" y="352" width="600" height="48" className="bottom-bar" />

        <g transform="translate(16,368)">
          <text className="mono-small" x="0" y="0">22 APR · 20:00 · THE WILD BEAST</text>
          <text className="mono-tiny" x="0" y="18">CHOOSE ANY LINE YOU CAN SEE OR IMAGINE.</text>
        </g>

        <g id="floor-selector" transform="translate(380,370)">
          <g id="floor-sub-button" onClick={handleFloorClick('SUB')}>
            <rect x="0" y="0" width="44" height="22" className={floorButtonClass('SUB')} />
            <text className="floor-button-text" x="11" y="15" fill={floorTextFill('SUB')}>SUB</text>
          </g>
          <g id="floor-l2-button" transform="translate(52,0)" onClick={handleFloorClick('L2')}>
            <rect x="0" y="0" width="44" height="22" className={floorButtonClass('L2')} />
            <text className="floor-button-text" x="11" y="15" fill={floorTextFill('L2')}>L2</text>
          </g>
          <g id="floor-l3-button" transform="translate(104,0)" onClick={handleFloorClick('L3')}>
            <rect x="0" y="0" width="44" height="22" className={floorButtonClass('L3')} />
            <text className="floor-button-text" x="13" y="15" fill={floorTextFill('L3')}>L3</text>
          </g>
        </g>

        <g transform="translate(350,356)">
          <rect x="0" y="0" width="16" height="4" className="floor-mini-outline" />
          <rect x="0" y="-6" width="16" height="4" className="floor-mini-outline" />
          <rect x="0" y="-12" width="16" height="4" className="floor-mini-fill" />
        </g>
      </svg>
    </div>
  );
};
