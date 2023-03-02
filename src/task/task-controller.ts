import { Response, Request } from 'express';
import { BaseController } from '../core/base-controller';
import { CreateTaskDTO, GetTaskDTO } from './task-dto';
import { TaskModel } from './task-model';

class TaskController extends BaseController {
  constructor() {
    super();
  }

  async getTask(req: Request, res: Response): Promise<unknown> {
    try {
      const dto: GetTaskDTO = {
        id: req.query.id?.toString(),
      };

      if (dto.id) {
        return this.badRequest(res, 'ID doesnt exists');
      }

      const task = await TaskModel.findOne({
        where: {
          id: req.query.id,
        },
      });

      if (!task) {
        return this.badRequest(res, 'ID doesnt exists');
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

      const task = await TaskModel.create({
        text: dto.text,
      });

      return this.ok(res, task.toJSON());
    } catch (error) {
      return this.internalError(res, error);
    }
  }
}

const taskController = new TaskController();

export { taskController };
