import express from 'express';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/signup', authController.handleSignup);
router.post('/login', authController.handleLogin);
router.post('/logout', authController.handleLogout);

export default router;
