import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Database configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/social-posts-manager',
  
  // Server configuration
  PORT: process.env.PORT || 3001,
  
  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here ',

  // Node environment
  NODE_ENV: process.env.NODE_ENV || 'development',
};