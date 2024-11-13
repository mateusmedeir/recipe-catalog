import { HealthService } from './health.service';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retorna o status da aplicação' })
  @ApiResponse({ description: 'Aplicação está online' })
  async getHealth() {
    return 'OK';
  }

  @Get('/info')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retorna informações sobre a aplicação' })
  @ApiResponse({ status: 200, description: 'operação bem-sucedida' })
  async getHealthStatus() {
    return await this.healthService.getHealthStatus();
  }
}
