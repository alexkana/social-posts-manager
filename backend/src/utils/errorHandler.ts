import { config } from "../config/variables";

export class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: any, req: any, res: any, next: any): void => {
  let { statusCode = 500, message } = err;

  if (config.NODE_ENV === "production") {
    // Don't leak error details in production
    if (!err.isOperational) {
      statusCode = 500;
      message = "Something went wrong";
    }
  }

  res.status(statusCode).json({
    status: err.status || "error",
    message,
    ...(config.NODE_ENV === "development" && { stack: err.stack }),
  });
};
