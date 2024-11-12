import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedError } from 'src/common/exceptions';
import { JwtPayload } from 'src/common/strategies/jwt.strategy';
import { LoginRequestBodyDto } from './dto/login-request-body.dto';
import { RegisterRequestBodyDto } from './dto/register-request-body.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  async login(body: LoginRequestBodyDto) {
    const token = this.createToken(body.email);

    const user = await this.usersService.findUserByEmail(body.email);

    return {
      ...token,
      data: user,
    };
  }

  async register(body: RegisterRequestBodyDto) {
    const userExists = await this.usersService.findUserByEmail(body.email);
    if (userExists) throw new UnauthorizedError('Email já cadastrado');

    const user = await this.usersService.createUser(body);
    const token = this.createToken(body.email);

    return {
      ...token,
      data: user,
    };
  }

  private createToken(email: string) {
    const accessToken = this.jwtService.sign({ email });

    return {
      expiresIn: this.authConfiguration.JWT_EXPIRES_TIME,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload) {
    const user = await this.usersService.findUserByEmail(payload.email, true);
    if (!user) throw new UnauthorizedError('Token inválido');

    return user;
  }
}
