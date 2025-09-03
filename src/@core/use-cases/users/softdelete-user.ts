import UniqueId from '@domain/basic/uniqueId';
import { IDeleteExecute } from '@use-cases/abstractions/iexecute';
import { IUsersRepository } from '@domain/users/repositories/iusers.repository';
import { Inject } from '@nestjs/common';

export class SoftDeleteUser implements IDeleteExecute {
  constructor(
    @Inject('IUsersRepository')
    private usersRepo: IUsersRepository) {}

  async Execute(id: string) {
    await this.usersRepo.Remove(id);
  }
}
