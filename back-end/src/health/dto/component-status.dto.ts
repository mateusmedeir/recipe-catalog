import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum HealthStatus {
  HEALTHLY = 'healthly',
  UNHEALTHLY = 'unhealthly',
}

export enum ConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

export class ComponentStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(HealthStatus)
  status: HealthStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ConnectionStatus)
  connectionStatus: ConnectionStatus;
}
