import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

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

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly instructions: string[];
}
