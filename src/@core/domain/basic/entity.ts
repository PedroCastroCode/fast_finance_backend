import UniqueId from './uniqueId';

export abstract class Entity<T> {
  created_at: Date;
  updated_at: Date;
  props: T = {} as T;

  protected constructor(props: T, id: UniqueId) {
    this._id = id ?? null;
    this.props = props ?? ({} as T);
  }

  _id: UniqueId;

  public get id() {
    return this._id.value;
  }

  private set id(value: string) {
    this._id = UniqueId.with(value);
  }

  toUpdate() {
    return {};
  }
}
