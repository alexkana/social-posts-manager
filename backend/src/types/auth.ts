import { Request, Response, NextFunction } from "express";

// Custom Request Interface with User
export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// JWT Payload
export interface JWTPayload {
  id: string;
  name: string;
  email: string;
}

// Express handler types for authenticated routes
export type AuthenticatedHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;
export type StandardHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;

// Login/Register request body types
export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

// Login/Register request types extending Express Request
export interface LoginRequest extends Request {
  body: LoginRequestBody;
}

export interface RegisterRequest extends Request {
  body: RegisterRequestBody;
}

// Auth response types
export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
}

// Additional auth request/response types
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
