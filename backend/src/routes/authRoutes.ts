import express from 'express';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/signup', authController.handleSignup);
router.post('/login', authController.login);
router.post('/logout', authController.handleLogout);

export default router;