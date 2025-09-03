import { IRepository } from '@domain/basic/irepository';
import Transactions from '../entities/transaction';

export interface ITransactionsRepository extends IRepository<Transactions> {}
