import { Response, Request } from 'express';
import { BaseController } from '@/core/base-controller';
import { Task, TaskStatus } from './task-entity';
import { TaskNotFoundError } from './task-error';
import { taskRepository } from './task-repository';
import { TaskService } from './task-service';
import { GetTaskListQueryParams } from './task-types';
import { ForbiddenResource } from '@/core/errors';

class TaskController extends BaseController {
  constructor() {
    super();
  }

  async getTask(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const userId = Number(res.locals.userId);

      const task = await taskRepository.findTaskById(id);

      if (!task) {
        return this.notFound(res, new TaskNotFoundError(id));
      }

      if (task?.userId !== userId) {
        return this.forbidden(res, new ForbiddenResource());
      }

      return this.ok(res, task.toJSON());
    } catch (error) {
      this.handleCatchError(res, error);
    }
  }

  async getTaskList(req: Request<unknown, unknown, unknown, GetTaskListQueryParams>, res: Response) {
    try {
      const meta = {
        offset: Number(req.query.offset) || 0,
        limit: Number(req.query.limit) || 10,
      };

      const status = req.query.status || [TaskStatus.todo, TaskStatus.inProgress, TaskStatus.done];
      const filters = {
        status: Array.isArray(status) ? status : [status],
      };

      const order = {
        id: req.query.order?.id ?? 'asc',
      };

      const userId = Number(res.locals.userId);

      const tasks = await taskRepository.findAllTasks(meta, filters, order, userId);

      return this.ok(res, { tasks: tasks.rows, meta: { ...meta, count: tasks.count } });
    } catch (error) {
      this.handleCatchError(res, error);
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const text = req.body.text;
      const tagIds = req.body.tags ?? [];
      const userId = Number(res.locals.userId);

      const taskData = new Task({ text });

      const { error, task } = await TaskService.createTask(taskData, tagIds, userId);

      if (error) {
        return this.badRequest(res, error);
      }

      return this.ok(res, task.toJSON());
    } catch (error) {
      this.handleCatchError(res, error);
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const userId = Number(res.locals.userId);

      const task = await taskRepository.findTaskById(id);

      if (!task) {
        return this.notFound(res, new TaskNotFoundError(id));
      }

      if (task.userId !== userId) {
        return this.forbidden(res, new ForbiddenResource());
      }

      await task.destroy();

      return this.ok(res);
    } catch (error) {
      this.handleCatchError(res, error);
    }
  }

  async takeTaskToWork(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const userId = Number(res.locals.userId);

      const { error, task } = await TaskService.setTaskStatus(id, TaskStatus.inProgress, userId);

      if (error) {
        if (!task) {
          return this.notFound(res, error);
        }

        if (error instanceof ForbiddenResource) {
          return this.forbidden(res, error);
        }

        return this.badRequest(res, error);
      }

      return this.ok(res);
    } catch (error) {
      this.handleCatchError(res, error);
    }
  }

  async doneTask(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const userId = Number(res.locals.userId);

      const { error, task } = await TaskService.setTaskStatus(id, TaskStatus.done, userId);

      if (error) {
        if (!task) {
          return this.notFound(res, error);
        }

        if (error instanceof ForbiddenResource) {
          return this.forbidden(res, error);
        }

        return this.badRequest(res, error);
      }

      return this.ok(res);
    } catch (error) {
      this.handleCatchError(res, error);
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const text = req.body.text;
      const tagIds = req.body.tags;
      const userId = Number(res.locals.userId);

      const taskData = new Task({ text });

      const { error, task } = await TaskService.updateTask(id, taskData, userId, tagIds);

      if (error) {
        if (error instanceof ForbiddenResource) {
          return this.forbidden(res, error);
        }

        return this.badRequest(res, error);
      }

      return this.ok(res, task.toJSON());
    } catch (error) {
      this.handleCatchError(res, error);
    }
  }

  async setTaskStatus(req: Request, res: Response) {
    try {
      const status = req.body.status;
      const id = req.params.id;

      const userId = Number(res.locals.userId);

      const { error, task } = await TaskService.setForcedStatus(id, status, userId);

      if (error) {
        if (!task) {
          return this.notFound(res, error);
        }

        if (error instanceof ForbiddenResource) {
          return this.forbidden(res, error);
        }

        return this.badRequest(res, error);
      }

      return this.ok(res);
    } catch (error) {
      this.handleCatchError(res, error);
    }
  }
}

const taskController = new TaskController();

export { taskController };
