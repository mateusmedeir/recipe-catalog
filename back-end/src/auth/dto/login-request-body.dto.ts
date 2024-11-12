import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginRequestBodyDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Length(6, 256)
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 24)
  readonly password: string;
}
