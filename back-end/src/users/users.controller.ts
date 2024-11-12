import {
  UseGuards,
  Controller,
  Get,
  Req,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { GetUsersQueryDto } from './dto/get-users-query.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User' })
  @ApiCreatedResponse({ description: 'Get user data' })
  async getUser(@Req() req) {
    return this.usersService.getUser(req.user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Users' })
  @ApiCreatedResponse({ description: 'Get all users' })
  async getAllUsers(@Query() query: GetUsersQueryDto) {
    return this.usersService.getAllUsers(query);
  }
}
