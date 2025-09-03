import UniqueId from '@domain/basic/uniqueId';

export type UsersInput = {
  email: string;
  password: string;
  username: string;
  userType: UserType;
};

export enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
