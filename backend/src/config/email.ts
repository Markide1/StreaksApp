export const emailConfig = {
  host: 'smtp.gmail.com',
  port: 587, // Use 587 for TLS
  secure: false, // Set to true if using port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};