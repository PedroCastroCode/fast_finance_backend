import { InMemoryRepository } from '@db/repositories/in-memory/abstractions/inmemory.repository';
import Users from '@domain/users/entities/user';
import { IUsersRepository } from '@domain/users/repositories/iusers.repository';

export default class UsersInMemoryRepository extends InMemoryRepository<Users> implements IUsersRepository{
  override entity='User';
  async IsUsernameAlreadyInUse(username: string, id?: string): Promise<boolean> {
    return this.items.findIndex(x=>x.username === username && x.id.toString() !== id) >= 0;
  }

  async GetUserByUserName(username: string): Promise<Users | null | undefined> {
    return this.items.find(x=>x.username === username);
  }
}