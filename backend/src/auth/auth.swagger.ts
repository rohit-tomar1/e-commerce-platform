// src/auth/auth.swagger.ts
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  ResetPasswordDto,
} from './dto';

export const ApiAuth = () => ApiTags('Authentication');

// Register
export const ApiRegister = () => (
  ApiOperation({ summary: 'Register a new user' }),
  ApiResponse({ status: 201, description: 'User registered successfully' }),
  ApiResponse({ status: 400, description: 'Bad request' }),
  ApiBody({ type: RegisterDto })
);

// Login
export const ApiLogin = () => (
  ApiOperation({ summary: 'User login' }),
  ApiResponse({ status: 200, description: 'Login successful' }),
  ApiResponse({ status: 401, description: 'Invalid credentials' }),
  ApiBody({ type: LoginDto })
);

// Refresh Token
export const ApiRefreshToken = () => (
  ApiOperation({ summary: 'Refresh access token' }),
  ApiResponse({ status: 200, description: 'Token refreshed successfully' }),
  ApiResponse({ status: 401, description: 'Invalid refresh token' }),
  ApiBearerAuth('JWT-auth'),
  ApiBody({ type: RefreshTokenDto })
);

// Forgot Password
export const ApiForgotPassword = () => (
  ApiOperation({ summary: 'Request password reset using email' }),
  ApiResponse({
    status: 200,
    description: 'If account exists, reset email sent',
  }),
  ApiBody({ schema: { properties: { email: { type: 'string' } } } })
);

// Reset Password
export const ApiResetPassword = () => (
  ApiOperation({ summary: 'Reset password with token' }),
  ApiResponse({ status: 200, description: 'Password reset successfully' }),
  ApiResponse({ status: 400, description: 'Invalid or expired token' }),
  ApiBody({ type: ResetPasswordDto })
);

// Verify Email
export const ApiVerifyEmail = () => (
  ApiOperation({ summary: 'Verify email with token' }),
  ApiResponse({ status: 200, description: 'Email verified successfully' }),
  ApiResponse({ status: 400, description: 'Invalid or expired token' }),
  ApiBody({ schema: { properties: { token: { type: 'string' } } } })
);

// Resend Verification
export const ApiResendVerification = () => (
  ApiOperation({ summary: 'Resend verification email' }),
  ApiResponse({
    status: 200,
    description: 'If account exists, verification email sent',
  }),
  ApiBody({ schema: { properties: { email: { type: 'string' } } } })
);
