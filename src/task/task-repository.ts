import { Meta } from '../core/meta';
import { Order } from '../core/order';
import { TagModel, TaskModel } from '../database/models';
import { Task, TaskStatus } from './task-entity';
import { TaskListFilters } from './task-types';

class TaskRepository {
  static async findTaskById(id: string) {
    const task = await TaskModel.findOne({
      where: {
        id,
      },
      include: TagModel,
    });

    return task;
  }

  static async findAllTasks({ offset, limit }: Meta, filters: TaskListFilters, order: Order) {
    return TaskModel.findAndCountAll({
      offset,
      limit,
      where: {
        ...filters,
      },
      order: [['id', order.id]],
      include: TagModel,
    });
  }

  static async createNewTask({ data }: Task) {
    return await TaskModel.create({ ...data });
  }

  static async deleteTask(id: string) {
    return await TaskModel.destroy({
      where: {
        id,
      },
    });
  }

  static async updateTaskText(id: string, text: string) {
    const task = await this.findTaskById(id);

    if (!task) {
      return null;
    }

    return await task.update({ text });
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
