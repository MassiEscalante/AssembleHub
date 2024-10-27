import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// **Middleware to authenticate JWT tokens**
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // **Get token from Authorization header**
  const token = req.headers.authorization?.split(' ')[1];
  
  // **Return error if token is missing**
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    // **Verify token and attach user info to request**
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.user = decoded as { username: string };
    next();
  } catch (error) {
    // **Return error if token is invalid or expired**
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
