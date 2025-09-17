import { AuthService } from '../service/auth.service.js';

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Register a new agent
   */
  register = async (req, res, next) => {
    try {
      const result = await this.authService.register(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Login agent
   */
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Forgot password
   */
  forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await this.authService.forgotPassword(email);
      
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Reset password
   */
  resetPassword = async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const result = await this.authService.resetPassword(token, newPassword);
      
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Verify email
   */
  verifyEmail = async (req, res, next) => {
    try {
      const { token } = req.body;
      const result = await this.authService.verifyEmail(token);
      
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Resend verification email
   */
  resendVerification = async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await this.authService.resendVerification(email);
      
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update password
   */
  updatePassword = async (req, res, next) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const _id = req.user._id;
      
      const result = await this.authService.updatePassword(_id, oldPassword, newPassword);
      
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Logout agent
   */
  logout = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const result = await this.authService.logout(token);
      
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Refresh token
   */
  refreshToken = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const result = await this.authService.refreshToken(refreshToken);
      
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
