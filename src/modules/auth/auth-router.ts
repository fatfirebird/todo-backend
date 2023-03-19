import { Router } from 'express';
import { authController } from './auth-controller';

const authRouter = Router();

authRouter.post('/refresh', (req, res) => authController.refreshToken(req, res));

export { authRouter };
