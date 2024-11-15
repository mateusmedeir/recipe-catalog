import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetRecipesQueryDto {
  @ApiProperty({})
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  readonly page: number;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  readonly total: number;
}
