import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UnauthorizedError } from 'src/common/exceptions';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { LoginRequestBodyDto } from 'src/auth/dto/login-request-body.dto';
import { RegisterRequestBodyDto } from 'src/auth/dto/register-request-body.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(id: string) {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) throw new UnauthorizedError('Usuário não encontrado');

    return user;
  }

  async getAllUsers(query: GetUsersQueryDto) {
    return this.prisma.user.findMany({
      skip: Number(query.total) * Number(query.page),
      take: Number(query.total),
      select: {
        id: true,
        email: true,
      },
    });
  }

  async findUserByEmail(email: string, pw = false) {
    if (!email) throw new UnauthorizedError('Email não informado');

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
    const createdUser = this.prisma.user.create({
      data: {
        email: body.email,
        password: hash,
      },
    });

    const copy = { ...createdUser };
    delete (await copy).password;
    return copy;
  }

  async verifyUser(body: LoginRequestBodyDto) {
    const user = await this.findUserByEmail(body.email, true);
    if (!user) throw new UnauthorizedError('Email ou senha inválidos');

    const validate = await bcrypt.compare(body.password, user.password);
    if (!validate) throw new UnauthorizedError('Email ou senha inválidos');

    const copy = { ...user };
    delete copy.password;
    return copy;
  }
}
