import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { RecipeDifficulty } from '@prisma/client';

export class GetRecipesQueryDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly search?: string;

  @ApiPropertyOptional()
  @IsEnum(RecipeDifficulty)
  @IsOptional()
  readonly difficulty?: RecipeDifficulty;

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
  readonly per_page: number;
}
