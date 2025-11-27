import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { signupValidator, loginValidator } from '../middleware/validators.js';

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);

export default router;
