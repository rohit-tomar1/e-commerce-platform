import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password (min 8 chars)' })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Rohit', description: 'User first name' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Tomar', description: 'User last name' })
  @IsNotEmpty()
  lastName: string;
}