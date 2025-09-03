import { Entity } from '@domain/basic/entity';
import UniqueId from '@domain/basic/uniqueId';
import { TransactionInput } from '@domain/transactions/inputs/transaction-input';
import HttpError from '@domain/utils/errors/http-errors';
import { TransactionsResponse } from '../responses/transactions.response';
import TransactionsValidatorFactory from '../validators/transactions.validator';
import { transactionType } from '../enum/transactionType';

export default class Transactions extends Entity<TransactionInput> {
  private constructor(props: TransactionInput, id: UniqueId) {
    super(props, id);
  }

  static newTransaction(props: TransactionInput): Transactions {
    this.Validate(props);
    return new Transactions(props, UniqueId.unique());
  }

  static TransactionWithId(props: TransactionInput, id: string): Transactions {
    this.Validate(props);
    return new Transactions(props, UniqueId.with(id));
  }

  public get type() {
    return this.props.type;
  }
  private set type(value: transactionType) {
    this.props.type = value;
  }

  public get category() {
    return this.props.category;
  }

  public set category(value: string) {
    this.props.category = value;
  }

  public get date() {
    return this.props.date;
  }

  private set date(value: Date) {
    this.props.date = value;
  }

  public get value() {
    return this.props.value;
  }

  private set value(value: number) {
    this.props.value = value;
  }

  public get description() {
    return this.props.description;
  }

  public set description(value: string) {
    this.props.description = value;
  }

  private static Validate(props: TransactionInput) {
    const validator = TransactionsValidatorFactory.Create();
    validator.validate(props);
    if (validator.errors) {
      new HttpError({ errors: validator.errors }).BadRequest();
    }
  }

  toJSON(): TransactionsResponse {
    return {
      id: this.id.toString(),
      type: this.type,
      category: this.category,
      date: this.date,
      value: this.value,
      description: this.description,
    };
  }

  toUpdate() {
    return {
      id: this.id.toString(),
      type: this.type,
      category: this.category,
      date: this.date,
      value: this.value,
      description: this.description,
    };
  }
}
