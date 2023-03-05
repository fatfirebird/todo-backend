import { HttpError } from '../core/error';

export class TagNotFoundError extends HttpError {
  constructor(id: number | string) {
    super({
      message: `Tag with id: ${id} doesn't exists`,
    });
  }
}
