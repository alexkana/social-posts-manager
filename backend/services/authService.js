const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/userRepository');
const { AppError } = require('../utils/errorHandler');
const variables = require('../config/variables');
// Create a singleton instance of the repository
const userRepository = new UserRepository();

/**
 * Authentication and user management service
 */
const AuthService = {
  /**
   * Register a new user
   * @param {Object} userData User registration data
   * @returns {Promise<string>} JWT token
   */
  register: async (userData) => {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    // Create new user
    const user = await userRepository.create({
      name,
      email,
      password
    });

    return AuthService.generateToken(user);
  },

  /**
   * Login a user
   * @param {Object} credentials User login credentials
   * @returns {Promise<string>} JWT token
   */
  login: async (credentials) => {
    const { email, password } = credentials;

    // Check if user exists
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid credentials', 400);
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 400);
    }

    return AuthService.generateToken(user);
  },

  /**
   * Get current user data
   * @param {string} userId User ID
   * @returns {Promise<Object>} User data without password
   */
  getCurrentUser: async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    // Remove password from the user object
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;
    
    return userWithoutPassword;
  },

  /**
   * Generate JWT token
   * @param {Object} user User object
   * @returns {Promise<string>} JWT token
   */
  generateToken: (user) => {
    const payload = {
      user: {
        id: user.id
      }
    };

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        variables.JWT_SECRET,
        { expiresIn: '7d' },
        (err, token) => {
          if (err) reject(new AppError('Error generating token', 500));
          resolve(token);
        }
      );
    });
  }
};

module.exports = AuthService; 