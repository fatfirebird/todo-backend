import { Response, Request } from 'express';
import { BaseController } from '../core/base-controller';
import { CreateTaskDTO, GetTaskDTO } from './task-dto';
import { TaskStatus } from './task-entity';
import { TaskRepository } from './task-repository';
import { TaskService } from './task-service';
import { GetTaskListQueryParams } from './task-types';

class TaskController extends BaseController {
  constructor() {
    super();
  }

  async getTask(req: Request, res: Response) {
    try {
      const dto: GetTaskDTO = {
        id: req.params.id,
      };

      if (!dto.id) {
        return this.badRequest(res, 'ID doesnt exists');
      }

      const task = await TaskRepository.findTaskById(dto.id);

      if (!task) {
        return this.notFound(res, `Task with id: ${dto.id} doesnt exists`);
      }

      return this.ok(res, task.toJSON());
    } catch (error) {
      return this.internalError(res, error);
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
      if (error instanceof Error) {
        return this.internalError(res, error?.message);
      }

      return this.internalError(res);
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const dto: CreateTaskDTO = {
        text: req.body.text,
      };

      if (!dto.text) {
        return this.badRequest(res, 'No text provided');
      }

      const task = await TaskRepository.createNewTask({
        text: dto.text,
      });

      return this.ok(res, task.toJSON());
    } catch (error) {
      return this.internalError(res, error);
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const dto = {
        id: req.params?.id,
      };

      if (!dto.id) {
        return this.badRequest(res, 'ID doesnt exists');
      }

      const deletedTasks = await TaskRepository.deleteTask(dto.id);

      if (!deletedTasks) {
        return this.notFound(res, `Task with id: ${dto.id} doesnt exists`);
      }

      return this.ok(res);
    } catch (error) {
      return this.internalError(res, error);
    }
  }

  async takeTaskToWork(req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (!id) {
        return this.badRequest(res, 'ID doesnt exists');
      }

      const task = await TaskRepository.findTaskById(id);

      if (!task) {
        return this.notFound(res, `Task with id: ${id} doesnt exists`);
      }

      await TaskService.setTaskStatus(task, TaskStatus.inProgress);

      return this.ok(res);
    } catch (error) {
      return this.internalError(res, error);
    }
  }

  async doneTask(req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (!id) {
        return this.badRequest(res, 'ID doesnt exists');
      }

      const task = await TaskRepository.findTaskById(id);

      if (!task) {
        return this.notFound(res, `Task with id: ${id} doesnt exists`);
      }

      await TaskService.setTaskStatus(task, TaskStatus.done);

      return this.ok(res);
    } catch (error) {
      return this.internalError(res, error);
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const data = {
        id: req.params.id,
        text: req.body.text,
      };

      if (!data.id) {
        return this.badRequest(res, 'ID doesnt exists');
      }

      if (!data.text) {
        return this.badRequest(res, 'Text is required');
      }

      const task = await TaskRepository.findTaskById(data.id);

      if (!task) {
        return this.notFound(res, `Task with id: ${data.id} doesnt exists`);
      }

      await task.update({ text: data.text });

      return this.ok(res, task.toJSON());
    } catch (error) {
      return this.internalError(res, error);
    }
  }
}

const taskController = new TaskController();

export { taskController };
