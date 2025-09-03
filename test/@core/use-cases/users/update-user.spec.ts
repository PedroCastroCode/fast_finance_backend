import UsersInMemoryRepository from '@db/repositories/in-memory/users-in-memory.repository';
import Users from '@domain/users/entities/user';
import UniqueId from '@domain/basic/uniqueId';
import { IUpdateExecute } from '@use-cases/abstractions/iexecute';
import { CreateUserDto } from '@app/users/dto/create-user.dto';
import { IUsersRepository } from '@domain/users/repositories/iusers.repository';
import { IProfilesRepository } from '@domain/profiles/repositories/iprofiles.repository';
import ProfilesInMemoryRepository from '@db/repositories/in-memory/profiles-in-memory.repository';
import Profiles from '@domain/profiles/entities/profiles';
import { UpdateUser } from '@use-cases/users/update-user';

describe('Testes unitários do use-case Update de usuários', () => {
  let updateUseCase: IUpdateExecute<CreateUserDto, any>;
  let usersRepository: IUsersRepository;
  let profilesRepository: IProfilesRepository;
  const id_profile = UniqueId.unique();
  const id_user = UniqueId.unique();
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository();
    profilesRepository = new ProfilesInMemoryRepository();
    await profilesRepository.Create(
      Profiles.profileWithId(
        {
          profile: 'Testes',
        },
        id_profile.value,
      ),
    );
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
    updateUseCase = new UpdateUser(usersRepository, profilesRepository);
  });
  it('should update the user informations', async () => {
    const user = await updateUseCase.Execute(
      {
        username: 'teste',
        password: '123456',
        email: 'teste@example.com',
        id_profile: id_profile.value,
      },
      id_user.value,
    );
    const userUpdated = await usersRepository.GetById(user.id);
    expect(userUpdated.id).toBe(user.id);
    expect(userUpdated.id_profile).toBe(id_profile.value);
    expect(userUpdated.password).toBe(user.password);
    expect(userUpdated.username).toBe(user.username);
    expect(userUpdated.email).toBe(user.email);
  });
  it('should throw username already in use', async () => {
    const userDup = Users.newUser({
      username: 'teste',
      password: '123456',
      email: 'teste@example.com',
      id_profile: id_profile,
    });
    let error = '';
    await usersRepository.Create(userDup);
    try {
      await updateUseCase.Execute(
        {
          username: 'teste',
          password: '123456',
          email: 'teste@example.com',
          id_profile: id_profile.value,
        },
        id_user.value,
      );
    } catch (e) {
      error = e.response;
    }
    expect(error).toEqual('Username já está sendo utilizado.');
  });
  it('should throw profile not found', async () => {
    const nonexistentProfile = UniqueId.unique();
    let error = '';
    try {
      await updateUseCase.Execute(
        {
          username: 'teste',
          password: '123456',
          email: 'teste@example.com',
          id_profile: nonexistentProfile.value,
        },
        id_user.value,
      );
    } catch (e) {
      error = e.response;
    }
    expect(error).toEqual('Profile not found.');
  });
  it('should throw user not found', async () => {
    const nonexistentUser = UniqueId.unique();
    let error = '';
    try {
      await updateUseCase.Execute(
        {
          username: 'teste',
          password: '123456',
          email: 'teste@example.com',
          id_profile: id_profile.value,
        },
        nonexistentUser.value,
      );
    } catch (e) {
      error = e.response;
    }
    expect(error).toEqual('User not found.');
  });
});
