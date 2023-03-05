import { Meta } from '@/core/meta';
import { Order } from '@/core/order';
import { TaskStatus } from './task-entity';

export interface TaskListFilters {
  status?: TaskStatus[];
}

export interface GetTaskListQueryParams extends Meta {
  status: TaskStatus | TaskStatus[];
  order?: Order;
}
