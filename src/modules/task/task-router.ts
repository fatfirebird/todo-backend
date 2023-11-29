import { Router, Request } from 'express';
import { taskController } from './task-controller';
import { GetTaskListQueryParams } from './task-types';
import { createValidator } from '@/core/middleware/create-validator';
import { validateUpdateTask } from './middleware/validate-update-task';
import { paramValidationSchema } from '@/core/validation';
import { validateCreateTask } from './middleware/validate-create-task';
import { verifyToken } from '../auth/middleware/verify-token';
import { statusValidationSchema } from './task-validation';

const taskRouter = Router();

taskRouter.use(verifyToken);

taskRouter.get('/', (req, res) =>
  // #swagger.tags = ['task']
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  /* #swagger.parameters['obj'] = {
            in: 'query',  
            schema: { $ref: '#/definitions/GetTaskListQueryParams' } 
  } */
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/TaskList' }
    } */
  /* #swagger.responses[401] = {
        schema: { $ref: '#/definitions/Error' }
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
    /* #swagger.security = [{
    "bearerAuth": []
  }] */
    /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Task' }
    } */
    /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
    /* #swagger.responses[401] = {
        schema: { $ref: '#/definitions/Error' }
} */
    /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  ) => taskController.createTask(req, res),
);
taskRouter.get('/:id', createValidator(paramValidationSchema), (req, res) =>
  // #swagger.tags = ['task']
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Task' }
    } */
  /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
  /* #swagger.responses[401] = {
        schema: { $ref: '#/definitions/Error' }
} */
  /* #swagger.responses[403] = {
        schema: { $ref: '#/definitions/Error' }
} */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  taskController.getTask(req, res),
);
taskRouter.delete('/:id', createValidator(paramValidationSchema), (req, res) =>
  // #swagger.tags = ['task']
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  /* #swagger.responses[201] = {}
  /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
  /* #swagger.responses[401] = {
        schema: { $ref: '#/definitions/Error' }
} */
  /* #swagger.responses[403] = {
        schema: { $ref: '#/definitions/Error' }
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
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Task' }
    } */
  /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
  /* #swagger.responses[401] = {
        schema: { $ref: '#/definitions/Error' }
} */
  /* #swagger.responses[403] = {
        schema: { $ref: '#/definitions/Error' }
} */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  taskController.updateTask(req, res),
);
taskRouter.patch('/:id/take-to-work', createValidator(paramValidationSchema), (req, res) =>
  // #swagger.tags = ['task']
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
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
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
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
taskRouter.patch(
  '/:id/status',
  createValidator([...statusValidationSchema, ...paramValidationSchema]),
  (
    req,
    res,
    // #swagger.tags = ['task']
    /* #swagger.security = [{
    "bearerAuth": []
  }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/ChangeTaskStatus"
                    }  
                }
            }
        } 
    */
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
  ) => taskController.setTaskStatus(req, res),
);

export { taskRouter };
