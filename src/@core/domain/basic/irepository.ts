import { Entity } from './entity';
import { FilterColumns } from '@db/repositories/typeorm/utils/filter/helper';
import UniqueId from './uniqueId';

export interface IRepository<T extends Entity<any>> {
    filterColumns: FilterColumns[];
    orderColumns: string[];
    Create(item: T): Promise<T>;
    Update(item: T): Promise<T>;
    GetById(id: string): Promise<T>;
    GetAll(
        page: number,
        recordsPerPage: number,
        filter?: FilterObject[],
        order?: OrderObject,
        noLimit?: boolean,
    ): Promise<{ total: number; data: T[] }>;
    Remove(id: string): Promise<void>;
}

export type FilterObject = {
    searchColumn: string;
    searchValue: string;
};

export type OrderObject = {
    orderBy: string;
    orderDirection: string;
};
