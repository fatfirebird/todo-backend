import { HttpError } from '@/core/error';

export class UserNotFoundError extends HttpError {
  constructor(id: number | string) {
    super({
      message: `User with ${id} doesn't exists`,
    });
  }
}
