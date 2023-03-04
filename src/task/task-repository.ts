import { Meta } from '../core/meta';
import { Order } from '../core/order';
import { Task, TaskStatus } from './task-entity';
import { TaskModel } from './task-model';
import { TaskListFilters } from './task-types';

class TaskRepository {
  static async findTaskById(id: string) {
    return await TaskModel.findOne({
      where: {
        id,
      },
    });
  }

  static async findAllTasks({ offset, limit }: Meta, filters: TaskListFilters, order: Order) {
    return TaskModel.findAll({
      offset,
      limit,
      where: {
        ...filters,
      },
      order: [['id', order.id]],
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

  static async updateTaskText(id: string, text: string) {
    return await TaskModel.update(
      { text },
      {
        where: {
          id,
        },
      },
    );
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
