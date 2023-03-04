import { HttpError } from '../core/error';
import { TaskStatus } from './task-entity';
import { TaskWrongStatusError } from './task-error';
import { TaskModel } from './task-model';

class TaskService {
  static isTodo(status: TaskStatus) {
    return status === TaskStatus.todo;
  }

  static isInProgress(status: TaskStatus) {
    return status === TaskStatus.inProgress;
  }

  static async setTaskStatus(task: TaskModel, status: TaskStatus) {
    let error: HttpError | null = null;

    switch (status) {
      case TaskStatus.todo:
        error = new TaskWrongStatusError(TaskStatus.todo, task.id);

      case TaskStatus.inProgress:
        if (this.isTodo(task.status)) {
          task = await task.update({ status });
        } else {
          error = new TaskWrongStatusError(TaskStatus.inProgress, task.id);
        }

      case TaskStatus.done:
        if (this.isInProgress(task.status)) {
          task = await task.update({ status });
        } else {
          error = new TaskWrongStatusError(TaskStatus.done, task.id);
        }

      default:
        break;
    }

    return { task, error };
  }
}

export { TaskService };
