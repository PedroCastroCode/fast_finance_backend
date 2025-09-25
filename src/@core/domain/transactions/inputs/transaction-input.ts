import { transactionType } from '../enum/transactionType';

export type TransactionInput = {
  type: transactionType;
  value: number;
  category: string;
  date: Date;
  description: string;
};

export type AbacusChatBotResponse = {
  success: boolean;
  data: {
    type: transactionType;
    value: number;
    category: string;
    date: Date;
    description: string;
  };
};
