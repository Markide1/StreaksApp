import express from 'express';
import * as streakController from '../controllers/streakController';

const router = express.Router();

router.get('/', streakController.getStreaks);
router.post('/', streakController.createStreak);
router.put('/:id', streakController.increaseStreakCount);
router.delete('/:id', streakController.deleteStreak);
router.put('/:id/reset', streakController.resetStreak);

export default router;