import { Controller, Post, Body, Query, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto';
import {
  ApiAuth,
  ApiRegister,
  ApiLogin,
  ApiRefreshToken,
  ApiForgotPassword,
  ApiResetPassword,
  ApiVerifyEmail,
  ApiResendVerification,
} from './auth.swagger';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiAuth()
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiRegister()
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiLogin()
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @ApiRefreshToken()
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('forgot-password')
  @ApiForgotPassword()
  async forgotPassword(@Body('email') email: string) {
    await this.authService.initiatePasswordReset(email);
    return { message: 'If an account exists, a reset email has been sent' };
  }

  @Post('reset-password')
  @ApiResetPassword()
  async resetPassword(@Body() data: ResetPasswordDto) {
    await this.authService.resetPassword(data);
    return { message: 'Password reset successfully' };
  }

  @Post('verify-email')
  @ApiVerifyEmail()
  async verifyEmail(@Body('token') token: string) {
    await this.authService.verifyEmail(token);
    return { message: 'Email verified successfully' };
  }

  @Post('resend-verification')
  @ApiResendVerification()
  async resendVerification(@Body('email') email: string) {
    await this.authService.sendVerificationEmail(email);
    return {
      message: 'If an account exists, a verification email has been sent',
    };
  }
}
