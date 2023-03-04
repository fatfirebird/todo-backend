import { Router } from 'express';
import { taskController } from './task-controller';
import { GetTaskListQueryParams } from './task-types';
import { createValidator } from '../core/middleware/create-validator';
import { paramValidationSchema, textValidationSchema } from './task-validation';
import { validateUpdateTask } from './middleware/validate-update-task';

const taskRouter = Router();

taskRouter.get<unknown, unknown, unknown, GetTaskListQueryParams>('/', (req, res) =>
  taskController.getTaskList(req, res),
);
taskRouter.post('/', createValidator(textValidationSchema), (req, res) => taskController.createTask(req, res));
taskRouter.get('/:id', createValidator(paramValidationSchema), (req, res) => taskController.getTask(req, res));
taskRouter.delete('/:id', createValidator(paramValidationSchema), (req, res) => taskController.deleteTask(req, res));
taskRouter.patch('/:id', validateUpdateTask(), (req, res) => taskController.updateTask(req, res));
taskRouter.patch('/:id/take-to-work', createValidator(paramValidationSchema), (req, res) =>
  taskController.takeTaskToWork(req, res),
);
taskRouter.patch('/:id/done', createValidator(paramValidationSchema), (req, res) => taskController.doneTask(req, res));

export { taskRouter };
