import { TransactionsTypeOrmRepository } from '@db/repositories/typeorm/transactions/repositories/transactions.repository';
import { UsersTypeOrmRepository } from '@db/repositories/typeorm/users/repositories/user.repository';
import Transactions from '@domain/transactions/entities/transaction';
import Users from '@domain/users/entities/user';
import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const repositoriesProvider: Provider[] = [
  {
    provide: 'IUsersRepository',
    useFactory: (dataSource: DataSource) =>
      new UsersTypeOrmRepository(dataSource.getRepository(Users)),
    inject: [getDataSourceToken()],
  },
  {
    provide: 'ITransactionsRepository',
    useFactory: (dataSource: DataSource) =>
      new TransactionsTypeOrmRepository(dataSource.getRepository(Transactions)),
    inject: [getDataSourceToken()],
  },
];
