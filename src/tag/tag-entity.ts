import { Entity } from '../core/entity';

interface TagData {
  name: string;
  color: string;
}

export class Tag extends Entity<TagData> {
  constructor(data: TagData) {
    super(data);
  }

  get name() {
    return this.data.name;
  }

  get color() {
    return this.data.color;
  }
}
