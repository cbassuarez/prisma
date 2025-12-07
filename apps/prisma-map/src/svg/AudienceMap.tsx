import React from 'react';

interface Props {
  // No props yet, but we may use these for selection state overlays later
}

export const AudienceMap: React.FC<Props> = () => {
  // TODO: align geometry with @prisma/config nodes and routes when final SVG is available.
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <style>{`
        .floor-outline { fill: none; stroke: #111; stroke-width: 2; stroke-dasharray: 4 3; }
        .floor-label { font: 12px 'IBM Plex Mono', monospace; letter-spacing: 0.12em; text-transform: uppercase; }
        .floor-button { fill: #e6e0d5; stroke: #111; }
        .floor-button-active { fill: #111; stroke: #111; }
        .route { fill: none; stroke-width: 4; }
        .node { fill: #fff; stroke: #111; stroke-width: 1.5; }
        .node-beast { fill: #111; stroke: #111; }
        .node-label { font: 9px 'IBM Plex Mono', monospace; letter-spacing: 0.12em; text-transform: uppercase; }
      `}</style>

      <rect x="0" y="0" width="600" height="400" fill="#f5f2ec" stroke="#d6cdbf" />

      <g id="floor-buttons" transform="translate(20,20)">
        <g id="floor-sub-button" transform="translate(0,0)">
          <rect width="60" height="24" rx="6" className="floor-button" />
          <text x="30" y="16" textAnchor="middle" className="floor-label">SUB</text>
        </g>
        <g id="floor-l2-button" transform="translate(70,0)">
          <rect width="60" height="24" rx="6" className="floor-button-active" />
          <text x="30" y="16" textAnchor="middle" className="floor-label" fill="#f5f2ec">L2</text>
        </g>
        <g id="floor-l3-button" transform="translate(140,0)">
          <rect width="60" height="24" rx="6" className="floor-button" />
          <text x="30" y="16" textAnchor="middle" className="floor-label">L3</text>
        </g>
      </g>

      <g id="routeGroup_A">
        <polyline
          id="route_A"
          className="route"
          stroke="#e34e4e"
          points="95,190 440,230 500,310"
        />
      </g>
      <g id="routeGroup_B">
        <polyline
          id="route_B"
          className="route"
          stroke="#2f66d0"
          points="274,229 236,186 346,186 240,148 350,148 440,230 500,310"
        />
      </g>
      <g id="routeGroup_C">
        <polyline
          id="route_C"
          className="route"
          stroke="#e0b422"
          points="220,206 240,148 350,148 440,230 500,310"
        />
      </g>
      <g id="routeGroup_D">
        <polyline
          id="route_D"
          className="route"
          stroke="#2f9d4d"
          points="210,240 220,206 240,148 350,148 440,230 500,310"
        />
      </g>

      <g id="floor-sub" style={{ display: 'none' }}>
        <rect x="240" y="210" width="120" height="70" className="floor-outline" />
        <text x="300" y="250" textAnchor="middle" className="floor-label">Sublevel</text>
      </g>
      <g id="floor-l2">
        <rect x="200" y="160" width="200" height="120" className="floor-outline" />
        <text x="300" y="210" textAnchor="middle" className="floor-label">Level 2</text>
      </g>
      <g id="floor-l3" style={{ display: 'none' }}>
        <rect x="200" y="120" width="200" height="80" className="floor-outline" />
        <text x="300" y="160" textAnchor="middle" className="floor-label">Level 3</text>
      </g>

      <g id="nodes">
        <circle id="node_endOfWorld" className="node" cx="95" cy="190" r="4" />
        <text x="95" y="184" textAnchor="middle" className="node-label">End</text>
        <circle id="node_markTaper" className="node" cx="440" cy="230" r="4" />
        <text x="440" y="224" textAnchor="middle" className="node-label">Mark Taper</text>
        <circle id="node_wildBeast" className="node node-beast" cx="500" cy="310" r="5" />
        <text x="500" y="328" textAnchor="middle" className="node-label">Beast</text>
        <circle id="node_sub" className="node" cx="274" cy="229" r="4" />
        <text x="274" y="243" textAnchor="middle" className="node-label">SUB</text>
        <circle id="node_library" className="node" cx="236" cy="186" r="4" />
        <text x="236" y="200" textAnchor="middle" className="node-label">Library</text>
        <circle id="node_steves" className="node" cx="346" cy="186" r="4" />
        <text x="346" y="200" textAnchor="middle" className="node-label">Steve's</text>
        <circle id="node_gallery" className="node" cx="240" cy="148" r="4" />
        <text x="240" y="136" textAnchor="middle" className="node-label">Gallery</text>
        <circle id="node_entrance" className="node" cx="350" cy="148" r="4" />
        <text x="350" y="136" textAnchor="middle" className="node-label">Entrance</text>
        <circle id="node_interior" className="node" cx="220" cy="206" r="4" />
        <text x="220" y="220" textAnchor="middle" className="node-label">Hall</text>
        <circle id="node_backCorridor" className="node" cx="210" cy="240" r="4" />
        <text x="210" y="254" textAnchor="middle" className="node-label">Back</text>
      </g>

      <circle id="cursorDot" cx="95" cy="190" r="5" fill="#111" visibility="hidden" />
    </svg>
  );
};
