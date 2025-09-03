import { IUsersRepository } from '@domain/users/repositories/iusers.repository';
import { Inject } from '@nestjs/common';

export default class GetUserByUserName {
  constructor(
    @Inject('IUsersRepository')
    private userRepo: IUsersRepository) {}

  async Execute(username: string) {
    return await this.userRepo.GetUserByUserName(username);
  }
}
