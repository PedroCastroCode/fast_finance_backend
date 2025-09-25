import { ICreateExecute } from '@use-cases/abstractions/iexecute';
import { TransactionsResponse } from '@domain/transactions/responses/transactions.response';
import { ITransactionsRepository } from '@domain/transactions/repositories/itransactions.repository';
import { TransactionInput } from '@domain/transactions/inputs/transaction-input';
import Transactions from '@domain/transactions/entities/transaction';
import { Inject } from '@nestjs/common';
import { CreateTransactionDto } from '@app/transactions/dto/create-transactions.dto';
import { IChatBotService } from '@app/chat_bot_service/types/interfaceClass';

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
    // const input = await this.chatBotService.axiosChatBot(props.message);

    const transactionProp: TransactionInput = {
      type: props.type,
      value: props.value,
      category: props.category,
      date: props.date,
      description: props.description,
    };
    const newTransaction = Transactions.newTransaction(transactionProp);
    await this.transactionsRepo.Create(newTransaction);
    const transactionComplete = await this.transactionsRepo.GetById(
      newTransaction.id,
    );
    return transactionComplete.toJSON();
  }
}
