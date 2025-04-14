import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    await this.usersService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user || !(await user.validatePassword(loginDto.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateTokens(user);
    const u = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.firstName + (user.lastName ? ' ' + user.lastName : ''),
      isEmailVerified: user.isEmailVerified,
    };
    return { token, user: u };
  }

  private generateTokens(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(refreshTokenDto.refreshToken);
      const user = await this.usersService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(user);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async initiatePasswordReset(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return;

    const token = crypto.randomBytes(32).toString('hex');
    const expireAt = new Date(Date.now() + 3600000);

    await this.usersService.setPasswordResetToken(user.id, token, expireAt);
    await this.emailService.sendPasswordResetEmail(user.email, token);
  }

  async resetPassword(token: string, newPassword: string) {
    await this.usersService.resetPassword(token, newPassword);
  }

  async sendVerificationEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return; // do not send anything
    }

    if (user.isEmailVerified) return;

    const token = this.jwtService.sign({ sub: user.id }, { expiresIn: '1d' });
    await this.emailService.sendVerificationEmail(user.email, token);
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Invalid verification token');
      }
      await this.usersService.markEmailAsVerified(user.id);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
