import { FilterObject, OrderObject } from '@domain/basic/irepository';
import { Injectable } from '@nestjs/common';
import {
  ICreateExecute,
  IDeleteExecute,
  IGetAllExecute,
  IGetByIdExecute,
  IUpdateExecute,
} from '@use-cases/abstractions/iexecute';

@Injectable()
export abstract class GenericService<
  TInput,
  TOutput,
  TCreate extends ICreateExecute<TInput, any>,
  TUpdate extends IUpdateExecute<TInput, any>,
  TGetById extends IGetByIdExecute<any>,
  TDelete extends IDeleteExecute,
  TGetAll extends IGetAllExecute<any>,
> {
  constructor(
    private Tcreate: TCreate,
    private Tupdate: TUpdate,
    private TgetById: TGetById,
    private Tdelete: TDelete,
    private TgetAll: TGetAll,
  ) {}

  async Create(input: TInput) {
    return await this.Tcreate.Execute(input);
  }

  async Update(input: TInput, id: string) {
    return await this.Tupdate.Execute(input, id);
  }

  async FindAll(
    page: number,
    recordsPerPage: number,
    filter?: FilterObject[],
    order?: OrderObject,
    noLimit?: boolean,
  ) {
    return await this.TgetAll.Execute(
      page,
      recordsPerPage,
      filter,
      order,
      noLimit,
    );
  }

  async FindOne(id: string) {
    return await this.TgetById.Execute(id);
  }

  async Remove(id: string) {
    return await this.Tdelete.Execute(id);
  }
}
