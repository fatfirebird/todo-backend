import { Router } from 'express';
import { taskRouter } from '../task/task-router';

const routerV1 = Router();

routerV1.get('/', (_, res) => {
  res.json('Hello world!');
});

routerV1.use('/tasks', taskRouter);

export { routerV1 };
