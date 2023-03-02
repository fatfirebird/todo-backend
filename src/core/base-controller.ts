import { Response } from 'express';

export abstract class BaseController {
  private sendError(res: Response, code: number, error: unknown) {
    return res.status(code).json({ error });
  }

  ok<T = unknown>(res: Response, data?: T) {
    if (!data) {
      return res.sendStatus(201);
    } else {
      return res.status(200).json({ data });
    }
  }

  badRequest(res: Response, error: unknown) {
    return this.sendError(res, 400, error);
  }

  notFound(res: Response, error: unknown) {
    return this.sendError(res, 404, error);
  }

  internalError(res: Response, error: unknown) {
    return this.sendError(res, 500, error);
  }
}
