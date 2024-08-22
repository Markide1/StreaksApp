import { NextFunction, Request, Response } from 'express';
import streaksService from '../services/streakService';

class StreaksController {
  async createStreak(req: Request, res: Response, next: NextFunction) {
    const { userId, title } = req.body;
    const streak = await streaksService.createStreak(userId, title);
    res.status(201).json(streak);
  }

  async updateStreak(req: Request, res: Response, next: NextFunction) {
    const { userId, streakId } = req.params;
    const { title, count } = req.body;
    const updatedStreak = await streaksService.updateStreak(userId, streakId, { title, count });
    res.status(200).json(updatedStreak);
  }

  async deleteStreak(req: Request, res: Response, next: NextFunction) {
    const { userId, streakId } = req.params;
    await streaksService.deleteStreak(userId, streakId);
    res.status(204).end();
  }

  async incrementStreakCount(req: Request, res: Response, next: NextFunction) {
    const { userId, streakId } = req.params;
    const updatedStreak = await streaksService.incrementStreakCount(userId, streakId);
    res.status(200).json(updatedStreak);
  }

  async getStreaks(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const streaks = await streaksService.getStreaks(userId);
    res.status(200).json(streaks);
  }

  async resetStreakCounter(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    await streaksService.resetStreakCounter(userId);
    res.status(200).json({ message: 'Streak counter reset successfully' });
  }

  async getLongestStreak(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const longestStreak = await streaksService.getLongestStreak(userId);
    res.status(200).json(longestStreak);
  }

  async getUpdatedStreaks(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const updatedStreaks = await streaksService.getUpdatedStreaks(userId);
    res.status(200).json(updatedStreaks);
  }
}

export default new StreaksController();