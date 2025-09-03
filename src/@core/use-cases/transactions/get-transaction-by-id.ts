import { IGetByIdExecute } from '@use-cases/abstractions/iexecute';
import { ITransactionsRepository } from '@domain/transactions/repositories/itransactions.repository';
import { Inject } from '@nestjs/common';

export class GetTransactionById implements IGetByIdExecute<any> {
  constructor(
    @Inject('ITransactionsRepository')
    private transactionsRepo: ITransactionsRepository,
  ) {}

  async Execute(id: string) {
    const transaction = await this.transactionsRepo.GetById(id);
    return transaction.toJSON();
  }
}
