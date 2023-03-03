import { TaskStatus } from './task-entity';
import { TaskModel } from './task-model';

class TaskService {
  static isTodo(status: TaskStatus) {
    return status === TaskStatus.todo;
  }

  static isInProgress(status: TaskStatus) {
    return status === TaskStatus.inProgress;
  }

  static async setTaskStatus(task: TaskModel, status: TaskStatus) {
    switch (status) {
      case TaskStatus.todo:
        throw new Error('Cannot set status todo');

      case TaskStatus.inProgress:
        if (this.isTodo(task.status)) {
          task = await task.update({ status });
        } else {
          throw new Error('Cannot set status in progress');
        }

      case TaskStatus.done:
        if (this.isInProgress(task.status)) {
          task = await task.update({ status });
        } else {
          throw new Error('Cannot set status done');
        }

      default:
        break;
    }

    return task;
  }
}

export { TaskService };
