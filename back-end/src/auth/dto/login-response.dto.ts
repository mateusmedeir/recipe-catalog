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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string;

  @Expose()
  @ApiProperty({
    example: '1d',
  })
  @IsString()
  @IsNotEmpty()
  readonly expiresIn: string;

  @Expose()
  @ApiProperty({
    type: UserResponseDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => UserResponseDto)
  @IsNotEmpty()
  readonly user: UserResponseDto;
}
