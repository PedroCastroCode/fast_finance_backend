import { IGetByIdExecute } from '@use-cases/abstractions/iexecute';
import { UsersResponse } from '@domain/users/responses/users.response';
import { IUsersRepository } from '@domain/users/repositories/iusers.repository';
import { GetUserById } from '@use-cases/users/get-user-by-id';
import UsersInMemoryRepository from '@db/repositories/in-memory/users-in-memory.repository';
import UniqueId from '@domain/basic/uniqueId';
import Users from '@domain/users/entities/user';

describe('Testes unitários do use-case GetById de usuários', () => {
  let getUserById: IGetByIdExecute<UsersResponse>;
  let usersRepository: IUsersRepository;
  const id_user = UniqueId.unique();
  const id_profile = UniqueId.unique();
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository();
    getUserById = new GetUserById(usersRepository);
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
    const user = await getUserById.Execute(id_user.value);
    expect(user.id).toBe(id_user.value);
    expect(user.username).toBe('teste123456');
    expect(user.email).toBe('teste123456@example.com');
    expect(user.id_profile).toBe(id_profile.value);
    expect(user.password).toBe('1234567891011');
  });
  it('should thrown user not found', async () => {
    let error = '';
    try {
      await getUserById.Execute(UniqueId.unique().value);
    } catch (e) {
      error = e.response;
    }
    expect(error).toBe('User not found.');
  });
});
