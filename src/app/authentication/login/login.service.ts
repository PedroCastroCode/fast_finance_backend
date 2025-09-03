import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import HttpError from '@domain/utils/errors/http-errors';
import GetUserByUserName from '@use-cases/users/get-user-by-username';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    private getUserByUserName: GetUserByUserName,
  ) {}

  async login(username: string, password: string) {
    const user = await this.getUserByUserName.Execute(username);
    if (!user) new HttpError('Invalid username or password').BadRequest();
    if (bcrypt.compareSync(password, user.password)) {
      const payload = {
        sub: user.id,
        username: user.username,
      };

      const rt = this.jwtService.sign(
        { rsd: user.id },
        { secret: process.env.JWT_SECRET_REFRESH, expiresIn: '30d' },
      );

      const jwt = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_ACCESS,
        expiresIn: '30d',
      });

      return { Token: 'Bearer ' + jwt, RefreshToken: rt };
    } else new HttpError('Invalid username or password').BadRequest();
  }
}
