import jwt from "jsonwebtoken";

import UserRepository from "../repository/userRepository";
import { AppError } from "../utils/errorHandler";
import { config } from "../config/variables";
import type { IUser, RegisterData, LoginCredentials } from "../types/index";

// Create a singleton instance of the repository
const userRepository = new UserRepository();

/**
 * Authentication and user management service
 */
export const AuthService = {
  /**
   * Register a new user
   * @param userData User registration data
   * @returns JWT token
   */
  register: async (userData: RegisterData): Promise<string> => {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("User already exists with this email", 400);
    }

    // Create new user
    const user = await userRepository.create({
      name,
      email,
      password,
    });

    return AuthService.generateToken(user);
  },

  /**
   * Login a user
   * @param credentials User login credentials
   * @returns JWT token
   */
  login: async (credentials: LoginCredentials): Promise<string> => {
    const { email, password } = credentials;

    // Check if user exists
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    return AuthService.generateToken(user);
  },

  /**
   * Get current user data
   * @param userId User ID
   * @returns User data without password
   */
  getCurrentUser: async (userId: string): Promise<Partial<IUser>> => {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Remove password from the user object
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  },

  /**
   * Generate JWT token
   * @param user User object
   * @returns JWT token
   */
  generateToken: (user: IUser): Promise<string> => {
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        config.JWT_SECRET,
        { expiresIn: "7d" },
        (err: Error | null, token?: string) => {
          if (err) {
            reject(new AppError("Token generation failed", 500));
          } else {
            resolve(token!);
          }
        },
      );
    });
  },
};
