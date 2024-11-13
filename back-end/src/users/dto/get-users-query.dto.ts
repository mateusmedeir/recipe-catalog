import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class GetUsersQueryDto {
  @ApiProperty({
    description: 'Number of users per page',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  readonly total: number;

  @ApiProperty({
    description: 'Page number',
    example: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  readonly page: number;
}
