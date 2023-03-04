import { Router } from 'express';
import { taskController } from './task-controller';

const taskRouter = Router();

taskRouter.get('/', (req, res) => taskController.getTask(req, res));
taskRouter.post('/', (req, res) => taskController.createTask(req, res));
taskRouter.delete('/:id', (req, res) => taskController.deleteTask(req, res));
taskRouter.patch('/:id', (req, res) => taskController.updateTask(req, res));
taskRouter.patch('/:id/take-to-work', (req, res) => taskController.takeTaskToWork(req, res));
taskRouter.patch('/:id/done', (req, res) => taskController.doneTask(req, res));

export { taskRouter };
