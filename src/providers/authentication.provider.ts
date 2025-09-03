import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import GetUserByUserName from '@use-cases/users/get-user-by-username';
import { DataSource } from 'typeorm';
import { UsersTypeOrmRepository } from '@db/repositories/typeorm/users/repositories/user.repository';
import Users from '@domain/users/entities/user';

export const authenticationProvider: Provider[] = [
  {
    provide: UsersTypeOrmRepository,
    useFactory: (dataSource: DataSource) =>
      new UsersTypeOrmRepository(dataSource.getRepository(Users)),
    inject: [getDataSourceToken()],
  },
  {
    provide: GetUserByUserName,
    useFactory: (usersRepository: UsersTypeOrmRepository) =>
      new GetUserByUserName(usersRepository),
    inject: [UsersTypeOrmRepository],
  },
];
