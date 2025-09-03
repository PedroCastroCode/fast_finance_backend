import { EntitySchema } from 'typeorm';
import { BasicColumnsSchema } from '@db/repositories/typeorm/shared/basic-schema.columns';
import Users from '@domain/users/entities/user';
import { UserType } from '@domain/users/inputs/users-input';

export const UsersSchema = new EntitySchema<Users>({
  name: 'users',
  tableName: 'users',
  target: Users,
  columns: {
    ...BasicColumnsSchema,
    email: {
      type: 'varchar',
      length: 255,
      unique: false,
      nullable: true,
    },
    password: {
      type: 'varchar',
      length: 255,
    },
    username: {
      type: 'varchar',
      length: 255,
      nullable: false,
      unique: true,
    },
    userType: {
      type: 'enum',
      enum: UserType,
      nullable: false,
    },
  },
  // relations: {
  //   profile: {
  //     target: 'profiles',
  //     type: 'many-to-one',
  //     joinColumn: {
  //       name: 'id_profile',
  //     },
  //     eager: true,
  //   },
  // },
});
