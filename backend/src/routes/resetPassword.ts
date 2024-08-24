import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { EmailService } from '../services/emailService';
import crypto from 'crypto';

const router = express.Router();
const prisma = new PrismaClient();
const emailService = new EmailService();

function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

router.post('/reset-password', async (req: Request, res: Response) => {
  console.log('Received reset password request');
  console.log('Request body:', req.body);
  try {
    const { email } = req.body;
    if (!email) {
      console.log('Email is missing in the request');
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // Token expires in 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordTokenExpiry: resetTokenExpiry
      }
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const emailSent = await emailService.sendPasswordResetEmail(user.email, resetUrl);

    if (emailSent) {
      res.status(200).json({ message: 'Password reset link sent' });
    } else {
      console.error('Failed to send password reset email');
      res.status(500).json({ message: 'Failed to send password reset email' });
    }
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      message: 'Error in password reset process',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

router.post('/reset-password/:token', async (req: Request, res: Response) => {
  try {
    console.log('Received password update request');
    console.log('Request body:', req.body);
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordTokenExpiry: { gt: new Date() }
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null
      }
    });

    res.status(200).json({ message: 'Password has been updated' });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ message: 'Error in password update process', error: error instanceof Error ? error.message : String(error) });
  }
});

export default router;