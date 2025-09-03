import { IGetByIdExecute } from '@use-cases/abstractions/iexecute';
import { IUsersRepository } from '@domain/users/repositories/iusers.repository';
import { Inject } from '@nestjs/common';

export class GetUserById implements IGetByIdExecute<any> {
  constructor(
    @Inject('IUsersRepository')
    private usersRepo: IUsersRepository
  ) {}

  async Execute(id: string) {
    const user = await this.usersRepo.GetById(id);
    return user.toJSON();
  }
}
