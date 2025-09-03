import { FilterObject, OrderObject } from '@domain/basic/irepository';
import { IGetAllExecute } from '@use-cases/abstractions/iexecute';
import { IUsersRepository } from '@domain/users/repositories/iusers.repository';
import { UsersResponse } from '@domain/users/responses/users.response';
import { Inject } from '@nestjs/common';

export default class GetUsers implements IGetAllExecute<UsersResponse> {
  constructor(
    @Inject('IUsersRepository')
    private usersRepo: IUsersRepository) {}

  async Execute(
    page: number,
    recordsPerPage: number,
    filter?: FilterObject[],
    order?: OrderObject,
  ) {
    const users = await this.usersRepo.GetAll(page, recordsPerPage, filter, order);
    return {
      data: users.data.map(user => user.toJSON()),
      total: users.total
    };
  }
}
