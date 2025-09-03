import { ICreateExecute } from '@use-cases/abstractions/iexecute';
import { CreateUserDto } from '@app/users/dto/create-user.dto';
import { UsersResponse } from '@domain/users/responses/users.response';
import { IUsersRepository } from '@domain/users/repositories/iusers.repository';
import HttpError from '@domain/utils/errors/http-errors';
import { UsersInput } from '@domain/users/inputs/users-input';
import UniqueId from '@domain/basic/uniqueId';
import Users from '@domain/users/entities/user';
import { Inject } from '@nestjs/common';

export default class CreateUser
  implements ICreateExecute<CreateUserDto, UsersResponse>
{
  constructor(
    @Inject('IUsersRepository')
    private usersRepo: IUsersRepository,
  ) {}
  async Execute(input: CreateUserDto): Promise<UsersResponse> {
    if (await this.usersRepo.IsUsernameAlreadyInUse(input.username)) {
      throw new HttpError('Username já está sendo utilizado.').BadRequest();
    }
    const userProp: UsersInput = {
      username: input.username,
      email: input.email,
      userType: input.userType,
      password: input.password,
    };
    const newUser = Users.newUser(userProp);
    await this.usersRepo.Create(newUser);
    const userComplete = await this.usersRepo.GetById(newUser.id);
    return userComplete.toJSON();
  }
}
