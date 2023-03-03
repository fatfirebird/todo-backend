import { Task, TaskStatus } from './task-entity';
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

  static async deleteTask(id: string) {
    return await TaskModel.destroy({
      where: {
        id,
      },
    });
  }

  static async updateTaskStatus(id: string, status: TaskStatus) {
    return await TaskModel.update(
      { status },
      {
        where: {
          id,
        },
      },
    );
  }
}

export { TaskRepository };
