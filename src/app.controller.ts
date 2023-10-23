import { 
  Controller, 
  Get, 
  // HttpException, 
  // HttpStatus, 
  Logger, 
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AppService, } from './app.service';
import { Ip, } from './decorators/ip-decorator';
import { ConfigService, } from '@nestjs/config';
import { AuthGuard, } from '@nestjs/passport';
import { LocalAuthGuard, } from './auth/local-auth.guard';
import { AuthService, } from './auth/auth.service';
import { JwtAuthGuard, } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  private readonly logger = new Logger();

  @Get()
  getHello(@Ip() ip: string): string {
    // console.log(ip);
    // this.logger.log(ip);
    // eslint-disable-next-line no-console
    console.log(this.configService.get<string>('ENVIRONMENT'));

    return this.appService.getHello();
    // throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
  } 

  @Get('name/:name')
  getName(@Param('name') name: string): string {
    return `${name} hello`;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}
