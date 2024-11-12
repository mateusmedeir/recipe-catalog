import { ApiProperty } from '@nestjs/swagger';
import { Match } from 'src/common/decorators/match.decorator';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterRequestBodyDto {
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 24)
  @Match('password')
  readonly confirmPassword: string;
}
