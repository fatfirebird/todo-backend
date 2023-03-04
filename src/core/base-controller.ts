import { Response } from 'express';
import { HttpError } from './error';

export abstract class BaseController {
  private sendError(res: Response, code: number, error: HttpError) {
    return res.status(code).json({ error });
  }

  protected ok<T = unknown>(res: Response, data?: T) {
    if (!data) {
      return res.sendStatus(201);
    } else {
      return res.status(200).json({ data });
    }
  }

  protected badRequest(res: Response, error: HttpError) {
    return this.sendError(res, 400, error);
  }

  protected notFound(res: Response, error: HttpError) {
    return this.sendError(res, 404, error);
  }

  protected internalError(res: Response, error?: HttpError) {
    return this.sendError(res, 500, error ?? new HttpError({ message: 'Internal server error' }));
  }

  protected handleCatchError(res: Response, error: unknown) {
    if (error instanceof HttpError) {
      return this.internalError(res, error);
    }

    if (error instanceof Error) {
      return this.internalError(res, { message: error.message });
    }

    return this.internalError(res);
  }
}
