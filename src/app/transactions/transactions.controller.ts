import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  Request,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transactions.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterObject } from '@domain/basic/irepository';
import { UpdateTransactionDto } from './dto/update-transactions.dto';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly TransactionsService: TransactionsService) {}

  @Post()
  async Create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req,
  ) {
    return await this.TransactionsService.Create(createTransactionDto);
  }

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'orderBy', required: false })
  @ApiQuery({ name: 'orderDirection', required: false })
  @Get()
  async FindAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('filter') filter: FilterObject[],
    @Query('orderBy') orderBy: string,
    @Query('orderDirection') orderDirection: string,
  ) {
    let order = null;
    if (orderBy) {
      order = {
        orderBy: orderBy,
        orderDirection: orderDirection,
      };
    }
    return await this.TransactionsService.FindAll(page, limit, filter, order);
  }

  @Get(':id')
  async FindOne(@Param('id') id: string) {
    return await this.TransactionsService.FindOne(id);
  }

  @Put(':id')
  async Update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Request() req,
  ) {
    return this.TransactionsService.Update(updateTransactionDto, id);
  }

  @Delete(':id')
  async Remove(@Param('id') id: string) {
    return this.TransactionsService.Remove(id);
  }
}
