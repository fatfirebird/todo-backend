import { TaskModel } from './task-model';

class TaskRepository {
  async findTaskById(id: string) {
    return await TaskModel.findOne({
      where: {
        id,
      },
    });
  }

  // TODO: fix
  async createNewTask(data: { task: string }) {
    return await TaskModel.create(data);
  }
}

export { TaskRepository };
