import { SegmentsSet } from './segment_set';
import { Segment, SegmentId } from './segment';


export class SegmentArray<T extends Segment> implements SegmentsSet<T> {
  private _segments: T[];
  private _keyToSegment: Map<SegmentId, T> = new Map<SegmentId, T>();

  constructor(private segments?: T[]) {
    this.setSegments(segments);
  }

  getSegments(from_timestamp?: number, to_timestamp?: number): T[] {
    if(from_timestamp === undefined) {
      from_timestamp = -Infinity;
    }
    if(to_timestamp === undefined) {
      to_timestamp = Infinity;
    }
    var result = [];
    for(var i = 0; i < this._segments.length; i++) {
      var s = this._segments[i];
      if(from_timestamp <= s.from_timestamp && s.to_timestamp <= to_timestamp) {
        result.push(s);
      }
    }
    return result;
  }

  setSegments(segments: T[]) {
    this._segments = [];
    this._keyToSegment.clear();
    if(segments) {
      segments.forEach(s => {
        this.addSegment(s);
      });
    }
  }

  addSegment(segment: T) {
    if(this.has(segment.id)) {
      throw new Error(`Segment with key ${segment.id} exists in set`);
    }
    this._keyToSegment.set(segment.id, segment);
    this._segments.push(segment);
  }

  findSegments(point: number, rangeDist: number): T[] {
    return this._segments.filter(s => {
      const expanded = s.expandDist(rangeDist, 0.01);
      return (expanded.from_timestamp <= point) && (point <= expanded.to_timestamp);
    });
  }

  removeInRange(from_timestamp: number, to_timestamp: number): T[] {
    var deleted = [];
    var newSegments = [];
    for(var i = 0; i < this._segments.length; i++) {
      var s = this._segments[i];
      if(from_timestamp <= s.from_timestamp && s.to_timestamp <= to_timestamp) {
        this._keyToSegment.delete(s.id);
        deleted.push(s);
      } else {
        newSegments.push(s);
      }
    }
    this._segments = newSegments;
    return deleted;
  }

  get length() {
    return this._segments.length;
  }

  clear() {
    this._segments = [];
    this._keyToSegment.clear();
  }

  has(key: SegmentId): boolean {
    return this._keyToSegment.has(key);
  }

  remove(key: SegmentId): boolean {
    if(!this.has(key)) {
      return false;
    }
    var index = this._segments.findIndex(s => s.id === key);
    this._segments.splice(index, 1);
    this._keyToSegment.delete(key);
    return true;
  }

  updateId(fromKey: SegmentId, toKey: SegmentId) {
    var segment = this._keyToSegment.get(fromKey);
    this._keyToSegment.delete(fromKey);
    segment.id = toKey;
    this._keyToSegment.set(toKey, segment);
  }

}
