import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterObject } from '@domain/basic/irepository';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async Create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return await this.usersService.Create(createUserDto);
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
    return await this.usersService.FindAll(page, limit, filter, order);
  }

  @Get(':id')
  async FindOne(@Param('id') id: string) {
    return await this.usersService.FindOne(id);
  }

  @Put(':id')
  async Update(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
    @Request() req,
  ) {
    return this.usersService.Update(updateUserDto, id);
  }

  @Delete(':id')
  async Remove(@Param('id') id: string) {
    return this.usersService.Remove(id);
  }
}
