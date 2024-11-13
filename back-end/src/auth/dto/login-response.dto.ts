import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class LoginResponseDto {
  @Expose()
  @ApiProperty({
    description: 'Access token',
  })
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string;

  @Expose()
  @ApiProperty({
    description: 'Token expiration time',
    example: '1d',
  })
  @IsString()
  @IsNotEmpty()
  readonly expiresIn: string;

  @Expose()
  @ApiProperty({
    description: 'User',
    type: UserResponseDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => UserResponseDto)
  @IsNotEmpty()
  readonly user: UserResponseDto;
}
