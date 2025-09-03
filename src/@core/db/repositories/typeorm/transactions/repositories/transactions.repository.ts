import { Not } from 'typeorm';
import { CrudRepository } from '@db/repositories/typeorm/abstractions/crud.repository';
import { FilterColumns } from '@db/repositories/typeorm/utils/filter/helper';
import { ITransactionsRepository } from '@domain/transactions/repositories/itransactions.repository';
import Transactions from '@domain/transactions/entities/transaction';

export class TransactionsTypeOrmRepository
  extends CrudRepository<Transactions>
  implements ITransactionsRepository
{
  override orderColumns: string[] = ['type'];
  override filterColumns: FilterColumns[] = [
    { column: 'type', type: 'string' },
  ];
  override entityName = 'Transactions';
}
