import nodemailer, { Transporter } from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { emailConfig } from '../config/email';

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  body: any;
  attachments?: { 
    filename: string;
    path: string;
    contentType: string;
  }[];
}

const sendMail = async (options: EmailOptions): Promise<void> => {
  try {
    console.log('Creating transport...');
    const transporter: Transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure, // Use the secure setting from your config
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass,
      },
      tls: {
        rejectUnauthorized: false, // This can help with self-signed certificates
      },
    });

    console.log('Transport created successfully');

    const { email, subject, template, body, attachments } = options;
    console.log('Rendering email template...');
    const html: string = await ejs.renderFile(template, body);

    console.log('Email template rendered successfully');

    const mailOptions = {
      from: process.env.EMAIL_NAME,
      to: email,
      subject,
      html,
      attachments, // Add attachments to the mail options
    };

    console.log('Sending email to:', email);
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
  } catch (error: any) {
    console.error('Error sending email:', error.message || error);
    throw new Error('Failed to send email. Please try again later.');
  }
};

export default sendMail;