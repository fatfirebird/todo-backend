import { checkSchema } from 'express-validator';
import { createValidator } from './create-validator';
import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { HttpError } from '../errors';

describe('test create-validator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should't have errors", async () => {
    const next = jest.fn();
    const req = new Request();
    req.setParams({ id: '123' });
    req.setBody({ text: 'short text' });
    const res = new Response();

    const validator = await createValidator(
      checkSchema({
        id: {
          errorMessage: 'should be numeric',
          isNumeric: true,
        },
        text: {
          errorMessage: 'error',
          isString: true,
        },
      }),
    );

    await validator(req as unknown as ExpressRequest, res as unknown as ExpressResponse, next);

    expect(next).toBeCalled();
  });
  it("should't send error", async () => {
    const next = jest.fn();
    const req = new Request();
    req.setParams({ id: '123' });
    req.setBody({ text: [] });
    const res = new Response();

    const validator = await createValidator(
      checkSchema({
        id: {
          errorMessage: 'should be numeric',
          isNumeric: true,
        },
        text: {
          errorMessage: 'must be string',
          isString: true,
        },
      }),
    );

    await validator(req as unknown as ExpressRequest, res as unknown as ExpressResponse, next);

    expect(next).toBeCalledTimes(0);

    expect(res.status).toBeCalledWith(400);

    expect(res.json).toBeCalledWith({
      error: {
        text: new HttpError({
          message: 'must be string',
          value: [],
          field: 'text',
        }),
      },
    });
  });
});
