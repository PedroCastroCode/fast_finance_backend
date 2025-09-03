import { FilterObject, OrderObject } from '@domain/basic/irepository';
import { IGetAllExecute } from '@use-cases/abstractions/iexecute';
import { ITransactionsRepository } from '@domain/transactions/repositories/itransactions.repository';
import { TransactionsResponse } from '@domain/transactions/responses/transactions.response';
import { Inject } from '@nestjs/common';

export default class GetTransactions
  implements IGetAllExecute<TransactionsResponse>
{
  constructor(
    @Inject('ITransactionsRepository')
    private transactionsRepo: ITransactionsRepository,
  ) {}

  async Execute(
    page: number,
    recordsPerPage: number,
    filter?: FilterObject[],
    order?: OrderObject,
    limit?: boolean,
  ) {
    const transactions = await this.transactionsRepo.GetAll(
      page,
      recordsPerPage,
      filter,
      order,
    );
    return {
      data: transactions.data.map((transaction) => transaction.toJSON()),
      total: transactions.total,
    };
  }
}
