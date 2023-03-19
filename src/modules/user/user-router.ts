import { Router } from 'express';
import { userController } from './user-controller';

const userRouter = Router();

userRouter.get('/:id', (req, res) => userController.getUserById(req, res));
userRouter.post('/', (req, res) => userController.createUser(req, res));

export { userRouter };
