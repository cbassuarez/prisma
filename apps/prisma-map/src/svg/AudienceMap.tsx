import React from 'react';

interface Props {
  // No props yet, but we may use these for selection state overlays later
}

export const AudienceMap: React.FC<Props> = () => {
  // TODO: align geometry with @prisma/config nodes and routes when final SVG is available.
  return (
          <svg xmlns="http://www.w3.org/2000/svg"
               width="600" height="400" viewBox="0 0 600 400">

            <defs>
              /* Dot grid pattern for architectural background */
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

            .floor-button      { fill: none; stroke: #b9ac99; stroke-width: 1; rx: 6; ry: 6; }
            .floor-button-active { fill: #111111; stroke: #111111; }
            .floor-button-text  { font-family: "IBM Plex Mono", monospace; font-size: 9px; }

            .route-dot-A { fill: #e34e4e; }
            .route-dot-B { fill: #2f66d0; }
            .route-dot-C { fill: #e0b422; }
            .route-dot-D { fill: #2f9d4d; }
          `}</style>
            </defs>

            /* Base background */
            <rect x="0" y="0" width="600" height="400" className="bg-base" />
            /* Dot grid overlay */
            <rect x="0" y="0" width="600" height="400" className="bg-dots" />

            /* Top bar (app-style) */
            <rect x="0" y="0" width="600" height="44" className="top-bar" />
            <g transform="translate(16,14)">
              <text className="title-text" x="0" y="12">PRISMA · CalArts Edition</text>
              <text className="sub-text" x="0" y="26">Field Manual / Campus Routes</text>
            </g>

            /* Route selector pill (top-right) */
            <g transform="translate(360,10)">
              <rect className="chip" x="0" y="0" width="220" height="24" />
              <text className="mono-tiny" x="10" y="16">ROUTE</text>
              /* route dots A–D */
              <g transform="translate(70,12)">
                <circle cx="0" cy="0" r="4" className="route-dot-A" />
                <text className="chip-text" x="7" y="3">A</text>
              </g>
              <g transform="translate(110,12)">
                <circle cx="0" cy="0" r="4" className="route-dot-B" />
                <text className="chip-text" x="7" y="3">B</text>
              </g>
              <g transform="translate(150,12)">
                <circle cx="0" cy="0" r="4" className="route-dot-C" />
                <text className="chip-text" x="7" y="3">C</text>
              </g>
              <g transform="translate(190,12)">
                <circle cx="0" cy="0" r="4" className="route-dot-D" />
                <text className="chip-text" x="7" y="3">D</text>
              </g>
            </g>

            /* Map frame (center) */
            <rect x="40" y="52" width="520" height="288" className="map-frame" />

            /* Main map group */
            <g id="map-root" transform="translate(0,0)">

              /* Main Building outer footprint (roughly to-scale, horizontally oriented) */
              /* Building approximate bounds: x: 200–410, y: 110–250 */
              <g id="building">
                <rect x="200" y="120" width="210" height="130" className="building-outline" rx="10" ry="10" />
              </g>

              /* Floor groups: only one active at a time */
              /* SUBLEVEL (hidden by default in this postcard) */
              <g id="floor-sub" data-floor="sub" style="display:none;">
                /* simple corridor suggestion */
                <rect x="210" y="220" width="190" height="18" className="corridor" />
                /* sub-level label */
                <text className="mono-tiny" x="214" y="235">SUBLEVEL</text>

                /* Sublevel node */
                <g id="node_sublevel" data-floor="sub">
                  <rect x="260" y="222" width="28" height="14" className="room-outline" />
                  <text className="node-label" x="262" y="220">SUB</text>
                </g>
              </g>

              /* LEVEL 2 (default visible in postcard) */
              <g id="floor-l2" data-floor="l2">
                /* main L2 corridor spine */
                <rect x="210" y="178" width="190" height="16" className="corridor" />
                /* side corridor */
                <rect x="260" y="162" width="16" height="32" className="corridor" />

                /* Library (L2) */
                <g id="node_library" data-floor="l2">
                  <rect x="220" y="174" width="32" height="22" className="room-fill" />
                  <line x1="224" y1="178" x2="248" y2="178" stroke="#c4b7a4" stroke-width="1" />
                  <line x1="224" y1="182" x2="248" y2="182" stroke="#c4b7a4" stroke-width="1" />
                  <line x1="224" y1="186" x2="248" y2="186" stroke="#c4b7a4" stroke-width="1" />
                  <text className="node-label" x="220" y="170">LIBRARY</text>
                </g>

                /* Steve's Cafe (L2) */
                <g id="node_steves" data-floor="l2">
                  <rect x="330" y="174" width="32" height="22" className="room-fill" />
                  <rect x="334" y="180" width="12" height="8" className="node-dot" />
                  <rect x="350" y="180" width="8" height="4" className="node-dot" />
                  <text className="node-label" x="328" y="170">STEVE’S</text>
                </g>
              </g>

              /* LEVEL 3 (hidden in this postcard) */
              <g id="floor-l3" data-floor="l3" style="display:none;">
                /* main L3 corridor */
                <rect x="210" y="140" width="190" height="16" className="corridor" />
                /* Main Gallery */
                <g id="node_mainGallery" data-floor="l3">
                  <rect x="220" y="136" width="38" height="24" className="room-fill" />
                  <text className="node-label" x="218" y="132">MAIN GALLERY</text>
                </g>
                /* Main Entrance lobby */
                <g id="node_mainEntrance" data-floor="l3">
                  <rect x="330" y="136" width="40" height="24" className="room-fill" />
                  <line x1="350" y1="136" x2="350" y2="160" stroke="#c4b7a4" stroke-width="1" />
                  <text className="node-label" x="326" y="132">ENTRANCE</text>
                </g>
              </g>

              /* Outdoor nodes (always visible) */

              /* End of the World (north-west of building) */
              <g id="node_endOfWorld" data-floor="outdoor">
                <path d="M90 190 L100 176 L112 188 L122 172 L132 184 L122 202 L104 198 Z"
                      fill="#111111" />
                <text className="node-label" x="62" y="210">END OF THE WORLD</text>
              </g>

              /* Mark Taper courtyard (between building and Beast) */
              <g id="node_markTaper" data-floor="outdoor">
                <rect x="420" y="210" width="40" height="40" className="room-outline" />
                <text className="node-label" x="412" y="206">MARK TAPER</text>
              </g>

              /* The Wild Beast (downhill / south-east) */
              <g id="node_wildBeast" data-floor="outdoor">
                <circle cx="500" cy="310" r="9" className="beast-core" />
                <circle cx="500" cy="310" r="16" className="beast-ring" />
                <text className="node-label" x="476" y="330">THE WILD BEAST</text>
              </g>

              /* Transfer stations (crossings) */
              /* Main Gallery crossing (approximate position on L3) */
              <g id="transfer_mainGallery">
                <circle cx="240" cy="148" r="6" className="transfer-ring" />
                <circle cx="240" cy="148" r="2.4" className="transfer-core" />
              </g>

              /* Main Entrance crossing */
              <g id="transfer_mainEntrance">
                <circle cx="350" cy="148" r="6" className="transfer-ring" />
                <circle cx="350" cy="148" r="2.4" className="transfer-core" />
              </g>

              /* Approach to Beast crossing */
              <g id="transfer_approachBeast">
                <circle cx="460" cy="290" r="6" className="transfer-ring" />
                <circle cx="460" cy="290" r="2.4" className="transfer-core" />
              </g>

              /* ROUTES (approximate, floor-aware geometry) */

              /* Route A – red: End of World → perimeter → Mark Taper → Beast */
              <g id="routeGroup_A">
                <polyline id="route_A"
                          className="route route-A"
                          points="
                            95,190
                            140,190
                            190,190
                            210,190
                            230,196
                            260,204
                            310,210
                            360,214
                            410,220
                            440,230
                            450,250
                            460,270
                            480,290
                            500,310
                          " />
                /* start marker A at End of World */
                <g id="route_A_start">
                  <circle className="route-start-ring" cx="95" cy="190" r="7" />
                  <circle className="route-start-core route-dot-A" cx="95" cy="190" r="4" />
                  <text className="route-start-label" x="89" y="204">A</text>
                </g>
              </g>

              /* Route B – blue: Sublevel → Library → Steve’s → Gallery → Entrance → Beast */
              <g id="routeGroup_B">
                <polyline id="route_B"
                          className="route route-B"
                          points="
                            274,229
                            274,214
                            274,198
                            236,186
                            270,186
                            318,186
                            346,186
                            346,176
                            346,160
                            320,148
                            240,148
                            295,148
                            350,148
                            380,180
                            420,210
                            445,240
                            460,270
                            480,290
                            500,310
                          " />
                /* start marker B at Sublevel node (conceptually) */
                <g id="route_B_start">
                  <circle className="route-start-ring" cx="274" cy="229" r="7" />
                  <circle className="route-start-core route-dot-B" cx="274" cy="229" r="4" />
                  <text className="route-start-label" x="268" y="243">B</text>
                </g>
              </g>

              /* Route C – yellow: interior hallways → Main Gallery/Entrance → Beast */
              <g id="routeGroup_C">
                <polyline id="route_C"
                          className="route route-C"
                          points="
                            220,206
                            230,202
                            240,196
                            250,188
                            260,176
                            270,164
                            280,156
                            290,150
                            305,148
                            320,148
                            335,148
                            350,148
                            365,160
                            390,178
                            420,210
                            445,238
                            460,270
                            480,290
                            500,310
                          " />
                /* start marker C in hallway */
                <g id="route_C_start">
                  <circle className="route-start-ring" cx="220" cy="206" r="7" />
                  <circle className="route-start-core route-dot-C" cx="220" cy="206" r="4" />
                  <text className="route-start-label" x="214" y="220">C</text>
                </g>
              </g>

              /* Route D – green: studios/back-edge → interior → Beast */
              <g id="routeGroup_D">
                <polyline id="route_D"
                          className="route route-D"
                          points="
                            210,240
                            215,230
                            220,222
                            230,214
                            245,206
                            260,198
                            275,190
                            295,182
                            310,174
                            325,168
                            340,162
                            350,158
                            355,154
                            360,150
                            365,150
                            380,162
                            405,190
                            430,220
                            450,250
                            460,270
                            480,290
                            500,310
                          " />
                /* start marker D near back corridors */
                <g id="route_D_start">
                  <circle className="route-start-ring" cx="210" cy="240" r="7" />
                  <circle className="route-start-core route-dot-D" cx="210" cy="240" r="4" />
                  <text className="route-start-label" x="204" y="254">D</text>
                </g>
              </g>

              /* Animated cursor + user location placeholders for app */
              <circle id="cursorDot" className="cursor-dot" cx="95" cy="190" r="4" style="visibility:hidden;" />
              <circle id="userDot" className="user-dot" cx="80" cy="260" r="6" style="visibility:hidden;" />
            </g>

            /* Bottom bar (app-style) */
            <rect x="0" y="352" width="600" height="48" className="bottom-bar" />

            <g transform="translate(16,368)">
              <text className="mono-small" x="0" y="0">22 APR · 20:00 · THE WILD BEAST</text>
              <text className="mono-tiny" x="0" y="18">CHOOSE ANY LINE YOU CAN SEE OR IMAGINE.</text>
            </g>

            /* Floor selector (bottom-right) */
            <g id="floor-selector" transform="translate(380,370)">
              /* SUB */
              <g id="floor-sub-button">
                <rect x="0" y="0" width="44" height="22" className="floor-button" />
                <text className="floor-button-text" x="11" y="15">SUB</text>
              </g>
              /* L2 (active in this postcard) */
              <g id="floor-l2-button" transform="translate(52,0)">
                <rect x="0" y="0" width="44" height="22" className="floor-button-active" />
                <text className="floor-button-text" x="11" y="15" fill="#f5f2ec">L2</text>
              </g>
              /* L3 */
              <g id="floor-l3-button" transform="translate(104,0)">
                <rect x="0" y="0" width="44" height="22" className="floor-button" />
                <text className="floor-button-text" x="13" y="15">L3</text>
              </g>
            </g>

            /* Mini building/floor stack icon (bottom-right, above selector) */
            <g transform="translate(350,356)">
              <rect x="0" y="0" width="16" height="4" className="floor-mini-outline" />
              <rect x="0" y="-6" width="16" height="4" className="floor-mini-outline" />
              <rect x="0" y="-12" width="16" height="4" className="floor-mini-fill" />
            </g>

          </svg>
  );
};
