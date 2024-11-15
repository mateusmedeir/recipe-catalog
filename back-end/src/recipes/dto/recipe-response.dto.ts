import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

class RecipeIngredientResponseDto {
  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly amount: string;
}

export class RecipeResponseDto {
  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @Expose()
  @ApiProperty({
    example: 'Panquecas',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Expose()
  @ApiProperty({
    example: [
      {
        name: 'farinha',
        amount: '1 xícara',
      },
      {
        name: 'leite',
        amount: '1 xícara',
      },
      {
        name: 'ovo',
        amount: '1',
      },
    ],
  })
  @IsArray()
  @Type(() => RecipeIngredientResponseDto)
  @IsNotEmpty()
  readonly ingredients: RecipeIngredientResponseDto[];

  @Expose()
  @ApiProperty({
    example:
      '1. Misture a farinha com o leite. 2. Adicione o ovo. 3. Frite a massa.',
  })
  @IsString()
  @IsNotEmpty()
  readonly instructions: string;
}
