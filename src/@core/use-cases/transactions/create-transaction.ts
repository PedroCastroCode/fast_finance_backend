import { ICreateExecute } from '@use-cases/abstractions/iexecute';
import { TransactionsResponse } from '@domain/transactions/responses/transactions.response';
import { ITransactionsRepository } from '@domain/transactions/repositories/itransactions.repository';
import HttpError from '@domain/utils/errors/http-errors';
import { TransactionInput } from '@domain/transactions/inputs/transaction-input';
import UniqueId from '@domain/basic/uniqueId';
import Transactions from '@domain/transactions/entities/transaction';
import { Inject } from '@nestjs/common';
import { CreateTransactionDto } from '@app/transactions/dto/create-transactions.dto';
import { IChatBotService } from '@app/chat_bot_service/types/interfaceClass';
import { transactionType } from '@domain/transactions/enum/transactionType';

export default class CreateTransaction
  implements ICreateExecute<CreateTransactionDto, TransactionsResponse>
{
  constructor(
    @Inject('ITransactionsRepository')
    private transactionsRepo: ITransactionsRepository,
    @Inject('IChatBotService')
    private chatBotService: IChatBotService,
  ) {}
  async Execute(props: CreateTransactionDto): Promise<TransactionsResponse> {
    const input = await this.chatBotService.axiosChatBot(props.message);

    const transactionProp: TransactionInput = {
      type: input.type,
      value: input.value,
      category: input.category,
      date: input.date,
      description: input.description,
    };
    const newTransaction = Transactions.newTransaction(transactionProp);
    await this.transactionsRepo.Create(newTransaction);
    const transactionComplete = await this.transactionsRepo.GetById(
      newTransaction.id,
    );
    return transactionComplete.toJSON();
  }
}
