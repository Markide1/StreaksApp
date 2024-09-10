import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { EmailService } from '../services/emailService';

const router = express.Router();
const prisma = new PrismaClient();
const emailService = new EmailService();

function generateCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

router.post('/reset-password', async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const resetCode = generateCode();
    const resetCodeExpiry = new Date(Date.now() + 3600000); // Code expires in 1 hour

    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetPasswordToken: resetCode,
            resetPasswordTokenExpiry: resetCodeExpiry
        }
    });

    const emailSent = await emailService.sendPasswordResetEmail(user.email, resetCode);
    if (emailSent) {
        res.status(200).json({ message: 'Password reset code sent' });
    } else {
        res.status(500).json({ message: 'Failed to send password reset email' });
    }
});

router.post('/reset-password/:code', async (req: Request, res: Response) => {
    const { password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            resetPasswordToken: req.params.code,
            resetPasswordTokenExpiry: { gt: new Date() }
        }
    });

    if (!user) {
        return res.status(400).json({ message: 'Password reset code is invalid or has expired' });
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

    await emailService.sendPasswordChangedEmail(user.email);
    res.status(200).json({ message: 'Password has been updated' });
});

export default router;