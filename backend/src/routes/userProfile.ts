import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/authenticateToken';
import multer from 'multer';
import path from 'path';
import { error } from 'winston';
import fs from 'fs';

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
    const { username, email, password } = req.body;
    const userId = (req as any).user.id;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username && username !== user.username) {
            const existingUser = await prisma.user.findUnique({ where: { email: user.email } });
            if (existingUser && existingUser.username === username) {
                return res.status(400).json({ code: 'USERNAME_EXISTS', message: 'Username already exists' });
            }
            user.username = username;
        }

        if (email && email !== user.email) {
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ code: 'EMAIL_EXISTS', message: 'Email already exists' });
            }
            user.email = email;
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await prisma.user.update({
            where: { id: userId },
            data: user,
        });

        res.sendStatus(200);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/profile/photo', authenticateToken, upload.single('photo'), async (req: express.Request, res: express.Response) => {
    const userId = (req as any).user.id;

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { profilePhoto: req.file.path }
        });

        res.status(200).json({ message: 'Profile photo uploaded successfully', photoUrl: req.file.path });
    } catch (error) {
        console.error('Upload profile photo error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

export default router;