import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsObject } from 'class-validator';
import { RecipeResponseDto } from './recipe-response.dto';

export class RecipesResponseDto {
  @Expose()
  @ApiProperty()
  @IsArray()
  @IsObject({ each: true })
  @IsNotEmpty({ each: true })
  @Type(() => RecipeResponseDto)
  readonly data: RecipeResponseDto[];

  @Expose()
  @ApiProperty({
    example: 10,
  })
  @IsInt()
  @IsNotEmpty()
  readonly total: number;
}
