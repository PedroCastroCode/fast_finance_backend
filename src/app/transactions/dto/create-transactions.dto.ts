import { transactionType } from '@domain/transactions/enum/transactionType';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    example: 'Energetico 12 reais',
  })
  message: string;
}
