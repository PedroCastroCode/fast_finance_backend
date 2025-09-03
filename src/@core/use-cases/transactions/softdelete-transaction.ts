import UniqueId from '@domain/basic/uniqueId';
import { IDeleteExecute } from '@use-cases/abstractions/iexecute';
import { ITransactionsRepository } from '@domain/transactions/repositories/itransactions.repository';
import { Inject } from '@nestjs/common';

export class SoftDeleteTransaction implements IDeleteExecute {
  constructor(
    @Inject('ITransactionsRepository')
    private transactionsRepo: ITransactionsRepository,
  ) {}

  async Execute(id: string) {
    await this.transactionsRepo.Remove(id);
  }
}
