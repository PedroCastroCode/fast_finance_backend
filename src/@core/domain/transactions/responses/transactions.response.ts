import { transactionType } from '../enum/transactionType';

export type TransactionsResponse = {
  id: string;
  type: transactionType;
  category: string;
  value: number;
  description: string;
  date: Date;
};
