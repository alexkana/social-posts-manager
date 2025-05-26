import type { Response, NextFunction, Request, RequestHandler } from 'express';
import type { JWTPayload, AuthenticatedRequest} from '../types/index';
import jwt from 'jsonwebtoken';
import { config } from '../config/variables';

const auth: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  // Get token from cookie instead of header
  const token: string | undefined = req.cookies?.token;

  // Check if no token
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as { user: JWTPayload };
    // Add user to request object
    (req as AuthenticatedRequest).user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}; 

export default auth; 