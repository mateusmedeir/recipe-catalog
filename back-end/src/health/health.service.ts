import {
  HealthStatus,
  ConnectionStatus,
  ComponentStatusDto,
} from './dto/component-status.dto';
import { PrismaService } from 'nestjs-prisma';
import { name, version } from '../../package.json';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  private async getSqlDatabaseStatus(): Promise<ComponentStatusDto> {
    try {
      const connectionStatus = await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: connectionStatus
          ? HealthStatus.HEALTHLY
          : HealthStatus.UNHEALTHLY,
        connectionStatus: connectionStatus
          ? ConnectionStatus.CONNECTED
          : ConnectionStatus.DISCONNECTED,
      };
    } catch (error) {
      return {
        status: HealthStatus.UNHEALTHLY,
        connectionStatus: ConnectionStatus.DISCONNECTED,
      };
    }
  }

  private getApplicationStatus(
    componentStatusList: ComponentStatusDto[],
  ): HealthStatus {
    return componentStatusList.every(
      ({ status }) => status === HealthStatus.HEALTHLY,
    )
      ? HealthStatus.HEALTHLY
      : HealthStatus.UNHEALTHLY;
  }

  public async getHealthStatus() {
    const sqlDatabaseStatus = await this.getSqlDatabaseStatus();
    const status = this.getApplicationStatus([sqlDatabaseStatus]);

    const healthStatus = {
      name,
      status,
      version,
      uptime: `${process.uptime()} secs`,
      database: sqlDatabaseStatus,
    };

    if (status === HealthStatus.UNHEALTHLY)
      throw new InternalServerErrorException(healthStatus);
    return healthStatus;
  }
}
