import UsersInMemoryRepository from '@db/repositories/in-memory/users-in-memory.repository';
import CreateUser from '@use-cases/users/create-user';
import Users from '@domain/users/entities/user';
import UniqueId from '@domain/basic/uniqueId';
import { ICreateExecute } from '@use-cases/abstractions/iexecute';
import { CreateUserDto } from '@app/users/dto/create-user.dto';
import { IUsersRepository } from '@domain/users/repositories/iusers.repository';
import { IProfilesRepository } from '@domain/profiles/repositories/iprofiles.repository';
import ProfilesInMemoryRepository from '@db/repositories/in-memory/profiles-in-memory.repository';
import Profiles from '@domain/profiles/entities/profiles';

describe('Testes unitários do use-case Create de usuários', () => {
  let createUseCase: ICreateExecute<CreateUserDto, any>;
  let usersRepository: IUsersRepository;
  let profilesRepository: IProfilesRepository;
  const id_profile = UniqueId.unique();
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
    createUseCase = new CreateUser(usersRepository, profilesRepository);
  });
  it('should create a new user', async () => {
    const user = await createUseCase.Execute({
      username: 'teste',
      password: '123456',
      email: 'teste@example.com',
      id_profile: id_profile.value,
    });
    const userCreated = await usersRepository.GetById(user.id);
    expect(userCreated.id).toBe(user.id);
    expect(userCreated.id_profile).toBe(id_profile.value);
    expect(userCreated.password).toBe(user.password);
    expect(userCreated.username).toBe(user.username);
    expect(userCreated.email).toBe(user.email);
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
      await createUseCase.Execute({
        username: 'teste',
        password: '123456',
        email: 'teste@example.com',
        id_profile: id_profile.value,
      });
    } catch (e) {
      error = e.response;
    }
    expect(error).toEqual('Username já está sendo utilizado.');
  });
  it('should throw profile not found', async () => {
    const nonexistentProfile = UniqueId.unique();
    let error = '';
    try {
      await createUseCase.Execute({
        username: 'teste',
        password: '123456',
        email: 'teste@example.com',
        id_profile: nonexistentProfile.value,
      });
    } catch (e) {
      error = e.response;
    }
    expect(error).toEqual('Profile not found.');
  });
});
