import { ForbiddenResource, HttpError } from '@/core/errors';
import { db } from '@/database/models';
import { InvalidTagIdsError } from '../tag/tag-error';
import { tagRepository } from '../tag/tag-repository';
import { Task, TaskStatus } from './task-entity';
import { TaskNotFoundError, TaskWrongStatusError } from './task-error';
import { taskRepository } from './task-repository';

class TaskService {
  protected static isTodo(status: TaskStatus) {
    return status === TaskStatus.todo;
  }

  protected static isInProgress(status: TaskStatus) {
    return status === TaskStatus.inProgress;
  }

  static async createTask(taskData: Task, tagIds: number[], userId: number) {
    let error: HttpError | null = null;

    const tags = await tagRepository.findAllByIds(tagIds, userId);

    if (!tags.length && tagIds.length) {
      error = new InvalidTagIdsError(tagIds);
      return { error, task: null };
    }

    const task = await taskRepository.createNewTask(taskData, userId);
    console.log('AAAAAAAAAAAAA', task);
    await task.addTags(tags);
    console.log('FFFFFFFFFFFFFFFFFF', task);
    await task.reload({ include: db.tag });

    return { task, error };
  }

  static async updateTask(taskId: string, taskData: Task, userId: number, tagIds?: number[]) {
    let error: HttpError | null = null;
    const hasTagIds = Array.isArray(tagIds);

    const task = await taskRepository.updateTaskText(taskId, taskData.text);

    if (!task) {
      error = new TaskNotFoundError(taskId);
      return { error, task, tags: null };
    }

    if (task.userId !== userId) {
      error = new ForbiddenResource();
      return { error, task, tags: null };
    }

    if (!hasTagIds) {
      return { error, task, tags: null };
    }

    const tags = await tagRepository.findAllByIds(tagIds, userId);
    const tagsFound = !!tags.length;

    if (!tagsFound && !!tagIds.length) {
      error = new InvalidTagIdsError(tagIds);
      return { error, task, tags };
    }

    if (tagsFound) {
      await task.addTags(tags);
    } else {
      const taskTags = await task.getTags();
      await task.removeTags(taskTags);
    }

    await task.reload({ include: db.tag });

    return { task, error, tags };
  }

  static async setTaskStatus(id: string, status: TaskStatus, userId: number) {
    let error: HttpError | null = null;

    const task = await taskRepository.findTaskById(id);

    if (!task) {
      return { task, error: new TaskNotFoundError(id) };
    }

    if (task.userId !== userId) {
      return { task, error: new ForbiddenResource() };
    }

    switch (status) {
      case TaskStatus.todo:
        error = new TaskWrongStatusError(TaskStatus.todo, task.id);

      case TaskStatus.inProgress:
        if (this.isTodo(task.status)) {
          await task.update({ status });
        } else {
          error = new TaskWrongStatusError(TaskStatus.inProgress, task.id);
        }

      case TaskStatus.done:
        if (this.isInProgress(task.status)) {
          await task.update({ status });
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
