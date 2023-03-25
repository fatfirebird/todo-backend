import { HttpError } from '@/core/errors';

export class InvalidAccessToken extends HttpError {
  constructor() {
    super({ message: 'Invalid access token' });
  }
}

export class InvalidRefreshToken extends HttpError {
  constructor() {
    super({ message: 'Invalid refresh token' });
  }
}

export class CreationTokenError extends HttpError {
  constructor() {
    super({ message: "Can't create token" });
  }
}
