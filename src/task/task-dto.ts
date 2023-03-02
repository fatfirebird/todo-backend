export interface TaskDTO {
  id?: string;
  text?: string;
}

export interface GetTaskDTO {
  id?: string;
}

export type CreateTaskDTO = Omit<TaskDTO, 'id'>;
