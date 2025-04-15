import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';
import * as crypto from 'crypto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserRole } from 'src/common/enums/user-role.enum';

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
    await this.sendVerificationEmail(registerDto.email);
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
      role: user.role || UserRole.CUSTOMER,
    };
    return { token, user: u };
  }

  private generateTokens(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role || UserRole.CUSTOMER,
    };

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
    // const user = await this.usersService.findByEmail(email);
    // if (!user) return;

    // const token = crypto.randomBytes(32).toString('hex');
    // const expireAt = new Date(Date.now() + 3600000);

    // await this.usersService.setPasswordResetToken(user.id, token, expireAt);
    const token = await this.usersService.createPasswordResetToken(email);
    await this.emailService.sendPasswordResetEmail(email, token);
  }

  async resetPassword(data: ResetPasswordDto) {
    await this.usersService.resetPassword(data.token, data.password);
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
