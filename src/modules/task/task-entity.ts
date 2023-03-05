import { Entity } from '@/core/entity';

export enum TaskStatus {
  todo = 'todo',
  inProgress = 'in progress',
  done = 'done',
}

interface TaskData {
  text: string;
  status?: TaskStatus;
}

export class Task extends Entity<Required<TaskData>> {
  constructor({ status = TaskStatus.todo, ...restData }: TaskData) {
    super({ status, ...restData });
  }

  get text(): string {
    return this.data.text;
  }

  get status(): TaskStatus {
    return this.data.status;
  }
}
