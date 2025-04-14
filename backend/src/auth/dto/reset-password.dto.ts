import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'xxxxxxxx', description: 'Token' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password (min 8 chars)',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
