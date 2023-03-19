import { Router, Request } from 'express';
import { taskController } from './task-controller';
import { GetTaskListQueryParams } from './task-types';
import { createValidator } from '@/core/middleware/create-validator';
import { validateUpdateTask } from './middleware/validate-update-task';
import { paramValidationSchema } from '@/core/validation';
import { validateCreateTask } from './middleware/validate-create-task';
import { verifyToken } from '../auth/middleware/verify-token';

const taskRouter = Router();

taskRouter.use(verifyToken);

taskRouter.get('/', (req, res) =>
  // #swagger.tags = ['task']
  /* #swagger.parameters['obj'] = { 
            in: 'query',  
            schema: { $ref: '#/definitions/GetTaskListQueryParams' } 
  } */
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/TaskList' }
    } */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  taskController.getTaskList(req as unknown as Request<unknown, unknown, unknown, GetTaskListQueryParams>, res),
);

taskRouter.post(
  '/',
  validateCreateTask(),
  (
    req,
    res,
    // #swagger.tags = ['task']
    /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Task' }
    } */
    /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
    /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  ) => taskController.createTask(req, res),
);
taskRouter.get('/:id', createValidator(paramValidationSchema), (req, res) =>
  // #swagger.tags = ['task']
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Task' }
    } */
  /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  taskController.getTask(req, res),
);
taskRouter.delete('/:id', createValidator(paramValidationSchema), (req, res) =>
  // #swagger.tags = ['task']
  /* #swagger.responses[201] = {}
  /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
  /* #swagger.responses[404] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  taskController.deleteTask(req, res),
);
taskRouter.patch('/:id', validateUpdateTask(), (req, res) =>
  // #swagger.tags = ['task']
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Task' }
    } */
  /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  taskController.updateTask(req, res),
);
taskRouter.patch('/:id/take-to-work', createValidator(paramValidationSchema), (req, res) =>
  // #swagger.tags = ['task']
  /* #swagger.responses[201] = {}
  /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
  /* #swagger.responses[404] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  taskController.takeTaskToWork(req, res),
);
taskRouter.patch('/:id/done', createValidator(paramValidationSchema), (req, res) =>
  // #swagger.tags = ['task']
  /* #swagger.responses[201] = {}
  /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
  /* #swagger.responses[404] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  taskController.doneTask(req, res),
);

export { taskRouter };
