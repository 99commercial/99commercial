import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_REFRESH_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } from '../config/env.config.js';

export class TokenService {
  /**
   * Generate access token
   * @param {string} userId - User ID
   * @param {Object} payload - Additional payload data
   * @returns {string} Access token
   */
  static generateAccessToken(userId, payload = {}) {
    try {
      const tokenPayload = {
        id: userId,
        type: 'access',
        ...payload
      };

      return jwt.sign(tokenPayload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        issuer: '99commercial-api',
        audience: '99commercial-client'
      });
    } catch (error) {
      throw new Error('Failed to generate access token');
    }
  }

  /**
   * Generate refresh token
   * @param {string} userId - User ID
   * @param {Object} payload - Additional payload data
   * @returns {string} Refresh token
   */
  static generateRefreshToken(userId, payload = {}) {
    try {
      const tokenPayload = {
        id: userId,
        type: 'refresh',
        ...payload
      };

      return jwt.sign(tokenPayload, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRES_IN,
        issuer: '99commercial-api',
        audience: '99commercial-client'
      });
    } catch (error) {
      throw new Error('Failed to generate refresh token');
    }
  }

  /**
   * Verify access token
   * @param {string} accessToken - Access token to verify
   * @returns {Object} Decoded token payload
   */
  static verifyAccessToken(accessToken) {
    try {
      const decoded = jwt.verify(accessToken, JWT_SECRET, {
        issuer: '99commercial-api',
        audience: '99commercial-client'
      });

      // Verify that this is actually an access token
      if (decoded.type !== 'access') {
        throw new Error('Invalid token type');
      }

      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Access token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid access token');
      } else {
        throw new Error('Failed to verify access token');
      }
    }
  }

  /**
   * Verify refresh token
   * @param {string} refreshToken - Refresh token to verify
   * @returns {Object} Decoded token payload
   */
  static verifyRefreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET, {
        issuer: '99commercial-api',
        audience: '99commercial-client'
      });

      // Verify that this is actually a refresh token
      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      console.log(decoded)

      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Refresh token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid refresh token');
      } else {
        throw new Error('Failed to verify refresh token');
      }
    }
  }
}
