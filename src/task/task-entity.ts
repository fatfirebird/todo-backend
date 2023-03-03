export interface Task {
  id: string;
  text: string;
}

export enum TaskStatus {
  todo = 'todo',
  inProgress = 'in progress',
  done = 'done',
}
