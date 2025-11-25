import { Controller, Post, Body, HttpCode, Get, UseGuards, Req, Inject } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../../auth/auth.service';
import { IUserRepository } from 'src/domain/users/user.repository.port';
import { RegisterUseCase } from '../../application/use-cases/register.usecase';
import { LoginUseCase } from '../../application/use-cases/login.usecase';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RegisterDto, LoginDto, AuthResponseDto } from '../../presentation/users/auth.dto';
import { Prisma } from '@prisma/client';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  private registerUC: RegisterUseCase;
  private loginUC: LoginUseCase;

  constructor(
    private authService: AuthService,
    @Inject('IUserRepository') private userRepo: IUserRepository,
  ) {
    this.registerUC = new RegisterUseCase(this.userRepo);
    this.loginUC = new LoginUseCase(this.userRepo);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  async register(@Body() body: RegisterDto) {
    const user = await this.registerUC.execute(body.email, body.password, body.role);
    const accessToken = await this.authService.generateAccessToken(user.id, user.email, user.role);
    const refreshToken = await this.authService.generateRefreshToken(user.id, user.email, user.role);
    return { id: user.id, email: user.email, role: user.role, accessToken, refreshToken };
  }

  @HttpCode(200)
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener un token JWT' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async login(@Body() body: LoginDto) {
    const user = await this.loginUC.execute(body.email, body.password);
    const accessToken = await this.authService.generateAccessToken(user.id, user.email, user.role);
    const refreshToken = await this.authService.generateRefreshToken(user.id, user.email, user.role);
    return { id: user.id, email: user.email, role: user.role, accessToken, refreshToken };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil de usuario', type: AuthResponseDto })
  getProfile(@Req() req: any) {
    return req.user;
  }
}