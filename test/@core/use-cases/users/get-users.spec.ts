import { IGetAllExecute } from '@use-cases/abstractions/iexecute';
import { UsersResponse } from '@domain/users/responses/users.response';
import { IUsersRepository } from '@domain/users/repositories/iusers.repository';
import UniqueId from '@domain/basic/uniqueId';
import UsersInMemoryRepository from '@db/repositories/in-memory/users-in-memory.repository';
import Users from '@domain/users/entities/user';
import GetUsers from '@use-cases/users/get-users';

describe('Testes unitários do use-case Get de usuários', () => {
  let getUsers: IGetAllExecute<UsersResponse>;
  let usersRepository: IUsersRepository;
  const id_user = UniqueId.unique();
  const id_profile = UniqueId.unique();
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository();
    getUsers = new GetUsers(usersRepository);
    await usersRepository.Create(
      Users.userWithId(
        {
          username: 'teste123456',
          password: '1234567891011',
          email: 'teste123456@example.com',
          id_profile: id_profile,
        },
        id_user.value,
      ),
    );
  });
  it('should get user by specific id', async () => {
    const users = await getUsers.Execute(0, 10, null, null, false);
    expect(users.data).toHaveLength(1);
    expect(users.data[0].id).toBe(id_user.value);
    expect(users.data[0].email).toBe('teste123456@example.com');
    expect(users.data[0].username).toBe('teste123456');
    expect(users.data[0].password).toBe('1234567891011');
    expect(users.data[0].id_profile).toBe(id_profile.value);
  });
});
