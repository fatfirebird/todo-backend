import { Response, Request } from 'express';
import { BaseController } from '../core/base-controller';
import { CreateTaskDTO, GetTaskDTO } from './task-dto';
import { TaskRepository } from './task-repository';

class TaskController extends BaseController {
  constructor() {
    super();
  }

  async getTask(req: Request, res: Response): Promise<unknown> {
    try {
      const dto: GetTaskDTO = {
        id: req.query.id?.toString(),
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

  async createTask(req: Request, res: Response): Promise<unknown> {
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
        id: req.query.id?.toString(),
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
}

const taskController = new TaskController();

export { taskController };
