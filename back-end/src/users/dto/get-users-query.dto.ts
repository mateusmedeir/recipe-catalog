import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class GetUsersQueryDto {
  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  readonly total: number;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  readonly page: number;
}
