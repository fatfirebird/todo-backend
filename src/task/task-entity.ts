import { Entity } from '../core/entity';

export enum TaskStatus {
  todo = 'todo',
  inProgress = 'in progress',
  done = 'done',
}

interface TaskData {
  text: string;
  status: TaskStatus;
}

export class Task extends Entity<TaskData> {
  constructor(data: TaskData) {
    super(data);
  }

  get text(): string {
    return this.data.text;
  }

  get status(): TaskStatus {
    return this.data.status;
  }
}
