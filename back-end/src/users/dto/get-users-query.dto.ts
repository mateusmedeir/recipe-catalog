import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetUsersQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  readonly total: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  readonly page: string;
}
