import { Segment, SegmentId } from './segment'

export interface SegmentsSet<T extends Segment> {
  getSegments(from_timestamp?: number, to_timestamp?: number): T[];
  setSegments(segments: T[]): void;
  addSegment(segment: T): void;
  findSegments(point: number, rangeDist: number): T[];
  removeInRange(from_timestamp: number, to_timestamp: number): T[];
  remove(id: SegmentId): boolean;
  has(id: SegmentId): boolean;
  clear(): void;
  updateId(fromId: SegmentId, toId: SegmentId): void;
  length: number;
}
