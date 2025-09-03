import { transactionType } from '../enum/transactionType';

export type TransactionInput = {
  type: transactionType;
  value: number;
  category: string;
  date: Date;
  description: string;
};
