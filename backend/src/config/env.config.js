import dotenv from 'dotenv';

dotenv.config();

// DATABASE CONNECTION VARIABLES
export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;

// JWT CONFIGURATION
export const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-in-production';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
export const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

// FRONTEND URL
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// EMAIL CONFIGURATION
export const EMAIL_USER = process.env.EMAIL || 'your-email@gmail.com';
export const EMAIL_PASS = process.env.EMAIL_PASS || 'your-password';

// CLOUDINARY CONFIGURATION
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;