import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import * as streakController from './controllers/streakController';
import * as authController from './controllers/authController';
import { authenticateToken } from './middleware/authenticateToken';
import resetPasswordRoutes from './routes/resetPassword';
import authRoutes from './routes/authRoutes';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';
import path from 'path'; 
import streakRoutes from './routes/streakRoutes';

dotenv.config();

logger.info('Email configuration:', {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  user: process.env.EMAIL_NAME,
  pass: process.env.EMAIL_PASSWORD ? '[REDACTED]' : undefined
});

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Detailed logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  const headers = { ...req.headers };
  if (headers.authorization) {
    headers.authorization = headers.authorization.substring(0, 20) + '...';
  }
  console.log('Headers:', headers);
  console.log('Parsed Body:', req.body);
  next();
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Streak API. Please use /api/streaks for streak operations.');
});

// Auth routes (unprotected)
app.use('/api/auth', authRoutes);

// Reset password routes
app.use('/api/auth', resetPasswordRoutes);

// Protected routes


app.use('/api/streaks', authenticateToken, streakRoutes);
app.get('/api/streaks', streakController.getStreaks);
app.post('/api/streaks', streakController.createStreak);
app.put('/api/streaks/:streakId/increase', streakController.increaseStreakCount);
app.delete('/api/streaks/:id', streakController.deleteStreak);
app.put('/api/streaks/:streakId/reset', streakController.resetStreak);
import userProfileRouter from './routes/userProfile'; // Ensure the router is imported

// User profile routes
app.use('/api/users', userProfileRouter);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;