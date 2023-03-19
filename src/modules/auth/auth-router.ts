import { Router } from 'express';
import { authController } from './auth-controller';

const authRouter = Router();

authRouter.post('/refresh', (req, res) => authController.refreshToken(req, res));
authRouter.post('/login', (req, res) => authController.login(req, res));

export { authRouter };
