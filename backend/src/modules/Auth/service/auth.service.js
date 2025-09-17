import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../../../models/user.model.js';
import { emailService } from '../../../emails/auth.email.js';
import { TokenService } from '../../../services/token.service.js';
import { MESSAGES } from '../../../config/constant.config.js';
import bcrypt from 'bcryptjs';

export class AuthService {
  constructor() {
    this.emailService = new emailService();
  }

  /**
   * Register a new agent
   */
  async register(userData) {
    const {
      role,
      firstName,
      lastName,
      email,
      phone,
      password,
    } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists with this email');
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = new User({
      role,
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      is_active: false // Will be activated after email verification
    });

    await user.save();

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    // Send verification email
    await this.emailService.sendVerificationEmail(email, verificationToken, firstName, lastName);

    return {
      status: true,
      message: MESSAGES.REGISTER_SUCCESS,
      user: {
        email: user.email,
        role: user.role,
      },
    };
  }

  /**
   * Login agent
   */
  async login(email, password) {
    // Find user with business details
    const user = await User.findOne({ email })
      .select('+password');

    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    // Check if account is active
    if (!user.is_active) {
      const error = new Error('Account is not active. Please verify your email first.');
      error.statusCode = 401;
      throw error;
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    // Generate tokens using TokenService
    const accessData = TokenService.generateAccessToken(user._id, {
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    });
    // Generate tokens using TokenService
    const refreshData = TokenService.generateRefreshToken(user._id, {
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    });

    // You might want to store this in a sessions collection
    // For now, we'll just return the tokens

    return {
      status: true,
      message: MESSAGES.LOGIN_SUCCESS,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      },
      accessData,
      refreshData
    };
  }

  /**
   * Forgot password
   */
  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send reset email
    await this.emailService.sendPasswordResetEmail(email, resetToken, user.firstName, user.lastName);

    return {
      status: true,
      message: MESSAGES.FORGOT_PASSWORD_SUCCESS,
    };
  }

  /**
   * Reset password
   */
  async resetPassword(token, newPassword) {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      const error = new Error('Invalid or expired reset token');
      error.statusCode = 400;
      throw error;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return {
      status: true,
      message: MESSAGES.RESET_PASSWORD_SUCCESS,
    };
  }

  /**
   * Verify email
   */
  async verifyEmail(token) {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      const error = new Error('Invalid or expired verification token');
      error.statusCode = 400;
      throw error;
    }

    user.is_active = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    // Send welcome email after successful verification
    await this.emailService.sendWelcomeEmail(user.email, user.firstName, user.lastName);

    return {
      status: true,
      message: MESSAGES.VERIFY_EMAIL_SUCCESS,
    };
  }

  /**
   * Resend verification email
   */
  async resendVerification(email) {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    if (user.is_active) {
      const error = new Error('Email already verified');
      error.statusCode = 400;
      throw error;
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    // Send verification email
    await this.emailService.sendVerificationEmail(email, verificationToken, user.firstName, user.lastName);

    return {
      status: true,
      message: MESSAGES.RESEND_VERIFICATION_SUCCESS,
    };
  }

  /**
   * Update password
   */
  async updatePassword(_id,currentPassword, newPassword) {
    const user = await User.findById(_id).select('+password');
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      const error = new Error('Current password is incorrect');
      error.statusCode = 400;
      throw error;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    return {
      status: true,
      message: MESSAGES.UPDATE_PASSWORD_SUCCESS,
    };
  }

  /**
   * Logout agent
   */
  async logout(token) {
    // In a real implementation, you would invalidate the token
    // by adding it to a blacklist or removing it from active sessions
    // For now, we'll just return success
    return {
      status: true,
      message: MESSAGES.LOGOUT_SUCCESS,
    };
  }
  /**
   * Refresh token
   */
  async refreshToken(refreshToken) {
    try {
      // Verify refresh token
      const decoded = TokenService.verifyRefreshToken(refreshToken);
      
      // Find user
      const user = await User.findById(decoded.id).select('+password');
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }

      // Check if user is still active
      if (!user.is_active) {
        const error = new Error('Account is not active');
        error.statusCode = 401;
        throw error;
      }

        // Generate new token pair
        const accessData = TokenService.generateAccessToken(user._id, {
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName
        });

      return {
        status: true,
        message: MESSAGES.REFRESH_TOKEN_SUCCESS,
        accessData
      };
    } catch (error) {
      if (error.statusCode) {
        throw error;
      }
      const refreshError = new Error('Invalid refresh token');
      refreshError.statusCode = 401;
      throw refreshError;
    }
  }

  /**
   * Generate access token (legacy method for backward compatibility)
   * @param {string} userId - User ID
   * @param {Object} payload - Additional payload data
   * @returns {string} Access token
   */
  generateAccessToken(userId, payload = {}) {
    return TokenService.generateAccessToken(userId, payload);
  }

  /**
   * Generate refresh token (legacy method for backward compatibility)
   * @param {string} userId - User ID
   * @param {Object} payload - Additional payload data
   * @returns {string} Refresh token
   */
  generateRefreshToken(userId, payload = {}) {
    return TokenService.generateRefreshToken(userId, payload);
  }
}