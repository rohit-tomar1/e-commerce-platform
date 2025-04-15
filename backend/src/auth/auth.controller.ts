import { Controller, Post, Body } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
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
import { Public } from 'src/common/decorators/public.decorator';

@ApiAuth()
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Public()
  @Post('register')
  @ApiRegister()
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiLogin()
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  @ApiRefreshToken()
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Public()
  @Post('forgot-password')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiForgotPassword()
  async forgotPassword(@Body('email') email: string) {
    await this.authService.initiatePasswordReset(email);
    return { message: 'If an account exists, a reset email has been sent' };
  }

  @Public()
  @Post('reset-password')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
    @ApiResetPassword()
  async resetPassword(@Body() data: ResetPasswordDto) {
    await this.authService.resetPassword(data);
    return { message: 'Password reset successfully' };
  }

  @Public()
  @Post('verify-email')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
    @ApiVerifyEmail()
  async verifyEmail(@Body('token') token: string) {
    await this.authService.verifyEmail(token);
    return { message: 'Email verified successfully' };
  }

  @Public()
  @Post('resend-verification')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
    @ApiResendVerification()
  async resendVerification(@Body('email') email: string) {
    await this.authService.sendVerificationEmail(email);
    return {
      message: 'If an account exists, a verification email has been sent',
    };
  }
}
