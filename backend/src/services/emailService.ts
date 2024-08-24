import nodemailer from 'nodemailer';
import { emailConfig } from '../config/email';
import * as dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

export class EmailService {
  async sendPasswordResetEmail(toEmail: string, resetCode: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"Habit Tracker" <${process.env.EMAIL_NAME}>`,
        to: toEmail,
        subject: 'Password Reset Code',
        text: `You requested a password reset. Your password reset code is: ${resetCode}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`,
        html: `
          <h1>Password Reset Code</h1>
          <p>You requested a password reset. Your password reset code is:</p>
          <h2>${resetCode}</h2>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Password reset email sent: ', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending password reset email: ', error);
      return false;
    }
  }

  async sendWelcomeEmail(toEmail: string, username: string): Promise<boolean> {
    console.log('Email config:', {
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass ? '[REDACTED]' : undefined
      }
    });

    try {
      const mailOptions = {
        from: `"Habit Tracker" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: 'Welcome to Habit Tracker!',
        html: `
          <h1>Hey there, Habit Superstar! 🌟</h1>
          <p>Woohoo! Welcome to Habit Tracker! We're thrilled you've joined our community of go-getters who are all about crushing those healthy habits.</p>
          <p>You've just taken an awesome step towards a healthier, happier you. Way to go! 🎉</p>
          <p>Here at Habit Tracker, we're all about making habit-building fun, easy, and totally addictive (in a good way, of course!).</p>
          <p>Ready to start your streak? Just open the app and let's get rolling!</p>
          <p>Remember, every healthy choice counts, no matter how small. You've got this, and we've got your back!</p>
          <p>Stay awesome and keep those healthy habits coming!</p>
          <p>The Habit Tracker Team</p>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Welcome email sent: ', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending welcome email: ', error);
      return false;
    }
  }
}