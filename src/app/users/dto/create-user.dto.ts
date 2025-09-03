import { UserType } from '@domain/users/inputs/users-input';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'usuario@mgcode.com.br',
  })
  public email: string;
  @ApiProperty({
    example: '#DreamSystem!',
  })
  password: string;

  @ApiProperty({
    example: 'myusername',
  })
  username: string;
  @ApiProperty({
    example: '9541386e-59db-40c1-aa9b-9ca474f1f725',
  })
  userType: UserType;
}
