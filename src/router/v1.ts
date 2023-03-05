import { Router } from 'express';
import { tagRouter } from '@/modules/tag/tag-router';
import { taskRouter } from '@/modules/task/task-router';

const routerV1 = Router();

routerV1.get('/', (_, res) => {
  res.json('Hello world!');
});

routerV1.use('/tasks', taskRouter);
routerV1.use('/tags', tagRouter);

export { routerV1 };
