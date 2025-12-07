import type {
  PrismaMapConfig,
  FloorId,
  RouteId,
  Phase
} from './types';

const showStartISO = '2025-04-22T20:00:00-07:00';
const showEndISO = '2025-04-22T21:30:00-07:00';

export const prismaMapConfig: PrismaMapConfig = {
  bounds: {
    svgViewBox: [0, 0, 600, 400]
  },
  floors: ['sub', 'l2', 'l3'],
  beastNodeId: 'wildBeast',
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
