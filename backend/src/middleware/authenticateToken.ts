import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  // Add any other properties that are in your JWT payload
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  console.log('Entered authMiddleware');

  // List of routes that don't require authentication
  const publicRoutes = ['/api/auth/signup', '/api/auth/login', '/api/auth/reset-password'];

  // Check if the current route is in the public routes list
  if (publicRoutes.some(route => req.path.startsWith(route))) {
    return next();
  }

  const authHeader = req.header('Authorization');
  console.log('Auth Header:', authHeader);

  if (!authHeader) {
    console.log('No Authorization header provided');
    return res.status(401).json({ error: 'Access denied. No Authorization header provided.' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    console.log('Invalid Authorization header format');
    return res.status(401).json({ error: 'Access denied. Invalid Authorization header format.' });
  }

  console.log('Token:', token);

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not set');
    return res.status(500).json({ error: 'Internal server error.' });
  }

  try {
    // Verify token and cast it to JwtPayload type
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    console.log('Decoded token:', decoded);
    (req as any).user = { id: decoded.id };
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      console.log('JWT Error:', error.message);
      return res.status(403).json({ error: 'Invalid token.' });
    }
    return res.status(500).json({ error: 'Internal server error.' });
  }
}