import { HttpError } from '@/core/error';

export class UserNotFoundError extends HttpError {
  constructor(id: number | string) {
    super({
      message: `User with ${id} doesn't exists`,
    });
  }
}

export class InvalidUserLogin extends HttpError {
  constructor(login: string) {
    super({
      message: `User login: ${login} is alredy in use`,
      field: 'login',
      value: login,
    });
  }
}
