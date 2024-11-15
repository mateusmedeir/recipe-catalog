import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalGuard } from 'src/common/guards/local.guard';
import { LoginRequestBodyDto } from './dto/login-request-body.dto';
import { RegisterRequestBodyDto } from './dto/register-request-body.dto';
import { plainToInstance } from 'class-transformer';
import { LoginResponseDto } from './dto/login-response.dto';

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
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Email ou senha inválidos',
  })
  @UseGuards(LocalGuard)
  async login(@Body() body: LoginRequestBodyDto) {
    return plainToInstance(LoginResponseDto, this.authService.login(body));
  }

  @Post('/register')
  @ApiOperation({ summary: 'Cadastro de usuário' })
  @ApiCreatedResponse({
    description: 'Usuário cadastrado com sucesso',
    type: LoginResponseDto,
  })
  async register(@Body() body: RegisterRequestBodyDto) {
    return plainToInstance(LoginResponseDto, this.authService.register(body));
  }
}
