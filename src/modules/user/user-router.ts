import { Router } from 'express';
import { verifyToken } from '../auth/middleware/verify-token';
import { validateUserData } from './middleware/validate-user-data';
import { userController } from './user-controller';

const userRouter = Router();

userRouter.get('/:id', verifyToken, (req, res) => userController.getUserById(req, res));
userRouter.post('/', validateUserData(), (req, res) => userController.createUser(req, res));

export { userRouter };
