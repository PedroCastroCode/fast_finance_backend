import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { Body, Controller, Post } from '@nestjs/common';

class LoginBody {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}
class SwaggerLoginBody {
  @ApiProperty()
  Token: string;

  @ApiProperty()
  RefreshToken: string;
}

@ApiTags('Authentication')
@Controller('login')
export class LoginController {
  constructor(private ls: LoginService) {}
  @ApiResponse({
    status: 201,
    type: SwaggerLoginBody,
  })
  @Post()
  async login(@Body() loginBody: LoginBody) {
    return await this.ls.login(loginBody.login, loginBody.password);
  }
  // @ApiResponse({
  //   status: 201,
  //   description: 'Criado com sucesso',
  //   type: SwaggerRefreshBody,
  // })
  // @Post('refresh')
  // async refreshToken(@Body() body) {
  //   const tokenized = await this.ls.refreshToken(body.refreshToken);
  //   return tokenized;
  // }
}
