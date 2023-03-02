import { Task } from './task-entity';
import { TaskModel } from './task-model';

class TaskRepository {
  static async findTaskById(id: string) {
    return await TaskModel.findOne({
      where: {
        id,
      },
    });
  }

  static async createNewTask(data: Omit<Task, 'id'>) {
    return await TaskModel.create(data);
  }
}

export { TaskRepository };
