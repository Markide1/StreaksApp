import { NextFunction, Request, Response } from 'express';
import authService from '../services/authService';

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    const { email, password, name } = req.body;
    try {
      const user = await authService.signup(email, password, name);
      res.status(201).json({ message: 'Signup successful. Please log in.' });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const { user, token } = await authService.login(email, password);
      res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();