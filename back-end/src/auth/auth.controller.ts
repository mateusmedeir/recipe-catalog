import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from 'src/common/guards/local.guard';
import { LoginRequestBodyDto } from './dto/login-request-body.dto';
import { RegisterRequestBodyDto } from './dto/register-request-body.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ description: 'Login user', type: LoginRequestBodyDto })
  @UseGuards(LocalGuard)
  async login(@Body() body: LoginRequestBodyDto) {
    return this.authService.login(body);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register' })
  @ApiCreatedResponse({
    description: 'Register user',
    type: RegisterRequestBodyDto,
  })
  async register(@Body() body: RegisterRequestBodyDto) {
    return this.authService.register(body);
  }
}
