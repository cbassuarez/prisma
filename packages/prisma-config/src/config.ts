import type {
  PrismaMapConfig,
  FloorId,
  RouteId,
  Phase,
  MapPhaseMode,
  RouteProgress
} from './types';

const showStartISO = '2025-04-22T20:00:00-07:00';
const showEndISO = '2025-04-22T21:30:00-07:00';

const performanceStartISO = '2025-04-22T20:00:00-07:00';

export const prismaMapConfig: PrismaMapConfig = {
  bounds: {
    svgViewBox: [0, 0, 600, 400]
  },
  floors: ['sub', 'l2', 'l3'],
  beastNodeId: 'wildBeast',
  schedule: {
    performanceStartIso: performanceStartISO,
    performanceDurationMinutes: 30,
    traceLoopDurationSeconds: 15
  },
  show: {
    startISO: showStartISO,
    endISO: showEndISO
  },
  operator: {
    password: 'pr1sma-ops' // simple shared secret; adjusted by developer
  },
  nodes: [
    {
      id: 'endOfWorld',
      label: 'END OF THE WORLD',
      floor: 'outdoor',
      position: { x: 95, y: 190 },
      kind: 'end'
    },
    {
      id: 'markTaper',
      label: 'MARK TAPER',
      floor: 'outdoor',
      position: { x: 440, y: 230 },
      kind: 'poi'
    },
    {
      id: 'wildBeast',
      label: 'THE WILD BEAST',
      floor: 'outdoor',
      position: { x: 500, y: 310 },
      kind: 'beast'
    },
    {
      id: 'subNode',
      label: 'SUB',
      floor: 'sub',
      position: { x: 274, y: 229 },
      kind: 'poi'
    },
    {
      id: 'library',
      label: 'LIBRARY',
      floor: 'l2',
      position: { x: 236, y: 186 },
      kind: 'poi'
    },
    {
      id: 'steves',
      label: 'STEVE’S',
      floor: 'l2',
      position: { x: 346, y: 186 },
      kind: 'poi'
    },
    {
      id: 'gallery',
      label: 'MAIN GALLERY',
      floor: 'l3',
      position: { x: 240, y: 148 },
      kind: 'poi'
    },
    {
      id: 'entrance',
      label: 'ENTRANCE',
      floor: 'l3',
      position: { x: 350, y: 148 },
      kind: 'poi'
    },
    {
      id: 'interiorHall',
      label: 'HALLWAY NODE',
      floor: 'l2',
      position: { x: 220, y: 206 },
      kind: 'intersection'
    },
    {
      id: 'backCorridor',
      label: 'BACK CORRIDOR',
      floor: 'l2',
      position: { x: 210, y: 240 },
      kind: 'intersection'
    }
  ],
  routes: [
    {
      id: 'A',
      code: 'A',
      colorKey: 'red',
      codename: 'outskirts',
      shortLabel: 'A · outskirts',
      floorHint: 'mixed',
      fieldManualSteps: [
        'Start at END OF THE WORLD; align with the outer rail.',
        'Move east along the perimeter path toward the main quad.',
        'Sweep past MARK TAPER; keep the courtyard on your right.',
        'Descend toward THE WILD BEAST; finish at the ring.'
      ],
      color: '#e34e4e',
      displayName: 'Route A',
      description: 'End of the World → perimeter → courtyard → Beast.',
      defaultDurationSeconds: 80,
      segments: [
        { fromNodeId: 'endOfWorld', toNodeId: 'markTaper', floor: 'outdoor' },
        { fromNodeId: 'markTaper', toNodeId: 'wildBeast', floor: 'outdoor' }
      ]
    },
    {
      id: 'B',
      code: 'B',
      colorKey: 'blue',
      codename: 'sublevel',
      shortLabel: 'B · sublevel',
      floorHint: 'mixed',
      fieldManualSteps: [
        'Depart SUBLEVEL; surface toward LIBRARY.',
        'Track east through STEVE’S spine; keep north wall close.',
        'Ascend to GALLERY then pivot to MAIN ENTRANCE.',
        'Exit toward MARK TAPER; follow the descent to the BEAST.'
      ],
      color: '#2f66d0',
      displayName: 'Route B',
      description: 'SUBLEVEL → Library → Steve’s → Gallery/Entrance → Beast.',
      defaultDurationSeconds: 80,
      segments: [
        { fromNodeId: 'subNode', toNodeId: 'library', floor: 'sub' },
        { fromNodeId: 'library', toNodeId: 'steves', floor: 'l2' },
        { fromNodeId: 'steves', toNodeId: 'gallery', floor: 'l3' },
        { fromNodeId: 'gallery', toNodeId: 'entrance', floor: 'l3' },
        { fromNodeId: 'entrance', toNodeId: 'markTaper', floor: 'outdoor' },
        { fromNodeId: 'markTaper', toNodeId: 'wildBeast', floor: 'outdoor' }
      ]
    },
    {
      id: 'C',
      code: 'C',
      colorKey: 'yellow',
      codename: 'interior',
      shortLabel: 'C · interior',
      floorHint: 'mixed',
      fieldManualSteps: [
        'Enter interior hallway; move through the nested spines.',
        'Climb toward MAIN GALLERY; keep to the brighter edge.',
        'Continue to MAIN ENTRANCE; align with glass frontage.',
        'Release into courtyard; angle to MARK TAPER then BEAST.'
      ],
      color: '#e0b422',
      displayName: 'Route C',
      description: 'Interior hallways → Entrance → Beast.',
      defaultDurationSeconds: 80,
      segments: [
        { fromNodeId: 'interiorHall', toNodeId: 'gallery', floor: 'l2' },
        { fromNodeId: 'gallery', toNodeId: 'entrance', floor: 'l3' },
        { fromNodeId: 'entrance', toNodeId: 'markTaper', floor: 'outdoor' },
        { fromNodeId: 'markTaper', toNodeId: 'wildBeast', floor: 'outdoor' }
      ]
    },
    {
      id: 'D',
      code: 'D',
      colorKey: 'green',
      codename: 'backline',
      shortLabel: 'D · backline',
      floorHint: 'mixed',
      fieldManualSteps: [
        'Launch from back corridors; hug the service edge.',
        'Thread the angled bends toward the interior spine.',
        'Climb through GALLERY / ENTRANCE stack; keep tempo steady.',
        'Flow out to MARK TAPER; trace the slope to the BEAST.'
      ],
      color: '#2f9d4d',
      displayName: 'Route D',
      description: 'Back corridors → interior nodes → Beast.',
      defaultDurationSeconds: 80,
      segments: [
        { fromNodeId: 'backCorridor', toNodeId: 'interiorHall', floor: 'l2' },
        { fromNodeId: 'interiorHall', toNodeId: 'gallery', floor: 'l2' },
        { fromNodeId: 'gallery', toNodeId: 'entrance', floor: 'l3' },
        { fromNodeId: 'entrance', toNodeId: 'markTaper', floor: 'outdoor' },
        { fromNodeId: 'markTaper', toNodeId: 'wildBeast', floor: 'outdoor' }
      ]
    }
  ]
};

