import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import { UpdateUserDto, ChangePasswordDto } from './dto';
import * as moment from 'moment';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async update(id: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await user.validatePassword(
      changePasswordDto.currentPassword,
    );
    if (!isValid) {
      throw new NotFoundException('Current password is incorrect');
    }

    user.password = changePasswordDto.newPassword;
    await user.hashPassword();
    await this.usersRepository.save(user);
  }

  async createPasswordResetToken(email: string): Promise<string> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate random token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = moment().add(12, 'hours').toDate();

    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.passwordResetExpires = resetTokenExpiry;
    console.log('user', user);
    await this.usersRepository.save(user);
    return resetToken;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const resetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await this.usersRepository.findOne({
      where: {
        passwordResetToken: resetToken,
        passwordResetExpires: MoreThan(new Date()),
      },
    });

    if (!user) {
      throw new NotFoundException('Token is invalid or has expired');
    }

    user.password = newPassword;
    user.passwordResetToken = '';
    // user.passwordResetExpires = '';

    await user.hashPassword();
    await this.usersRepository.save(user);
  }

  async verifyEmail(token: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new NotFoundException('Invalid verification token');
    }

    user.isEmailVerified = true;
    user.verificationToken = '';

    await this.usersRepository.save(user);
  }
  async setPasswordResetToken(userId: string, token: string, expiresAt: Date) {
    await this.usersRepository.update(userId, {
      passwordResetToken: token,
      passwordResetExpires: expiresAt,
    });
  }

  async findByResetToken(token: string) {
    return this.usersRepository.findOne({
      where: { passwordResetToken: token },
    });
  }

  async clearPasswordResetToken(userId: string) {
    await this.usersRepository.update(userId, {
      passwordResetToken: '',
      passwordResetExpires: '',
    });
  }

  async findByVerificationToken(token: string) {
    return this.usersRepository.findOne({
      where: { verificationToken: token },
    });
  }

  async markEmailAsVerified(userId: string) {
    await this.usersRepository.update(userId, {
      isEmailVerified: true,
      verificationToken: '',
    });
  }
}
