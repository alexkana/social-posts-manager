import type { Request, Response, NextFunction } from "express";

import type {
  RegisterRequest,
  LoginRequest,
  AuthenticatedRequest,
  ServiceResponse,
} from "../types/index";
import { AuthService } from "../services/authService";
import { config } from "../config/variables";

// Register a new user
export const register = async (
  req: RegisterRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = await AuthService.register(req.body);

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Login a user
export const login = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = await AuthService.login(req.body);

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Get current user
export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await AuthService.getCurrentUser(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Logout a user
export const logout = (req: Request, res: Response): void => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });

  res.json({ message: "Logged out successfully" });
};