export function getMapPhaseMode(now: Date = new Date()): MapPhaseMode {
  const start = new Date(prismaMapConfig.schedule.performanceStartIso);
  const durationMs = prismaMapConfig.schedule.performanceDurationMinutes * 60_000;
  const end = new Date(start.getTime() + durationMs);
  const nowMs = now.getTime();

  if (nowMs < start.getTime()) return 'pre';
  if (nowMs <= end.getTime()) return 'live';
  return 'trace';
}

export function getRouteProgress(routeId: RouteId, now: Date = new Date()): RouteProgress {
  const mode = getMapPhaseMode(now);
  const { schedule } = prismaMapConfig;
  const start = new Date(schedule.performanceStartIso);
  const durationMs = schedule.performanceDurationMinutes * 60_000;
  const end = new Date(start.getTime() + durationMs);
  const nowMs = now.getTime();

  if (mode === 'pre') {
    return { mode, normalizedT: 0 };
  }

  if (mode === 'live') {
    const elapsed = nowMs - start.getTime();
    const t = Math.min(Math.max(elapsed / durationMs, 0), 1);
    return { mode, normalizedT: t };
  }

  const loopMs = schedule.traceLoopDurationSeconds * 1000;
  const loopElapsed = (nowMs - end.getTime()) % loopMs;
  const loopT = loopElapsed / loopMs;
  return { mode, normalizedT: Math.min(Math.max(loopT, 0), 1) };
}

export function getPhase(now: Date = new Date()): Phase {
  const start = new Date(showStartISO).getTime();
  const end = new Date(showEndISO).getTime();
  const t = now.getTime();

  if (t < start - 1000 * 60 * 60 * 24) return 'pre';
  if (t < start - 15 * 60 * 1000) return 'day-of-early';
  if (t >= start && t <= end) return 'live';
  if (t > end && t <= end + 2 * 60 * 60 * 1000) return 'day-of-late';
  if (t <= end + 24 * 60 * 60 * 1000) return 'day-after';
  return 'archive';
}
