import { TransactionInput } from '@domain/transactions/inputs/transaction-input';
import { chatBotService } from './../chat_bot.service';
import { typePost } from './typePost';
import { TypeResponse } from './typeResponse';

export interface IChatBotService {
  axiosChatBot(message: string): Promise<TransactionInput>;
}
