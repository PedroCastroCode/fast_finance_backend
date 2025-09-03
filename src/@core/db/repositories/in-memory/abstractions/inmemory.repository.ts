import { IRepository } from '@domain/basic/irepository';
import HttpError from '@domain/utils/errors/http-errors';
import { FilterColumns } from '@db/repositories/typeorm/utils/filter/helper';
import UniqueId from '@domain/basic/uniqueId';
import { Entity } from '@domain/basic/entity';

export abstract class InMemoryRepository<T extends Entity<any>>
  implements IRepository<T>
{
  orderColumns: string[] = [];
  filterColumns: FilterColumns[] = [];
  items: T[] = [];
  entity: string = '';

  async Remove(id: string): Promise<void> {
    await this._get(id);
    const index = this.items.findIndex(x=>x.id==id);
    this.items.splice(index,1);
  }

  async Create(item: T): Promise<T> {
    this.items.push(item);
    return item;
  }

  async Update(item: T): Promise<T> {
    await this._get(item.id);
    const index = this.items.findIndex((i) => i.id === item.id);
    this.items[index] = item;
    return item;
  }

  async GetById(id: string): Promise<T> {
    return await this._get(id);
  }

  async GetAll(
    page: number,
    recordsPerPage: number,
  ): Promise<{ total: number; data: T[] }> {
    const data = this.items.slice(
      recordsPerPage * page,
      recordsPerPage * (page + 1),
    );
    const total = this.items.length;
    return { total, data };
  }

  protected async _get(id: string) {
    const item = this.items.find((item) => item.id === id);
    if (!item) new HttpError(this.entity + ' not found.').NotFound();
    return item;
  }
}
