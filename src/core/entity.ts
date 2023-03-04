export class Entity<T> {
  public readonly data: T;

  constructor(data: T) {
    this.data = data;
  }
}
