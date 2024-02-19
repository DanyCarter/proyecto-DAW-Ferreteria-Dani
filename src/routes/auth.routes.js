import { Router } from 'express';
import {
    register,
    login,
    logout,
    verifyToken,
} from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.get('/verify', verifyToken);

router.post('/logout',authRequired, logout);

export default router;