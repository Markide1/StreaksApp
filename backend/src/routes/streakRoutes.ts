import express, { Router } from 'express';
import streaksController from '../controllers/streakController';

const router: Router = express.Router();

router.get('/:userId', streaksController.getStreaks);
router.post('/', streaksController.createStreak);
router.patch('/:streakId', streaksController.updateStreak);
router.delete('/:streakId', streaksController.deleteStreak);
router.patch('/:streakId/increment', streaksController.incrementStreakCount);
router.get('/longest', streaksController.getLongestStreak);
router.get('/updated', streaksController.getUpdatedStreaks);
router.patch('/reset', streaksController.resetStreakCounter);

export default router;