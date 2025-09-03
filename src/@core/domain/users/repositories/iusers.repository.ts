import { IRepository } from '@domain/basic/irepository';
import Users from '@domain/users/entities/user';

export interface IUsersRepository extends IRepository<Users> {
  IsUsernameAlreadyInUse(username: string, id?: string): Promise<boolean>
  GetUserByUserName(username: string): Promise<Users | null | undefined>
}