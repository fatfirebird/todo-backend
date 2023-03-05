export class Meta {
  offset: number;
  limit: number;

  constructor({ offset, limit }: Meta) {
    this.offset = Number(offset) || 0;
    this.limit = Number(limit) || 10;
  }
}
