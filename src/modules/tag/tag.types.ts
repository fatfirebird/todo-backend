import { Meta } from '@/core/meta';
import { Order } from '@/core/order';

export interface GetTagListQueryParams extends Meta {
  order?: Order;
}
