import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginController } from '@app/authentication/login/login.controller';
import { UsersModule } from '@app/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from '@app/authentication/login/login.service';
import { JwtStrategyService } from '@app/authentication/jwt_strategy/jwt-strategy.service';
import { RefreshStrategyService } from '@app/authentication/jwt_strategy/refreshToken-strategy.service';
import { authenticationProvider } from '../../providers/authentication.provider';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  controllers: [LoginController],
  providers: [
    AuthenticationService,
    LoginService,
    JwtStrategyService,
    RefreshStrategyService,
    ...Object.values(authenticationProvider),
  ],
})
export class AuthenticationModule {}
