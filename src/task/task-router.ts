import { Router } from 'express';
import { taskController } from './task-controller';

const taskRouter = Router();

taskRouter.get('/', (req, res) => taskController.getTask(req, res));
taskRouter.post('/', (req, res) => taskController.createTask(req, res));

export { taskRouter };
