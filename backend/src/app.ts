import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import streaksRoutes from './routes/streakRoutes';
import { errorMiddleware } from './middlewares/error.middleware';

dotenv.config();

const app: Express = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the StreaksApp backend!' });
});
app.use('/api/auth', authRoutes);
app.use('/api/streaks', streaksRoutes);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (err instanceof Error) {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
app.use(errorMiddleware)

export default app;