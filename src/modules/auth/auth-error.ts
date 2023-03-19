import { HttpError } from '@/core/error';

export class InvalidAccessToken extends HttpError {
  constructor() {
    super({ message: 'Invalid access token' });
  }
}
