import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import sendMail from '../bgServices/email.service';
import path from 'path';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(username: string, email: string, password: string): Promise<User> {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword, // Store hashed password
        },
      });

      // Send welcome email
      const templatePath = path.join(__dirname,'../mails/Welcomemail.ejs')
      const body = {
        newUser,
      }

      await sendMail({
        email: newUser.email,
        subject: 'Welcome to Habit Tracker',
        template: templatePath,
        body,
      })
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}
