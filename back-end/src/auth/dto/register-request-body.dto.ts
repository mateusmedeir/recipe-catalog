import { ApiProperty } from '@nestjs/swagger';
import { Match } from 'src/common/decorators/match.decorator';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterRequestBodyDto {
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

  @ApiProperty({
    example: '12345678Abc',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 24)
  @Match('password')
  readonly confirmPassword: string;
}
