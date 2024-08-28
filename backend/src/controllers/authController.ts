import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { EmailService } from '../services/emailService';

const emailService = new EmailService();

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    const user = await authService.signup(email, password, username);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const result = await authService.logout(userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const handleSignup = signup;
export const handleLogin = login;
export const handleLogout = logout;