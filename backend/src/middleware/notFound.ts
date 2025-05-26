import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorHandler';

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

export default notFound; 