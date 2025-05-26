// Service Response Types
export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

// Error Response
export interface ErrorResponse {
  status: string;
  message: string;
  error?: any;
  stack?: string;
}

// Database Config
export interface DatabaseConfig {
  mongoURI: string;
}

// Environment Variables
export interface EnvVariables {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
}

// Pagination
export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Generic query filters
export interface QueryFilter {
  [key: string]: any;
}

// Generic sort options
export interface SortOptions {
  [key: string]: 1 | -1;
}
