import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RecipeDifficulty } from '@prisma/client';

export class CreateRecipeDto {
  @ApiProperty({
    example: 'Panquecas',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: [
      '1 xícara de farinha de trigo',
      '1 xícara de leite',
      '1 ovo',
      '1 colher de sopa de açúcar',
      '1 pitada de sal',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly ingredients: string[];

  @ApiProperty({
    example: [
      'Misture a farinha, o leite, o ovo, o açúcar e o sal em uma tigela',
      'Aqueça uma frigideira antiaderente em fogo médio',
      'Despeje uma concha de massa na frigideira e espalhe',
      'Quando a massa começar a soltar as bordas, vire a panqueca',
      'Deixe dourar do outro lado e retire da frigideira',
      'Repita o processo com o restante da massa',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly instructions: string[];

  @ApiProperty({
    example: 30,
  })
  @IsInt()
  @Min(1)
  @Max(180)
  @IsNotEmpty()
  readonly preparationTime: number;

  @ApiProperty({
    example: RecipeDifficulty.EASY,
  })
  @IsEnum(RecipeDifficulty)
  @IsNotEmpty()
  readonly difficulty: RecipeDifficulty;
}
