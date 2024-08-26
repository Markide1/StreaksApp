import express from 'express';
import app from './app';
import logger from './utils/logger';
import * as userProfileRouter from './routes/userProfile';
import path from 'path';

const PORT = process.env.PORT || 3000;

app.use('/api/users', userProfileRouter.default);  
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
 // Start of Selection
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});