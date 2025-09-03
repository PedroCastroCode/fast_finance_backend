import { UserType } from '../inputs/users-input';

export type UsersResponse = {
  id: string;
  email: string;
  username: string;
  userType: UserType;
  password: string;
};
