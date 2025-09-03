import { EntitySchema } from 'typeorm';
import { BasicColumnsSchema } from '@db/repositories/typeorm/shared/basic-schema.columns';
import Transactions from '@domain/transactions/entities/transaction';
import { transactionType } from '@domain/transactions/enum/transactionType';

export const TransactionsSchema = new EntitySchema<Transactions>({
  name: 'transactions',
  tableName: 'transactions',
  target: Transactions,
  columns: {
    ...BasicColumnsSchema,
    type: {
      type: 'enum',
      enum: transactionType,
      nullable: false,
    },
    value: {
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    },
    category: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    date: {
      type: 'timestamp',
      nullable: false,
    },
    description: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
  },
});
