import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
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
  ) {}

  async login(response: Response, body: LoginRequestBodyDto) {
    const findUser = await this.usersService.findUserByEmail(body.email);
    if (!findUser) throw new UnauthorizedError('Usuário não encontrado');

    const user = await this.usersService.getUser(findUser.id);

    await this.setToken(response, body.email);

    return user;
  }

  async register(response: Response, body: RegisterRequestBodyDto) {
    const userExists = await this.usersService.findUserByEmail(body.email);
    if (userExists) throw new UnauthorizedError('Email já cadastrado');

    const createdUser = await this.usersService.createUser(body);
    const user = await this.usersService.getUser(createdUser.id);

    await this.setToken(response, body.email);

    return user;
  }

  async logout(response: Response) {
    response.clearCookie('access_token');

    return true;
  }

  private async setToken(response: Response, email: string) {
    const today = new Date();

    const token = await this.jwtService.signAsync({ email });

    response.cookie('access_token', token, {
      httpOnly: true,
      expires: new Date(new Date().setDate(today.getDate() + 30)),
    });
  }

  async validateUser(payload: JwtPayload) {
    const user = this.usersService.findUserByEmail(payload.email, true);

    if (!user) throw new UnauthorizedError('Token inválido');

    return user;
  }
}
