import { Router } from 'express';
import { verifyToken } from '../auth/middleware/verify-token';
import { userController } from './user-controller';

const userRouter = Router();

userRouter.get('/:id', verifyToken, (req, res) => userController.getUserById(req, res));
userRouter.post('/', (req, res) => userController.createUser(req, res));

export { userRouter };
