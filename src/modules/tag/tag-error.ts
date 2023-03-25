import { HttpError } from '@/core/errors';

export class TagNotFoundError extends HttpError {
  constructor(id: number | string) {
    super({
      message: `Tag with id: ${id} doesn't exists`,
    });
  }
}

export class InvalidTagIdsError extends HttpError {
  constructor(ids: number[]) {
    super({
      message: `Invalid tag ids: ${ids}`,
    });
  }
}
