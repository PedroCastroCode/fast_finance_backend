import {
  MaxLength,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsNumber,
  Matches,
  IsOptional,
  IsUUID,
  IsEnum,
  IsDate,
} from 'class-validator';
import { ClassValidatorFields } from '@domain/utils/validations/class-validator-fields';
import { TransactionInput } from '../inputs/transaction-input';
import UniqueId from '@domain/basic/uniqueId';
import { IsValidDateOrStringDate } from '@domain/utils/validations/date.validator';
import { transactionType } from '../enum/transactionType';

export class TransactionsRules {
  @IsNotEmpty()
  @IsEnum(transactionType)
  type: transactionType;

  @IsNotEmpty()
  @MaxLength(100)
  category: string;

  @IsNumber()
  @IsNotEmpty()
  value: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsValidDateOrStringDate('Date', { message: 'Date is invalid' })
  date: string;

  constructor(data: TransactionInput) {
    Object.assign(this, data);
    // this.id_profile = data.id_profile?.value;
  }
}

export class TransactionsValidator extends ClassValidatorFields<TransactionsRules> {
  validate(data: TransactionInput): boolean {
    return super.validate(new TransactionsRules(data));
  }
}

export default class TransactionsValidatorFactory {
  static Create() {
    return new TransactionsValidator();
  }
}
