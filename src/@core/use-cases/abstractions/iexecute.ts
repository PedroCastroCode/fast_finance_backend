import { FilterObject, OrderObject } from '@domain/basic/irepository';

export interface ICreateExecute<TInput, TOutput> {
  Execute(input: TInput): Promise<TOutput>;
}

export interface IUpdateExecute<TInput, TOutput> {
  Execute(input: TInput, id: string): Promise<TOutput>;
}

export interface IGetByIdExecute<TOutput> {
  Execute(id: string): Promise<TOutput>;
}

export interface IDeleteExecute {
  Execute(id: string): Promise<void>;
}

export interface IGetAllExecute<TOutput> {
  Execute(
    page: number,
    recordsPerPage: number,
    filter?: FilterObject[],
    order?: OrderObject,
    noLimit?: boolean,
  ): Promise<{ total: number; data: TOutput[] }>;
}
