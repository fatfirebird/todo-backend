import { Meta } from '@/core/meta';
import { Order } from '@/core/order';
import { db, Models } from '@/database/models';
import { Task, TaskStatus } from './task-entity';
import { TaskListFilters } from './task-types';

class TaskRepository {
  models: Models;

  constructor(models: Models) {
    this.models = models;
  }

  async findTaskById(id: string) {
    const task = await this.models.task.findOne({
      where: {
        id,
      },
      include: this.models.tag,
    });

    return task;
  }

  async findAllTasks({ offset, limit }: Meta, filters: TaskListFilters, order: Order, userId: number) {
    return await this.models.task.findAndCountAll({
      offset,
      limit,
      where: {
        ...filters,
        userId,
      },
      order: [['id', order.id]],
      include: this.models.tag,
    });
  }

  async createNewTask({ data }: Task, userId: number) {
    return await this.models.task.create({ ...data, userId });
  }

  async deleteTask(id: string) {
    return await this.models.task.destroy({
      where: {
        id,
      },
    });
  }

  async updateTaskText(id: string, text: string) {
    const task = await this.findTaskById(id);

    if (!task) {
      return null;
    }

    return await task.update({ text });
  }

  async updateTaskStatus(id: string, status: TaskStatus) {
    return await this.models.task.update(
      { status },
      {
        where: {
          id,
        },
      },
    );
  }
}

const taskRepository = new TaskRepository(db);

export { taskRepository };
