import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { plainToInstance } from 'class-transformer';
import { LocalGuard } from 'src/common/guards/local.guard';
import { LoginRequestBodyDto } from './dto/login-request-body.dto';
import { RegisterRequestBodyDto } from './dto/register-request-body.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login de usuário' })
  @ApiResponse({
    status: 200,
    description: 'operação bem-sucedida',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Email ou senha inválidos',
  })
  @UseGuards(LocalGuard)
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() body: LoginRequestBodyDto,
  ) {
    return plainToInstance(
      UserResponseDto,
      this.authService.login(response, body),
    );
  }

  @Post('/register')
  @ApiOperation({ summary: 'Cadastro de usuário' })
  @ApiCreatedResponse({
    description: 'Usuário cadastrado com sucesso',
    type: UserResponseDto,
  })
  async register(
    @Res({ passthrough: true }) response: Response,
    @Body() body: RegisterRequestBodyDto,
  ) {
    return plainToInstance(
      UserResponseDto,
      this.authService.register(response, body),
    );
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Logout de usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário deslogado com sucesso',
  })
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
