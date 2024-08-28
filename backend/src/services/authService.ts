import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/jwUtils';
import sendMail from '../bgServices/email.service';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const signup = async (email: string, password: string, username: string) => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        email,
        password: hashedPassword,
        username,
      },
    });
    const templatePath = path.join(__dirname, '../mails/Welcomemail.ejs');
    const body = {
      user
    };

    await sendMail({
      email: user.email,
      subject: 'Welcome to Habit Tracker',
      template: templatePath,
      body
    });

    return { id: user.id, email: user.email, username: user.username };
  } catch (error) {
    throw new Error(`Signup failed: ${(error as Error).message}`);
  }
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }
  const token = generateToken(user.id);
  return { token, username: user.username };
};

export const logout = async (userId: string) => {
  // Logic for logout if necessary, e.g., invalidating tokens
  return { message: 'Logged out successfully' };
};