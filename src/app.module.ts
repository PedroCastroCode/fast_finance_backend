import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from '@db/conn/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { AuthenticationModule } from './app/authentication/authentication.module';
import { GlobalModule } from './global.module';
import { TransactionsModule } from '@app/transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    TransactionsModule,
    AuthenticationModule,
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
