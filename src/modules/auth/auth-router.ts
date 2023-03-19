import { Router } from 'express';
import { validateUserData } from '../user/middleware/validate-user-data';
import { authController } from './auth-controller';

const authRouter = Router();

authRouter.post('/refresh', (req, res) => authController.refreshToken(req, res));
authRouter.post('/login', validateUserData(), (req, res) => authController.login(req, res));

export { authRouter };
