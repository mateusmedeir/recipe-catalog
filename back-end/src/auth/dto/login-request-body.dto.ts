import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginRequestBodyDto {
  @ApiProperty({
    example: 'example@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Length(6, 256)
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @ApiProperty({
    example: '12345678Abc',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 24)
  readonly password: string;
}
