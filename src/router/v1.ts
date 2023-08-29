import { Router } from 'express';
import { tagRouter } from '../modules/tag/tag-router';
import { taskRouter } from '../modules/task/task-router';
import { userRouter } from '../modules/user/user-router';
import { authRouter } from '../modules/auth/auth-router';
import { serve, setup } from 'swagger-ui-express';
import swaggerDoc from './docs/swagger.json';

const routerV1 = Router();

routerV1.use('/auth', authRouter);
routerV1.use('/tasks', taskRouter);
routerV1.use('/tags', tagRouter);
routerV1.use('/users', userRouter);

routerV1.use('/docs', serve, setup(swaggerDoc));

export { routerV1 };
