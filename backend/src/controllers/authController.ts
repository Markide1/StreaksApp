import { NextFunction, Request, Response } from 'express';
import authService from '../services/authService';

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await authService.signup(email, password);
    res.status(201).json(user);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.status(200).json({ user, token });
  }
}

export default new AuthController();