import { HttpError } from './http-error';

export class ForbiddenResource extends HttpError {
  constructor() {
    super({
      message: 'Forbidden resource',
    });
  }
}
