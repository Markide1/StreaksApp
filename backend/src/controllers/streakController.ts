import { Request, Response } from 'express';
import * as streakService from '../services/streakService';
import { NextFunction } from 'express';

const getUserId = (req: Request): string | null => {
  return (req as any).user?.id || null;
};

export const getStreaks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    if (userId === null) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const streaks = await streakService.getStreaks(userId);
    res.status(200).json(streaks);
  } catch (error) {
    next(error);
  }
};

export const createStreak = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    if (userId === null) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { name } = req.body;
    const streak = await streakService.createStreak(userId, name);
    res.status(201).json(streak);
  } catch (error) {
    next(error);
  }
};

export const increaseStreakCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    if (userId === null) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const streakId = req.params.streakId;
    const streak = await streakService.increaseStreakCount(userId, streakId);
    res.status(200).json(streak);
  } catch (error) {
    next(error);
  }
};

export const deleteStreak = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    if (userId === null) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const id = req.params.id;
    await streakService.deleteStreak(id, userId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const resetStreak = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    if (userId === null) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const streakId = req.params.streakId;
    const streak = await streakService.resetStreak(userId, streakId);
    res.status(200).json(streak);
  } catch (error) {
    next(error);
  }
};