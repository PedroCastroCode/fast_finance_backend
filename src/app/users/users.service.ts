import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import Users from '@domain/users/entities/user';
import CreateUser from '@use-cases/users/create-user';
import { GenericService } from '@app/abstractions/generic.service';
import { UpdateUser } from '@use-cases/users/update-user';
import { GetUserById } from '@use-cases/users/get-user-by-id';
import { SoftDeleteUser } from '@use-cases/users/softdelete-user';
import GetUsers from '@use-cases/users/get-users';

@Injectable()
export class UsersService extends GenericService<
  CreateUserDto,
  Users,
  CreateUser,
  UpdateUser,
  GetUserById,
  SoftDeleteUser,
  GetUsers
> {
  constructor(
    private createUser: CreateUser,
    private getUsers: GetUsers,
    private getUserById: GetUserById,
    private softDeleteUser: SoftDeleteUser,
    private updateUser: UpdateUser,
  ) {
    super(createUser, updateUser, getUserById, softDeleteUser, getUsers);
  }
}