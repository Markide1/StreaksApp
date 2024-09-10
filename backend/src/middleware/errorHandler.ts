import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(`${err.name}: ${err.message}`, { 
    method: req.method,
    url: req.url,
    body: req.body,
    stack: err.stack
  });

  res.status(500).json({
    error: {
      message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message,
    }
  });
}