import { TransactionInput } from '@domain/transactions/inputs/transaction-input';

export interface IChatBotService {
  axiosChatBot(message: string): Promise<TransactionInput>;
}
