import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Correo electrónico del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'mypassword123', description: 'Contraseña segura (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'STUDENT', enum: ['ADMIN', 'STUDENT'], description: 'Rol del usuario' })
  @IsEnum(['ADMIN', 'STUDENT'])
  role: 'ADMIN' | 'STUDENT';
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'mypassword123' })
  @IsString()
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: '0f53a8d1-3d1b-4e6f-9d3b-1f8a03d2f6b7' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'STUDENT' })
  role: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;
}
