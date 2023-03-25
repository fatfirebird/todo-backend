import { Response as ExpressResponse } from 'express';
import { BaseController } from './base-controller';
import { Response } from 'jest-express/lib/response';
import { HttpError } from './errors';

class MockController extends BaseController {
  constructor() {
    super();
  }

  mockOk<T = unknown>(res: ExpressResponse, data?: T | undefined): ExpressResponse<unknown> {
    return this.ok(res, data);
  }

  mockError(res: ExpressResponse, error?: HttpError | Error) {
    return this.handleCatchError(res, error);
  }

  mockNotFound(res: ExpressResponse, error: HttpError) {
    return this.notFound(res, error);
  }

  mockBadRequest(res: ExpressResponse, error: HttpError) {
    return this.badRequest(res, error);
  }
}

describe('test BaseController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send ok request', () => {
    const res = new Response();
    const controller = new MockController();

    controller.mockOk(res as unknown as ExpressResponse);

    expect(res.sendStatus).toBeCalled();
    expect(res.sendStatus).toBeCalledWith(201);

    controller.mockOk(res as unknown as ExpressResponse, { message: 'message' });

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ data: { message: 'message' } });
  });

  it('should send 500 error', () => {
    const res = new Response();
    const controller = new MockController();

    controller.mockError(res as unknown as ExpressResponse, new HttpError({ message: 'http' }));

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({
      error: {
        message: 'http',
      },
    });

    controller.mockError(res as unknown as ExpressResponse, new Error('js error'));

    expect(res.json).toBeCalledWith({
      error: {
        message: 'js error',
      },
    });

    controller.mockError(res as unknown as ExpressResponse);

    expect(res.json).toBeCalledWith({
      error: {
        message: 'Internal server error',
      },
    });
  });

  it('should send 404 error', () => {
    const res = new Response();
    const controller = new MockController();

    controller.mockNotFound(res as unknown as ExpressResponse, new HttpError({ message: '404' }));

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      error: {
        message: '404',
      },
    });
  });

  it('should send 400 error', () => {
    const res = new Response();
    const controller = new MockController();

    controller.mockBadRequest(res as unknown as ExpressResponse, new HttpError({ message: '400' }));

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      error: {
        message: '400',
      },
    });
  });
});
