import { Router } from 'express';
import { tagRouter } from '@/modules/tag/tag-router';
import { taskRouter } from '@/modules/task/task-router';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './docs/swagger.json';

const routerV1 = Router();

routerV1.use('/docs', swaggerUI.serve);
routerV1.get('/docs', swaggerUI.setup(swaggerDoc));
routerV1.use('/tasks', taskRouter);
routerV1.use('/tags', tagRouter);

export { routerV1 };
