import { HttpError } from '../core/error';
import { TaskStatus } from './task-entity';

export class TaskNotFoundError extends HttpError {
  constructor(id: number | string) {
    super({
      message: `Task with ${id} doesn't exists`,
    });
  }
}

export class TaskWrongStatusError extends HttpError {
  constructor(status: TaskStatus, id: number | string) {
    super({
      message: `Can't set ${status} for task ${id}`,
    });
  }
}
