import type {
  PrismaMapConfig,
  FloorId,
  RouteId,
  Phase,
  PhaseOverride,
  PhaseResult,
  MapPhaseMode,
  RouteProgress
} from './types';

const showStartISO = '2026-04-22T20:00:00-07:00';
const showEndISO = '2026-04-22T21:30:00-07:00';

const performanceStartISO = '2026-04-22T20:00:00-07:00';

const EVENT_START_UTC = '2026-04-23T03:00:00.000Z';
const EVENT_DURATION_MINUTES = 40;

function getEventBounds() {
  const start = new Date(EVENT_START_UTC);
  const end = new Date(start.getTime() + EVENT_DURATION_MINUTES * 60_000);
  return { start, end };
}

export const prismaMapConfig: PrismaMapConfig = {
  bounds: {
    svgViewBox: [0, 0, 600, 400]
  },
  floors: ['sub', 'l2', 'l3'],
  beastNodeId: 'wildBeast',
  routeMeta: {
    A: {
      id: 'A',
      color: '#e34e4e',
      labelShort: 'outskirts',
      labelLong: 'end of the world → wild beast',
      description:
        'Route A skims the outer rail of campus: END OF THE WORLD to the WILD BEAST, hugging the perimeter and staying just outside the warm light.'
    },
    B: {
      id: 'B',
      color: '#2f66d0',
      labelShort: 'sublevel',
      labelLong: 'sublevel → main gal → wild beast',
      description:
        'Route B surfaces from the SUBLEVEL, tracks the LIBRARY and MAIN GALLERY spine, then tilts toward the WILD BEAST in a long exhale.'
    },
    C: {
      id: 'C',
      color: '#e0b422',
      labelShort: 'interior hallways',
      labelLong: 'hallways → main gal → wild beast',
      description:
        'Route C moves through the interior hallways, weaving the nested spines before spilling out at MAIN GALLERY and down to the BEAST.'
    },
    D: {
      id: 'D',
      color: '#2f9d4d',
      labelShort: 'backline',
      labelLong: 'art lots → steve’s → wild beast',
      description:
        'Route D traces the art lots and backline, passing through STEVE’S before the final descent to the WILD BEAST.'
    }
  },
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

export function computeScheduledPhase(now: Date = new Date()): PhaseResult {
  const { start, end } = getEventBounds();
  const nowTime = now.getTime();

  if (nowTime < start.getTime()) {
    return { phase: 'pre', nextChangeAt: start };
  }
  if (nowTime <= end.getTime()) {
    return { phase: 'live', nextChangeAt: end };
  }
  return { phase: 'archive', nextChangeAt: null };
}

export interface GetPhaseOptions {
  now?: Date;
  override?: PhaseOverride;
}

export function getPhase(options: GetPhaseOptions = {}): PhaseResult {
  const { now = new Date(), override } = options;

  if (override && override !== 'auto') {
    return { phase: override, nextChangeAt: null };
  }

  return computeScheduledPhase(now);
}
