import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transactions.dto';
import Transactions from '@domain/Transactions/entities/Transaction';
import CreateTransaction from '@use-cases/Transactions/create-Transaction';
import { GenericService } from '@app/abstractions/generic.service';
import { UpdateTransaction } from '@use-cases/Transactions/update-Transaction';
import { GetTransactionById } from '@use-cases/Transactions/get-Transaction-by-id';
import { SoftDeleteTransaction } from '@use-cases/Transactions/softdelete-Transaction';
import GetTransactions from '@use-cases/Transactions/get-Transactions';
import { UpdateTransactionDto } from './dto/update-transactions.dto';
import { FilterObject, OrderObject } from '@domain/basic/irepository';

@Injectable()
export class TransactionsService {
  constructor(
    private createTransaction: CreateTransaction,
    private getTransactions: GetTransactions,
    private getTransactionById: GetTransactionById,
    private softDeleteTransaction: SoftDeleteTransaction,
    private updateTransaction: UpdateTransaction,
  ) {}

  async Create(input: CreateTransactionDto) {
    return await this.createTransaction.Execute(input);
  }

  async Update(input: UpdateTransactionDto, id: string) {
    return await this.updateTransaction.Execute(input, id);
  }

  async FindAll(
    page: number,
    recordsPerPage: number,
    filter?: FilterObject[],
    order?: OrderObject,
    noLimit?: boolean,
  ) {
    return await this.getTransactions.Execute(
      page,
      recordsPerPage,
      filter,
      order,
      noLimit,
    );
  }

  async FindOne(id: string) {
    return await this.getTransactionById.Execute(id);
  }

  async Remove(id: string) {
    return await this.softDeleteTransaction.Execute(id);
  }
}
