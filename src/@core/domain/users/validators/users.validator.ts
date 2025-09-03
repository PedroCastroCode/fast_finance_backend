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
} from 'class-validator';
import { ClassValidatorFields } from '@domain/utils/validations/class-validator-fields';
import { UsersInput, UserType } from '../inputs/users-input';
import UniqueId from '@domain/basic/uniqueId';

export class UsersRules {
  @MaxLength(255)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsOptional()
  @MaxLength(200)
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minSymbols: 0,
    minUppercase: 0,
    minNumbers: 0,
  })
  password: string;
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @Matches(/^[^\s]*$/, {
    message: "Username can't have spaces",
  })
  username: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  userType: string;

  constructor(data: UsersInput) {
    Object.assign(this, data);
  }
}

export class UsersValidator extends ClassValidatorFields<UsersRules> {
  validate(data: UsersInput): boolean {
    return super.validate(new UsersRules(data));
  }
}

export default class UsersValidatorFactory {
  static Create() {
    return new UsersValidator();
  }
}
