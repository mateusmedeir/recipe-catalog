import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from 'src/common/exceptions';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { LoginRequestBodyDto } from 'src/auth/dto/login-request-body.dto';
import { RegisterRequestBodyDto } from 'src/auth/dto/register-request-body.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(id: string) {
    const user = this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundError('Usuário não encontrado');

    return user;
  }

  async getAllUsers(query: GetUsersQueryDto) {
    return this.prisma.user.findMany({
      skip: (query.page - 1) * query.total,
      take: query.total,
    });
  }

  async findUserByEmail(email: string, pw = false) {
    if (!email) throw new BadRequestError('Email não informado');

    return this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: pw,
      },
    });
  }

  async createUser(body: RegisterRequestBodyDto) {
    const user = await this.findUserByEmail(body.email);
    if (user) throw new UnauthorizedError('Email já cadastrado');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);
    return this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hash,
      },
    });
  }

  async verifyUser(body: LoginRequestBodyDto) {
    const user = await this.findUserByEmail(body.email, true);
    if (!user) throw new UnauthorizedError('Email ou senha inválidos');

    const validate = await bcrypt.compare(body.password, user.password);
    if (!validate) throw new UnauthorizedError('Email ou senha inválidos');

    return this.getUser(user.id);
  }
}
