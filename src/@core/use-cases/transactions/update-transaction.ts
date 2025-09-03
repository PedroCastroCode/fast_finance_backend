import HttpError from '@domain/utils/errors/http-errors';
import { IUpdateExecute } from '@use-cases/abstractions/iexecute';
import UniqueId from '@domain/basic/uniqueId';
import { ITransactionsRepository } from '@domain/transactions/repositories/itransactions.repository';
import { TransactionsResponse } from '@domain/transactions/responses/transactions.response';
import { Inject } from '@nestjs/common';
import { CreateTransactionDto } from '@app/transactions/dto/create-transactions.dto';
import Transactions from '@domain/transactions/entities/transaction';
import { TransactionInput } from '@domain/transactions/inputs/transaction-input';
import { transactionType } from '@domain/transactions/enum/transactionType';
import { UpdateTransactionDto } from '@app/transactions/dto/update-transactions.dto';

export class UpdateTransaction
  implements IUpdateExecute<UpdateTransactionDto, TransactionsResponse>
{
  constructor(
    @Inject('ITransactionsRepository')
    private transactionsRepo: ITransactionsRepository,
  ) {}

  async Execute(props: UpdateTransactionDto, id: string) {
    const input: TransactionInput = {
      type: props.type,
      value: props.value,
      category: props.category,
      date: props.date,
      description: props.description,
    };
    const newTransaction = Transactions.TransactionWithId(input, id);
    const transactionUpdated =
      await this.transactionsRepo.Update(newTransaction);
    return transactionUpdated.toJSON();
  }
}
