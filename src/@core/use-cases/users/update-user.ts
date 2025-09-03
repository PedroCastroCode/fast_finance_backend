import { UsersInput } from '@domain/users/inputs/users-input';
import HttpError from '@domain/utils/errors/http-errors';
import { IUpdateExecute } from '@use-cases/abstractions/iexecute';
import UniqueId from '@domain/basic/uniqueId';
import { IUsersRepository } from '@domain/users/repositories/iusers.repository';
import { UsersResponse } from '@domain/users/responses/users.response';
import { CreateUserDto } from '@app/users/dto/create-user.dto';
import Users from '@domain/users/entities/user';
import { Inject } from '@nestjs/common';

export class UpdateUser
  implements IUpdateExecute<CreateUserDto, UsersResponse>
{
  constructor(
    @Inject('IUsersRepository')
    private usersRepo: IUsersRepository,
  ) {}

  async Execute(props: CreateUserDto, id: string) {
    const user = await this.usersRepo.GetById(id);
    if (await this.usersRepo.IsUsernameAlreadyInUse(props.username, user.id))
      new HttpError('Username já está sendo utilizado.').BadRequest();
    const input: UsersInput = {
      password: props.password,
      email: props.email,
      username: props.username,
      userType: props.userType,
    };
    const newUser = Users.userWithId(input, id);
    const userUpdated = await this.usersRepo.Update(newUser);
    return userUpdated.toJSON();
  }
}
