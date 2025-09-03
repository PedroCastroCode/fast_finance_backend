import { Entity } from '@domain/basic/entity';
import {
  FilterObject,
  IRepository,
  OrderObject,
} from '@domain/basic/irepository';
import {
  DeepPartial,
  FindOptionsWhere,
  IsNull,
  Not,
  Repository,
} from 'typeorm';
import { FilterColumns, FilterHelper } from '../utils/filter/helper';
import { OrderHelper } from '../utils/order/helper';
import HttpError from '@domain/utils/errors/http-errors';

export abstract class CrudRepository<T extends Entity<any>>
  implements IRepository<T>
{
  entityName: string;
  filterColumns: FilterColumns[] = [];
  orderColumns: string[] = [];

  constructor(public repository: Repository<T>) {}

  async Create(item: T): Promise<T> {
    const data = this.repository.create(item);
    return this.repository.save(data);
  }

  async Update(item: T): Promise<T> {
    await this.GetById(item.id);
    const data = await this.repository.preload(item);
    await this.repository.save(data.toUpdate() as DeepPartial<T>);
    return data;
  }

  async GetById(id: string): Promise<T> {
    const data = await this.repository.findOne({
      where: {
        id: id,
      } as FindOptionsWhere<T>,
      loadEagerRelations: true,
    });
    if (data) return data;
    new HttpError(this.entityName + ' not found').NotFound();
  }

  async GetAll(
    page: number,
    recordsPerPage: number,
    filter?: FilterObject[],
    order?: OrderObject,
    noLimit?: boolean,
  ): Promise<{ total: number; data: T[] }> {
    page--;
    if (!page || page < 0) page = 0;
    if (!recordsPerPage || recordsPerPage < 0) recordsPerPage = 10;
    if (!noLimit) noLimit = false;

    const pagination = noLimit
      ? {}
      : { skip: page * recordsPerPage, take: recordsPerPage };

    const data = await this.repository.find({
      ...pagination,
      where: {
        ...(filter
          ? FilterHelper(filter, this.filterColumns)
          : ({
              id: Not(IsNull()),
            } as FindOptionsWhere<T>)),
      },
      order: {
        ...OrderHelper(order, this.orderColumns),
      },
    });
    const total = noLimit
      ? null
      : await this.repository.count({
          where: {
            ...(filter ||
            this.filterColumns.find((x) => x.column.includes('id_company'))
              ? FilterHelper(filter, this.filterColumns)
              : ({
                  id: Not(IsNull()),
                } as FindOptionsWhere<T>)),
          },
          loadEagerRelations: false,
        });
    return { data, total };
  }

  async Remove(id: string): Promise<void> {
    await this.GetById(id);
    await this.repository.delete(id);
  }
}
