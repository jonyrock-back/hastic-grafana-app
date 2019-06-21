import { AnalyticUnitId } from './analytic_units/analytic_unit';

export enum DetectionStatus {
  CREATED = 'CREATED',
  READY = 'READY',
  RUNNING = 'RUNNING',
  FAILED = 'FAILED'
};

export type DetectionSpan = {
  id: AnalyticUnitId,
  status: DetectionStatus,
  from: number,
  to: number
};

export const DETECTION_STATUS_TEXT = new Map<DetectionStatus, string>([
  [DetectionStatus.CREATED, '[DetectionStatus]: not learnt yet'],
  [DetectionStatus.READY, '[DetectionStatus]: done'],
  [DetectionStatus.RUNNING, '[DetectionStatus]: running...'],
  [DetectionStatus.FAILED, '[DetectionStatus]: failed']
]);
