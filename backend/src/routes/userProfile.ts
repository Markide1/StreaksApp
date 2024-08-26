import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/authenticateToken';
import multer from 'multer';
import path from 'path';
import { error } from 'winston';
import fs from 'fs';
import { updateProfileSchema, uploadPhotoSchema } from '../validators/userProfileValidator';
import { EmailService } from '../services/emailService';
 
const router = express.Router();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsDir = 'uploads/';
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.put('/profile', authenticateToken, async (req: express.Request, res: express.Response) => {
    const { error, value } = updateProfileSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, password } = value;
    const userId = (req as any).user.id;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updateData: any = {};

        if (username !== undefined && username !== '') {
            const existingUser = await prisma.user.findFirst({ where: { username } });
            if (existingUser && existingUser.id !== userId) {
                return res.status(400).json({ code: 'USERNAME_EXISTS', message: 'Username already exists' });
            }
            updateData.username = username;
        }

        if (email !== undefined && email !== '' && email !== user.email) {
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser && existingUser.id !== userId) {
                return res.status(400).json({ code: 'EMAIL_EXISTS', message: 'Email already exists' });
            }
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            
            // Update user with new email and verification code
            await prisma.user.update({
                where: { id: userId },
                data: { 
                    newEmail: email,
                    emailVerificationCode: verificationCode
                }
            });

            // Send verification email
            const emailService = new EmailService();
            await emailService.sendVerificationEmail(email, verificationCode);

            return res.status(200).json({ message: 'Verification code sent to new email' });
        }

        if (password !== undefined && password !== '') {
            updateData.password = await bcrypt.hash(password, 10);
            
            // Send password changed email
            const emailService = new EmailService();
            await emailService.sendPasswordChangedEmail(user.email);
        }

        if (Object.keys(updateData).length > 0) {
            await prisma.user.update({
                where: { id: userId },
                data: updateData,
            });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/verify-email', authenticateToken, async (req: express.Request, res: express.Response) => {
    const { verificationCode } = req.body;
    const userId = (req as any).user.id;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (!user.emailVerificationCode || user.emailVerificationCode !== verificationCode) {
            console.log(`Failed email verification attempt for user ${userId}`);
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        if (!user.newEmail) {
            return res.status(400).json({ message: 'No new email to verify' });
        }

        await prisma.user.update({
            where: { id: userId },
            data: {
                email: user.newEmail,
                newEmail: null,
                emailVerificationCode: null,
                isEmailVerified: true
            }
        });

        console.log(`Email successfully verified for user ${userId}`);
        res.status(200).json({ message: 'Email successfully updated and verified' });
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/profile/photo', authenticateToken, upload.single('photo'), async (req: express.Request, res: express.Response) => {
    console.log('Received file upload request');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    const userId = (req as any).user.id;

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { profilePhotoUrl: req.file.path }
        });

        res.status(200).json({ message: 'Profile photo uploaded successfully', photoUrl: req.file.path });
    } catch (error: any) {
        console.error('Upload profile photo error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

export default router;