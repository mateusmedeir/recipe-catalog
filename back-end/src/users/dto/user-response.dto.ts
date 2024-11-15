import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @Expose()
  @ApiProperty({
    description: 'User ID',
  })
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @Expose()
  @ApiProperty({
    example: 'email@example.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Length(3, 320)
  readonly email: string;
}
