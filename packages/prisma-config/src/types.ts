export type FloorId = 'sub' | 'l2' | 'l3';
export type RouteId = 'A' | 'B' | 'C' | 'D';

export interface SvgPoint {
  x: number;
  y: number;
}

export type NodeKind = 'poi' | 'intersection' | 'beast' | 'end';

export interface Node {
  id: string;
  label: string;
  floor?: FloorId | 'outdoor';
  position: SvgPoint;
  kind: NodeKind;
}

export interface RouteSegment {
  fromNodeId: string;
  toNodeId: string;
  floor: FloorId | 'outdoor';
}

export interface Route {
  id: RouteId;
  color: string;
  displayName: string;
  description: string;
  segments: RouteSegment[];
  defaultDurationSeconds: number;
}

export interface CampusBounds {
  svgViewBox: [number, number, number, number];
  geo?: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
}

export type Phase = 'pre' | 'day-of-early' | 'live' | 'day-of-late' | 'day-after' | 'archive';

export interface ShowTiming {
  startISO: string;
  endISO: string;
}

export interface OperatorConfig {
  password: string;
}

export interface PrismaMapConfig {
  bounds: CampusBounds;
  floors: FloorId[];
  nodes: Node[];
  routes: Route[];
  beastNodeId: string;
  show: ShowTiming;
  operator: OperatorConfig;
}
