import nodemailer from 'nodemailer';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendWelcomeEmail(to: string, name: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: 'Welcome to StreaksApp!',
      html: this.getWelcomeEmailTemplate(name),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully');
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  }

  private getWelcomeEmailTemplate(name: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to StreaksApp</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #4a4a4a; }
          .cta-button { display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome, ${name}!</h1>
          <p>We're excited to have you on board. With StreaksApp, you can easily track your daily habits and build long-lasting streaks.</p>
          <p>Here are a few things you can do to get started:</p>
          <ul>
            <li>Create your first streak</li>
            <li>Set reminders for your daily habits</li>
            <li>Explore our community features</li>
          </ul>
          <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
          <a href="${process.env.APP_URL}" class="cta-button">Start Your First Streak</a>
          <p>Best regards,<br>The StreaksApp Team</p>
        </div>
      </body>
      </html>
    `;
  }

  public async sendPasswordChangedEmail(to: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: 'Your Password Has Been Changed',
      html: this.getPasswordChangedEmailTemplate(),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Password changed email sent successfully');
    } catch (error) {
      console.error('Error sending password changed email:', error);
    }
  }

  private getPasswordChangedEmailTemplate(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed - StreaksApp</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #4a4a4a; }
          .warning { color: #e74c3c; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Your Password Has Been Changed</h1>
          <p>This email is to confirm that your password for StreaksApp has been successfully changed.</p>
          <p class="warning">If you did not make this change, please contact our support team immediately.</p>
          <p>For security reasons, we recommend that you:</p>
          <ul>
            <li>Use a strong, unique password for your StreaksApp account</li>
            <li>Never share your password with anyone</li>
            <li>Enable two-factor authentication if available</li>
          </ul>
          <p>If you have any questions or concerns, please don't hesitate to reach out to our support team.</p>
          <p>Thank you for using StreaksApp!</p>
          <p>Best regards,<br>The StreaksApp Security Team</p>
        </div>
      </body>
      </html>
    `;
  }
}

export default new EmailService();