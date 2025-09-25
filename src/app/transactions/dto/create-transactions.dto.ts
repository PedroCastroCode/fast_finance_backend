import { transactionType } from '@domain/transactions/enum/transactionType';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
    @ApiProperty({
    example: 'despesa',
  })
  public type: transactionType;
  @ApiProperty({
    example: 12.0,
  })
  value: number;

  @ApiProperty({
    example: '2025-06-03T00:00:00.000',
  })
  date: Date;

  @ApiProperty({
    example: 'dívidas',
  })
  category: string;

  @ApiProperty({
    example: 'Pagamento de dívida para Gabriel',
  })
  description: string;
}
