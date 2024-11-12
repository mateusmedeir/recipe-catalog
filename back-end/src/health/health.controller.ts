import { HealthService } from './health.service';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Health check' })
  @ApiCreatedResponse({ description: 'Health check' })
  async getHealth() {
    return 'OK';
  }

  @Get('/info')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get health status' })
  @ApiCreatedResponse({ description: 'Get health status' })
  async getHealthStatus() {
    return await this.healthService.getHealthStatus();
  }
}
