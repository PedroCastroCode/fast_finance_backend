import { Entity } from '@domain/basic/entity';
import UniqueId from '@domain/basic/uniqueId';
import { UsersInput, UserType } from '@domain/users/inputs/users-input';
import * as bcrypt from 'bcrypt';
import UsersValidatorFactory from '@domain/users/validators/users.validator';
import HttpError from '@domain/utils/errors/http-errors';
import { UsersResponse } from '@domain/users/responses/users.response';

export default class Users extends Entity<UsersInput> {
  private constructor(props: UsersInput, id: UniqueId) {
    super(props, id);
  }

  static newUser(props: UsersInput): Users {
    this.Validate(props);
    return new Users(props, UniqueId.unique());
  }

  static userWithId(props: UsersInput, id: string): Users {
    this.Validate(props);
    return new Users(props, UniqueId.with(id));
  }

  public get email() {
    return this.props.email;
  }

  public get username() {
    return this.props.username;
  }

  public set username(value: string) {
    this.props.username = value;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  public get password() {
    return this.props.password;
  }

  private set password(value: string) {
    if (!value) return;
    this.props.password = bcrypt.hashSync(value, 8);
  }

  public get userType() {
    return this.props.userType;
  }

  private set userType(value: UserType) {
    this.props.userType = value;
  }

  private static Validate(props: UsersInput) {
    const validator = UsersValidatorFactory.Create();
    validator.validate(props);
    if (validator.errors) {
      new HttpError({ errors: validator.errors }).BadRequest();
    }
  }

  toJSON(): UsersResponse {
    return {
      id: this.id.toString(),
      email: this.email,
      username: this.username,
      password: this.password,
      userType: this.userType,
    };
  }

  toUpdate() {
    return {
      id: this.id.toString(),
      email: this.email,
      username: this.username,
      password: this.password,
      userType: this.userType,
    };
  }
}
