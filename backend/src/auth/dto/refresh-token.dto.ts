import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: 'sdsdsdsds', description: 'Refresh Token' })
  @IsNotEmpty()
  refreshToken: string;
}
