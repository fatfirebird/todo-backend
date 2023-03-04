import { Response, Request } from 'express';
import { BaseController } from '../core/base-controller';
import { Task, TaskStatus } from './task-entity';
import { TaskNotFoundError } from './task-error';
import { TaskRepository } from './task-repository';
import { TaskService } from './task-service';
import { GetTaskListQueryParams } from './task-types';

class TaskController extends BaseController {
  constructor() {
    super();
  }

  async getTask(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const task = await TaskRepository.findTaskById(id);

      if (!task) {
        return this.notFound(res, new TaskNotFoundError(id));
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

      const tasks = await TaskRepository.findAllTasks(meta, filters, order);

      return this.ok(res, { tasks, meta });
    } catch (error) {
      this.handleCatchError(res, error);
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const text = req.body.text;
      const task = await TaskRepository.createNewTask(new Task({ text, status: TaskStatus.todo }));

      return this.ok(res, task.toJSON());
    } catch (error) {
      this.handleCatchError(res, error);
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const deletedTasks = await TaskRepository.deleteTask(id);

      if (!deletedTasks) {
        return this.notFound(res, new TaskNotFoundError(id));
      }

      return this.ok(res);
    } catch (error) {
      this.handleCatchError(res, error);
    }
  }

  async takeTaskToWork(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const task = await TaskRepository.findTaskById(id);

      if (!task) {
        return this.notFound(res, new TaskNotFoundError(id));
      }

      const { error } = await TaskService.setTaskStatus(task, TaskStatus.inProgress);

      if (error) {
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

      const task = await TaskRepository.findTaskById(id);

      if (!task) {
        return this.notFound(res, new TaskNotFoundError(id));
      }

      const { error } = await TaskService.setTaskStatus(task, TaskStatus.done);

      if (error) {
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

      const task = await TaskRepository.findTaskById(id);

      if (!task) {
        return this.notFound(res, new TaskNotFoundError(id));
      }

      await task.update({ text });

      return this.ok(res, task.toJSON());
    } catch (error) {
      this.handleCatchError(res, error);
    }
  }
}

const taskController = new TaskController();

export { taskController };
