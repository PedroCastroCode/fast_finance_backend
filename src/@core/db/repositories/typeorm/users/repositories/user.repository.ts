import { Not } from 'typeorm';
import { CrudRepository } from '@db/repositories/typeorm/abstractions/crud.repository';
import Users from '@domain/users/entities/user';
import { IUsersRepository } from '@domain/users/repositories/iusers.repository';
import { FilterColumns } from '@db/repositories/typeorm/utils/filter/helper';

export class UsersTypeOrmRepository
  extends CrudRepository<Users>
  implements IUsersRepository
{
  override orderColumns: string[] = ['id', 'username', 'email', 'created_at'];
  override filterColumns: FilterColumns[] = [
    { column: 'username', type: 'string' },
    { column: 'email', type: 'string' },
  ];
  override entityName = 'User';

  async IsUsernameAlreadyInUse(
    username: string,
    id?: string,
  ): Promise<boolean> {
    const user = await this.repository.findOne({
      where: {
        username,
        ...(id && { id: Not(id) }),
      },
    });
    return !!user;
  }

  async GetUserByUserName(username: string): Promise<Users | null | undefined> {
    return await this.repository.findOne({
      where: {
        username,
      },
    });
  }
}
