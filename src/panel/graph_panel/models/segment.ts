export type SegmentId = string;

export class Segment {
  constructor(private _id: SegmentId, public from_timestamp: number, public to_timestamp: number) {
    if(this._id === undefined) {
      throw new Error('id is undefined');
    }
    if(isNaN(+from_timestamp)) {
      throw new Error('from can`t be NaN');
    }
    if(isNaN(+to_timestamp)) {
      throw new Error('to can`t be NaN');
    }
  }
  
  get id(): SegmentId { return this._id; }
  set id(value) { this._id = value; }

  get middle() { return (this.from_timestamp + this.to_timestamp) / 2; }

  get length() {
    return Math.max(this.from_timestamp, this.to_timestamp) - Math.min(this.from_timestamp, this.to_timestamp);
  }

  expandDist(allDist: number, portion: number): Segment {
    var p = Math.round(this.middle - allDist * portion / 2);
    var q = Math.round(this.middle + allDist * portion / 2);
    p = Math.min(p, this.from_timestamp);
    q = Math.max(q, this.to_timestamp);
    return new Segment(this._id, p, q);
  }

  equals(segment: Segment) {
    return this._id === segment._id;
  }
}
